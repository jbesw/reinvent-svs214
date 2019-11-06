<template>
  <b-navbar toggleable="lg" type="dark" variant="primary fixed-top">
    <b-navbar-brand href="#">Face Matcher</b-navbar-brand>
    <b-navbar-toggle target="nav_collapse" />
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'enroll'}">Enroll</b-nav-item>
        <b-nav-item :to="{ name: 'verify'}">Verify</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'Nav'
}
</script>
