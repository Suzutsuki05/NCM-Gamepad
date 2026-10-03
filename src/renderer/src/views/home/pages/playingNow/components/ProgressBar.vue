<script lang="ts" setup></script>

<template>
  <div class="progress-bar">
    <div class="bar"></div>
    <div class="time-remaining">
      <!-- TODO 时间如果发生碰撞，直接展示剩余时间，也就是右边那个 -->
      <!-- TODO 或者想想别的办法 -->
      <div class="time-value">-02:48</div>
    </div>
    <div class="time-current">
      <div class="line"></div>
      <div class="time-value value">01:28</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.progress-bar {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;

  .bar {
    width: 100%;
    height: 9px;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(20px);
    border-radius: 5px;
  }

  .time-value {
    color: #ffffff99;
    font-size: 16px;
    font-weight: 800;
    line-height: 100%;
  }

  .time-remaining {
    margin-top: 8px;
    margin-right: 2px;
  }

  .time-current {
    position: absolute;
    left: 43%;
    top: 0;

    .line {
      width: 1.3px;
      height: 9px;
      background: #fff;
    }

    .value {
      margin-top: 8px;
      transform: translateX(-50%);
    }
  }
}
</style>
