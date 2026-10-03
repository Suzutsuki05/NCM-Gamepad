<script lang="ts" setup>
import cover from "@renderer/assets/image/cover2.jpg";
import { mockDataList } from "../mock.data";
</script>

<template>
  <div class="song-list">
    <div class="song-item" v-for="(item, index) in mockDataList" :key="index">
      <div class="left">
        <div class="cover cover-shadow">
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
</template>

<style lang="less" scoped>
.song-list {
  margin-top: 30px;
  height: auto;

  .song-item {
    height: 70px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 9px;

    &:first-child {
      margin-top: 0;
    }

    .left {
      display: flex;
      flex-direction: row;
      align-items: center;

      .cover {
        width: 70px;
        height: 70px;
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
        margin-left: 14px;
        font-weight: 500;

        .song {
          color: #eeeef0;
          font-size: 21px;
          line-height: 100%;
        }

        .singer {
          margin-top: 7px;
          color: #696d6f;
          font-size: 18px;
          line-height: 100%;
        }
      }
    }

    .time {
      color: #868588;
      font-size: 21px;
      font-weight: 500;
    }
  }
}
</style>
