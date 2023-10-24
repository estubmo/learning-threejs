<script setup lang="ts">
import { useWindowScroll, useWindowSize } from "@vueuse/core";
import {
  BoxGeometry,
  ConeGeometry,
  GridHelper,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  WebGLRenderer,
} from "three";
import { computed, onMounted, ref, watch } from "vue";

const canvas = ref();
const { width, height } = useWindowSize();
const { x, y } = useWindowScroll();

const aspectRatio = computed(() => width.value / height.value);

// scene
const scene = new Scene();

// camera
let camera = new PerspectiveCamera(75, aspectRatio.value, 0.1, 100);
camera.position.set(0, 2, 5);

// renderers
let renderer: WebGLRenderer;
function updateRenderer() {
  renderer.setSize(width.value, height.value);
  renderer.setPixelRatio(window.devicePixelRatio);
}

onMounted(() => {
  // renderer
  renderer = new WebGLRenderer({
    antialias: true,
    canvas: canvas.value as unknown as HTMLCanvasElement,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animate);
  renderer.setClearAlpha(1);
});

// helpers
function lerp(start: number, end: number, t: number) {
  return (1 - t) * start + t * end;
}

const gridHelper = new GridHelper(10, 10, 0xaec6cf, 0xaec6cf);
scene.add(gridHelper);

// objects
const cube = new Mesh(
  new BoxGeometry(1, 1, 1),
  new MeshBasicMaterial({ color: 0xff00ff }),
);

const sphere = new Mesh(
  new SphereGeometry(1, 32, 32),
  new MeshBasicMaterial({ color: 0x00ffff }),
);
sphere.position.x = 4;

const cone = new Mesh(
  new ConeGeometry(1, 1, 32),
  new MeshBasicMaterial({ color: 0xffff00 }),
);
cone.position.x = -4;

scene.add(cube, sphere, cone);

for (let i = -25; i < 25; i++) {
  const obj = new Mesh(
    new BoxGeometry(0.1, 0.1, 0.1),
    new MeshBasicMaterial({ color: 0xff0000 }),
  );
  obj.position.y = i;
  scene.add(obj);
}

function updateCamera() {
  camera.aspect = aspectRatio.value;
  if (aspectRatio.value < 0.7) {
    camera.lookAt(cone.position);
  } else if (aspectRatio.value < 1.2) {
    camera.lookAt(sphere.position);
  } else {
    camera.lookAt(cube.position);
  }

  camera.position.y = lerp(2, 20, y.value / 5000);
  camera.position.z = lerp(5, 6, y.value / 1000);
  camera.updateProjectionMatrix();
}

watch(aspectRatio, updateRenderer);
watch(aspectRatio, updateCamera);
watch(x, () => console.log(x.value));
watch(y, updateCamera);
updateCamera();

function animate() {
  // Update controls
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
</script>

<template>
  <div class="h-96 text-3xl text-red-500">Try</div>
  <div class="h-96 text-3xl text-red-500">changing</div>
  <div class="h-96 text-3xl text-red-500">the</div>
  <div class="h-96 text-3xl text-red-500">aspect</div>
  <div class="h-96 text-3xl text-red-500">ratio</div>
  <div class="h-screen"></div>
  <canvas
    class="!fixed inset-0 -z-10 w-full h-screen bg-zinc-400"
    ref="canvas"
  />
</template>
