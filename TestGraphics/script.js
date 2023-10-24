document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    
    // Initial position and velocity of the circle
    let x = 50; // Initial x-coordinate
    let y = 300; // Fixed y-coordinate
    let radius = 10; // Circle's radius
    let velocityX = 20;
    let velocityY = 21; // Horizontal velocity

    function drawCircle() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update the position
        x += velocityX;
        y += velocityY;

        // Check if the circle reaches the canvas boundary
        if (x + radius > canvas.width || x - radius < 0) {
            velocityX = -velocityX; // Reverse the direction
            
        }
        if (y + radius > canvas.height || y - radius < 0) {
            velocityY = -velocityY; // Reverse the direction,
            
        }

        // Draw the circle
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();

        // Request the next frame of animation
        requestAnimationFrame(drawCircle);
    }

    // Start the animation loop
    drawCircle();
});
