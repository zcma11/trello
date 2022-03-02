<template>
  <ul class="popup-menu-list">
    <li
      v-for="item in items"
      :key="item.name"
      :class="{ separator: item.separator }"
      @click="$emit('command', item.command)"
    >
      <span>{{ item.name }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TPopupMenu',
  props: {
    items: Array
  }
}
</script>
