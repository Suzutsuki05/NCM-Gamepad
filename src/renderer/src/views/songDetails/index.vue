<script lang="ts" setup>
import { onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useInputCallback } from "@renderer/hooks/gamepad";
import focusManager from "@renderer/core/gamepad/focus/focusManager";

import cover from "@renderer/assets/image/cover2.jpg";
import SongList from "./components/SongList.vue";
import AlbumList from "./components/AlbumList.vue";
import { focusScopeId } from "./config.data";

const { inputCallback, unsubscribe } = useInputCallback(focusScopeId, {
  global: true,
});

const route = useRoute();
const router = useRouter();

const back = () => {
  router.back();
};

inputCallback({
  back,
});

onMounted(() => {
  console.log(route);
});

onUnmounted(() => {
  unsubscribe();
});
</script>

<template>
  <div class="song-details">
    <!-- 封面 -->
    <div class="cover-wrap">
      <div class="cover cover-shadow">
        <img :src="cover" />
      </div>
    </div>
    <!-- 内容 -->
    <div class="content">
      <div class="info">
        <span class="title">one</span>
        <span class="singer">鹿乃</span>
        <span class="introduction">
          鹿乃アコースティックアレンジカバーのアルバム第一弾!
        </span>
      </div>
      <div class="operation">
        <div class="left">
          <div class="button button-play">
            <Icon
              class="icon"
              name="play"
              size="15"
              style="margin-right: 5px"
            />
            <span>播放</span>
          </div>
          <div class="button button-random-play">
            <Icon
              class="icon"
              name="play-random"
              size="23"
              style="margin-right: 4px"
            />
            <span>随机播放</span>
          </div>
        </div>
        <div class="right">
          <div class="button"></div>
          <div class="button"></div>
        </div>
      </div>
      <!-- 专辑列表 -->
      <template v-if="true">
        <AlbumList />
      </template>
      <!-- 歌曲列表 -->
      <template v-else>
        <SongList />
      </template>
    </div>
  </div>
</template>

<style lang="less" scoped>
.song-details {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  background: var(--background-color);
  padding: 0 54px;

  .cover-wrap {
    width: 38%;
    display: flex;
    flex: 0 0 auto;
    padding-top: 75px;

    .cover {
      width: 443px;
      height: 443px;
      border-radius: 10px;
      overflow: hidden;
      flex-shrink: 0;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding-top: 76px;
    padding-bottom: 20px;
    padding-left: 52px;
    overflow: scroll;
    scrollbar-width: none;

    .info {
      display: flex;
      flex-direction: column;
      color: #888387;

      .title {
        font-size: 52px;
        font-weight: 600;
        line-height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      .singer {
        margin-top: 12px;
        font-size: 20px;
        font-weight: 500;
        line-height: 100%;
      }

      .introduction {
        margin-top: 32px;
        font-size: 20px;
        font-weight: 500;
        line-height: 100%;
      }
    }

    .operation {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-top: 42px;

      .left,
      .right {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      .left {
        .button {
          width: 142px;
          height: 44px;
          margin-left: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #ececec;
          font-size: 20px;
          font-weight: 500;
          border-radius: 9px;
          background: #828282;

          &:first-child {
            margin-left: 0;
          }

          &-play {
          }

          &-random-play {
          }

          .icon {
            fill: #ececec !important;
          }
        }
      }

      .right {
        .button {
          width: 44px;
          height: 44px;
          margin-left: 16px;
          overflow: hidden;
          border-radius: 50%;
          background: #515151;

          &:first-child {
            margin-left: 0;
          }
        }
      }
    }
  }
}
</style>
