import * as PIXI from 'pixi.js';

export default class NumberRain {
    private app: PIXI.Application;
    private numbers: PIXI.Text[] = [];
    private speed: number = 2;
    private intervalId: NodeJS.Timeout | null = null; // Store interval ID

    constructor(app: PIXI.Application) {
        this.app = app;
        this.startGeneratingNumbers();
    }

    private startGeneratingNumbers() {
        // Clear existing interval if any
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        this.intervalId = setInterval(() => {
            this.createNumber();
        }, 1000); // Generate a new number every second
    }

    private createNumber() {
        const number = Math.floor(Math.random() * 10); // Random number between 0 and 9
        const numberText = new PIXI.Text(number.toString(), {
            fontSize: 36,
            fill: 0xffffff,
            align: 'center'
        });

        // Set initial position
        numberText.x = Math.random() * this.app.screen.width;
        numberText.y = 0;

        this.app.stage.addChild(numberText);
        this.numbers.push(numberText);
    }

    public update() {
        for (let i = this.numbers.length - 1; i >= 0; i--) {
            const numberText = this.numbers[i];
            numberText.y += this.speed; // Move the number down

            // Remove the number if it goes off-screen
            if (numberText.y > this.app.screen.height) {
                this.app.stage.removeChild(numberText);
                this.numbers.splice(i, 1);
            }
        }
    }

    // Method to get the current list of number objects
    public getNumbers(): PIXI.Text[] {
        return this.numbers;
    }

    // Method to remove a specific number
    public removeNumber(numberToRemove: PIXI.Text) {
        const index = this.numbers.indexOf(numberToRemove);
        if (index > -1) {
            this.app.stage.removeChild(numberToRemove);
            this.numbers.splice(index, 1);
            numberToRemove.destroy(); // Clean up resources
        }
    }

    // Optional: Method to stop generating numbers (e.g., on game over)
    public stopGeneratingNumbers() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}