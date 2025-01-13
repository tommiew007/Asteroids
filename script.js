// Preload audio files
const sounds = {
    gameStart: new Audio('game-start.mp3'),
    gameBonus: new Audio('game-bonus.mp3'),
    gameOver: new Audio('game-over.mp3'),
    asteroidHit: new Audio('asteroid-hit.mp3'),
    shipFly: new Audio('game-ship-fly.mp3'),
    laserFire: new Audio('game-laser.mp3'),
    gameMusic: new Audio('game-music.mp3'),
    ufoBossFast: new Audio('ufo-boss-fast.mp3'),
    ufoBossSlow: new Audio('ufo-boss-slow.mp3'),
    bossLaser: new Audio('game-laser.mp3')
};

// Set looping for boss sounds
sounds.ufoBossFast.loop = true;
sounds.ufoBossSlow.loop = true;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
// Asteroid sizes and speeds
const asteroidSizes = [100, 60, 30, 15]; // New sizes: Larger for size 1, others scaled down
const asteroidSpeed = 1.5; // Base speed for asteroids
const images = {
    bossFast: new Image(),
    bossSlow: new Image()
};

images.bossFast.src = 'boss-fast.png';
images.bossSlow.src = 'boss-slow.png';
images.bossFast.onload = () => {
    console.log('Fast boss image loaded successfully');
};
images.bossFast.onerror = () => {
    console.error('Error loading fast boss image');
};

// Array to store asteroids
let asteroids = [];
let scatterExplosions = []; // For scatter explosions
let shipExplosion = [];     // For ship line explosion
let asteroidExplosion = []; // For asteroid line explosion

// Generate a random asteroid
// Generate a random angular asteroid shape

// Generate asteroid shape with jagged edges
let gameState = "waiting"; // Initial game state
let lasers = []; // Active laser blasts
let cooldown = false; // Cooldown flag
let maxBlasts = 5; // Maximum simultaneous laser blasts
let score = 0; // Player's score
const laserSpeed = 5; // Speed of laser blasts
const cooldownTime = 1000; // Cooldown time in milliseconds

let bossShips = []; // Array to hold active boss ships

function createBossShip(size) {
    const isSmall = size === 'small';
    return {
        x: Math.random() > 0.5 ? -50 : canvas.width + 50, // Start offscreen
        y: Math.random() * canvas.height, // Random vertical position
        dx: isSmall ? 2 : 1, // Speed: small is faster
        dy: 0, // No vertical movement
        size: size, // 'small' or 'large'
        radius: isSmall ? 20 : 40, // Collision radius
        sound: isSmall ? 'ufoBossFast' : 'ufoBossSlow', // Corresponding sound
        fireRate: isSmall ? 5000 : 3000, // Fire rate (ms)
        lastFireTime: 0 // Timestamp of the last fire
    };
}

function spawnBossShip(type) {
  console.log(`Spawn boss of type: ${type}`);
  let boss;
  if (type === "slow") {
    boss = {
      x: -50,
      y: Math.random() * (canvas.height / 2),
      dx: 1,
      size: "large",
      radius: 40,
      sound: "ufoBossSlow",
      fireRate: 3000,
      lastFireTime: Date.now(),
    };
  } else {
    // fast
    boss = {
      x: canvas.width + 50,             // right side
      y: Math.random() * (canvas.height / 2),
      dx: -2,                           // move left
      size: "small",
      radius: 20,
      sound: "ufoBossFast",
      fireRate: 1500,
      lastFireTime: Date.now(),
    };
  }
  bossShips.push(boss);
  console.log("Boss added:", boss);
  playSoundWithDebounce(boss.sound, 1000);
}

function destroyBossShip(index) {
    const boss = bossShips[index];
    playSound('asteroidHit');
    scatterExplosions.push(createScatterExplosion(boss.x, boss.y));
    stopBossSound(boss);
    bossShips.splice(index, 1);
}

function fireBossLaser(boss) {
    playSound('bossLaser');
    lasers.push({
        x: boss.x,
        y: boss.y,
        dx: (ship.x - boss.x) * 0.01, // Aim at player
        dy: (ship.y - boss.y) * 0.01, // Aim at player
        bossLaser: true // Mark as a boss laser
    });
}

let soundTimeouts = {};

function playSoundWithDebounce(soundKey, delay = 200) {
    if (soundTimeouts[soundKey]) {
        return; // Prevent repeated triggers during debounce
    }

    const sound = sounds[soundKey];
    if (sound) {
        // Stop any currently playing sound and reset to start
        if (!sound.paused) {
            sound.pause();
            sound.currentTime = 0;
        }
        sound.play().catch((error) => {
            console.error(`Error playing sound ${soundKey}:`, error);
        });
    }

    // Set a debounce timer
    soundTimeouts[soundKey] = setTimeout(() => {
        clearTimeout(soundTimeouts[soundKey]);
        soundTimeouts[soundKey] = null;
    }, delay);
}

function drawBossShips() {
    console.log('Drawing boss ships:', bossShips); // Debug log

    for (const boss of bossShips) {
        ctx.save();
        ctx.translate(boss.x, boss.y);

        // Choose image based on boss type
        const image = boss.size === 'small' ? images.bossFast : images.bossSlow;

        // Debug image selection
        console.log(`Drawing ${boss.size === 'small' ? 'fast' : 'slow'} boss`, boss);

        ctx.drawImage(
            image,
            -boss.radius, // Center horizontally
            -boss.radius, // Center vertically
            boss.radius * 2, // Width
            boss.radius * 2  // Height
        );

        ctx.restore();
    }
}
function startMusic() {
    if (sounds.gameMusic.paused) {
        sounds.gameMusic.play().catch((error) => {
            console.error("Error starting game music:", error);
        });
    }
}

function stopMusic() {
    if (!sounds.gameMusic.paused) {
        sounds.gameMusic.pause();
        sounds.gameMusic.currentTime = 0; // Reset to start
    }
}

// Periodically spawn boss ships
setInterval(spawnBossShip, 10000); // Try spawning a boss every 10 seconds

function playSound(soundKey) {
    const sound = sounds[soundKey];
    if (sound && sound.paused) {
        sound.currentTime = 0; // Reset to the start
        sound.play().catch((error) => {
            console.error(`Error playing sound ${soundKey}:`, error);
        });
    }
}
function playBossSound(boss) {
    const sound = sounds[boss.sound];
    if (sound && sound.paused) {
        sound.play().catch((error) => {
            console.error(`Error playing boss sound:`, error);
        });
    }
}

function stopBossSound(boss) {
    const sound = sounds[boss.sound];
    if (sound && !sound.paused) {
        sound.pause();
        sound.currentTime = 0;
    }
}

function stopSound(soundKey) {
    const sound = sounds[soundKey];
    if (sound && !sound.paused) {
        sound.pause();
        sound.currentTime = 0; // Reset to the start
    }
}
function createScatterExplosion(x, y) {
    const particles = [];
    for (let i = 0; i < 20; i++) { // Create 20 small particles
        const angle = Math.random() * Math.PI * 2; // Random direction
        const speed = Math.random() * 3 + 1; // Random speed
        particles.push({
            x: x,
            y: y,
            dx: Math.cos(angle) * speed,
            dy: Math.sin(angle) * speed,
            life: Math.random() * 50 + 50, // Random lifespan
            color: `hsl(${Math.random() * 360}, 100%, 50%)` // Vibrant color
        });
    }
    return particles;
}

function createExplosion(x, y) {
    const particles = [];
    for (let i = 0; i < 20; i++) { // Create 20 particles
        const angle = Math.random() * Math.PI * 2; // Random direction
        const speed = Math.random() * 2 + 1; // Random speed
        particles.push({
            x: x,
            y: y,
            dx: Math.cos(angle) * speed,
            dy: Math.sin(angle) * speed,
            life: Math.random() * 50 + 50 // Random lifespan
        });
    }
    return particles;
}

let explosions = []; // Store active explosions

function createLineExplosion(x, y) {
    const lines = [];
    for (let i = 0; i < 20; i++) { // Create 20 lines
        const angle = Math.random() * Math.PI * 2; // Random direction
        const speed = Math.random() * 3 + 2; // Random speed
        lines.push({
            x: x,
            y: y,
            dx: Math.cos(angle) * speed,
            dy: Math.sin(angle) * speed,
            life: Math.random() * 50 + 50 // Random lifespan
        });
    }
    return lines;
}
function createLineExplosionFromShape(x, y, points) {
    const lines = [];
    for (let i = 0; i < points.length; i++) {
        const start = points[i];
        const end = points[(i + 1) % points.length]; // Wrap around to first point
        const angle = Math.atan2(end.y - start.y, end.x - start.x);
        const speed = Math.random() * 3 + 2; // Random speed

        lines.push({
            x: x + start.x, // Offset by asteroid/ship position
            y: y + start.y,
            dx: Math.cos(angle) * speed,
            dy: Math.sin(angle) * speed,
            life: Math.random() * 80 + 60, // Lifespan for smooth outward movement
            color: `hsl(${Math.random() * 360}, 100%, 50%)` // Random vibrant color
        });
    }
    return lines;
}



function updateExplosions() {
    const updateParticles = particles => {
        for (let i = particles.length - 1; i >= 0; i--) {
            const particle = particles[i];
            particle.x += particle.dx;
            particle.y += particle.dy;
            particle.life--;
            if (particle.life <= 0) {
                particles.splice(i, 1); // Remove expired particles
            }
        }
    };

    const updateLines = lines => {
        for (let i = lines.length - 1; i >= 0; i--) {
            const line = lines[i];
            line.x += line.dx;
            line.y += line.dy;
            line.life--;
            if (line.life <= 0) {
                lines.splice(i, 1); // Remove expired lines
            }
        }
    };

    // Update scatter explosions and line explosions
    scatterExplosions.forEach(updateParticles);
    updateLines(shipExplosion);
    updateLines(asteroidExplosion);
}
function pauseAllSounds() {
    Object.keys(sounds).forEach((key) => {
        const sound = sounds[key];
        if (sound && !sound.paused) {
            sound.pause();
            sound.currentTime = 0; // Reset to the beginning
        }
    });
}

function resumeGameSounds() {
    if (gameState === "playing") {
        sounds.gameMusic.play().catch((error) => {
            console.error("Error resuming game music:", error);
        });

        bossShips.forEach((boss) => {
            playSoundWithDebounce(boss.sound, 1000);
        });
    }
}

function updateBossShips() {
    const now = Date.now();

    for (let i = bossShips.length - 1; i >= 0; i--) {
        const boss = bossShips[i];

        // Move boss
        boss.x += boss.dx;
        if (boss.x < -50 || boss.x > canvas.width + 50) {
            stopBossSound(boss); // Stop sound when offscreen
            bossShips.splice(i, 1);
            continue;
        }

        // Boss fires at player
        if (now - boss.lastFireTime > boss.fireRate) {
            boss.lastFireTime = now;
            fireBossLaser(boss);
        }

        // Ensure boss sound is playing
        playBossSound(boss);
    }
}

function drawExplosions() {
    scatterExplosions.forEach(particles => {
        particles.forEach(particle => {
            if (particle.life > 0) {
                ctx.fillStyle = particle.color;
                ctx.fillRect(particle.x, particle.y, 2, 2); // Draw small particle
            }
        });
    });

    shipExplosion.forEach(line => {
        if (line.life > 0) {
            ctx.beginPath();
            ctx.moveTo(line.x, line.y);
            ctx.lineTo(line.x + line.dx * 5, line.y + line.dy * 5);
            ctx.strokeStyle = line.color;
            ctx.stroke();
        }
    });

    asteroidExplosion.forEach(line => {
        if (line.life > 0) {
            ctx.beginPath();
            ctx.moveTo(line.x, line.y);
            ctx.lineTo(line.x + line.dx * 5, line.y + line.dy * 5);
            ctx.strokeStyle = line.color;
            ctx.stroke();
        }
    });
}


function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.textAlign = "left";
    ctx.fillText(`Score: ${score}`, 10, 30); // Display score in the top-left corner
}
function drawTom() {
    ctx.fillStyle = "gray";
    ctx.font = "20px Arial";
    ctx.textAlign = "left"; // Align text to the left for the bottom-left corner
    ctx.textBaseline = "bottom"; // Align text to the bottom
    ctx.fillText("Tom Wellborn, 2025", 10, canvas.height - 10); // 10px padding from the bottom-left
}

function drawLasers() {
    for (let laser of lasers) {
        ctx.beginPath();
        ctx.arc(laser.x, laser.y, 3, 0, Math.PI * 2); // Small circle for laser
        ctx.fillStyle = "white";
        ctx.fill();
    }
}

function updateLasers()  {
    for (let i = lasers.length - 1; i >= 0; i--) {
        const laser = lasers[i];

        // Move laser
        laser.x += laser.dx;
        laser.y += laser.dy;

        // Remove lasers that leave the screen
        if (
            laser.x < 0 || laser.x > canvas.width ||
            laser.y < 0 || laser.y > canvas.height
        ) {
            lasers.splice(i, 1);
        }
    }
}


function fireLaser() {
    const angle = ship.angle - Math.PI / 2; // Adjust angle for laser direction
    playSound('laserFire'); // Play laser fire sound
    lasers.push({
        x: ship.x,
        y: ship.y,
        dx: Math.cos(angle) * laserSpeed, // X velocity
        dy: Math.sin(angle) * laserSpeed, // Y velocity
    });

    // Check if the maxBlasts is reached
    if (lasers.length >= maxBlasts) {
        cooldown = true;
        setTimeout(() => {
            cooldown = false;
        }, cooldownTime); // Cooldown period
    }
}

function showWaitingScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Press any key to start", canvas.width / 2, canvas.height / 2);
}

function generateAsteroidShape(radius) {
    const numPoints = 8; // Number of points (octagonal)
    const shape = [];
    for (let i = 0; i < numPoints; i++) {
        const angle = (Math.PI * 2 * i) / numPoints; // Angle for each point
        const distance = radius + Math.random() * (radius * 0.4) - (radius * 0.2); // Slight randomization
        shape.push({
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance
        });
    }
    return shape;
}

function splitAsteroid(asteroid) {
    if (asteroid.size < 4) { // Only split if not the smallest size
        const newSize = asteroid.size + 1;
        const newAsteroids = [];
        for (let i = 0; i < 2; i++) { // Create two smaller asteroids
            newAsteroids.push(createAsteroid(newSize));
        }
        asteroids.push(...newAsteroids); // Add new asteroids to the game
    }
    const index = asteroids.indexOf(asteroid);
    if (index > -1) asteroids.splice(index, 1); // Remove the original asteroid
}

function checkLaserAsteroidCollision() {
    for (let i = lasers.length - 1; i >= 0; i--) {
        const laser = lasers[i];
        for (let j = asteroids.length - 1; j >= 0; j--) {
            const asteroid = asteroids[j];

            // Check for collision
            const distX = laser.x - asteroid.x;
            const distY = laser.y - asteroid.y;
            const distance = Math.sqrt(distX * distX + distY * distY);

            if (distance < asteroid.radius) {
                // Laser hits the asteroid
                handleAsteroidHit(asteroid, laser);
                lasers.splice(i, 1); // Remove the laser
                break; // Exit inner loop
            }
        }
    }
}
function handleAsteroidHit(asteroid, laser) {
    const index = asteroids.indexOf(asteroid);
    if (index > -1) asteroids.splice(index, 1); // Remove the impacted asteroid
    playSound('asteroidHit'); // Play asteroid explosion sound

    // Award points based on asteroid size
    if (asteroid.size === 1) score += 10;
    else if (asteroid.size === 2) score += 30;
    else if (asteroid.size === 3) score += 50;
    else if (asteroid.size === 4) score += 75;

    if (asteroid.size === 1) {
        // Size 1 asteroid splits into two size 2 asteroids
        const newAsteroids = [];
		//scatterExplosions.push(createScatterExplosion(asteroid.x, asteroid.y));
        for (let i = 0; i < 2; i++) {
            const angleOffset = Math.PI / 4 * (i === 0 ? -1 : 1); // Two directions
            const angle = Math.atan2(laser.dy, laser.dx) + angleOffset;
            const speed = asteroidSpeed + Math.random(); // Slight speed variation
            const size = 2;

            newAsteroids.push({
                x: asteroid.x,
                y: asteroid.y,
                dx: Math.cos(angle) * speed,
                dy: Math.sin(angle) * speed,
                size: size,
                radius: asteroidSizes[size - 1] / 2, // Radius for size 2
                points: generateAsteroidShape(asteroidSizes[size - 1] / 2),
                rotation: Math.random() * 0.02 - 0.01,
                angle: 0,
                color: asteroid.color // Use the parent's color
            });
        }
        asteroids.push(...newAsteroids);
    } else if (asteroid.size === 2) {
        // Size 2 asteroid splits into two size 3 asteroids
        const newAsteroids = [];
		//scatterExplosions.push(createScatterExplosion(asteroid.x, asteroid.y));
        for (let i = 0; i < 2; i++) {
            const angleOffset = Math.PI / 4 * (i === 0 ? -1 : 1); // Two directions
            const angle = Math.atan2(laser.dy, laser.dx) + angleOffset;
            const speed = asteroidSpeed + Math.random(); // Slight speed variation
            const size = 3;

            newAsteroids.push({
                x: asteroid.x,
                y: asteroid.y,
                dx: Math.cos(angle) * speed,
                dy: Math.sin(angle) * speed,
                size: size,
                radius: asteroidSizes[size - 1] / 2, // Radius for size 3
                points: generateAsteroidShape(asteroidSizes[size - 1] / 2),
                rotation: Math.random() * 0.02 - 0.01,
                angle: 0,
                color: asteroid.color // Use the parent's color
            });
        }
        asteroids.push(...newAsteroids);
    } else if (asteroid.size === 3) {
        // Size 3 asteroid splits into two size 4 asteroids
		//scatterExplosions.push(createScatterExplosion(asteroid.x, asteroid.y));
        const newAsteroids = [];
        for (let i = 0; i < 2; i++) {
            const angleOffset = Math.PI / 4 * (i === 0 ? -1 : 1); // Two directions
            const angle = Math.atan2(laser.dy, laser.dx) + angleOffset;
            const speed = asteroidSpeed + Math.random(); // Slight speed variation
            const size = 4;

            newAsteroids.push({
                x: asteroid.x,
                y: asteroid.y,
                dx: Math.cos(angle) * speed,
                dy: Math.sin(angle) * speed,
                size: size,
                radius: asteroidSizes[size - 1] / 2, // Radius for size 4
                points: generateAsteroidShape(asteroidSizes[size - 1] / 2),
                rotation: Math.random() * 0.02 - 0.01,
                angle: 0,
                color: asteroid.color // Use the parent's color
            });
        }
        asteroids.push(...newAsteroids);
    } else if (asteroid.size === 4) {
        // Size 4 asteroid explodes into pixels
		scatterExplosions.push(createScatterExplosion(asteroid.x, asteroid.y));
//        explosions.push(createExplosion(asteroid.x, asteroid.y));
    }
}

function createAsteroid(size = 1) {
    const angle = Math.random() * Math.PI * 2; // Random direction
    const speed = asteroidSpeed + Math.random(); // Slight speed variation
    const radius = asteroidSizes[size - 1] / 2; // Radius based on size

    // Generate random off-screen position
    const startPosition = generateOffscreenPosition(radius);

    // Generate the angular shape of the asteroid
    const points = generateAsteroidShape(radius);

    // Generate a random color within the range for dark reds and browns
    const red = Math.floor(Math.random() * 56) + 100; // Red: 100-155 (medium to dark red)
    const green = Math.floor(Math.random() * 50) + 50; // Green: 50-100 (to mix into browns)
    const blue = Math.floor(Math.random() * 30);      // Blue: 0-30 (minimal blue for earthy tones)
    const color = `rgb(${red}, ${green}, ${blue})`;

    return {
        x: startPosition.x,
        y: startPosition.y,
        dx: Math.cos(angle) * speed, // X velocity
        dy: Math.sin(angle) * speed, // Y velocity
        size: size, // Current size (1 is largest)
        radius: radius, // For collision detection
        points: points, // Angular shape points
        rotation: Math.random() * 0.02 - 0.01, // Random slow rotation
        angle: 0, // Initial rotation angle
        color: color // Assign random asteroid color
    };
}

// Generate a random offscreen position
function generateOffscreenPosition(radius) {
    const side = Math.floor(Math.random() * 4); // Choose a random side: 0=top, 1=right, 2=bottom, 3=left
    let x, y;

    switch (side) {
        case 0: // Top
            x = Math.random() * canvas.width;
            y = -radius;
            break;
        case 1: // Right
            x = canvas.width + radius;
            y = Math.random() * canvas.height;
            break;
        case 2: // Bottom
            x = Math.random() * canvas.width;
            y = canvas.height + radius;
            break;
        case 3: // Left
            x = -radius;
            y = Math.random() * canvas.height;
            break;
    }

    return { x, y };
}

// Update asteroid positions
// Update asteroid positions and handle rotation
function updateAsteroids() {
    if (gameState !== "playing") return; // Only update during playing state

    for (let i = 0; i < asteroids.length; i++) {
        const asteroid = asteroids[i];

        // Move asteroid
        asteroid.x += asteroid.dx;
        asteroid.y += asteroid.dy;

        // Rotate asteroid
        asteroid.angle += asteroid.rotation;

        // Wrap around screen edges
        if (asteroid.x < -asteroid.radius) asteroid.x = canvas.width + asteroid.radius;
        if (asteroid.x > canvas.width + asteroid.radius) asteroid.x = -asteroid.radius;
        if (asteroid.y < -asteroid.radius) asteroid.y = canvas.height + asteroid.radius;
        if (asteroid.y > canvas.height + asteroid.radius) asteroid.y = -asteroid.radius;

        // Check for collision with ship
        if (checkCollision(ship, asteroid)) {
            endGame(asteroid); // End the game if collision occurs
            return; // Stop further updates
        }
    }
}

// Draw jagged asteroids
function drawAsteroids() {
    for (let asteroid of asteroids) {
        if (!asteroid.points || asteroid.points.length === 0) {
            console.error("Asteroid points are undefined or empty:", asteroid);
            continue; // Skip drawing this asteroid
        }

        ctx.save();
        ctx.translate(asteroid.x, asteroid.y);
        ctx.rotate(asteroid.angle);
        ctx.beginPath();

        // Draw asteroid using its points
        const points = asteroid.points;
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.closePath();

        // Use asteroid color for the fill
        ctx.fillStyle = asteroid.color;
        ctx.fill();

//        ctx.strokeStyle = 'white'; // Outline color
//			ctx.stroke();
        ctx.restore();
    }
}


// Check collision between ship and asteroid
function checkCollision(ship, asteroid) {
    const distX = ship.x - asteroid.x;
    const distY = ship.y - asteroid.y;
    const distance = Math.sqrt(distX * distX + distY * distY);

    return distance < asteroid.radius + 15; // Ship radius is ~15
}

// End the game
function endGame(asteroid) {
    if (asteroid) {
        // Create explosion effects for the ship and asteroid
        shipExplosion = createLineExplosion(ship.x, ship.y);
        asteroidExplosion = createLineExplosion(asteroid.x, asteroid.y);
    }

    gameState = "exploding"; // Set game state to exploding

    // Transition to waiting screen after the explosion finishes
    setTimeout(() => {
        gameState = "waiting";
        asteroids = [];
        ship = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            angle: 0,
            velocityX: 0,
            velocityY: 0,
            thrust: 0.05,
            friction: 0.99
        }; // Reset the ship
        shipExplosion = [];
        asteroidExplosion = [];
    }, 2000); // Explosion lasts for 2 seconds
}

// Resize the canvas to fit the entire viewport
function resizeCanvas() {
    canvas.width = window.innerWidth;  // Full width of the browser window
    canvas.height = window.innerHeight; // Full height of the browser window
}
window.addEventListener('resize', resizeCanvas);


resizeCanvas(); // Call on initial load

let keys = {
    left: false,
    right: false,
    up: false
};

// Define the ship object
let ship = {
    x: canvas.width / 2,    // Initial horizontal position
    y: canvas.height / 2,   // Initial vertical position
    angle: 0,               // Initial angle in radians
    velocityX: 0,           // Initial X velocity
    velocityY: 0,           // Initial Y velocity
    thrust: 0.05,           // Thrust acceleration
    friction: 0.99          // Friction for smooth deceleration
};

// Event listeners for controls
window.addEventListener("keydown", (e) => {
    if (e.key === "Control" && gameState === "playing" && !cooldown) {
        if (lasers.length < maxBlasts) {
            fireLaser();
        }
    }
});
window.addEventListener("keydown", (e) => {
    if (e.key === " ") { // Spacebar pressed
        if (gameState === "playing") {
            gameState = "paused"; // Pause the game
            sounds.gameMusic.pause(); // Pause the music
        } else if (gameState === "paused") {
            pauseAllSounds();
			gameState = "playing"; // Unpause the game
            sounds.gameMusic.play(); // Resume the music
            gameLoop(); // Resume the game loop
        }
    }

    // Start the game if in the waiting state
    if (gameState === "waiting") {
        playSound('gameStart'); // Play start sound
        sounds.gameMusic.play(); // Start playing music
        gameState = "playing"; // Switch to playing state
        asteroids.push(createAsteroid(1)); // Largest
        asteroids.push(createAsteroid(2)); // Medium
        asteroids.push(createAsteroid(3)); // Small
        asteroids.push(createAsteroid(4)); // Smallest
        gameLoop(); // Start the game loop
    }
});

window.addEventListener("keydown", () => {
    if (gameState === "waiting") {
        gameState = "playing"; // Switch to playing state
//        asteroids.push(createAsteroid(1)); // Add the first asteroid
        gameLoop(); // Start the game loop
    }
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') keys.left = true;
    if (e.key === 'ArrowRight') keys.right = true;
    if (e.key === 'ArrowUp') keys.up = true;
	if (e.key === 'ArrowDown') keys.down = true; //

    // Spawn slow boss with 'O'
    if (e.key.toLowerCase() === 'o' && gameState === "playing") {
        console.log('Spawning slow boss ship');
        spawnBossShip('slow');
    }

    // Spawn fast boss with 'P'
   console.log(`Key pressed: ${e.key}`);
    if (e.key.toLowerCase() === 'p' && gameState === "playing") {
         console.log('Spawning fast boss ship');
		 spawnBossShip('fast');
    }
});
window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') keys.left = false;
    if (e.key === 'ArrowRight') keys.right = false;
    if (e.key === 'ArrowUp') keys.up = false;
    if (e.key === 'ArrowDown') keys.down = false; 
});
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') keys.left = true;
    if (e.key === 'ArrowRight') keys.right = true;
    if (e.key === 'ArrowUp') keys.up = true;
    if (e.key === 'ArrowDown') keys.down = true; // Add reverse thrust
});

window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') keys.left = false;
    if (e.key === 'ArrowRight') keys.right = false;
    if (e.key === 'ArrowUp') keys.up = false;
    if (e.key === 'ArrowDown') keys.down = false; // Stop reverse thrust
});

// Update ship position
function showPauseScreen() {
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Paused", canvas.width / 2, canvas.height / 2);
}
function updateShip() {
    // Rotate ship
    if (keys.left) ship.angle -= 0.05; // Rotate counterclockwise
    if (keys.right) ship.angle += 0.05; // Rotate clockwise

    // Apply forward thrust in the direction the ship is facing
    if (keys.up) {
        const adjustedAngle = ship.angle - Math.PI / 2;
        ship.velocityX += Math.cos(adjustedAngle) * ship.thrust; // X-component of forward thrust
        ship.velocityY += Math.sin(adjustedAngle) * ship.thrust; // Y-component of forward thrust
    }
ship.thrust = 0.05; // Increase thrust value (default was 0.05)

    // Apply friction to reduce velocity over time
    ship.velocityX *= ship.friction;
    ship.velocityY *= ship.friction;

    // Cap maximum speed
    const maxSpeed = 500;
    const speed = Math.sqrt(ship.velocityX ** 2 + ship.velocityY ** 2);
    if (speed > maxSpeed) {
        ship.velocityX = (ship.velocityX / speed) * maxSpeed;
        ship.velocityY = (ship.velocityY / speed) * maxSpeed;
    }
    // Update ship's position
    ship.x += ship.velocityX;
    ship.y += ship.velocityY;

    // Screen wrap-around
    if (ship.x < 0) ship.x = canvas.width;
    if (ship.x > canvas.width) ship.x = 0;
    if (ship.y < 0) ship.y = canvas.height;
    if (ship.y > canvas.height) ship.y = 0;

    // Draw the ship with flame when moving forward
    drawShip(ship.x, ship.y, ship.angle, keys.up);
}

// Draw the ship
function drawShip(x, y, angle, thrusting) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    // Draw the ship
    ctx.beginPath();
    ctx.moveTo(0, -15);    // Tip of the ship
    ctx.lineTo(10, 15);    // Bottom right
    ctx.lineTo(-10, 15);   // Bottom left
    ctx.closePath();
    ctx.strokeStyle = 'white';
    ctx.stroke();

    // Draw the flame when thrusting forward
    if (thrusting) {
        ctx.beginPath();
        ctx.moveTo(0, 15);                 // Rear center of the ship
        ctx.lineTo(-5, 25 + Math.random() * 5); // Left flame edge with random flicker
        ctx.lineTo(5, 25 + Math.random() * 5);  // Right flame edge with random flicker
        ctx.closePath();
        ctx.fillStyle = 'white';
        ctx.fill();
    }

    ctx.restore();
}

// Game loop

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    if (gameState === "waiting") {
        showWaitingScreen();
        return;
    }

    if (gameState === "paused") {
        pauseAllSounds();
        
        return;
    }

    if (gameState === "playing") {
        startMusic(); // Resume game music
        resumeGameSounds();
        bossShips.forEach((boss) => {
            const sound = sounds[boss.sound];
            if (sound && sound.paused) {
                sound.play().catch((error) => {
                    console.error(`Error playing boss sound:`, error);
                });
            }
        });
    }

    if (gameState === "exploding") {
        updateExplosions();
        drawExplosions();
        requestAnimationFrame(gameLoop);
        return;
    }

    // Normal game updates
    updateShip();
    drawShip(ship.x, ship.y, ship.angle, keys.up);

    updateAsteroids();
    drawAsteroids();

    updateBossShips();
    drawBossShips(); // Ensure this is called

    updateLasers();
	checkLaserAsteroidCollision();
    drawLasers();

    updateExplosions();
    drawExplosions();

    drawScore();
    drawTom();

    requestAnimationFrame(gameLoop); // Moved inside the function
}
gameLoop();
