<script lang="ts" setup>
import { watch, nextTick } from "vue";
import focusManager from "@renderer/core/gamepad/focus/focusManager.js";
import { gamepadInput } from "@renderer/core/gamepad/input/inputManager";
import HorizontalScrollList from "../../components/HorizontalScrollList/index.vue";
import RecommendCard from "../../components/RecommendCard/index.vue";
import Album from "../../components/Album/index.vue";

// TODO 有没有必要抽出去？-> tabpane
// 垂直滚动
const verticalScroll = () => {
  const appElement = document.getElementById("app");
  const targetFocusItem = focusManager.getCurrentElement();
  const targetRect = targetFocusItem?.getBoundingClientRect();
  const prevPressed = gamepadInput.getPrevPressed(); // 上一次触发的按键

  const targetCenter = (targetRect?.y ?? 0) + (targetRect?.height ?? 0) / 2;
  const windowCenter = window.innerHeight / 2;
  const extraJudgmentHeight = 100; // 额外判定高度
  const judgmentHeight = windowCenter + extraJudgmentHeight; // 判定高度

  // 向下滚动
  if (targetCenter > judgmentHeight && prevPressed.has("down")) {
    appElement?.scrollBy({
      top: targetCenter - windowCenter,
      behavior: "smooth",
    });
  }
  // 向上滚动
  else if (targetCenter < judgmentHeight && prevPressed.has("up")) {
    appElement?.scrollBy({
      top: -(windowCenter - targetCenter),
      behavior: "smooth",
    });
  }
};

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
    <div class="module">
      <HorizontalScrollList
        :titleBeforeMoveUpValue="18"
        :titleMoveUpValue="5"
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
    </div>
    <!-- 推荐歌单 -->
    <div class="module">
      <HorizontalScrollList :titleBeforeMoveUpValue="12" :titleMoveUpValue="4">
        <template #title>
          <ModuleTitle title="推荐歌单" />
        </template>
        <Album v-for="index in 12" :key="index" :id="'b' + index.toString()" />
      </HorizontalScrollList>
    </div>
    <!-- 最近播放 -->
    <div class="module">
      <HorizontalScrollList :titleBeforeMoveUpValue="12" :titleMoveUpValue="4">
        <template #title>
          <ModuleTitle title="最近播放" />
        </template>
        <Album v-for="index in 12" :key="index" :id="'c' + index.toString()" />
      </HorizontalScrollList>
    </div>
    <!-- TODO del -->
    <div class="module">
      <HorizontalScrollList :titleBeforeMoveUpValue="12" :titleMoveUpValue="4">
        <template #title>
          <ModuleTitle title="test1" />
        </template>
        <Album v-for="index in 12" :key="index" :id="'d' + index.toString()" />
      </HorizontalScrollList>
    </div>
    <!-- TODO del -->
    <div class="module">
      <HorizontalScrollList :titleBeforeMoveUpValue="12" :titleMoveUpValue="4">
        <template #title>
          <ModuleTitle title="test2" />
        </template>
        <Album v-for="index in 12" :key="index" :id="'e' + index.toString()" />
      </HorizontalScrollList>
    </div>
    <!-- TODO del -->
    <div class="module">
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
          :id="'f' + index.toString()"
        />
      </HorizontalScrollList>
    </div>
  </div>
</template>

<style lang="less" scoped>
.listen-now {
  padding-bottom: 95px;
}
</style>
