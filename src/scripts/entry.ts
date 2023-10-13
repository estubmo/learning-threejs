import * as THREE from 'three';

// camera
const camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -100000, 100000);
camera.position.set(0, 0, 1000);
camera.quaternion.setFromEuler(new THREE.Euler(0, 0, 0));

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
renderer.setClearAlpha(0);


// canvas
const canvas = document.querySelector<HTMLDivElement>("#canvas-container")!;
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
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    renderer.render(scene, camera);
}
