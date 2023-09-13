let startTime;
let elapsedTime = 0;
let timerInterval;
let price = 0;
const RATE_PER_HOUR = 2500;

function formatTime(time) {
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time % 3600) / 60);
  let seconds = time % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function calculatePrice(timeInSeconds) {
  return RATE_PER_HOUR * (timeInSeconds / 3600);
}

function printPrice() {
  document.getElementById('price').textContent = `₡${price.toFixed(0)}`;
}

function updateTimer() {
  const elapsedTimeInSeconds = Math.floor((Date.now() - startTime) / 1000) + elapsedTime;
  document.getElementById('timer').textContent = formatTime(elapsedTimeInSeconds);
  price = calculatePrice(elapsedTimeInSeconds);
  printPrice();
}

document.getElementById('start-btn').addEventListener('click', function() {
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
  this.disabled = true;
  document.getElementById('stop-btn').disabled = false;
  document.getElementById('reset-btn').disabled = false;
  document.getElementById('pay-btn').disabled = false;
});

document.getElementById('stop-btn').addEventListener('click', function() {
  clearInterval(timerInterval);
  elapsedTime += Math.floor((Date.now() - startTime) / 1000);
  this.disabled = true;
  document.getElementById('start-btn').disabled = false;
});

document.getElementById('reset-btn').addEventListener('click', function() {
  clearInterval(timerInterval);
  startTime = null;
  elapsedTime = 0;
  price = 0;
  document.getElementById('timer').textContent = '00:00:00';
  printPrice();
  this.disabled = true;
  document.getElementById('stop-btn').disabled = true;
  document.getElementById('pay-btn').disabled = true;
  document.getElementById('start-btn').disabled = false;
});

document.getElementById('pay-btn').addEventListener('click', function() {
  alert(`El monto a pagar es ₡${price.toFixed(0)}`);
  document.getElementById('reset-btn').click();
});
