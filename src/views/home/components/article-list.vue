<template>
  <div class="scroll-wrapper">
    <van-pull-refresh v-model="downLoading" @refresh="onRefresh" :success-text="refreshSuccessText">
      <van-list v-model="upLoading" :finished="finished" @load="onLoad" finished-text="没有更多了">
        <van-cell :to="`/article?articleId=${article.art_id.toString()}`" v-for="article in articles" :key="article.art_id.toString()">
          <div class="article_item">
            <h3 class="van-ellipsis">{{article.title}}</h3>
            <div class="img_box" v-if="article.cover.type===3">
              <van-image lazy-load class="w33" fit="cover" :src="article.cover.images[0]" />
              <van-image lazy-load class="w33" fit="cover" :src="article.cover.images[1]" />
              <van-image lazy-load class="w33" fit="cover" :src="article.cover.images[2]" />
            </div>
            <div class="img_box" v-if="article.cover.type===1">
              <van-image lazy-load class="w100" fit="cover" :src="article.cover.images[0]" />
            </div>
            <div class="info_box">
              <span>{{article.aut_name}}</span>
              <span>{{article.comm_count}}评论</span>
              <span>{{article.pubdate|relTime}}</span>
              <span class="close" v-if="user.token" @click.stop="$emit('showMoreAction',article.art_id.toString())">
                <van-icon name="cross"></van-icon>
              </span>
            </div>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import { mapState } from 'vuex'
import eventBus from '@/utils/eventBus'
export default {
  name: 'article-list',
  props: {
    channel_id: {
      required: true,
      type: Number,
      default: null
    }
  },
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      refreshSuccessText: '',
      downLoading: false,
      upLoading: false,
      finished: false,
      articles: [],
      timestamp: null
    }
  },
  created () {
    eventBus.$on('delArticle', (articleId, channelId) => {
      if (this.channel_id === channelId) {
        let index = this.articles.findIndex(item => item.art_id.toString() === articleId)
        if (index > -1) {
          this.articles.splice(index, 1)
        }
      }
    })
  },
  methods: {
    // 上拉加载
    async onLoad () {
      await this.$sleep()
      //   console.log('加载数据')
      //   setTimeout(() => {
      //     if (this.articles.length < 50) {
      //       let arr = Array.from(
      //         Array(10),
      //         (value, index) => index + this.articles.length + 1
      //       )
      //       this.articles.push(...arr)
      //       this.uploading = false
      //     } else {
      //       this.finished = true
      //     }
      //   }, 1000)
      const data = await getArticles({
        channel_id: this.channel_id,
        timestamp: this.timestamp || Date.now()
      })
      //   console.log(data)
      this.articles.push(...data.results)
      this.upLoading = false
      if (data.pre_timestamp) {
        this.timestamp = data.pre_timestamp
      } else {
        this.finished = true
      }
    },
    async onRefresh () {
      await this.$sleep()
      //   setTimeout(() => {
      //     let arr = Array.from(Array(10), (value, index) => index + 1)
      //     this.articles.unshift(...arr)
      //     this.downLoading = false
      //     this.refreshSuccessText = `更新了${arr.length}条数据`
      //   }, 1000)
      const data = await getArticles({ channel_id: this.channel_id, timestamp: Date.now() })
      this.downLoading = false
      if (data.results.length) {
        this.articles = data.results
        this.finished = false
        this.timestamp = data.pre_timestamp
        this.refreshSuccessText = `更新了${data.results.length}条数据`
      } else {
        this.refreshSuccessText = '已是最新数据'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article_item {
  h3 {
    font-weight: normal;
    line-height: 2;
  }
  .img_box {
    display: flex;
    justify-content: space-between;
    .w33 {
      width: 33%;
      height: 90px;
    }
    .w100 {
      width: 100%;
      height: 180px;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    font-size: 12px;
    span {
      padding-right: 10px;
      &.close {
        border: 1px solid #ddd;
        border-radius: 2px;
        line-height: 15px;
        height: 12px;
        width: 16px;
        text-align: center;
        padding-right: 0;
        font-size: 8px;
        position: absolute;
        right: 0;
        top: 7px;
      }
    }
  }
}
</style>
