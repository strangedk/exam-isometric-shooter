import { Assets } from 'pixi.js';

const loadResources = async () => Assets.load('./assets/water.jpg');

export default loadResources;

// import { Assets } from 'pixi.js';
//
// async function loadResources() {
//   // await Assets.add('gem', './assets/gem.png');
//
//   return Assets.load('./assets/water.jpg');
// }
//
// export default loadResources;

