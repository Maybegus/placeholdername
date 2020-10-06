var scene;
var camera;
var renderer;
var cube;
function init() {
  scene = new THREE.Scene();
  let canvasobject = document.getElementById("canvas");
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasobject});
  renderer.setSize(window.innerWidth, window.innerHeight)
  drawxyzlines(scene, camera);
  camera.position.set(0, 0, 10);
  camera.lookAt(0, 0, 0);
  animate();
  window.addEventListener("resize", resizecanvas, false);
}
function drawxyzlines(scene, camea) {
  let xmaterial = new THREE.LineBasicMaterial({color:0xff0000});
  let ymaterial = new THREE.LineBasicMaterial({color:0x00ff00});
  let zmaterial = new THREE.LineBasicMaterial({color:0x0000ff});
  let xpoints = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(5, 0, 0)];
  let ypoints = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 5, 0)];
  let zpoints = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 5)];
  let xgeometry = new THREE.BufferGeometry().setFromPoints(xpoints);
  let ygeometry = new THREE.BufferGeometry().setFromPoints(ypoints);
  let zgeometry = new THREE.BufferGeometry().setFromPoints(zpoints);
  let xline = new THREE.Line(xgeometry, xmaterial);
  let yline = new THREE.Line(ygeometry, ymaterial);
  let zline = new THREE.Line(zgeometry, zmaterial);
  scene.add(xline);
  scene.add(yline);
  scene.add(zline);
}
function resizecanvas() {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  window.setPixelRatio(window.devicePixelRatio);
  console.log("resized!");
}
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  console.log("framestep");
}
/*function orbit(plusx, plusy) {
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
}*/

window.onload = function() {
  init();

}
