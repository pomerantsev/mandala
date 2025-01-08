const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const scale = window.devicePixelRatio;

const clientRect = canvas.getBoundingClientRect();

canvas.width = clientRect.width * scale;
canvas.height = clientRect.width * scale;

console.log(canvas.width, canvas.height);

const thickness = 20;

context.fillStyle = 'black';
context.fillRect(0, 0, canvas.width, canvas.height);

// let circle = null;
let lastPoint = null;
let currentPoint = null;

function draw() {
  if (lastPoint && currentPoint) {
    context.strokeStyle = 'white';
    context.lineWidth = thickness;
    context.lineCap = 'round';
    context.beginPath();

    context.moveTo(lastPoint.x, lastPoint.y);
    context.lineTo(currentPoint.x, currentPoint.y);
    context.stroke();

    context.moveTo(canvas.width - lastPoint.y, lastPoint.x);
    context.lineTo(canvas.width - currentPoint.y, currentPoint.x);
    context.stroke();

    context.moveTo(canvas.width - lastPoint.x, canvas.width - lastPoint.y);
    context.lineTo(canvas.width - currentPoint.x, canvas.width - currentPoint.y);
    context.stroke();

    context.moveTo(lastPoint.y, canvas.width - lastPoint.x);
    context.lineTo(currentPoint.y, canvas.width - currentPoint.x);
    context.stroke();

    // context.arc(canvas.width - circle.y, circle.x, circle.radius, 0, Math.PI * 2);
    // context.fill();

    // context.beginPath();
    // context.arc(canvas.width - circle.x, canvas.width - circle.y, circle.radius, 0, Math.PI * 2);
    // context.fill();

    // context.beginPath();
    // context.arc(circle.y, canvas.width - circle.x, circle.radius, 0, Math.PI * 2);
    // context.fill();
  }
  requestAnimationFrame(draw);
}

draw();

canvas.addEventListener('touchstart', event => {
  event.preventDefault();
  const touch = event.touches[0];
  console.log(touch.clientX, touch.clientY);
  currentPoint = {
    x: touch.clientX * scale,
    y: touch.clientY * scale
  };
});

canvas.addEventListener('touchmove', event => {
  const touch = event.touches[0];
  lastPoint = currentPoint;
  currentPoint = {
    x: touch.clientX * scale,
    y: touch.clientY * scale
  };
});

canvas.addEventListener('touchend', () => {
  lastPoint = currentPoint = null;
});

document.getElementById('reset').addEventListener('click', () => {
  context.fillStyle = 'white';
  context.fillRect(0, 0, canvas.width, canvas.height);
})
