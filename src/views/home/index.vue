<template>
  <div class="container">
    <van-tabs v-model="activeIndex" swipeable>
      <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
        <!-- 这里注意 这个div设置了滚动条 目的是 给后面做 阅读记忆 留下伏笔 -->
        <!-- 阅读记忆 => 看文章看到一半 滑到中部 去了别的页面 当你回来时 文章还在你看的位置 -->
        <!-- <div class='scroll-wrapper'>
          <van-cell-group>
            <van-cell v-for="obj in 20" :key="obj" :title="item"></van-cell>
          </van-cell-group>
        </div> -->
        <ArticleList :channel_id="channel.id" @showMoreAction="openMoreAction"></ArticleList>
      </van-tab>
    </van-tabs>
    <span class="bar_btn">
      <van-icon name="wap-nav" @click="showChannelEdit=true"/>
    </span>
    <van-popup :style="{ width: '80%' }" v-model="showMoreAction">
      <more-action @dislike="dislikeOrReport($event,'dislike')" @report="dislikeOrReport($event,'report')"></more-action>
    </van-popup>
    <van-action-sheet :round="false" title="编辑频道" v-model="showChannelEdit">
      <channel-edit :channels="channels"></channel-edit>
    </van-action-sheet><channel-edit v-model="showChannelEdit"></channel-edit>
  </div>
</template>

<script>
import ArticleList from './components/article-list'
import { getMyChannels } from '@/api/channel'
import MoreAction from './components/more-action'
import { disLikeArticle, reportArticle } from '@/api/article'
import eventBus from '@/utils/eventBus'
import ChannelEdit from './components/channel-edit'
export default {
  name: 'home',
  components: { ArticleList, MoreAction, ChannelEdit },
  data () {
    return {
      activeIndex: 0,
      channels: [],
      showMoreAction: false,
      articleId: null,
      showChannelEdit: false
    }
  },
  created () {
    this.getMyChannels()
  },
  methods: {
    async getMyChannels () {
      let data = await getMyChannels()
      this.channels = data.channels
    },
    openMoreAction (artId) {
      this.showMoreAction = true
      this.articleId = artId
    },
    // async dislike () {
    //   try {
    //     if (this.articleId) {
    //       await disLikeArticle({
    //         target: this.articleId
    //       })
    //       this.$mynotify({ type: 'success', message: '操作成功' })
    //       eventBus.$emit('delArticle', this.articleId, this.channels[this.activeIndex].id)
    //       this.showMoreAction = false
    //     }
    //   } catch (err) {
    //     this.$mynotify({ type: 'danger', message: '操作失败' })
    //   }
    // },
    // async report (stype) {
    //   try {
    //     if (this.articleId) {
    //       await reportArticle({
    //         target: this.articleId, type: stype
    //       })
    //       this.$mynotify({ type: 'success', message: '操作成功' })
    //       eventBus.$emit('delArticle', this.articleId, this.channels[this.activeIndex].id)
    //       this.showMoreAction = false
    //     }
    //   } catch (err) {
    //     this.$mynotify({ type: 'danger', message: '操作失败' })
    //   }
    // }
    async dislikeOrReport (params, operatetype) {
      try {
        if (this.articleId) {
          operatetype === 'dislike'
            ? await disLikeArticle({
              target: this.articleId
            }) : await reportArticle({
              target: this.articleId,
              type: params
            })
          this.$mynotify({ type: 'success', message: '操作成功' })
          eventBus.$emit('delArticle', this.articleId, this.channels[this.activeIndex].id)
          this.showMoreAction = false
        }
      } catch (error) {
        this.$mynotify({ type: 'danger', message: '操作失败' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  /deep/ .van-tabs__wrap {
    height: 36px;
    padding-right: 36px;
    .van-tab {
      line-height: 36px;
    }
    .van-tabs__line {
      background-color: #3296fa;
      height: 2px;
    }
  }
  /deep/ .van-tabs__content {
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane {
    height: 100%;
    .scroll-wrapper {
      height: 100%;
      overflow-y: auto;
    }
  }
}
.bar_btn {
  width: 36px;
  height: 35px;
  position: absolute;
  top: 0;
  right: 0;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    box-shadow: 0 0 10px #999;
    transform: scale(1, 0.6);
  }
  .van-icon-wap-nav {
    width: 100%;
    height: 100%;
    background: #fff;
    text-align: center;
    line-height: 35px;
    position: relative;
    z-index: 1000;
    &::before {
      font-size: 20px;
    }
  }
}
.van-action-sheet {
  max-height: 100%;
  height: 100%;
  .van-action-sheet__header {
    background: #3296fa;
    color: #fff;
    .van-icon-close {
      color: #fff;
    }
  }
}
</style>
