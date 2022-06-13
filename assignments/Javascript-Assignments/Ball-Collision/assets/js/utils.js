function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor() {
    return `rgb(${randomIntFromRange(0, 240)}, ${randomIntFromRange(0, 240)}, ${randomIntFromRange(0, 240)}`;
}

function toRem(value) {
    return `${value / 10}rem`;
}

function getDistance(x1, y1, x2, y2) {
    xDist = x2 - x1;
    yDist = y2 - y1;
    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

function isOverlapped(x1, y1, r1, x2, y2, r2) {
    return (getDistance(x1, y1, x2, y2) <= (r1 + r2));
}

const isCollided = isOverlapped;

function isCollidedWithWall(x, y, radius, vx, vy, containerWidth, containerHeight) {
    if (x + 2 * radius >= containerWidth || x <= 0.5) {
        vx *= -1;
    }

    if (y + 2 * radius >= containerHeight || y <= 0.5) {
        vy *= -1;
    }

    return [vx, vy];
}

function rotate(velocity, angle) {
    const rotatedVelocities = {
        vx: velocity.vx * Math.cos(angle) - velocity.vy * Math.sin(angle),
        vy: velocity.vx * Math.sin(angle) + velocity.vy * Math.cos(angle)
    };

    return rotatedVelocities;
}

function resolveCollision(ball, otherball) {
    const xVelocityDiff = ball.velocity.vx - otherball.velocity.vx;
    const yVelocityDiff = ball.velocity.vy - otherball.velocity.vy;

    const xDist = otherball.x - ball.x;
    const yDist = otherball.y - ball.y;

    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
        const angle = -Math.atan2(otherball.y - ball.y, otherball.x - ball.x);

        // Store mass in var for better readability in collision equation
        const m1 = ball.mass;
        const m2 = otherball.mass;

        const u1 = rotate(ball.velocity, angle);
        const u2 = rotate(otherball.velocity, angle);

        const v1 = { vx: u1.vx * (m1 - m2) / (m1 + m2) + u2.vx * 2 * m2 / (m1 + m2), vy: u1.vy };
        const v2 = { vx: u2.vx * (m1 - m2) / (m1 + m2) + u1.vx * 2 * m2 / (m1 + m2), vy: u2.vy };

        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        ball.velocity.vx = vFinal1.vx;
        ball.velocity.vy = vFinal1.vy;

        otherball.velocity.vx = vFinal2.vx;
        otherball.velocity.vy = vFinal2.vy;
    }
}