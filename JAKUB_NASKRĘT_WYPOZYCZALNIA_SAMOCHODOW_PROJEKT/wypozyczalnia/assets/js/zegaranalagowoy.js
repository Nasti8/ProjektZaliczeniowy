const canvas = document.getElementById('analog-clock');
  const context = canvas.getContext('2d');
  let radius = canvas.height / 2;
  context.translate(radius, radius);
  radius = radius * 0.9;

  function drawClock() {
    drawFace(context, radius);
    drawNumbers(context, radius);
    drawTime(context, radius);
  }

  function drawFace(context, radius) {
    context.beginPath();
    context.arc(0, 0, radius, 0, 2 * Math.PI);
    context.fillStyle = 'white';
    context.fill();

    context.lineWidth = radius * 0.1;
    context.strokeStyle = '#333';
    context.stroke();

    context.beginPath();
    context.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
    context.fillStyle = '#333';
    context.fill();
  }

  function drawNumbers(context, radius) {
    let ang;
    let num;
    context.font = radius * 0.15 + 'px Arial';
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    for (num = 1; num < 13; num++) {
      ang = num * Math.PI / 6;
      context.rotate(ang);
      context.translate(0, -radius * 0.85);
      context.rotate(-ang);
      context.fillText(num.toString(), 0, 0);
      context.rotate(ang);
      context.translate(0, radius * 0.85);
      context.rotate(-ang);
    }
  }

  function drawTime(context, radius) {
    const now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    // hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) +
      (minute * Math.PI / (6 * 60)) +
      (second * Math.PI / (360 * 60));
    drawHand(context, hour, radius * 0.5, radius * 0.07);
    // minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(context, minute, radius * 0.8, radius * 0.07);
    // second
    second = (second * Math.PI / 30);
    drawHand(context, second, radius * 0.9, radius * 0.02);
  }

  function drawHand(context, pos, length, width) {
    context.beginPath();
    context.lineWidth = width;
    context.lineCap = 'round';
    context.moveTo(0, 0);
    context.rotate(pos);
    context.lineTo(0, -length);
    context.stroke();
    context.rotate(-pos);
  }

  drawClock();
  setInterval(drawClock, 1000);