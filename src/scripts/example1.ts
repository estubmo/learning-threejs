import * as THREE from 'three';

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const canvas = document.querySelector<HTMLDivElement>("#canvas-container")!;
// camera
const camera = new THREE.PerspectiveCamera(75, canvas.getBoundingClientRect().width / canvas.getBoundingClientRect().height);
camera.position.set(0, 0, 4);

// position camera
camera.position.set(1, 1, 5);

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(canvas.getBoundingClientRect().width - 20, canvas.getBoundingClientRect().height);
renderer.setAnimationLoop(animate);
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


const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

// scale cube
mesh.scale.set(1, 2, 3);

// rotate cube - euler
mesh.rotation.y = Math.PI * 0.75;


// camera - look at
camera.lookAt(mesh.position);


window.addEventListener('resize', onWindowResize);
function onWindowResize() {
  camera.updateProjectionMatrix();
  renderer.setSize(canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height);
}

function animate() {
  renderer.render(scene, camera);
}
