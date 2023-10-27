import {
    update as updateSnake,
    drawRainbowSnake,
    snake_speed,
    snakeIntersection,
    getSnakeHead,
    resetSnake,
    score,
    snake1Body,
    snake2Body,
    snakeOnSnake,
} from "./snake.js";

import { update as updateFood, draw as drawFood, resetFood } from "./food.js";

import { outsideGrid } from "./grid.js";

import { gameStart, resetDirection } from "./input.js";

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById("game-board");
const restartBoard = document.getElementById("restart-board");
const restartButton = document.getElementById("restart-button");
const startBoard = document.getElementById("start-board");
const winnerText = document.getElementById("winner");
let snake1Dead = false;
let snake2Dead = false;
let drawAgain = false;
let currentScore = 0;

function main(currentTime) {
    if (gameOver) {
        restartBoard.classList.remove("back");
        restartBoard.classList.add("front");

        if (snake1Dead && snake2Dead) {
            winnerText.innerHTML = "It's a tie!";
            if (drawAgain) {
                drawRainbowSnake(gameBoard, 1);
            }
        } else if (snake1Dead) {
            winnerText.innerHTML = "Player 2 wins!";
            if (drawAgain) {
                drawRainbowSnake(gameBoard, 2);
            }
        } else if (snake2Dead) {
            winnerText.innerHTML = "Player 1 wins!";
            if (drawAgain) {
                drawRainbowSnake(gameBoard, 1);
            }
        }
        return;
    }

    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / snake_speed) return;
    lastRenderTime = currentTime;

    if (gameStart) {
        draw();
        update();
        startBoard.classList.remove("front");
        startBoard.classList.add("back");
        currentScore = score();
    }
}

window.requestAnimationFrame(main);

restartButton.onclick = function restartGame() {
    resetSnake();
    resetFood();
    resetDirection();
    snake1Dead = false;
    snake2Dead = false;
    drawAgain = false;
    restartBoard.classList.remove("front");
    restartBoard.classList.add("back");
    startBoard.classList.remove("back");
    restartBoard.classList.add("front");
    gameOver = false;
    window.requestAnimationFrame(main);
};

function update() {
    updateSnake();
    updateFood();
    checkDeath();
    checkScore();
    document.getElementById("scores").innerHTML = score();
}

function draw() {
    gameBoard.innerHTML = "";
    drawRainbowSnake(gameBoard, 1);
    drawFood(gameBoard);
}

function checkDeath() {
    if (
        outsideGrid(getSnakeHead(snake1Body)) ||
        snakeIntersection(snake1Body)
    ) {
        gameOver = true;
        snake1Dead = true;
    }
    if (
        outsideGrid(getSnakeHead(snake2Body)) ||
        snakeIntersection(snake2Body)
    ) {
        gameOver = true;
        snake2Dead = true;
    }
    if (snakeOnSnake(snake2Body, snake1Body)) {
        gameOver = true;
        snake2Dead = true;
        drawAgain = true;
    }
    if (snakeOnSnake(snake1Body, snake2Body)) {
        gameOver = true;
        snake1Dead = true;
        drawAgain = true;
    }
}

function checkScore() {
    if (currentScore[0] >= 10) {
        gameOver = true;
        snake2Dead = true;
        drawAgain = true;
    }
    if (currentScore[1] >= 10) {
        gameOver = true;
        snake1Dead = true;
        drawAgain = true;
    }
}
