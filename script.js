window.addEventListener('load', () => {
  const elements = document.querySelectorAll('.intro h1, .intro p, .btn');
  elements.forEach((el, i) => {
    el.style.transition = 'opacity 1s';
    setTimeout(() => el.style.opacity = 1, i * 500 + 500);
  });
});
