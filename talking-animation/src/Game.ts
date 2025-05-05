import * as PIXI from 'pixi.js';
import Stars from './components/Stars';
import Player from './components/Player';

export class Game {
    private app: PIXI.Application;
    private stars!: Stars; // Dùng dấu '!' để báo với TypeScript rằng biến sẽ được khởi tạo
    private player!: Player; // Thêm Player

    constructor(app: PIXI.Application) {
        this.app = app;
        this.initialize();
    }

    private initialize() {
        // Khởi tạo stars với 100 ngôi sao và tốc độ 0.5
        this.stars = new Stars(this.app, 100, 0.5);
        
        // Khởi tạo player
        this.player = new Player(this.app);
        
        // Thêm xử lý sự kiện keyboard để tương tác với Player
        this.setupKeyboardInteraction();
        
        console.log('Game initialized with stars and player');
    }
    
    // Thiết lập tương tác bàn phím
    private setupKeyboardInteraction(): void {
        // Hàm xử lý sự kiện khi phím được nhấn
        const onKeyDown = (event: KeyboardEvent): void => {
            // Phím Space để kích hoạt/dừng hoạt ảnh nói
            if (event.code === 'Space') {
                if (this.player) {
                    // Kích hoạt nói từ 1-3 giây
                    this.player.startTalking();
                    
                    // Tự động dừng sau một khoảng thời gian ngẫu nhiên
                    setTimeout(() => {
                        this.player.stopTalking();
                    }, 1000 + Math.random() * 2000);
                }
            }
        };
        
        // Thêm event listener
        window.addEventListener('keydown', onKeyDown);
    }

    public start() {
        // Start the game loop
        this.app.ticker.add(() => {
            this.update();
        });
    }
    
    private update() {
        // Cập nhật các ngôi sao
        this.stars.update();
        
        // Cập nhật player
        this.player.update();
    }
}