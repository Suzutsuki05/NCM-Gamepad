<script lang="ts" setup>
import { inject, onMounted } from "vue";
import type { HomeContext } from "../typing";

import cover from "@renderer/assets/image/cover3.jpg";

const { setTabBarVisible } = inject("home-context") as HomeContext;

// TODO del
onMounted(() => {
  setTabBarVisible(false);
});
</script>

<template>
  <div class="playing-now">
    <div class="tool-bar">
      <span></span>
      <div class="album-name">星座になれたら - Single</div>
      <div class="button-list">
        <div class="button" v-for="index in 4" :key="index"></div>
      </div>
    </div>
    <div class="song-list">
      <div class="song-item" v-for="index in 6" :key="index">
        <div class="cover">
          <img :src="cover" />
        </div>
        <div class="song-name">星座になれたら</div>
        <div class="singer">kessoku band</div>
        <div class="button-list" v-if="index === 1">
          <div class="button"></div>
          <div class="button"></div>
        </div>
      </div>
    </div>
    <!-- TODO 这个要抽成组件 -->
    <div class="progress-bar-wrap">
      <div class="progress-bar"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@top-safe-area: 43px;

.playing-now {
  height: 100%;

  .tool-bar {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    position: relative;
    padding-top: @top-safe-area;
    padding-right: 55px;

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

    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: var(--song-gap);
    padding-inline: calc((100% - var(--song-cover-size)) / 2);
    margin-top: 80px;
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
  }

  .progress-bar-wrap {
    width: 100%;
    margin-top: 28px;
    padding: 0 55px;

    .progress-bar {
      width: 100%;
      height: 8px;
      background: rgba(255, 255, 255, 0.6);
      backdrop-filter: blur(20px);
      border-radius: 5px;
    }
  }
}
</style>
