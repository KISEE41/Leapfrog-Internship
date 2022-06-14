const carouselContainer = document.getElementsByClassName('carousel-container')[0];
const carouselImageWrapper = document.getElementsByClassName('carousel-image-wrapper')[0];

const images = carouselImageWrapper.children;
const numberOfImages = images.length;
for (let i = 0; i < numberOfImages; i++) {
    images[i].style.left = `${i * 100}%`
}

var leftArrow = document.createElement('div');
leftArrow.setAttribute('class', 'arrow-left');
carouselContainer.appendChild(leftArrow);

var rightArrow = document.createElement('div');
rightArrow.setAttribute('class', 'arrow-right');
carouselContainer.appendChild(rightArrow);

var dotContainer = document.createElement('div');
dotContainer.setAttribute('class', 'dot-container');

for (let i = 0; i < numberOfImages; i++) {
    var dot = document.createElement("div");
    dot.setAttribute('id', `dot-${i}`);
    dotContainer.appendChild(dot);
}

carouselContainer.appendChild(dotContainer);
const dots = dotContainer.children;

let imageIndex = 0;
dotContainer.children[imageIndex].classList.add('active');

rightArrow.addEventListener('click', () => {
    imageIndex = imageIndex % numberOfImages;
    if (imageIndex >= numberOfImages - 1) {
        imageIndex = -1;
        for (let i = 0; i < numberOfImages; i++) {
            const animate = setInterval(() => {
                images[i].style.left = `${parseInt(getStyle(images[i], 'left')) + 10}px`;
                if (getStyle(images[i], 'left') === i * 610) {
                    clearInterval(animate);
                }
            }, 10);
        }
    }
    else {
        for (let i = 0; i < numberOfImages; i++) {
            const animate = setInterval(() => {
                images[i].style.left = `${parseInt(getStyle(images[i], 'left')) - 10}px`;
                if (getStyle(images[i], 'left') === ((i - imageIndex) * 610)) {
                    clearInterval(animate);
                }
            }, 10);
        }
    }
    imageIndex++;
    for (let i = 0; i < numberOfImages; i++) {
        if (imageIndex === i) {
            dots[i].classList.add('active');
        } else {
            dots[i].classList.remove('active');
        }
    }
});

leftArrow.addEventListener('click', () => {
    imageIndex = imageIndex % numberOfImages;
    if (imageIndex <= 0) {
        imageIndex = numberOfImages;
        for (let i = 0; i < numberOfImages; i++) {
            const animate = setInterval(() => {
                images[i].style.left = `${parseInt(getStyle(images[i], 'left')) - 10}px`;
                if (getStyle(images[i], 'left') === -(numberOfImages - i - 1) * 610) {
                    clearInterval(animate);
                }
            }, 5);
        }
    }
    else {
        for (let i = 0; i < numberOfImages; i++) {
            const animate = setInterval(() => {
                images[i].style.left = `${parseInt(getStyle(images[i], 'left')) + 10}px`;
                if (getStyle(images[i], 'left') === ((i - imageIndex) * 610)) {
                    clearInterval(animate);
                }
            }, 5);
        }
    }
    imageIndex--;
    for (let i = 0; i < numberOfImages; i++) {
        if (imageIndex === i) {
            dots[i].classList.add('active');
        } else {
            dots[i].classList.remove('active');
        }
    }
});

for (let i = 0; i < numberOfImages; i++) {
    dots[i].addEventListener('click', (index) => {
        for (let j = 0; j < numberOfImages; j++) {
            if (dots[j].id === index.target.id) {
                slide(j);
                imageIndex = j;
                dots[j].classList.add('active');
            }
            else {
                dots[j].classList.remove('active');
            }
        }
    });
}

function slide(index) {
    if (imageIndex === index) return;
    for (let j = 0; j < numberOfImages; j++) {
        if (index < imageIndex) {
            const animate = setInterval(() => {
                images[j].style.left = `${parseInt(getStyle(images[j], 'left')) + 10}px`;
                if (getStyle(images[j], 'left') === (j - index) * 610) {
                    clearInterval(animate);
                }
            }, 5);
        } else {
            const animate = setInterval(() => {
                images[j].style.left = `${parseInt(getStyle(images[j], 'left')) - 10}px`;
                if (getStyle(images[j], 'left') === (j - index) * 610) {
                    clearInterval(animate);
                }
            }, 5);
        }
        // images[j].style.left = `${(j - index) * 610}px`;
        if (index === j) {
            dots[j].classList.add('active');
        } else {
            dots[j].classList.remove('active');
        }
    }
}

function animationSlide() {
    setInterval(() => {
        index = (imageIndex + 1) % numberOfImages;
        slide(index);
        imageIndex++;
        imageIndex = imageIndex % numberOfImages;
    }, 4000);
}

animationSlide();