import lottie from 'lottie-web'
lottie.loadAnimation({
  container: document.getElementById('app'), // the dom element that will contain the animation
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: './data.json' // the path to the animation json
});