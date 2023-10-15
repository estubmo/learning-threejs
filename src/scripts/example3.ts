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

let time = Date.now();

function animate() {
  // time
  const current = Date.now();
  const delta = current - time;
  time = current;
  console.log("delta: ", delta);

  // update
  cube1.rotation.y -= 0.002 * delta;
  cube2.rotation.x += 0.001 * delta;
  cube3.rotation.x -= 0.001 * delta;

  group.rotation.y += 0.001 * delta;
  renderer.render(scene, camera);
}
