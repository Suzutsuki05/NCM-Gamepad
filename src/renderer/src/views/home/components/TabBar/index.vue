<script lang="ts" setup>
import { onUnmounted } from "vue";
import { useInputCallback } from "@renderer/hooks/gamepad";
import focusManager from "@renderer/core/gamepad/focus/focusManager";
import { prefixName, tabsList } from "./config.data";

const { inputCallback, unsubscribe } = useInputCallback("tab-bar");

defineProps<{
  selectedTab: string;
}>();

const left = () => {
  focusManager.move("left");

  // console.log("tab-bar left");
};

const right = () => {
  focusManager.move("right");
};

const down = () => {
  focusManager.move("down");
};

inputCallback({
  left,
  right,
  down,
});

onUnmounted(() => {
  unsubscribe();
});
</script>

<template>
  <div class="tab-bar">
    <FocusItem
      class="tab-item"
      :class="{ 'tab-item-selected': prefixName + item.key === selectedTab }"
      v-for="item in tabsList"
      :key="item.key"
      :focus-id="prefixName + item.key"
    >
      <!-- 文本 -->
      <span class="label" v-if="item.label">{{ item.label }}</span>
      <!-- 图标 -->
      <Icon class="icon" :name="item.icon" size="25" v-if="item.icon" />
      <!-- 聚焦遮罩层 -->
      <div class="tab-item-mask"></div>
    </FocusItem>
  </div>
</template>

<style lang="less" scoped>
.tab-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  background: #0c0f0e;
  border-radius: 50px;

  .tab-item {
    height: 38px;
    padding: 0 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border-radius: 50px;
    cursor: pointer;
    user-select: none;

    .label {
      color: #878787;
      font-size: 18px;
      font-weight: 600;
      line-height: 100%;
      z-index: 1;
    }

    .icon {
      fill: #878787 !important;
      z-index: 1;
    }

    &-selected {
      background: #989898;

      .label {
        color: #f4f4f4;
      }

      .icon {
        fill: #f4f4f4 !important;
      }
    }

    &-mask {
      width: calc(100% + 18px);
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: calc(0 - 9px);
      z-index: 0;
      background: #fff;
      border-radius: 50px;
      box-shadow:
        0 10px 30px rgba(0, 0, 0, 0.35),
        0 4px 10px rgba(0, 0, 0, 0.2);
      opacity: 0;
    }
  }

  .focused {
    .label {
      color: #040606;
    }

    .icon {
      fill: #040606 !important;
    }

    .tab-item-mask {
      opacity: 1;
    }
  }
}
</style>
