// Golden confetti background
const confettiBg = document.getElementById('confetti-bg');
const canvas = document.createElement('canvas');
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.display = 'block';
canvas.style.position = 'absolute';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.pointerEvents = 'none';
confettiBg.appendChild(canvas);

const ctx = canvas.getContext('2d');
let W = window.innerWidth;
let H = window.innerHeight;
canvas.width = W;
canvas.height = H;

window.addEventListener('resize', () => {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
});

const confettiCount = 60;
const confettiColors = ['#f0c44c', '#ffe9a1', '#e6b840', '#fff4d1'];
const confetti = [];

function randomBetween(a, b) {
    return a + Math.random() * (b - a);
}

for (let i = 0; i < confettiCount; i++) {
    confetti.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: randomBetween(4, 8),
        d: randomBetween(2, 6),
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        tilt: randomBetween(-10, 10),
        tiltAngle: randomBetween(0, Math.PI * 2),
        tiltAngleIncrement: randomBetween(0.01, 0.03),
        opacity: randomBetween(0.7, 1)
    });
}

function drawConfetti() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < confetti.length; i++) {
        const c = confetti[i];
        ctx.save();
        ctx.beginPath();
        ctx.globalAlpha = c.opacity;
        ctx.ellipse(c.x, c.y, c.r, c.r * 0.4, c.tilt, 0, 2 * Math.PI);
        ctx.fillStyle = c.color;
        ctx.shadowColor = '#ffe9a1';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
    }
}

function updateConfetti() {
    for (let i = 0; i < confetti.length; i++) {
        const c = confetti[i];
        c.y += c.d;
        c.tiltAngle += c.tiltAngleIncrement;
        c.tilt = Math.sin(c.tiltAngle) * 12;
        c.x += Math.sin(c.tiltAngle) * 0.5;
        if (c.y > H + 20) {
            c.x = Math.random() * W;
            c.y = -10;
            c.tilt = randomBetween(-10, 10);
            c.tiltAngle = randomBetween(0, Math.PI * 2);
            c.opacity = randomBetween(0.7, 1);
        }
    }
}

function animate() {
    drawConfetti();
    updateConfetti();
    requestAnimationFrame(animate);
}

animate(); 