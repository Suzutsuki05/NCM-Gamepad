<script lang="ts" setup>
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
    <!-- TODO 歌曲名称和歌手做动态滚动 -->
    <div class="song">two</div>
    <div class="singer">鹿乃</div>
  </FocusItem>
</template>

<style lang="less" scoped>
.album {
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:first-child {
    margin-left: 54px;
  }

  &:last-child {
    margin-right: 54px;
  }

  .cover {
    width: 210px;
    height: 210px;
    margin-bottom: 2px;
    border-radius: 10px;
    overflow: hidden;

    // TODO 添加三边阴影

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .song {
    color: #858585;
    font-size: 20px;
  }

  .singer {
    color: #696d6f;
    font-size: 20px;
  }
}

.focused {
  border: 1px solid red;
}
</style>
