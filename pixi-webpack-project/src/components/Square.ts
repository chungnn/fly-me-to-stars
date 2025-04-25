import * as PIXI from 'pixi.js';

export default class Square {
    private graphics: PIXI.Graphics;
    private fireGraphics: PIXI.Graphics[];
    private fireScale: number[];
    private fireDirection: number[];

    constructor() {
        this.graphics = new PIXI.Graphics();
        this.fireGraphics = [new PIXI.Graphics(), new PIXI.Graphics()];
        this.fireScale = [1, 0.7];
        this.fireDirection = [1, 1];
        this.drawSquare();
        this.setupFire();
    }

    private drawSquare(): void {
        // Draw main square (body)
        this.graphics.beginFill(0x66CCFF);
        this.graphics.drawRect(0, 0, 100, 100);
        this.graphics.endFill();
        
        // Draw eyes
        this.drawEyes();
        
        // Draw arms
        this.drawArms();
    }
    
    private drawEyes(): void {
        // Left eye - white part
        this.graphics.beginFill(0xFFFFFF);
        this.graphics.drawCircle(30, 35, 12);
        this.graphics.endFill();
        
        // Left eye - pupil
        this.graphics.beginFill(0x000000);
        this.graphics.drawCircle(33, 35, 6);
        this.graphics.endFill();
        
        // Left eye - highlight
        this.graphics.beginFill(0xFFFFFF);
        this.graphics.drawCircle(35, 32, 2);
        this.graphics.endFill();
        
        // Right eye - white part
        this.graphics.beginFill(0xFFFFFF);
        this.graphics.drawCircle(70, 35, 12);
        this.graphics.endFill();
        
        // Right eye - pupil
        this.graphics.beginFill(0x000000);
        this.graphics.drawCircle(73, 35, 6);
        this.graphics.endFill();
        
        // Right eye - highlight
        this.graphics.beginFill(0xFFFFFF);
        this.graphics.drawCircle(75, 32, 2);
        this.graphics.endFill();
        
        // Add a simple smile
        this.graphics.lineStyle(3, 0x000000);
        this.graphics.arc(50, 60, 20, 0.1 * Math.PI, 0.9 * Math.PI);
        this.graphics.lineStyle(0);
    }
    
    private drawArms(): void {
        // Left arm
        this.graphics.beginFill(0x66CCFF);
        this.graphics.drawRoundedRect(-20, 40, 25, 10, 5);
        this.graphics.endFill();
        
        // Right arm
        this.graphics.beginFill(0x66CCFF);
        this.graphics.drawRoundedRect(95, 40, 25, 10, 5);
        this.graphics.endFill();
    }

    private setupFire(): void {
        // Add fire graphics to main graphics container
        this.graphics.addChild(this.fireGraphics[0]);
        this.graphics.addChild(this.fireGraphics[1]);
        
        // Position fire effects directly under the square
        // Left fire
        this.drawFire(0, 25, 100);
        
        // Right fire
        this.drawFire(1, 75, 100);
    }
    
    private drawFire(index: number, x: number, y: number): void {
        const fire = this.fireGraphics[index];
        fire.clear();
        
        // Create dynamic fire effect
        const scale = this.fireScale[index];
        
        // Main fire (orange-yellow)
        fire.beginFill(0xFF9500);
        fire.moveTo(x, y);
        fire.lineTo(x - 7 * scale, y + 20 * scale);
        fire.lineTo(x + 7 * scale, y + 20 * scale);
        fire.lineTo(x, y);
        fire.endFill();
        
        // Inner fire (brighter yellow)
        fire.beginFill(0xFFFF00);
        fire.moveTo(x, y);
        fire.lineTo(x - 4 * scale, y + 12 * scale);
        fire.lineTo(x + 4 * scale, y + 12 * scale);
        fire.lineTo(x, y);
        fire.endFill();
    }
    
    public updateFire(): void {
        // Animate fire by changing its scale
        for (let i = 0; i < this.fireGraphics.length; i++) {
            // Oscillate fire size
            this.fireScale[i] += 0.05 * this.fireDirection[i];
            
            // Change direction when reaching limits
            if (this.fireScale[i] > 1.3) {
                this.fireDirection[i] = -1;
            } else if (this.fireScale[i] < 0.7) {
                this.fireDirection[i] = 1;
            }
            
            // Redraw fire with new scale - adjusted positions
            this.drawFire(i, i === 0 ? 25 : 75, 100);
        }
    }
    
    public setPosition(x: number, y: number): void {
        this.graphics.x = x;
        this.graphics.y = y;
    }

    public getGraphics(): PIXI.Graphics {
        return this.graphics;
    }
}