<script lang="ts" setup>
import { watch, nextTick } from "vue";
import { useVerticalScroll } from "@renderer/hooks/scroll.js";
import focusManager from "@renderer/core/gamepad/focus/focusManager.js";
import HorizontalScrollList from "../../components/HorizontalScrollList/index.vue";
import LargeCard from "../../components/LargeCard/index.vue";
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
  <div class="podcast">
    <!-- 大卡片 -->
    <HorizontalScrollList
      :titleBeforeMoveUpValue="18"
      :titleMoveUpValue="5"
      :safeScaleTop="28"
      :safeScaleBottom="30"
    >
      <LargeCard v-for="index in 5" :key="index" :id="'g' + index.toString()" />
    </HorizontalScrollList>

    <!-- 现可通过空间音频体验 -->
    <HorizontalScrollList :titleBeforeMoveUpValue="12" :titleMoveUpValue="4">
      <template #title>
        <ModuleTitle title="现可通过空间音频体验" />
      </template>
      <Album v-for="index in 12" :key="index" :id="'h' + index.toString()" />
    </HorizontalScrollList>

    <!-- 音乐能量棒 -->
    <HorizontalScrollList :titleBeforeMoveUpValue="12" :titleMoveUpValue="4">
      <template #title>
        <ModuleTitle title="音乐能量棒" />
      </template>
      <Album v-for="index in 12" :key="index" :id="'i' + index.toString()" />
    </HorizontalScrollList>

    <!-- 心情氛围 -->
    <HorizontalScrollList :titleBeforeMoveUpValue="12" :titleMoveUpValue="4">
      <template #title>
        <ModuleTitle title="心情氛围" />
      </template>
      <Album v-for="index in 12" :key="index" :id="'j' + index.toString()" />
    </HorizontalScrollList>

    <!-- TODO del -->
    <HorizontalScrollList :titleBeforeMoveUpValue="12" :titleMoveUpValue="4">
      <template #title>
        <ModuleTitle title="test2" />
      </template>
      <Album v-for="index in 12" :key="index" :id="'k' + index.toString()" />
    </HorizontalScrollList>

    <!-- 音乐回忆：你的历年热门歌曲 -->
    <HorizontalScrollList
      :titleBeforeMoveUpValue="18"
      :titleMoveUpValue="5"
      :safeScaleTop="28"
      :safeScaleBottom="30"
    >
      <template #title>
        <ModuleTitle title="音乐回忆：你的历年热门歌曲" />
      </template>
      <RecommendCard
        v-for="index in 12"
        :key="index"
        :id="'l' + index.toString()"
      />
    </HorizontalScrollList>
  </div>
</template>

<style lang="less" scoped>
.podcast {
  padding-bottom: 95px;
}
</style>
