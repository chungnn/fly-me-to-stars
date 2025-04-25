# PixiJS Webpack Project

This project is a simple application built using PixiJS and Webpack that displays a square on the screen.

## Project Structure

```
pixi-webpack-project
├── src
│   ├── index.ts          # Entry point of the application
│   ├── Game.ts           # Manages game state and rendering
│   ├── assets
│   │   └── sprites       # Directory for sprite assets
│   └── components
│       └── Square.ts     # Creates and renders a square shape
├── public
│   └── index.html        # HTML template for the application
├── webpack.config.js     # Webpack configuration file
├── package.json          # npm configuration file
├── tsconfig.json         # TypeScript configuration file
└── README.md             # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd pixi-webpack-project
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Build the project:**
   ```
   npm run build
   ```

4. **Start the development server:**
   ```
   npm start
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000` to see the application in action.

## Usage

The application initializes a PixiJS instance and displays a square on the screen. You can modify the `Square.ts` component to change the appearance and behavior of the square.

## License

This project is licensed under the MIT License.