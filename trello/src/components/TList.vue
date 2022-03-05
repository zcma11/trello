<template>
  <div class="list-wrap" :class="{ 'list-adding': false }">
    <div class="list-placeholder" ref="placeholder"></div>

    <div class="list" ref="list">
      <div class="list-header" ref="listHeader">
        <textarea
          class="form-field-input"
          ref="listNameInput"
          v-model="name"
          @mousedown.prevent
        ></textarea>
        <div class="extras-menu" @mousedown.prevent>
          <span class="icon icon-more"></span>
        </div>
      </div>

      <div class="list-cards">
        <div class="list-card">
          <div
            class="list-card-cover"
            style="
              background-image: url(https://trello-attachments.s3.amazonaws.com/5ddf961b5e861107e5f2de49/200x200/96d8fa19e335be20c102d394ef4bed71/logo.png);
            "
          ></div>
          <div class="list-card-title">接口代码编写及测试</div>
          <div class="list-card-badges">
            <div class="badge">
              <span class="icon icon-description"></span>
            </div>
            <div class="badge">
              <span class="icon icon-comment"></span>
              <span class="text">2</span>
            </div>
            <div class="badge">
              <span class="icon icon-attachment"></span>
              <span class="text">5</span>
            </div>
          </div>
        </div>

        <div class="list-card">
          <div class="list-card-title">接口代码编写及测试</div>
          <div class="list-card-badges">
            <div class="badge">
              <span class="icon icon-description"></span>
            </div>
            <div class="badge">
              <span class="icon icon-comment"></span>
              <span class="text">2</span>
            </div>
            <div class="badge">
              <span class="icon icon-attachment"></span>
              <span class="text">5</span>
            </div>
          </div>
        </div>

        <div class="list-card">
          <div
            class="list-card-cover"
            style="
              background-image: url(https://trello-attachments.s3.amazonaws.com/5ddf961b5e861107e5f2de49/200x200/96d8fa19e335be20c102d394ef4bed71/logo.png);
            "
          ></div>
          <div class="list-card-title">接口代码编写及测试</div>
          <div class="list-card-badges">
            <div class="badge">
              <span class="icon icon-description"></span>
            </div>
            <div class="badge">
              <span class="icon icon-comment"></span>
              <span class="text">2</span>
            </div>
            <div class="badge">
              <span class="icon icon-attachment"></span>
              <span class="text">5</span>
            </div>
          </div>
        </div>

        <div class="list-card">
          <div class="list-card-title">接口代码编写及测试</div>
          <div class="list-card-badges">
            <div class="badge">
              <span class="icon icon-description"></span>
            </div>
            <div class="badge">
              <span class="icon icon-comment"></span>
              <span class="text">2</span>
            </div>
            <div class="badge">
              <span class="icon icon-attachment"></span>
              <span class="text">5</span>
            </div>
          </div>
        </div>

        <div class="list-card">
          <div
            class="list-card-cover"
            style="
              background-image: url(https://trello-attachments.s3.amazonaws.com/5ddf961b5e861107e5f2de49/200x200/96d8fa19e335be20c102d394ef4bed71/logo.png);
            "
          ></div>
          <div class="list-card-title">接口代码编写及测试</div>
          <div class="list-card-badges">
            <div class="badge">
              <span class="icon icon-description"></span>
            </div>
            <div class="badge">
              <span class="icon icon-comment"></span>
              <span class="text">2</span>
            </div>
            <div class="badge">
              <span class="icon icon-attachment"></span>
              <span class="text">5</span>
            </div>
          </div>
        </div>

        <div class="list-card">
          <div
            class="list-card-cover"
            style="
              background-image: url(https://trello-attachments.s3.amazonaws.com/5ddf961b5e861107e5f2de49/200x200/96d8fa19e335be20c102d394ef4bed71/logo.png);
            "
          ></div>
          <div class="list-card-title">接口代码编写及测试</div>
          <div class="list-card-badges">
            <div class="badge">
              <span class="icon icon-description"></span>
            </div>
            <div class="badge">
              <span class="icon icon-comment"></span>
              <span class="text">2</span>
            </div>
            <div class="badge">
              <span class="icon icon-attachment"></span>
              <span class="text">5</span>
            </div>
          </div>
        </div>

        <div class="list-card">
          <div
            class="list-card-cover"
            style="
              background-image: url(https://trello-attachments.s3.amazonaws.com/5ddf961b5e861107e5f2de49/200x200/96d8fa19e335be20c102d394ef4bed71/logo.png);
            "
          ></div>
          <div class="list-card-title">接口代码编写及测试</div>
          <div class="list-card-badges">
            <div class="badge">
              <span class="icon icon-description"></span>
            </div>
            <div class="badge">
              <span class="icon icon-comment"></span>
              <span class="text">2</span>
            </div>
            <div class="badge">
              <span class="icon icon-attachment"></span>
              <span class="text">5</span>
            </div>
          </div>
        </div>

        <div class="list-card-add-form">
          <textarea
            class="form-field-input"
            placeholder="为这张卡片添加标题……"
          ></textarea>
        </div>
      </div>

      <div class="list-footer">
        <div class="list-card-add">
          <span class="icon icon-add"></span>
          <span>添加另一张卡片</span>
        </div>
        <div class="list-add-confirm">
          <button class="btn btn-success">添加卡片</button>
          <span class="icon icon-close"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TList',
  props: {
    list: Object
  },
  created() {
    this.name = this.list.name
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
      drag: {
        isDrag: false,
        isDown: false,
        downClientX: 0,
        downClientY: 0,
        downElementX: 0,
        downElementY: 0
      }
    }
  },
  methods: {
    dragDown(e) {
      const { drag } = this
      drag.isDown = true
      drag.downClientX = e.clientX
      drag.downClientY = e.clientY

      const pos = this.$refs.list.getBoundingClientRect()
      console.log(pos)
      drag.downElementX = pos.x
      drag.downElementY = pos.y
    },
    dragMove(e) {
      const { drag } = this
      if (drag.isDown) {
        const offsetX = e.clientX - drag.downClientX
        const offsetY = e.clientY - drag.downClientY
        console.log(offsetX, offsetY)
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
      console.log(drag.isDrag, drag.isDown)
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
            component: this
          })
        } else {
          // 没有拖拽
          this.$refs.listNameInput.select()
        }
        drag.isDown = drag.isDrag = false
      }
    }
  }
}
</script>
