import Vue from 'vue'
import UiInput from '@/components/ui-input.vue'
import UiButtom from '@/components/ui-button.vue'

const components = {
  UiInput,
  UiButtom
}

Object
  .entries(components)
  .forEach(([name, component]) => {
    Vue.component(name, component)
  })
