<template>
  <div>
    <b-card title="How does this work?" >
      <b-card-text>
        This application allows you to enroll a person's face as a member of a group, then verify faces to confirm if they are registered members.
      </b-card-text>
      <b-button :to="{ name: 'enroll'}" variant="info" block>Enroll</b-button>
      <b-button :to="{ name: 'verify'}" variant="primary" block>Verify</b-button>
    </b-card>
      <b-card bg-variant="danger fixed-bottom" text-variant="white" header="Important!" class="text-center">
      <b-card-text>This demo stores an image of your face in an S3 bucket and a derived representation in AWS Rekognition. The data is only used for this demo and isn't used for anything else. You give your consent for your image to be used for this purpose.</b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'Main'
}
</script>
