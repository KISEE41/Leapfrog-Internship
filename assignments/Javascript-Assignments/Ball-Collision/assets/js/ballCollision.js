const container = document.createElement("div");
container.setAttribute("id", "container");

document.body.appendChild(container);

let containerWidth = window.innerWidth;
let containerHeight = window.innerHeight;

container.style.height = `${toRem(containerHeight)}`;
container.style.width = `${toRem(containerWidth)}`;
container.style.position = "relative";

window.addEventListener("resize", () => {
    containerWidth = window.innerWidth;
    containerHeight = window.innerHeight;
    container.style.height = `${toRem(containerHeight)}`;
    container.style.width = `${toRem(containerWidth)}`;
});

class Ball {
    constructor(x, y, radius) {
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.velocity = {
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10
        }
        // this.density = 0.0001;
        // this.volume = (4 * Math.PI * Math.pow(this.radius, 3)) / 3;
        this.mass = 1;

        this.color = randomColor();

        this.create();
    }

    create() {
        this.ball = document.createElement("div");
        this.ball.style.position = "absolute";
        this.ball.style.top = `${toRem(this.y)}`;
        this.ball.style.left = `${toRem(this.x)}`;
        this.ball.style.backgroundColor = this.color;
        this.ball.style.height = `${toRem(this.radius * 2)}`;
        this.ball.style.width = `${toRem(this.radius * 2)}`;
        this.ball.style.borderRadius = "50%";
        container.appendChild(this.ball);
    }

    update(balls) {
        for (let i = 0; i < balls.length; i++) {
            if (this === balls[i]) continue;
            if (isCollided(this.x, this.y, this.radius, balls[i].x, balls[i].y, balls[i].radius)) {
                resolveCollision(this, balls[i]);
            }
        }

        [this.velocity.vx, this.velocity.vy] = isCollidedWithWall(this.x, this.y, this.radius, this.velocity.vx, this.velocity.vy);

        this.x += this.velocity.vx;
        this.y += this.velocity.vy;
        this.mover(this.x, this.y);
    }

    mover(x, y) {
        this.ball.style.top = `${toRem(this.y)}`;
        this.ball.style.left = `${toRem(this.x)}`;
    }
}


function main() {
    let balls = [];

    for (let i = 0; i < number_of_balls; i++) {
        const radius = randomIntFromRange(5, 20);
        let x = randomIntFromRange(radius, containerWidth - radius * 2);
        let y = randomIntFromRange(radius, containerHeight - radius * 2);


        if (i !== 0) {
            for (let j = 0; j < balls.length; j++) {
                if (isOverlapped(x, y, radius, balls[j].x, balls[j].y, balls[j].radius)) {
                    x = randomIntFromRange(radius, containerWidth - radius * 2);
                    y = randomIntFromRange(radius, containerHeight - radius * 2);

                    j = -1;
                }
            }
        }
        balls.push(new Ball(x, y, radius));
    }


    function move() {
        balls.forEach((ball) => {
            ball.update(balls);
        });
        requestAnimationFrame(move);
    }

    move();
}

main()