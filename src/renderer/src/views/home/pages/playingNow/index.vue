<script lang="ts" setup>
import { ref, watch, inject, nextTick, onMounted, onUnmounted } from "vue";
import { useInputCallback } from "@renderer/hooks/gamepad";
import { useDefaultInputHandlers } from "@renderer/hooks/focus";
import { useHorizontalScroll } from "@renderer/hooks/scroll";
import { provideFocusScope } from "@renderer/core/gamepad/focus/scope";
import focusManager from "@renderer/core/gamepad/focus/focusManager";

import type { HomeContext } from "../typing";

import ProgressBar from "./components/ProgressBar.vue";
import {
  focusScopeId,
  buttonPrefixName,
  songItemPrefixName,
} from "./config.data";
import cover from "@renderer/assets/image/cover3.jpg";

const { inputCallback, unsubscribe } = useInputCallback(focusScopeId);
const { horizontalScroll } = useHorizontalScroll();
const defaultInputHandlers = useDefaultInputHandlers();
const { setTabBarVisible, setTabBarSelectedValue } = inject(
  "home-context",
) as HomeContext;

const songListRef = ref<HTMLElement | null>(null); // 歌曲列表Ref
const isShowNonPrimaryContent = ref<boolean>(false); // 是否展示非主要内容
const isShowSubButton = ref<boolean>(false); // 是否展示子按钮
const lastFocusedSongId = ref<string>(""); // 上一次聚焦的歌曲项

// 聚焦于歌曲列表后的设置
const afterFocusSongList = () => {
  setTabBarVisible(false);
  isShowNonPrimaryContent.value = true;
};

// 歌曲项是否被聚焦
const isSongItemFocus = (focusId: string) => {
  return focusId.startsWith(songItemPrefixName);
};

// 按钮组是否被聚焦
const isButtonFocus = (focusId: string) => {
  return focusId.startsWith(buttonPrefixName);
};

watch(
  () => focusManager.currentFocusId.value,
  async (focusId) => {
    if (isSongItemFocus(focusId)) {
      lastFocusedSongId.value = focusId;
      afterFocusSongList();
    }

    await nextTick();
    horizontalScroll(songListRef);
  },
);

// 按键"下"
const down = () => {
  const currentFocusId = focusManager.getCurrentFocusId();
  // 从顶部按钮栏 -> 歌曲列表
  if (isButtonFocus(currentFocusId) && lastFocusedSongId.value) {
    focusManager.setFocus(lastFocusedSongId.value, focusScopeId);
    return;
  }
  focusManager.move("down");
};

// 按键"返回"
const back = () => {
  setTabBarVisible(true);
  isShowNonPrimaryContent.value = false;
  setTabBarSelectedValue(focusScopeId);
};

inputCallback({
  ...defaultInputHandlers,
  down,
  back,
});

onMounted(() => {
  // 设置离开范围后返回时聚焦的元素
  focusManager.setScopeFocusResolver(focusScopeId, () => {
    return lastFocusedSongId.value;
  });
});

onUnmounted(() => {
  focusManager.removeScopeFocusResolver(focusScopeId);
  unsubscribe();
});

// 提供聚焦范围
provideFocusScope(focusScopeId);
</script>

<template>
  <div class="playing-now">
    <div class="tool-bar" v-if="isShowNonPrimaryContent">
      <span></span>
      <div class="album-name">星座になれたら - Single</div>
      <div class="button-list">
        <FocusItem
          class="button"
          v-for="index in 4"
          :key="index"
          :focus-id="buttonPrefixName + index"
        ></FocusItem>
      </div>
    </div>
    <div ref="songListRef" class="song-list">
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

      .focused {
        background: red;
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
