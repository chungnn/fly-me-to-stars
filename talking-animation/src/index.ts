import * as PIXI from 'pixi.js';
import { Game } from './Game';

const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x000000, // Change background to black
});

document.body.appendChild(app.view);

const game = new Game(app);
game.start();