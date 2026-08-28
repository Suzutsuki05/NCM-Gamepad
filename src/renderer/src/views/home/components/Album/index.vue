<script lang="ts" setup>
import focusManager from "@renderer/core/gamepad/focus/focusManager";
import cover from "@renderer/assets/image/cover.jpg";
import { prefixName } from "./config.data";

const props = defineProps<{
  id: string;
}>();
</script>

<template>
  <FocusItem class="album" :focus-id="prefixName + id">
    <div class="cover">
      <img :src="cover" />
    </div>
    <div class="content">
      <!-- TODO 歌曲名称和歌手做动态滚动 -->
      <div class="song">two</div>
      <div class="singer">鹿乃</div>
    </div>
  </FocusItem>
</template>

<style lang="less" scoped>
@scale-image: 1.2; // 缩放倍数
@transition-duration: 0.2s; // 过度时间

.focus-item {
  margin-left: 30px;

  &:first-child {
    margin-left: 0;
    padding-left: 54px;
  }

  &:last-child {
    margin-right: 0;
    padding-right: 54px;
  }
}

.album {
  display: flex;
  flex-direction: column;
  align-items: center;

  .cover {
    width: 210px;
    height: 210px;
    margin-bottom: 2px;
    border-radius: 10px;
    overflow: hidden;
    transition: all @transition-duration;

    // TODO 添加三边阴影

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .content {
    text-align: center;
    transition: all @transition-duration;

    .song {
      color: #858585;
      font-size: 20px;
    }

    .singer {
      color: #696d6f;
      font-size: 20px;
    }
  }
}

.focused {
  .cover {
    transform: scale(@scale-image);
  }

  .content {
    transform: translateY(21px);

    .song,
    .singer {
      color: #fff;
    }
  }
}
</style>
