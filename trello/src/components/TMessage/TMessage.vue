<template>
  <transition name="message-fade">
    <div
      class="message is-center"
      :class="[`message-${type}`]"
      v-if="isShow"
      :style="{ top: offset + 'px' }"
    >
      <p class="message-content">提示信息：{{ message }}</p>
      <i class="icon icon-close" @click="close"></i>
    </div>
  </transition>
</template>

<script>
import './index.css'
export default {
  data() {
    return {
      message: '这是默认信息',
      isShow: true,
      type: 'success',
      duration: 1500,
      offset: 20
    }
  },
  mounted() {
    this.timer = setTimeout(() => {
      this.close()
    }, this.duration)
  },
  methods: {
    close() {
      clearTimeout(this.timer)
      this.isShow = false
      if (typeof this.onClose === 'function') {
        this.onClose()
      }
    }
  }
}
</script>
