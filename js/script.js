function showInvitation() {
  startConfetti();
  
  setTimeout(() => {
    createHearts();
    Swal.fire({
      title: '¿Me acompañarías al cine?',
      html: '<div style="font-size: 1.2em; font-family: \'Dancing Script\', cursive;">Lola, me encantaría compartir una película contigo.<br>¿Qué tal este viernes por la tarde?<br>Prometo palomitas y buenos momentos 🍿❤️</div>',
      imageUrl: 'img/lola1.png',
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: 'Lola',
      background: 'rgba(255, 255, 255, 0.9)',
      backdrop: `rgba(255,182,193,0.4)`,
      showConfirmButton: true,
      confirmButtonText: '¡Sí, me encantaría!',
      confirmButtonColor: '#ff758c',
      showCancelButton: true,
      cancelButtonText: 'Tal vez otro día',
      customClass: {
        popup: 'animated pulse'
      }
    }).then((result) => {
      stopConfetti();
      if (result.isConfirmed) {
        Swal.fire({
          title: '¡Perfecto! 💖',
          text: 'Estoy emocionado por nuestra cita de cine 🎬',
          icon: 'success'
        });
      } else {
        Swal.fire({
          title: 'Entendido 😊',
          text: 'Seguiré intentándolo hasta que digas que sí',
          icon: 'info'
        });
      }
    });
  }, 1000);
}

let confettiCanvas = document.getElementById('confetti');
let confettiCtx = confettiCanvas.getContext('2d');
let confettiParticles = [];
let confettiAnimationId;

function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}

function startConfetti() {
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  for (let i = 0; i < 150; i++) {
    confettiParticles.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      size: Math.random() * 10 + 5,
      color: `hsl(${Math.random() * 60 + 330}, 100%, 50%)`,
      speed: Math.random() * 3 + 2,
      angle: Math.random() * 360,
      rotation: Math.random() * 0.2 - 0.1
    });
  }
  
  animateConfetti();
}

function stopConfetti() {
  cancelAnimationFrame(confettiAnimationId);
  confettiParticles = [];
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  window.removeEventListener('resize', resizeCanvas);
}

function animateConfetti() {
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  
  confettiParticles.forEach((p, i) => {
    confettiCtx.save();
    confettiCtx.translate(p.x, p.y);
    confettiCtx.rotate(p.angle);
    
    confettiCtx.fillStyle = p.color;
    confettiCtx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
    
    confettiCtx.restore();
    
    p.y += p.speed;
    p.angle += p.rotation;
    
    if (p.y > confettiCanvas.height) {
      p.y = -p.size;
      p.x = Math.random() * confettiCanvas.width;
    }
  });
  
  confettiAnimationId = requestAnimationFrame(animateConfetti);
}

function createHearts() {
  const colors = ['#ff6b8b', '#ff8e9e', '#ffb3c1', '#ffd6e7', '#ff758c'];
  const container = document.body;
  
  for (let i = 0; i < 30; i++) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.classList.add('heart');
    
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = Math.random() * 100 + 'vh';
    
    const size = Math.random() * 20 + 10;
    heart.style.fontSize = size + 'px';
    
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];
    
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    
    container.appendChild(heart);
    
    setTimeout(() => {
      heart.remove();
    }, 4000);
  }
}