<template>
  <div id="app">
    <tabs></tabs>
  </div>
</template>

<script>
import Tabs from './Tabs'

export default {
  name: 'app',
  components: {
    Tabs
  }
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
  background-color: #12a6bd;
}

#app {
  font-family: "Helvetica", "Arial", sans-serif;
  font-weight: 300;
  color: #ffffff;
}

::selection {
    color: #FFF2a8;
}

::-moz-selection {
    color: #FFF2a8;
}
</style>
