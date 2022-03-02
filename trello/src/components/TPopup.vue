<template>
  <div class="popup-container">
    <div @click="open">
      <slot name="open" />
    </div>
    <div class="popup" v-show="isShow" ref="popup">
      <div class="popup-header">
        <span class="popup-title">{{ title }}</span>
        <a class="popup-header-close" @click="close" ref="close">
          <i class="icon icon-close"></i>
        </a>
      </div>
      <div class="popup-content">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TPopup',

  props: {
    title: {
      type: String,
      default: '菜单'
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    open() {
      if (this.isShow) return
      this.isShow = true
      window.addEventListener('click', this.close)

      this.$nextTick(() => {
        const popup = this.$refs.popup

        const rect = popup.getBoundingClientRect()
        if (rect.right > window.innerWidth) {
          popup.style.left = -rect.width + this.$el.offsetWidth + 'px'
        }
      })
    },
    close(e) {
      if (!e || e.path.includes(this.$refs.close) || !e.path.includes(this.$el)) {
        this.isShow = false
        window.removeEventListener('click', this.close)
      }
    }
  }
}
</script>
