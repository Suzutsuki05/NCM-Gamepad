<script lang="ts" setup>
import cover from "@renderer/assets/image/cover-recommend.png";
import { prefixName } from "./config.data";

const props = defineProps<{
  id: string;
}>();
</script>

<template>
  <FocusItem class="recommend-card" :focus-id="prefixName + id">
    <div class="title">新增歌曲</div>
    <div class="cover cover-shadow">
      <img :src="cover" />
      <div class="content">
        <!-- TODO 需要支持单独设置换行功能 -->
        <span class="three-line-ellipsis">
          万妮达、法老、陈冠希、Aikes、周杰伦、田馥甄、新裤子乐队、陈绮贞、曹方、Hanser、泠鸢yousa、鹿乃、宇多田光、島みやえい子
          <!-- 好厉害啊的电台 -->
        </span>
      </div>
    </div>
  </FocusItem>
</template>

<style lang="less" scoped>
@scale-image: 1.15; // 图片缩放倍数
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

.recommend-card {
  .title {
    margin-bottom: 9px;
    color: #858585;
    font-size: 20px;
    line-height: 100%;
    transition: all @transition-duration;
  }

  .cover {
    width: 270px;
    height: 380px;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    transition: all @transition-duration;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .content {
      height: 95px;
      width: 100%;
      position: absolute;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;

      padding: 0px 14px;
      overflow: hidden;

      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(20px);

      span {
        color: #fff;
        font-size: 18px;
        text-align: center;
        word-break: normal;
        line-height: 22px;
      }
    }
  }
}

.focused {
  .title {
    transform: translateY(-28px);
  }

  .cover {
    transform: scale(@scale-image);
  }
}
</style>
