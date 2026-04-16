# Classic Asteroids (v1.1)

**Classic Asteroids** is a browser-based HTML5 arcade game inspired by the original *Asteroids*, rebuilt with modern polish, responsive touch support, upgrade-driven runs, dynamic UFO encounters, and a clean neon vector aesthetic.

The current build combines classic screen-wrapping survival with layered systems such as shields, combo scoring, elite asteroids, hyperspace risk, recurring upgrade choices, and timed **Threat Surge** events.

## At a Glance

- Classic rotate-thrust-fire controls
- Screen-wrapping ship, asteroids, UFOs, and shots
- Large and small saucers with different threat levels
- Titan boss wave every 5 waves
- Asteroid overlap impacts can trigger at 10%
- Upgrade choices every 2 waves
- Extra lives awarded by score
- Shields, combos, screen shake, flash effects, and alert banners
- Mobile and tablet touch controls
- Persistent high score and audio preferences
- Debug tools for test sessions

## How to Play

Survive as long as possible by destroying asteroids and saucers while avoiding collisions and enemy fire.

Each new wave increases pressure. Large asteroids split into smaller fragments, saucers begin to appear after the early waves, and your run evolves through upgrade picks.

The longer you survive, the more dangerous the battlefield becomes.

## Core Gameplay Loop

1. Start a run
2. Clear asteroid waves
3. Fight off UFOs as they begin spawning
4. Choose upgrades every 2 waves
5. Adapt to elite asteroids and gravity effects
6. Survive Threat Surge waves for bigger rewards
7. Chase a higher score and high score record

## Controls

### Desktop

- **Enter** or **Space**: Start / restart
- **Left Arrow** or **A**: Rotate left
- **Right Arrow** or **D**: Rotate right
- **Up Arrow** or **W**: Thrust
- **Space**: Fire
- **J**: Hyperspace
- **H**: Help
- **P** or **Escape**: Pause
- **I**: About
- **S**: Toggle sound effects
- **M**: Toggle music
- **Left Mouse (hold on playfield)**: Rotate/aim toward cursor
- **Right Mouse (hold on playfield)**: Thrust

### Mobile / Touch

- **Touch and hold on playfield**: Rotate toward touch, then thrust when aligned
- **Left / Right**: Rotate
- **Thrust**: Accelerate
- **Hyper**: Trigger hyperspace
- **Fire**: Shoot
- **II**: Pause
- **Start**: Start/restart
- **About**: Open credits/about panel

## Game Systems

## Waves

Each run begins with asteroid waves. Enemy count scales upward over time, with the game capping the number of starting asteroids per wave to keep the screen readable while still increasing pressure.

### Saucer Progression

The UFO system ramps up by score:

- Early game: mostly large saucers
- Mid game: mixed large and small saucers
- Higher score thresholds: small saucers become dominant

Small saucers are more dangerous and score more points.

### Decoy Ships

Small saucers can launch decoy ships. Decoys are dangerous on collision and now interact with asteroids like impact projectiles (they can break/split asteroids on contact).

### Threat Bomb Event

Starting in wave 3+, a blinking threat bomb can sweep across the field on a staggered random schedule. If you destroy it, all visible enemies are wiped and you receive the bomb bonus plus sweep points for each visible destroyed target.

### Titan Boss Wave

Every 5 waves, a **Titan Boss** event can replace a normal opener:

- A massive asteroid enters with stronger pull and dramatic alert effects
- It takes **20 hits** to break on the first Titan wave, then +2 hits per Titan wave (max 50)
- On break, it gives **500 pts** (`TITAN BREAK BONUS`)
- It bursts into **4 large asteroids** on first Titan wave, then +1 per Titan wave (max 10)
- Clearing all Titan child asteroids gives another **500 pts** (`TITAN SWEEP BONUS`)
- Titan gravity, speed, fragment count, and durability all ramp by Titan tier with caps for playability

### Mineral Field Event

A staggered timed event (wave 3+) introduces small mineral particles that cross the screen in groups of ~20-30. Touching minerals awards +10 points each and creates pickup feedback effects.

### Asteroid Splitting

Large asteroids break into smaller ones when destroyed. This means clearing a wave is not just about raw damage. It is about controlling screen space and surviving the chaos created by fragmentation.

### Elite Asteroids

Some waves introduce stronger **elite asteroids** with extra durability, stronger visual treatment, and bonus score value. These enemies increase the danger level of later waves and add more pressure to positioning.

### Gravity Effect

Large asteroids can exert a gravity pull in later waves. This effect scales with progression and can be reduced with the **Grav Dampers** upgrade.

### Hyperspace

Hyperspace instantly teleports the ship to a random location.

It is useful in emergencies, but it carries risk:
- It has a cooldown
- Repeated use in the same wave increases failure chance
- You can still reappear in danger

### Shields

Some upgrades grant shield capacity. Shields can absorb hits before the ship is destroyed, giving skilled players more room to recover during hectic waves.

### Extra Lives

Extra ships are awarded automatically as your score increases.

### Combo Scoring

Quick kills build combo momentum and increase scoring pressure in your favor. The HUD displays combo information during active streaks.

### Threat Surge

Every 4 waves, the game can trigger a **Threat Surge**.

During a Threat Surge:
- score rewards are multiplied
- UFO fire timing becomes more aggressive
- asteroid split speed increases
- the HUD displays an active surge timer

This creates a short, high-risk, high-reward burst in the middle of a run.

## Upgrade System

Every **2 waves**, the game pauses and offers one of several upgrade choices.

Current upgrade pool includes:

- **Rapid Fire**: Fire faster and keep more shots active
- **Twin Cannons**: Add more projectiles per trigger
- **Piercing Rounds**: Shots pass through extra targets
- **Overdrive**: Improved thrust and top speed
- **Shield Matrix**: Add shield layers and recharge them
- **Grav Dampers**: Reduce large-asteroid gravity pressure
- **Nanite Repair**: Restore a ship and refill shields
- **Range Lenses**: Double laser travel distance
- **Seeker Array**: Homing lasers (short duration)
- **Anti-Gravity Field**: Repels incoming objects and prevents collisions

Power-up timing:
- Most timed power-ups last **30 seconds**
- **Seeker Array** lasts **10 seconds**

This system gives the game a run-building structure instead of making every wave feel identical.

## Visual Style

Classic Asteroids uses a neon-inflected vector look with:
- glowing ship outlines
- asteroid textures sourced from NASA asteroid surface imagery (plus color variation/tinting)
- dedicated Titan boss image rendering
- background nebula layers
- real Milky Way photo layer
- starfield twinkle
- saucer glow effects
- particle bursts and line explosions
- HUD alerts, combo banners, and flash feedback

The result is intentionally arcade-like, but with more atmosphere than a flat black-screen clone.

## Audio

The game supports:
- background music
- ship thrust audio
- weapon fire
- asteroid impact
- bonus and game over sounds
- saucer audio loops

It also includes browser-friendly handling for audio settings and a synthesized fallback approach for saucer loop behavior.

Sound and music preferences are saved between sessions.

## Mobile and Tablet Support

The current build is designed for desktop, phones, and tablets.

Responsive support includes:
- touch controls
- pause button
- about button
- coarse-pointer detection
- phone and tablet scaling logic
- dynamic gameplay profile scaling for movement, entities, and shots
- viewport-safe layout support

This makes the game playable beyond desktop keyboards without maintaining a separate mobile codebase.

## HUD and Interface

The HUD displays:
- score
- high score
- remaining ships
- wave number
- shield value when active
- combo banner
- alert messages
- Threat Surge timer
- God Mode status when enabled

The game also includes:
- waiting screen
- paused screen
- help screen
- game over screen
- about overlay
- upgrade selection overlay

## Debug Features

A built-in debug mode exists for testing and tuning.

### God Mode Toggle

- **Ctrl + Shift + G**: Toggle God Mode

### God Mode Testing Shortcuts

When God Mode is active:

- **1**: Spawn large saucer
- **2**: Spawn small saucer
- **3**: Spawn threat bomb
- **4**: Spawn mineral field
- **5**: Spawn decoy pair
- **6** or **B**: Spawn Titan boss wave
- **7**: Spawn rogue asteroid
- **U**: Open full power-up draft (all currently available upgrades)
- **L**: Jump to a target wave
- **K**: Clear the current wave instantly
- **H**: Open God Mode help overlay

These are useful during balancing, content testing, and tuning later-game difficulty.

## Technical Overview

- **Engine**: Vanilla JavaScript
- **Rendering**: HTML5 Canvas 2D
- **UI Shell**: Single HTML page with overlay panels and touch controls
- **Persistence**: `localStorage` for high score and audio settings
- **Assets**: SVG saucer art, browser audio files, NASA asteroid surface images, custom Titan image, and social preview image
- **Input**: Keyboard plus touch/pointer controls
- **Architecture**: State-driven game loop with separate update and render phases

### Game States

The game uses explicit state handling for:
- waiting
- playing
- paused
- help
- about
- upgrade
- game over

This keeps the loop predictable and makes it easier to extend.

## Credits

**Classic Asteroids HTML5**  
Created by **Tom Wellborn**  
2026  
Version **1.1**

Background Milky Way photo: **ESO/S. Brunier**, CC BY 4.0 ([Wikimedia Commons](https://commons.wikimedia.org/wiki/File:ESO_-_Milky_Way.jpg)).

## Suggested Future Wiki Pages

As the project grows, the wiki could expand with pages such as:

- **Controls**
- **Upgrade Guide**
- **Enemy Types**
- **Threat Surge Rules**
- **Debug / Developer Notes**
- **Asset Pipeline**
- **Release Notes**
