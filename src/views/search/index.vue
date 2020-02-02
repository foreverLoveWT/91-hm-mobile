<template>
  <div class="container">
    <!-- 搜索组件一级路由   返回上一个页面-->
    <van-nav-bar left-arrow title="搜索中心" @click-left="$router.back()"></van-nav-bar>
    <!-- 导航 -->
    <van-search v-model.trim="q" @search="onSearch"  placeholder="请输入搜索关键词" shape="round" />
    <!-- trim去掉空格   -->
    <van-cell-group class="suggest-box" v-if="q">
      <van-cell icon="search">
        <span>j</span>ava
      </van-cell>
    </van-cell-group>
    <div class="history-box" v-else-if="historyList.length">
      <div class="head">
        <span>历史记录</span>
        <van-icon name="delete" @click="clear"></van-icon>
      </div>
      <van-cell-group>
        <van-cell @click="toSearchResult(item)" v-for="(item,index) in historyList" :key="index">
          <a class="word_btn">{{item}}</a>
          <van-icon @click.stop="delHistory(index)" class="close_btn" slot="right-icon" name="cross" />
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
const key = 'hm-91-toutiao-history'
export default {
  name: 'search',
  data () {
    return {
      q: '',
      historyList: []
    }
  },
  created () {
    this.historyList = JSON.parse(localStorage.getItem(key) || '[]')
  },
  methods: {
    onSearch () {
      if (!this.q) return
      let obj = new Set(this.historyList)
      obj.add(this.q)
      this.historyList = Array.from(obj)
      localStorage.setItem(key, JSON.stringify(this.historyList))
      this.$router.push({ path: '/search/result', query: { q: this.q } })
    },
    clear () {
      this.historyList = []
      localStorage.setItem(key, '[]')
    },
    // 删除对应历史记录
    delHistory (index) {
      this.historyList.splice(index, 1)
      localStorage.setItem(key, JSON.stringify(this.historyList))
    },
    // 跳转到搜索结果页面
    toSearchResult (text) {
      let obj = new Set(this.historyList)
      obj.add(text)
      this.historyList = Array.from(obj)
      localStorage.setItem(key, JSON.stringify(this.historyList))
      this.$router.push({ path: '/search/result', query: { q: text } })
    }
  }
}
</script>

<style lang='less' scoped>
.history-box {
  padding: 0 20px;
  .head{
    line-height: 36px;
    color: #999;
    .van-icon{
      font-size: 16px;
      float: right;
      margin-top: 10px;;
    }
  }
  .van-cell{
    padding: 10px 0;
  }
  .word_btn{
    color:#3296fa;
  }
  .close_btn{
    margin-top:5px;
    color: #999;
  }
}
.suggest-box{
  /deep/ .van-cell{
    padding: 10px 20px;
    color: #999;
    p{
      span{
        color: red;
      }
    }
  }
}
</style>
