<template>
  <div
    class="tab"
    :id="fruitId"
    :style="tabPosition"
    @click="onClickTab"
    @mouseenter="isMouseOver = true"
    @mouseleave="isMouseOver = false">
    <div class="label">{{ fruit }}</div>
  </div>
</template>

<script>
export default {
  name: 'tab',
  props: {
    fruit: {
      type: String,
      required: true
    },
    isActive: Boolean
  },
  data () {
    return {
      isMouseOver: false,
      isTabOpen: false,
      timeoutId: null
    }
  },
  computed: {
    fruitId () {
      return this.fruit.replace(/\s/, '').toLowerCase()
    },
    tabPosition () {
      if (!this.isActive && this.isTabOpen) {
        this.timeoutId = setTimeout(() => { this.isTabOpen = false }, 800)
      } else if (this.isActive && !this.isTabOpen) {
        this.isTabOpen = true
        clearTimeout(this.timeoutId)
      }
      const transition = this.isTabOpen ? 0.8 : 0.1
      const left = this.isActive ? 0 : (this.isMouseOver ? -11.5 : -12)
      return {
        '-webkit-transition': `left ease-out ${transition}s`,
        transition: `left ease-out ${transition}s`,
        left: `${left}vh`
      }
    }
  },
  methods: {
    onClickTab () {
      this.$emit('clicked', this.fruit)
    }
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
