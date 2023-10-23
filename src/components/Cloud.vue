<script setup lang="ts">
import { useGLTF } from "@tresjs/cientos";
import { useRenderLoop, type TresObject3D } from "@tresjs/core";
import { ref, shallowRef, toRefs } from "vue";

const props = defineProps<{
  progress: number;
}>();

const { progress } = toRefs(props);
const path = "/models/cloud.glb";

const { nodes } = await useGLTF(path, { draco: true });
const cloud = nodes["Sketchfab_model"] as TresObject3D;
cloud.position.x = -1.1;
cloud.position.y = -0.4;

function normalize(val: number, min: number, max: number) {
  if (min < 0) {
    max += 0 - min;
    val += 0 - min;
    min = 0;
  }
  val = val - min;
  max = max - min;
  return Math.max(0, Math.min(1, val / max));
}

function lerp(start: number, end: number, t: number) {
  return (1 - t) * start + t * end;
}
const SCALE = 0.003;
cloud.scale.set(SCALE, SCALE, SCALE);
const parentRef = ref();
const modelRef = shallowRef();

const { onLoop } = useRenderLoop();

onLoop(({ elapsed }) => {
  if (!cloud) return;
  cloud.rotation.x = Math.sin(elapsed) * 0.02 - 89.5;
  cloud.rotation.y = Math.sin(elapsed * 1.5) * 0.03 - 0.03;
  cloud.position.y = Math.sin(elapsed) * 0.02 - 0.4;

  const normalizedWindowWidth = normalize(window.innerWidth, 0, 1920);
  const parentScale = Math.min(Math.max(normalizedWindowWidth, 0.6), 0.9);
  parentRef.value.scale.set(parentScale, parentScale, parentScale);

  if (progress.value <= 0.15) {
    const t = normalize(progress.value, 0.01, 0.15);
    parentRef.value.position.x = lerp(-6, -0.5, t);
  } else {
    const t = normalize(progress.value, 0.5, 1);
    parentRef.value.position.x = lerp(-0.5, -6, t);
  }
});
</script>

<template>
  <TresGroup ref="parentRef" :position="[0, 0.25, 0]">
    <primitive ref="modelRef" :object="cloud" />
  </TresGroup>
</template>
