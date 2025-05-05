import * as PIXI from 'pixi.js';

export default class Player {
    private app: PIXI.Application;
    private sprite: PIXI.Sprite;
    private mouth: PIXI.Graphics;
    private isTalking: boolean = true;
    private mouthOpenAmount: number = 0;
    private mouthSpeed: number = 0.1;
    private mouthDirection: number = 1;
    private animationTime: number = 0; // Thêm biến thời gian để tạo hiệu ứng chuyển động sin

    constructor(app: PIXI.Application) {
        this.app = app;
          // Tạo sprite từ ảnh player.png
        this.sprite = PIXI.Sprite.from('../assets/player.png');
        
        // Thiết lập kích thước cho nhân vật (100x100 pixels)
        this.sprite.width = 150;
        this.sprite.height = 150;
        
        // Thiết lập vị trí ban đầu cho nhân vật (ở giữa màn hình phía dưới)
        this.sprite.anchor.set(0.5);
        this.sprite.x = app.screen.width  - 80;
        this.sprite.y = app.screen.height - this.sprite.height;
        
        // Khởi tạo miệng cho nhân vật
        this.mouth = new PIXI.Graphics();
        
        // Thêm sprite và miệng vào stage
        app.stage.addChild(this.sprite);
        app.stage.addChild(this.mouth);
        
        // Vẽ miệng đóng ban đầu
        this.drawMouth(0);
        
        console.log('Player initialized');
    }
      // Phương thức để bắt đầu hoạt ảnh nói
    public startTalking(): void {
        this.isTalking = true;
        this.mouthDirection = 1;
        this.mouthOpenAmount = 0;
        console.log('Player starts talking');
    }
    
    // Phương thức để dừng hoạt ảnh nói
    public stopTalking(): void {
        this.isTalking = false;
        this.mouthOpenAmount = 0;
        this.drawMouth(0); // Đóng miệng khi dừng nói
        console.log('Player stops talking');
    }    
    
    // Phương thức để vẽ miệng với độ mở khác nhau và vị trí offset
    private drawMouth(openAmount: number, offsetX: number = 0, offsetY: number = 0): void {
        // Tính toán kích thước miệng dựa vào độ mở
        const mouthWidth = 20 + openAmount * 5; // Miệng rộng ra khi mở
        const mouthHeight = Math.max(2, 12 * openAmount); // Miệng cao tối thiểu 2px, tối đa 15px
        
        // Tính toán vị trí của miệng dựa trên vị trí của sprite và offset
        const mouthX = this.sprite.x + 15 + offsetX;
        const mouthY = this.sprite.y + 40 + offsetY; // Điều chỉnh vị trí miệng gần phần dưới của sprite
        
        // Xóa hình vẽ cũ
        this.mouth.clear();
        
        // Vẽ miệng mới với hiệu ứng màu sắc thay đổi theo độ mở
        const color = 0x990000 + Math.floor(openAmount * 100); // Màu đậm dần khi mở miệng
        this.mouth.lineStyle(2, 0x000000);
        this.mouth.beginFill(color);
        this.mouth.drawEllipse(0, 0, mouthWidth / 2, mouthHeight / 2);
        this.mouth.endFill();
        
        // Đặt vị trí cho miệng
        this.mouth.x = mouthX;
        this.mouth.y = mouthY;
    }    
    
    // Cập nhật trạng thái player trong mỗi frame
    public update(): void {
        if (this.isTalking) {
            // Tăng biến thời gian để tạo hiệu ứng sin
            this.animationTime += 0.1;
            
            // Cập nhật hiệu ứng mấp máy miệng
            this.mouthOpenAmount += this.mouthSpeed * this.mouthDirection;
            
            // Đổi hướng khi miệng mở hoặc đóng hoàn toàn
            if (this.mouthOpenAmount >= 1) {
                this.mouthDirection = -1;
            } else if (this.mouthOpenAmount <= 0) {
                this.mouthDirection = 1;
            }
            
            // Tạo hiệu ứng chuyển động sin/cos cho miệng
            const offsetX = 0; // Chuyển động ngang theo hàm sin
            const offsetY = 0; // Chuyển động dọc theo hàm cos với tần số khác
            
            // Thêm một chút nhiễu ngẫu nhiên
            const randomOffsetX = (Math.random() - 0.5) * 1; 
            const randomOffsetY = (Math.random() - 0.5) * 1;
            
            // Vẽ lại miệng với độ mở mới và vị trí mới
            this.drawMouth(this.mouthOpenAmount, offsetX + randomOffsetX, offsetY + randomOffsetY);
        } else {
            // Khi không nói, miệng đóng lại và ở vị trí bình thường
            this.drawMouth(0, 0, 0);
            // Reset biến thời gian khi không nói
            this.animationTime = 0;
        }
    }
}
