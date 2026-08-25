<script lang="ts" setup>
import { onUnmounted } from "vue";
import { useInputCallback } from "@renderer/hooks/gamepad";
import focusManager from "@renderer/core/gamepad/focus/focusManager";
import { provideFocusScope } from "@renderer/core/gamepad/focus/scope";
import ListenNow from "@renderer/views/home/pages/listenNow/index.vue";
import Podcast from "@renderer/views/home/pages/podcast/index.vue";
import Movie from "@renderer/views/home/pages/movie/index.vue";
import Collection from "@renderer/views/home/pages/collection/index.vue";
import Mine from "@renderer/views/home/pages/mine/index.vue";
import PlayingNow from "@renderer/views/home/pages/playingNow/index.vue";
import Search from "@renderer/views/home/pages/search/index.vue";
import Setting from "@renderer/views/home/pages/setting/index.vue";
import { focusScopeId as tabBarFocusScopeId } from "../../components/TabBar/config.data";
import { focusScopeId as tabPaneFocusScopeId } from "./config.data";

const { inputCallback, unsubscribe } = useInputCallback(tabPaneFocusScopeId);
provideFocusScope(tabPaneFocusScopeId);

defineProps<{
  selectedTab: string;
}>();

// TODO 单独抽出去方向控制
// TODO 方向控制抽到页面里去

const left = () => {
  focusManager.move("left");
};

const right = () => {
  focusManager.move("right");
};

const up = () => {
  focusManager.move("up");
};

const down = () => {
  focusManager.move("down");
};

const confirm = () => {
  console.log("confirm", focusManager.currentFocusId.value);
};

inputCallback({
  left,
  right,
  up,
  down,
  confirm,
});

onUnmounted(() => {
  unsubscribe();
});
</script>

<template>
  <div class="tab-pane">
    <!-- 立即聆听 -->
    <div v-show="selectedTab === `${tabBarFocusScopeId}-listen-now`">
      <ListenNow />
    </div>
    <!-- 播客 -->
    <div v-show="selectedTab === `${tabBarFocusScopeId}-podcast`">
      <Podcast />
    </div>
    <!-- 影片 -->
    <div v-show="selectedTab === `${tabBarFocusScopeId}-movie`">
      <Movie />
    </div>
    <!-- 收藏 -->
    <div v-show="selectedTab === `${tabBarFocusScopeId}-collection`">
      <Collection />
    </div>
    <!-- 我的 -->
    <div v-show="selectedTab === `${tabBarFocusScopeId}-mine`">
      <Mine />
    </div>
    <!-- 正在播放 -->
    <div v-show="selectedTab === `${tabBarFocusScopeId}-playing-now`">
      <PlayingNow />
    </div>
    <!-- 搜索 -->
    <div v-show="selectedTab === `${tabBarFocusScopeId}-search`">
      <Search />
    </div>
    <!-- 设置 -->
    <div v-show="selectedTab === `${tabBarFocusScopeId}-setting`">
      <Setting />
    </div>
  </div>
</template>

<style lang="less" scoped>
.tab-pane {
}
</style>
