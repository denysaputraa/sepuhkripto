// Animasi sederhana: fade-in untuk teks intro
window.addEventListener('load', () => {
  const introText = document.querySelector('.intro h1');
  const introPara = document.querySelector('.intro p');
  const btn = document.querySelector('.btn');

  introText.style.opacity = 0;
  introPara.style.opacity = 0;
  btn.style.opacity = 0;

  setTimeout(() => introText.style.opacity = 1, 500);
  setTimeout(() => introPara.style.opacity = 1, 1000);
  setTimeout(() => btn.style.opacity = 1, 1500);

  introText.style.transition = 'opacity 1s';
  introPara.style.transition = 'opacity 1s';
  btn.style.transition = 'opacity 1s';
});
