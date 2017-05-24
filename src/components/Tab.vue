<template>
  <div
    class="tab"
    :id="fruit.replace(/\s/, '').toLowerCase()"
    :style="tabPosition"
    @click="setActiveTab(fruit)"
    @mouseenter="left = -11.5"
    @mouseleave="left = -12">
    <div class="label">
      {{ fruit }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'tab',
  props: ['fruit'],
  data () {
    return {
      tabData: {},
      left: -12
    }
  },
  computed: {
    ...mapGetters([
      'activeTab'
    ]),
    tabPosition () {
      this.$set(this.tabData, 'activeTab', this.activeTab)
      let transition = 0.8
      if (this.left === 0) {
        this.left = -12
      } else if (this.activeTab === this.fruit) {
        this.left = 0
      } else {
        transition = 0.1
      }
      return {
        '-webkit-transition': `left ease-out ${transition}s`,
        transition: `left ease-out ${transition}s`,
        left: `${this.left}vh`
      }
    }
  },
  methods: {
    ...mapActions([
      'setActiveTab'
    ])
  }
}
</script>

<style scoped>
.tab {
  position: fixed;
  cursor: pointer;
  display: table;
  font-size: 1.3vh;
  height: 4vh;
  width: 16vh;
  left: -12vh;
  border-top-style: solid;
  border-bottom-style: solid;
  border-right-style: solid;
  border-top-right-radius: .36vh;
  border-bottom-right-radius: .36vh;
  border-width: .16vh;
  border-color: #FFFFFF;
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
}

.label {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}

#love {
  top: 1vh;
  background-color: #DF01D7;
}

#joy {
  top: 6vh;
  background-color: #00FFFF;
}

#peace {
  top: 11vh;
  background-color: #01DF74;
}

#patience {
  top: 16vh;
  background-color: #EFD000;
}

#kindness {
  top: 21vh;
  background-color: #8258FA;
}

#goodness {
  top: 26vh;
  background-color: #FF8000;
}

#faithfulness {
  top: 31vh;
  background-color: #DF0174;
}

#gentleness {
  top: 36vh;
  background-color: #CACACA;
}

#selfcontrol {
  top: 41vh;
  background-color: #2E64FE;
}
</style>
