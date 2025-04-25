import * as PIXI from 'pixi.js';

export default class Stars {
    private stars: PIXI.Graphics[] = [];
    private app: PIXI.Application;
    private starSpeed: number = 2;
    private numStars: number = 100;

    constructor(app: PIXI.Application, numStars: number = 100, starSpeed: number = 2) {
        this.app = app;
        this.numStars = numStars;
        this.starSpeed = starSpeed;
        this.createStars();
    }

    private createStars() {
        for (let i = 0; i < this.numStars; i++) {
            const star = new PIXI.Graphics();
            star.beginFill(0xFFFFFF); // White stars
            star.drawCircle(0, 0, Math.random() * 1.5 + 0.5); // Random size
            star.endFill();
            
            star.x = Math.random() * this.app.screen.width;
            star.y = Math.random() * this.app.screen.height;
            star.alpha = Math.random() * 0.5 + 0.5; // Random transparency

            this.stars.push(star);
            this.app.stage.addChild(star);
        }
    }

    public update() {
        for (const star of this.stars) {
            star.y += this.starSpeed * star.alpha; // Move stars down, faster stars are brighter/closer

            // If star goes off screen, reset its position to the top
            if (star.y > this.app.screen.height + star.height) {
                star.y = -star.height;
                star.x = Math.random() * this.app.screen.width;
                star.alpha = Math.random() * 0.5 + 0.5; // Reset alpha for parallax effect
            }
        }
    }

    public sendToBack(frontObject: PIXI.DisplayObject) {
        // Ensure stars are behind the specified object
        this.app.stage.setChildIndex(frontObject, this.app.stage.children.length - 1);
    }
}
