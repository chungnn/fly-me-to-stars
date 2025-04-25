import * as PIXI from 'pixi.js';

export default class ScoreDisplay {
    private app: PIXI.Application;
    private scoreText: PIXI.Text;
    private score: number = 0;

    constructor(app: PIXI.Application, initialScore: number = 0) {
        this.app = app;
        this.score = initialScore;

        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0xffffff, // White color
            align: 'right',
        });

        this.scoreText = new PIXI.Text(`Score: ${this.score}`, style);
        this.scoreText.anchor.set(1, 0); // Anchor to top-right
        this.updatePosition(); // Set initial position

        this.app.stage.addChild(this.scoreText);

        // Listen for screen resize events to adjust position
        window.addEventListener('resize', this.updatePosition.bind(this));
    }

    private updatePosition() {
        // Position at the top-right corner with some padding
        this.scoreText.x = this.app.screen.width - 10;
        this.scoreText.y = 10;
    }

    public updateScore(newScore: number) {
        this.score = newScore;
        this.scoreText.text = `Score: ${this.score}`;
    }

    public getScore(): number {
        return this.score;
    }

    public getTextObject(): PIXI.Text {
        return this.scoreText;
    }

    // Clean up event listener when the component is no longer needed
    public destroy() {
         window.removeEventListener('resize', this.updatePosition.bind(this));
         if (this.scoreText) {
             this.app.stage.removeChild(this.scoreText);
             this.scoreText.destroy();
         }
    }
}
