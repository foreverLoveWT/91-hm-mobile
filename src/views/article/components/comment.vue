<template>
  <div class="comment">
    <van-list @load="onLoad"  v-model="loading" :finished="finished" finished-text="没有更多了">
      <div class="item van-hairline--bottom van-hairline--top" v-for="comment in comments" :key="comment.com_id.toString()">
        <van-image
          round
          width="1rem"
          height="1rem"
          fit="fill"
          :src="comment.aut_photo"
        />
        <div class="info">
          <p>
            <span class="name">{{ comment.aut_name }}</span>
            <span style="float:right">
              <span class="van-icon van-icon-good-job-o zan"></span>
              <span class="count">{{ comment.like_count }}</span>
            </span>
          </p>
          <p>{{ comment.content }}</p>
          <p>
            <span class="time">{{ comment.pubdate | relTime   }}</span>&nbsp;
            <van-tag plain @click="openReply(comment.com_id)">{{ comment.reply_count }} 回复</van-tag>
          </p>
        </div>
      </div>
    </van-list>
    <div class="reply-container van-hairline--top">
      <van-field v-model.trim="value" placeholder="写评论...">
        <van-loading v-if="submiting" slot="button" type="spinner" size="16px"></van-loading>
        <span class="submit" v-else slot="button" @click="submit()">提交</span>
      </van-field>
    </div>
    <!-- 回复 -->
    <van-action-sheet @closed="reply.commentId=null" v-model="showReply" :round="false" class="reply_dialog" title="回复评论">
      <van-list @load="getReply" :immediate-check="false" v-model="reply.loading" :finished="reply.finished" finished-text="没有更多了">
        <div class="item van-hairline--bottom van-hairline--top" v-for="reply in reply.list" :key="reply.com_id.toString()">
          <van-image round width="1rem" height="1rem" fit="fill" :src="reply.aut_photo" />
          <div class="info">
            <p><span class="name">{{reply.aut_name}}</span></p>
            <p>{{reply.content}}</p>
            <p><span class="time">{{reply.pubdate|relTime}}</span></p>
          </div>
        </div>
      </van-list>
    </van-action-sheet>
  </div>

  <!-- 都不输入框 -->
</template>

<script>
import { getComments, commentOrReply } from '@/api/article'
export default {
  data () {
    return {
      // 上拉加载中
      loading: false,
      // 全部加载完毕
      finished: false,
      // 输入的内容
      value: '',
      // 控制提交中状态数据
      submiting: false,
      comments: [],
      offset: null,
      showReply: false,
      reply: {
        loading: false,
        finished: false,
        offset: null,
        list: [],
        commentId: null
      }
    }
  },
  methods: {
    // 提交评论
    async submit () {
      if (!this.value) return false
      this.submiting = true
      await this.$sleep()
      try {
        const data = await commentOrReply({
          target: this.reply.commentId ? this.reply.commentId.toString() : this.$route.query.articleId,
          content: this.value,
          art_id: this.reply.commentId ? this.$route.query.articleId : null
        })
        // console.log(data)
        if (this.reply.commentId) {
          this.reply.list.unshift(data.new_obj)
          // 如果对评论的进行评论之后, 应该找到该评论 并将 该评论的回复次数 +1
          // 怎么找到 对应的评论
          // 如果找到了 comment就是找到的对象 如果找不到 comment就是一个undefined
          const comment = this.comments.find(item => item.com_id.toString() === this.reply.commentId.toString())
          comment && comment.reply_count++
        } else {
          this.comments.unshift(data.new_obj)
        }
        this.value = ''
      } catch (error) {
        this.$mynotify({ type: 'danger', message: '评论失败' })
      }
      this.submiting = false
    },
    // 打开对话框重置数据
    openReply (commentId) {
      this.showReply = true
      this.reply.commentId = commentId
      this.reply.list = []
      this.reply.offset = null
      this.reply.loading = true
      this.reply.finished = false
      this.getReply()
    },
    // 获取文章评论回复
    async getReply () {
      let data = await getComments({
        type: 'c',
        offset: this.reply.offset,
        source: this.reply.commentId.toString()
      })
      this.reply.list.push(...data.results)
      this.reply.loading = false
      this.reply.finished = data.end_id === data.last_id
      if (!this.reply.finished) {
        this.reply.offset = data.last_id
      }
    },
    // 获取文章评论
    async onLoad () {
      let data = await getComments({
        type: 'a',
        offset: this.offset,
        source: this.$route.query.articleId
      })
      // console.log(data)
      this.comments.push(...data.results)
      this.loading = false
      this.finished = data.last_id === data.end_id
      if (!this.finished) {
        this.offset = data.last_id
      }
    }
  }
}
</script>

<style lang="less" scoped>
.comment {
  margin-top: 10px;
  /deep/ .item {
    display: flex;
    padding: 10px 0;
    .info {
      flex: 1;
      padding-left: 10px;
      .name{
        color:#069;
      }
      .zan{
        vertical-align:middle;
        padding-right:2px;
      }
      .count{
        vertical-align:middle;
        font-size:10px;
        color: #666;
      }
      .time{
        color: #666;
      }
      p {
        padding: 5px 0;
        margin: 0;
      }
    }
  }
  /deep/ .van-button:active::before {
    background: transparent;
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
  .submit {
    font-size: 12px;
    color: #3296fa;
  }
}
.reply_dialog {
  height: 100%;
  max-height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  .van-action-sheet__header {
    background: #3296fa;
    color: #fff;
    .van-icon-close {
      color: #fff;
    }
  }
  .van-action-sheet__content{
    flex: 1;
    overflow-y: auto;
    padding: 0 10px 44px;
  }
}
</style>
