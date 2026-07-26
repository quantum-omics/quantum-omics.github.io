/**
 * Quantum/Biological Particles Animation
 * A lightweight, interactive particle network with a organic, molecular feel.
 * Theme: Darker, fainter, slower movement simulating biological systems.
 */

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('hero-particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // Configuration
    const config = {
        particleCount: 70, // Balanced count
        connectionDistance: 160, // Distance to form bonds
        mouseDistance: 250, // Interaction radius
        speed: 0.2, // Slow, organic movement
        color: '255, 255, 255', // Particle color
        baseOpacity: 0.15, // Faint, subtle look
        sizeVariation: 2 // Random size variation
    };

    // Resize handler
    function resize() {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
        initParticles();
    }

    // Particle Class representing a molecule/atom
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            // Organic drift vector
            this.vx = (Math.random() - 0.5) * config.speed;
            this.vy = (Math.random() - 0.5) * config.speed;
            this.size = Math.random() * config.sizeVariation + 1.5;
            // Phase for distinct pulsing/movement
            this.phase = Math.random() * Math.PI * 2;
        }

        update() {
            // Add slight sine wave motion for organic feel
            this.vx += Math.sin(this.phase) * 0.002;
            this.vy += Math.cos(this.phase) * 0.002;

            // Cap velocity
            const maxSpeed = config.speed * 2;
            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (speed > maxSpeed) {
                this.vx = (this.vx / speed) * maxSpeed;
                this.vy = (this.vy / speed) * maxSpeed;
            }

            this.x += this.vx;
            this.y += this.vy;
            this.phase += 0.01;

            // Soft wrap around edges (like a toroidal petri dish)
            if (this.x < -50) this.x = width + 50;
            if (this.x > width + 50) this.x = -50;
            if (this.y < -50) this.y = height + 50;
            if (this.y > height + 50) this.y = -50;

            // Mouse interaction (gentle attraction/swirl)
            if (mouse.x !== null) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < config.mouseDistance) {
                    const force = (config.mouseDistance - distance) / config.mouseDistance;
                    // Gentle push away
                    this.vx += (dx / distance) * force * 0.02;
                    this.vy += (dy / distance) * force * 0.02;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${config.color}, ${config.baseOpacity})`;
            ctx.fill();

            // Draw a faint "nucleus" or glow
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${config.color}, ${config.baseOpacity * 0.3})`;
            ctx.fill();
        }
    }

    // Mouse state
    const mouse = { x: null, y: null };

    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Initialize
    function initParticles() {
        particles = [];
        const count = width < 768 ? 30 : config.particleCount;
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Draw organic connections
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < config.connectionDistance) {
                    ctx.beginPath();
                    // Opacity fade based on distance
                    const opacity = (1 - distance / config.connectionDistance) * config.baseOpacity;
                    ctx.strokeStyle = `rgba(${config.color}, ${opacity})`;
                    ctx.lineWidth = 0.8; // Thin molecular bonds
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    // Start
    window.addEventListener('resize', resize);
    resize();
    animate();
});
