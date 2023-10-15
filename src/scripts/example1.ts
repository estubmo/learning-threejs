import * as THREE from "three";

const canvas = document.querySelector<HTMLDivElement>("#canvas-container")!;

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
);
camera.position.set(0, 0, 4);

// position camera
camera.position.set(1, 1, 5);

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearAlpha(0);

// canvas
canvas.appendChild(renderer.domElement);

// scene settings
const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "skyblue" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// position cube
mesh.position.set(2, 1, 1);

const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// scale cube
mesh.scale.set(1, 2, 3);

// rotate cube - euler
mesh.rotation.y = Math.PI * 0.75;

// camera - look at
camera.lookAt(mesh.position);

window.addEventListener("resize", onWindowResize);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
}

renderer.render(scene, camera);
