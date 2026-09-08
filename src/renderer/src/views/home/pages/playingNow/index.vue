<script lang="ts" setup>
import { ref, computed, watch, inject, nextTick, onUnmounted } from "vue";
import { useInputCallback } from "@renderer/hooks/gamepad";
import { useDefaultInputHandlers } from "@renderer/hooks/focus";
import { provideFocusScope } from "@renderer/core/gamepad/focus/scope";
import focusManager from "@renderer/core/gamepad/focus/focusManager";

import type { HomeContext } from "../typing";

import ProgressBar from "./components/ProgressBar.vue";
import { focusScopeId, songItemPrefixName } from "./config.data";
import cover from "@renderer/assets/image/cover3.jpg";

const { setTabBarVisible, setTabBarSelectedValue } = inject(
  "home-context",
) as HomeContext;
const { inputCallback, unsubscribe } = useInputCallback(focusScopeId);
const defaultInputHandlers = useDefaultInputHandlers();

const isShowNonPrimaryContent = ref<boolean>(false); // 是否展示非主要内容
const isShowSubButton = ref<boolean>(false); // 是否展示子按钮

// 是否聚焦于歌曲列表中
const isFocusSongList = computed(() => {
  const focusId = focusManager.currentFocusId.value;
  return focusId.includes(songItemPrefixName);
});

watch(
  () => focusManager.currentFocusId.value,
  async () => {
    await nextTick();

    // 在歌曲列表范围内
    if (isFocusSongList.value) {
      setTabBarVisible(false);
      isShowNonPrimaryContent.value = true;
    }
  },
);

const back = () => {
  setTabBarVisible(true);
  isShowNonPrimaryContent.value = false;
  setTabBarSelectedValue(focusScopeId);
};

inputCallback({
  ...defaultInputHandlers,
  back,
});

onUnmounted(() => {
  unsubscribe();
});

// 提供聚焦范围
provideFocusScope(focusScopeId);
</script>

<template>
  <div class="playing-now">
    <div class="tool-bar" :class="{ 'tool-bar-show': isShowNonPrimaryContent }">
      <span></span>
      <div class="album-name">星座になれたら - Single</div>
      <div class="button-list">
        <div class="button" v-for="index in 4" :key="index"></div>
      </div>
    </div>
    <div class="song-list">
      <FocusItem
        class="song-item"
        v-for="index in 6"
        :key="index"
        :focus-id="songItemPrefixName + index"
      >
        <div class="cover">
          <img :src="cover" />
        </div>
        <div class="song-name">星座になれたら</div>
        <div class="singer">kessoku band</div>
        <div class="button-list" v-if="isShowSubButton && index === 1">
          <div class="button"></div>
          <div class="button"></div>
        </div>
      </FocusItem>
    </div>
    <div
      class="progress-bar-wrap"
      :class="{ 'progress-bar-wrap-show': isShowNonPrimaryContent }"
    >
      <ProgressBar />
    </div>
  </div>
</template>

<style lang="less" scoped>
.playing-now {
  min-height: var(--app-height, 100vh);
  padding-top: 80px;
  position: relative;

  .tool-bar {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding-right: 55px;
    position: absolute;
    top: 42px;
    left: 0;
    opacity: 0;

    &-show {
      opacity: 1;
    }

    .album-name {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      color: #ececec;
      font-size: 16px;
      font-weight: 700;
      line-height: 100%;
    }

    .button-list {
      display: flex;
      flex-direction: row;
      align-items: center;

      .button {
        width: 36px;
        height: 36px;
        margin-left: 26px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        backdrop-filter: blur(20px);

        &:first-child {
          margin-left: 0;
        }
      }
    }
  }

  .song-list {
    --song-cover-size: 370px;
    --song-gap: 29px;

    margin-top: 50px;

    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: var(--song-gap);
    padding-inline: calc((100% - var(--song-cover-size)) / 2);
    overflow-x: scroll;
    scrollbar-width: none;

    .song-item {
      flex: 0 0 var(--song-cover-size);
      display: flex;
      flex-direction: column;
      align-items: center;

      .cover {
        width: var(--song-cover-size);
        height: var(--song-cover-size);
        border-radius: 8px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .song-name {
        margin-top: 5px;
        color: #ececec;
        font-size: 20px;
        font-weight: 500;
        line-height: 100%;
      }

      .singer {
        margin-top: 5px;
        color: #ececec;
        font-size: 20px;
        font-weight: 500;
        line-height: 100%;
      }

      .button-list {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 12px;

        .button {
          width: 36px;
          height: 36px;
          margin-left: 26px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(20px);

          &:first-child {
            margin-left: 0;
          }
        }
      }
    }

    .focused {
      background-color: red;
    }
  }

  .progress-bar-wrap {
    width: 100%;
    margin-top: 24px;
    padding: 0 55px;
    position: absolute;
    bottom: 25px;
    opacity: 0;

    &-show {
      opacity: 1;
    }
  }
}
</style>
