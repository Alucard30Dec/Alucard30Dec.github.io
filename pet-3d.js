import * as THREE from "three";
import { OrbitControls } from "./vendor/three/OrbitControls.js";

var petRoot = document.getElementById("voxelPet");
var host = petRoot && petRoot.querySelector("[data-pet-3d-host]");
var renderer = null;
var scene = null;
var camera = null;
var controls = null;
var resizeObserver = null;
var frameId = 0;
var disposed = false;
var geometries = [];
var materials = [];
var instancedMeshes = [];
var keyLight = null;
var fillLight = null;
var voxelGeometry = null;
var voxelBatches = new Map();

function createMaterial(color, options) {
  var material = new THREE.MeshStandardMaterial(Object.assign({
    color: color,
    roughness: 0.88,
    metalness: 0,
    flatShading: true
  }, options || {}));
  materials.push(material);
  return material;
}

function trackGeometry(geometry) {
  geometries.push(geometry);
  return geometry;
}

function createVoxelGeometry() {
  var geometry = new THREE.BoxGeometry(1, 1, 1, 3, 3, 3);
  var positions = geometry.attributes.position;
  var point = new THREE.Vector3();
  var core = new THREE.Vector3();
  var normal = new THREE.Vector3();
  var inner = 0.3;
  for (var index = 0; index < positions.count; index += 1) {
    point.fromBufferAttribute(positions, index);
    ["x", "y", "z"].forEach(function (axis) {
      if (Math.abs(point[axis]) < 0.49) {
        point[axis] = Math.sign(point[axis]) * inner;
      }
    });
    core.copy(point).clampScalar(-inner, inner);
    normal.subVectors(point, core).normalize();
    point.copy(core).addScaledVector(normal, 0.5 - inner);
    positions.setXYZ(index, point.x, point.y, point.z);
  }
  geometry.computeVertexNormals();
  geometry.clearGroups();
  return trackGeometry(geometry);
}

function addVoxel(parent, size, position, material, rotation, shade) {
  parent.updateWorldMatrix(true, false);
  var dummy = new THREE.Object3D();
  dummy.position.set(position[0], position[1], position[2]);
  dummy.scale.set(size[0], size[1], size[2]);
  if (rotation) {
    dummy.rotation.set(rotation[0], rotation[1], rotation[2]);
  }
  dummy.updateMatrix();
  var matrix = new THREE.Matrix4().multiplyMatrices(parent.matrixWorld, dummy.matrix);
  if (!voxelBatches.has(material)) {
    voxelBatches.set(material, []);
  }
  voxelBatches.get(material).push({ matrix: matrix, shade: shade || 1 });
}

function addBox(parent, size, position, material, rotation) {
  var geometry = trackGeometry(new THREE.BoxGeometry(size[0], size[1], size[2]));
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(position[0], position[1], position[2]);
  if (rotation) {
    mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
  }
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function voxelNoise(x, y, z) {
  var value = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return value - Math.floor(value);
}

function addVoxelBlob(parent, radii, position, material, size, rotation, power, colorAt, surface) {
  var blob = new THREE.Group();
  blob.position.set(position[0], position[1], position[2]);
  if (rotation) {
    blob.rotation.set(rotation[0], rotation[1], rotation[2]);
  }
  parent.add(blob);
  var countX = Math.ceil(radii[0] / size);
  var countY = Math.ceil(radii[1] / size);
  var countZ = Math.ceil(radii[2] / size);
  var exponent = power || 3;
  function contains(x, y, z) {
    return Math.pow(Math.abs(x * size / radii[0]), exponent)
      + Math.pow(Math.abs(y * size / radii[1]), exponent)
      + Math.pow(Math.abs(z * size / radii[2]), exponent) <= 1;
  }
  for (var x = -countX; x <= countX; x += 1) {
    for (var y = -countY; y <= countY; y += 1) {
      for (var z = -countZ; z <= countZ; z += 1) {
        if (!contains(x, y, z)) {
          continue;
        }
        if (contains(x - 1, y, z) && contains(x + 1, y, z)
          && contains(x, y - 1, z) && contains(x, y + 1, z)
          && contains(x, y, z - 1) && contains(x, y, z + 1)) {
          continue;
        }
        var color = colorAt ? colorAt(x * size, y * size, z * size) : material;
        var shade = 0.97 + voxelNoise(x + position[0], y + position[1], z + position[2]) * 0.06;
        var scale = 1;
        if (surface) {
          var distance = Math.pow(Math.abs(x * size / radii[0]), exponent)
            + Math.pow(Math.abs(y * size / radii[1]), exponent)
            + Math.pow(Math.abs(z * size / radii[2]), exponent);
          scale += (Math.pow(distance, -1 / exponent) - 1) * surface;
        }
        var extent = size * (surface ? 1.3 : 1.08);
        var voxelRotation = surface ? [
          (voxelNoise(x, y, z) - 0.5) * 0.08,
          (voxelNoise(y, z, x) - 0.5) * 0.08,
          (voxelNoise(z, x, y) - 0.5) * 0.08
        ] : null;
        addVoxel(blob, [extent, extent, extent], [x * size * scale, y * size * scale, z * size * scale], color, voxelRotation, shade);
      }
    }
  }
  return blob;
}

function buildSofa(group, palette) {
  addBox(group, [6.12, 0.4, 5.18], [0, 0.24, 0], palette.wood);
  for (var x = -2.88; x <= 2.89; x += 0.32) {
    for (var z = -2.4; z <= 2.41; z += 0.32) {
      if (Math.abs(x) > 2.55 || Math.abs(z) > 2.07) {
        addVoxel(group, [0.35, 0.58, 0.35], [x, 0.3, z], palette.wood, null, 0.91 + voxelNoise(x, 0, z) * 0.1);
      }
    }
  }
  addVoxelBlob(group, [2.94, 0.34, 2.46], [0, 0.72, 0], palette.cream, 0.32, null, 5);
  addVoxelBlob(group, [2.94, 1.45, 0.42], [0, 1.9, -2.4], palette.wood, 0.32, null, 8);
  addVoxelBlob(group, [1.47, 1.14, 0.65], [1.37, 2.2, -1.92], palette.cream, 0.32, [-0.15, 0, -0.06], 2.8, null, 0.78);
  addVoxelBlob(group, [1.4, 1.1, 0.61], [-1.48, 2.11, -1.82], palette.cream, 0.32, [-0.17, 0.02, 0.1], 2.8, null, 0.78);
  addVoxelBlob(group, [0.46, 1.04, 0.36], [-1.91, 2.16, -1.39], palette.cream, 0.3, [-0.15, 0.04, 0.12], 2.6, null, 0.7);
  addVoxelBlob(group, [0.5, 0.61, 0.41], [-1.05, 1.72, -1.1], palette.cream, 0.3, [-0.14, 0.04, -0.1], 2.5, null, 0.7);
  var pillow = addVoxelBlob(group, [0.96, 1.4, 0.53], [-0.55, 2.64, -1.89], palette.pillowEdge, 0.28, [-0.14, 0, -0.15], 2.7, null, 0.78);
  for (var row = -6; row <= 6; row += 1) {
    for (var col = -3; col <= 3; col += 1) {
      var px = col * 0.14 + (row % 2 ? 0.025 : 0);
      var py = row * 0.18;
      var pz = 0.53 * Math.pow(Math.max(0, 1 - Math.pow(Math.abs(py / 1.4), 2.7) - Math.pow(Math.abs(px / 0.96), 2.7)), 1 / 2.7);
      var weaveMaterial = (row + col) % 3 ? palette.weave : palette.pillow;
      addVoxel(pillow, [0.16, 0.16, 0.13], [px, py, pz + 0.05], weaveMaterial, [0, 0, row % 2 ? -0.09 : 0.09], 0.93 + voxelNoise(col, row, 2) * 0.09);
    }
  }
  [-1, 1].forEach(function (side) {
    addVoxelBlob(group, [0.56, 0.68, 1.94], [side * 2.62, 1.24, -0.06], palette.cream, 0.32, null, 3, null, 0.78);
    addVoxelBlob(group, [0.78, 0.65, 1.05], [side * 2.3, 1.33, 0.71], palette.cream, 0.32, [0.02, side * 0.06, side * 0.11], 2.6, null, 0.78);
    addVoxelBlob(group, [0.78, 0.55, 0.77], [side * 2.18, 1.11, 1.83], palette.cream, 0.32, [0, 0, side * 0.08], 2.5, null, 0.76);
  });
  addVoxelBlob(group, [0.69, 0.67, 0.71], [2.41, 1.31, 1.7], palette.cream, 0.32, [0, -0.05, 0.12], 2.5, null, 0.78);
  addVoxelBlob(group, [2.78, 0.39, 0.51], [0, 0.73, 2.23], palette.cream, 0.32, null, 4);
  [-2.01, -0.68, 0.66, 2].forEach(function (x, index) {
    addVoxelBlob(group, [0.85, 0.48, 0.62], [x, 0.93 + (index % 2) * 0.04, 2.21], palette.cream, 0.32, [0, index % 2 ? -0.06 : 0.06, index % 2 ? -0.08 : 0.08], 2.6, null, 0.78);
  });
  addVoxelBlob(group, [0.95, 0.39, 0.75], [-1.46, 1.12, -0.59], palette.cream, 0.32, [0.08, 0, 0.12], 2.8, null, 0.75);
}

function addVoxelPattern(parent, rows, size, position, palette, depthAt, thickness) {
  var width = rows[0].length;
  rows.forEach(function (row, rowIndex) {
    for (var col = 0; col < row.length; col += 1) {
      var material = palette[row[col]];
      if (!material) {
        continue;
      }
      var x = (col - (width - 1) / 2) * size;
      var y = ((rows.length - 1) / 2 - rowIndex) * size;
      var z = depthAt ? depthAt(x, y) : 0;
      addVoxel(parent, [size * 1.06, size * 1.06, thickness || size * 1.06], [position[0] + x, position[1] + y, position[2] + z], material);
    }
  });
}

function buildCat(group, palette) {
  var cat = new THREE.Group();
  cat.name = "pet-cat";
  cat.position.set(0.92, 0, -0.78);
  group.add(cat);
  addVoxelBlob(cat, [0.68, 0.64, 0.62], [0, 1.32, -0.03], palette.brown, 0.16, null, 2.8, function (x, y, z) {
    if (z > 0.16 && Math.abs(x) < 0.48) {
      return palette.white;
    }
    return y > 0.21 || (x > 0.4 && z < -0.12) ? palette.darkBrown : palette.brown;
  });
  addVoxelBlob(cat, [0.44, 0.23, 0.63], [0.4, 1.22, 0.76], palette.brown, 0.15, [0, -0.32, 0], 2.6);
  [0.45, 0.73, 1.01].forEach(function (z) {
    addVoxelBlob(cat, [0.39, 0.09, 0.08], [0.44, 1.39, z], palette.darkBrown, 0.1, [0, -0.32, 0], 3);
  });
  addVoxelBlob(cat, [0.23, 0.23, 0.62], [-0.86, 1.51, 0.64], palette.white, 0.13, [-0.08, -0.55, -0.06], 3, null, 0.3);
  addVoxelBlob(cat, [0.23, 0.22, 0.6], [-0.2, 1.48, 0.64], palette.brown, 0.13, [-0.05, -0.72, 0], 3);
  addVoxelBlob(cat, [0.29, 0.15, 0.27], [-1.16, 1.437, 1.11], palette.white, 0.12, [0, -0.15, -0.05], 3, null, 0.3);
  addVoxelBlob(cat, [0.25, 0.15, 0.25], [-0.67, 1.437, 1.1], palette.white, 0.12, [0, -0.12, 0.04], 3, null, 0.3);
  addVoxelBlob(cat, [0.7, 0.16, 0.5], [0, 1.75, 0.1], palette.collar, 0.15, [0, 0.12, 0], 3);
  addVoxel(cat, [0.2, 0.22, 0.17], [-0.2, 1.64, 0.62], palette.collar);
  addVoxel(cat, [0.17, 0.16, 0.17], [0.16, 1.66, 0.61], palette.collarDark);
  var head = new THREE.Group();
  head.name = "pet-head";
  head.position.set(0, 2.55, -0.07);
  head.rotation.set(-0.03, 0.58, -0.035);
  cat.add(head);
  addVoxelBlob(head, [0.91, 0.72, 0.61], [0, 0, -0.06], palette.brown, 0.15, null, 2.8, function (x, y, z) {
    if (Math.abs(x) > 0.66 || y > 0.52) {
      return palette.darkBrown;
    }
    return y < -0.45 && z > 0.08 ? palette.white : palette.brown;
  });
  var faceRows = [
    "....DDTWTTDD....",
    "..DDTHTWHTTDD...",
    ".DDTHHTWWTHHTDD.",
    ".DTHDHTWWTHDHTD.",
    "DTHHHTWWWWTHHHTD",
    "DTHHHTWWWWTHHHTD",
    "DTHHHTWWWWTHHHTD",
    "DTHHHWWWWWWHHHTD",
    "DTHHWWWWWWWWHHTD",
    ".THWWWWWWWWWWHT.",
    ".TWWWWWWWWWWWWT.",
    "..WWWWWWWWWWWW..",
    "...WWWWWWWWWW..."
  ];
  var furPalette = { D: palette.darkBrown, T: palette.brown, H: palette.honey, W: palette.white };
  addVoxelPattern(head, faceRows, 0.115, [0, -0.02, 0.55], furPalette, function (x, y) {
    return -0.22 * Math.pow(Math.abs(x), 2) - 0.12 * Math.pow(Math.abs(y), 2);
  }, 0.22);
  [-1, 1].forEach(function (side) {
    var ear = new THREE.Group();
    ear.position.set(side * 0.67, 0.77, -0.06);
    ear.rotation.z = -side * 0.16;
    head.add(ear);
    var earRows = [
      "..DD..",
      ".DDDD.",
      ".DPPD.",
      "DPPPPD",
      "DPPPPD",
      "DDPPDD",
      ".DDDD."
    ];
    addVoxelPattern(ear, earRows, 0.125, [0, 0, 0], { D: palette.darkBrown, P: palette.brown }, null, 0.38);
    addVoxelPattern(ear, earRows, 0.125, [0, 0, 0.22], { P: palette.pink }, null, 0.075);
    var eyeX = side * 0.47;
    var eyeRows = [
      ".DDDDD.",
      "DOOOOPD",
      "DOOPPPD",
      "DOLPPPD",
      "DOLLLOD",
      ".DDDDD."
    ];
    addVoxelPattern(head, eyeRows, 0.09, [eyeX, -0.08, 0.65], { D: palette.darkBrown, O: palette.olive, L: palette.oliveLight, P: palette.black }, null, 0.11);
    addVoxel(head, [0.115, 0.115, 0.035], [eyeX + 0.055, 0.015, 0.728], palette.glint);
    addVoxelBlob(head, [0.32, 0.2, 0.19], [side * 0.25, -0.47, 0.65], palette.white, 0.115, null, 3, null, 0.3);
  });
  addVoxel(head, [0.21, 0.13, 0.11], [0, -0.38, 0.845], palette.nose);
  addVoxel(head, [0.095, 0.095, 0.075], [0, -0.47, 0.845], palette.nose);
  addVoxel(head, [0.035, 0.09, 0.035], [0, -0.54, 0.805], palette.mouth);
  addVoxel(head, [0.13, 0.035, 0.04], [0, -0.595, 0.765], palette.mouth);
  addVoxelBlob(group, [0.37, 0.39, 0.37], [-0.2, 1.46, -0.6], palette.yellow, 0.14, null, 2.2, function (x, y, z) {
    if (Math.abs(y + x * 0.3) < 0.07) {
      return palette.blue;
    }
    return Math.abs(y - x * 0.4 - 0.12) < 0.04 ? palette.red : palette.yellow;
  });
}

function buildLaptop(group, palette) {
  var laptop = new THREE.Group();
  laptop.name = "pet-laptop";
  laptop.position.set(-0.72, 1.11, 0.52);
  laptop.rotation.y = -0.035;
  group.add(laptop);
  addVoxel(laptop, [2.72, 0.14, 2.6], [0, 0, -0.05], palette.silver);
  addBox(laptop, [2.47, 0.014, 1.16], [0, 0.076, 0.04], palette.keyboardWell);
  for (var row = 0; row < 5; row += 1) {
    for (var col = 0; col < 11; col += 1) {
      addVoxel(laptop, [0.17, 0.035, 0.15], [-1.1 + col * 0.22, 0.097, -0.36 + row * 0.2], palette.keys);
    }
  }
  addVoxel(laptop, [0.93, 0.035, 0.13], [0, 0.097, -0.58], palette.keys);
  addVoxel(laptop, [0.76, 0.02, 0.35], [0, 0.081, -1.01], palette.trackpad);
  [-1, 1].forEach(function (side) {
    for (var port = 0; port < 3; port += 1) {
      addBox(laptop, [0.014, 0.06, 0.13], [side * 1.365, -0.01, -0.39 + port * 0.28], palette.port);
    }
  });
  var lid = new THREE.Group();
  lid.position.set(0, 0.03, 1.14);
  lid.rotation.x = 0.14;
  laptop.add(lid);
  addVoxel(lid, [2.74, 1.96, 0.105], [0, 0.98, 0], palette.silver);
  addBox(lid, [2.52, 1.72, 0.014], [0, 0.99, -0.062], palette.screen);
  [[-0.14, 0.14], [0.14, 0.14], [-0.14, -0.14], [0.14, -0.14]].forEach(function (point) {
    addBox(lid, [0.19, 0.19, 0.014], [point[0], 0.98 + point[1], 0.058], palette.logo);
  });
  addBox(lid, [0.045, 0.045, 0.014], [0, 1.84, -0.064], palette.port);
}

function createSceneObjects() {
  voxelGeometry = createVoxelGeometry();
  var palette = {
    cream: createMaterial("#f8e4c4"),
    wood: createMaterial("#b98047"),
    pillow: createMaterial("#e9b66b"),
    pillowEdge: createMaterial("#f4d49e"),
    weave: createMaterial("#dca14e"),
    white: createMaterial("#fff1d9"),
    brown: createMaterial("#765033"),
    darkBrown: createMaterial("#392417"),
    honey: createMaterial("#a47545"),
    pink: createMaterial("#efa6a0"),
    nose: createMaterial("#f29c8d"),
    mouth: createMaterial("#875044"),
    olive: createMaterial("#969447", { roughness: 0.55 }),
    oliveLight: createMaterial("#b9b567", { roughness: 0.55 }),
    black: createMaterial("#161411", { roughness: 0.4 }),
    glint: createMaterial("#fff9ee", { emissive: "#ffffff", emissiveIntensity: 0.1 }),
    collar: createMaterial("#849653"),
    collarDark: createMaterial("#687d40"),
    yellow: createMaterial("#ddad19"),
    blue: createMaterial("#39717b"),
    red: createMaterial("#b4604c"),
    silver: createMaterial("#c4bdcb", { roughness: 0.68, metalness: 0.08 }),
    keys: createMaterial("#e1d4d7", { roughness: 0.7 }),
    keyboardWell: createMaterial("#9f949b"),
    trackpad: createMaterial("#c9bec5"),
    port: createMaterial("#423938"),
    screen: createMaterial("#263335", { roughness: 0.4 }),
    logo: createMaterial("#eee0d5")
  };
  var group = new THREE.Group();
  Object.keys(palette).forEach(function (name) {
    palette[name].name = name;
  });
  scene.add(group);
  buildSofa(group, palette);
  buildCat(group, palette);
  buildLaptop(group, palette);
  voxelBatches.forEach(function (instances, material) {
    var mesh = new THREE.InstancedMesh(voxelGeometry, material, instances.length);
    var color = new THREE.Color();
    instances.forEach(function (instance, index) {
      mesh.setMatrixAt(index, instance.matrix);
      color.setRGB(instance.shade, instance.shade, instance.shade);
      mesh.setColorAt(index, color);
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.instanceColor.needsUpdate = true;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
    instancedMeshes.push(mesh);
  });
  voxelBatches.clear();
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
  if (controls) {
    controls.dispose();
  }

  instancedMeshes.forEach(function (mesh) {
    mesh.dispose();
  });
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
    camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(9.8, 10.4, 10.6);

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.className = "pet-3d-canvas";
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1.55, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.rotateSpeed = 0.7;
    controls.zoomSpeed = 0.8;
    controls.minDistance = 9.5;
    controls.maxDistance = 23;
    controls.minPolarAngle = 0.6;
    controls.maxPolarAngle = 1.45;
    controls.touches.ONE = THREE.TOUCH.ROTATE;
    controls.touches.TWO = THREE.TOUCH.DOLLY_ROTATE;
    controls.update();

    fillLight = new THREE.HemisphereLight(0xfff1dd, 0x80674e, 1.65);
    scene.add(fillLight);

    keyLight = new THREE.DirectionalLight(0xffdfb0, 4.2);
    keyLight.position.set(-3.8, 8, 4.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(2048, 2048);
    keyLight.shadow.normalBias = 0.025;
    keyLight.shadow.bias = -0.00015;
    keyLight.shadow.radius = 3;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 30;
    keyLight.shadow.camera.left = -7;
    keyLight.shadow.camera.right = 7;
    keyLight.shadow.camera.top = 7;
    keyLight.shadow.camera.bottom = -7;
    scene.add(keyLight);

    createSceneObjects();
    resizeRenderer();
    renderer.render(scene, camera);
    petRoot.classList.add("is-3d-ready");

    resizeObserver = new ResizeObserver(resizeRenderer);
    resizeObserver.observe(host);

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", disposePet3D, { once: true });
    startRendering();
  } catch (error) {
    console.warn("3D pet unavailable; using SVG fallback.", error);
    disposePet3D();
  }
}

initializePet3D();
