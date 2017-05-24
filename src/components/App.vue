<template>
  <div id="app">
    <tab
      v-for='fruit in fruits'
      :fruit=fruit
    />
  </div>
</template>

<script>
import Tab from './Tab'

const fruits = ['Love', 'Joy', 'Peace', 'Patience', 'Kindness', 'Goodness', 'Faithfulness', 'Gentleness', 'Self Control']

export default {
  name: 'app',
  components: {
    Tab
  },
  data () {
    return {
      fruits: fruits,
    }
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
