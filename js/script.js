function showInvitation() {
  // Intentar reproducir desde SoundCloud
  try {
    const widget = SC.Widget("soundcloudWidget");
    widget.play();
    widget.setVolume(50);
  } catch (e) {
    console.log("Error con SoundCloud:", e);
    // Intentar con el audio alternativo
    const song = document.getElementById('treasureSong');
    song.volume = 0.5;
    song.play().catch(e => {
      Swal.fire({
        title: '¡Activa la música!',
        text: 'Por favor, reproduce "Treasure" de Bruno Mars en otro tab para ambientar',
        icon: 'info'
      });
    });
  }

  // Resto del código igual que antes
  const greeting = document.querySelector('.greeting');
  greeting.classList.add('dancing');
  startConfetti();

  setTimeout(() => {
    createHearts();
    Swal.fire({
      title: '¿Me acompañarías al cine?',
      html: '<div style="font-size: 1.2em; font-family: \'Dancing Script\', cursive;">Lola, me encantaría compartir una película contigo.<br>¿Qué tal este viernes por la tarde?<br>Prometo palomitas, buenos momentos y<br><span style="color: #e84393;">¡mucha diversión!</span> 🎬❤️</div>',
      imageUrl: 'img/lola1.png',
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: 'Lola',
      showConfirmButton: true,
      confirmButtonText: '¡Sí, me encantaría!',
      confirmButtonColor: '#ff758c',
      showCancelButton: true,
      cancelButtonText: 'Tal vez otro día',
      background: 'linear-gradient(135deg, #fff, #ffe6f2)',
      customClass: {
        popup: 'animated pulse'
      }
    }).then((result) => {
      stopConfetti();
      greeting.classList.remove('dancing');
      
      if (result.isConfirmed) {
        Swal.fire({
          title: '¡Perfecto! 💖',
          text: 'Estoy emocionado por nuestra cita de cine 🎬',
          icon: 'success',
          timer: 3000,
          timerProgressBar: true
        });
      }
    });
  }, 1000);
}

// Cargar SDK de SoundCloud
(function() {
  const scScript = document.createElement('script');
  scScript.src = 'https://w.soundcloud.com/player/api.js';
  document.body.appendChild(scScript);
})();

// Resto del código (confeti, corazones) igual que antes