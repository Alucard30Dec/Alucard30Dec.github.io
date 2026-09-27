import * as THREE from "three";
import { OrbitControls } from "./vendor/three/OrbitControls.js";

var petRoot = document.getElementById("voxelPet");
var host = petRoot && petRoot.querySelector("[data-pet-3d-host]");
var renderer = null;
var scene = null;
var camera = null;
var controls = null;
var resizeObserver = null;
var themeObserver = null;
var frameId = 0;
var disposed = false;
var geometries = [];
var materials = [];
var materialBindings = [];
var keyLight = null;
var fillLight = null;
var shadowMaterial = null;

function getCssColor(variableName, fallback) {
  var value = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
  return value || fallback;
}

function createMaterial(variableName, fallback, options) {
  var material = new THREE.MeshStandardMaterial(Object.assign({
    color: getCssColor(variableName, fallback),
    roughness: 0.86,
    metalness: 0.02,
    flatShading: true
  }, options || {}));

  materials.push(material);
  materialBindings.push({ material: material, variableName: variableName, fallback: fallback });
  return material;
}

function createFixedMaterial(color, options) {
  var material = new THREE.MeshStandardMaterial(Object.assign({
    color: color,
    roughness: 0.86,
    metalness: 0.02,
    flatShading: true
  }, options || {}));

  materials.push(material);
  return material;
}

function trackGeometry(geometry) {
  geometries.push(geometry);
  return geometry;
}

function addBox(parent, size, position, material, rotation) {
  var mesh = new THREE.Mesh(trackGeometry(new THREE.BoxGeometry(size[0], size[1], size[2])), material);
  mesh.position.set(position[0], position[1], position[2]);
  if (rotation) {
    mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
  }
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function addCylinder(parent, radiusTop, radiusBottom, height, segments, position, material, rotation) {
  var mesh = new THREE.Mesh(trackGeometry(new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments)), material);
  mesh.position.set(position[0], position[1], position[2]);
  if (rotation) {
    mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
  }
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function buildDesk(group, palette) {
  addBox(group, [5.8, 0.36, 3.6], [0, 1.8, 0], palette.deskTop);
  [[-2.45, 0.8, -1.45], [2.45, 0.8, -1.45], [-2.45, 0.8, 1.45], [2.45, 0.8, 1.45]].forEach(function (position, index) {
    addBox(group, [0.34, 1.8, 0.34], position, index % 2 ? palette.deskSide : palette.deskFront);
  });
}

function buildCat(group, palette) {
  addBox(group, [1.35, 1.55, 1.15], [0.45, 3.02, -0.65], palette.furFront);
  addBox(group, [1.45, 1.25, 1.25], [0.45, 4.18, -0.55], palette.furTop);

  var earGeometry = trackGeometry(new THREE.ConeGeometry(0.34, 0.72, 4));
  [-0.05, 0.95].forEach(function (x, index) {
    var ear = new THREE.Mesh(earGeometry, index === 0 ? palette.furTop : palette.furSide);
    ear.position.set(x, 5.05, -0.55);
    ear.rotation.y = Math.PI * 0.25;
    ear.castShadow = true;
    group.add(ear);
  });

  addBox(group, [0.72, 0.36, 0.24], [0.45, 4.03, 0.08], palette.muzzle);
  addBox(group, [0.11, 0.11, 0.08], [0.12, 4.38, 0.1], palette.furDark);
  addBox(group, [0.11, 0.11, 0.08], [0.78, 4.38, 0.1], palette.furDark);
  addBox(group, [0.15, 0.1, 0.09], [0.45, 4.1, 0.23], palette.furDark);

  addBox(group, [0.32, 0.62, 0.42], [0.02, 2.43, 0.18], palette.furFront, [-0.08, 0, 0]);
  addBox(group, [0.32, 0.62, 0.42], [0.86, 2.43, 0.18], palette.furFront, [-0.08, 0, 0]);

  var tail = new THREE.Group();
  tail.position.set(1.08, 3.05, -1.02);
  addBox(tail, [1.25, 0.34, 0.34], [0.58, 0.14, 0], palette.furSide, [0, 0.22, 0.28]);
  addBox(tail, [0.95, 0.31, 0.31], [1.44, 0.45, -0.12], palette.furFront, [0, -0.25, 0.52]);
  group.add(tail);
}

function buildLaptop(group, palette) {
  addBox(group, [2.2, 0.14, 1.35], [-0.72, 2.05, 0.62], palette.laptopDark);

  var screen = new THREE.Group();
  screen.position.set(-0.72, 2.85, 0.1);
  screen.rotation.x = -0.2;
  addBox(screen, [2.2, 1.45, 0.13], [0, 0, 0], palette.laptopDark);
  addBox(screen, [1.9, 1.15, 0.05], [0, 0, 0.09], palette.laptop);
  addBox(screen, [0.08, 0.62, 0.05], [-0.32, 0, 0.135], palette.code, [0, 0, 0.64]);
  addBox(screen, [0.08, 0.62, 0.05], [0.32, 0, 0.135], palette.code, [0, 0, -0.64]);
  group.add(screen);

  addBox(group, [1.55, 0.05, 0.86], [-0.72, 2.14, 0.66], palette.laptopLight);
}

function buildPlant(group, palette) {
  addCylinder(group, 0.38, 0.3, 0.5, 5, [-2.08, 2.23, -0.58], palette.pot);
  addBox(group, [0.1, 0.85, 0.1], [-2.08, 2.82, -0.58], palette.stem);
  addBox(group, [0.55, 0.18, 0.32], [-2.32, 3.05, -0.58], palette.leaf, [0, 0.18, -0.45]);
  addBox(group, [0.55, 0.18, 0.32], [-1.85, 3.18, -0.58], palette.leafLight, [0, -0.2, 0.45]);
}

function buildMug(group, palette) {
  addCylinder(group, 0.34, 0.32, 0.52, 8, [2.08, 2.24, 0.35], palette.mug);
  var handle = new THREE.Mesh(trackGeometry(new THREE.TorusGeometry(0.28, 0.065, 4, 8, Math.PI * 1.35)), palette.mugSide);
  handle.position.set(2.38, 2.25, 0.35);
  handle.rotation.set(Math.PI / 2, 0, Math.PI / 2);
  handle.castShadow = true;
  group.add(handle);
}

function createSceneObjects() {
  var palette = {
    furTop: createMaterial("--pet-fur-top", "#d8b79b"),
    furFront: createMaterial("--pet-fur-front", "#b98266"),
    furSide: createMaterial("--pet-fur-side", "#8f604d"),
    furDark: createMaterial("--pet-fur-dark", "#5b3a31"),
    deskTop: createMaterial("--pet-desk-top", "#9f6849"),
    deskFront: createMaterial("--pet-desk-front", "#754833"),
    deskSide: createMaterial("--pet-desk-side", "#5a3729"),
    laptop: createMaterial("--pet-laptop", "#198396", { roughness: 0.68 }),
    laptopDark: createMaterial("--pet-laptop-dark", "#0d5d6a", { roughness: 0.7 }),
    laptopLight: createMaterial("--pet-laptop-light", "#38afbd", { roughness: 0.68 }),
    muzzle: createFixedMaterial("#ead1bc"),
    code: createFixedMaterial("#dffcff", { emissive: "#15535d", emissiveIntensity: 0.3 }),
    pot: createFixedMaterial("#b9c1cc"),
    mug: createFixedMaterial("#d9dee7"),
    mugSide: createFixedMaterial("#a6afbc"),
    stem: createFixedMaterial("#557246"),
    leaf: createFixedMaterial("#6e934f"),
    leafLight: createFixedMaterial("#8cac62")
  };

  var group = new THREE.Group();
  group.position.set(0, 0.05, 0);
  scene.add(group);

  buildDesk(group, palette);
  buildCat(group, palette);
  buildLaptop(group, palette);
  buildPlant(group, palette);
  buildMug(group, palette);

  shadowMaterial = new THREE.ShadowMaterial({ color: 0x000000, opacity: 0.17 });
  materials.push(shadowMaterial);
  var shadowPlane = new THREE.Mesh(trackGeometry(new THREE.PlaneGeometry(8.5, 6.6)), shadowMaterial);
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = -0.04;
  shadowPlane.receiveShadow = true;
  scene.add(shadowPlane);
}

function applyTheme() {
  if (disposed) {
    return;
  }

  materialBindings.forEach(function (binding) {
    binding.material.color.set(getCssColor(binding.variableName, binding.fallback));
  });

  var isDark = document.documentElement.getAttribute("data-theme") === "dark";
  if (shadowMaterial) {
    shadowMaterial.opacity = isDark ? 0.28 : 0.17;
  }
  if (keyLight) {
    keyLight.intensity = isDark ? 3.2 : 2.7;
  }
  if (fillLight) {
    fillLight.intensity = isDark ? 1.35 : 1.75;
  }

  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}

function resizeRenderer() {
  if (!renderer || !camera || !host) {
    return;
  }

  var width = Math.max(1, Math.round(host.clientWidth));
  var height = Math.max(1, Math.round(host.clientHeight));
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function renderFrame() {
  if (disposed || document.hidden || !renderer) {
    frameId = 0;
    return;
  }

  controls.update();
  renderer.render(scene, camera);
  frameId = window.requestAnimationFrame(renderFrame);
}

function startRendering() {
  if (!frameId && !disposed && !document.hidden) {
    frameId = window.requestAnimationFrame(renderFrame);
  }
}

function stopRendering() {
  if (frameId) {
    window.cancelAnimationFrame(frameId);
    frameId = 0;
  }
}

function handleVisibilityChange() {
  if (document.hidden) {
    stopRendering();
  } else {
    startRendering();
  }
}

function disposePet3D() {
  if (disposed) {
    return;
  }

  disposed = true;
  stopRendering();
  document.removeEventListener("visibilitychange", handleVisibilityChange);
  window.removeEventListener("pagehide", disposePet3D);

  if (resizeObserver) {
    resizeObserver.disconnect();
  }
  if (themeObserver) {
    themeObserver.disconnect();
  }
  if (controls) {
    controls.dispose();
  }

  geometries.forEach(function (geometry) {
    geometry.dispose();
  });
  materials.forEach(function (material) {
    material.dispose();
  });

  if (renderer) {
    renderer.dispose();
    renderer.domElement.remove();
  }

  if (petRoot) {
    petRoot.classList.remove("is-3d-ready");
  }
}

function initializePet3D() {
  if (!petRoot || !host) {
    return;
  }

  try {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(7.5, 6.2, 8.5);

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.domElement.className = "pet-3d-canvas";
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 2.2, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.rotateSpeed = 0.7;
    controls.zoomSpeed = 0.8;
    controls.minDistance = 7;
    controls.maxDistance = 15;
    controls.minPolarAngle = 0.55;
    controls.maxPolarAngle = 1.45;
    controls.touches.ONE = THREE.TOUCH.ROTATE;
    controls.touches.TWO = THREE.TOUCH.DOLLY_ROTATE;
    controls.update();

    fillLight = new THREE.HemisphereLight(0xf5f8ff, 0x7b6658, 1.75);
    scene.add(fillLight);

    keyLight = new THREE.DirectionalLight(0xffffff, 2.7);
    keyLight.position.set(5, 9, 7);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 30;
    keyLight.shadow.camera.left = -7;
    keyLight.shadow.camera.right = 7;
    keyLight.shadow.camera.top = 7;
    keyLight.shadow.camera.bottom = -7;
    scene.add(keyLight);

    createSceneObjects();
    resizeRenderer();
    applyTheme();
    renderer.render(scene, camera);
    petRoot.classList.add("is-3d-ready");

    resizeObserver = new ResizeObserver(resizeRenderer);
    resizeObserver.observe(host);

    themeObserver = new MutationObserver(applyTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", disposePet3D, { once: true });
    startRendering();
  } catch (error) {
    console.warn("3D pet unavailable; using SVG fallback.", error);
    disposePet3D();
  }
}

initializePet3D();
