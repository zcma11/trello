<template>
  <div id="board">
    <t-header />
    <!--正文-->
    <main v-if="board">
      <h2>
        {{ board.name }}
        <span class="btn btn-icon"> 邀请 </span>
      </h2>

      <!--面板容器-->
      <div class="board">
        <!--面板列表容器-->
        <t-list
          @dragStart="dragStart"
          @dragMove="dragMove"
          @dragEnd="dragEnd"
          v-for="(list, index) in lists"
          :key="list.id"
          :index="index"
          :list="list"
          :data-order="list.order"
        />

        <!--无内容列表容器-->
        <div
          class="list-wrap no-content"
          :class="{ 'list-adding': isAddingList }"
        >
          <div class="list-add" @click="wantToAddList">
            <span class="icon icon-add"></span>
            <span>添加另一个列表</span>
          </div>

          <div class="list">
            <div class="list-cards">
              <div class="list-card-add-form">
                <input
                  @keyup.enter="addList"
                  class="form-field-input"
                  ref="listNameInput"
                  placeholder="为这张卡片添加标题……"
                />
              </div>
            </div>

            <div class="list-footer">
              <div class="list-add-confirm">
                <button class="btn btn-success" @click="addList">
                  添加列表
                </button>
                <span class="icon icon-close" @click="cancelAddList"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <router-view></router-view>
  </div>
</template>

<script>
import THeader from '@/components/THeader'
import TList from '@/components/TList'

export default {
  components: {
    THeader,
    TList
  },
  created() {
    const boardId = this.$route.params.id
    const { dispatch } = this.$store
    if (!this.board) {
      dispatch('board/getBoard', +boardId)
    }
    if (this.lists.length === 0) {
      dispatch('list/getLists', +boardId)
    }
  },
  data() {
    return {
      isAddingList: false
    }
  },
  computed: {
    board() {
      return this.$store.getters['board/getBoard'](+this.$route.params.id)
    },
    lists() {
      return this.$store.getters['list/getList'](this.$route.params.id)
    }
  },

  methods: {
    wantToAddList() {
      this.isAddingList = true
      this.$nextTick(() => {
        this.$refs.listNameInput.focus()
      })
    },
    cancelAddList() {
      this.isAddingList = false
      this.$refs.listNameInput.value = ''
    },
    async addList() {
      const input = this.$refs.listNameInput
      const name = input.value

      if (!name.trim()) {
        input.focus()
        return
      }

      await this.$store.dispatch('list/postList', {
        boardId: this.board.id,
        name
      })
      this.$message.success('创建成功')
      this.cancelAddList()
    },
    dragStart() {},
    dragMove({ x, y, el }) {
      const board = el.parentNode
      const listsEls = [...board.querySelectorAll('.list-wrap')]
      const dragELIndex = listsEls.findIndex(list => list === el)
      listsEls.forEach((list, i) => {
        const pos = list.getBoundingClientRect()
        if (x < pos.right && x > pos.left && y < pos.bottom && y > pos.top) {
          if (i > dragELIndex) {
            board.insertBefore(el, list.nextElementSibling)
          } else {
            board.insertBefore(el, list)
          }
        }
      })
    },
    dragEnd({ list: currentList, el: currentListEl, originIndex }) {
      const listsEls = [
        ...currentListEl.parentNode.querySelectorAll('.list-wrap')
      ]
      const currentIndex = listsEls.findIndex(list => list === currentListEl)

      const prevOrder =
        listsEls[currentIndex - 1] &&
        parseFloat(listsEls[currentIndex - 1].dataset.order)
      const nextOrder =
        listsEls[currentIndex + 1] &&
        parseFloat(listsEls[currentIndex + 1].dataset.order)
      let order
      if (currentIndex !== originIndex) {
        if (currentIndex === 0) {
          order = nextOrder / 2
        } else if (currentIndex === listsEls.length - 2) {
          order = prevOrder + 65535
        } else {
          order = prevOrder + (nextOrder - prevOrder) / 2
        }
      }

      this.$store.dispatch('list/putList', [
        currentList.id,
        {
          order
        }
      ])
    }
  }
}
</script>
