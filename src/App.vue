<template>
  <div id="app">
    <div id="nav">
    </div>
    <keep-alive >
      <router-view v-if="$route.meta.isAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.isAlive" />
  </div>
</template>

<style lang="less">
</style>
