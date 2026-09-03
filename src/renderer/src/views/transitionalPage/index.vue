<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const stayTime = 1.5; // 停留时间(单位:秒)

// 标题
const title = computed(() => {
  return route.query.title;
});

// 来源页面路径
const fromRoutePath = computed(() => {
  return route.query.fromRoutePath?.toString();
});

// 前往页面路径
const toRoutePath = computed(() => {
  return route.query.toRoutePath?.toString();
});

// 页面跳转
const handleJump = () => {
  setTimeout(() => {
    router.replace({
      path: toRoutePath.value,
      query: {
        test: "123",
      },
    });
  }, stayTime * 1000);
};

onMounted(() => {
  handleJump();
});
</script>

<template>
  <div class="transitional-page">
    <div class="title">{{ title }}</div>
  </div>
</template>

<style lang="less" scoped>
.transitional-page {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .title {
    color: #fff;
    // TODO 文字大小待定
    font-size: 32px;
    font-weight: bold;
  }
}
</style>
