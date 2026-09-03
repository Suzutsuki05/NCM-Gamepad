<script lang="ts" setup>
import focusManager from "@renderer/core/gamepad/focus/focusManager";
import { useJumpTransitionalPage } from "@renderer/hooks/jumpPage";
import { prefixName } from "./config.data";
import cover from "@renderer/assets/image/cover.jpg";

const { jumpTransitionalPage } = useJumpTransitionalPage();

const props = defineProps<{
  id: string;
}>();

// 确认按钮触发
const handleConfirm = () => {
  jumpTransitionalPage({
    id: "114514",
    title: "two",
    fromRoutePath: "/home",
    toRoutePath: "/album-details",
  });
};
</script>

<template>
  <FocusItem
    class="album"
    :focus-id="prefixName + id"
    :on-confirm="handleConfirm"
  >
    <div class="cover cover-shadow">
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
      color: #888387;
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
