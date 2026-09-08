<script lang="ts" setup>
import ListenNow from "@renderer/views/home/pages/listenNow/index.vue";
import Podcast from "@renderer/views/home/pages/podcast/index.vue";
import Movie from "@renderer/views/home/pages/movie/index.vue";
import Collection from "@renderer/views/home/pages/collection/index.vue";
import Mine from "@renderer/views/home/pages/mine/index.vue";
import PlayingNow from "@renderer/views/home/pages/playingNow/index.vue";
import Search from "@renderer/views/home/pages/search/index.vue";
import Setting from "@renderer/views/home/pages/setting/index.vue";
import { focusScopeId as tabBarFocusScopeId } from "../../components/TabBar/config.data";

defineProps<{
  selectedTab: string;
}>();
</script>

<template>
  <div class="tab-pane">
    <!-- 立即聆听 -->
    <div
      class="module"
      v-show="selectedTab === `${tabBarFocusScopeId}-listen-now`"
    >
      <ListenNow />
    </div>
    <!-- 播客 -->
    <div
      class="module"
      v-show="selectedTab === `${tabBarFocusScopeId}-podcast`"
    >
      <Podcast />
    </div>
    <!-- 影片 -->
    <div class="module" v-show="selectedTab === `${tabBarFocusScopeId}-movie`">
      <Movie />
    </div>
    <!-- 收藏 -->
    <div
      class="module"
      v-show="selectedTab === `${tabBarFocusScopeId}-collection`"
    >
      <Collection />
    </div>
    <!-- 我的 -->
    <div class="module" v-show="selectedTab === `${tabBarFocusScopeId}-mine`">
      <Mine />
    </div>
    <!-- 正在播放 -->
    <div
      class="module"
      v-show="selectedTab === `${tabBarFocusScopeId}-playing-now`"
    >
      <PlayingNow />
    </div>
    <!-- 搜索 -->
    <div class="module" v-show="selectedTab === `${tabBarFocusScopeId}-search`">
      <Search />
    </div>
    <!-- 设置 -->
    <div
      class="module"
      v-show="selectedTab === `${tabBarFocusScopeId}-setting`"
    >
      <Setting />
    </div>
  </div>
</template>

<style lang="less" scoped>
.tab-pane {
  min-height: var(--app-height, 100vh);

  .module {
    min-height: var(--app-height, 100vh);
  }
}
</style>
