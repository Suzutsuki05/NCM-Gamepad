<script setup lang="ts">
import BasicLayouts from './layouts/BasicLayouts.vue'
import Versions from './components/Versions.vue'

const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
</script>

<template>
  <div id="app">
    <BasicLayouts />

    <!-- TODO template （del it） -->
    <!-- <Versions /> -->
  </div>
</template>
