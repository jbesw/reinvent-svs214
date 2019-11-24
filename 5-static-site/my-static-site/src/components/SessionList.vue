<template>
  <v-container>
    <loading :active.sync="isLoading" 
      :is-full-page="fullPage">
    </loading>
    <v-layout text-center wrap>
      <v-flex xs12 mb-4>
         <v-avatar size="140">
          <img src="https://d15l97sovqpx31.cloudfront.net/images/jbesw-square.png" alt="James Beswick">
          </v-avatar>
      </v-flex>

      <v-flex mb-4>
        <h2 class="headline font-weight-bold mb-3">Where's James at re:Invent?</h2>
        <p class="subheading font-weight-regular">
          Here's a list of sessions...
        </p>
      </v-flex>

      <v-flex mb-5 xs12>
        <v-simple-table>
            <thead>
              <tr>
                <th class="text-left">Event</th>
                <th class="text-center">Date/time</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in sessions" :key="item.name">
                <td class="text-left">{{ item.name }}</td>
                <td>{{ item.when }}</td>
              </tr>
            </tbody>
        </v-simple-table>
      </v-flex>
    </v-layout>

     <v-footer dark padless absolute>
      <v-card flat tile width="100%" class="indigo lighten-1 text-center">
        <v-card-text class="white--text">
          See this code on https://github.com/jbesw
        </v-card-text>
      </v-card>
    </v-footer>

  </v-container>
</template>

<script>
/* eslint-disable */
import Loading from 'vue-loading-overlay'
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
const sessionsAPI = '<< ENTER YOUR API ENDPOINT >>'

export default {
  name: 'SessionList',
  components: {
      Loading
  },  
  mounted: async function () {
    this.isLoading = true
    try {
      const response = await axios.get(sessionsAPI)
      console.log('Sessions: ', response.data)

      response.data.map((item) => {
        console.log(item)
        this.sessions.push ({
          name: `${item.SessionID} - ${item.Description}`,
          when: item.When
        })
      })
      this.isLoading = false
    } catch (err) {
      console.error(err)
    }    
  },
  data: () => ({
    isLoading: false,
    fullPage: true,
    sessions: []
  })
}
</script>
