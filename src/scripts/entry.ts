import * as THREE from 'three';

const canvas = document.querySelector<HTMLDivElement>("#canvas-container")!;
// camera
const camera = new THREE.PerspectiveCamera(75, canvas.getBoundingClientRect().width / canvas.getBoundingClientRect().height);
camera.position.set(0, 0, 500);

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(canvas.getBoundingClientRect().width - 20, canvas.getBoundingClientRect().height);
renderer.setAnimationLoop(animate);
renderer.setClearAlpha(0);


// canvas
canvas.appendChild(renderer.domElement);

// scene settings
const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(100, 100, 100);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

window.addEventListener('resize', onWindowResize);
function onWindowResize() {
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height);
}

function animate() {
    renderer.render(scene, camera);
}
