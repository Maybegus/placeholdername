const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const geometry = new THREE.BoxGeometry(3, 3, 3);
const material = new THREE.MeshBasicMaterial({color: 0xFFFFFF})
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 20;
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.z += 0.01;
  renderer.render(scene, camera);
}
function orbit(plusx, plusy) {
  var speed = (Math.PI / 500);
  var plusphi = speed * plusx;
  var plustheta = speed * plusy;
  var pos = camera.position.sub(center);
  var radius = pos.length();
  var theta = Math.acos(pos.z / radius);
  var phi = Math.atan2(pos.y, pos.x);

  theta = Math.min(Math.max(theta - plustheta, 0), Math.PI);
  phi -= plusphi;

  pos.x = radius * Math.sin(theta) * Math.cos(phi);
  pos.y = radius * Math.sin(theta) * Math.sin(phi);
  pos.z = radius * Math.cos(theta);

  camera.position.add(center);
  camera.lookAt(center);
  redraw();
}
animate();
document.getElementById("canvas").onmouseover = function(){
  document.getElementById("canvas").onmouseout = function(){
    
  }
}
