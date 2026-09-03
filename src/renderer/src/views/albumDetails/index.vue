<script lang="ts" setup>
import { onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useInputCallback } from "@renderer/hooks/gamepad";
import focusManager from "@renderer/core/gamepad/focus/focusManager";

import { focusScopeId } from "./config.data";
import cover from "@renderer/assets/image/cover2.jpg";
import { mockDataList } from "./mock.data";

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
  <div class="album-details">
    <!-- 封面 -->
    <div class="cover-wrap">
      <div class="cover">
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
          <div class="button button-play">播放</div>
          <div class="button button-random-play">随机播放</div>
        </div>
        <div class="right">
          <div class="button"></div>
          <div class="button"></div>
        </div>
      </div>
      <div class="song-list">
        <div
          class="song-item"
          v-for="(item, index) in mockDataList"
          :key="index"
        >
          <div class="left">
            <div class="cover">
              <img :src="cover" />
            </div>
            <div class="song-item-info">
              <span class="song">{{ item.title }}</span>
              <span class="singer">{{ item.singer }}</span>
            </div>
          </div>
          <div class="time">{{ item.time }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.album-details {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;

  .cover-wrap {
    width: 42%;
    display: flex;
    flex: 0 0 auto;
    justify-content: center;
    padding-top: 50px;

    .cover {
      width: 450px;
      height: 450px;
      border-radius: 10px;
      overflow: hidden;

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
    padding-top: 50px;
    padding-bottom: 20px;
    padding-right: 50px;
    overflow: scroll;
    scrollbar-width: none;

    .info {
      display: flex;
      flex-direction: column;
      color: #888387;

      .title {
        font-size: 60px;
        font-weight: 600;
        line-height: 100%;
      }

      .singer {
        margin-top: 12px;
        font-size: 22px;
        font-weight: 500;
        line-height: 100%;
      }

      .introduction {
        margin-top: 40px;
        font-size: 22px;
        font-weight: 500;
        line-height: 100%;
      }
    }

    .operation {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-top: 40px;

      .left,
      .right {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      .left {
        .button {
          width: 145px;
          height: 45px;
          margin-left: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #ececec;
          font-weight: 500;
          border-radius: 8px;
          background: #828282;

          &:first-child {
            margin-left: 0;
          }

          &-play {
          }

          &-random-play {
          }
        }
      }

      .right {
        .button {
          width: 45px;
          height: 45px;
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

    .song-list {
      margin-top: 30px;
      height: auto;

      .song-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-top: 10px;

        &:first-child {
          margin-top: 0;
        }

        .left {
          display: flex;
          flex-direction: row;
          align-items: center;

          .cover {
            width: 60px;
            height: 60px;
            border-radius: 10px;
            overflow: hidden;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          .song-item-info {
            display: flex;
            flex-direction: column;
            margin-left: 10px;
            font-weight: 500;

            .song {
              color: #eeeef0;
              font-size: 18px;
              line-height: 100%;
            }

            .singer {
              margin-top: 7px;
              color: #696d6f;
              font-size: 15px;
              line-height: 100%;
            }
          }
        }

        .time {
          color: #868588;
          font-size: 18px;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
