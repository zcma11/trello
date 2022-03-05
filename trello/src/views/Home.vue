<template>
  <div id="home">
    <t-header />

    <main>
      <h2>
        <span class="icon icon-board"></span>
        我的看板
      </h2>
      <ul class="board-items">
        <router-link
          v-for="board in boards"
          :key="board.id"
          custom
          :to="{ name: 'Board', params: { id: board.id } }"
          v-slot="{ navigate }"
        >
          <li class="board-item" @click="navigate">
            <span class="title">{{ board.name }}</span>
          </li>
        </router-link>
        <li class="board-item create-new-board">
          <textarea
            class="title form-field-input"
            placeholder="创建新看板"
            v-model="newBoardName"
            @blur="addBoard"
          ></textarea>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import THeader from '@/components/THeader'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    THeader
  },
  created() {
    if (!this.inited) {
      this.$store.dispatch('board/getAllBoards')
    }
  },
  data() {
    return {
      newBoardName: ''
    }
  },
  computed: {
    ...mapState('board', {
      boards: state => state.boards,
      inited: state => state.inited
    })
  },
  methods: {
    addBoard() {
      if (this.newBoardName.trim() === '') return
      this.$store.dispatch('board/postBoard', {
        name: this.newBoardName
      })

      this.$message.success('创建成功')

      this.newBoardName = ''
    }
  }
}
</script>
