window.addEventListener('load', () => {
  const introH1 = document.querySelector('.intro h1');
  const introP = document.querySelector('.intro p');
  const btn = document.querySelector('.btn');

  introH1.style.transition = 'opacity 1s';
  introP.style.transition = 'opacity 1s';
  btn.style.transition = 'opacity 1s';

  setTimeout(() => introH1.style.opacity = 1, 500);
  setTimeout(() => introP.style.opacity = 1, 1000);
  setTimeout(() => btn.style.opacity = 1, 1500);
});
