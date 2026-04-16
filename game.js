const sounds = {
    gameStart: new Audio("original_sounds/beat1.wav"),
    gameBonus: new Audio("original_sounds/extraShip.wav"),
    gameOver: new Audio("original_sounds/bangLarge.wav"),
    asteroidHit: new Audio("original_sounds/bangMedium.wav"),
    shipFly: new Audio("original_sounds/thrust.wav"),
    laserFire: new Audio("original_sounds/fire.wav"),
    gameMusic: new Audio("game-music.mp3"),
    mineralSwarm: new Audio("original_sounds/mineral-angelic-loop.mp3"),
    ufoBossFast: new Audio("original_sounds/saucerSmall.wav"),
    ufoBossSlow: new Audio("original_sounds/saucerBig.wav"),
    bossLaser: new Audio("original_sounds/fire.wav"),
    titanAlarm: new Audio("original_sounds/beat2.wav")
};

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const mobileControls = document.getElementById("mobileControls");
const mobilePauseButton = document.getElementById("mobilePause");
const mobileStartButton = document.getElementById("mobileStart");
const controlButtons = Array.from(document.querySelectorAll("[data-control]"));
const aboutButton = document.getElementById("aboutButton");
const aboutOverlay = document.getElementById("aboutOverlay");
const aboutText = document.getElementById("aboutText");
const aboutCodebaseLink = document.getElementById("aboutCodebaseLink");
const aboutWikiLink = document.getElementById("aboutWikiLink");
const aboutMilkyWayLink = document.getElementById("aboutMilkyWayLink");
const aboutCloseButton = document.getElementById("aboutClose");
const upgradeOverlay = document.getElementById("upgradeOverlay");
const upgradeSubtitle = document.getElementById("upgradeSubtitle");
const upgradeChoicesElement = document.getElementById("upgradeChoices");
const bossImages = {
    small: new Image(),
    large: new Image()
};
const milkyWayPhoto = new Image();
const titanPhoto = new Image();
const asteroidSurfacePhotos = [];

const HUD_FONT = "'Press Start 2P', monospace";
const GAME_VERSION = "1.101";
const ABOUT_CREDIT_TEXT = `Classic Asteroids HTML5 by Tom Wellborn 2026 v${GAME_VERSION}`;
const ABOUT_CODEBASE_URL = "https://github.com/tommiew007/Asteroids";
const ABOUT_WIKI_URL = "https://github.com/tommiew007/Asteroids/wiki";
const ABOUT_MILKY_WAY_URL = "https://commons.wikimedia.org/wiki/File:ESO_-_Milky_Way.jpg";
const STORAGE_KEY = "asteroids-high-score";
const AUDIO_SETTINGS_KEY = "asteroids-audio-settings";
const HUD_SCORE_DIGITS = 8;
const ASTEROID_RADII = [48, 28, 16];
const DESKTOP_ASTEROID_RADIUS_MULTIPLIER = 1.1;
const ASTEROID_SCORES = [20, 50, 100];
const MAX_STARTING_ASTEROIDS = 11;
const MAX_PLAYER_SHOTS = 4;
const MAX_ENEMY_SHOTS = 20;
const MAX_PARTICLES = 1200;
const PLAYER_FIRE_COOLDOWN = 8;
const PLAYER_SHOT_SPEED = 9;
const PLAYER_SHOT_LIFE = 75;
const UFO_SHOT_SPEED = 4.5;
const UFO_SHOT_LIFE = 110;
const SHIP_INVULNERABLE_FRAMES = 150;
const SHIP_RESPAWN_FRAMES = 90;
const SHIP_BASE_MAX_SPEED = 35;
const WAVE_DELAY_FRAMES = 75;
const EXTRA_LIFE_SCORE = 10000;
const LARGE_UFO_SCORE_VALUE = 200;
const SMALL_UFO_SCORE_VALUE = 1000;
const SMALL_SAUCER_SCORE_THRESHOLD = 10000;
const MIXED_SAUCER_SCORE_THRESHOLD = 4000;
const BOSS_ALERT_FRAMES = 150;
const MOBILE_REFERENCE_WIDTH = 1180;
const MOBILE_REFERENCE_HEIGHT = 1024;
const MOBILE_REFERENCE_ENTITY_SCALE = 0.82;
const MOBILE_REFERENCE_MOVEMENT_SCALE = 0.88;
const MOBILE_REFERENCE_SHOT_SCALE = 0.92;
const TOUCH_UI_MAX_LONGEST_SIDE = 1368;
const TABLET_PROFILE_BLEND_START = 700;
const TABLET_PROFILE_BLEND_END = 1050;
const UPGRADE_INTERVAL_WAVES = 2;
const UPGRADE_CHOICE_COUNT = 3;
const HYPERSPACE_COOLDOWN_FRAMES = 1200;
const HYPERSPACE_EXIT_FLASH = 0.22;
const HYPERSPACE_FAILURE_CHANCE_PER_EXTRA_USE = 0.08;
const HYPERSPACE_FAILURE_CHANCE_CAP = 0.6;
const HYPERSPACE_SPIN_OUT_FRAMES = 22;
const HYPERSPACE_TRANSIT_FRAMES = 8;
const HYPERSPACE_SPIN_IN_FRAMES = 20;
const HYPERSPACE_SPIN_RATE_MIN = 0.07;
const HYPERSPACE_SPIN_RATE_MAX = 0.62;
const GOD_MODE_BOUNCE_FLASH = 0.08;
const THREAT_SURGE_INTERVAL_WAVES = 4;
const THREAT_SURGE_DURATION_FRAMES = 780;
const THREAT_SURGE_SCORE_MULTIPLIER = 2;
const THREAT_SURGE_UFO_COOLDOWN_MULTIPLIER = 0.58;
const THREAT_SURGE_ASTEROID_SPLIT_SPEED_MULTIPLIER = 1.55;
const THREAT_BOMB_MIN_SPAWN_FRAMES = 5 * 60 * 60;
const THREAT_BOMB_MAX_SPAWN_FRAMES = 10 * 60 * 60;
const THREAT_BOMB_BASE_SPEED = 2.15;
const THREAT_BOMB_BASE_RADIUS = 9;
const THREAT_BOMB_SCORE_VALUE = SMALL_UFO_SCORE_VALUE * 2;
const DECOY_SWEEP_SCORE_VALUE = LARGE_UFO_SCORE_VALUE;
const THREAT_BOMB_EXIT_PULL_STRENGTH = 0.0019;
const COURSE_SHIFT_INTERVAL_MIN_FRAMES = 180;
const COURSE_SHIFT_INTERVAL_MAX_FRAMES = 300;
const COURSE_SHIFT_MIN_DEGREES = 3;
const COURSE_SHIFT_MAX_DEGREES = 10;
const TITAN_WAVE_INTERVAL = 5;
const TITAN_BASE_GRAVITY = 0.008;
const TITAN_GRAVITY_STEP = 0.008;
const TITAN_GRAVITY_MAX = 0.16;
const TITAN_BASE_FRAGMENT_COUNT = 4;
const TITAN_FRAGMENT_STEP = 1;
const TITAN_FRAGMENT_MAX = 10;
const TITAN_FRAGMENT_OVERLAP_IMMUNITY_FRAMES = 120;
const TITAN_BASE_SHOTS_TO_BREAK = 20;
const TITAN_SHOTS_TO_BREAK_STEP = 2;
const TITAN_SHOTS_TO_BREAK_MAX = 50;
const TITAN_BASE_SPEED = 0.38;
const TITAN_SPEED_STEP = 0.035;
const TITAN_SPEED_MAX = 0.9;
const TITAN_RADIUS_RATIO = 0.187;
const TITAN_GRAVITY_RANGE_MULTIPLIER = 15;
const TITAN_GRAVITY_INTENSITY_SCALE = 0.4;
const TITAN_ALERT_FRAMES = 210;
const TITAN_BOSS_SCORE_VALUE = 500;
const TITAN_CHILD_CLEAR_BONUS = 500;
const TITAN_PULSE_MIN_FRAMES = 180;
const TITAN_PULSE_MAX_FRAMES = 300;
const DECOY_SPAWN_CHANCE_ON_SMALL_BOSS = 0.15;
const DECOY_COUNT_ON_SMALL_BOSS = 2;
const MAX_ACTIVE_DECOYS = 6;
const MINERAL_FIELD_MIN_SPAWN_FRAMES = 5 * 60 * 60;
const MINERAL_FIELD_MAX_SPAWN_FRAMES = 10 * 60 * 60;
const MINERAL_FIELD_STAGGER_FRAMES = 70 * 60;
const MINERAL_FIELD_BASE_SPEED = 1.65;
const MINERAL_FIELD_WAVE_SPEED_STEP = 0.06;
const MINERAL_FIELD_SPEED_CAP = 3.8;
const MINERAL_PARTICLE_SIZE = 5;
const MINERAL_TOUCH_SCORE = 10;
const LARGE_ASTEROID_VISUALS_ENABLED = true;
const LARGE_ASTEROID_VISUALS_ON_MOBILE = true;
const LARGE_ASTEROID_SHADER_DEBUG_MODE = false;
const LARGE_ASTEROID_TEXTURE_MIN_SIZE = 96;
const LARGE_ASTEROID_TEXTURE_MAX_SIZE = 196;
const LARGE_ASTEROID_TEXTURE_REBUILDS_PER_FRAME = 8;
const LARGE_ASTEROID_GRAVITY_MAX_STEPS = 16;
const LARGE_ASTEROID_GRAVITY_PER_LEVEL = 0.0016;
const LARGE_ASTEROID_GRAVITY_RANGE_MULTIPLIER = 12;
const GLOBAL_GRAVITY_INTENSITY_SCALE = 15 / 16;
const POWERUP_DURATION_FRAMES = 30 * 60;
const POWERUP_DURATION_SECONDS = Math.floor(POWERUP_DURATION_FRAMES / 60);
const POWERUP_EXPIRY_WARNING_FRAMES = 3 * 60;
const SEEKER_ARRAY_DURATION_FRAMES = 10 * 60;
const SEEKER_ARRAY_DURATION_SECONDS = Math.floor(SEEKER_ARRAY_DURATION_FRAMES / 60);
const PLAYER_SHOT_DISTANCE_MULTIPLIER = 2;
const PLAYER_HOMING_TURN_RATE = 0.055;
const PLAYER_HOMING_SHOT_SPEED_MULTIPLIER = 0.9;
const ASTEROID_OVERLAP_IMPACT_CHANCE = 0.1;
const ROGUE_ASTEROID_CHANCE = 0.05;
const ROGUE_ASTEROID_SPEED_MULTIPLIER = 4;
const ROGUE_ASTEROID_SCORE_BONUS = 500;
const NON_ROGUE_ASTEROID_MAX_SPEED_MULTIPLIER = 3;
const ANTI_GRAVITY_FIELD_RANGE = 180;
const ANTI_GRAVITY_MIN_GAP = 12;
const ANTI_GRAVITY_PUSH_FORCE = 0.55;
const DEFAULT_GAMEPLAY_PROFILE = {
    entityScale: 1,
    movementScale: 1,
    shotScale: 1
};
const ASTEROID_COLORWAYS = [
    { stroke: "#d4d9df", fill: "rgba(126, 133, 142, 0.24)", glow: "#e4e8ed" },
    { stroke: "#c6ccd4", fill: "rgba(116, 123, 132, 0.24)", glow: "#d7dde6" },
    { stroke: "#b6bcc6", fill: "rgba(104, 110, 121, 0.24)", glow: "#c8cfd9" },
    { stroke: "#a8aeb8", fill: "rgba(94, 100, 112, 0.24)", glow: "#bcc3ce" },
    { stroke: "#b49f93", fill: "rgba(106, 83, 72, 0.24)", glow: "#c7b2a5" },
    { stroke: "#be927d", fill: "rgba(112, 76, 61, 0.24)", glow: "#d1a58f" },
    { stroke: "#c98c68", fill: "rgba(104, 56, 38, 0.24)", glow: "#daa07f" },
    { stroke: "#b9775c", fill: "rgba(92, 48, 35, 0.24)", glow: "#c98b74" },
    { stroke: "#a96a4f", fill: "rgba(78, 40, 30, 0.25)", glow: "#bc8068" },
    { stroke: "#8f5a45", fill: "rgba(66, 34, 27, 0.25)", glow: "#a66f58" }
];
const ASTEROID_SURFACE_SOURCES = [
    {
        id: "bennu",
        src: "assets/surfaces/bennu-surface.jpg",
        crop: { x: 0.06, y: 0.08, w: 0.88, h: 0.84 }
    },
    {
        id: "vesta",
        src: "assets/surfaces/vesta-surface.jpg",
        crop: { x: 0.12, y: 0.2, w: 0.76, h: 0.66 }
    },
    {
        id: "psyche",
        src: "assets/surfaces/psyche-surface.jpg",
        crop: { x: 0.16, y: 0.2, w: 0.68, h: 0.64 }
    },
    {
        id: "eros",
        src: "assets/surfaces/eros-surface.jpg",
        crop: { x: 0.0, y: 0.0, w: 0.84, h: 0.64 }
    }
];
const ASTEROID_TEXTURE_COLLECTION_BY_SIZE = [
    {
        // Large asteroid texture (collection A)
        highlight: "rgba(255, 244, 220, 0.5)",
        mid: "rgba(154, 114, 88, 0.6)",
        shadow: "rgba(26, 15, 10, 0.44)",
        contrastLight: "rgba(255, 238, 210, 0.2)",
        contrastDark: "rgba(14, 9, 6, 0.18)",
        grainLight: "rgba(255, 226, 196, 0.16)",
        grainDark: "rgba(28, 14, 10, 0.17)",
        grainCount: 84
    },
    {
        // Medium asteroid texture (collection B)
        highlight: "rgba(236, 242, 255, 0.44)",
        mid: "rgba(132, 134, 158, 0.6)",
        shadow: "rgba(18, 18, 30, 0.43)",
        contrastLight: "rgba(232, 238, 255, 0.18)",
        contrastDark: "rgba(10, 10, 20, 0.2)",
        grainLight: "rgba(220, 228, 255, 0.14)",
        grainDark: "rgba(16, 16, 26, 0.18)",
        grainCount: 68
    },
    {
        // Small asteroid texture (collection C)
        highlight: "rgba(237, 255, 233, 0.43)",
        mid: "rgba(122, 152, 118, 0.58)",
        shadow: "rgba(16, 26, 14, 0.4)",
        contrastLight: "rgba(228, 255, 218, 0.16)",
        contrastDark: "rgba(10, 18, 10, 0.2)",
        grainLight: "rgba(228, 255, 214, 0.14)",
        grainDark: "rgba(14, 24, 12, 0.18)",
        grainCount: 54
    }
];
for (const source of ASTEROID_SURFACE_SOURCES) {
    asteroidSurfacePhotos.push({
        id: source.id,
        src: source.src,
        crop: source.crop,
        image: new Image(),
        ready: false
    });
}
const ROGUE_ASTEROID_COLORWAY = {
    stroke: "#dd8d68",
    fill: "rgba(114, 46, 36, 0.33)",
    glow: "#f0a47f"
};
const TIMED_POWERUP_KEYS = [
    "rapidFire",
    "multiShot",
    "piercing",
    "thrusters",
    "maxShields",
    "gravityDampers",
    "naniteRepair",
    "shotRange",
    "homing",
    "antiGravity"
];
const TIMED_POWERUP_LABELS = {
    rapidFire: "RAPID FIRE",
    multiShot: "TWIN CANNONS",
    piercing: "PIERCING ROUNDS",
    thrusters: "OVERDRIVE",
    maxShields: "SHIELD MATRIX",
    gravityDampers: "GRAV DAMPERS",
    naniteRepair: "NANITE REPAIR",
    shotRange: "RANGE LENSES",
    homing: "SEEKER ARRAY",
    antiGravity: "ANTI-GRAV FIELD"
};
const TIMED_POWERUP_MAX_STACKS = {
    rapidFire: 4,
    multiShot: 3,
    piercing: 3,
    thrusters: 4,
    maxShields: 3,
    gravityDampers: LARGE_ASTEROID_GRAVITY_MAX_STEPS,
    naniteRepair: 1,
    shotRange: 1,
    homing: 1,
    antiGravity: 1
};
const PALETTE = {
    bgTop: "#030712",
    bgBottom: "#0a1633",
    nebulaA: "rgba(91, 141, 239, 0.16)",
    nebulaB: "rgba(183, 92, 255, 0.12)",
    nebulaC: "rgba(36, 214, 177, 0.1)",
    starColors: ["#ffffff", "#9ad1ff", "#ffe29a", "#b7ffec"],
    ship: "#8be9fd",
    shield: "#73e0ff",
    thrust: "#ffb454",
    playerShot: "#7ee7ff",
    enemyShot: "#ff9a76",
    mineralGlow: "rgba(145, 170, 185, 0.25)",
    mineralPickup: "#73ff9b",
    antiGravity: "#8fffd3",
    rapidFire: "#ffbe6a",
    multiShot: "#7ee7ff",
    piercing: "#ff8df3",
    thrustersBoost: "#ffd07a",
    gravityDampers: "#82a8ff",
    nanite: "#8cffb9",
    shotRange: "#66f3ff",
    homing: "#b5ff8c",
    hud: "#f3f7ff",
    hudAccent: "#f8b36b",
    combo: "#ffd166"
};
const UFO_SYNTH_PROFILES = {
    ufoBossSlow: {
        baseFrequency: 148,
        wobbleDepth: 5,
        wobbleRate: 1.4,
        waveform: "triangle",
        filterFrequency: 760,
        voiceGain: 0.024,
        outputGain: 0.16
    },
    ufoBossFast: {
        baseFrequency: 296,
        wobbleDepth: 9,
        wobbleRate: 3.2,
        waveform: "square",
        filterFrequency: 1400,
        voiceGain: 0.016,
        outputGain: 0.12
    }
};
const SEAMLESS_LOOP_SOUND_KEYS = new Set(["ufoBossFast", "ufoBossSlow"]);
const MUSIC_LOOP_KEYS = new Set(["gameMusic", "mineralSwarm"]);

let gameAudioContext = null;
const loopingSynths = {};

sounds.gameMusic.loop = true;
sounds.mineralSwarm.loop = true;
sounds.shipFly.loop = true;
sounds.ufoBossFast.loop = true;
sounds.ufoBossSlow.loop = true;

sounds.gameMusic.volume = 0.35;
sounds.mineralSwarm.volume = 0.24;
sounds.shipFly.volume = 0.2;
sounds.ufoBossFast.volume = 0.32;
sounds.ufoBossSlow.volume = 0.28;
sounds.laserFire.volume = 0.45;
sounds.bossLaser.volume = 0.35;
sounds.asteroidHit.volume = 0.45;
sounds.gameBonus.volume = 0.45;
sounds.gameStart.volume = 0.45;
sounds.gameOver.volume = 0.5;
sounds.titanAlarm.volume = 0.44;

function isBlockedAsteroidImagePath(src) {
    if (typeof src !== "string") {
        return false;
    }
    return /asteroid[^/\\]*\.(png|jpe?g|webp|gif|svg)$/i.test(src.trim());
}

function setSafeImageSource(image, src, label = "image") {
    if (!image || typeof src !== "string") {
        return false;
    }
    if (isBlockedAsteroidImagePath(src)) {
        console.warn(`[Asteroids] Blocked removed asteroid image source for ${label}: ${src}`);
        return false;
    }
    image.src = src;
    return true;
}

function buildBlackToTransparentTrimmedCanvas(image) {
    if (!image || !image.naturalWidth || !image.naturalHeight) {
        return null;
    }

    const sourceCanvas = document.createElement("canvas");
    sourceCanvas.width = image.naturalWidth;
    sourceCanvas.height = image.naturalHeight;
    const sourceCtx = sourceCanvas.getContext("2d", { willReadFrequently: true });
    if (!sourceCtx) {
        return null;
    }

    sourceCtx.drawImage(image, 0, 0);
    const imageData = sourceCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
    const { data, width, height } = imageData;
    const visibleAlphaThreshold = 6;
    const backgroundThreshold = 18;
    const neutralSpreadThreshold = 20;
    const pixelCount = width * height;
    const backgroundMask = new Uint8Array(pixelCount);
    const queue = new Uint32Array(pixelCount);
    let head = 0;
    let tail = 0;

    const isBackgroundLike = (pixelIndex) => {
        const offset = pixelIndex * 4;
        const red = data[offset];
        const green = data[offset + 1];
        const blue = data[offset + 2];
        const maxChannel = Math.max(red, green, blue);
        const minChannel = Math.min(red, green, blue);
        return maxChannel <= backgroundThreshold && (maxChannel - minChannel) <= neutralSpreadThreshold;
    };

    const tryEnqueue = (x, y) => {
        if (x < 0 || y < 0 || x >= width || y >= height) {
            return;
        }
        const pixelIndex = y * width + x;
        if (backgroundMask[pixelIndex] === 1 || !isBackgroundLike(pixelIndex)) {
            return;
        }
        backgroundMask[pixelIndex] = 1;
        queue[tail] = pixelIndex;
        tail += 1;
    };

    for (let x = 0; x < width; x += 1) {
        tryEnqueue(x, 0);
        tryEnqueue(x, height - 1);
    }
    for (let y = 0; y < height; y += 1) {
        tryEnqueue(0, y);
        tryEnqueue(width - 1, y);
    }

    while (head < tail) {
        const pixelIndex = queue[head];
        head += 1;
        const x = pixelIndex % width;
        const y = Math.floor(pixelIndex / width);
        tryEnqueue(x + 1, y);
        tryEnqueue(x - 1, y);
        tryEnqueue(x, y + 1);
        tryEnqueue(x, y - 1);
    }

    let minX = width;
    let minY = height;
    let maxX = -1;
    let maxY = -1;

    for (let pixelIndex = 0; pixelIndex < pixelCount; pixelIndex += 1) {
        const offset = pixelIndex * 4;
        if (backgroundMask[pixelIndex] === 1) {
            data[offset + 3] = 0;
            continue;
        }

        if (data[offset + 3] <= visibleAlphaThreshold) {
            continue;
        }

        const x = pixelIndex % width;
        const y = Math.floor(pixelIndex / width);
        if (x < minX) {
            minX = x;
        }
        if (y < minY) {
            minY = y;
        }
        if (x > maxX) {
            maxX = x;
        }
        if (y > maxY) {
            maxY = y;
        }
    }

    sourceCtx.putImageData(imageData, 0, 0);
    if (maxX < minX || maxY < minY) {
        // If keying logic fails to detect a foreground region, fall back to
        // the original image canvas so Titan still renders as provided.
        return sourceCanvas;
    }

    const padding = 1;
    const trimmedMinX = Math.max(0, minX - padding);
    const trimmedMinY = Math.max(0, minY - padding);
    const trimmedMaxX = Math.min(width - 1, maxX + padding);
    const trimmedMaxY = Math.min(height - 1, maxY + padding);
    const trimmedWidth = Math.max(1, trimmedMaxX - trimmedMinX + 1);
    const trimmedHeight = Math.max(1, trimmedMaxY - trimmedMinY + 1);
    const trimmedCanvas = document.createElement("canvas");
    trimmedCanvas.width = trimmedWidth;
    trimmedCanvas.height = trimmedHeight;
    const trimmedCtx = trimmedCanvas.getContext("2d");
    if (!trimmedCtx) {
        return null;
    }

    trimmedCtx.drawImage(
        sourceCanvas,
        trimmedMinX,
        trimmedMinY,
        trimmedWidth,
        trimmedHeight,
        0,
        0,
        trimmedWidth,
        trimmedHeight
    );
    return trimmedCanvas;
}

setSafeImageSource(bossImages.small, "ufo-small.svg", "small boss");
setSafeImageSource(bossImages.large, "ufo-large.svg", "large boss");
milkyWayPhoto.decoding = "async";
milkyWayPhoto.addEventListener("load", () => {
    milkyWayPhotoReady = true;
});
milkyWayPhoto.addEventListener("error", () => {
    milkyWayPhotoReady = false;
});
setSafeImageSource(milkyWayPhoto, "assets/milky-way.jpg", "milky way");
titanPhoto.decoding = "async";
titanPhoto.addEventListener("load", () => {
    const masked = buildBlackToTransparentTrimmedCanvas(titanPhoto);
    titanPhotoMaskedCanvas = masked || titanPhoto;
    titanPhotoReady = true;
});
titanPhoto.addEventListener("error", () => {
    titanPhotoReady = false;
    titanPhotoMaskedCanvas = null;
});
setSafeImageSource(titanPhoto, "titan.jpg", "titan");
for (const surface of asteroidSurfacePhotos) {
    surface.image.decoding = "async";
    surface.image.addEventListener("load", () => {
        surface.ready = true;
        for (const asteroid of asteroids) {
            asteroid.largeVisualTextureDirty = true;
        }
    });
    surface.image.addEventListener("error", () => {
        surface.ready = false;
    });
    setSafeImageSource(surface.image, surface.src, `asteroid surface ${surface.id}`);
}

const keys = {
    left: false,
    right: false,
    thrust: false,
    fire: false,
    hyperspace: false
};

const preventedCodes = new Set([
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Space",
    "Escape",
    "KeyP"
]);

let gameState = "waiting";
let score = 0;
let highScore = loadHighScore();
let lives = 3;
let wave = 0;
let titanWaveCount = 0;
let lastFrameTime = 0;
let nextWaveTimer = -1;
let nextUfoSpawnTimer = 0;
let nextExtraLifeScore = EXTRA_LIFE_SCORE;
let bossAlertTimer = 0;
let bossAlertMessage = "";
let isMobilePhoneUI = false;
let surgeActive = false;
let surgeTimer = 0;
let milkyWayPhotoReady = false;
let titanPhotoReady = false;
let titanPhotoMaskedCanvas = null;

let stars = [];
let asteroids = [];
let playerShots = [];
let enemyShots = [];
let ufos = [];
let decoys = [];
let particles = [];
let gameplayFrameClock = 0;
let gameplayProfile = { ...DEFAULT_GAMEPLAY_PROFILE };
let upgradeState = createUpgradeState();
let upgradeExpirations = createUpgradeExpirationState();
let ship = createShip(0);
let upgradeChoices = [];
let upgradeDraftMode = "wave";
let upgradeReturnState = "playing";
let lastUpgradeWave = 0;
let aboutReturnState = null;
let helpReturnState = null;
let godHelpReturnState = null;
let helpPage = "menu";
let autoPausedForFocusLoss = false;
let largeAsteroidTextureRebuildBudget = 0;
let hudTopInset = 16;
let hyperspaceUsesThisWave = 0;
let screenShakeFrames = 0;
let screenShakeIntensity = 0;
let flashAlpha = 0;
let flashColor = "#ffffff";
let comboCount = 0;
let comboTimer = 0;
let comboDisplayTimer = 0;
let bonusBannerTimer = 0;
let bonusBannerText = "";
let powerupExpiryWarning = null;
let shipPowerupWarningBlinkFrames = 0;
let titanPulseTimer = 0;
let titanChildBatchSerial = 0;
let asteroidSerial = 0;
let activeTitanChildBatchIds = new Set();
let activeAsteroidOverlapPairs = new Set();
let godModeEnabled = false;
let gravityDebugWaveFloor = 0;
let soundEnabled = true;
let musicEnabled = true;
let touchSteerPointerId = null;
let touchSteerTargetX = 0;
let touchSteerTargetY = 0;
let mouseSteerActive = false;
let mouseThrustActive = false;
let threatBomb = null;
let nextThreatBombTimer = randomBetween(THREAT_BOMB_MIN_SPAWN_FRAMES, THREAT_BOMB_MAX_SPAWN_FRAMES);
let mineralField = null;
let nextMineralFieldTimer = getStaggeredEventTimer(
    nextThreatBombTimer,
    MINERAL_FIELD_MIN_SPAWN_FRAMES,
    MINERAL_FIELD_MAX_SPAWN_FRAMES
);

function loadHighScore() {
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        return stored ? Number.parseInt(stored, 10) || 0 : 0;
    } catch (error) {
        return 0;
    }
}

function saveHighScore() {
    try {
        window.localStorage.setItem(STORAGE_KEY, String(highScore));
    } catch (error) {
        // Ignore storage failures in local/browser sandboxed contexts.
    }
}

function loadAudioSettings() {
    try {
        const stored = window.localStorage.getItem(AUDIO_SETTINGS_KEY);
        if (!stored) {
            return { soundEnabled: true, musicEnabled: true };
        }

        const parsed = JSON.parse(stored);
        return {
            soundEnabled: parsed.soundEnabled !== false,
            musicEnabled: parsed.musicEnabled !== false
        };
    } catch (error) {
        return { soundEnabled: true, musicEnabled: true };
    }
}

function saveAudioSettings() {
    try {
        window.localStorage.setItem(AUDIO_SETTINGS_KEY, JSON.stringify({
            soundEnabled,
            musicEnabled
        }));
    } catch (error) {
        // Ignore storage failures in local/browser sandboxed contexts.
    }
}

function addScore(points) {
    score += points;

    while (score >= nextExtraLifeScore) {
        lives += 1;
        nextExtraLifeScore += EXTRA_LIFE_SCORE;
        playEffect("gameBonus");
    }

    if (score > highScore) {
        highScore = score;
        saveHighScore();
    }
}

const savedAudioSettings = loadAudioSettings();
soundEnabled = savedAudioSettings.soundEnabled;
musicEnabled = savedAudioSettings.musicEnabled;

function syncAudioElementMuteState() {
    Object.keys(sounds).forEach((soundKey) => {
        const sound = sounds[soundKey];
        if (!sound) {
            return;
        }
        sound.muted = MUSIC_LOOP_KEYS.has(soundKey) ? !musicEnabled : !soundEnabled;
    });
}

syncAudioElementMuteState();

function isAudioEnabledForKey(soundKey) {
    return MUSIC_LOOP_KEYS.has(soundKey) ? musicEnabled : soundEnabled;
}

function playEffect(soundKey) {
    if (!isAudioEnabledForKey(soundKey)) {
        return;
    }

    const sound = sounds[soundKey];
    if (!sound) {
        return;
    }

    sound.currentTime = 0;
    sound.play().catch(() => {});
}

function playFailBuzz() {
    if (!soundEnabled) {
        return;
    }

    const audioContext = getAudioContext();
    if (!audioContext) {
        return;
    }

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const now = audioContext.currentTime;

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(148, now);
    oscillator.frequency.exponentialRampToValueAtTime(92, now + 0.14);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.07, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.16);
}

function playMineralPickupRiff() {
    if (!soundEnabled) {
        return;
    }

    const audioContext = getAudioContext();
    if (!audioContext) {
        return;
    }

    const notes = [523.25, 659.25, 783.99];
    const noteDuration = 0.05;
    const noteGap = 0.01;
    const startTime = audioContext.currentTime;

    notes.forEach((frequency, index) => {
        const noteStart = startTime + index * (noteDuration + noteGap);
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.type = "triangle";
        oscillator.frequency.setValueAtTime(frequency, noteStart);

        gain.gain.setValueAtTime(0.0001, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.085, noteStart + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + noteDuration);

        oscillator.connect(gain);
        gain.connect(audioContext.destination);
        oscillator.start(noteStart);
        oscillator.stop(noteStart + noteDuration + 0.01);
    });
}

function playThreatBombBlip() {
    if (!soundEnabled) {
        return;
    }

    const audioContext = getAudioContext();
    if (!audioContext) {
        return;
    }

    const now = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(420, now);
    oscillator.frequency.exponentialRampToValueAtTime(360, now + 0.045);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.045, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.06);
}

function getAudioContext() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
        return null;
    }

    if (!gameAudioContext) {
        gameAudioContext = new AudioContextClass();
    }

    if (gameAudioContext.state === "suspended") {
        gameAudioContext.resume().catch(() => {});
    }

    return gameAudioContext;
}

function primeLoopAudioContext() {
    getAudioContext();
}

function createLoopSynth(soundKey) {
    const profile = UFO_SYNTH_PROFILES[soundKey];
    const audioContext = getAudioContext();
    if (!profile || !audioContext) {
        return null;
    }

    const output = audioContext.createGain();
    output.gain.value = 0;

    const filter = audioContext.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = profile.filterFrequency;

    const tone = audioContext.createOscillator();
    tone.type = profile.waveform;
    tone.frequency.value = profile.baseFrequency;

    const toneGain = audioContext.createGain();
    toneGain.gain.value = profile.voiceGain;

    const wobble = audioContext.createOscillator();
    wobble.type = "sine";
    wobble.frequency.value = profile.wobbleRate;

    const wobbleGain = audioContext.createGain();
    wobbleGain.gain.value = profile.wobbleDepth;

    wobble.connect(wobbleGain);
    wobbleGain.connect(tone.frequency);

    tone.connect(toneGain);
    toneGain.connect(filter);
    filter.connect(output);
    output.connect(audioContext.destination);

    tone.start();
    wobble.start();

    return {
        output,
        targetGain: profile.outputGain
    };
}

function playSynthLoop(soundKey) {
    const profile = UFO_SYNTH_PROFILES[soundKey];
    if (!profile) {
        return false;
    }

    if (!loopingSynths[soundKey]) {
        loopingSynths[soundKey] = createLoopSynth(soundKey);
    }

    const synth = loopingSynths[soundKey];
    if (!synth || !gameAudioContext) {
        return false;
    }

    const now = gameAudioContext.currentTime;
    synth.output.gain.cancelScheduledValues(now);
    synth.output.gain.setValueAtTime(synth.output.gain.value, now);
    synth.output.gain.linearRampToValueAtTime(synth.targetGain, now + 0.05);
    return true;
}

function silenceSynthLoop(soundKey) {
    const synth = loopingSynths[soundKey];
    if (!synth || !gameAudioContext) {
        return false;
    }

    const now = gameAudioContext.currentTime;
    synth.output.gain.cancelScheduledValues(now);
    synth.output.gain.setValueAtTime(synth.output.gain.value, now);
    synth.output.gain.linearRampToValueAtTime(0, now + 0.06);
    return true;
}

function playLoop(soundKey) {
    if (!isAudioEnabledForKey(soundKey)) {
        stopLoop(soundKey);
        return;
    }

    const sound = sounds[soundKey];
    if (!sound) {
        playSynthLoop(soundKey);
        return;
    }

    if (!sound.paused) {
        return;
    }

    sound.play().catch(() => {
        if (SEAMLESS_LOOP_SOUND_KEYS.has(soundKey)) {
            playSynthLoop(soundKey);
        }
    });
}

function pauseLoop(soundKey) {
    const sound = sounds[soundKey];
    if (sound && !sound.paused) {
        sound.pause();
    }

    silenceSynthLoop(soundKey);
}

function stopLoop(soundKey) {
    const sound = sounds[soundKey];
    if (sound) {
        sound.pause();
        sound.currentTime = 0;
    }

    silenceSynthLoop(soundKey);
}

function stopAmbientSounds() {
    stopLoop("gameMusic");
    stopLoop("mineralSwarm");
    stopLoop("shipFly");
    stopLoop("ufoBossFast");
    stopLoop("ufoBossSlow");
}

function pauseAmbientSounds() {
    pauseLoop("gameMusic");
    pauseLoop("mineralSwarm");
    pauseLoop("shipFly");
    pauseLoop("ufoBossFast");
    pauseLoop("ufoBossSlow");
}

function syncAmbientSounds() {
    if (gameState === "paused" || gameState === "upgrade" || gameState === "about" || gameState === "help") {
        pauseAmbientSounds();
        return;
    }

    if (gameState !== "playing") {
        stopAmbientSounds();
        return;
    }

    playLoop("gameMusic");
    if (mineralField && mineralField.particles.length > 0) {
        playLoop("mineralSwarm");
    } else {
        stopLoop("mineralSwarm");
    }

    if (ship.active && isTouchThrustingActive()) {
        playLoop("shipFly");
    } else {
        stopLoop("shipFly");
    }

    if (ufos.length > 0) {
        const activeUfoSound = ufos[0].soundKey;
        playLoop(activeUfoSound);
        stopLoop(activeUfoSound === "ufoBossFast" ? "ufoBossSlow" : "ufoBossFast");
    } else {
        stopLoop("ufoBossFast");
        stopLoop("ufoBossSlow");
    }
}

function randomBetween(min, max) {
    return min + Math.random() * (max - min);
}

function pickRandomScreenEdge(excludeEdge = null) {
    const edges = ["top", "right", "bottom", "left"];
    const options = excludeEdge ? edges.filter((edge) => edge !== excludeEdge) : edges;
    return options[Math.floor(Math.random() * options.length)];
}

function getOppositeEdge(edge) {
    if (edge === "top") {
        return "bottom";
    }
    if (edge === "bottom") {
        return "top";
    }
    if (edge === "left") {
        return "right";
    }
    return "left";
}

function getEdgePoint(edge, offset = 0) {
    const margin = offset;
    if (edge === "top") {
        return { x: randomBetween(0, canvas.width), y: -margin };
    }
    if (edge === "bottom") {
        return { x: randomBetween(0, canvas.width), y: canvas.height + margin };
    }
    if (edge === "left") {
        return { x: -margin, y: randomBetween(0, canvas.height) };
    }
    return { x: canvas.width + margin, y: randomBetween(0, canvas.height) };
}

function resetCourseShiftTimer(entity) {
    entity.courseShiftTimer = randomBetween(COURSE_SHIFT_INTERVAL_MIN_FRAMES, COURSE_SHIFT_INTERVAL_MAX_FRAMES);
}

function applyCourseShift(entity) {
    const speed = Math.hypot(entity.vx, entity.vy);
    if (speed < 0.0001) {
        resetCourseShiftTimer(entity);
        return;
    }

    const heading = Math.atan2(entity.vy, entity.vx);
    const angleDelta = randomBetween(COURSE_SHIFT_MIN_DEGREES, COURSE_SHIFT_MAX_DEGREES) * (Math.PI / 180);
    const signedDelta = Math.random() < 0.5 ? -angleDelta : angleDelta;
    const shiftedHeading = heading + signedDelta;

    entity.vx = Math.cos(shiftedHeading) * speed;
    entity.vy = Math.sin(shiftedHeading) * speed;
    resetCourseShiftTimer(entity);
}

function getStaggeredEventTimer(otherTimer, minFrames, maxFrames) {
    let timer = randomBetween(minFrames, maxFrames);
    if (!Number.isFinite(otherTimer)) {
        return timer;
    }

    for (let attempt = 0; attempt < 8; attempt += 1) {
        if (Math.abs(timer - otherTimer) >= MINERAL_FIELD_STAGGER_FRAMES) {
            return timer;
        }
        timer = randomBetween(minFrames, maxFrames);
    }

    if (Math.abs(timer - otherTimer) < MINERAL_FIELD_STAGGER_FRAMES) {
        timer = Math.max(minFrames, Math.min(maxFrames, otherTimer + MINERAL_FIELD_STAGGER_FRAMES));
    }
    return timer;
}

function scheduleThreatBomb() {
    nextThreatBombTimer = getStaggeredEventTimer(
        nextMineralFieldTimer,
        THREAT_BOMB_MIN_SPAWN_FRAMES,
        THREAT_BOMB_MAX_SPAWN_FRAMES
    );
}

function scheduleMineralField() {
    nextMineralFieldTimer = getStaggeredEventTimer(
        nextThreatBombTimer,
        MINERAL_FIELD_MIN_SPAWN_FRAMES,
        MINERAL_FIELD_MAX_SPAWN_FRAMES
    );
}

function createMineralShape(radius) {
    const pointCount = 7;
    const points = [];
    for (let index = 0; index < pointCount; index += 1) {
        const angle = (Math.PI * 2 * index) / pointCount;
        const distance = radius * randomBetween(0.72, 1.12);
        points.push({
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance
        });
    }
    return points;
}

function createMineralField() {
    const startEdge = pickRandomScreenEdge();
    const exitEdge = getOppositeEdge(startEdge);
    const radius = (MINERAL_PARTICLE_SIZE * 0.5) * gameplayProfile.entityScale;
    const spawnOffset = radius * 3.2;
    const startPoint = getEdgePoint(startEdge, spawnOffset);
    const endPoint = getEdgePoint(exitEdge, spawnOffset);
    const baseAngle = Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x);
    const speed = Math.min(
        MINERAL_FIELD_SPEED_CAP,
        MINERAL_FIELD_BASE_SPEED + Math.max(0, wave - 3) * MINERAL_FIELD_WAVE_SPEED_STEP
    ) * gameplayProfile.movementScale;
    const count = Math.floor(randomBetween(20, 31));
    const particles = [];
    const alongX = Math.cos(baseAngle);
    const alongY = Math.sin(baseAngle);

    for (let index = 0; index < count; index += 1) {
        const headingOffset = randomBetween(-0.22, 0.22);
        const heading = baseAngle + headingOffset;
        const speedVariance = randomBetween(0.88, 1.14);
        const particleSpeed = speed * speedVariance;
        const vx = Math.cos(heading) * particleSpeed + randomBetween(-0.08, 0.08) * gameplayProfile.movementScale;
        const vy = Math.sin(heading) * particleSpeed + randomBetween(-0.08, 0.08) * gameplayProfile.movementScale;

        particles.push({
            x: startPoint.x + randomBetween(-16, 16) * gameplayProfile.entityScale,
            y: startPoint.y + randomBetween(-16, 16) * gameplayProfile.entityScale,
            vx,
            vy,
            radius,
            angle: randomBetween(0, Math.PI * 2),
            rotation: randomBetween(-0.09, 0.09),
            colorPhase: randomBetween(0, 90),
            points: createMineralShape(radius)
        });
    }

    return {
        startEdge,
        exitEdge,
        enteredPlayfield: false,
        colorTimer: 0,
        particles
    };
}

function spawnMineralField() {
    if (wave < 3 || mineralField || gameState !== "playing") {
        return;
    }

    mineralField = createMineralField();
    showBossAlert("MINERAL FIELD", 140);
}

function collectMineralParticle(index) {
    const mineral = mineralField?.particles[index];
    if (!mineral) {
        return;
    }

    mineralField.particles.splice(index, 1);
    addScore(MINERAL_TOUCH_SCORE);
    showBonusAward(MINERAL_TOUCH_SCORE, "MINERAL");
    playMineralPickupRiff();
    triggerFlash(PALETTE.mineralPickup, 0.1);
    createLineBurst(ship.x, ship.y, PALETTE.mineralPickup, 8, 0.7, 1.9, 10, 22);
}

function createThreatBomb() {
    const startEdge = pickRandomScreenEdge();
    const exitEdge = getOppositeEdge(startEdge);
    const radius = THREAT_BOMB_BASE_RADIUS * gameplayProfile.entityScale;
    const spawnOffset = radius * 2.6;
    const startPoint = getEdgePoint(startEdge, spawnOffset);
    const endPoint = getEdgePoint(exitEdge, spawnOffset);
    const angle = Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x);
    const chaos = Math.min(1.75, Math.max(0, (wave - 3) * 0.075));
    const speed = (THREAT_BOMB_BASE_SPEED + chaos * 0.65) * gameplayProfile.movementScale;

    const blinkTimer = randomBetween(0, 50);
    const initialBlinkPhase = Math.floor(blinkTimer / 10) % 2;
    const courseShiftTimer = randomBetween(COURSE_SHIFT_INTERVAL_MIN_FRAMES, COURSE_SHIFT_INTERVAL_MAX_FRAMES);

    return {
        x: startPoint.x,
        y: startPoint.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius,
        startEdge,
        exitEdge,
        enteredPlayfield: false,
        blinkTimer,
        lastBlinkPhase: initialBlinkPhase,
        courseShiftTimer
    };
}

function spawnThreatBomb() {
    if (wave < 3 || threatBomb || gameState !== "playing") {
        return;
    }

    threatBomb = createThreatBomb();
    showBossAlert("THREAT BOMB", 150);
}

function isEntityOnScreen(entity) {
    if (!entity) {
        return false;
    }

    const radius = Number.isFinite(entity.radius) ? Math.max(0, entity.radius) : 0;
    return (
        entity.x + radius >= 0
        && entity.x - radius <= canvas.width
        && entity.y + radius >= 0
        && entity.y - radius <= canvas.height
    );
}

function getThreatBombSweepScore() {
    let sweepScore = 0;
    let sweepCount = 0;

    for (const asteroid of asteroids) {
        if (!isEntityOnScreen(asteroid)) {
            continue;
        }
        const asteroidScore = asteroid.isTitan
            ? TITAN_BOSS_SCORE_VALUE
            : ASTEROID_SCORES[asteroid.sizeIndex] + asteroid.scoreBonus;
        sweepScore += Math.max(0, asteroidScore);
        sweepCount += 1;
    }

    for (const ufo of ufos) {
        if (!isEntityOnScreen(ufo)) {
            continue;
        }
        sweepScore += Math.max(0, ufo.scoreValue || 0);
        sweepCount += 1;
    }

    for (const decoy of decoys) {
        if (!isEntityOnScreen(decoy)) {
            continue;
        }
        sweepScore += DECOY_SWEEP_SCORE_VALUE;
        sweepCount += 1;
    }

    return { sweepScore, sweepCount };
}

function detonateThreatBomb() {
    if (!threatBomb) {
        return;
    }

    createLineBurst(threatBomb.x, threatBomb.y, PALETTE.enemyShot, 36, 1.5, 5.2, 20, 66);
    const { sweepScore, sweepCount } = getThreatBombSweepScore();
    const awardedPoints = registerKillScore(THREAT_BOMB_SCORE_VALUE + sweepScore);
    showBonusAward(awardedPoints, `BOMB SWEEP x${sweepCount + 1}`);
    playEffect("asteroidHit");
    addScreenShake(22, 34);
    triggerFlash(PALETTE.enemyShot, 0.2);

    for (const asteroid of asteroids) {
        createLineBurst(
            asteroid.x,
            asteroid.y,
            asteroid.strokeColor,
            asteroid.elite ? 24 : 16,
            1.2,
            asteroid.elite ? 4.6 : 3.6,
            18,
            asteroid.elite ? 52 : 44
        );
    }

    while (ufos.length > 0) {
        const ufo = ufos[0];
        createLineBurst(
            ufo.x,
            ufo.y,
            ufo.type === "small" ? PALETTE.enemyShot : PALETTE.ship,
            20,
            1.4,
            4.2,
            20,
            56
        );
        removeUfo(0, false);
    }

    for (const decoy of decoys) {
        createLineBurst(decoy.x, decoy.y, PALETTE.ship, 14, 0.9, 3.1, 14, 36);
    }

    asteroids = [];
    clearTitanChildTracking();
    enemyShots = [];
    playerShots = [];
    decoys = [];
    nextWaveTimer = -1;
    resetCombatMomentum();
    threatBomb = null;
    scheduleThreatBomb();
}

function bounceDynamicCircleOffCircle(mover, obstacle, options = {}) {
    let dx = mover.x - obstacle.x;
    let dy = mover.y - obstacle.y;
    let distance = Math.hypot(dx, dy);

    if (distance < 0.001) {
        const escapeAngle = Math.random() * Math.PI * 2;
        dx = Math.cos(escapeAngle);
        dy = Math.sin(escapeAngle);
        distance = 1;
    }

    const normalX = dx / distance;
    const normalY = dy / distance;
    const overlap = mover.radius + obstacle.radius - distance;

    if (overlap > 0) {
        mover.x += normalX * (overlap + 1.25);
        mover.y += normalY * (overlap + 1.25);
        if (options.pushObstacle) {
            const obstaclePush = Math.max(0, overlap * 0.55);
            obstacle.x -= normalX * obstaclePush;
            obstacle.y -= normalY * obstaclePush;
            wrapEntity(obstacle, obstacle.radius);
        }
    }

    const moverNormalVelocity = mover.vx * normalX + mover.vy * normalY;
    const obstacleNormalVelocity = obstacle.vx * normalX + obstacle.vy * normalY;
    const relativeNormalVelocity = moverNormalVelocity - obstacleNormalVelocity;
    const minimumRebound = (options.minimumRebound || 1) * gameplayProfile.movementScale;
    const reboundVelocity = relativeNormalVelocity < minimumRebound
        ? Math.abs(relativeNormalVelocity) + minimumRebound
        : relativeNormalVelocity;

    mover.vx += (reboundVelocity - relativeNormalVelocity) * normalX + obstacle.vx * 0.03;
    mover.vy += (reboundVelocity - relativeNormalVelocity) * normalY + obstacle.vy * 0.03;

    const moverSpeed = Math.hypot(mover.vx, mover.vy);
    const maxSpeedMultiplier = options.maxSpeedMultiplier || 1.6;
    const moverMaxSpeed = Math.max(1.5, (options.maxSpeed || moverSpeed) * maxSpeedMultiplier);
    if (moverSpeed > moverMaxSpeed) {
        mover.vx = (mover.vx / moverSpeed) * moverMaxSpeed;
        mover.vy = (mover.vy / moverSpeed) * moverMaxSpeed;
    }

    if (options.wrapMover) {
        wrapEntity(mover, mover.radius);
    }
}

function isTouchThrustingActive() {
    return gameState === "playing"
        && !ship.hyperspaceSequence
        && (keys.thrust || mouseThrustActive || touchSteerPointerId !== null);
}

function isTouchPointer(event) {
    return event && (event.pointerType === "touch" || event.pointerType === "pen");
}

function isSteerPointer(event) {
    if (!event) {
        return false;
    }
    if (isTouchPointer(event)) {
        return true;
    }
    return event.pointerType === "mouse" && event.button === 0;
}

function syncMousePointerControls(buttons, point = null) {
    const leftHeld = (buttons & 1) !== 0;
    const rightHeld = (buttons & 2) !== 0;
    mouseSteerActive = leftHeld;
    mouseThrustActive = rightHeld;

    if (mouseSteerActive && point) {
        touchSteerTargetX = point.x;
        touchSteerTargetY = point.y;
    }
}

function getCanvasPointFromPointerEvent(event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = rect.width > 0 ? canvas.width / rect.width : 1;
    const scaleY = rect.height > 0 ? canvas.height / rect.height : 1;
    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
    };
}

function getShortestAngleDelta(currentAngle, targetAngle) {
    return Math.atan2(
        Math.sin(targetAngle - currentAngle),
        Math.cos(targetAngle - currentAngle)
    );
}

function getHelpButtons() {
    const buttonWidth = Math.min(220, Math.max(130, canvas.width * 0.24));
    const buttonHeight = canvas.width < 720 ? 34 : 42;
    const gap = 14;
    const top = canvas.height * 0.2;
    const centerX = canvas.width / 2;
    const controlsX = centerX - buttonWidth - gap * 0.5;
    const elementsX = centerX + gap * 0.5;
    const backWidth = Math.min(160, Math.max(100, canvas.width * 0.18));

    return [
        { id: "controls", label: "CONTROLS", x: controlsX, y: top, width: buttonWidth, height: buttonHeight },
        { id: "elements", label: "ELEMENTS", x: elementsX, y: top, width: buttonWidth, height: buttonHeight },
        {
            id: "menu",
            label: "BACK",
            x: centerX - backWidth * 0.5,
            y: top + buttonHeight + 12,
            width: backWidth,
            height: buttonHeight - 2
        }
    ];
}

function isPointInRect(point, rect) {
    return point.x >= rect.x
        && point.x <= rect.x + rect.width
        && point.y >= rect.y
        && point.y <= rect.y + rect.height;
}

function handleHelpPointerDown(event) {
    if (gameState !== "help") {
        return false;
    }

    const point = getCanvasPointFromPointerEvent(event);
    const buttons = getHelpButtons();
    const controlsButton = buttons.find((button) => button.id === "controls");
    const elementsButton = buttons.find((button) => button.id === "elements");
    const backButton = buttons.find((button) => button.id === "menu");

    if (controlsButton && isPointInRect(point, controlsButton)) {
        helpPage = "controls";
        event.preventDefault();
        return true;
    }

    if (elementsButton && isPointInRect(point, elementsButton)) {
        helpPage = "elements";
        event.preventDefault();
        return true;
    }

    if (helpPage !== "menu" && backButton && isPointInRect(point, backButton)) {
        helpPage = "menu";
        event.preventDefault();
        return true;
    }

    return false;
}

function createUpgradeState() {
    return {
        rapidFire: 0,
        multiShot: 0,
        piercing: 0,
        thrusters: 0,
        maxShields: 0,
        gravityDampers: 0,
        naniteRepair: 0,
        shotRange: 0,
        homing: 0,
        antiGravity: 0
    };
}

function createUpgradeExpirationState() {
    const state = {};
    for (const key of TIMED_POWERUP_KEYS) {
        state[key] = [];
    }
    return state;
}

function syncUpgradeStateFromTimers() {
    const previousMaxShields = upgradeState.maxShields;

    for (const key of TIMED_POWERUP_KEYS) {
        upgradeState[key] = upgradeExpirations[key].length;
    }

    if (!ship) {
        return;
    }

    ship.thrust = 0.12 * gameplayProfile.movementScale * getThrusterMultiplier();
    ship.maxSpeed = SHIP_BASE_MAX_SPEED * gameplayProfile.movementScale * getShipTopSpeedMultiplier();
    ship.shields = Math.min(ship.shields, upgradeState.maxShields);
    if (upgradeState.maxShields > previousMaxShields) {
        ship.shields = upgradeState.maxShields;
    }
    ship.fireCooldown = Math.min(ship.fireCooldown, getPlayerFireCooldown());
}

function pruneExpiredTimedPowerups() {
    let changed = false;
    for (const key of TIMED_POWERUP_KEYS) {
        const stackExpirations = upgradeExpirations[key];
        for (let index = stackExpirations.length - 1; index >= 0; index -= 1) {
            if (stackExpirations[index] <= gameplayFrameClock) {
                stackExpirations.splice(index, 1);
                changed = true;
            }
        }
    }

    if (changed) {
        syncUpgradeStateFromTimers();
    }
}

function addTimedPowerupStack(key, maxStacks = 1, duration = POWERUP_DURATION_FRAMES) {
    const stackExpirations = upgradeExpirations[key];
    if (!stackExpirations) {
        return false;
    }

    pruneExpiredTimedPowerups();

    const expiration = gameplayFrameClock + duration;
    if (stackExpirations.length >= maxStacks) {
        let soonestIndex = 0;
        for (let index = 1; index < stackExpirations.length; index += 1) {
            if (stackExpirations[index] < stackExpirations[soonestIndex]) {
                soonestIndex = index;
            }
        }
        stackExpirations[soonestIndex] = expiration;
    } else {
        stackExpirations.push(expiration);
    }

    syncUpgradeStateFromTimers();
    return true;
}

function consumeTimedPowerupStack(key) {
    const stackExpirations = upgradeExpirations[key];
    if (!stackExpirations || stackExpirations.length === 0) {
        return false;
    }

    let soonestIndex = 0;
    for (let index = 1; index < stackExpirations.length; index += 1) {
        if (stackExpirations[index] < stackExpirations[soonestIndex]) {
            soonestIndex = index;
        }
    }
    stackExpirations.splice(soonestIndex, 1);
    syncUpgradeStateFromTimers();
    return true;
}

function updateTimedPowerups(dt) {
    gameplayFrameClock += dt;
    pruneExpiredTimedPowerups();
    updatePowerupExpiryWarning();
}

function getSoonestTimedPowerupExpiration() {
    let soonestKey = null;
    let soonestRemaining = Infinity;

    for (const key of TIMED_POWERUP_KEYS) {
        const stackExpirations = upgradeExpirations[key];
        if (!stackExpirations || stackExpirations.length === 0) {
            continue;
        }

        for (const expiration of stackExpirations) {
            const remaining = expiration - gameplayFrameClock;
            if (remaining > 0 && remaining < soonestRemaining) {
                soonestRemaining = remaining;
                soonestKey = key;
            }
        }
    }

    if (!soonestKey || !Number.isFinite(soonestRemaining)) {
        return null;
    }

    return {
        key: soonestKey,
        remainingFrames: soonestRemaining
    };
}

function updatePowerupExpiryWarning() {
    const soonest = getSoonestTimedPowerupExpiration();
    if (!soonest || soonest.remainingFrames > POWERUP_EXPIRY_WARNING_FRAMES) {
        powerupExpiryWarning = null;
        shipPowerupWarningBlinkFrames = 0;
        return;
    }

    const secondsRemaining = Math.max(0, soonest.remainingFrames / 60);
    const label = TIMED_POWERUP_LABELS[soonest.key] || "POWER-UP";
    powerupExpiryWarning = {
        key: soonest.key,
        label,
        remainingFrames: soonest.remainingFrames,
        secondsRemaining
    };
    shipPowerupWarningBlinkFrames = soonest.remainingFrames;
}

function getMaxPlayerShots() {
    const baseCap = MAX_PLAYER_SHOTS + upgradeState.rapidFire;
    const twinShotActive = getPlayerProjectileCount() > 1;
    return twinShotActive ? baseCap * 2 : baseCap;
}

function getPlayerFireCooldown() {
    return Math.max(3, PLAYER_FIRE_COOLDOWN * Math.pow(0.82, upgradeState.rapidFire));
}

function getPlayerProjectileCount() {
    return Math.min(4, 1 + upgradeState.multiShot);
}

function getPlayerPierce() {
    return upgradeState.piercing;
}

function getPlayerShotLife() {
    const rangeMultiplier = upgradeState.shotRange > 0 ? PLAYER_SHOT_DISTANCE_MULTIPLIER : 1;
    return PLAYER_SHOT_LIFE * rangeMultiplier;
}

function hasHomingShots() {
    return upgradeState.homing > 0;
}

function hasAntiGravityField() {
    return upgradeState.antiGravity > 0;
}

function getThrusterMultiplier() {
    return Math.pow(1.15, upgradeState.thrusters);
}

function getShipTopSpeedMultiplier() {
    return Math.pow(1.1, upgradeState.thrusters);
}

function shouldOfferUpgrade() {
    return wave >= UPGRADE_INTERVAL_WAVES && wave % UPGRADE_INTERVAL_WAVES === 0 && wave !== lastUpgradeWave;
}

function getGravityWaveSteps() {
    const rawSteps = godModeEnabled
        ? Math.max(gravityDebugWaveFloor, Math.max(0, wave - 1))
        : Math.max(0, wave - 1);
    return Math.min(LARGE_ASTEROID_GRAVITY_MAX_STEPS, rawSteps);
}

function getEffectiveGravitySteps() {
    return Math.max(0, getGravityWaveSteps() - upgradeState.gravityDampers);
}

function getHyperspaceFailureChance() {
    return Math.min(
        HYPERSPACE_FAILURE_CHANCE_CAP,
        Math.max(0, hyperspaceUsesThisWave - 1) * HYPERSPACE_FAILURE_CHANCE_PER_EXTRA_USE
    );
}

function addScreenShake(intensity, frames) {
    screenShakeIntensity = Math.max(screenShakeIntensity, intensity);
    screenShakeFrames = Math.max(screenShakeFrames, frames);
}

function triggerFlash(color, amount) {
    flashColor = color;
    flashAlpha = Math.max(flashAlpha, amount);
}

function registerKillScore(basePoints) {
    comboCount = comboTimer > 0 ? comboCount + 1 : 1;
    comboTimer = 110;
    comboDisplayTimer = comboCount > 1 ? 85 : 0;
    const comboBonus = comboCount > 1 ? (comboCount - 1) * 10 : 0;
    const surgeMultiplier = surgeActive ? THREAT_SURGE_SCORE_MULTIPLIER : 1;
    const awardedPoints = (basePoints + comboBonus) * surgeMultiplier;
    addScore(awardedPoints);
    return awardedPoints;
}

function showBonusAward(points, label = "BONUS") {
    bonusBannerText = `${label} +${Math.max(0, Math.round(points))}`;
    bonusBannerTimer = 105;
}

function resetTitanChildTracking() {
    titanChildBatchSerial = 0;
    activeTitanChildBatchIds = new Set();
}

function clearTitanChildTracking() {
    activeTitanChildBatchIds.clear();
}

function maybeFinalizeTitanChildBatch(batchId) {
    if (batchId === null || batchId === undefined) {
        return;
    }

    if (!activeTitanChildBatchIds.has(batchId)) {
        return;
    }

    const hasRemainingChildren = asteroids.some((asteroid) => asteroid.titanChildBatchId === batchId);
    if (hasRemainingChildren) {
        return;
    }

    activeTitanChildBatchIds.delete(batchId);
    addScore(TITAN_CHILD_CLEAR_BONUS);
    showBonusAward(TITAN_CHILD_CLEAR_BONUS, "TITAN SWEEP BONUS");
    playEffect("gameBonus");
}

function resetCombatMomentum() {
    comboCount = 0;
    comboTimer = 0;
    comboDisplayTimer = 0;
}

function updateFeedback(dt) {
    if (screenShakeFrames > 0) {
        screenShakeFrames = Math.max(0, screenShakeFrames - dt);
        if (screenShakeFrames === 0) {
            screenShakeIntensity = 0;
        } else {
            screenShakeIntensity *= 0.94;
        }
    }

    flashAlpha = Math.max(0, flashAlpha - 0.025 * dt);

    if (comboTimer > 0) {
        comboTimer = Math.max(0, comboTimer - dt);
        if (comboTimer === 0) {
            comboCount = 0;
        }
    }

    if (comboDisplayTimer > 0) {
        comboDisplayTimer = Math.max(0, comboDisplayTimer - dt);
    }

    if (bonusBannerTimer > 0) {
        bonusBannerTimer = Math.max(0, bonusBannerTimer - dt);
        if (bonusBannerTimer === 0) {
            bonusBannerText = "";
        }
    }
}

function getScreenShakeOffset() {
    if (screenShakeFrames <= 0 || screenShakeIntensity <= 0.1) {
        return { x: 0, y: 0 };
    }

    return {
        x: randomBetween(-screenShakeIntensity, screenShakeIntensity),
        y: randomBetween(-screenShakeIntensity, screenShakeIntensity)
    };
}

function getUpgradePool(includeUnavailable = false) {
    pruneExpiredTimedPowerups();
    const upgrades = [
        {
            id: "rapid-fire",
            title: "Rapid Fire",
            description: "Fire faster and keep one more shot on screen for 30s.",
            timed: true,
            canOffer: () => upgradeState.rapidFire < TIMED_POWERUP_MAX_STACKS.rapidFire,
            apply: () => {
                addTimedPowerupStack("rapidFire", TIMED_POWERUP_MAX_STACKS.rapidFire);
            }
        },
        {
            id: "twin-cannons",
            title: "Twin Cannons",
            description: "Add another projectile to every shot for 30s.",
            timed: true,
            canOffer: () => upgradeState.multiShot < TIMED_POWERUP_MAX_STACKS.multiShot,
            apply: () => {
                addTimedPowerupStack("multiShot", TIMED_POWERUP_MAX_STACKS.multiShot);
            }
        },
        {
            id: "piercing-rounds",
            title: "Piercing Rounds",
            description: "Shots punch through one extra target for 30s.",
            timed: true,
            canOffer: () => upgradeState.piercing < TIMED_POWERUP_MAX_STACKS.piercing,
            apply: () => {
                addTimedPowerupStack("piercing", TIMED_POWERUP_MAX_STACKS.piercing);
            }
        },
        {
            id: "overdrive-thrusters",
            title: "Overdrive",
            description: "More thrust and higher top speed for 30s.",
            timed: true,
            canOffer: () => upgradeState.thrusters < TIMED_POWERUP_MAX_STACKS.thrusters,
            apply: () => {
                addTimedPowerupStack("thrusters", TIMED_POWERUP_MAX_STACKS.thrusters);
            }
        },
        {
            id: "shield-matrix",
            title: "Shield Matrix",
            description: "Gain a shield layer and refill now for 30s.",
            timed: true,
            canOffer: () => upgradeState.maxShields < TIMED_POWERUP_MAX_STACKS.maxShields,
            apply: () => {
                addTimedPowerupStack("maxShields", TIMED_POWERUP_MAX_STACKS.maxShields);
                ship.shields = upgradeState.maxShields;
                triggerFlash(PALETTE.shield, 0.16);
            }
        },
        {
            id: "grav-dampers",
            title: "Grav Dampers",
            description: "Reduce large-asteroid gravity by one step for 30s.",
            timed: true,
            alwaysOffer: () => getEffectiveGravitySteps() > 0,
            canOffer: () => getEffectiveGravitySteps() > 0
                && upgradeState.gravityDampers < TIMED_POWERUP_MAX_STACKS.gravityDampers,
            apply: () => {
                addTimedPowerupStack("gravityDampers", TIMED_POWERUP_MAX_STACKS.gravityDampers);
                triggerFlash(PALETTE.shield, 0.12);
            }
        },
        {
            id: "nanite-repair",
            title: "Nanite Repair",
            description: "For 30s, a lethal hit is negated once.",
            timed: true,
            canOffer: () => upgradeState.naniteRepair < TIMED_POWERUP_MAX_STACKS.naniteRepair,
            apply: () => {
                addTimedPowerupStack("naniteRepair", TIMED_POWERUP_MAX_STACKS.naniteRepair);
                ship.shields = upgradeState.maxShields;
                triggerFlash(PALETTE.shield, 0.2);
            }
        },
        {
            id: "range-lenses",
            title: "Range Lenses",
            description: "Double laser travel distance for 30s.",
            timed: true,
            canOffer: () => upgradeState.shotRange < TIMED_POWERUP_MAX_STACKS.shotRange,
            apply: () => {
                addTimedPowerupStack("shotRange", TIMED_POWERUP_MAX_STACKS.shotRange);
            }
        },
        {
            id: "seeker-array",
            title: "Seeker Array",
            description: "Lasers home toward the nearest asteroid for 10s.",
            timed: true,
            durationSeconds: SEEKER_ARRAY_DURATION_SECONDS,
            canOffer: () => upgradeState.homing < TIMED_POWERUP_MAX_STACKS.homing,
            apply: () => {
                addTimedPowerupStack("homing", TIMED_POWERUP_MAX_STACKS.homing, SEEKER_ARRAY_DURATION_FRAMES);
            }
        },
        {
            id: "anti-gravity-field",
            title: "Anti-Gravity",
            description: "Repel incoming objects and prevent collisions for 30s.",
            timed: true,
            canOffer: () => upgradeState.antiGravity < TIMED_POWERUP_MAX_STACKS.antiGravity,
            apply: () => {
                addTimedPowerupStack("antiGravity", TIMED_POWERUP_MAX_STACKS.antiGravity);
                triggerFlash(PALETTE.antiGravity, 0.16);
            }
        }
    ];

    if (includeUnavailable) {
        return upgrades;
    }

    return upgrades.filter((upgrade) => upgrade.canOffer());
}

function buildUpgradeChoices() {
    const pool = getUpgradePool();
    const picks = [];
    const guaranteedChoices = pool.filter((upgrade) => {
        if (typeof upgrade.alwaysOffer === "function") {
            return upgrade.alwaysOffer();
        }
        return Boolean(upgrade.alwaysOffer);
    });

    for (const upgrade of guaranteedChoices) {
        if (picks.length >= UPGRADE_CHOICE_COUNT) {
            break;
        }

        picks.push(upgrade);
        const poolIndex = pool.indexOf(upgrade);
        if (poolIndex >= 0) {
            pool.splice(poolIndex, 1);
        }
    }

    while (pool.length > 0 && picks.length < UPGRADE_CHOICE_COUNT) {
        const index = Math.floor(Math.random() * pool.length);
        picks.push(pool.splice(index, 1)[0]);
    }

    return picks;
}

function getUpgradeKeyboardHint() {
    const maxKeyboardIndex = Math.min(9, upgradeChoices.length);
    if (maxKeyboardIndex <= 0) {
        return "Tap a card to apply it.";
    }
    if (maxKeyboardIndex === 1) {
        return "Keyboard: 1 or tap a card.";
    }
    if (maxKeyboardIndex <= 3) {
        const keys = Array.from({ length: maxKeyboardIndex }, (_, index) => String(index + 1)).join(", ");
        return `Keyboard: ${keys} or tap a card.`;
    }
    return `Keyboard: 1-${maxKeyboardIndex} or tap a card.`;
}

function renderUpgradeChoices() {
    if (!upgradeChoicesElement) {
        return;
    }

    upgradeChoicesElement.innerHTML = "";

    upgradeChoices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "upgrade-card";
        button.dataset.index = String(index);
        button.innerHTML = `
            <span class="upgrade-index">${index + 1}</span>
            <div class="upgrade-name">${choice.title}</div>
            <div class="upgrade-desc">${choice.description}</div>
        `;
        upgradeChoicesElement.appendChild(button);
    });

    if (upgradeSubtitle) {
        const modeLabel = upgradeDraftMode === "god"
            ? "God Mode Draft: choose any available power-up."
            : "Pick one to reshape the run.";
        upgradeSubtitle.textContent = `${modeLabel} ${getUpgradeKeyboardHint()}`;
    }
}

function syncUpgradeOverlay() {
    if (!upgradeOverlay) {
        return;
    }

    const visible = gameState === "upgrade";
    upgradeOverlay.dataset.visible = visible ? "true" : "false";
    upgradeOverlay.setAttribute("aria-hidden", visible ? "false" : "true");
}

function syncAboutOverlay() {
    const visible = gameState === "about";

    if (aboutOverlay) {
        aboutOverlay.dataset.visible = visible ? "true" : "false";
        aboutOverlay.setAttribute("aria-hidden", visible ? "false" : "true");
    }

    if (aboutButton) {
        aboutButton.dataset.active = visible ? "true" : "false";
        aboutButton.setAttribute("aria-pressed", visible ? "true" : "false");
    }
}

function openUpgradeDraft() {
    upgradeDraftMode = "wave";
    upgradeReturnState = "playing";
    upgradeChoices = buildUpgradeChoices();
    if (upgradeChoices.length === 0) {
        lastUpgradeWave = wave;
        spawnWave();
        return;
    }

    gameState = "upgrade";
    lastUpgradeWave = wave;
    clearInputState();
    renderUpgradeChoices();
    syncUpgradeOverlay();
}

function chooseUpgrade(index) {
    const choice = upgradeChoices[index];
    if (!choice || gameState !== "upgrade") {
        return;
    }

    choice.apply();
    playEffect("gameBonus");
    const choiceDurationSeconds = Number.isFinite(choice.durationSeconds)
        ? choice.durationSeconds
        : POWERUP_DURATION_SECONDS;
    const choiceLabel = choice.timed
        ? `${choice.title.toUpperCase()} ${choiceDurationSeconds}s`
        : choice.title.toUpperCase();
    showBossAlert(choiceLabel, 120);
    upgradeChoices = [];
    syncUpgradeOverlay();

    if (upgradeDraftMode === "god") {
        gameState = upgradeReturnState === "paused" ? "paused" : "playing";
        upgradeDraftMode = "wave";
        upgradeReturnState = "playing";
        syncControlSurface();
        return;
    }

    gameState = "playing";
    spawnWave();
}

function showBossAlert(message, frames = BOSS_ALERT_FRAMES) {
    bossAlertMessage = message;
    bossAlertTimer = frames;
}

function startThreatSurge() {
    surgeActive = true;
    surgeTimer = THREAT_SURGE_DURATION_FRAMES;
    showBossAlert(`THREAT SURGE X${THREAT_SURGE_SCORE_MULTIPLIER}`, 165);
    triggerFlash(PALETTE.enemyShot, 0.12);
}

function endThreatSurge() {
    if (!surgeActive) {
        return;
    }

    surgeActive = false;
    surgeTimer = 0;
    showBossAlert("SURGE ENDED", 105);
}

function updateThreatSurge(dt) {
    if (!surgeActive) {
        return;
    }

    surgeTimer = Math.max(0, surgeTimer - dt);
    if (surgeTimer <= 0) {
        endThreatSurge();
    }
}

function stopAllSoundEffects() {
    Object.keys(sounds).forEach((soundKey) => {
        if (soundKey !== "gameMusic") {
            stopLoop(soundKey);
        }
    });
}

function toggleSoundEnabled() {
    soundEnabled = !soundEnabled;
    syncAudioElementMuteState();
    if (!soundEnabled) {
        stopAllSoundEffects();
    } else {
        primeLoopAudioContext();
        syncAmbientSounds();
        playEffect("gameBonus");
    }
    saveAudioSettings();
    showBossAlert(soundEnabled ? "SOUND ON" : "SOUND OFF", 120);
}

function toggleMusicEnabled() {
    musicEnabled = !musicEnabled;
    syncAudioElementMuteState();
    if (!musicEnabled) {
        stopLoop("gameMusic");
    } else {
        primeLoopAudioContext();
        syncAmbientSounds();
    }
    saveAudioSettings();
    showBossAlert(musicEnabled ? "MUSIC ON" : "MUSIC OFF", 120);
}

function toggleGodMode() {
    godModeEnabled = !godModeEnabled;
    if (!godModeEnabled) {
        gravityDebugWaveFloor = 0;
    }
    clearInputState();
    triggerFlash(godModeEnabled ? PALETTE.shield : PALETTE.hudAccent, GOD_MODE_BOUNCE_FLASH);
    showBossAlert(godModeEnabled ? "GOD MODE ON" : "GOD MODE OFF", 135);
}

function createShip(invulnerableFrames = SHIP_INVULNERABLE_FRAMES) {
    return {
        x: canvas.width / 2,
        y: canvas.height / 2,
        angle: 0,
        vx: 0,
        vy: 0,
        radius: 12 * gameplayProfile.entityScale,
        modelScale: gameplayProfile.entityScale,
        thrust: 0.12 * gameplayProfile.movementScale * getThrusterMultiplier(),
        friction: 0.992,
        rotationSpeed: 0.085,
        maxSpeed: SHIP_BASE_MAX_SPEED * gameplayProfile.movementScale * getShipTopSpeedMultiplier(),
        active: true,
        invulnerable: invulnerableFrames,
        respawnTimer: 0,
        fireCooldown: 0,
        hyperspaceCooldown: 0,
        hyperspaceSequence: null,
        shields: upgradeState.maxShields
    };
}

function resizeCanvas() {
    const previousProfile = { ...gameplayProfile };
    const previousIsMobilePhoneUI = isMobilePhoneUI;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.imageSmoothingEnabled = false;
    buildStarfield();
    isMobilePhoneUI = detectMobilePhoneUI();
    gameplayProfile = buildGameplayProfile();

    if (
        previousProfile.entityScale !== gameplayProfile.entityScale
        || previousProfile.movementScale !== gameplayProfile.movementScale
        || previousProfile.shotScale !== gameplayProfile.shotScale
    ) {
        if (gameState === "waiting" || gameState === "gameOver") {
            ship = createShip(0);
        } else {
            applyGameplayProfile(previousProfile, gameplayProfile, previousIsMobilePhoneUI, isMobilePhoneUI);
        }
    }

    if (gameState === "waiting" || gameState === "gameOver") {
        ship.x = canvas.width / 2;
        ship.y = canvas.height / 2 + 72 * gameplayProfile.entityScale;
    }

    ship.x = Math.min(Math.max(ship.x, 0), canvas.width);
    ship.y = Math.min(Math.max(ship.y, 0), canvas.height);
    syncControlSurface();
}

function buildStarfield() {
    const starCount = Math.max(45, Math.floor((canvas.width * canvas.height) / 22000));
    stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() > 0.85 ? 2 : 1,
        alpha: randomBetween(0.3, 0.95),
        color: PALETTE.starColors[Math.floor(Math.random() * PALETTE.starColors.length)],
        twinkleSpeed: randomBetween(0.16, 0.42),
        phase: randomBetween(0, Math.PI * 2)
    }));
}

function detectMobilePhoneUI() {
    const userAgent = navigator.userAgent || "";
    const hasMobileUserAgent = /Android|iPhone|iPod|Windows Phone|Mobile/i.test(userAgent);
    const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;
    const shortestSide = Math.min(window.innerWidth, window.innerHeight);
    const longestSide = Math.max(window.innerWidth, window.innerHeight);
    const phoneSizedViewport = shortestSide <= 540 && longestSide <= 1024;
    const tabletSizedViewport = shortestSide <= 1024 && longestSide <= TOUCH_UI_MAX_LONGEST_SIDE;
    return hasCoarsePointer && (hasMobileUserAgent || phoneSizedViewport || tabletSizedViewport);
}

function getAsteroidRadiusMultiplier(useMobileProfile = isMobilePhoneUI) {
    return useMobileProfile ? 1 : DESKTOP_ASTEROID_RADIUS_MULTIPLIER;
}

function buildGameplayProfile() {
    if (!isMobilePhoneUI) {
        return { ...DEFAULT_GAMEPLAY_PROFILE };
    }

    const playableArea = Math.max(1, window.innerWidth * window.innerHeight);
    const referenceArea = MOBILE_REFERENCE_WIDTH * MOBILE_REFERENCE_HEIGHT;
    const areaRatio = playableArea / referenceArea;

    // Use area as the source of truth, but temper the response so small phones
    // remain readable and playable instead of shrinking too aggressively.
    const areaScale = Math.max(0.68, Math.min(1, Math.pow(areaRatio, 0.35)));
    const shortestSide = Math.min(window.innerWidth, window.innerHeight);
    const tabletBlend = Math.max(
        0,
        Math.min(
            1,
            (shortestSide - TABLET_PROFILE_BLEND_START) / (TABLET_PROFILE_BLEND_END - TABLET_PROFILE_BLEND_START)
        )
    );
    const entityBase = MOBILE_REFERENCE_ENTITY_SCALE + (1 - MOBILE_REFERENCE_ENTITY_SCALE) * tabletBlend * 0.65;
    const movementBase = MOBILE_REFERENCE_MOVEMENT_SCALE + (1 - MOBILE_REFERENCE_MOVEMENT_SCALE) * tabletBlend * 0.55;
    const shotBase = MOBILE_REFERENCE_SHOT_SCALE + (1 - MOBILE_REFERENCE_SHOT_SCALE) * tabletBlend * 0.4;
    const entityScale = Math.min(1, entityBase * areaScale);
    const movementScale = Math.min(1, movementBase * areaScale);
    const shotScale = Math.min(1, shotBase * areaScale);

    return {
        entityScale,
        movementScale,
        shotScale
    };
}

function applyGameplayProfile(previousProfile, nextProfile, previousIsMobileProfile = isMobilePhoneUI, nextIsMobileProfile = isMobilePhoneUI) {
    const radiusRatio = nextProfile.entityScale / previousProfile.entityScale;
    const asteroidRadiusRatio = (
        (nextProfile.entityScale * getAsteroidRadiusMultiplier(nextIsMobileProfile))
        / (previousProfile.entityScale * getAsteroidRadiusMultiplier(previousIsMobileProfile))
    );
    const movementRatio = nextProfile.movementScale / previousProfile.movementScale;
    const shotRatio = nextProfile.shotScale / previousProfile.shotScale;

    ship.radius *= radiusRatio;
    ship.modelScale *= radiusRatio;
    ship.thrust *= movementRatio;
    ship.maxSpeed *= movementRatio;
    ship.vx *= movementRatio;
    ship.vy *= movementRatio;

    for (const asteroid of asteroids) {
        asteroid.radius *= asteroidRadiusRatio;
        asteroid.vx *= movementRatio;
        asteroid.vy *= movementRatio;
        asteroid.points = asteroid.points.map((point) => ({
            x: point.x * asteroidRadiusRatio,
            y: point.y * asteroidRadiusRatio
        }));
        asteroid.largeVisualTextureDirty = true;
    }

    for (const ufo of ufos) {
        ufo.radius *= radiusRatio;
        ufo.vx *= movementRatio;
        ufo.vy *= movementRatio;
    }

    for (const decoy of decoys) {
        decoy.radius *= radiusRatio;
        decoy.modelScale *= radiusRatio;
        decoy.vx *= movementRatio;
        decoy.vy *= movementRatio;
    }

    for (const shot of playerShots) {
        shot.radius *= radiusRatio;
        shot.vx *= shotRatio;
        shot.vy *= shotRatio;
    }

    for (const shot of enemyShots) {
        shot.radius *= radiusRatio;
        shot.vx *= shotRatio;
        shot.vy *= shotRatio;
    }

    if (threatBomb) {
        threatBomb.radius *= radiusRatio;
        threatBomb.vx *= movementRatio;
        threatBomb.vy *= movementRatio;
    }

    if (mineralField) {
        for (const mineral of mineralField.particles) {
            mineral.radius *= radiusRatio;
            mineral.vx *= movementRatio;
            mineral.vy *= movementRatio;
            mineral.points = mineral.points.map((point) => ({
                x: point.x * radiusRatio,
                y: point.y * radiusRatio
            }));
        }
    }
}

function syncControlSurface() {
    const showMobileControls = isMobilePhoneUI
        && (gameState === "playing" || gameState === "waiting" || gameState === "gameOver");
    const showStartButton = isMobilePhoneUI
        && (gameState === "waiting" || gameState === "gameOver");
    const showPauseButton = isMobilePhoneUI
        && gameState !== "waiting"
        && gameState !== "gameOver"
        && gameState !== "upgrade"
        && gameState !== "about"
        && gameState !== "help";
    const showAboutButton = isMobilePhoneUI
        && gameState !== "upgrade"
        && gameState !== "about"
        && gameState !== "help";

    if (mobileControls) {
        mobileControls.dataset.visible = showMobileControls ? "true" : "false";
        mobileControls.setAttribute("aria-hidden", showMobileControls ? "false" : "true");
    }

    if (mobilePauseButton) {
        mobilePauseButton.dataset.visible = showPauseButton ? "true" : "false";
        mobilePauseButton.setAttribute("aria-hidden", showPauseButton ? "false" : "true");
        mobilePauseButton.dataset.active = gameState === "paused" ? "true" : "false";
    }

    if (mobileStartButton) {
        mobileStartButton.dataset.visible = showStartButton ? "true" : "false";
        mobileStartButton.setAttribute("aria-hidden", showStartButton ? "false" : "true");
    }

    if (aboutButton) {
        aboutButton.dataset.visible = showAboutButton ? "true" : "false";
        aboutButton.setAttribute("aria-hidden", showAboutButton ? "false" : "true");
    }

    for (const button of controlButtons) {
        const action = button.dataset.control;
        button.dataset.active = keys[action] ? "true" : "false";
    }

    updateHudTopInset();
}

function updateHudTopInset() {
    if (!canvas || !isMobilePhoneUI) {
        hudTopInset = 16;
        return;
    }

    const canvasRect = canvas.getBoundingClientRect();
    if (!canvasRect || canvasRect.height <= 0) {
        hudTopInset = 16;
        return;
    }

    let maxBottomInViewport = 0;
    const topHudButtons = [aboutButton, mobilePauseButton];
    for (const button of topHudButtons) {
        if (!button || button.dataset.visible !== "true") {
            continue;
        }
        const rect = button.getBoundingClientRect();
        maxBottomInViewport = Math.max(maxBottomInViewport, rect.bottom - canvasRect.top);
    }

    if (maxBottomInViewport <= 0) {
        hudTopInset = 16;
        return;
    }

    const scaleY = canvas.height / canvasRect.height;
    hudTopInset = Math.max(16, maxBottomInViewport * scaleY + 10 * scaleY);
}

function clearInputState() {
    keys.left = false;
    keys.right = false;
    keys.thrust = false;
    keys.fire = false;
    keys.hyperspace = false;
    touchSteerPointerId = null;
    touchSteerTargetX = 0;
    touchSteerTargetY = 0;
    mouseSteerActive = false;
    mouseThrustActive = false;
}

function resetShip() {
    ship = createShip(SHIP_INVULNERABLE_FRAMES);
}

function scheduleNextUfo() {
    nextUfoSpawnTimer = randomBetween(720, 1320);
}

function startGame() {
    gameState = "playing";
    score = 0;
    lives = 3;
    wave = 0;
    titanWaveCount = 0;
    nextWaveTimer = -1;
    nextExtraLifeScore = EXTRA_LIFE_SCORE;
    bossAlertTimer = 0;
    bossAlertMessage = "";
    surgeActive = false;
    surgeTimer = 0;
    gameplayFrameClock = 0;
    upgradeState = createUpgradeState();
    upgradeExpirations = createUpgradeExpirationState();
    upgradeChoices = [];
    upgradeDraftMode = "wave";
    upgradeReturnState = "playing";
    lastUpgradeWave = 0;
    aboutReturnState = null;
    helpReturnState = null;
    godHelpReturnState = null;
    hyperspaceUsesThisWave = 0;
    screenShakeFrames = 0;
    screenShakeIntensity = 0;
    flashAlpha = 0;
    flashColor = "#ffffff";
    bonusBannerTimer = 0;
    bonusBannerText = "";
    powerupExpiryWarning = null;
    shipPowerupWarningBlinkFrames = 0;
    titanPulseTimer = 0;
    resetTitanChildTracking();
    asteroidSerial = 0;
    activeAsteroidOverlapPairs.clear();
    autoPausedForFocusLoss = false;
    resetCombatMomentum();
    asteroids = [];
    playerShots = [];
    enemyShots = [];
    ufos = [];
    decoys = [];
    threatBomb = null;
    scheduleThreatBomb();
    mineralField = null;
    scheduleMineralField();
    particles = [];
    resetShip();
    scheduleNextUfo();
    spawnWave();
    playEffect("gameStart");
    syncAboutOverlay();
    syncUpgradeOverlay();
}

function pauseGame() {
    if (gameState !== "playing") {
        return;
    }

    gameState = "paused";
    clearInputState();
    pauseAmbientSounds();
}

function resumeGame() {
    if (gameState !== "paused") {
        return;
    }

    gameState = "playing";
}

function togglePause() {
    if (gameState === "playing") {
        autoPausedForFocusLoss = false;
        pauseGame();
    } else if (gameState === "paused") {
        autoPausedForFocusLoss = false;
        resumeGame();
    }
}

function tryAutoResumeAfterFocusReturn() {
    if (!autoPausedForFocusLoss || document.hidden) {
        return;
    }

    if (gameState === "paused") {
        resumeGame();
    }

    autoPausedForFocusLoss = false;
    syncControlSurface();
}

function openAbout() {
    if (gameState === "about") {
        return;
    }

    aboutReturnState = gameState;
    gameState = "about";
    clearInputState();
    pauseAmbientSounds();
    syncAboutOverlay();
    syncUpgradeOverlay();
    syncControlSurface();
}

function closeAbout() {
    if (gameState !== "about") {
        return;
    }

    gameState = aboutReturnState || "waiting";
    aboutReturnState = null;
    clearInputState();
    syncAboutOverlay();
    syncUpgradeOverlay();
    syncControlSurface();
}

function toggleAbout() {
    if (gameState === "about") {
        closeAbout();
    } else {
        openAbout();
    }
}

function openHelp() {
    if (gameState === "help" || gameState === "godHelp" || gameState === "upgrade") {
        return;
    }

    if (gameState === "about") {
        gameState = aboutReturnState || "waiting";
        aboutReturnState = null;
        syncAboutOverlay();
    }

    helpReturnState = gameState;
    gameState = "help";
    helpPage = "menu";
    clearInputState();
    pauseAmbientSounds();
    syncUpgradeOverlay();
    syncControlSurface();
}

function closeHelp() {
    if (gameState !== "help") {
        return;
    }

    gameState = helpReturnState || "waiting";
    helpReturnState = null;
    helpPage = "menu";
    clearInputState();
    syncControlSurface();
}

function toggleHelp() {
    if (gameState === "help") {
        closeHelp();
    } else {
        openHelp();
    }
}

function openGodHelp() {
    if (!godModeEnabled || gameState === "godHelp" || gameState === "upgrade") {
        return;
    }

    if (gameState === "about") {
        gameState = aboutReturnState || "waiting";
        aboutReturnState = null;
        syncAboutOverlay();
    }

    godHelpReturnState = gameState;
    gameState = "godHelp";
    clearInputState();
    pauseAmbientSounds();
    syncUpgradeOverlay();
    syncControlSurface();
}

function closeGodHelp() {
    if (gameState !== "godHelp") {
        return;
    }

    gameState = godHelpReturnState || "waiting";
    godHelpReturnState = null;
    clearInputState();
    syncControlSurface();
}

function toggleGodHelp() {
    if (gameState === "godHelp") {
        closeGodHelp();
    } else {
        openGodHelp();
    }
}

function generateOffscreenPosition(radius) {
    const side = Math.floor(Math.random() * 4);

    if (side === 0) {
        return { x: Math.random() * canvas.width, y: -radius };
    }
    if (side === 1) {
        return { x: canvas.width + radius, y: Math.random() * canvas.height };
    }
    if (side === 2) {
        return { x: Math.random() * canvas.width, y: canvas.height + radius };
    }

    return { x: -radius, y: Math.random() * canvas.height };
}

function generateAsteroidShape(radius) {
    const pointCount = 16;
    const points = [];
    const phaseA = Math.random() * Math.PI * 2;
    const phaseB = Math.random() * Math.PI * 2;

    for (let index = 0; index < pointCount; index += 1) {
        const angle = (Math.PI * 2 * index) / pointCount;
        const primaryWave = Math.sin(angle * 2 + phaseA) * 0.05;
        const secondaryWave = Math.sin(angle * 3 + phaseB) * 0.025;
        const grain = randomBetween(-0.018, 0.018);
        const surfaceOffset = primaryWave + secondaryWave + grain;
        const distance = radius * Math.max(0.88, Math.min(1.12, 1 + surfaceOffset));
        points.push({
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance
        });
    }

    return points;
}

function traceAsteroidPath(context, points) {
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    for (let index = 1; index < points.length; index += 1) {
        context.lineTo(points[index].x, points[index].y);
    }
    context.closePath();
}

function canUseLargeAsteroidVisuals() {
    return LARGE_ASTEROID_VISUALS_ENABLED && (!isMobilePhoneUI || LARGE_ASTEROID_VISUALS_ON_MOBILE);
}

function getAsteroidTextureCollectionStyle(sizeIndex) {
    if (Number.isFinite(sizeIndex) && sizeIndex >= 0 && sizeIndex < ASTEROID_TEXTURE_COLLECTION_BY_SIZE.length) {
        return ASTEROID_TEXTURE_COLLECTION_BY_SIZE[sizeIndex];
    }
    return ASTEROID_TEXTURE_COLLECTION_BY_SIZE[0];
}

function getAsteroidSurfaceTexture(index) {
    if (!Number.isFinite(index) || asteroidSurfacePhotos.length === 0) {
        return null;
    }
    const normalizedIndex = Math.max(0, Math.min(asteroidSurfacePhotos.length - 1, Math.floor(index)));
    const surface = asteroidSurfacePhotos[normalizedIndex];
    if (!surface || !surface.ready || !surface.image.naturalWidth || !surface.image.naturalHeight) {
        return null;
    }
    return surface;
}

function buildLargeAsteroidTexture(asteroid) {
    const isTitanAsteroid = asteroid.isTitan === true;
    const isLargeAsteroid = asteroid.sizeIndex === 0;
    const minTextureSize = isTitanAsteroid
        ? Math.max(220, Math.round(asteroid.radius * 2.2))
        : (
            isLargeAsteroid
                ? LARGE_ASTEROID_TEXTURE_MIN_SIZE
                : Math.max(40, Math.round(asteroid.radius * 1.9))
        );
    const maxTextureSize = isTitanAsteroid
        ? Math.max(minTextureSize, Math.min(1024, Math.round(asteroid.radius * 2.7)))
        : (
            isLargeAsteroid
                ? LARGE_ASTEROID_TEXTURE_MAX_SIZE
                : Math.max(92, Math.round(asteroid.radius * 2.5))
        );
    const textureSize = Math.max(
        minTextureSize,
        Math.min(maxTextureSize, Math.round(asteroid.radius * 2.55))
    );
    const textureCanvas = document.createElement("canvas");
    textureCanvas.width = textureSize;
    textureCanvas.height = textureSize;
    const textureCtx = textureCanvas.getContext("2d");
    if (!textureCtx) {
        return null;
    }

    const drawRadius = textureSize * 0.41;
    const scale = drawRadius / asteroid.radius;
    const textureStyle = getAsteroidTextureCollectionStyle(asteroid.sizeIndex);
    textureCtx.save();
    textureCtx.translate(textureSize / 2, textureSize / 2);
    textureCtx.scale(scale, scale);

    traceAsteroidPath(textureCtx, asteroid.points);
    textureCtx.clip();

    // Opaque base coat prevents visual see-through when asteroids overlap.
    textureCtx.fillStyle = asteroid.solidFillColor || "rgb(104, 84, 70)";
    textureCtx.fillRect(-asteroid.radius * 1.6, -asteroid.radius * 1.6, asteroid.radius * 3.2, asteroid.radius * 3.2);

    const sampledSurface = getAsteroidSurfaceTexture(asteroid.surfaceTextureIndex);
    if (sampledSurface) {
        const image = sampledSurface.image;
        const crop = sampledSurface.crop || { x: 0, y: 0, w: 1, h: 1 };
        const sx = Math.max(0, Math.floor(image.naturalWidth * crop.x));
        const sy = Math.max(0, Math.floor(image.naturalHeight * crop.y));
        const sw = Math.max(1, Math.floor(image.naturalWidth * crop.w));
        const sh = Math.max(1, Math.floor(image.naturalHeight * crop.h));
        textureCtx.imageSmoothingEnabled = true;
        textureCtx.globalAlpha = 0.98;
        textureCtx.drawImage(
            image,
            sx,
            sy,
            sw,
            sh,
            -asteroid.radius * 1.55,
            -asteroid.radius * 1.55,
            asteroid.radius * 3.1,
            asteroid.radius * 3.1
        );
        textureCtx.globalAlpha = 1;

        const surfaceLight = textureCtx.createRadialGradient(
            -asteroid.radius * 0.22,
            -asteroid.radius * 0.32,
            asteroid.radius * 0.1,
            asteroid.radius * 0.06,
            asteroid.radius * 0.1,
            asteroid.radius * 1.38
        );
        surfaceLight.addColorStop(0, "rgba(255, 255, 255, 0.24)");
        surfaceLight.addColorStop(0.5, "rgba(255, 255, 255, 0.03)");
        surfaceLight.addColorStop(1, "rgba(0, 0, 0, 0.24)");
        textureCtx.fillStyle = surfaceLight;
        textureCtx.fillRect(-asteroid.radius * 1.55, -asteroid.radius * 1.55, asteroid.radius * 3.1, asteroid.radius * 3.1);
    } else {
        const bodyGradient = textureCtx.createRadialGradient(
            -asteroid.radius * 0.28,
            -asteroid.radius * 0.35,
            asteroid.radius * 0.18,
            asteroid.radius * 0.05,
            asteroid.radius * 0.12,
            asteroid.radius * 1.35
        );
        bodyGradient.addColorStop(0, textureStyle.highlight);
        bodyGradient.addColorStop(0.5, textureStyle.mid);
        bodyGradient.addColorStop(1, textureStyle.shadow);
        textureCtx.fillStyle = bodyGradient;
        textureCtx.fillRect(-asteroid.radius * 1.55, -asteroid.radius * 1.55, asteroid.radius * 3.1, asteroid.radius * 3.1);
    }

    const contrastSweep = textureCtx.createLinearGradient(
        -asteroid.radius * 1.1,
        -asteroid.radius * 1.1,
        asteroid.radius * 1.15,
        asteroid.radius * 1.15
    );
    contrastSweep.addColorStop(0, textureStyle.contrastLight);
    contrastSweep.addColorStop(0.45, "rgba(255, 255, 255, 0)");
    contrastSweep.addColorStop(1, textureStyle.contrastDark);
    textureCtx.fillStyle = contrastSweep;
    textureCtx.fillRect(-asteroid.radius * 1.55, -asteroid.radius * 1.55, asteroid.radius * 3.1, asteroid.radius * 3.1);

    for (let index = 0; index < textureStyle.grainCount; index += 1) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.sqrt(Math.random()) * asteroid.radius * 0.98;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const grainRadius = randomBetween(asteroid.radius * 0.03, asteroid.radius * 0.095);
        textureCtx.fillStyle = index % 2 === 0
            ? textureStyle.grainLight
            : textureStyle.grainDark;
        textureCtx.beginPath();
        textureCtx.arc(x, y, grainRadius, 0, Math.PI * 2);
        textureCtx.fill();
    }

    // Tint each generated texture with its asteroid colorway so every spawn
    // lands on a unique gray-to-reddish-brown look.
    textureCtx.fillStyle = asteroid.fillColor;
    textureCtx.fillRect(-asteroid.radius * 1.55, -asteroid.radius * 1.55, asteroid.radius * 3.1, asteroid.radius * 3.1);

    if (LARGE_ASTEROID_SHADER_DEBUG_MODE) {
        textureCtx.lineWidth = Math.max(0.8, asteroid.radius * 0.035);
        for (let ring = 1; ring <= 4; ring += 1) {
            const ringRatio = ring / 5;
            textureCtx.strokeStyle = ring % 2 === 0
                ? "rgba(255, 238, 210, 0.18)"
                : "rgba(50, 24, 16, 0.2)";
            textureCtx.beginPath();
            textureCtx.arc(
                -asteroid.radius * 0.08 * ringRatio,
                asteroid.radius * 0.05 * ringRatio,
                asteroid.radius * (0.22 + ringRatio * 0.5),
                0,
                Math.PI * 2
            );
            textureCtx.stroke();
        }
    }

    textureCtx.restore();

    return {
        canvas: textureCanvas,
        size: textureSize
    };
}

function ensureLargeAsteroidTexture(asteroid) {
    if (!canUseLargeAsteroidVisuals()) {
        return false;
    }

    if (asteroid.largeVisualTexture && !asteroid.largeVisualTextureDirty) {
        return true;
    }

    if (largeAsteroidTextureRebuildBudget <= 0) {
        return false;
    }

    const texture = buildLargeAsteroidTexture(asteroid);
    if (!texture) {
        return false;
    }

    asteroid.largeVisualTexture = texture.canvas;
    asteroid.largeVisualTextureSize = texture.size;
    asteroid.largeVisualTextureDirty = false;
    largeAsteroidTextureRebuildBudget -= 1;
    return true;
}

function pickRandomAsteroidColorway() {
    return ASTEROID_COLORWAYS[Math.floor(Math.random() * ASTEROID_COLORWAYS.length)];
}

function getOpaqueColorFromFill(fillColor, fallback = "rgb(104, 84, 70)") {
    if (typeof fillColor !== "string") {
        return fallback;
    }

    const match = fillColor.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i);
    if (!match) {
        return fallback;
    }

    const red = Math.max(0, Math.min(255, Math.round(Number.parseFloat(match[1]))));
    const green = Math.max(0, Math.min(255, Math.round(Number.parseFloat(match[2]))));
    const blue = Math.max(0, Math.min(255, Math.round(Number.parseFloat(match[3]))));
    return `rgb(${red}, ${green}, ${blue})`;
}

function getDefaultAsteroidSpawnSpeedCeiling(sizeIndex = 0) {
    const normalizedSizeIndex = Number.isFinite(sizeIndex) ? Math.max(0, sizeIndex) : 0;
    return (1.9 + normalizedSizeIndex * 0.35) * gameplayProfile.movementScale;
}

function createAsteroid(sizeIndex = 0, x, y, angle, inheritedSpeed, options = {}) {
    const radius = ASTEROID_RADII[sizeIndex] * gameplayProfile.entityScale * getAsteroidRadiusMultiplier();
    const position = Number.isFinite(x) && Number.isFinite(y)
        ? { x, y }
        : generateOffscreenPosition(radius);
    const direction = typeof angle === "number" ? angle : Math.random() * Math.PI * 2;
    const speed = typeof inheritedSpeed === "number"
        ? inheritedSpeed
        : randomBetween(1.2 + sizeIndex * 0.25, 1.9 + sizeIndex * 0.35) * gameplayProfile.movementScale;
    const baseSpeed = Number.isFinite(options.baseSpeed) ? options.baseSpeed : Math.max(0.01, Math.abs(speed));
    const isRogue = Boolean(options.rogue);
    const nonRogueSpeedCeiling = getDefaultAsteroidSpawnSpeedCeiling(sizeIndex) * NON_ROGUE_ASTEROID_MAX_SPEED_MULTIPLIER;
    const requestedMaxSpeed = Number.isFinite(options.maxSpeed)
        ? Math.max(0, options.maxSpeed)
        : nonRogueSpeedCeiling;
    const maxSpeed = isRogue ? Infinity : Math.min(nonRogueSpeedCeiling, requestedMaxSpeed);
    const initialSpeed = (!isRogue && Number.isFinite(maxSpeed) && maxSpeed > 0 && Math.abs(speed) > maxSpeed)
        ? Math.sign(speed) * maxSpeed
        : speed;
    const elite = Boolean(options.elite);
    const colorway = options.colorway || pickRandomAsteroidColorway();
    const surfaceTextureIndex = Number.isFinite(options.surfaceTextureIndex)
        ? Math.max(0, Math.min(asteroidSurfacePhotos.length - 1, Math.floor(options.surfaceTextureIndex)))
        : Math.floor(Math.random() * asteroidSurfacePhotos.length);

    return {
        id: ++asteroidSerial,
        x: position.x,
        y: position.y,
        vx: Math.cos(direction) * initialSpeed,
        vy: Math.sin(direction) * initialSpeed,
        radius,
        sizeIndex,
        angle: Math.random() * Math.PI * 2,
        rotation: randomBetween(-0.03, 0.03),
        points: generateAsteroidShape(radius),
        surfaceTextureIndex,
        colorway,
        strokeColor: colorway.stroke,
        fillColor: colorway.fill,
        solidFillColor: getOpaqueColorFromFill(colorway.fill),
        glowColor: colorway.glow,
        largeVisualTexture: null,
        largeVisualTextureSize: 0,
        largeVisualTextureDirty: true,
        elite,
        rogue: isRogue,
        baseSpeed,
        maxSpeed,
        durability: options.durability ?? (elite ? 2 : 1),
        scoreBonus: options.scoreBonus ?? (elite ? 40 + sizeIndex * 20 : 0),
        overlapImpactImmuneFrames: Number.isFinite(options.overlapImpactImmuneFrames)
            ? Math.max(0, options.overlapImpactImmuneFrames)
            : 0,
        titanChildBatchId: options.titanChildBatchId ?? null
    };
}

function createUfo(type) {
    const fromLeft = Math.random() > 0.5;
    const isSmall = type === "small";
    const spawnOffset = 70 * gameplayProfile.entityScale;
    const surgeCooldownMultiplier = surgeActive ? THREAT_SURGE_UFO_COOLDOWN_MULTIPLIER : 1;

    return {
        x: fromLeft ? -spawnOffset : canvas.width + spawnOffset,
        y: randomBetween(80, canvas.height * 0.6),
        vx: (fromLeft ? (isSmall ? 2.4 : 1.65) : (isSmall ? -2.4 : -1.65)) * gameplayProfile.movementScale,
        vy: randomBetween(-0.25, 0.25) * gameplayProfile.movementScale,
        radius: (isSmall ? 18 : 28) * gameplayProfile.entityScale,
        shotInterval: isSmall ? 78 : 150,
        fireCooldown: (isSmall ? randomBetween(0, 12) : randomBetween(60, 110)) * surgeCooldownMultiplier,
        courseShiftTimer: randomBetween(COURSE_SHIFT_INTERVAL_MIN_FRAMES, COURSE_SHIFT_INTERVAL_MAX_FRAMES),
        type,
        scoreValue: isSmall ? SMALL_UFO_SCORE_VALUE : LARGE_UFO_SCORE_VALUE,
        soundKey: isSmall ? "ufoBossFast" : "ufoBossSlow",
        image: isSmall ? bossImages.small : bossImages.large,
        alertLabel: isSmall ? "SMALL SAUCER" : "LARGE SAUCER"
    };
}

function createDecoyShip(x, y, vx, vy) {
    return {
        x,
        y,
        vx,
        vy,
        angle: Math.atan2(vy, vx) + Math.PI / 2,
        radius: 10 * gameplayProfile.entityScale,
        modelScale: 0.92 * gameplayProfile.entityScale
    };
}

function spawnDecoyPairFromSmallBoss(ufo) {
    if (!ufo || ufo.type !== "small") {
        return;
    }
    if (Math.random() > DECOY_SPAWN_CHANCE_ON_SMALL_BOSS) {
        return;
    }
    const availableSlots = Math.max(0, MAX_ACTIVE_DECOYS - decoys.length);
    if (availableSlots <= 0) {
        return;
    }
    const spawnCount = Math.min(DECOY_COUNT_ON_SMALL_BOSS, availableSlots);

    const baseSpeed = Math.max(1.8 * gameplayProfile.movementScale, Math.hypot(ufo.vx, ufo.vy) + 0.55 * gameplayProfile.movementScale);
    const baseHeading = Math.atan2(ufo.vy, ufo.vx);

    for (let index = 0; index < spawnCount; index += 1) {
        const offset = (index === 0 ? -1 : 1) * randomBetween(0.2, 0.42);
        const heading = baseHeading + offset;
        const speed = baseSpeed * randomBetween(0.9, 1.15);
        const spawnDistance = (ufo.radius + 16 * gameplayProfile.entityScale) * (index === 0 ? -1 : 1);
        const spawnX = ufo.x + Math.cos(baseHeading + Math.PI / 2) * spawnDistance;
        const spawnY = ufo.y + Math.sin(baseHeading + Math.PI / 2) * spawnDistance;
        decoys.push(createDecoyShip(
            spawnX,
            spawnY,
            Math.cos(heading) * speed,
            Math.sin(heading) * speed
        ));
    }

    showBossAlert("DECOY WING", 110);
}

function removeDecoy(index, exploded = true) {
    const [decoy] = decoys.splice(index, 1);
    if (!decoy || !exploded) {
        return;
    }

    createLineBurst(decoy.x, decoy.y, PALETTE.ship, 14, 0.9, 3.1, 14, 36);
    playEffect("asteroidHit");
    addScreenShake(5, 7);
    triggerFlash(PALETTE.ship, 0.08);
}

function chooseUfoType() {
    if (score >= SMALL_SAUCER_SCORE_THRESHOLD) {
        return "small";
    }
    if (score >= MIXED_SAUCER_SCORE_THRESHOLD) {
        return Math.random() > 0.35 ? "small" : "large";
    }
    return "large";
}

function isTitanWaveNumber(waveNumber) {
    return waveNumber >= TITAN_WAVE_INTERVAL && waveNumber % TITAN_WAVE_INTERVAL === 0;
}

function getTitanWaveConfig(tier) {
    return {
        tier,
        gravityStrength: Math.min(TITAN_GRAVITY_MAX, TITAN_BASE_GRAVITY + Math.max(0, tier - 1) * TITAN_GRAVITY_STEP),
        fragmentCount: Math.min(TITAN_FRAGMENT_MAX, TITAN_BASE_FRAGMENT_COUNT + Math.max(0, tier - 1) * TITAN_FRAGMENT_STEP),
        shotsToBreak: Math.min(TITAN_SHOTS_TO_BREAK_MAX, TITAN_BASE_SHOTS_TO_BREAK + Math.max(0, tier - 1) * TITAN_SHOTS_TO_BREAK_STEP),
        approachSpeed: Math.min(TITAN_SPEED_MAX, TITAN_BASE_SPEED + Math.max(0, tier - 1) * TITAN_SPEED_STEP)
    };
}

function createTitanBossAsteroid(config) {
    const radius = Math.max(
        68 * gameplayProfile.entityScale,
        Math.min(canvas.width, canvas.height) * TITAN_RADIUS_RATIO
    );
    const spawnOffset = radius + 44 * gameplayProfile.entityScale;
    const edgeIndex = Math.floor(Math.random() * 4);
    let x = 0;
    let y = 0;

    if (edgeIndex === 0) {
        x = randomBetween(0, canvas.width);
        y = -spawnOffset;
    } else if (edgeIndex === 1) {
        x = canvas.width + spawnOffset;
        y = randomBetween(0, canvas.height);
    } else if (edgeIndex === 2) {
        x = randomBetween(0, canvas.width);
        y = canvas.height + spawnOffset;
    } else {
        x = -spawnOffset;
        y = randomBetween(0, canvas.height);
    }

    const targetX = ship.active ? ship.x : canvas.width * 0.5;
    const targetY = ship.active ? ship.y : canvas.height * 0.5;
    const heading = Math.atan2(targetY - y, targetX - x);
    const titan = createAsteroid(
        0,
        x,
        y,
        heading,
        config.approachSpeed * gameplayProfile.movementScale,
        {
            durability: config.shotsToBreak,
            scoreBonus: 0,
            colorway: {
                stroke: "#f7c29b",
                fill: "rgba(124, 76, 50, 0.4)",
                glow: "#f7c29b"
            }
        }
    );

    titan.radius = radius;
    titan.points = generateAsteroidShape(radius);
    titan.rotation = randomBetween(-0.012, 0.012);
    titan.largeVisualTexture = null;
    titan.largeVisualTextureSize = 0;
    titan.largeVisualTextureDirty = true;
    titan.isTitan = true;
    titan.titanTier = config.tier;
    titan.titanGravityStrength = config.gravityStrength;
    titan.titanFragmentCount = config.fragmentCount;
    titan.titanShotsToBreak = config.shotsToBreak;
    titan.titanApproachSpeed = config.approachSpeed;
    return titan;
}

function spawnTitanWave() {
    titanWaveCount += 1;
    const config = getTitanWaveConfig(titanWaveCount);
    const titan = createTitanBossAsteroid(config);
    asteroids.push(titan);
    titanPulseTimer = randomBetween(TITAN_PULSE_MIN_FRAMES * 0.5, TITAN_PULSE_MAX_FRAMES * 0.5);
    showBossAlert(
        `TITAN BOSS WAVE ${config.tier}  HP ${config.shotsToBreak}  FRAGS ${config.fragmentCount}`,
        TITAN_ALERT_FRAMES
    );
    playEffect("gameBonus");
    playEffect("titanAlarm");
    addScreenShake(24, 28);
    triggerFlash("#ffb07c", 0.22);
}

function spawnWave() {
    wave += 1;
    nextWaveTimer = -1;
    playerShots = [];
    enemyShots = [];
    hyperspaceUsesThisWave = 0;
    const shouldTriggerSurge = wave >= THREAT_SURGE_INTERVAL_WAVES && wave % THREAT_SURGE_INTERVAL_WAVES === 0;
    const titanWave = isTitanWaveNumber(wave);

    if (titanWave) {
        spawnTitanWave();
    } else {
        const asteroidCount = Math.min(3 + wave, MAX_STARTING_ASTEROIDS);
        const eliteCount = wave >= 3 && wave % 3 === 0 ? 1 : 0;

        for (let index = 0; index < asteroidCount - eliteCount; index += 1) {
            asteroids.push(createAsteroid(0));
        }

        for (let index = 0; index < eliteCount; index += 1) {
            asteroids.push(createAsteroid(0, undefined, undefined, undefined, undefined, {
                elite: true,
                durability: Math.min(4, 2 + Math.floor(wave / 6)),
                scoreBonus: 60 + wave * 8
            }));
        }

        if (eliteCount > 0) {
            showBossAlert("ANOMALY FIELD", 150);
        }
    }

    if (wave > 1 && !titanWave) {
        playEffect("gameBonus");
    }

    if (shouldTriggerSurge && !titanWave) {
        startThreatSurge();
    } else {
        endThreatSurge();
    }
}

function spawnUfo() {
    if (gameState !== "playing" || ufos.length > 0 || wave < 2) {
        return;
    }

    const ufo = createUfo(chooseUfoType());
    ufos.push(ufo);
    if (ufo.type === "small") {
        spawnDecoyPairFromSmallBoss(ufo);
    }
    showBossAlert(ufo.alertLabel);
    scheduleNextUfo();
}

function openGodModeUpgradeDraft() {
    if (!godModeEnabled || gameState === "about" || gameState === "help" || gameState === "godHelp" || gameState === "upgrade") {
        return;
    }

    if (gameState === "waiting" || gameState === "gameOver") {
        startGame();
    }

    if (gameState !== "playing" && gameState !== "paused") {
        return;
    }

    upgradeChoices = getUpgradePool(true);
    if (upgradeChoices.length === 0) {
        showBossAlert("NO UPGRADES AVAILABLE", 120);
        return;
    }

    upgradeDraftMode = "god";
    upgradeReturnState = gameState;
    gameState = "upgrade";
    clearInputState();
    renderUpgradeChoices();
    syncUpgradeOverlay();
    showBossAlert("GOD UPGRADE DRAFT", 120);
}

function spawnDebugUfo(type) {
    if (!godModeEnabled || gameState === "about" || gameState === "upgrade") {
        return;
    }

    if (gameState === "waiting" || gameState === "gameOver") {
        startGame();
    }

    if (gameState !== "playing" && gameState !== "paused") {
        return;
    }

    while (ufos.length > 0) {
        removeUfo(0, false);
    }

    const ufo = createUfo(type);
    ufos.push(ufo);
    showBossAlert(type === "small" ? "TEST SMALL SAUCER" : "TEST LARGE SAUCER", 120);
    scheduleNextUfo();
}

function spawnDebugThreatBomb() {
    if (!godModeEnabled || gameState === "about" || gameState === "help" || gameState === "godHelp" || gameState === "upgrade") {
        return;
    }

    if (gameState === "waiting" || gameState === "gameOver") {
        startGame();
    }

    if (gameState !== "playing" && gameState !== "paused") {
        return;
    }

    threatBomb = createThreatBomb();
    nextThreatBombTimer = THREAT_BOMB_MAX_SPAWN_FRAMES;
    showBossAlert("TEST THREAT BOMB", 120);
}

function spawnDebugMineralField() {
    if (!godModeEnabled || gameState === "about" || gameState === "help" || gameState === "godHelp" || gameState === "upgrade") {
        return;
    }

    if (gameState === "waiting" || gameState === "gameOver") {
        startGame();
    }

    if (gameState !== "playing" && gameState !== "paused") {
        return;
    }

    mineralField = createMineralField();
    nextMineralFieldTimer = MINERAL_FIELD_MAX_SPAWN_FRAMES;
    showBossAlert("TEST MINERAL FIELD", 120);
}

function spawnDebugDecoys() {
    if (!godModeEnabled || gameState === "about" || gameState === "help" || gameState === "godHelp" || gameState === "upgrade") {
        return;
    }

    if (gameState === "waiting" || gameState === "gameOver") {
        startGame();
    }

    if (gameState !== "playing" && gameState !== "paused") {
        return;
    }
    const availableSlots = Math.max(0, MAX_ACTIVE_DECOYS - decoys.length);
    if (availableSlots <= 0) {
        showBossAlert("DECOY CAP REACHED", 120);
        return;
    }
    const spawnCount = Math.min(DECOY_COUNT_ON_SMALL_BOSS, availableSlots);

    const baseHeading = Math.random() * Math.PI * 2;
    const baseSpeed = randomBetween(2.2, 3.4) * gameplayProfile.movementScale;
    const originX = canvas.width * 0.5;
    const originY = canvas.height * 0.28;

    for (let index = 0; index < spawnCount; index += 1) {
        const offset = (index === 0 ? -1 : 1) * randomBetween(0.16, 0.34);
        const heading = baseHeading + offset;
        decoys.push(createDecoyShip(
            originX + (index === 0 ? -24 : 24) * gameplayProfile.entityScale,
            originY,
            Math.cos(heading) * baseSpeed,
            Math.sin(heading) * baseSpeed
        ));
    }

    showBossAlert("TEST DECOYS", 120);
}

function spawnDebugRogueAsteroid() {
    if (!godModeEnabled || gameState === "about" || gameState === "help" || gameState === "godHelp" || gameState === "upgrade") {
        return;
    }

    if (gameState === "waiting" || gameState === "gameOver") {
        startGame();
    }

    if (gameState !== "playing" && gameState !== "paused") {
        return;
    }

    const sizeIndex = Math.random() < 0.5 ? 1 : 2;
    const radius = ASTEROID_RADII[sizeIndex] * gameplayProfile.entityScale * getAsteroidRadiusMultiplier();
    const spawnPosition = generateOffscreenPosition(radius);
    const heading = Math.atan2(
        canvas.height * 0.5 - spawnPosition.y,
        canvas.width * 0.5 - spawnPosition.x
    ) + randomBetween(-0.28, 0.28);
    const baseSpeed = randomBetween(1.4 + sizeIndex * 0.25, 2 + sizeIndex * 0.3) * gameplayProfile.movementScale;
    const rogueSpeed = baseSpeed * ROGUE_ASTEROID_SPEED_MULTIPLIER;

    asteroids.push(createAsteroid(sizeIndex, spawnPosition.x, spawnPosition.y, heading, rogueSpeed, {
        colorway: ROGUE_ASTEROID_COLORWAY,
        rogue: true,
        scoreBonus: ROGUE_ASTEROID_SCORE_BONUS
    }));
    showBossAlert("TEST ROGUE ASTEROID", 120);
}

function spawnDebugTitanWave() {
    if (!godModeEnabled) {
        return;
    }

    if (gameState === "help") {
        closeHelp();
    } else if (gameState === "godHelp") {
        closeGodHelp();
    } else if (gameState === "about") {
        closeAbout();
    } else if (gameState === "upgrade") {
        gameState = "playing";
        upgradeChoices = [];
        upgradeDraftMode = "wave";
        upgradeReturnState = "playing";
        syncUpgradeOverlay();
        syncControlSurface();
    }

    if (gameState === "waiting" || gameState === "gameOver") {
        startGame();
    }

    if (gameState !== "playing" && gameState !== "paused") {
        return;
    }

    gameState = "playing";
    playerShots = [];
    enemyShots = [];
    asteroids = [];
    decoys = [];
    while (ufos.length > 0) {
        removeUfo(0, false);
    }
    threatBomb = null;
    scheduleThreatBomb();
    mineralField = null;
    scheduleMineralField();
    clearTitanChildTracking();
    nextWaveTimer = -1;
    titanPulseTimer = 0;
    spawnTitanWave();
    showBossAlert("TEST TITAN BOSS", 160);
}

function jumpToGodModeWave() {
    if (!godModeEnabled || gameState === "about" || gameState === "help" || gameState === "upgrade") {
        return;
    }

    const defaultWave = String(Math.max(1, wave || 1));
    const response = window.prompt("Jump to which wave?", defaultWave);
    if (response === null) {
        return;
    }

    const targetWave = Number.parseInt(response.trim(), 10);
    if (!Number.isFinite(targetWave) || targetWave < 1) {
        showBossAlert("INVALID WAVE", 120);
        return;
    }

    gravityDebugWaveFloor = targetWave <= 1 ? 0 : targetWave;
    titanWaveCount = Math.floor(Math.max(0, targetWave - 1) / TITAN_WAVE_INTERVAL);
    gameState = "playing";
    nextWaveTimer = -1;
    bossAlertTimer = 0;
    bossAlertMessage = "";
    playerShots = [];
    enemyShots = [];
    particles = [];
    titanPulseTimer = 0;
    while (ufos.length > 0) {
        removeUfo(0, false);
    }
    asteroids = [];
    decoys = [];
    threatBomb = null;
    scheduleThreatBomb();
    mineralField = null;
    scheduleMineralField();
    clearTitanChildTracking();
    wave = targetWave - 1;
    resetShip();
    scheduleNextUfo();
    spawnWave();
    showBossAlert(`WAVE ${targetWave} TEST`, 140);
}

function clearWaveInGodMode() {
    if (!godModeEnabled || gameState !== "playing") {
        return;
    }

    const hadEnemies = asteroids.length > 0 || ufos.length > 0;
    if (!hadEnemies) {
        return;
    }

    for (const asteroid of asteroids) {
        createLineBurst(
            asteroid.x,
            asteroid.y,
            asteroid.strokeColor,
            asteroid.elite ? 24 : 16,
            1.2,
            asteroid.elite ? 4.6 : 3.6,
            18,
            asteroid.elite ? 52 : 44
        );
    }

    while (ufos.length > 0) {
        const ufo = ufos[0];
        createLineBurst(
            ufo.x,
            ufo.y,
            ufo.type === "small" ? PALETTE.enemyShot : PALETTE.ship,
            20,
            1.4,
            4.2,
            20,
            56
        );
        removeUfo(0, false);
    }

    for (const decoy of decoys) {
        createLineBurst(decoy.x, decoy.y, PALETTE.ship, 14, 0.9, 3.1, 14, 36);
    }

    asteroids = [];
    enemyShots = [];
    playerShots = [];
    decoys = [];
    threatBomb = null;
    scheduleThreatBomb();
    mineralField = null;
    scheduleMineralField();
    clearTitanChildTracking();
    nextWaveTimer = -1;
    titanPulseTimer = 0;
    resetCombatMomentum();
    playEffect("asteroidHit");
    addScreenShake(14, 18);
    triggerFlash(PALETTE.enemyShot, 0.16);
    spawnWave();
}

function wrapEntity(entity, padding = entity.radius) {
    if (entity.x < -padding) {
        entity.x = canvas.width + padding;
    } else if (entity.x > canvas.width + padding) {
        entity.x = -padding;
    }

    if (entity.y < -padding) {
        entity.y = canvas.height + padding;
    } else if (entity.y > canvas.height + padding) {
        entity.y = -padding;
    }
}

function distanceSquared(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return dx * dx + dy * dy;
}

function circlesOverlap(a, b) {
    const radius = a.radius + b.radius;
    return distanceSquared(a, b) <= radius * radius;
}

function getAsteroidPairKey(firstAsteroid, secondAsteroid) {
    if (firstAsteroid.id < secondAsteroid.id) {
        return `${firstAsteroid.id}:${secondAsteroid.id}`;
    }
    return `${secondAsteroid.id}:${firstAsteroid.id}`;
}

function handleAsteroidOverlapImpacts() {
    if (asteroids.length < 2) {
        activeAsteroidOverlapPairs.clear();
        return;
    }

    const nextOverlapPairs = new Set();
    const impactedIndices = new Set();
    const impactAngles = new Map();

    for (let firstIndex = 0; firstIndex < asteroids.length - 1; firstIndex += 1) {
        const firstAsteroid = asteroids[firstIndex];
        if (!firstAsteroid || firstAsteroid.isTitan) {
            continue;
        }

        for (let secondIndex = firstIndex + 1; secondIndex < asteroids.length; secondIndex += 1) {
            const secondAsteroid = asteroids[secondIndex];
            if (!secondAsteroid || secondAsteroid.isTitan) {
                continue;
            }

            if (firstAsteroid.overlapImpactImmuneFrames > 0 || secondAsteroid.overlapImpactImmuneFrames > 0) {
                continue;
            }

            if (!circlesOverlap(firstAsteroid, secondAsteroid)) {
                continue;
            }

            const pairKey = getAsteroidPairKey(firstAsteroid, secondAsteroid);
            nextOverlapPairs.add(pairKey);
            if (activeAsteroidOverlapPairs.has(pairKey)) {
                continue;
            }

            if (Math.random() >= ASTEROID_OVERLAP_IMPACT_CHANCE) {
                continue;
            }

            impactedIndices.add(firstIndex);
            impactedIndices.add(secondIndex);

            if (!impactAngles.has(firstIndex)) {
                impactAngles.set(firstIndex, Math.atan2(
                    secondAsteroid.y - firstAsteroid.y,
                    secondAsteroid.x - firstAsteroid.x
                ));
            }
            if (!impactAngles.has(secondIndex)) {
                impactAngles.set(secondIndex, Math.atan2(
                    firstAsteroid.y - secondAsteroid.y,
                    firstAsteroid.x - secondAsteroid.x
                ));
            }
        }
    }

    activeAsteroidOverlapPairs = nextOverlapPairs;
    if (impactedIndices.size === 0) {
        return;
    }

    const destroyOrder = Array.from(impactedIndices).sort((a, b) => b - a);
    for (const asteroidIndex of destroyOrder) {
        const asteroid = asteroids[asteroidIndex];
        if (!asteroid || asteroid.isTitan) {
            continue;
        }

        const impactAngle = impactAngles.get(asteroidIndex);
        const fallbackAngle = Math.atan2(asteroid.vy, asteroid.vx);
        const splitAngle = Number.isFinite(impactAngle)
            ? impactAngle
            : (Number.isFinite(fallbackAngle) ? fallbackAngle : Math.random() * Math.PI * 2);
        destroyAsteroid(asteroidIndex, splitAngle, false);
    }
}

function getWrappedAxisDelta(from, to, span) {
    let delta = to - from;
    if (delta > span * 0.5) {
        delta -= span;
    } else if (delta < -span * 0.5) {
        delta += span;
    }
    return delta;
}

function clampEntitySpeed(entity, maxSpeed) {
    if (!Number.isFinite(maxSpeed) || maxSpeed <= 0) {
        return;
    }

    const speed = Math.hypot(entity.vx, entity.vy);
    if (speed <= maxSpeed || speed <= 0.0001) {
        return;
    }

    entity.vx = (entity.vx / speed) * maxSpeed;
    entity.vy = (entity.vy / speed) * maxSpeed;
}

function applyAntiGravityRepulsionToEntity(entity, dt, options = {}) {
    if (!entity || !ship.active || ship.hyperspaceSequence) {
        return;
    }

    const entityRadius = Number.isFinite(entity.radius) ? entity.radius : 2;
    const fieldRange = ANTI_GRAVITY_FIELD_RANGE * gameplayProfile.entityScale;
    const maxInfluenceDistance = ship.radius + entityRadius + fieldRange;

    let dx = getWrappedAxisDelta(ship.x, entity.x, canvas.width);
    let dy = getWrappedAxisDelta(ship.y, entity.y, canvas.height);
    let distance = Math.hypot(dx, dy);

    if (!Number.isFinite(distance)) {
        return;
    }

    if (distance < 0.0001) {
        const escapeAngle = Math.random() * Math.PI * 2;
        dx = Math.cos(escapeAngle);
        dy = Math.sin(escapeAngle);
        distance = 1;
    }

    if (distance > maxInfluenceDistance) {
        return;
    }

    const ux = dx / distance;
    const uy = dy / distance;
    const separationFromHull = Math.max(0, distance - ship.radius - entityRadius);
    const proximity = Math.max(0, Math.min(1, 1 - (separationFromHull / fieldRange)));

    if (proximity <= 0) {
        return;
    }

    // Slow incoming movement first, then push outward harder as objects get closer.
    const radialVelocity = entity.vx * ux + entity.vy * uy;
    if (radialVelocity < 0) {
        const braking = -radialVelocity * (0.45 + proximity * 0.55) * dt;
        entity.vx += ux * braking;
        entity.vy += uy * braking;
    }

    const massFactor = Math.max(0.4, 1 + entityRadius * 0.055);
    const push = (ANTI_GRAVITY_PUSH_FORCE * (0.3 + proximity * proximity * 2.9) * dt) / massFactor;
    entity.vx += ux * push;
    entity.vy += uy * push;

    if (Number.isFinite(options.maxSpeed)) {
        clampEntitySpeed(entity, options.maxSpeed);
    }

    const minimumSeparation = ship.radius + entityRadius + ANTI_GRAVITY_MIN_GAP * gameplayProfile.entityScale;
    if (distance < minimumSeparation) {
        entity.x = ship.x + ux * minimumSeparation;
        entity.y = ship.y + uy * minimumSeparation;
        if (options.wrap !== false) {
            wrapEntity(entity, entityRadius);
        }
    }
}

function applyAntiGravityField(dt) {
    if (!hasAntiGravityField() || !ship.active || ship.hyperspaceSequence) {
        return;
    }

    for (const asteroid of asteroids) {
        const asteroidSpeedCap = Number.isFinite(asteroid.maxSpeed)
            ? asteroid.maxSpeed * 1.3
            : 8.5 * gameplayProfile.movementScale;
        applyAntiGravityRepulsionToEntity(asteroid, dt, { maxSpeed: asteroidSpeedCap });
    }

    for (const ufo of ufos) {
        applyAntiGravityRepulsionToEntity(ufo, dt, { maxSpeed: 4.8 * gameplayProfile.movementScale });
    }

    for (const decoy of decoys) {
        applyAntiGravityRepulsionToEntity(decoy, dt, { maxSpeed: 5.6 * gameplayProfile.movementScale });
    }

    for (const shot of enemyShots) {
        applyAntiGravityRepulsionToEntity(shot, dt, { maxSpeed: 10.5 * gameplayProfile.shotScale });
    }

    if (threatBomb) {
        applyAntiGravityRepulsionToEntity(threatBomb, dt, { maxSpeed: 5.8 * gameplayProfile.movementScale });
    }

    if (mineralField) {
        for (const mineral of mineralField.particles) {
            applyAntiGravityRepulsionToEntity(mineral, dt, {
                wrap: false,
                maxSpeed: 5.2 * gameplayProfile.movementScale
            });
        }
    }
}

function bounceShipOffAsteroid(asteroid) {
    let dx = ship.x - asteroid.x;
    let dy = ship.y - asteroid.y;
    let distance = Math.hypot(dx, dy);

    if (distance < 0.001) {
        const escapeAngle = ship.angle - Math.PI / 2;
        dx = Math.cos(escapeAngle);
        dy = Math.sin(escapeAngle);
        distance = 1;
    }

    const normalX = dx / distance;
    const normalY = dy / distance;
    const overlap = ship.radius + asteroid.radius - distance;

    if (overlap > 0) {
        ship.x += normalX * (overlap + 1.5);
        ship.y += normalY * (overlap + 1.5);
    }

    const shipNormalVelocity = ship.vx * normalX + ship.vy * normalY;
    const asteroidNormalVelocity = asteroid.vx * normalX + asteroid.vy * normalY;
    const relativeNormalVelocity = shipNormalVelocity - asteroidNormalVelocity;
    const reboundVelocity = relativeNormalVelocity < 0.15
        ? Math.abs(relativeNormalVelocity) + 1.25 * gameplayProfile.movementScale
        : relativeNormalVelocity;

    ship.vx += (reboundVelocity - relativeNormalVelocity) * normalX + asteroid.vx * 0.06;
    ship.vy += (reboundVelocity - relativeNormalVelocity) * normalY + asteroid.vy * 0.06;

    const shipSpeed = Math.hypot(ship.vx, ship.vy);
    const maxBounceSpeed = ship.maxSpeed * 1.15;
    if (shipSpeed > maxBounceSpeed) {
        ship.vx = (ship.vx / shipSpeed) * maxBounceSpeed;
        ship.vy = (ship.vy / shipSpeed) * maxBounceSpeed;
    }

    wrapEntity(ship, ship.radius);
    addScreenShake(4, 6);
    triggerFlash(PALETTE.shield, GOD_MODE_BOUNCE_FLASH);
    createLineBurst(ship.x, ship.y, PALETTE.shield, 6, 0.4, 1.2, 10, 18);
}

function bounceUfoOffAsteroid(ufo, asteroid) {
    bounceDynamicCircleOffCircle(ufo, asteroid, {
        minimumRebound: 1.15,
        maxSpeed: Math.max(3.2, Math.hypot(ufo.vx, ufo.vy) + 1.2) * gameplayProfile.movementScale,
        maxSpeedMultiplier: 1.2
    });

    addScreenShake(4, 6);
    triggerFlash(PALETTE.shield, GOD_MODE_BOUNCE_FLASH);
    createLineBurst(
        ufo.x,
        ufo.y,
        ufo.type === "small" ? PALETTE.enemyShot : PALETTE.ship,
        8,
        0.5,
        1.6,
        10,
        20
    );
    playEffect("asteroidHit");
}

function applyLargeAsteroidGravity(dt) {
    if (!ship.active) {
        return;
    }

    const effectiveGravitySteps = getEffectiveGravitySteps();
    const gravityStrength = effectiveGravitySteps
        * LARGE_ASTEROID_GRAVITY_PER_LEVEL
        * gameplayProfile.movementScale
        * GLOBAL_GRAVITY_INTENSITY_SCALE;

    for (const asteroid of asteroids) {
        if (asteroid.sizeIndex !== 0) {
            continue;
        }

        const customGravityStrength = asteroid.isTitan
            ? asteroid.titanGravityStrength
                * gameplayProfile.movementScale
                * GLOBAL_GRAVITY_INTENSITY_SCALE
                * TITAN_GRAVITY_INTENSITY_SCALE
            : gravityStrength;
        if (customGravityStrength <= 0) {
            continue;
        }

        // Gravity is constrained to visible screen space and does not "reach"
        // across wrapped borders.
        const dx = asteroid.x - ship.x;
        const dy = asteroid.y - ship.y;
        const distance = Math.hypot(dx, dy);
        const gravityRange = asteroid.radius * (
            asteroid.isTitan
                ? TITAN_GRAVITY_RANGE_MULTIPLIER
                : LARGE_ASTEROID_GRAVITY_RANGE_MULTIPLIER
        );

        if (distance < 0.001 || distance > gravityRange) {
            continue;
        }

        const falloff = 1 - distance / gravityRange;
        const pullProfile = asteroid.isTitan
            ? (0.34 + falloff * falloff * 3.65)
            : (0.2 + falloff * falloff * 2.8);
        const pull = customGravityStrength * pullProfile * dt;
        ship.vx += (dx / distance) * pull;
        ship.vy += (dy / distance) * pull;
    }
}

function isRespawnZoneSafe() {
    const spawnPoint = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 90 * gameplayProfile.entityScale
    };

    return !asteroids.some((asteroid) => circlesOverlap(spawnPoint, asteroid))
        && !ufos.some((ufo) => circlesOverlap(spawnPoint, ufo))
        && !enemyShots.some((shot) => circlesOverlap(spawnPoint, shot));
}

function createLineBurst(
    x,
    y,
    color = "#ffffff",
    count = 18,
    speedMin = 1.4,
    speedMax = 4.4,
    lifeMin = 24,
    lifeMax = 58
) {
    for (let index = 0; index < count; index += 1) {
        const angle = Math.random() * Math.PI * 2;
        const speed = randomBetween(speedMin, speedMax);
        const life = randomBetween(lifeMin, lifeMax);
        if (particles.length >= MAX_PARTICLES) {
            particles.splice(0, particles.length - MAX_PARTICLES + 1);
        }

        particles.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            color,
            life,
            maxLife: life,
            length: randomBetween(3, 7)
        });
    }
}

function spawnPlayerProjectile(angle) {
    const homing = hasHomingShots();
    const baseShotSpeed = PLAYER_SHOT_SPEED * gameplayProfile.shotScale;
    const shotSpeed = homing ? baseShotSpeed * PLAYER_HOMING_SHOT_SPEED_MULTIPLIER : baseShotSpeed;
    const rangeBoost = upgradeState.shotRange > 0;
    playerShots.push({
        x: ship.x + Math.cos(angle) * (18 * ship.modelScale),
        y: ship.y + Math.sin(angle) * (18 * ship.modelScale),
        vx: ship.vx + Math.cos(angle) * shotSpeed,
        vy: ship.vy + Math.sin(angle) * shotSpeed,
        radius: 2 * gameplayProfile.entityScale,
        life: getPlayerShotLife(),
        pierce: getPlayerPierce(),
        homing,
        rangeBoost
    });
}

function firePlayerShot() {
    if (
        gameState !== "playing"
        || !ship.active
        || ship.fireCooldown > 0
        || playerShots.length >= getMaxPlayerShots()
    ) {
        return;
    }

    const baseAngle = ship.angle - Math.PI / 2;
    const projectileCount = getPlayerProjectileCount();
    const spreadStep = projectileCount > 1 ? 0.12 : 0;

    for (let index = 0; index < projectileCount; index += 1) {
        if (playerShots.length >= getMaxPlayerShots()) {
            break;
        }

        const spreadOffset = (index - (projectileCount - 1) / 2) * spreadStep;
        spawnPlayerProjectile(baseAngle + spreadOffset);
    }

    ship.fireCooldown = getPlayerFireCooldown();
    playEffect("laserFire");
}

function isShipOverlappingDangerAt(x, y) {
    const ghostShip = {
        x,
        y,
        radius: ship.radius
    };

    return asteroids.some((asteroid) => circlesOverlap(ghostShip, asteroid))
        || ufos.some((ufo) => circlesOverlap(ghostShip, ufo))
        || enemyShots.some((shot) => circlesOverlap(ghostShip, shot));
}

function updateHyperspaceSequence(dt) {
    const sequence = ship.hyperspaceSequence;
    if (!sequence) {
        return false;
    }

    sequence.timer += dt;

    if (sequence.phase === "spinOut") {
        const progress = Math.min(1, sequence.timer / HYPERSPACE_SPIN_OUT_FRAMES);
        const acceleration = progress * progress;
        const spinRate = HYPERSPACE_SPIN_RATE_MIN
            + (HYPERSPACE_SPIN_RATE_MAX - HYPERSPACE_SPIN_RATE_MIN) * acceleration;
        ship.angle += spinRate * dt;

        if (progress >= 1) {
            createLineBurst(ship.x, ship.y, PALETTE.ship, 14, 1.3, 3.6, 16, 34);
            addScreenShake(8, 13);
            triggerFlash(PALETTE.ship, HYPERSPACE_EXIT_FLASH * 0.85);
            playEffect("gameBonus");
            ship.x = sequence.toX;
            ship.y = sequence.toY;
            ship.vx *= 0.9;
            ship.vy *= 0.9;
            sequence.phase = "transit";
            sequence.timer = 0;
        }
        return true;
    }

    if (sequence.phase === "transit") {
        ship.angle += HYPERSPACE_SPIN_RATE_MAX * dt;
        if (sequence.timer >= HYPERSPACE_TRANSIT_FRAMES) {
            createLineBurst(ship.x, ship.y, PALETTE.ship, 14, 1.3, 3.6, 16, 34);
            addScreenShake(8, 12);
            triggerFlash(PALETTE.ship, HYPERSPACE_EXIT_FLASH);
            sequence.phase = "spinIn";
            sequence.timer = 0;
        }
        return true;
    }

    const progress = Math.min(1, sequence.timer / HYPERSPACE_SPIN_IN_FRAMES);
    const deceleration = 1 - progress * progress;
    const spinRate = HYPERSPACE_SPIN_RATE_MIN
        + (HYPERSPACE_SPIN_RATE_MAX - HYPERSPACE_SPIN_RATE_MIN) * deceleration;
    ship.angle += spinRate * dt;

    if (progress >= 1) {
        ship.hyperspaceSequence = null;
        if (
            isShipOverlappingDangerAt(ship.x, ship.y)
            || Math.random() < sequence.failureChance
        ) {
            destroyShip();
        }
    }
    return true;
}

function performHyperspace() {
    if (
        gameState !== "playing"
        || !ship.active
        || ship.respawnTimer > 0
        || ship.hyperspaceSequence
    ) {
        return;
    }

    if (ship.hyperspaceCooldown > 0) {
        const remainingSeconds = Math.ceil(ship.hyperspaceCooldown / 60);
        showBossAlert(`HYPERSPACE RECHARGE ${remainingSeconds}s`, 90);
        playFailBuzz();
        return;
    }

    hyperspaceUsesThisWave += 1;
    const hyperspaceFailureChance = getHyperspaceFailureChance();

    const targetX = Math.random() * canvas.width;
    const targetY = Math.random() * canvas.height;
    ship.hyperspaceCooldown = HYPERSPACE_COOLDOWN_FRAMES;
    ship.hyperspaceSequence = {
        phase: "spinOut",
        timer: 0,
        toX: targetX,
        toY: targetY,
        failureChance: hyperspaceFailureChance
    };
}

function fireUfoShot(ufo) {
    if (enemyShots.length >= MAX_ENEMY_SHOTS) {
        return;
    }

    let baseAngle = Math.random() * Math.PI * 2;
    let spread = 1.2;

    if (ufo.type === "small" && ship.active) {
        const distance = Math.hypot(ship.x - ufo.x, ship.y - ufo.y);
        const leadFrames = Math.min(18, distance / UFO_SHOT_SPEED);
        const predictedX = ship.x + ship.vx * leadFrames;
        const predictedY = ship.y + ship.vy * leadFrames;
        baseAngle = Math.atan2(predictedY - ufo.y, predictedX - ufo.x);
        spread = score >= SMALL_SAUCER_SCORE_THRESHOLD ? 0.08 : 0.18;
    }

    const shotSpeed = UFO_SHOT_SPEED * gameplayProfile.shotScale;
    const shotAngle = baseAngle + randomBetween(-spread, spread);

    enemyShots.push({
        x: ufo.x,
        y: ufo.y,
        vx: Math.cos(shotAngle) * shotSpeed,
        vy: Math.sin(shotAngle) * shotSpeed,
        radius: 2.5 * gameplayProfile.entityScale,
        life: UFO_SHOT_LIFE
    });

    playEffect("bossLaser");
}

function destroyAsteroid(index, shotAngle, awardPoints = true) {
    const asteroid = asteroids[index];
    if (!asteroid) {
        return;
    }
    const destroyedTitanChildBatchId = asteroid.titanChildBatchId ?? null;

    if (asteroid.isTitan) {
        if (!awardPoints) {
            createLineBurst(asteroid.x, asteroid.y, "#ffbf8f", 8, 0.8, 2.2, 12, 26);
            playEffect("asteroidHit");
            addScreenShake(4, 6);
            triggerFlash("#ffbf8f", 0.08);
            return;
        }

        asteroid.durability -= 1;
        if (asteroid.durability > 0) {
            asteroid.rotation *= -1;
            createLineBurst(asteroid.x, asteroid.y, "#ffbf8f", 10, 0.9, 2.4, 12, 28);
            playEffect("asteroidHit");
            addScreenShake(6, 9);
            triggerFlash("#ffbf8f", 0.1);
            const remainingShots = Math.max(0, Math.ceil(asteroid.durability));
            if (remainingShots <= 5 || remainingShots % 5 === 0) {
                showBossAlert(`TITAN CORE ${remainingShots} HITS`, 70);
            }
            return;
        }

        asteroids.splice(index, 1);
        createLineBurst(
            asteroid.x,
            asteroid.y,
            "#ffbf8f",
            36,
            1.7,
            5.2,
            28,
            78
        );
        playEffect("asteroidHit");
        playEffect("gameOver");
        addScreenShake(24, 30);
        triggerFlash("#ffbf8f", 0.24);
        titanPulseTimer = 0;

        addScore(TITAN_BOSS_SCORE_VALUE);
        showBonusAward(TITAN_BOSS_SCORE_VALUE, "TITAN BREAK BONUS");

        const fragmentCount = Math.max(TITAN_BASE_FRAGMENT_COUNT, asteroid.titanFragmentCount || TITAN_BASE_FRAGMENT_COUNT);
        const baseSplitSpeed = Math.max(
            1.45 * gameplayProfile.movementScale,
            (Math.hypot(asteroid.vx, asteroid.vy) + 0.45) * gameplayProfile.movementScale
        );
        const titanChildBatchId = ++titanChildBatchSerial;
        activeTitanChildBatchIds.add(titanChildBatchId);
        const fragmentRadius = ASTEROID_RADII[0] * gameplayProfile.entityScale * getAsteroidRadiusMultiplier();
        const minOrbitRadiusForSpacing = (fragmentRadius * 1.18) / Math.max(0.22, Math.sin(Math.PI / fragmentCount));
        const fragmentSpawnRadius = Math.max(fragmentRadius * 1.7, asteroid.radius * 0.62, minOrbitRadiusForSpacing);

        for (let fragmentIndex = 0; fragmentIndex < fragmentCount; fragmentIndex += 1) {
            const orbitRatio = fragmentIndex / fragmentCount;
            const spawnAngle = orbitRatio * Math.PI * 2 + randomBetween(-0.08, 0.08);
            const spawnX = asteroid.x + Math.cos(spawnAngle) * fragmentSpawnRadius;
            const spawnY = asteroid.y + Math.sin(spawnAngle) * fragmentSpawnRadius;
            const fragmentAngle = spawnAngle + randomBetween(-0.11, 0.11);
            const fragmentSpeed = baseSplitSpeed * randomBetween(0.92, 1.14);
            asteroids.push(
                createAsteroid(0, spawnX, spawnY, fragmentAngle, fragmentSpeed, {
                    colorway: asteroid.colorway,
                    surfaceTextureIndex: asteroid.surfaceTextureIndex,
                    overlapImpactImmuneFrames: TITAN_FRAGMENT_OVERLAP_IMMUNITY_FRAMES,
                    titanChildBatchId
                })
            );
        }
        return;
    }

    if (asteroid.durability > 1) {
        asteroid.durability -= 1;
        asteroid.rotation *= -1;
        createLineBurst(asteroid.x, asteroid.y, asteroid.strokeColor, 8, 0.8, 2.2, 12, 24);
        addScreenShake(5, 8);
        triggerFlash(asteroid.strokeColor, 0.12);
        playEffect("asteroidHit");
        return;
    }

    asteroids.splice(index, 1);
    createLineBurst(
        asteroid.x,
        asteroid.y,
        asteroid.strokeColor,
        asteroid.elite ? 24 : 16,
        1.2,
        asteroid.elite ? 4.6 : 3.6,
        18,
        asteroid.elite ? 52 : 44
    );
    playEffect("asteroidHit");
    if (awardPoints) {
        registerKillScore(ASTEROID_SCORES[asteroid.sizeIndex] + asteroid.scoreBonus);
        if (asteroid.rogue) {
            showBonusAward(ROGUE_ASTEROID_SCORE_BONUS, "ROGUE ASTEROID BONUS");
        }
    }
    addScreenShake(asteroid.elite ? 11 : 6, asteroid.elite ? 16 : 8);
    triggerFlash(asteroid.strokeColor, asteroid.elite ? 0.18 : 0.08);

    if (asteroid.sizeIndex < ASTEROID_RADII.length - 1) {
        const nextSize = asteroid.sizeIndex + 1;
        const surgeSplitSpeedMultiplier = surgeActive ? THREAT_SURGE_ASTEROID_SPLIT_SPEED_MULTIPLIER : 1;
        const inheritedSpeed = (
            Math.hypot(asteroid.vx, asteroid.vy) + 0.45 * gameplayProfile.movementScale
        ) * surgeSplitSpeedMultiplier;
        const rogueSpawnIndex = awardPoints && Math.random() < ROGUE_ASTEROID_CHANCE
            ? (Math.random() < 0.5 ? 0 : 1)
            : -1;
        if (rogueSpawnIndex >= 0) {
            showBossAlert("ROGUE ASTEROID", 105);
        }

        let childIndex = 0;
        for (let indexOffset = -1; indexOffset <= 1; indexOffset += 2) {
            const splitAngle = shotAngle + indexOffset * randomBetween(0.45, 0.8);
            const isRogueChild = childIndex === rogueSpawnIndex;
            const childSpeed = isRogueChild
                ? inheritedSpeed * ROGUE_ASTEROID_SPEED_MULTIPLIER
                : inheritedSpeed;
            const eliteChildBonus = asteroid.elite && nextSize === 1
                ? Math.max(20, asteroid.scoreBonus - 20)
                : 0;
            asteroids.push(
                createAsteroid(nextSize, asteroid.x, asteroid.y, splitAngle, childSpeed, {
                    elite: asteroid.elite && nextSize === 1,
                    durability: asteroid.elite && nextSize === 1 ? 2 : 1,
                    scoreBonus: eliteChildBonus + (isRogueChild ? ROGUE_ASTEROID_SCORE_BONUS : 0),
                    colorway: isRogueChild ? ROGUE_ASTEROID_COLORWAY : asteroid.colorway,
                    surfaceTextureIndex: asteroid.surfaceTextureIndex,
                    rogue: isRogueChild,
                    titanChildBatchId: destroyedTitanChildBatchId
                })
            );
            childIndex += 1;
        }
    }

    maybeFinalizeTitanChildBatch(destroyedTitanChildBatchId);
}

function removeUfo(index, exploded = false) {
    const [ufo] = ufos.splice(index, 1);
    if (!ufo) {
        return;
    }

    stopLoop(ufo.soundKey);

    if (exploded) {
        createLineBurst(ufo.x, ufo.y, ufo.type === "small" ? PALETTE.enemyShot : PALETTE.ship, 20, 1.4, 4.2, 20, 56);
        playEffect("asteroidHit");
        const awardedPoints = registerKillScore(ufo.scoreValue);
        showBonusAward(
            awardedPoints,
            ufo.type === "small" ? "SMALL BOSS BONUS" : "LARGE BOSS BONUS"
        );
        addScreenShake(ufo.type === "small" ? 12 : 8, ufo.type === "small" ? 20 : 12);
        triggerFlash(ufo.type === "small" ? PALETTE.enemyShot : PALETTE.ship, ufo.type === "small" ? 0.2 : 0.1);
    }
}

function destroyShip() {
    if (!ship.active || gameState !== "playing") {
        return;
    }

    if (godModeEnabled) {
        return;
    }

    if (ship.invulnerable > 0) {
        return;
    }

    if (ship.shields > 0) {
        ship.shields -= 1;
        ship.invulnerable = 60;
        addScreenShake(6, 10);
        triggerFlash(PALETTE.shield, 0.18);
        playEffect("gameBonus");
        return;
    }

    if (upgradeState.naniteRepair > 0 && consumeTimedPowerupStack("naniteRepair")) {
        ship.invulnerable = 95;
        ship.vx *= -0.35;
        ship.vy *= -0.35;
        createLineBurst(ship.x, ship.y, PALETTE.shield, 16, 1.1, 3.6, 14, 40);
        addScreenShake(8, 12);
        triggerFlash(PALETTE.shield, 0.24);
        playEffect("gameBonus");
        showBossAlert("NANITE SAVE", 110);
        return;
    }

    createLineBurst(ship.x, ship.y, PALETTE.enemyShot, 22, 1.8, 4.9, 22, 62);
    playerShots = [];
    enemyShots = [];
    ship.active = false;
    ship.vx = 0;
    ship.vy = 0;
    lives -= 1;
    stopLoop("shipFly");
    resetCombatMomentum();
    addScreenShake(14, 22);
    triggerFlash(PALETTE.enemyShot, 0.24);

    if (lives <= 0) {
        gameState = "gameOver";
        playEffect("gameOver");
        saveHighScore();
        return;
    }

    ship.respawnTimer = SHIP_RESPAWN_FRAMES;
    playEffect("asteroidHit");
}

function updateShip(dt) {
    if (!ship.active) {
        ship.fireCooldown = 0;

        if (ship.respawnTimer > 0) {
            ship.respawnTimer -= dt;
        }

        if (ship.respawnTimer <= 0 && isRespawnZoneSafe() && gameState === "playing") {
            resetShip();
        }

        return;
    }

    if (ship.fireCooldown > 0) {
        ship.fireCooldown = Math.max(0, ship.fireCooldown - dt);
    }

    if (ship.hyperspaceCooldown > 0) {
        ship.hyperspaceCooldown = Math.max(0, ship.hyperspaceCooldown - dt);
    }

    if (ship.invulnerable > 0) {
        ship.invulnerable = Math.max(0, ship.invulnerable - dt);
    }

    if (updateHyperspaceSequence(dt)) {
        return;
    }

    const touchSteerActive = touchSteerPointerId !== null;
    const steerPointerActive = touchSteerActive || mouseSteerActive;
    let pointerThrustReady = false;

    if (steerPointerActive) {
        const targetAngle = Math.atan2(touchSteerTargetY - ship.y, touchSteerTargetX - ship.x) + Math.PI / 2;
        const delta = getShortestAngleDelta(ship.angle, targetAngle);
        const maxTurn = ship.rotationSpeed * dt;

        if (Math.abs(delta) <= maxTurn) {
            ship.angle = targetAngle;
            pointerThrustReady = true;
        } else {
            ship.angle += Math.sign(delta) * maxTurn;
        }
    }

    if (keys.left && !steerPointerActive) {
        ship.angle -= ship.rotationSpeed * dt;
    }
    if (keys.right && !steerPointerActive) {
        ship.angle += ship.rotationSpeed * dt;
    }
    if (keys.thrust || mouseThrustActive || (touchSteerActive && pointerThrustReady)) {
        const angle = ship.angle - Math.PI / 2;
        ship.vx += Math.cos(angle) * ship.thrust * dt;
        ship.vy += Math.sin(angle) * ship.thrust * dt;
    }

    applyLargeAsteroidGravity(dt);

    ship.vx *= Math.pow(ship.friction, dt);
    ship.vy *= Math.pow(ship.friction, dt);

    const speed = Math.hypot(ship.vx, ship.vy);
    if (speed > ship.maxSpeed) {
        ship.vx = (ship.vx / speed) * ship.maxSpeed;
        ship.vy = (ship.vy / speed) * ship.maxSpeed;
    }

    ship.x += ship.vx * dt;
    ship.y += ship.vy * dt;
    wrapEntity(ship, ship.radius);

    if (keys.fire) {
        firePlayerShot();
    }
}

function updateAsteroids(dt) {
    for (const asteroid of asteroids) {
        if (asteroid.isTitan && ship.active) {
            const seekAngle = Math.atan2(ship.y - asteroid.y, ship.x - asteroid.x);
            asteroid.vx += Math.cos(seekAngle) * 0.00135 * gameplayProfile.movementScale * dt;
            asteroid.vy += Math.sin(seekAngle) * 0.00135 * gameplayProfile.movementScale * dt;
            const titanSpeedCap = Math.min(
                TITAN_SPEED_MAX * gameplayProfile.movementScale,
                (asteroid.titanApproachSpeed || TITAN_BASE_SPEED) * gameplayProfile.movementScale * 1.45
            );
            const titanSpeed = Math.hypot(asteroid.vx, asteroid.vy);
            if (titanSpeed > titanSpeedCap) {
                asteroid.vx = (asteroid.vx / titanSpeed) * titanSpeedCap;
                asteroid.vy = (asteroid.vy / titanSpeed) * titanSpeedCap;
            }
        } else if (asteroid.elite && ship.active) {
            const seekAngle = Math.atan2(ship.y - asteroid.y, ship.x - asteroid.x);
            asteroid.vx += Math.cos(seekAngle) * 0.0022 * gameplayProfile.movementScale * dt;
            asteroid.vy += Math.sin(seekAngle) * 0.0022 * gameplayProfile.movementScale * dt;
        }

        if (!asteroid.rogue) {
            const maxSpeed = Number.isFinite(asteroid.maxSpeed) ? asteroid.maxSpeed : Infinity;
            if (Number.isFinite(maxSpeed) && maxSpeed > 0) {
                const speed = Math.hypot(asteroid.vx, asteroid.vy);
                if (speed > maxSpeed) {
                    asteroid.vx = (asteroid.vx / speed) * maxSpeed;
                    asteroid.vy = (asteroid.vy / speed) * maxSpeed;
                }
            }
        }

        if (asteroid.overlapImpactImmuneFrames > 0) {
            asteroid.overlapImpactImmuneFrames = Math.max(0, asteroid.overlapImpactImmuneFrames - dt);
        }

        asteroid.x += asteroid.vx * dt;
        asteroid.y += asteroid.vy * dt;
        asteroid.angle += asteroid.rotation * dt;
        wrapEntity(asteroid, asteroid.radius);
    }
}

function getNearestAsteroidToPoint(x, y) {
    if (asteroids.length === 0) {
        return null;
    }

    let nearestAsteroid = null;
    let nearestDistanceSq = Infinity;
    for (const asteroid of asteroids) {
        const dx = asteroid.x - x;
        const dy = asteroid.y - y;
        const distanceSq = dx * dx + dy * dy;
        if (distanceSq < nearestDistanceSq) {
            nearestDistanceSq = distanceSq;
            nearestAsteroid = asteroid;
        }
    }
    return nearestAsteroid;
}

function updateHomingShot(shot, dt) {
    const target = getNearestAsteroidToPoint(shot.x, shot.y);
    if (!target) {
        return;
    }

    const desiredAngle = Math.atan2(target.y - shot.y, target.x - shot.x);
    const currentAngle = Math.atan2(shot.vy, shot.vx);
    const delta = getShortestAngleDelta(currentAngle, desiredAngle);
    const maxTurn = PLAYER_HOMING_TURN_RATE * dt;
    const turn = Math.max(-maxTurn, Math.min(maxTurn, delta));
    const nextAngle = currentAngle + turn;
    const speed = Math.hypot(shot.vx, shot.vy);
    shot.vx = Math.cos(nextAngle) * speed;
    shot.vy = Math.sin(nextAngle) * speed;
}

function updateShotArray(shotArray, dt) {
    const homingShots = shotArray === playerShots;
    for (let index = shotArray.length - 1; index >= 0; index -= 1) {
        const shot = shotArray[index];
        if (homingShots && shot.homing) {
            updateHomingShot(shot, dt);
        }
        shot.x += shot.vx * dt;
        shot.y += shot.vy * dt;
        shot.life -= dt;

        if (shot.life <= 0) {
            shotArray.splice(index, 1);
            continue;
        }

        wrapEntity(shot, shot.radius);
    }
}

function updateUfos(dt) {
    if (ufos.length === 0 && gameState === "playing" && wave >= 2) {
        nextUfoSpawnTimer -= dt;
        if (nextUfoSpawnTimer <= 0) {
            spawnUfo();
        }
    }

    for (let index = ufos.length - 1; index >= 0; index -= 1) {
        const ufo = ufos[index];
        ufo.courseShiftTimer -= dt;
        if (ufo.courseShiftTimer <= 0) {
            applyCourseShift(ufo);
        }
        ufo.x += ufo.vx * dt;
        ufo.y += ufo.vy * dt;
        ufo.fireCooldown -= dt;

        if (ufo.fireCooldown <= 0) {
            fireUfoShot(ufo);
            const surgeCooldownMultiplier = surgeActive ? THREAT_SURGE_UFO_COOLDOWN_MULTIPLIER : 1;
            ufo.fireCooldown = (ufo.shotInterval + randomBetween(0, 40)) * surgeCooldownMultiplier;
        }

        if (ufo.y < 60 || ufo.y > canvas.height * 0.7) {
            ufo.vy *= -1;
        }

        if (ufo.x < -90 || ufo.x > canvas.width + 90) {
            removeUfo(index, false);
        }
    }
}

function updateDecoys(dt) {
    for (const decoy of decoys) {
        decoy.x += decoy.vx * dt;
        decoy.y += decoy.vy * dt;
        decoy.angle = Math.atan2(decoy.vy, decoy.vx) + Math.PI / 2;
        wrapEntity(decoy, decoy.radius);
    }
}

function updateThreatBomb(dt) {
    if (gameState !== "playing") {
        return;
    }

    if (!threatBomb) {
        if (wave < 3) {
            return;
        }
        nextThreatBombTimer -= dt;
        if (nextThreatBombTimer <= 0) {
            spawnThreatBomb();
        }
        return;
    }

    threatBomb.blinkTimer += dt;
    const blinkPhase = Math.floor(threatBomb.blinkTimer / 10) % 2;
    if (blinkPhase === 0 && threatBomb.lastBlinkPhase !== 0) {
        playThreatBombBlip();
    }
    threatBomb.lastBlinkPhase = blinkPhase;
    threatBomb.courseShiftTimer -= dt;
    if (threatBomb.courseShiftTimer <= 0) {
        applyCourseShift(threatBomb);
    }

    const exitPull = THREAT_BOMB_EXIT_PULL_STRENGTH * gameplayProfile.movementScale * dt;
    if (threatBomb.exitEdge === "right") {
        threatBomb.vx += exitPull;
    } else if (threatBomb.exitEdge === "left") {
        threatBomb.vx -= exitPull;
    } else if (threatBomb.exitEdge === "bottom") {
        threatBomb.vy += exitPull;
    } else {
        threatBomb.vy -= exitPull;
    }

    threatBomb.x += threatBomb.vx * dt;
    threatBomb.y += threatBomb.vy * dt;

    if (
        !threatBomb.enteredPlayfield
        && threatBomb.x >= 0
        && threatBomb.x <= canvas.width
        && threatBomb.y >= 0
        && threatBomb.y <= canvas.height
    ) {
        threatBomb.enteredPlayfield = true;
    }

    for (const asteroid of asteroids) {
        if (!circlesOverlap(threatBomb, asteroid)) {
            continue;
        }

        bounceDynamicCircleOffCircle(threatBomb, asteroid, {
            minimumRebound: 1.1,
            maxSpeed: 5.2 * gameplayProfile.movementScale,
            maxSpeedMultiplier: 1.35
        });
        addScreenShake(2, 3);
    }

    if (ship.active && !ship.hyperspaceSequence && !hasAntiGravityField() && circlesOverlap(threatBomb, ship)) {
        bounceDynamicCircleOffCircle(threatBomb, ship, {
            minimumRebound: 1.35,
            maxSpeed: 5.5 * gameplayProfile.movementScale,
            maxSpeedMultiplier: 1.4,
            pushObstacle: true
        });
        addScreenShake(3, 4);
        triggerFlash(PALETTE.shield, 0.05);
    }

    const offscreenMargin = threatBomb.radius * 2.8;
    let offscreenEdge = null;
    if (threatBomb.x < -offscreenMargin) {
        offscreenEdge = "left";
    } else if (threatBomb.x > canvas.width + offscreenMargin) {
        offscreenEdge = "right";
    } else if (threatBomb.y < -offscreenMargin) {
        offscreenEdge = "top";
    } else if (threatBomb.y > canvas.height + offscreenMargin) {
        offscreenEdge = "bottom";
    }

    if (threatBomb.enteredPlayfield && offscreenEdge) {
        if (offscreenEdge === threatBomb.exitEdge) {
            threatBomb = null;
            scheduleThreatBomb();
        } else {
            wrapEntity(threatBomb, threatBomb.radius);
        }
    }
}

function updateMineralField(dt) {
    if (gameState !== "playing") {
        return;
    }

    if (!mineralField) {
        if (wave < 3) {
            return;
        }
        nextMineralFieldTimer -= dt;
        if (nextMineralFieldTimer <= 0) {
            spawnMineralField();
        }
        return;
    }

    mineralField.colorTimer += dt;
    const offscreenMargin = MINERAL_PARTICLE_SIZE * 2.8 * gameplayProfile.entityScale;
    for (let index = mineralField.particles.length - 1; index >= 0; index -= 1) {
        const mineral = mineralField.particles[index];
        mineral.x += mineral.vx * dt;
        mineral.y += mineral.vy * dt;
        mineral.angle += mineral.rotation * dt;

        if (ship.active && !hasAntiGravityField() && circlesOverlap(ship, mineral)) {
            collectMineralParticle(index);
            continue;
        }

        let offscreenEdge = null;
        if (mineral.x < -offscreenMargin) {
            offscreenEdge = "left";
        } else if (mineral.x > canvas.width + offscreenMargin) {
            offscreenEdge = "right";
        } else if (mineral.y < -offscreenMargin) {
            offscreenEdge = "top";
        } else if (mineral.y > canvas.height + offscreenMargin) {
            offscreenEdge = "bottom";
        }

        if (offscreenEdge) {
            mineralField.particles.splice(index, 1);
        }
    }

    if (mineralField.particles.length === 0) {
        mineralField = null;
        scheduleMineralField();
    }
}

function updateParticles(dt) {
    for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];
        particle.x += particle.vx * dt;
        particle.y += particle.vy * dt;
        particle.life -= dt;

        if (particle.life <= 0) {
            particles.splice(index, 1);
        }
    }
}

function consumePlayerShot(shotIndex) {
    const shot = playerShots[shotIndex];
    if (!shot) {
        return;
    }

    if (shot.pierce > 0) {
        shot.pierce -= 1;
    } else {
        playerShots.splice(shotIndex, 1);
    }
}

function updateBossAlert(dt) {
    if (bossAlertTimer > 0) {
        bossAlertTimer = Math.max(0, bossAlertTimer - dt);
        if (bossAlertTimer === 0) {
            bossAlertMessage = "";
        }
    }
}

function updateTitanPulse(dt) {
    const titanAlive = asteroids.some((asteroid) => asteroid.isTitan);
    if (!titanAlive) {
        titanPulseTimer = 0;
        return;
    }

    titanPulseTimer -= dt;
    if (titanPulseTimer > 0) {
        return;
    }

    titanPulseTimer = randomBetween(TITAN_PULSE_MIN_FRAMES, TITAN_PULSE_MAX_FRAMES);
    playEffect("titanAlarm");
    addScreenShake(7, 10);
    triggerFlash("rgba(255, 165, 120, 0.95)", 0.08);
}

function handlePlayerShotCollisions() {
    for (let shotIndex = playerShots.length - 1; shotIndex >= 0; shotIndex -= 1) {
        const shot = playerShots[shotIndex];
        if (!shot) {
            continue;
        }
        let consumed = false;

        if (threatBomb && circlesOverlap(shot, threatBomb)) {
            consumePlayerShot(shotIndex);
            detonateThreatBomb();
            continue;
        }

        for (let asteroidIndex = asteroids.length - 1; asteroidIndex >= 0; asteroidIndex -= 1) {
            if (circlesOverlap(shot, asteroids[asteroidIndex])) {
                const shotAngle = Math.atan2(shot.vy, shot.vx);
                destroyAsteroid(asteroidIndex, shotAngle);
                consumePlayerShot(shotIndex);
                consumed = true;
                break;
            }
        }

        if (consumed) {
            continue;
        }

        for (let ufoIndex = ufos.length - 1; ufoIndex >= 0; ufoIndex -= 1) {
            if (circlesOverlap(shot, ufos[ufoIndex])) {
                removeUfo(ufoIndex, true);
                consumePlayerShot(shotIndex);
                break;
            }
        }

        if (!playerShots[shotIndex]) {
            continue;
        }

        for (let decoyIndex = decoys.length - 1; decoyIndex >= 0; decoyIndex -= 1) {
            if (circlesOverlap(playerShots[shotIndex], decoys[decoyIndex])) {
                removeDecoy(decoyIndex, true);
                consumePlayerShot(shotIndex);
                break;
            }
        }
    }
}

function handleEnemyShotCollisions() {
    for (let shotIndex = enemyShots.length - 1; shotIndex >= 0; shotIndex -= 1) {
        const shot = enemyShots[shotIndex];

        for (let asteroidIndex = asteroids.length - 1; asteroidIndex >= 0; asteroidIndex -= 1) {
            if (circlesOverlap(shot, asteroids[asteroidIndex])) {
                const shotAngle = Math.atan2(shot.vy, shot.vx);
                destroyAsteroid(asteroidIndex, shotAngle, false);
                enemyShots.splice(shotIndex, 1);
                break;
            }
        }
    }
}

function handleUfoAsteroidCollisions() {
    for (let ufoIndex = ufos.length - 1; ufoIndex >= 0; ufoIndex -= 1) {
        const ufo = ufos[ufoIndex];
        for (let asteroidIndex = asteroids.length - 1; asteroidIndex >= 0; asteroidIndex -= 1) {
            if (circlesOverlap(ufo, asteroids[asteroidIndex])) {
                const shotAngle = Math.atan2(ufo.vy, ufo.vx);
                destroyAsteroid(asteroidIndex, shotAngle, false);
                removeUfo(ufoIndex, false);
                break;
            }
        }
    }
}

function handleDecoyCollisions() {
    for (let decoyIndex = decoys.length - 1; decoyIndex >= 0; decoyIndex -= 1) {
        const decoy = decoys[decoyIndex];
        let exploded = false;

        for (let asteroidIndex = asteroids.length - 1; asteroidIndex >= 0; asteroidIndex -= 1) {
            if (circlesOverlap(decoy, asteroids[asteroidIndex])) {
                const shotAngle = Math.atan2(decoy.vy, decoy.vx);
                destroyAsteroid(asteroidIndex, shotAngle, false);
                removeDecoy(decoyIndex, true);
                exploded = true;
                break;
            }
        }

        if (exploded) {
            continue;
        }

        if (ship.active && !ship.hyperspaceSequence && !hasAntiGravityField() && circlesOverlap(decoy, ship)) {
            if (!godModeEnabled) {
                destroyShip();
            }
            removeDecoy(decoyIndex, true);
        }
    }
}

function handleShipCollisions() {
    if (!ship.active || ship.hyperspaceSequence || (ship.invulnerable > 0 && !godModeEnabled)) {
        return;
    }

    if (hasAntiGravityField()) {
        return;
    }

    for (const asteroid of asteroids) {
        if (circlesOverlap(ship, asteroid)) {
            if (godModeEnabled) {
                bounceShipOffAsteroid(asteroid);
                return;
            }
            destroyShip();
            return;
        }
    }

    for (const ufo of ufos) {
        if (circlesOverlap(ship, ufo)) {
            if (godModeEnabled) {
                continue;
            }
            destroyShip();
            return;
        }
    }

    for (let index = enemyShots.length - 1; index >= 0; index -= 1) {
        if (circlesOverlap(ship, enemyShots[index])) {
            if (godModeEnabled) {
                enemyShots.splice(index, 1);
                triggerFlash(PALETTE.shield, 0.06);
                continue;
            }
            enemyShots.splice(index, 1);
            destroyShip();
            return;
        }
    }
}

function handleWaveProgression(dt) {
    if (asteroids.length > 0 || ufos.length > 0 || decoys.length > 0) {
        nextWaveTimer = -1;
        return;
    }

    if (nextWaveTimer < 0) {
        nextWaveTimer = WAVE_DELAY_FRAMES;
    }

    nextWaveTimer -= dt;
    if (nextWaveTimer <= 0) {
        if (shouldOfferUpgrade()) {
            openUpgradeDraft();
        } else {
            spawnWave();
        }
    }
}

function updateGame(dt) {
    if (gameState === "about" || gameState === "help" || gameState === "godHelp") {
        return;
    }

    if (gameState !== "playing") {
        updateParticles(dt);
        updateBossAlert(dt);
        updateFeedback(dt);
        return;
    }

    updateTimedPowerups(dt);
    updateShip(dt);
    updateAsteroids(dt);
    handleAsteroidOverlapImpacts();
    updateShotArray(playerShots, dt);
    updateShotArray(enemyShots, dt);
    updateUfos(dt);
    updateDecoys(dt);
    updateThreatBomb(dt);
    updateMineralField(dt);
    applyAntiGravityField(dt);
    handlePlayerShotCollisions();
    handleEnemyShotCollisions();
    handleUfoAsteroidCollisions();
    handleDecoyCollisions();
    handleShipCollisions();
    handleWaveProgression(dt);
    updateTitanPulse(dt);
    updateThreatSurge(dt);
    updateParticles(dt);
    updateBossAlert(dt);
    updateFeedback(dt);
}

function drawBackground() {
    const time = lastFrameTime * 0.001;
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, PALETTE.bgTop);
    gradient.addColorStop(1, PALETTE.bgBottom);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const nebulae = [
        { x: canvas.width * 0.18, y: canvas.height * 0.22, radius: canvas.width * 0.34, color: PALETTE.nebulaA },
        { x: canvas.width * 0.78, y: canvas.height * 0.3, radius: canvas.width * 0.28, color: PALETTE.nebulaB },
        { x: canvas.width * 0.52, y: canvas.height * 0.82, radius: canvas.width * 0.42, color: PALETTE.nebulaC }
    ];

    nebulae.forEach((nebula, index) => {
        const drift = Math.sin(time * (0.18 + index * 0.05) + index) * 18;
        const glow = ctx.createRadialGradient(
            nebula.x + drift,
            nebula.y - drift * 0.35,
            0,
            nebula.x + drift,
            nebula.y - drift * 0.35,
            nebula.radius
        );
        glow.addColorStop(0, nebula.color);
        glow.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    });

    drawMilkyWayPhoto(time);

    for (const star of stars) {
        const primaryTwinkle = Math.sin(time * star.twinkleSpeed + star.phase) * 0.09;
        const secondaryTwinkle = Math.sin(time * (star.twinkleSpeed * 0.41) + star.phase * 0.67) * 0.03;
        const twinkle = Math.max(0.78, Math.min(1.05, 0.9 + primaryTwinkle + secondaryTwinkle));
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha * twinkle;
        ctx.fillRect(star.x, star.y, star.radius, star.radius);
    }
    ctx.globalAlpha = 1;
}

function drawMilkyWayPhoto(time) {
    if (!milkyWayPhotoReady || !milkyWayPhoto.naturalWidth || !milkyWayPhoto.naturalHeight) {
        return;
    }

    const imageAspect = milkyWayPhoto.naturalWidth / milkyWayPhoto.naturalHeight;
    const canvasAspect = canvas.width / canvas.height;
    const fillScale = 1.16;
    const drawWidth = imageAspect >= canvasAspect
        ? canvas.height * fillScale * imageAspect
        : canvas.width * fillScale;
    const drawHeight = imageAspect >= canvasAspect
        ? canvas.height * fillScale
        : (canvas.width * fillScale) / imageAspect;

    const baseX = (canvas.width - drawWidth) * 0.5;
    const baseY = (canvas.height - drawHeight) * 0.5;
    const driftX = Math.sin(time * 0.03) * 26;
    const driftY = Math.cos(time * 0.02) * 16;

    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.globalAlpha = 0.22;
    ctx.filter = "saturate(1.08) contrast(1.05) brightness(0.74)";
    ctx.drawImage(
        milkyWayPhoto,
        baseX + driftX,
        baseY + driftY,
        drawWidth,
        drawHeight
    );

    const blendVignette = ctx.createRadialGradient(
        canvas.width * 0.52,
        canvas.height * 0.5,
        canvas.width * 0.14,
        canvas.width * 0.52,
        canvas.height * 0.5,
        canvas.width * 0.85
    );
    blendVignette.addColorStop(0, "rgba(0, 0, 0, 0)");
    blendVignette.addColorStop(1, "rgba(0, 0, 0, 0.1)");
    ctx.globalCompositeOperation = "source-over";
    ctx.filter = "none";
    ctx.globalAlpha = 1;
    ctx.fillStyle = blendVignette;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
}

function drawShipOutline(x, y, angle, scale = 1) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.scale(scale, scale);
    ctx.beginPath();
    ctx.moveTo(0, -15);
    ctx.lineTo(10, 12);
    ctx.lineTo(3, 9);
    ctx.lineTo(0, 15);
    ctx.lineTo(-3, 9);
    ctx.lineTo(-10, 12);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}

function drawShipPowerupVisuals() {
    const noseAngle = ship.angle - Math.PI / 2;
    const nx = Math.cos(noseAngle);
    const ny = Math.sin(noseAngle);
    const rx = Math.cos(noseAngle + Math.PI / 2);
    const ry = Math.sin(noseAngle + Math.PI / 2);
    const t = lastFrameTime * 0.001;

    ctx.save();

    if (upgradeState.rapidFire > 0) {
        ctx.strokeStyle = PALETTE.rapidFire;
        ctx.shadowColor = PALETTE.rapidFire;
        ctx.shadowBlur = 12;
        ctx.lineWidth = 1.8;
        for (let sparkIndex = -1; sparkIndex <= 1; sparkIndex += 1) {
            const phase = t * 10 + sparkIndex * 1.2;
            const sparkDist = ship.radius + 8 + (Math.sin(phase) + 1) * 1.8;
            const sparkX = ship.x + nx * sparkDist + rx * sparkIndex * 4.6;
            const sparkY = ship.y + ny * sparkDist + ry * sparkIndex * 4.6;
            ctx.beginPath();
            ctx.moveTo(sparkX, sparkY);
            ctx.lineTo(sparkX - nx * 5.4, sparkY - ny * 5.4);
            ctx.stroke();
        }
    }

    if (upgradeState.multiShot > 0) {
        const podOffset = ship.radius + 2;
        const podRadius = 1.8 + Math.min(2.6, upgradeState.multiShot * 0.45);
        ctx.fillStyle = PALETTE.multiShot;
        ctx.shadowColor = PALETTE.multiShot;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(ship.x + rx * podOffset, ship.y + ry * podOffset, podRadius, 0, Math.PI * 2);
        ctx.arc(ship.x - rx * podOffset, ship.y - ry * podOffset, podRadius, 0, Math.PI * 2);
        ctx.fill();
    }

    if (upgradeState.piercing > 0) {
        const pulse = 0.42 + (Math.sin(t * 7.2) + 1) * 0.18;
        const r = ship.radius + 6;
        ctx.globalAlpha = pulse;
        ctx.strokeStyle = PALETTE.piercing;
        ctx.shadowColor = PALETTE.piercing;
        ctx.shadowBlur = 12;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(ship.x, ship.y - r);
        ctx.lineTo(ship.x + r, ship.y);
        ctx.lineTo(ship.x, ship.y + r);
        ctx.lineTo(ship.x - r, ship.y);
        ctx.closePath();
        ctx.stroke();
        ctx.globalAlpha = 1;
    }

    if (upgradeState.thrusters > 0) {
        const boostPulse = 0.3 + (Math.sin(t * 5.4) + 1) * 0.16;
        const rearX = ship.x - nx * (ship.radius + 7);
        const rearY = ship.y - ny * (ship.radius + 7);
        const flareLen = (isTouchThrustingActive() ? 11 : 6) * ship.modelScale;
        ctx.strokeStyle = PALETTE.thrustersBoost;
        ctx.shadowColor = PALETTE.thrustersBoost;
        ctx.shadowBlur = 16;
        ctx.globalAlpha = boostPulse;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(rearX - rx * 4, rearY - ry * 4);
        ctx.lineTo(rearX - nx * flareLen, rearY - ny * flareLen);
        ctx.lineTo(rearX + rx * 4, rearY + ry * 4);
        ctx.stroke();
        ctx.globalAlpha = 1;
    }

    if (upgradeState.gravityDampers > 0) {
        const dampRadius = ship.radius + 11;
        ctx.strokeStyle = PALETTE.gravityDampers;
        ctx.shadowColor = PALETTE.gravityDampers;
        ctx.shadowBlur = 10;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 5]);
        ctx.lineDashOffset = -t * 42;
        ctx.globalAlpha = 0.58;
        ctx.beginPath();
        ctx.arc(ship.x, ship.y, dampRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([2, 6]);
        ctx.lineDashOffset = t * 34;
        ctx.globalAlpha = 0.34;
        ctx.beginPath();
        ctx.arc(ship.x, ship.y, dampRadius + 5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
    }

    if (upgradeState.naniteRepair > 0) {
        const pulse = 0.5 + (Math.sin(t * 6.8) + 1) * 0.18;
        const markX = ship.x + nx * (ship.radius + 3);
        const markY = ship.y + ny * (ship.radius + 3);
        ctx.strokeStyle = PALETTE.nanite;
        ctx.shadowColor = PALETTE.nanite;
        ctx.shadowBlur = 10;
        ctx.globalAlpha = pulse;
        ctx.lineWidth = 1.9;
        ctx.beginPath();
        ctx.moveTo(markX - 4, markY);
        ctx.lineTo(markX + 4, markY);
        ctx.moveTo(markX, markY - 4);
        ctx.lineTo(markX, markY + 4);
        ctx.stroke();
        ctx.globalAlpha = 1;
    }

    if (upgradeState.shotRange > 0) {
        const rangeRadius = ship.radius + 18;
        ctx.strokeStyle = PALETTE.shotRange;
        ctx.shadowColor = PALETTE.shotRange;
        ctx.shadowBlur = 11;
        ctx.globalAlpha = 0.38;
        ctx.lineWidth = 1.3;
        ctx.setLineDash([2, 7]);
        ctx.lineDashOffset = t * 28;
        ctx.beginPath();
        ctx.arc(ship.x, ship.y, rangeRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
    }

    if (upgradeState.homing > 0) {
        const orbitAngle = t * 3.1;
        const orbitRadius = ship.radius + 15;
        const hx = ship.x + Math.cos(orbitAngle) * orbitRadius;
        const hy = ship.y + Math.sin(orbitAngle) * orbitRadius;
        ctx.strokeStyle = PALETTE.homing;
        ctx.fillStyle = PALETTE.homing;
        ctx.shadowColor = PALETTE.homing;
        ctx.shadowBlur = 10;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(hx, hy, 3.1, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(hx + 4.6, hy);
        ctx.lineTo(hx + 7.6, hy - 1.4);
        ctx.lineTo(hx + 7.6, hy + 1.4);
        ctx.closePath();
        ctx.fill();
    }

    ctx.restore();
}

function drawShip() {
    if (!ship.active) {
        return;
    }

    const hyperspaceSequence = ship.hyperspaceSequence;
    if (hyperspaceSequence && hyperspaceSequence.phase === "transit") {
        return;
    }

    const invulnerableBlinkHidden = ship.invulnerable > 0 && Math.floor(ship.invulnerable / 7) % 2 === 0;
    const powerupExpiryBlinkHidden = shipPowerupWarningBlinkFrames > 0
        && gameState === "playing"
        && Math.floor(shipPowerupWarningBlinkFrames / 6) % 2 === 0;
    if (invulnerableBlinkHidden || powerupExpiryBlinkHidden) {
        return;
    }

    ctx.save();
    ctx.strokeStyle = PALETTE.ship;
    ctx.lineWidth = 2;

    if (ship.shields > 0) {
        ctx.strokeStyle = PALETTE.shield;
        ctx.globalAlpha = 0.4 + ship.shields * 0.14;
        ctx.beginPath();
        ctx.arc(ship.x, ship.y, ship.radius + 9, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = PALETTE.ship;
    }

    if (hasAntiGravityField()) {
        const pulse = 0.62 + Math.sin(lastFrameTime * 0.012) * 0.25;
        const ringRadius = ship.radius + 14 * ship.modelScale;
        ctx.strokeStyle = PALETTE.antiGravity;
        ctx.shadowColor = PALETTE.antiGravity;
        ctx.shadowBlur = 18;
        ctx.globalAlpha = 0.42 + pulse * 0.28;
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.arc(ship.x, ship.y, ringRadius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.globalAlpha = 0.2 + pulse * 0.22;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(ship.x, ship.y, ringRadius + 7 * ship.modelScale, 0, Math.PI * 2);
        ctx.stroke();

        ctx.globalAlpha = 1;
        ctx.strokeStyle = PALETTE.ship;
    }

    drawShipPowerupVisuals();

    ctx.shadowColor = PALETTE.ship;
    ctx.shadowBlur = 12;
    if (hyperspaceSequence) {
        if (hyperspaceSequence.phase === "spinOut") {
            const outProgress = Math.min(1, hyperspaceSequence.timer / HYPERSPACE_SPIN_OUT_FRAMES);
            ctx.globalAlpha *= 1 - outProgress * 0.32;
        } else if (hyperspaceSequence.phase === "spinIn") {
            const inProgress = Math.min(1, hyperspaceSequence.timer / HYPERSPACE_SPIN_IN_FRAMES);
            ctx.globalAlpha *= 0.45 + inProgress * 0.55;
        }
    }
    drawShipOutline(ship.x, ship.y, ship.angle, ship.modelScale);

    if (isTouchThrustingActive() && !hyperspaceSequence) {
        ctx.translate(ship.x, ship.y);
        ctx.rotate(ship.angle);
        ctx.strokeStyle = PALETTE.thrust;
        ctx.shadowColor = PALETTE.thrust;
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.moveTo(-4 * ship.modelScale, 12 * ship.modelScale);
        ctx.lineTo(0, (24 + Math.random() * 6) * ship.modelScale);
        ctx.lineTo(4 * ship.modelScale, 12 * ship.modelScale);
        ctx.stroke();
    }

    ctx.restore();
}

function drawAsteroids() {
    largeAsteroidTextureRebuildBudget = LARGE_ASTEROID_TEXTURE_REBUILDS_PER_FRAME;
    for (const asteroid of asteroids) {
        ctx.save();
        ctx.translate(asteroid.x, asteroid.y);
        ctx.rotate(asteroid.angle);

        if (asteroid.isTitan) {
            const pulse = 0.42 + (Math.sin(lastFrameTime * 0.01 + asteroid.x * 0.003 + asteroid.y * 0.002) + 1) * 0.18;
            if (titanPhotoReady && titanPhotoMaskedCanvas) {
                const maxDimension = Math.max(titanPhotoMaskedCanvas.width, titanPhotoMaskedCanvas.height);
                const baseDiameter = asteroid.radius * 2.02;
                const drawScale = baseDiameter / Math.max(1, maxDimension);
                const drawWidth = titanPhotoMaskedCanvas.width * drawScale;
                const drawHeight = titanPhotoMaskedCanvas.height * drawScale;
                ctx.globalAlpha = 1;
                ctx.shadowColor = `rgba(255, 190, 140, ${(0.2 + pulse * 0.22).toFixed(3)})`;
                ctx.shadowBlur = 7 + pulse * 8;
                const previousSmoothing = ctx.imageSmoothingEnabled;
                ctx.imageSmoothingEnabled = true;
                ctx.filter = "brightness(1.04) contrast(1.05)";
                ctx.drawImage(titanPhotoMaskedCanvas, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
                ctx.filter = "none";
                ctx.imageSmoothingEnabled = previousSmoothing;
            } else {
                const drewLargeTexture = ensureLargeAsteroidTexture(asteroid);
                if (drewLargeTexture && asteroid.largeVisualTexture) {
                    const size = asteroid.largeVisualTextureSize;
                    ctx.globalAlpha = 1;
                    ctx.shadowColor = "rgba(255, 190, 140, 0.46)";
                    ctx.shadowBlur = 12;
                    ctx.filter = "brightness(1.18) contrast(1.16)";
                    ctx.drawImage(asteroid.largeVisualTexture, -size / 2, -size / 2, size, size);
                    ctx.filter = "none";
                } else {
                    ctx.fillStyle = "rgba(112, 65, 40, 0.48)";
                    ctx.strokeStyle = "#f7c29b";
                    ctx.lineWidth = 4;
                    ctx.shadowColor = "rgba(255, 190, 140, 0.9)";
                    ctx.shadowBlur = 24;
                    traceAsteroidPath(ctx, asteroid.points);
                    ctx.fill();
                    ctx.stroke();
                }
            }
            ctx.globalAlpha = 1;
            ctx.restore();
            continue;
        }

        const drewLargeTexture = ensureLargeAsteroidTexture(asteroid);

        if (drewLargeTexture && asteroid.largeVisualTexture) {
            const size = asteroid.largeVisualTextureSize;
            ctx.globalAlpha = 1;
            ctx.shadowColor = "transparent";
            ctx.shadowBlur = 0;
            ctx.filter = "brightness(1.14) contrast(1.12)";
            ctx.drawImage(asteroid.largeVisualTexture, -size / 2, -size / 2, size, size);
            ctx.filter = "none";
            if (LARGE_ASTEROID_SHADER_DEBUG_MODE) {
                const sweep = Math.sin(lastFrameTime * 0.003 + asteroid.x * 0.013 + asteroid.y * 0.009);
                const highlightAlpha = 0.18 + (sweep + 1) * 0.16;
                const highlight = ctx.createLinearGradient(
                    -asteroid.radius * 1.1,
                    -asteroid.radius * 0.95,
                    asteroid.radius * 1.1,
                    asteroid.radius * 0.95
                );
                highlight.addColorStop(0, "rgba(255, 255, 255, 0)");
                highlight.addColorStop(0.42, `rgba(255, 246, 222, ${highlightAlpha.toFixed(3)})`);
                highlight.addColorStop(0.58, `rgba(255, 210, 166, ${(highlightAlpha * 0.7).toFixed(3)})`);
                highlight.addColorStop(1, "rgba(255, 255, 255, 0)");
                ctx.globalCompositeOperation = "screen";
                ctx.globalAlpha = 1;
                ctx.fillStyle = highlight;
                traceAsteroidPath(ctx, asteroid.points);
                ctx.fill();
                ctx.globalCompositeOperation = "source-over";
            }
            ctx.globalAlpha = 1;
        } else {
            ctx.fillStyle = asteroid.solidFillColor || asteroid.fillColor;
            ctx.strokeStyle = asteroid.strokeColor;
            ctx.lineWidth = asteroid.elite ? 3 : 2;
            ctx.shadowColor = asteroid.glowColor;
            ctx.shadowBlur = asteroid.elite ? 16 : 8;
            traceAsteroidPath(ctx, asteroid.points);
            ctx.fill();
            ctx.stroke();
        }

        if (asteroid.elite) {
            ctx.globalAlpha = 0.35 + asteroid.durability * 0.08;
            ctx.strokeStyle = asteroid.glowColor;
            ctx.beginPath();
            ctx.arc(0, 0, asteroid.radius * 0.65, 0, Math.PI * 2);
            ctx.stroke();
        }

        ctx.restore();
    }
}

function drawShotArray(shotArray, color = "#ffffff") {
    const isPlayerShots = shotArray === playerShots;
    ctx.save();

    for (const shot of shotArray) {
        const shotColor = isPlayerShots
            ? (shot.homing ? PALETTE.homing : (shot.pierce > 0 ? PALETTE.piercing : color))
            : color;
        const trailLength = isPlayerShots && shot.rangeBoost ? 2.1 : 1.4;
        const shotLineWidth = isPlayerShots && shot.homing ? 2.35 : 2;
        const blur = isPlayerShots && shot.homing ? 16 : 12;
        const tailX = shot.x - shot.vx * trailLength;
        const tailY = shot.y - shot.vy * trailLength;

        if (isPlayerShots && shot.pierce > 0) {
            ctx.strokeStyle = "rgba(255, 171, 255, 0.78)";
            ctx.shadowColor = PALETTE.piercing;
            ctx.shadowBlur = 14;
            ctx.lineWidth = shotLineWidth + 1.3;
            ctx.beginPath();
            ctx.moveTo(shot.x, shot.y);
            ctx.lineTo(tailX, tailY);
            ctx.stroke();
        }

        if (isPlayerShots && shot.rangeBoost) {
            ctx.strokeStyle = "rgba(102, 243, 255, 0.38)";
            ctx.shadowColor = PALETTE.shotRange;
            ctx.shadowBlur = 13;
            ctx.lineWidth = shotLineWidth + 0.9;
            ctx.beginPath();
            ctx.moveTo(shot.x, shot.y);
            ctx.lineTo(shot.x - shot.vx * (trailLength + 0.55), shot.y - shot.vy * (trailLength + 0.55));
            ctx.stroke();
        }

        ctx.strokeStyle = shotColor;
        ctx.lineWidth = shotLineWidth;
        ctx.shadowColor = shotColor;
        ctx.shadowBlur = blur;
        ctx.beginPath();
        ctx.moveTo(shot.x, shot.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        if (isPlayerShots && shot.homing) {
            ctx.fillStyle = "rgba(214, 255, 188, 0.92)";
            ctx.beginPath();
            ctx.arc(shot.x, shot.y, 1.25, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    ctx.restore();
}

function drawUfos() {
    for (const ufo of ufos) {
        ctx.save();
        ctx.translate(ufo.x, ufo.y);
        if (ufo.image.complete && ufo.image.naturalWidth > 0) {
            const width = ufo.type === "small" ? ufo.radius * 2.3 : ufo.radius * 2.8;
            const height = ufo.type === "small" ? ufo.radius * 1.55 : ufo.radius * 1.75;
            ctx.drawImage(ufo.image, -width / 2, -height / 2, width, height);
        } else {
            ctx.strokeStyle = ufo.type === "small" ? PALETTE.enemyShot : PALETTE.ship;
            ctx.lineWidth = ufo.type === "small" ? 2 : 2.4;

            if (ufo.type === "small") {
                ctx.beginPath();
                ctx.moveTo(-18, 6);
                ctx.lineTo(-9, -2);
                ctx.lineTo(9, -2);
                ctx.lineTo(18, 6);
                ctx.lineTo(-18, 6);
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(0, -2, 8, Math.PI, 0);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(-10, 6);
                ctx.lineTo(-14, 15);
                ctx.moveTo(0, 6);
                ctx.lineTo(0, 15);
                ctx.moveTo(10, 6);
                ctx.lineTo(14, 15);
                ctx.stroke();
            } else {
                ctx.beginPath();
                ctx.moveTo(-24, 7);
                ctx.lineTo(-14, -3);
                ctx.lineTo(14, -3);
                ctx.lineTo(24, 7);
                ctx.lineTo(-24, 7);
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(0, -4, 12, Math.PI, 0);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(-16, 7);
                ctx.lineTo(-20, 17);
                ctx.moveTo(-4, 7);
                ctx.lineTo(-6, 17);
                ctx.moveTo(8, 7);
                ctx.lineTo(10, 17);
                ctx.moveTo(18, 7);
                ctx.lineTo(20, 17);
                ctx.stroke();
            }
        }

        ctx.restore();
    }
}

function drawDecoys() {
    for (const decoy of decoys) {
        ctx.save();
        ctx.strokeStyle = PALETTE.ship;
        ctx.lineWidth = 2;
        ctx.shadowColor = PALETTE.ship;
        ctx.shadowBlur = 10;
        drawShipOutline(decoy.x, decoy.y, decoy.angle, decoy.modelScale);
        ctx.restore();
    }
}

function drawMineralField() {
    if (!mineralField || mineralField.particles.length === 0) {
        return;
    }

    const mineralColors = ["#cfd4db", "#8d949c", "#f4f6fb"];

    for (const mineral of mineralField.particles) {
        const colorIndex = Math.floor((mineralField.colorTimer + mineral.colorPhase) / 14) % mineralColors.length;
        const color = mineralColors[colorIndex];

        ctx.save();
        ctx.translate(mineral.x, mineral.y);
        ctx.rotate(mineral.angle);
        ctx.fillStyle = "rgba(36, 40, 48, 0.22)";
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.4;
        ctx.shadowColor = PALETTE.mineralGlow;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(mineral.points[0].x, mineral.points[0].y);
        for (let pointIndex = 1; pointIndex < mineral.points.length; pointIndex += 1) {
            ctx.lineTo(mineral.points[pointIndex].x, mineral.points[pointIndex].y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
}

function drawThreatBomb() {
    if (!threatBomb) {
        return;
    }

    const blinkOn = Math.floor(threatBomb.blinkTimer / 10) % 2 === 0;
    const glowAlpha = blinkOn ? 0.42 : 0.2;

    ctx.save();
    ctx.translate(threatBomb.x, threatBomb.y);
    ctx.shadowColor = "rgba(255, 76, 76, 0.95)";
    ctx.shadowBlur = blinkOn ? 18 : 8;

    ctx.fillStyle = blinkOn ? "rgba(255, 82, 82, 0.95)" : "rgba(124, 24, 24, 0.85)";
    ctx.beginPath();
    ctx.arc(0, 0, threatBomb.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(255, 210, 210, 0.9)";
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.arc(0, 0, threatBomb.radius * 0.64, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "rgba(255, 238, 238, 0.95)";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(-threatBomb.radius * 0.45, -threatBomb.radius * 0.15);
    ctx.lineTo(threatBomb.radius * 0.45, threatBomb.radius * 0.15);
    ctx.moveTo(-threatBomb.radius * 0.45, threatBomb.radius * 0.15);
    ctx.lineTo(threatBomb.radius * 0.45, -threatBomb.radius * 0.15);
    ctx.stroke();

    ctx.globalAlpha = glowAlpha;
    ctx.strokeStyle = "rgba(255, 110, 110, 0.95)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, threatBomb.radius * 1.75, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
}

function drawParticles() {
    ctx.save();
    ctx.lineWidth = 2;

    for (const particle of particles) {
        const alpha = particle.life / particle.maxLife;
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.strokeStyle = particle.color;
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(
            particle.x - particle.vx * particle.length,
            particle.y - particle.vy * particle.length
        );
        ctx.stroke();
    }

    ctx.globalAlpha = 1;
    ctx.restore();
}

function drawHud() {
    const fontSize = canvas.width < 720 ? 10 : 14;
    const rowGap = 24;
    const rowOneY = Math.max(16, hudTopInset);
    const rowTwoY = rowOneY + rowGap;
    const rowThreeY = rowTwoY + rowGap;
    ctx.save();
    ctx.fillStyle = PALETTE.hud;
    ctx.font = `${fontSize}px ${HUD_FONT}`;
    ctx.textBaseline = "top";

    ctx.textAlign = "left";
    ctx.fillText(`SCORE ${String(score).padStart(HUD_SCORE_DIGITS, "0")}`, 16, rowOneY);
    ctx.fillStyle = PALETTE.hudAccent;
    ctx.fillText(`SHIPS ${Math.max(lives, 0)}`, 16, rowTwoY);

    ctx.textAlign = "center";
    ctx.fillStyle = PALETTE.hud;
    ctx.fillText(`HIGH ${String(highScore).padStart(HUD_SCORE_DIGITS, "0")}`, canvas.width / 2, rowOneY);

    ctx.textAlign = "right";
    ctx.fillText(`WAVE ${wave}`, canvas.width - 16, rowOneY);
    if (upgradeState.maxShields > 0) {
        ctx.fillStyle = PALETTE.shield;
        ctx.fillText(`SHIELD ${ship.shields}`, canvas.width - 16, rowTwoY);
    }

    if (godModeEnabled) {
        ctx.textAlign = "left";
        ctx.fillStyle = PALETTE.enemyShot;
        ctx.fillText("GOD MODE", 16, rowThreeY);
    }

    if (surgeActive && surgeTimer > 0) {
        const surgeSeconds = Math.ceil(surgeTimer / 60);
        ctx.textAlign = "center";
        ctx.fillStyle = PALETTE.enemyShot;
        ctx.fillText(
            `THREAT SURGE X${THREAT_SURGE_SCORE_MULTIPLIER} ${surgeSeconds}s`,
            canvas.width / 2,
            Math.max(canvas.height < 720 ? 36 : 44, rowTwoY + 4)
        );
    }
    ctx.restore();
}

function drawBossAlert() {
    if (!bossAlertMessage || bossAlertTimer <= 0) {
        return;
    }

    const alpha = Math.min(1, bossAlertTimer / BOSS_ALERT_FRAMES);
    const fontSize = canvas.width < 720 ? 10 : 14;

    ctx.save();
    ctx.globalAlpha = Math.max(0.2, alpha);
    ctx.fillStyle = PALETTE.hudAccent;
    ctx.font = `${fontSize}px ${HUD_FONT}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(
        bossAlertMessage,
        canvas.width / 2,
        Math.max(48, Math.max(16, hudTopInset) + 32)
    );
    ctx.restore();
}

function drawComboBanner() {
    if (comboDisplayTimer <= 0 || comboCount < 2) {
        return;
    }

    const alpha = Math.min(1, comboDisplayTimer / 85);
    const fontSize = canvas.width < 720 ? 12 : 16;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = PALETTE.combo;
    ctx.font = `${fontSize}px ${HUD_FONT}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`COMBO X${comboCount}`, canvas.width / 2, canvas.height * 0.18);
    ctx.restore();
}

function drawBonusBanner() {
    if (bonusBannerTimer <= 0 || !bonusBannerText) {
        return;
    }

    const alpha = Math.min(1, bonusBannerTimer / 105);
    const fontSize = canvas.width < 720 ? 10 : 14;
    const y = comboDisplayTimer > 0 ? canvas.height * 0.24 : canvas.height * 0.18;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = PALETTE.hudAccent;
    ctx.font = `${fontSize}px ${HUD_FONT}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(bonusBannerText, canvas.width / 2, y);
    ctx.restore();
}

function drawPowerupExpiryBanner() {
    if (!powerupExpiryWarning || gameState !== "playing") {
        return;
    }

    const pulse = 0.72 + Math.sin(lastFrameTime * 0.012) * 0.28;
    const fontSize = canvas.width < 720 ? 9 : 12;
    const y = bonusBannerTimer > 0
        ? canvas.height * 0.3
        : (comboDisplayTimer > 0 ? canvas.height * 0.24 : canvas.height * 0.2);
    const secondsText = Math.max(0, powerupExpiryWarning.secondsRemaining).toFixed(1);
    const label = powerupExpiryWarning.label || "POWER-UP";
    const text = `${label} ENDS IN ${secondsText}s`;

    ctx.save();
    ctx.globalAlpha = Math.max(0.35, Math.min(1, pulse));
    ctx.fillStyle = PALETTE.enemyShot;
    ctx.font = `${fontSize}px ${HUD_FONT}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, canvas.width / 2, y);
    ctx.restore();
}

function drawFlashOverlay() {
    if (flashAlpha <= 0) {
        return;
    }

    ctx.save();
    ctx.globalAlpha = flashAlpha;
    ctx.fillStyle = flashColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
}

function drawOverlay(dimOpacity = 0.55) {
    ctx.save();
    ctx.fillStyle = `rgba(0, 0, 0, ${dimOpacity})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
}

function drawCenteredTextBlock(title, lines, footer) {
    const titleSize = canvas.width < 720 ? 20 : 28;
    const bodySize = canvas.width < 720 ? 10 : 14;
    const startY = canvas.height * 0.34;

    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    ctx.font = `${titleSize}px ${HUD_FONT}`;
    ctx.fillText(title, canvas.width / 2, startY);

    ctx.font = `${bodySize}px ${HUD_FONT}`;
    lines.forEach((line, index) => {
        ctx.fillText(line, canvas.width / 2, startY + 72 + index * (bodySize + 18));
    });

    if (footer) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
        ctx.fillText(footer, canvas.width / 2, canvas.height - 42);
    }

    ctx.restore();
}

function getWaitingScreenLines() {
    if (isMobilePhoneUI) {
        return [
            "HOLD TOUCH TO TURN THEN THRUST",
            "TAP HYPER TO WARP SOMEWHERE RANDOM",
            "HOLD FIRE TO SHOOT",
            "TAP II TO PAUSE",
            "TAP ABOUT FOR CREDITS",
            "S TOGGLES SOUND   M TOGGLES MUSIC",
            "UPGRADES APPEAR EVERY 2 WAVES",
            "TITAN BOSS WAVES ARRIVE EVERY 5"
        ];
    }

    return [
        "ENTER OR SPACE TO START",
        "ARROWS OR A D TO ROTATE",
        "UP OR W TO THRUST",
        "LEFT MOUSE HOLD STEERS   RIGHT MOUSE HOLD THRUSTS",
        "J FOR HYPERSPACE",
        "SPACE FIRES   H SHOWS HELP",
        "I SHOWS ABOUT   P OR ESC PAUSES",
        "S TOGGLES SOUND   M TOGGLES MUSIC",
        "UPGRADES APPEAR EVERY 2 WAVES",
        "TITAN BOSS WAVES ARRIVE EVERY 5"
    ];
}

function getPausedScreenLines() {
    if (isMobilePhoneUI) {
        return [
            "TAP II TO RESUME",
            "TAP ABOUT FOR CREDITS",
            "S TOGGLES SOUND   M TOGGLES MUSIC",
            "TOUCH CONTROLS RETURN AFTER RESUME"
        ];
    }

    return [
        "PRESS P ESC OR SPACE TO RESUME",
        "PRESS H FOR HELP   I FOR ABOUT",
        "PRESS S FOR SOUND   M FOR MUSIC",
        "SPACE FIRES WHEN PLAY RESUMES"
    ];
}

function getGameOverLines() {
    if (isMobilePhoneUI) {
        return [
            `FINAL SCORE ${String(score).padStart(HUD_SCORE_DIGITS, "0")}`,
            "TAP FIRE OR THRUST TO PLAY AGAIN"
        ];
    }

    return [
        `FINAL SCORE ${String(score).padStart(HUD_SCORE_DIGITS, "0")}`,
        "ENTER OR SPACE TO PLAY AGAIN",
        "H HELP   S SOUND   M MUSIC"
    ];
}

function getHelpControlLegendEntries() {
    if (isMobilePhoneUI) {
        return [
            { action: "START", input: "START BUTTON" },
            { action: "TURN LEFT", input: "LEFT BUTTON" },
            { action: "TURN RIGHT", input: "RIGHT BUTTON" },
            { action: "THRUST", input: "THRUST BUTTON OR TOUCH HOLD" },
            { action: "FIRE", input: "FIRE BUTTON (HOLD)" },
            { action: "HYPER", input: "HYPER BUTTON" },
            { action: "PAUSE", input: "II BUTTON" },
            { action: "ABOUT", input: "ABOUT BUTTON" }
        ];
    }

    return [
        { action: "FIRE", input: "SPACE" },
        { action: "THRUST", input: "UP ARROW / W / RIGHT MOUSE HOLD" },
        { action: "TURN LEFT", input: "LEFT ARROW / A" },
        { action: "TURN RIGHT", input: "RIGHT ARROW / D / LEFT MOUSE AIM" },
        { action: "HYPERSPACE", input: "J" },
        { action: "PAUSE", input: "P OR ESC (SPACE TO RESUME)" },
        { action: "HELP", input: "H" },
        { action: "ABOUT", input: "I" },
        { action: "AUDIO", input: `S SOUND ${soundEnabled ? "ON" : "OFF"} / M MUSIC ${musicEnabled ? "ON" : "OFF"}` }
    ];
}

function drawHelpControlsLegend() {
    const entries = getHelpControlLegendEntries();
    const buttonRow = getHelpButtons()[0];
    const titleSize = canvas.width < 720 ? 20 : 28;
    const titleTop = canvas.height * 0.34;
    const titleBottom = titleTop + titleSize + (canvas.width < 720 ? 56 : 72);
    const minimumStartY = Math.max(
        buttonRow.y + buttonRow.height + (canvas.width < 720 ? 18 : 24),
        titleBottom
    );

    const baseLineHeight = canvas.width < 720 ? 21 : 25;
    const entryCount = entries.length;
    const bottomPadding = canvas.width < 720 ? 20 : 28;
    const availableHeight = Math.max(80, canvas.height - bottomPadding - minimumStartY);
    const fitLineHeight = Math.floor(availableHeight / Math.max(1, entryCount - 1));
    const minLineHeight = canvas.width < 720 ? 15 : 18;
    const lineHeight = Math.max(minLineHeight, Math.min(baseLineHeight, fitLineHeight));
    const startY = minimumStartY;

    const actionFontSize = canvas.width < 720 ? 7 : 9;
    const valueFontSize = canvas.width < 720 ? 8 : 10;
    const valueGap = canvas.width < 720 ? 10 : 12;

    // Center the entire [ACTION] = INPUT legend block and size brackets
    // dynamically so labels like TURN LEFT / TURN RIGHT always fit.
    ctx.save();
    ctx.font = `${actionFontSize}px ${HUD_FONT}`;
    const maxActionWidth = entries.reduce(
        (maxWidth, entry) => Math.max(maxWidth, ctx.measureText(entry.action).width),
        0
    );
    ctx.font = `${valueFontSize}px ${HUD_FONT}`;
    const maxValueWidth = entries.reduce(
        (maxWidth, entry) => Math.max(maxWidth, ctx.measureText(`= ${entry.input}`).width),
        0
    );
    ctx.restore();

    const actionHalfWidth = Math.max(24, Math.ceil(maxActionWidth * 0.5) + 8);
    const legendWidth = actionHalfWidth * 2 + valueGap + maxValueWidth;
    const legendLeft = Math.max(12, Math.floor((canvas.width - legendWidth) * 0.5));
    const actionCenterX = legendLeft + actionHalfWidth;
    const valueX = legendLeft + actionHalfWidth * 2 + valueGap;

    ctx.save();
    ctx.textBaseline = "middle";

    for (let index = 0; index < entries.length; index += 1) {
        const y = startY + lineHeight * index;
        const entry = entries[index];

        drawLegendBracket(
            actionCenterX,
            y,
            actionHalfWidth,
            canvas.width < 720 ? 11 : 12,
            PALETTE.hudAccent
        );

        ctx.font = `${actionFontSize}px ${HUD_FONT}`;
        ctx.textAlign = "center";
        ctx.fillStyle = PALETTE.hudAccent;
        ctx.fillText(entry.action, actionCenterX, y);

        ctx.font = `${valueFontSize}px ${HUD_FONT}`;
        ctx.textAlign = "left";
        ctx.fillStyle = PALETTE.hud;
        ctx.fillText(`= ${entry.input}`, valueX, y);
    }

    ctx.restore();
}

function getGodHelpScreenLines() {
    return [
        "SHIFT + CTRL + G TOGGLE GOD MODE",
        "1 SPAWN LARGE SAUCER   2 SPAWN SMALL SAUCER",
        "3 SPAWN THREAT BOMB",
        "4 SPAWN MINERAL FIELD",
        "5 SPAWN DECOY PAIR",
        "6 OR B SPAWN TITAN BOSS WAVE",
        "7 SPAWN ROGUE ASTEROID",
        "U OPEN FULL POWER-UP DRAFT",
        "K CLEAR CURRENT WAVE",
        "L JUMP TO WAVE",
        "H TOGGLE THIS GOD HELP"
    ];
}

function getHelpMenuLines() {
    return [
        "SELECT A HELP TOPIC",
        "CONTROLS: CLASSIC INPUT REFERENCE",
        "ELEMENTS: SHIP, ENEMIES, HAZARDS, REWARDS",
        `S SOUND ${soundEnabled ? "ON" : "OFF"}   M MUSIC ${musicEnabled ? "ON" : "OFF"}`
    ];
}

function drawHelpButtons() {
    const buttons = getHelpButtons();

    for (const button of buttons) {
        if (button.id === "menu" && helpPage === "menu") {
            continue;
        }

        const isActive = helpPage === button.id;
        ctx.save();
        ctx.fillStyle = isActive ? "rgba(248, 179, 107, 0.2)" : "rgba(255, 255, 255, 0.08)";
        ctx.strokeStyle = isActive ? PALETTE.hudAccent : "rgba(255, 255, 255, 0.48)";
        ctx.lineWidth = 2;
        ctx.fillRect(button.x, button.y, button.width, button.height);
        ctx.strokeRect(button.x, button.y, button.width, button.height);
        ctx.fillStyle = isActive ? PALETTE.hudAccent : PALETTE.hud;
        ctx.font = `${canvas.width < 720 ? 9 : 11}px ${HUD_FONT}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(button.label, button.x + button.width * 0.5, button.y + button.height * 0.54);
        ctx.restore();
    }
}

function drawLegendBracket(x, y, halfWidth = 20, halfHeight = 13, color = PALETTE.hud) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(x - halfWidth, y - halfHeight);
    ctx.lineTo(x - halfWidth, y + halfHeight);
    ctx.lineTo(x - halfWidth + 6, y + halfHeight);
    ctx.moveTo(x - halfWidth, y - halfHeight);
    ctx.lineTo(x - halfWidth + 6, y - halfHeight);
    ctx.moveTo(x + halfWidth, y - halfHeight);
    ctx.lineTo(x + halfWidth, y + halfHeight);
    ctx.lineTo(x + halfWidth - 6, y + halfHeight);
    ctx.moveTo(x + halfWidth, y - halfHeight);
    ctx.lineTo(x + halfWidth - 6, y - halfHeight);
    ctx.stroke();
    ctx.restore();
}

function drawLegendShipIcon(x, y) {
    ctx.save();
    ctx.strokeStyle = PALETTE.ship;
    ctx.lineWidth = 1.4;
    drawShipOutline(x, y, 0, 0.52);
    ctx.restore();
}

function drawLegendUfoIcon(x, y, type) {
    const isSmall = type === "small";
    const image = isSmall ? bossImages.small : bossImages.large;
    if (image.complete && image.naturalWidth > 0) {
        const width = isSmall ? 22 : 26;
        const height = isSmall ? 14 : 16;
        ctx.drawImage(image, x - width * 0.5, y - height * 0.5, width, height);
        return;
    }

    ctx.save();
    ctx.strokeStyle = isSmall ? PALETTE.enemyShot : PALETTE.ship;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.ellipse(x, y + 1, isSmall ? 10 : 12, isSmall ? 5 : 6, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y - 2, isSmall ? 4 : 5, Math.PI, 0);
    ctx.stroke();
    ctx.restore();
}

function drawLegendAsteroidIcon(x, y, color = ASTEROID_COLORWAYS[2].stroke) {
    ctx.save();
    ctx.translate(x, y);
    ctx.strokeStyle = color;
    ctx.fillStyle = "rgba(80, 54, 38, 0.22)";
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.moveTo(-8, -4);
    ctx.lineTo(-3, -9);
    ctx.lineTo(6, -8);
    ctx.lineTo(10, -1);
    ctx.lineTo(7, 8);
    ctx.lineTo(-2, 9);
    ctx.lineTo(-9, 4);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

function drawLegendTitanIcon(x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.strokeStyle = "#ffc89b";
    ctx.fillStyle = "rgba(112, 65, 40, 0.62)";
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(-12, -7);
    ctx.lineTo(-5, -13);
    ctx.lineTo(8, -11);
    ctx.lineTo(14, -1);
    ctx.lineTo(11, 9);
    ctx.lineTo(-3, 13);
    ctx.lineTo(-13, 6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.globalAlpha = 0.85;
    ctx.strokeStyle = "rgba(255, 236, 210, 0.98)";
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 0.55;
    ctx.beginPath();
    ctx.arc(0, 0, 9, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
}

function drawLegendBombIcon(x, y) {
    ctx.save();
    ctx.fillStyle = "rgba(255, 82, 82, 0.95)";
    ctx.strokeStyle = "rgba(255, 238, 238, 0.95)";
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x - 3, y - 1);
    ctx.lineTo(x + 3, y + 1);
    ctx.moveTo(x - 3, y + 1);
    ctx.lineTo(x + 3, y - 1);
    ctx.stroke();
    ctx.restore();
}

function drawLegendMineralIcon(x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.strokeStyle = "#f4f6fb";
    ctx.fillStyle = "rgba(36, 40, 48, 0.28)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-3, -2);
    ctx.lineTo(0, -4);
    ctx.lineTo(3, -2);
    ctx.lineTo(2, 3);
    ctx.lineTo(-2, 3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

function drawHelpElementsLegend() {
    const fontSize = canvas.width < 720 ? 8 : 10;
    const buttonRow = getHelpButtons()[0];
    const titleSize = canvas.width < 720 ? 20 : 28;
    const titleTop = canvas.height * 0.34;
    const titleBottom = titleTop + titleSize + (canvas.width < 720 ? 56 : 72);
    const minimumStartY = Math.max(
        buttonRow.y + buttonRow.height + (canvas.width < 720 ? 18 : 24),
        titleBottom
    );
    const baseLineHeight = canvas.width < 720 ? 21 : 25;
    const entryCount = 11;
    const bottomPadding = canvas.width < 720 ? 20 : 28;
    const availableHeight = Math.max(80, canvas.height - bottomPadding - minimumStartY);
    const fitLineHeight = Math.floor(availableHeight / Math.max(1, entryCount - 1));
    const minLineHeight = canvas.width < 720 ? 15 : 18;
    const lineHeight = Math.max(minLineHeight, Math.min(baseLineHeight, fitLineHeight));
    const startY = minimumStartY;
    const iconX = canvas.width * 0.28;
    const textX = canvas.width * 0.35;
    const entries = [
        { draw: () => drawLegendShipIcon(iconX, startY), text: "= YOU" },
        { draw: () => drawLegendUfoIcon(iconX, startY + lineHeight, "large"), text: `= LARGE BOSS (${LARGE_UFO_SCORE_VALUE} PTS)` },
        { draw: () => drawLegendUfoIcon(iconX, startY + lineHeight * 2, "small"), text: `= SMALL BOSS (${SMALL_UFO_SCORE_VALUE} PTS)` },
        { draw: () => drawLegendShipIcon(iconX, startY + lineHeight * 3), text: "= DECOY SHIP (CRASH DANGER)" },
        { draw: () => drawLegendAsteroidIcon(iconX, startY + lineHeight * 4, ASTEROID_COLORWAYS[0].stroke), text: `= LARGE ASTEROID (${ASTEROID_SCORES[0]} PTS)` },
        {
            draw: () => drawLegendTitanIcon(iconX, startY + lineHeight * 5),
            text: `= TITAN ASTEROID BOSS (${TITAN_BOSS_SCORE_VALUE} PTS)`,
            color: "#ffc89b"
        },
        { draw: () => drawLegendAsteroidIcon(iconX, startY + lineHeight * 6, ASTEROID_COLORWAYS[2].stroke), text: `= MED ASTEROID (${ASTEROID_SCORES[1]} PTS)` },
        { draw: () => drawLegendAsteroidIcon(iconX, startY + lineHeight * 7, ASTEROID_COLORWAYS[4].stroke), text: `= SMALL ASTEROID (${ASTEROID_SCORES[2]} PTS)` },
        { draw: () => drawLegendAsteroidIcon(iconX, startY + lineHeight * 8, ROGUE_ASTEROID_COLORWAY.stroke), text: `= ROGUE ASTEROID (+${ROGUE_ASTEROID_SCORE_BONUS} BONUS)` },
        { draw: () => drawLegendBombIcon(iconX, startY + lineHeight * 9), text: `= THREAT BOMB (SHOT FOR ${THREAT_BOMB_SCORE_VALUE} PTS)` },
        { draw: () => drawLegendMineralIcon(iconX, startY + lineHeight * 10), text: `= MINERAL (+${MINERAL_TOUCH_SCORE} ON TOUCH)` }
    ];

    ctx.save();
    ctx.font = `${fontSize}px ${HUD_FONT}`;
    ctx.fillStyle = PALETTE.hud;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    for (let index = 0; index < entries.length; index += 1) {
        const y = startY + lineHeight * index;
        drawLegendBracket(iconX, y);
        entries[index].draw();
        ctx.fillStyle = entries[index].color || PALETTE.hud;
        ctx.fillText(entries[index].text, textX, y);
    }
    ctx.restore();
}

function drawWaitingScreen() {
    drawOverlay(0.4);
    drawCenteredTextBlock(
        "ASTEROIDS",
        getWaitingScreenLines(),
        "Tom Wellborn, 2026"
    );
}

function drawPausedScreen() {
    drawOverlay(0.55);
    drawCenteredTextBlock(
        "PAUSED",
        getPausedScreenLines(),
        ""
    );
}

function drawGameOverScreen() {
    drawOverlay(0.5);
    drawCenteredTextBlock(
        "GAME OVER",
        getGameOverLines(),
        ""
    );
}

function drawHelpScreen() {
    drawOverlay(0.78);
    drawHelpButtons();

    if (helpPage === "controls") {
        drawCenteredTextBlock(
            "HELP - CONTROLS",
            [],
            "PRESS H OR ESC TO CLOSE"
        );
        drawHelpControlsLegend();
        return;
    }

    if (helpPage === "elements") {
        drawCenteredTextBlock(
            "HELP - ELEMENTS",
            [],
            "PRESS H OR ESC TO CLOSE"
        );
        drawHelpElementsLegend();
        return;
    }

    drawCenteredTextBlock(
        "HELP",
        getHelpMenuLines(),
        "CLICK CONTROLS OR ELEMENTS"
    );
}

function drawGodHelpScreen() {
    drawOverlay(0.78);
    drawCenteredTextBlock(
        "GOD MODE HELP",
        getGodHelpScreenLines(),
        "PRESS H OR ESC TO CLOSE"
    );
}

function render() {
    syncControlSurface();
    syncAboutOverlay();
    syncUpgradeOverlay();
    const shakeOffset = getScreenShakeOffset();

    ctx.save();
    ctx.translate(shakeOffset.x, shakeOffset.y);
    drawBackground();
    drawAsteroids();
    drawMineralField();
    drawUfos();
    drawDecoys();
    drawThreatBomb();
    drawShotArray(playerShots, PALETTE.playerShot);
    drawShotArray(enemyShots, PALETTE.enemyShot);
    drawShip();
    drawParticles();
    ctx.restore();

    drawHud();
    drawBossAlert();
    drawComboBanner();
    drawBonusBanner();
    drawPowerupExpiryBanner();
    drawFlashOverlay();

    if (gameState === "waiting") {
        drawWaitingScreen();
    } else if (gameState === "paused") {
        drawPausedScreen();
    } else if (gameState === "help") {
        drawHelpScreen();
    } else if (gameState === "godHelp") {
        drawGodHelpScreen();
    } else if (gameState === "gameOver") {
        drawGameOverScreen();
    } else if (gameState === "upgrade") {
        drawOverlay(0.2);
    }
}

function gameLoop(timestamp) {
    if (!lastFrameTime) {
        lastFrameTime = timestamp;
    }

    const dt = Math.min((timestamp - lastFrameTime) / 16.6667, 2.5);
    lastFrameTime = timestamp;

    updateGame(dt);
    syncAmbientSounds();
    render();
    window.requestAnimationFrame(gameLoop);
}

function activateControl(action) {
    if (action === "start") {
        if (gameState === "waiting" || gameState === "gameOver") {
            startGame();
        } else if (gameState === "paused") {
            resumeGame();
        }
        syncControlSurface();
        return;
    }

    if (action === "pause") {
        togglePause();
        syncControlSurface();
        return;
    }

    if (gameState === "about") {
        return;
    }

    if ((gameState === "waiting" || gameState === "gameOver") && action !== "pause") {
        startGame();
    }

    if (gameState === "paused") {
        return;
    }

    if (action === "left" || action === "right" || action === "thrust") {
        keys[action] = true;
    } else if (action === "hyperspace") {
        performHyperspace();
    } else if (action === "fire") {
        keys.fire = true;
        firePlayerShot();
    }

    syncControlSurface();
}

function deactivateControl(action) {
    if (action === "left" || action === "right" || action === "thrust" || action === "fire") {
        keys[action] = false;
    }

    syncControlSurface();
}

function handleControlPointerDown(event) {
    event.preventDefault();
    primeLoopAudioContext();
    if (event.currentTarget.setPointerCapture) {
        event.currentTarget.setPointerCapture(event.pointerId);
    }
    activateControl(event.currentTarget.dataset.control);
}

function handleControlPointerUp(event) {
    event.preventDefault();
    if (event.currentTarget.releasePointerCapture) {
        event.currentTarget.releasePointerCapture(event.pointerId);
    }
    deactivateControl(event.currentTarget.dataset.control);
}

function handleKeyDown(event) {
    const pressedKey = typeof event.key === "string" ? event.key.toLowerCase() : "";
    const isAboutShortcut = event.code === "KeyI" || pressedKey === "i";
    const isHelpShortcut = event.code === "KeyH" || pressedKey === "h";
    const isGodModeToggle = event.code === "KeyG" && event.shiftKey && event.ctrlKey;
    const isDebugLargeSpawn = event.code === "Digit1" || event.code === "Numpad1";
    const isDebugSmallSpawn = event.code === "Digit2" || event.code === "Numpad2";
    const isDebugBombSpawn = event.code === "Digit3" || event.code === "Numpad3";
    const isDebugMineralSpawn = event.code === "Digit4" || event.code === "Numpad4";
    const isDebugDecoySpawn = event.code === "Digit5" || event.code === "Numpad5";
    const isDebugTitanSpawn = event.code === "Digit6" || event.code === "Numpad6" || event.code === "KeyB" || pressedKey === "b";
    const isDebugRogueSpawn = event.code === "Digit7" || event.code === "Numpad7";
    const isDebugUpgradeDraft = event.code === "KeyU" || pressedKey === "u";
    const isDebugWaveJump = event.code === "KeyL" || pressedKey === "l";
    const isDebugWaveClear = event.code === "KeyK" || pressedKey === "k";
    const isGodHelpToggle = isHelpShortcut;
    const isSoundToggle = event.code === "KeyS" || pressedKey === "s";
    const isMusicToggle = event.code === "KeyM" || pressedKey === "m";

    primeLoopAudioContext();

    if (preventedCodes.has(event.code)) {
        event.preventDefault();
    }

    if (isGodModeToggle && !event.repeat) {
        event.preventDefault();
        toggleGodMode();
        return;
    }

    if (isSoundToggle && !event.repeat) {
        toggleSoundEnabled();
        return;
    }

    if (isMusicToggle && !event.repeat) {
        toggleMusicEnabled();
        return;
    }

    if (godModeEnabled && isDebugTitanSpawn && !event.repeat) {
        spawnDebugTitanWave();
        return;
    }

    if (gameState === "upgrade") {
        const match = event.code.match(/^(Digit|Numpad)([1-9])$/);
        if (match) {
            const choiceIndex = Number.parseInt(match[2], 10) - 1;
            chooseUpgrade(choiceIndex);
        }
        return;
    }

    if (gameState === "help") {
        if ((event.code === "Escape" || isHelpShortcut || isGodHelpToggle) && !event.repeat) {
            closeHelp();
        }
        return;
    }

    if (gameState === "godHelp") {
        if ((event.code === "Escape" || isGodHelpToggle) && !event.repeat) {
            closeGodHelp();
        }
        return;
    }

    if (gameState === "about") {
        if ((event.code === "Escape" || isAboutShortcut) && !event.repeat) {
            closeAbout();
        }
        return;
    }

    if (isHelpShortcut && !event.repeat) {
        if (godModeEnabled) {
            toggleGodHelp();
        } else {
            toggleHelp();
        }
        return;
    }

    if (isAboutShortcut && !event.repeat) {
        openAbout();
        return;
    }

    if ((event.code === "KeyP" || event.code === "Escape") && !event.repeat) {
        togglePause();
        return;
    }

    if (gameState === "paused" && event.code === "Space" && !event.repeat) {
        resumeGame();
        return;
    }

    if (godModeEnabled && !event.repeat) {
        if (isDebugLargeSpawn) {
            spawnDebugUfo("large");
            return;
        }
        if (isDebugSmallSpawn) {
            spawnDebugUfo("small");
            return;
        }
        if (isDebugBombSpawn) {
            spawnDebugThreatBomb();
            return;
        }
        if (isDebugMineralSpawn) {
            spawnDebugMineralField();
            return;
        }
        if (isDebugDecoySpawn) {
            spawnDebugDecoys();
            return;
        }
        if (isDebugRogueSpawn) {
            spawnDebugRogueAsteroid();
            return;
        }
        if (isDebugUpgradeDraft) {
            openGodModeUpgradeDraft();
            return;
        }
        if (isDebugWaveJump) {
            jumpToGodModeWave();
            return;
        }
        if (isDebugWaveClear) {
            clearWaveInGodMode();
            return;
        }
    }

    if ((event.code === "Enter" || event.code === "Space") && !event.repeat) {
        if (gameState === "waiting" || gameState === "gameOver") {
            startGame();
        }
    }

    if (gameState === "paused") {
        return;
    }

    if (event.code === "ArrowLeft" || event.code === "KeyA") {
        keys.left = true;
    } else if (event.code === "ArrowRight" || event.code === "KeyD") {
        keys.right = true;
    } else if (event.code === "ArrowUp" || event.code === "KeyW") {
        keys.thrust = true;
    } else if (event.code === "KeyJ" && !event.repeat) {
        performHyperspace();
    } else if (event.code === "Space") {
        keys.fire = true;
        firePlayerShot();
    }

    syncControlSurface();
}

function handleKeyUp(event) {
    if (preventedCodes.has(event.code)) {
        event.preventDefault();
    }

    if (gameState === "upgrade" || gameState === "about" || gameState === "help" || gameState === "godHelp") {
        return;
    }

    if (event.code === "ArrowLeft" || event.code === "KeyA") {
        keys.left = false;
    } else if (event.code === "ArrowRight" || event.code === "KeyD") {
        keys.right = false;
    } else if (event.code === "ArrowUp" || event.code === "KeyW") {
        keys.thrust = false;
    } else if (event.code === "Space") {
        keys.fire = false;
    }

    syncControlSurface();
}

window.addEventListener("keydown", handleKeyDown, { passive: false });
window.addEventListener("keyup", handleKeyUp, { passive: false });
window.addEventListener("resize", resizeCanvas);
window.addEventListener("beforeunload", saveAudioSettings);
window.addEventListener("blur", () => {
    clearInputState();
    if (gameState === "playing") {
        autoPausedForFocusLoss = true;
        pauseGame();
    }
    syncControlSurface();
});
window.addEventListener("focus", () => {
    tryAutoResumeAfterFocusReturn();
});
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        clearInputState();
        if (gameState === "playing") {
            autoPausedForFocusLoss = true;
            pauseGame();
        }
        syncControlSurface();
        return;
    }

    tryAutoResumeAfterFocusReturn();
});

for (const button of controlButtons) {
    button.addEventListener("pointerdown", handleControlPointerDown, { passive: false });
    button.addEventListener("pointerup", handleControlPointerUp, { passive: false });
    button.addEventListener("pointercancel", handleControlPointerUp, { passive: false });
    button.addEventListener("pointerleave", handleControlPointerUp, { passive: false });
}

if (mobilePauseButton) {
    mobilePauseButton.dataset.control = "pause";
    mobilePauseButton.addEventListener("pointerdown", handleControlPointerDown, { passive: false });
}

if (mobileStartButton) {
    mobileStartButton.dataset.control = "start";
    mobileStartButton.addEventListener("pointerdown", handleControlPointerDown, { passive: false });
}

function handleCanvasPointerDown(event) {
    if (handleHelpPointerDown(event)) {
        return;
    }

    if (gameState === "about" || gameState === "help" || gameState === "godHelp" || gameState === "upgrade") {
        return;
    }

    const touchPointer = isTouchPointer(event);
    const mousePointer = event.pointerType === "mouse";
    const isLeftMouseDown = mousePointer && event.button === 0;
    const isRightMouseDown = mousePointer && event.button === 2;

    if (!touchPointer && !isLeftMouseDown && !isRightMouseDown) {
        return;
    }

    if (gameState === "waiting" || gameState === "gameOver") {
        event.preventDefault();
        primeLoopAudioContext();
        startGame();
        if (gameState !== "playing") {
            return;
        }
    }

    if (gameState !== "playing") {
        return;
    }

    const point = getCanvasPointFromPointerEvent(event);

    if (mousePointer) {
        syncMousePointerControls(event.buttons, point);
        if (canvas.setPointerCapture) {
            canvas.setPointerCapture(event.pointerId);
        }
        event.preventDefault();
        return;
    }

    if (!isSteerPointer(event)) {
        return;
    }

    touchSteerPointerId = event.pointerId;
    touchSteerTargetX = point.x;
    touchSteerTargetY = point.y;
    if (canvas.setPointerCapture) {
        canvas.setPointerCapture(event.pointerId);
    }
    event.preventDefault();
}

function handleCanvasPointerMove(event) {
    if (event.pointerType === "mouse") {
        const leftHeld = (event.buttons & 1) !== 0;
        const rightHeld = (event.buttons & 2) !== 0;
        const shouldUpdateAim = leftHeld && !rightHeld;
        const point = shouldUpdateAim ? getCanvasPointFromPointerEvent(event) : null;
        syncMousePointerControls(event.buttons, point);

        if (!leftHeld && !rightHeld) {
            return;
        }

        event.preventDefault();
        return;
    }

    if (touchSteerPointerId === null || event.pointerId !== touchSteerPointerId) {
        return;
    }

    const point = getCanvasPointFromPointerEvent(event);
    touchSteerTargetX = point.x;
    touchSteerTargetY = point.y;
    event.preventDefault();
}

function releaseCanvasTouchSteering(event) {
    if (event.pointerType === "mouse") {
        if (canvas.releasePointerCapture) {
            canvas.releasePointerCapture(event.pointerId);
        }
        syncMousePointerControls(event.buttons);
        return;
    }

    if (touchSteerPointerId === null || event.pointerId !== touchSteerPointerId) {
        return;
    }

    if (canvas.releasePointerCapture) {
        canvas.releasePointerCapture(event.pointerId);
    }
    touchSteerPointerId = null;
}

if (canvas) {
    canvas.addEventListener("pointerdown", handleCanvasPointerDown, { passive: false });
    canvas.addEventListener("pointermove", handleCanvasPointerMove, { passive: false });
    canvas.addEventListener("pointerup", releaseCanvasTouchSteering, { passive: false });
    canvas.addEventListener("pointercancel", releaseCanvasTouchSteering, { passive: false });
    canvas.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });
}

window.addEventListener("pointerdown", (event) => {
    if (!isMobilePhoneUI || gameState !== "waiting") {
        return;
    }
    const target = event.target;
    if (
        target === aboutButton
        || target === aboutOverlay
        || target === aboutCloseButton
        || (target && aboutOverlay && typeof target.closest === "function" && target.closest("#aboutOverlay"))
    ) {
        return;
    }
    primeLoopAudioContext();
    startGame();
}, { passive: true });

if (aboutButton) {
    aboutButton.addEventListener("click", toggleAbout);
}

if (aboutCloseButton) {
    aboutCloseButton.addEventListener("click", closeAbout);
}

if (aboutOverlay) {
    aboutOverlay.addEventListener("pointerdown", (event) => {
        if (event.target === aboutOverlay) {
            closeAbout();
        }
    });
}

if (upgradeChoicesElement) {
    upgradeChoicesElement.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        const button = event.target.closest("[data-index]");
        if (!button) {
            return;
        }

        chooseUpgrade(Number.parseInt(button.dataset.index, 10));
    });
}

if (aboutText) {
    aboutText.textContent = ABOUT_CREDIT_TEXT;
}
if (aboutCodebaseLink) {
    aboutCodebaseLink.href = ABOUT_CODEBASE_URL;
}
if (aboutWikiLink) {
    aboutWikiLink.href = ABOUT_WIKI_URL;
}
if (aboutMilkyWayLink) {
    aboutMilkyWayLink.href = ABOUT_MILKY_WAY_URL;
}

resizeCanvas();
ship.x = canvas.width / 2;
ship.y = canvas.height / 2 + 72 * gameplayProfile.entityScale;
syncAboutOverlay();
syncControlSurface();
window.requestAnimationFrame(gameLoop);
