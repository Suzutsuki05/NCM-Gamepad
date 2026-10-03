<script lang="ts" setup>
import { mockDataList } from "../mock.data";
</script>

<template>
  <div class="album-list">
    <div class="album-item" v-for="(item, index) in mockDataList" :key="index">
      <div class="left">
        <div class="num">{{ index + 1 }}</div>
        <div class="song">{{ item.title }}</div>
      </div>
      <div class="time">{{ item.time }}</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.album-list {
  margin-top: 30px;
  height: auto;

  .album-item {
    height: 70px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 3px;

    // TODO 聚焦背景色
    // background: #fefefe;

    &:first-child {
      margin-top: 0;
    }

    .left {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 21px;
      font-weight: 500;

      .num {
        color: #eeeef0;
        line-height: 100%;
      }

      .song {
        color: #eeeef0;
        margin-left: 18px;
        line-height: 100%;
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
