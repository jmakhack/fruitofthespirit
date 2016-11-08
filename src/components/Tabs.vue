<template>
  <div class="tabs">
    <tab v-for='fruit in fruits' :fruit=fruit></tab>
  </div>
</template>

<script>
import Tab from './Tab'

export default {
  name: 'tabs',
  components: {
    Tab
  },
  data () {
    return {
      fruits: [
        'Love',
        'Joy',
        'Peace',
        'Patience',
        'Kindness',
        'Goodness',
        'Faithfulness',
        'Gentleness',
        'Self Control'
      ]
    }
  }
}
</script>
