var scene;
var camera;
var renderer;
var cube;
var startx;
var starty;
function init() {
  scene = new THREE.Scene();
  let canvasobject = document.getElementById("canvas");
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasobject});
  renderer.setSize(window.innerWidth, window.innerHeight)
  drawxyzlines();
  camera.up = new THREE.Vector3(0, 0, 1);
  camera.position.set(10, 10, 10);
  camera.lookAt(0, 0, 0);
  animate();
  window.addEventListener("resize", resizecanvas, false);
  canvasobject.addEventListener("mousemove", mousemovehandler);
  canvasobject.addEventListener("mousedown", mousedownhandler);
  canvasobject.addEventListener("mouseup", mouseuphandler);
}
//this could be more efficient
function drawxyzlines() {
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
function mousedownhandler(event) {
  startx = event.clientX;
  starty = event.clientY;
}
function mouseuphandler(event) {
  startx = null;
  starty = null;
}
function mousemovehandler(event) {
  if(startx == null) {
    return;
  }
  orbit(event.clientX - startx, event.clientY - starty);
  startx = event.clientX;
  starty = event.clientY;
  document.getElementById("positiontext").innerHTML = event.clientX + " " + event.clientY;

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
function orbit(plusx, plusy) {
  var speed = (Math.PI / 2000);
  var plusphi = speed * plusx;
  var plustheta = speed * plusy;
  var pos = camera.position.sub(new THREE.Vector3(0, 0, 0));
  var radius = pos.length();
  var theta = Math.acos(pos.z / radius);
  var phi = Math.atan2(pos.y, pos.x);

  theta = Math.min(Math.max(theta - plustheta, 0), Math.PI);
  phi -= plusphi;

  pos.x = radius * Math.sin(theta) * Math.cos(phi);
  pos.y = radius * Math.sin(theta) * Math.sin(phi);
  pos.z = radius * Math.cos(theta);

  camera.position.add(new THREE.Vector3(0, 0, 0));
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  redraw();
}

window.onload = function() {
  init();

}
