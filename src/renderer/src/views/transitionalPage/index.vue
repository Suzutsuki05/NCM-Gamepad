<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// 标题
const title = computed(() => {
  return route.query.title;
});

// 前往页面名称
const toRouteName = computed(() => {
  return route.query.toRouteName?.toString();
});

// 页面跳转
const handleJump = () => {
  setTimeout(() => {
    router.push({
      name: toRouteName.value,
      query: {},
    });
  }, 1500);
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
    font-size: 32px;
    font-weight: bold;
  }
}
</style>
