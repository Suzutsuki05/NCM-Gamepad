<script lang="ts" setup>
import { ref, watch, inject, onUnmounted } from "vue";

import type { HomeContext } from "@renderer/views/home/typing";

import cover from "@renderer/assets/image/cover3.jpg";
import { focusScopeId as tabBarFocusScopeId } from "@renderer/views/home/components/TabBar/config.data";
import { focusScopeId } from "../config.data";

const { selectedTab } = inject("home-context") as HomeContext;

const currentDeg = ref<number>(0); // 当前封面旋转角度
let timer: any = 0;

// 设置封面旋转
const setRotateTimer = () => {
  timer = setInterval(() => {
    if (currentDeg.value < 360) {
      currentDeg.value += 1;
    } else {
      currentDeg.value = 0;
    }
  }, 120);
};

// 开始旋转
const startRotate = () => {
  timer && clearInterval(timer);
  setRotateTimer();
};

// 暂停旋转
const pauseRotate = () => {
  clearInterval(timer);
};

watch(
  () => [true, selectedTab.value],
  () => {
    // 进入"正在播放"才开始旋转
    selectedTab.value === `${tabBarFocusScopeId}-${focusScopeId}`
      ? startRotate()
      : pauseRotate();
  },
  {
    immediate: true,
  },
);

onUnmounted(() => {
  timer && clearInterval(timer);
});
</script>

<template>
  <div class="album-background-wrap">
    <div class="album-background">
      <div class="blur-layer"></div>
      <div
        class="cover"
        :style="[
          `transform: rotate(${currentDeg}deg);`,
          currentDeg === 0 && 'transition: unset;',
        ]"
      >
        <img :src="cover" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.album-background-wrap {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  overflow: hidden;

  .album-background {
    width: 100%;
    height: 100%;
    position: relative;

    .blur-layer {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      backdrop-filter: blur(175px);
    }

    .cover {
      width: 100%;
      position: absolute;
      top: -50%;
      left: 0;
      z-index: 0;
      transition: transform 0.24s;

      img {
        width: 100%;
        opacity: 0.78;
      }
    }
  }
}
</style>
