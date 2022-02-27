import TMessage from './TMessage'
import Vue from 'vue'

const vms = []
function Message(option = {}) {
  if (typeof option === 'string') {
    option = { message: option, type: 'success' }
  }

  const Ctor = Vue.extend(TMessage)
  const vm = new Ctor({
    data() {
      return option
    }
  })

  vm.$mount()
  document.querySelector('body').appendChild(vm.$el)

  let offset = vm.offset
  vm.offset += vms.reduce((a, b) => a + b.$el.offsetHeight + offset, 0)
  vms.push(vm)
  console.log(vm.offset)

  vm.onClose = Message.close.bind(vm, vm, offset)
}

Message.close = (vm, offset) => {
  const i = vms.findIndex(item => item === vm)
  if (i >= 0) {
    vms.splice(i, 1)
    const offsetHeight = vm.$el.offsetHeight
    for (let j = i; j < vms.length; j++) {
      vms[j].offset -= offsetHeight + offset
    }
  }
}
;['success', 'warn', 'error'].forEach(type => {
  Message[type] = msg => {
    Message({ message: msg, type })
  }
})

export default Message
