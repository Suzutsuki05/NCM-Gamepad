<script lang="ts" setup>
import ScrollList from "../../components/ScrollList/index.vue";
import Album from "../../components/Album/index.vue";
</script>

<template>
  <div class="listen-now">
    <!-- 精选推荐 -->
    <div class="module">
      <ModuleTitle title="精选推荐" :margin-left="54" />
      <ScrollList>
        <Album v-for="index in 12" :key="index" :id="'a' + index.toString()" />
      </ScrollList>
    </div>
    <!-- 推荐歌单 -->
    <div class="module">
      <ModuleTitle title="推荐歌单" :margin-left="54" />
      <ScrollList>
        <Album v-for="index in 12" :key="index" :id="'b' + index.toString()" />
      </ScrollList>
    </div>
    <!-- 最近播放 -->
    <div class="module">
      <ModuleTitle title="最近播放" :margin-left="54" />
      <ScrollList>
        <Album v-for="index in 12" :key="index" :id="'c' + index.toString()" />
      </ScrollList>
    </div>
    <!-- TODO del -->
    <div class="module">
      <ModuleTitle title="test1" :margin-left="54" />
      <ScrollList>
        <Album v-for="index in 12" :key="index" :id="'d' + index.toString()" />
      </ScrollList>
    </div>
    <!-- TODO del -->
    <div class="module">
      <ModuleTitle title="test2" :margin-left="54" />
      <ScrollList>
        <Album v-for="index in 12" :key="index" :id="'e' + index.toString()" />
      </ScrollList>
    </div>
    <!-- TODO del -->
    <div class="module">
      <ModuleTitle title="test3" :margin-left="54" />
      <ScrollList>
        <Album v-for="index in 12" :key="index" :id="'f' + index.toString()" />
      </ScrollList>
    </div>
  </div>
</template>

<style lang="less" scoped>
.listen-now {
  .module {
    margin-top: 20px;

    &:first-child {
      margin-top: 0;
    }
  }
}
</style>
