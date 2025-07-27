
const overlay = document.getElementById("overlay");
const enterText = document.getElementById("enterText");
const video = document.getElementById("bgVideo");
const canvas = document.getElementById("pixelCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function pixelNoise() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const imageData = ctx.createImageData(canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const val = Math.random() * 25;
    data[i] = val;
    data[i + 1] = val;
    data[i + 2] = val;
    data[i + 3] = Math.random() * 40;
  }
  ctx.putImageData(imageData, 0, 0);
  requestAnimationFrame(pixelNoise);
}
pixelNoise();

enterText.addEventListener("click", () => {
  overlay.style.display = "none";
  video.muted = false;
  video.currentTime = 0;
  video.load();
  video.play().catch(e => console.log("Playback blocked:", e));
});

document.addEventListener('wheel', (e) => {
  if (e.ctrlKey) e.preventDefault();
}, { passive: false });

document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '='))) {
    e.preventDefault();
  }
});
