import * as THREE from "three";

const canvas = document.querySelector<HTMLDivElement>("#canvas-container")!;

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
);
camera.position.set(0, 0, 4);

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
renderer.setClearAlpha(0);

// canvas
canvas.appendChild(renderer.domElement);

// scene
const scene = new THREE.Scene();

// group
const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 }),
);
group.add(cube1);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
);

cube2.position.x = -2;
group.add(cube2);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff }),
);

cube3.position.x = 2;
group.add(cube3);

const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

window.addEventListener("resize", onWindowResize);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
}

const clock = new THREE.Clock();

function animate() {
  // time
  const elapsedTime = clock.getElapsedTime();
  // update
  cube1.rotation.y = Math.sin(elapsedTime);

  cube2.position.y = Math.sin(elapsedTime) * Math.PI * 0.5;
  cube2.position.x = Math.cos(elapsedTime) * Math.PI * 0.5;

  cube3.position.y = Math.sin(elapsedTime + Math.PI) * Math.PI * 0.5;
  cube3.position.x = Math.cos(elapsedTime + Math.PI) * Math.PI * 0.5;

  renderer.render(scene, camera);
}
