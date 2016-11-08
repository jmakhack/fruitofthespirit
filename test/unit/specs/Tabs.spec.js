import Vue from 'vue'
import Tabs from 'src/components/Tabs'

describe('Tabs.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (f) => f(Tabs)
    })
    expect(vm.$el.querySelector('.tabs .tab').textContent)
      .to.equal('love')
  })
})
