<template>
  <v-app>
    <v-content>
      <SessionList/>
    </v-content>
  </v-app>
</template>

<script>
import SessionList from './components/SessionList'

export default {
  name: 'App',

  components: {
    SessionList,
  }
}
</script>
