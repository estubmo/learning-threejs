<script setup lang="ts">
import { useGLTF } from "@tresjs/cientos";
import { useRenderLoop } from "@tresjs/core";
import { ref, shallowRef } from "vue";

const props = defineProps<{
  progress: number;
}>();

const path = "/models/mars.glb";

const { scene } = await useGLTF(path, { draco: true });
scene.scale.set(3, 3, 3);

const parentRef = ref();
const modelRef = shallowRef();

const { onLoop } = useRenderLoop();

onLoop(({ elapsed }) => {
  scene.rotation.y += 0.0005;
});
</script>

<template>
  <TresGroup ref="parentRef" :position="[0, -1, 0]">
    <primitive ref="modelRef" :object="scene" />
  </TresGroup>
</template>
