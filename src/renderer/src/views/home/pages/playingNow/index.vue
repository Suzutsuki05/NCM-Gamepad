<script lang="ts" setup>
import { ref, watch, inject, nextTick, onMounted, onUnmounted } from "vue";
import { useInputCallback } from "@renderer/hooks/gamepad";
import { useDefaultInputHandlers } from "@renderer/hooks/focus";
import { useHorizontalScroll } from "@renderer/hooks/scroll";
import { provideFocusScope } from "@renderer/core/gamepad/focus/scope";
import focusManager from "@renderer/core/gamepad/focus/focusManager";

import type { HomeContext } from "../../typing";

import ProgressBar from "./components/ProgressBar.vue";
import {
  focusScopeId,
  buttonPrefixName,
  subButtonPrefixName,
  songItemPrefixName,
} from "./config.data";
import { focusScopeId as tabBarFocusScopeId } from "@renderer/views/home/components/TabBar/config.data";
import cover from "@renderer/assets/image/cover3.jpg";

const { inputCallback, unsubscribe } = useInputCallback(focusScopeId);
const { horizontalScroll } = useHorizontalScroll();
const defaultInputHandlers = useDefaultInputHandlers();
const {
  selectedTab,
  setTabBarVisible,
  setTabBarSelectedValue,
  setBackgroundColor,
} = inject("home-context") as HomeContext;

const songListRef = ref<HTMLElement | null>(null); // 歌曲列表Ref
const isShowNonPrimaryContent = ref<boolean>(false); // 是否展示非主要内容
const isShowSongSubButton = ref<boolean>(false); // 是否展示歌曲子按钮
const lastFocusedSongId = ref<string>(""); // 上一次聚焦的歌曲项
let showSongSubButtonTimer: ReturnType<typeof setTimeout> | undefined; // 展示子按钮计时器

// 聚焦于歌曲列表后的设置
const afterFocusSongList = () => {
  setTabBarVisible(false);
  isShowNonPrimaryContent.value = true;
};

// 按钮组是否被聚焦
const isButtonFocus = (focusId: string) => {
  return focusId.startsWith(buttonPrefixName);
};

// 歌曲项是否被聚焦
const isSongItemFocus = (focusId: string) => {
  return focusId.startsWith(songItemPrefixName);
};

// 清除展示子按钮计时器
const clearShowSongSubButtonTimer = () => {
  if (showSongSubButtonTimer === undefined) return;
  clearTimeout(showSongSubButtonTimer);
  showSongSubButtonTimer = undefined;
};

// 设置背景色
const onSetBackgroundColor = () => {
  if (selectedTab.value === `${tabBarFocusScopeId}-${focusScopeId}`) {
    setBackgroundColor("rgba(232, 24, 91, 0.74)");
  } else {
    setBackgroundColor("", 0.5);
  }
};

// 监听选中tab
watch(
  () => selectedTab.value,
  () => {
    onSetBackgroundColor();
  },
);

// 监听聚焦元素
watch(
  () => focusManager.currentFocusId.value,
  async (focusId, previousFocusId) => {
    clearShowSongSubButtonTimer();

    // 聚焦于歌曲列表中
    if (isSongItemFocus(focusId)) {
      const isSwitchingSong =
        isSongItemFocus(previousFocusId) && previousFocusId !== focusId;

      afterFocusSongList();
      isShowSongSubButton.value = !isSwitchingSong;

      if (isSwitchingSong) {
        showSongSubButtonTimer = setTimeout(() => {
          if (focusManager.isFocus(focusId)) {
            isShowSongSubButton.value = true;
          }
          showSongSubButtonTimer = undefined;
        }, 1600);
      }

      lastFocusedSongId.value = focusId;
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
  clearShowSongSubButtonTimer();
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
          class="round-button"
          v-for="index in 4"
          :key="index"
          :focus-id="buttonPrefixName + index"
        ></FocusItem>
      </div>
    </div>
    <div class="song-list-wrap">
      <div ref="songListRef" class="song-list">
        <FocusItem
          class="song-item"
          v-for="index in 6"
          :key="index"
          :focus-id="songItemPrefixName + index"
        >
          <div class="cover cover-shadow">
            <img :src="cover" />
          </div>
          <div class="content">
            <div class="song">星座になれたら</div>
            <div class="singer">kessoku band</div>
          </div>
        </FocusItem>
      </div>
      <div class="button-list sub-button-list" v-show="isShowSongSubButton">
        <FocusItem
          class="round-button"
          :focus-id="subButtonPrefixName + 'btn1'"
        ></FocusItem>
        <FocusItem
          class="round-button"
          :focus-id="subButtonPrefixName + 'btn2'"
        ></FocusItem>
      </div>
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
@scale-image: 1.1; // 图片缩放倍数
@scale-button: 1.25; // 按钮缩放倍数

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
    top: 40px;
    left: 0;

    .album-name {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      color: #ececec;
      font-size: 18px;
      font-weight: 700;
      line-height: 100%;
    }
  }

  .button-list {
    display: flex;
    flex-direction: row;
    align-items: center;

    .round-button {
      width: 34px;
      height: 34px;
      margin-left: 23px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      backdrop-filter: blur(20px);
      transition: transform var(--transition-duration);

      &:first-child {
        margin-left: 0;
      }

      &.focused {
        background: rgba(255, 255, 255, 0.87);
        transform: scale(@scale-button);
      }
    }
  }

  .song-list-wrap {
    width: 100%;
    position: absolute;
    top: calc(50% + 21px);
    transform: translateY(-50%);

    .song-list {
      --song-cover-size: 372px;
      --song-gap: 29px;
      padding-top: 20px;
      padding-bottom: 61px;

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

        &.focused {
          .cover {
            transform: scale(@scale-image);
          }

          .content {
            color: #ececec;

            .song,
            .singer {
              transform: translateY(18.5px);
            }
          }
        }

        .cover {
          width: var(--song-cover-size);
          height: var(--song-cover-size);
          border-radius: 8px;
          overflow: hidden;
          transition: transform var(--transition-duration);

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .content {
          color: #ececec99;
          font-size: 21px;
          font-weight: 500;
          text-align: center;

          .song {
            margin-top: 5px;
            line-height: 100%;
            transition: transform var(--transition-duration);
          }

          .singer {
            margin-top: 3px;
            line-height: 100%;
            transition: transform var(--transition-duration);
          }
        }
      }
    }

    .sub-button-list {
      width: 100%;
      justify-content: center;
      position: absolute;
      bottom: 0;
    }
  }

  .progress-bar-wrap {
    width: 100%;
    padding: 0 55px;
    position: absolute;
    bottom: 23px;
    opacity: 0;

    &-show {
      opacity: 1;
    }
  }
}
</style>
