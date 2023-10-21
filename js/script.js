//Define a function that performs linear interpolation between two values based on the third value lerp.
const lerp = (f0, f1, t)  => (1 - t) * f0 + t * f1;
//Various properties related to mouse
const mouse ={
    newX: 0,
    newY: 0,
    speedX: 0,
    speedY: 0,
    x: 0,
    y: 0,
    width: 0,
    height: 0
};
//Selects the class'cursor' from HTML and assigns it to variable value'$cursor'
const $cursor = document.querySelector('.cursor');
//Selects the class'data-link' and stores them in the 'links'.
const links = document.querySelectorAll('[data-link]');
//Make the cursor follow user input according to mouse move and touch by mouse.x and mouse.y.
const handleMouse = (e) => {
if (!mouse.hover) {
    mouse.x = e.clientX || e.touches[0].clientX;
    mouse.y = e.clientY || e.touches[0].clientY;
}
}
//Add event listeners to the window object to track mouse movement and touch events and call the handleMouse function accordingly.
window.addEventListener("mousemove", handleMouse);
window.addEventListener("touchmove", handleMouse);
window.addEventListener("touchstart", handleMouse);
//Declares a variable'timer'
let timer;
//These event listeners manage cursor interactions when the mouse hover or leave each element.
links.forEach((link) => {
link.addEventListener("mouseenter", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        $cursor.classList.add('hover');
        mouse.hover = true;
        const { top, left, width, height } = link.getBoundingClientRect();
        mouse.x = left - 6;
        mouse.y = top - 1;
        mouse.width = width;
        mouse.height = height;
    }, 100);
});

link.addEventListener("mouseleave", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        $cursor.classList.remove('hover');
        mouse.hover = false;
    }, 100);
});
});

const raf = () => {
mouse.newX = lerp(mouse.newX, mouse.x, 1.2)
mouse.newY = lerp(mouse.newY, mouse.y, 1.2)

mouse.speedX = lerp(mouse.speedX, mouse.x - mouse.newX, 1.2)
mouse.speedY = lerp(mouse.speedY, mouse.y - mouse.newY, 1.2)
const speed = Math.abs(mouse.speedX) > Math.abs(mouse.speedY) ? mouse.speedX : -mouse.speedY

let style

if(!mouse.hover){
    style = {
        width: '30px',
        height: '30px',
        marginLeft: '-15px',
        marginTop: '-15px',
        transform:
           `translate(${mouse.newX}px, ${mouse.newY}px) rotate(${45-speed*0.2}deg) scale(${1-Math.abs(speed)*0.001})`
    }
}
    else{
        style = {
        width: `${mouse.width}px`,
        height: `${mouse.height}px`,
        marginLeft: 0,
        marginTop: 0,
        transform: `translate(${mouse.newX}px, ${mouse.newY}px) rotate(0deg) scale(${1 - Math.abs(speed) * 0.001})`
        }
    }

    Object.assign($cursor.style, style)
    requestAnimationFrame(raf)
};

raf();

var text = document.getElementById('text')

function handleOpen() {
    text.style.overflow = 'visible'
}
//Selects the ID "card_"
function flipCard(cardId) {
const select = document.getElementById('card_' + cardId);
//Seletcts the ID "cover_" as the cover of card_
const front = select.querySelector('.cover_' + cardId);
//Seletcts the ID "back_" as the back of card_
const back = select.querySelector('.back_' + cardId);

//Attaches a "mouseover" event listener to the "card_" 
select.addEventListener('mouseover', function () {
    front.style.transform = 'rotateY(180deg)';
    back.style.transform = 'rotateY(0deg)';
});
//Attaches a "mouseleave" event listener to the "card_" 
select.addEventListener('mouseleave', function () {
    front.style.transform = 'rotateY(0deg)';
    back.style.transform = 'rotateY(180deg)';
});
}

flipCard(1);
flipCard(2);
flipCard(3);
flipCard(4);
flipCard(5);
flipCard(6);
