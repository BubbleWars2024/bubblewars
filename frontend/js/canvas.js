const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const bubbles = [];
const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 30,
    color: 'blue',
    speed: 5
};

// Function to draw a bubble
function drawBubble(bubble) {
    ctx.beginPath();
    ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
    ctx.fillStyle = bubble.color;
    ctx.fill();
    ctx.closePath();
}

// Create a few random bubbles
function createRandomBubbles(count) {
    for (let i = 0; i < count; i++) {
        bubbles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 20 + 10,
            color: 'green',
            dx: (Math.random() - 0.5) * 4,
            dy: (Math.random() - 0.5) * 4
        });
    }
}

// Function to update bubble positions
function updateBubbles() {
    for (const bubble of bubbles) {
        bubble.x += bubble.dx;
        bubble.y += bubble.dy;

        // Bounce off walls
        if (bubble.x + bubble.radius > canvas.width || bubble.x - bubble.radius < 0) {
            bubble.dx *= -1;
        }
        if (bubble.y + bubble.radius > canvas.height || bubble.y - bubble.radius < 0) {
            bubble.dy *= -1;
        }
    }
}

// Function to move the player bubble
function movePlayer() {
    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowUp':
                player.y -= player.speed;
                break;
            case 'ArrowDown':
                player.y += player.speed;
                break;
            case 'ArrowLeft':
                player.x -= player.speed;
                break;
            case 'ArrowRight':
                player.x += player.speed;
                break;
        }
    });
}

// Function to draw the player bubble
function drawPlayer() {
    drawBubble(player);
}

// Main game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    updateBubbles();
    drawPlayer();
    
    for (const bubble of bubbles) {
        drawBubble(bubble);
    }

    requestAnimationFrame(gameLoop);
}


// Initialize the game.
export function initGame() {
    createRandomBubbles(10);
    movePlayer();
    gameLoop();
}
