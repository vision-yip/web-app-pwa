<script setup>
import Divider from '../divider/Divider.vue'
import { ElRate } from 'element-plus'
import { defineProps } from 'vue'

const { topFreeAppList } = defineProps({
  topFreeAppList: {
    type: Array,
    required: true
  }
})

</script>
<template>
  <div class="wrap">
    <div class="list" v-infinite-scroll="load">
      <div
        class="item"
        v-for="(item, index) in topFreeAppList"
        :key="item.id || index"
      >
        <div class="main">
          <div class="index">{{ index + 1 }}</div>
          <div class="image" :style="{ backgroundImage: `url(${item.image}` }"></div>
          <div class="desc">
            <div class="name text-ellipsis">{{ item.name }}</div>
            <div class="type text-ellipsis">{{ item.type }}</div>
            <div class="rate">
              <el-rate
                v-model="item.rate"
                size="small" 
                disabled
              />
              <span class="rating-count">{{ `(${item.userRatingCount})` }}</span>
            </div>
          </div>
        </div>
        <Divider />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.wrap {
  padding-left: 12px;
  box-sizing: border-box;
}
.main {
  display: flex;
  height: 100px;
  padding: 10px 0;
  box-sizing: border-box;
}
.item:nth-child(even) {
  .image {
    border-radius: 50%;
  }
}
.index {
  display: flex;
  align-items: center;
}
.image {
  width: 75px;
  height: 75px;
  margin: 0 10px 0 20px;
  border-radius: 10px;
  overflow: hidden;
}
.desc {
  max-width: 250px;
  .type {
    font-size: 13px;
    color: #bbb;
  }
}
.rate {
  display: flex;
  align-items: center;
}
.el-rate {
  --el-rate-icon-margin: 0;
}
.rating-count {
  font-size: 12px !important;
  color: #aaa;
  margin-left: 5px;
}
</style>