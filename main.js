const loadGLTF = (url) => {
  return new Promise((resolve, reject) => {
    const loader = new THREE.GLTFLoader();
    loader.load(url, resolve, undefined, reject);
  });
};


const start = async () => {
  const mindarThree = new window.MINDAR.IMAGE.MindARThree({
    container: document.querySelector("#ar-container"),
    imageTargetSrc: "./assets/targets.mind",
  });

  const { renderer, scene, camera } = mindarThree;
  const anchor = mindarThree.addAnchor(0); // index of your target

  const gltfLoader = new THREE.GLTFLoader();
  // const model = await new Promise((resolve) =>

  //   gltfLoader.load("./assets/model.glb", resolve)
  // );

  const model = await loadGLTF("./assets/model.gltf");

  model.scene.scale.set(0.1, 0.1, 0.1);
  anchor.group.add(model.scene);

  await mindarThree.start();
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
};

start();
