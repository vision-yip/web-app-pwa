<script setup>

const { recommendList } = defineProps({
  recommendList: {
    type: Array,
    required: true
  }
})

</script>
<template>
  <div class="wrap">
    <div class="title">Recommend</div>
    <div class="recommend">
      <div class="list">
        <div
          class="item"
          v-for="(item, index) in recommendList"
          :key="item.id || index"
        >
          <div class="image" :style="{backgroundImage: `url(${item.image})`}">
          </div>
          <div class="name text-ellipsis">{{ item.name }}</div>
          <div class="type text-ellipsis">{{ item.type }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.wrap {
  padding-left: 12px;
  font-weight: bold;
  width: 100%;
  box-sizing: border-box;;
}
.title {
  font-size: 18px;
  margin-bottom: 5px;
}
.recommend {
  overflow-x: scroll;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    display: none;
    }
}
.list {
  display: flex;
  width: max-content;
  margin-bottom: 10px;
}
.item {
  width: 100px;
  line-height: 1.3;
  display: flex;
  place-items: center;
  flex-direction: column;
  & + & {
    margin-left: 8px;
  }
  &:last-child {
    margin-right: 8px;
  }
  .image {
    width: 90px;
    height: 90px;
    overflow: hidden;
    border-radius: 20px;
  }
  .name,
  .type {
    font-size: 13px;
    max-width: 80px;
  }
  .name {
    margin-top: 5px;
  }
  .type{
    color: #bbb;
  }
}
</style>