import * as PIXI from 'pixi.js';
import Square from './components/Square';
import Stars from './components/Stars';
import NumberRain from './components/NumberRain';
import ScoreDisplay from './components/ScoreDisplay'; // Import ScoreDisplay

export class Game {
    private app: PIXI.Application;
    private square: Square;
    private keys: {[key: string]: boolean} = {};
    private speed: number = 5;
    private isDragging: boolean = false;
    private dragData: PIXI.InteractionData | null = null;
    private dragOffset: {x: number, y: number} = {x: 0, y: 0};
    private stars: Stars; // Changed from array to Stars object
    private numberRain: NumberRain; // Declare NumberRain instance
    private scoreDisplay: ScoreDisplay; // Declare ScoreDisplay instance
    private score: number = 0; // Add score property

    constructor(app: PIXI.Application) {
        this.app = app;
        this.square = new Square();
        this.stars = new Stars(app, 100, 2); // Create Stars instance
        this.numberRain = new NumberRain(app); // Initialize NumberRain
        this.scoreDisplay = new ScoreDisplay(app, this.score); // Initialize ScoreDisplay
        this.initialize();
        this.setupKeyboardListeners();
    }

    private initialize() {
        // Initialize game components and scenes here
        this.square.setPosition(
            this.app.screen.width / 2 - 50,  // Center horizontally
            this.app.screen.height / 2 - 50  // Center vertically
        );

        // Add the square to the stage
        this.app.stage.addChild(this.square.getGraphics());

        // NumberRain adds its elements directly to the stage, no need to add a container here.

        // Setup drag & drop functionality
        this.setupDragAndDrop();
        
        // Ensure square and score are on top
        this.app.stage.setChildIndex(this.square.getGraphics(), this.app.stage.children.length - 1);
        this.app.stage.setChildIndex(this.scoreDisplay.getTextObject(), this.app.stage.children.length - 1);
    }

    public start() {
        // Start the game loop
        this.app.ticker.add(() => {
            this.update();
        });
    }
    
    private update() {
        // Update game state here based on keyboard input
        this.updateSquarePosition();
        
        // Update fire animation
        this.square.updateFire();
        
        // Update stars
        this.stars.update();

        // Update number rain
        this.numberRain.update();

        // Check for collisions between square and numbers
        this.checkCollisions(); // Add this line

    }

    // --- Add the collision detection method ---
    private checkCollisions() {
        const squareBounds = this.square.getGraphics().getBounds();
        const numbers = this.numberRain.getNumbers(); // Get the array of numbers

        // Iterate backwards to safely remove elements while iterating
        for (let i = numbers.length - 1; i >= 0; i--) {
            const numberText = numbers[i];
            const numberBounds = numberText.getBounds();

            // Simple Axis-Aligned Bounding Box (AABB) collision check
            if (
                squareBounds.x < numberBounds.x + numberBounds.width &&
                squareBounds.x + squareBounds.width > numberBounds.x &&
                squareBounds.y < numberBounds.y + numberBounds.height &&
                squareBounds.y + squareBounds.height > numberBounds.y
            ) {
                // Collision detected! Remove the number.
                this.numberRain.removeNumber(numberText);
                this.score++; // Increment score
                this.scoreDisplay.updateScore(this.score); // Update score display
            }
        }
    }
    // --- End of added method ---
    
    private setupKeyboardListeners() {
        // Add keyboard event listeners
        window.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
        });
        
        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
    }
    
    private updateSquarePosition() {
        // Handle arrow keys to move the square
        if (this.keys['ArrowLeft']) {
            const newX = this.square.getGraphics().x - this.speed;
            if (newX >= 0) {
                this.square.setPosition(newX, this.square.getGraphics().y);
            }
        }
        
        if (this.keys['ArrowRight']) {
            const newX = this.square.getGraphics().x + this.speed;
            if (newX + 100 <= this.app.screen.width) {
                this.square.setPosition(newX, this.square.getGraphics().y);
            }
        }
        
        if (this.keys['ArrowUp']) {
            const newY = this.square.getGraphics().y - this.speed;
            if (newY >= 0) {
                this.square.setPosition(this.square.getGraphics().x, newY);
            }
        }
        
        if (this.keys['ArrowDown']) {
            const newY = this.square.getGraphics().y + this.speed;
            if (newY + 100 <= this.app.screen.height) {
                this.square.setPosition(this.square.getGraphics().x, newY);
            }
        }
    }
    
    private setupDragAndDrop() {
        const graphics = this.square.getGraphics();
        
        // Make the square interactive
        graphics.interactive = true;
        graphics.cursor = 'pointer';
        
        // Set up touch and mouse events
        graphics
            .on('pointerdown', this.onDragStart.bind(this))
            .on('pointerup', this.onDragEnd.bind(this))
            .on('pointerupoutside', this.onDragEnd.bind(this))
            .on('pointermove', this.onDragMove.bind(this));
    }
    
    private onDragStart(event: PIXI.InteractionEvent) {
        const graphics = this.square.getGraphics();
        this.isDragging = true;
        graphics.alpha = 0.8; // Make it slightly transparent while dragging
        this.dragData = event.data;
        const newPosition = this.dragData.getLocalPosition(graphics.parent);
        this.dragOffset = {
            x: graphics.x - newPosition.x,
            y: graphics.y - newPosition.y
        };
    }
    
    private onDragEnd() {
        const graphics = this.square.getGraphics();
        this.isDragging = false;
        graphics.alpha = 1.0; // Restore full opacity
        this.dragData = null;
    }
    
    private onDragMove(event: PIXI.InteractionEvent) {
        const graphics = this.square.getGraphics();
        if (this.isDragging && this.dragData) {
            const newPosition = this.dragData.getLocalPosition(graphics.parent);
            let newX = newPosition.x + this.dragOffset.x;
            let newY = newPosition.y + this.dragOffset.y;
            
            // Keep the square within bounds
            newX = Math.max(0, Math.min(newX, this.app.screen.width - 100));
            newY = Math.max(0, Math.min(newY, this.app.screen.height - 100));
            
            this.square.setPosition(newX, newY);
            
            // Keep the square within bounds
            newX = Math.max(0, Math.min(newX, this.app.screen.width - 100));
            newY = Math.max(0, Math.min(newY, this.app.screen.height - 100));
            
            this.square.setPosition(newX, newY);
        }
    }
}