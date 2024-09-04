<script setup>
import Divider from './components/divider/Divider.vue'
import Recommend from './components/recommend/Recommend.vue'
import TopFreeApp from './components/topFreeApp/TopFreeApp.vue'
import { ref, onMounted, toRaw, watch } from 'vue'
import { ElInput, ElLoading } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import http from '@/service/http'

const finishRequest = ref(false)
const searchKey = ref('')
const recommendList = ref([])
const topFreeAppList = ref([])
const originalTopFreeAppList = ref([])
const ids = ref([])
const loadingEl = ref(null)

const getRecommend = () => {
  http.get('/rss/topgrossingapplications/limit=10/json')
    .then((response) => {
      const { err_code, data, message } = response
      if (err_code === 0) {
        let list = []
        data.feed.entry.forEach((item) => {
          const info = {
            id: item.id.attributes['im:id'],
            image: item['im:image'][2].label,
            name: item['im:name'].label,
            type: item.category.attributes.label
          }
          list.push(info)
        })
        recommendList.value = list
      } else {
        console.log(message)
      }
    })
}

const getTopFreeApp = () => {
  http.get('/rss/topfreeapplications/limit=100/json')
    .then((response) => {
      const { err_code, data, message } = response
      if (err_code === 0) {
        let list = []
        let idArr = []
        data.feed.entry.forEach((item) => {
          const id = item.id.attributes['im:id']
          const info = {
            id,
            image: item['im:image'][1].label,
            name: item['im:name'].label,
            type: item.category.attributes.label
          }
          list.push(info)
          idArr.push(id)
        })
        topFreeAppList.value = list
        ids.value = idArr
        getlookUp()
      } else {
        console.log(message)
      }
    })
}

const getlookUp = () => {
  http.get(`/lookup?id=${ids.value.join(',')}`)
    .then((response) => {
      const { err_code, data, message } = response
      if (err_code === 0) {
        if (topFreeAppList.value.length !== data.resultCount) {
          console.log('获取评论发生错误')
          return
        }
        topFreeAppList.value.forEach((item, index) => {
          const { averageUserRating, userRatingCount, artistName, description } = data.results[index]
          item.rate = averageUserRating
          item.userRatingCount = userRatingCount
          item.artistName = artistName
          item.description = description
        })
        finishRequest.value = true
        originalTopFreeAppList.value = toRaw(topFreeAppList.value)
      } else {
        console.log(message)
      }
    })
}

const onSearch = () => {
  const searchVal = searchKey.value.toLowerCase()
  if (searchVal !== '') {
    const filterArr = toRaw(topFreeAppList.value).filter((info) => {
      return info.name.toLowerCase().indexOf(searchVal) !== -1 ||
              info.artistName.toLowerCase().indexOf(searchVal) !== -1 ||
              info.description.toLowerCase().indexOf(searchVal) !== -1
    })
    topFreeAppList.value = filterArr
  } else {
    topFreeAppList.value = toRaw(originalTopFreeAppList.value)
  }
}

onMounted(() => {
  getRecommend()
  getTopFreeApp()
  loadingEl.value = ElLoading.service()
})

watch(finishRequest, (n) => {
  // if (n) {
    n && loadingEl.value.close()
  // }
})

</script>

<template>
  <div>
    <header>
      <el-input
        v-model="searchKey"
        class="search"
        placeholder="Search..."
        :prefix-icon="Search"
        clearable
        @keyup.enter="onSearch"
        @clear="onSearch"
      />
    </header>
    <template v-if="finishRequest">
      <Divider />
      <Recommend :recommendList="recommendList" />
      <Divider />
      <TopFreeApp :topFreeAppList="topFreeAppList"  />
    </template>
  </div>
</template>

<style lang="scss" scoped>

header {
  margin: 20px 10px 10px;
}
.el-input {
  --el-input-border-radius: 12px;
  --el-input-bg-color: #f4f4f4;
}
</style>
