<script lang="ts" setup>
import { watch, nextTick } from "vue";
import { useVerticalScroll } from "@renderer/hooks/scroll.js";
import focusManager from "@renderer/core/gamepad/focus/focusManager.js";
import HorizontalScrollList from "../../components/HorizontalScrollList/index.vue";
import RecommendCard from "../../components/RecommendCard/index.vue";
import Album from "../../components/Album/index.vue";

const { verticalScroll } = useVerticalScroll();

// 垂直滚动
watch(
  () => focusManager.currentFocusId.value,
  async () => {
    await nextTick();
    verticalScroll();
  },
);
</script>

<template>
  <div class="listen-now">
    <!-- 精选推荐 -->
    <HorizontalScrollList
      :titleBeforeMoveUpValue="18"
      :titleMoveUpValue="10"
      :safeScaleTop="28"
      :safeScaleBottom="30"
    >
      <template #title>
        <ModuleTitle title="精选推荐" />
      </template>
      <RecommendCard
        v-for="index in 12"
        :key="index"
        :id="'a' + index.toString()"
      />
    </HorizontalScrollList>

    <!-- 推荐歌单 -->
    <HorizontalScrollList :titleBeforeMoveUpValue="12" :titleMoveUpValue="4">
      <template #title>
        <ModuleTitle title="推荐歌单" />
      </template>
      <Album v-for="index in 12" :key="index" :id="'b' + index.toString()" />
    </HorizontalScrollList>

    <!-- 最近播放 -->
    <HorizontalScrollList :titleBeforeMoveUpValue="12" :titleMoveUpValue="4">
      <template #title>
        <ModuleTitle title="最近播放" />
      </template>
      <Album v-for="index in 12" :key="index" :id="'c' + index.toString()" />
    </HorizontalScrollList>

    <!-- TODO del -->
    <HorizontalScrollList :titleBeforeMoveUpValue="12" :titleMoveUpValue="4">
      <template #title>
        <ModuleTitle title="test1" />
      </template>
      <Album v-for="index in 12" :key="index" :id="'d' + index.toString()" />
    </HorizontalScrollList>

    <!-- TODO del -->
    <HorizontalScrollList :titleBeforeMoveUpValue="12" :titleMoveUpValue="4">
      <template #title>
        <ModuleTitle title="test2" />
      </template>
      <Album v-for="index in 12" :key="index" :id="'e' + index.toString()" />
    </HorizontalScrollList>

    <!-- 音乐回忆：你的历年热门歌曲 -->
    <HorizontalScrollList
      :titleBeforeMoveUpValue="18"
      :titleMoveUpValue="10"
      :safeScaleTop="28"
      :safeScaleBottom="30"
    >
      <template #title>
        <ModuleTitle title="音乐回忆：你的历年热门歌曲" />
      </template>
      <RecommendCard
        v-for="index in 12"
        :key="index"
        :id="'f' + index.toString()"
      />
    </HorizontalScrollList>
  </div>
</template>

<style lang="less" scoped>
.listen-now {
  padding-bottom: 95px;
}
</style>
