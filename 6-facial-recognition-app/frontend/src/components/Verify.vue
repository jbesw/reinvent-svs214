<template>
  <div name="verify">
     <img :src="image" class="mt-4 img-fluid"/>
     <b-card title="Verify member" bg-variant="primary light fixed-bottom" text-variant="white" class="text-center">
      <div class="innerBox d-flex justify-content-center flex-column">
        <div :disabled="isSending">
          <b-button size="lg" :disabled="isSending" variant="success" @click="$refs.file.click()" block href="#" type="file">{{ sendButtonText }}</b-button>
          <input id="file" accept="image/jpeg" type="file" ref="file" style="display: none" @change="onFileChange"/> 
          <b-button :to="{ name: 'home'}" size="lg" :disabled="isSending" variant="secondary" block>Cancel</b-button>
        </div>
      </div>
      <b-modal centered cancel-disabled no-close-on-esc no-close-on-backdrop header-text-variant="primary" body-text-variant="primary" v-model="modalShow" id="modal" size="sm" title="Face Matcher">
        {{ modalText }}
        <div slot="modal-footer" class="w-100">
          <b-button size="sm" class="float-right" variant="primary" @click="cleanUp">Close</b-button>
        </div>
      </b-modal>
     </b-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  /* eslint-disable */
  name: 'Verify',
  data () {
    return {
      image: '',
      sendButtonText: 'Send Photo',
      isSending: false,
      photoFilename: '',
      modalText: '',
      modalShow: false
    }
  },
  methods: {
    onFileChange (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files[0])
    },
    createImage (file) {
      console.log('createImage: ', file)
      // var image = new Image()
      let reader = new FileReader()
      const MAX_IMAGE_SIZE = 5000000
      reader.onload = (e) => {
        if (!e.target.result.includes('data:image/jpeg')) {
          return alert('Wrong photo type - only JPG allowed.')
        }
        if (e.target.result.length > MAX_IMAGE_SIZE) {
          return alert('Photo too large - max size of 5Mb')
        }
        this.image = e.target.result
        this.uploadImage()
      }
      reader.readAsDataURL(file)
    },
    async uploadImage () { 
      console.log('uploadImage started: ', this.image)    

      // Update UI
      this.isSending = true
      this.sendButtonText = 'Uploading...'

      // Get presigned URL from S3
      const response = await axios({ method: 'GET', url: `${this.$API}/upload?mode=verify` })
      console.log('Response: ', response.data)

      // Do the upload
      console.log('Uploading: ', this.image)
      let binary = atob(this.image.split(',')[1])
      let array = []
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i))
      }
      let blobData = new Blob([new Uint8Array(array)], {type: 'image/jpeg'})
      this.photoFilename = response.data.photoFilename

      console.log('Uploading to: ', response.data.uploadURL)
      const result = await fetch(response.data.uploadURL, {
        method: 'PUT',
        body: blobData
      })
      console.log('Result: ', result)

      // Check if the photo has been indexed. Retry every second for 5 seconds.
      console.log('checkStatus')
      let j = 0
      let status = {}
      do {
        status = await axios({ method: 'GET', url: `${this.$API}/checkstatus?photoFilename=${this.photoFilename}` })
        console.log('Request status: ', status)
        await this.sleep(1000) // set delay for retries
        if (status.data) break
        j++
      } while (j < 10)

      // Tell user about what happened...
      switch (status.data.result) {
        case 'MATCH':
          console.log(status.data)
          const memberPhoto = status.data.rekognition.FaceMatches[0].Face.ExternalImageId
          this.modalText = 'Success! You are a member. This is your original member photo:'
          this.image = `${this.$PHOTOS_URL}/${memberPhoto}`
          console.log(`${this.$PHOTOS_URL}/${memberPhoto}`)
          break
        case 'NO_MATCH':
          this.modalText = 'You are NOT a member.'
          break
        case 'NO_FACES':
          this.modalText = 'There is no face in this photo.'
          break
      }
      this.modalShow = true
    },
    cleanUp () {
      this.sendButtonText = 'Send Photo'
      this.isSending = false
      this.photoFilename = ''
      this.modalText = ''
      this.modalShow = false
    },
    async sleep (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
  }
}
</script>

