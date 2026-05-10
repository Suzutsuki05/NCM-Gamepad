<script lang="ts" setup>
import type { IconProps } from "./typing";

withDefaults(defineProps<IconProps>(), {
  size: "1em",
  color: "#000",
});
</script>

<template>
  <svg
    class="icon"
    :style="{
      width: size,
      height: size,
      fill: color,
    }"
  >
    <use :xlink:href="`#icon-${name}`"></use>
  </svg>
</template>
