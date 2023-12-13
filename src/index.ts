// index.ts 和 src下的index.html 虽然没有直接关联，但最后都被打包进入到 dist下的 index.html中进行了关联
import './style/index.less'

import GameControl from './modules/GameControl';

const game = new GameControl();





