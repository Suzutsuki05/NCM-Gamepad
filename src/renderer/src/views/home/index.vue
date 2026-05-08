<script lang="ts" setup>
import { useGamepadInputCallback } from "@renderer/hooks/gamepad";
import { onUnmounted } from "vue";

// confirm
const confirm = () => {
  console.log("init confirm");
};

// back
const back = () => {
  console.log("init back");
};

// secondary
const secondary = () => {
  console.log("init secondary");
};

// option
const option = () => {
  console.log("init option");
};

// up
const up = () => {
  console.log("init up");
};

// down
const down = () => {
  console.log("init down");
};

// left
const left = () => {
  console.log("init left");
};

// right
const right = () => {
  console.log("init right");
};

// lb
const lb = () => {
  console.log("init lb");
};

// rb
const rb = () => {
  console.log("init rb");
};

// lt
const lt = () => {
  console.log("init lt");
};

// rt
const rt = () => {
  console.log("init rt");
};

// view
const view = () => {
  console.log("init view");
};

// menu
const menu = () => {
  console.log("init menu");
};

// share
const share = () => {
  console.log("init share");
};

const { unsubscribe } = useGamepadInputCallback("home", {
  confirm,
  back,
  secondary,
  option,
  up,
  down,
  left,
  right,
  lb,
  rb,
  lt,
  rt,
  view,
  menu,
  share,
});

onUnmounted(() => {
  unsubscribe();
});
</script>

<template>
  <div class="home-wrap">
    <span>123</span>
  </div>
</template>

<style lang="less" scoped>
.home-wrap {
}
</style>
