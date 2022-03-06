<template>
  <div class="list-wrap" :class="{ 'list-adding': isAddingCard }">
    <div class="list-placeholder" ref="placeholder"></div>

    <div class="list" ref="list">
      <div class="list-header" ref="listHeader">
        <textarea
          class="form-field-input"
          ref="listNameInput"
          v-model="name"
          @mousedown.prevent
          @blur="updateName"
        ></textarea>
        <div class="extras-menu" @mousedown.prevent>
          <span class="icon icon-more"></span>
        </div>
      </div>

      <div class="list-cards">
        <t-card v-for="card in cards" :key="card.id" :card="card" />

        <div class="list-card-add-form">
          <textarea
            v-model="cardName"
            ref="cardNameInput"
            class="form-field-input"
            placeholder="为这张卡片添加标题……"
          ></textarea>
        </div>
      </div>

      <div class="list-footer">
        <div class="list-card-add" @click="wantToAddCard">
          <span class="icon icon-add"></span>
          <span>添加另一张卡片</span>
        </div>
        <div class="list-add-confirm">
          <button class="btn btn-success" @click="addCard">添加卡片</button>
          <span class="icon icon-close" @click="cancelAddCard"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TCard from '@/components/TCard'
export default {
  name: 'TList',
  components: {
    TCard
  },
  props: {
    list: Object,
    index: Number
  },
  async created() {
    this.name = this.list.name
    if (this.cards.length === 0) {
      await this.$store.dispatch('card/getAllCards', this.list.id)
    }
  },
  mounted() {
    const listHeader = this.$refs.listHeader
    listHeader.addEventListener('mousedown', this.dragDown)
    document.addEventListener('mousemove', this.dragMove)
    document.addEventListener('mouseup', this.dragUp)
  },
  data() {
    return {
      name: '',
      cardName: '',
      drag: {
        isDrag: false,
        isDown: false,
        downClientX: 0,
        downClientY: 0,
        downElementX: 0,
        downElementY: 0
      },
      isAddingCard: false
    }
  },
  computed: {
    cards() {
      return this.$store.getters['card/getCards'](this.list.id)
    }
  },
  methods: {
    dragDown(e) {
      const { drag } = this
      drag.isDown = true
      drag.downClientX = e.clientX
      drag.downClientY = e.clientY

      const pos = this.$refs.list.getBoundingClientRect()
      drag.downElementX = pos.x
      drag.downElementY = pos.y
    },
    dragMove(e) {
      const { drag } = this
      if (drag.isDown) {
        const offsetX = e.clientX - drag.downClientX
        const offsetY = e.clientY - drag.downClientY
        const ele = this.$refs.list

        if (!drag.isDrag) {
          if (Math.abs(offsetX) > 10 || Math.abs(offsetY) > 10) {
            drag.isDrag = true
            this.$refs.placeholder.style.height = ele.offsetHeight + 'px'
            ele.style.position = 'absolute'
            ele.style.transform = 'rotate(3deg)'
            ele.style.zIndex = 99999
            document.body.appendChild(ele)
            ele.style.left = offsetX + drag.downElementX + 'px'
            ele.style.top = offsetY + drag.downElementY + 'px'
            this.$emit('dragStart')
          }
        } else {
          ele.style.left = offsetX + drag.downElementX + 'px'
          ele.style.top = offsetY + drag.downElementY + 'px'
          this.$emit('dragMove', {
            x: e.clientX,
            y: e.clientY,
            el: this.$el
          })
        }
      }
    },
    dragUp(e) {
      const { drag } = this
      if (drag.isDown) {
        if (drag.isDrag) {
          // 移动
          this.$refs.placeholder.style.height = 0
          const ele = this.$refs.list
          ele.style.postion = 'relative'
          ele.style.zIndex = 0
          ele.style.left = 0
          ele.style.top = 0
          ele.style.transform = 'rotate(0deg)'
          this.$el.appendChild(ele)
          this.$emit('dragEnd', {
            list: this.list,
            el: this.$el,
            originIndex: this.index
          })
        } else {
          // 没有拖拽
          this.$refs.listNameInput.select()
        }
        drag.isDown = drag.isDrag = false
      }
    },
    async updateName() {
      const name = this.name
      await this.$store.dispatch('list/putList', [
        this.list.id,
        {
          name
        }
      ])
    },
    wantToAddCard() {
      this.isAddingCard = true
      this.$nextTick(() => {
        this.$refs.cardNameInput.focus()
      })
    },
    cancelAddCard() {
      this.cardName = ''
      this.isAddingCard = false
    },
    async addCard() {
      const name = this.cardName
      if (!name.trim()) {
        return this.$refs.cardNameInput.focus()
      }

      await this.$store.dispatch('card/postCard', {
        name,
        boardListId: this.list.id
      })

      this.cancelAddCard()
    }
  }
}
</script>
