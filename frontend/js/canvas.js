//// CANVAS ////


const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


// Set canvas size to full screen.
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
canvas.width = canvasWidth;
canvas.height = canvasHeight;


//// WORLD ////


// Set world size.
const worldWidth = 2000;
const worldHeight = 2000;


//// PLAYER ////


// Player object with reduced speed
const player = {
    x: worldWidth / 2,
    y: worldHeight / 2,
    radius: 30,
    color: 'blue',
    speed: 0.1,
    dx: 0,
    dy: 0
};


let lastTimestamp = 0;
const baseSpeed = 400;


const keysPressed = {};


//// BUBBLES ////


// Array to store bubbles
const bubbles = [];
let isDraggingPlayer = false;


//// GRID ////


let gridAlpha = 0;
let gridDirection = 1; // 1 for fading in, -1 for fading out


//// WORLD ////


// Convert world coordinates to screen coordinates based on camera position
function worldToScreen(worldX, worldY) {
    return {
        x: worldX - (player.x - canvasWidth / 2),
        y: worldY - (player.y - canvasHeight / 2)
    };
}


//// PLAYER ////


// Draw the player bubble
function drawPlayer() {
    const { x, y } = worldToScreen(player.x, player.y);
    ctx.beginPath();
    ctx.arc(x, y, player.radius, 0, Math.PI * 2);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.closePath();
}


// Update player position based on velocity and delta time
function updatePlayer(deltaTime) {
    const distance = baseSpeed * deltaTime;
    player.x += player.dx * distance;
    player.y += player.dy * distance;

    // Keep the player within world boundaries
    player.x = Math.max(player.radius, Math.min(player.x, worldWidth - player.radius));
    player.y = Math.max(player.radius, Math.min(player.y, worldHeight - player.radius));
}


//// BUBBLES ////


// Function to draw a bubble
function drawBubble(bubble) {
    const { x, y } = worldToScreen(bubble.x, bubble.y);
    ctx.beginPath();
    ctx.arc(x, y, bubble.radius, 0, Math.PI * 2);
    ctx.fillStyle = bubble.color;
    ctx.fill();
    ctx.closePath();
}


// Create random bubbles with varying speeds
function createRandomBubbles(count) {
    for (let i = 0; i < count; i++) {
        bubbles.push({
            x: Math.random() * worldWidth,
            y: Math.random() * worldHeight,
            radius: Math.random() * 20 + 10,
            color: 'green',
            dx: (Math.random() - 0.5) * 1.5,
            dy: (Math.random() - 0.5) * 1.5
        });
    }
}


// Update bubble positions and remove them if they go out of bounds
function updateBubbles() {
    for (let i = bubbles.length - 1; i >= 0; i--) {
        const bubble = bubbles[i];
        bubble.x += bubble.dx;
        bubble.y += bubble.dy;

        // Remove bubbles that move out of the world boundaries
        if (bubble.x < 0 || bubble.x > worldWidth || bubble.y < 0 || bubble.y > worldHeight) {
            bubbles.splice(i, 1);
        }
    }
}


//// GRID ////


// Draw the map border
function drawBorder() {
    const topLeft = worldToScreen(0, 0);
    const bottomRight = worldToScreen(worldWidth, worldHeight);
    ctx.strokeStyle = '#FF0000';
    ctx.lineWidth = 3;
    ctx.strokeRect(topLeft.x, topLeft.y, bottomRight.x - topLeft.x, bottomRight.y - topLeft.y);
}


// Draw the pulsing grid lines
function drawGrid() {
    const gridSize = 100;
    const { x: offsetX, y: offsetY } = worldToScreen(0, 0);
    ctx.strokeStyle = `rgba(200, 200, 200, ${gridAlpha})`;
    ctx.lineWidth = 1;

    // Draw vertical grid lines
    for (let x = offsetX % gridSize; x < canvasWidth; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
        ctx.stroke();
    }

    // Draw horizontal grid lines
    for (let y = offsetY % gridSize; y < canvasHeight; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvasWidth, y);
        ctx.stroke();
    }

    // Update the grid alpha for pulsing effect
    gridAlpha += 0.02 * gridDirection;
    if (gridAlpha >= 1) gridDirection = -1;
    if (gridAlpha <= 0) gridDirection = 1;
}


//// MOVEMENT ////


// Check if a touch point is inside the player bubble
function isTouchOnPlayer(touchX, touchY) {
    const playerScreenPos = worldToScreen(player.x, player.y);
    const dx = touchX - playerScreenPos.x;
    const dy = touchY - playerScreenPos.y;
    return Math.sqrt(dx * dx + dy * dy) <= player.radius;
}


// Handle touch start to check if it's on the player
function handleTouchStart(event) {
    const touch = event.touches[0];
    const rect = canvas.getBoundingClientRect();
    const touchX = touch.clientX - rect.left;
    const touchY = touch.clientY - rect.top;

    if (isTouchOnPlayer(touchX, touchY)) {
        isDraggingPlayer = true;
    }
}


// Handle touch move to move the player only if dragging
function handleTouchMove(event) {
    if (!isDraggingPlayer) return;

    const touch = event.touches[0];
    const rect = canvas.getBoundingClientRect();
    const touchX = touch.clientX - rect.left;
    const touchY = touch.clientY - rect.top;

    player.x = touchX + (player.x - canvasWidth / 2);
    player.y = touchY + (player.y - canvasHeight / 2);
}


// Handle touch end to stop dragging
function handleTouchEnd() {
    isDraggingPlayer = false;
}


// Handle keyboard controls for desktop
function handleKeyDown(event) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        keysPressed[event.key] = true;
        updatePlayerDirection();
        event.preventDefault(); // Prevent default scrolling behavior
    }
}


function handleKeyUp(event) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        delete keysPressed[event.key];
        updatePlayerDirection();
        event.preventDefault(); // Prevent default scrolling behavior
    }
}


function updatePlayerDirection() {
    // Reset velocity
    player.dx = 0;
    player.dy = 0;

    if (keysPressed['ArrowUp']) player.dy = -1;
    if (keysPressed['ArrowDown']) player.dy = 1;
    if (keysPressed['ArrowLeft']) player.dx = -1;
    if (keysPressed['ArrowRight']) player.dx = 1;
}


//// GAME LOOP ////


// Main game loop with adjusted delta time calculation
function gameLoop(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;

    // Calculate deltaTime in seconds
    const deltaTime = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBorder();
    drawGrid();
    updatePlayer(deltaTime);
    updateBubbles();
    drawPlayer();

    for (const bubble of bubbles) {
        drawBubble(bubble);
    }

    requestAnimationFrame(gameLoop);
}


// Event listeners
function initControls() {
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
}


// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
});


// Initialize the game with timestamp
export function initGame() {
    createRandomBubbles(50);
    initControls();
    requestAnimationFrame(gameLoop);
}
