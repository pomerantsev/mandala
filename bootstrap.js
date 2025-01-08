const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const scale = window.devicePixelRatio;

const clientRect = canvas.getBoundingClientRect();

const width = canvas.width = clientRect.width * scale;
const height = canvas.height = clientRect.width * scale;

console.log(canvas.width, canvas.height);

const thickness = 20;

context.fillStyle = 'black';
context.fillRect(0, 0, canvas.width, canvas.height);

// let circle = null;
let lastPoint = null;
let currentPoint = null;

const getRadius = (x, y) => {
  return Math.sqrt(Math.pow(x - width / 2, 2) + Math.pow(y - height / 2, 2));
};

const getAngle = (x, y) => {
  return Math.atan2(y - height / 2, x - width / 2);
};

const repetitions = 10;

function draw() {
  if (lastPoint && currentPoint) {
    context.strokeStyle = 'white';
    context.lineWidth = thickness;
    context.lineCap = 'round';
    context.beginPath();

    console.log(getRadius(currentPoint.x, currentPoint.y));

    const lastRadius = getRadius(lastPoint.x, lastPoint.y);
    const lastAngle = getAngle(lastPoint.x, lastPoint.y);
    const currentRadius = getRadius(currentPoint.x, currentPoint.y);
    const currentAngle = getAngle(currentPoint.x, currentPoint.y);

    for (let i = 0; i < repetitions; i++) {
      context.moveTo(
        width / 2 + lastRadius * Math.cos(lastAngle + 2 * Math.PI / repetitions * i),
        height / 2 + lastRadius * Math.sin(lastAngle + 2 * Math.PI / repetitions * i)
      );
      context.lineTo(
        width / 2 + currentRadius * Math.cos(currentAngle + 2 * Math.PI / repetitions * i),
        height / 2 + currentRadius * Math.sin(currentAngle + 2 * Math.PI / repetitions * i)
      );
      context.stroke();
    }
    // context.moveTo(lastPoint.x, lastPoint.y);
    // context.lineTo(currentPoint.x, currentPoint.y);
    // context.stroke();

    // context.moveTo(canvas.width - lastPoint.y, lastPoint.x);
    // context.lineTo(canvas.width - currentPoint.y, currentPoint.x);
    // context.stroke();

    // context.moveTo(canvas.width - lastPoint.x, canvas.width - lastPoint.y);
    // context.lineTo(canvas.width - currentPoint.x, canvas.width - currentPoint.y);
    // context.stroke();

    // context.moveTo(lastPoint.y, canvas.width - lastPoint.x);
    // context.lineTo(currentPoint.y, canvas.width - currentPoint.x);
    // context.stroke();

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
