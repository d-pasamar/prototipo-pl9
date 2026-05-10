async function startAR() {
  document.getElementById('intro').classList.add('hidden');
  document.getElementById('topbar').style.display = '';
  document.getElementById('marker-status').style.display = '';

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
    });
    const video = document.getElementById('camera');
    video.srcObject = stream;
    video.play();

    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    }

    setTimeout(() => {
      document.getElementById('hud').classList.add('visible');
      document.getElementById('vitals-hud').classList.add('visible');
      document.getElementById('crosshair').classList.add('visible');
      const ms = document.getElementById('marker-status');
      ms.textContent = '● AR activo';
      ms.className = 'marker-status found';
    }, 1200);

  } catch (err) {
    document.getElementById('hud').classList.add('visible');
    document.getElementById('vitals-hud').classList.add('visible');
    document.getElementById('crosshair').classList.add('visible');
    const ms = document.getElementById('marker-status');
    ms.textContent = '⚠ Modo demo';
    ms.className = 'marker-status searching';
  }
}

function goTo(index) {
  for (let i = 0; i < 4; i++) {
    document.getElementById('s' + i).classList.remove('active');
    document.getElementById('nb' + i).classList.remove('active');
  }
  document.getElementById('s' + index).classList.add('active');
  document.getElementById('nb' + index).classList.add('active');
  if (index !== 3) closeProjection();
}

function openProjection() {
  document.getElementById('img-proj').classList.add('visible');
  document.getElementById('crosshair').classList.remove('visible');
}

function closeProjection() {
  document.getElementById('img-proj').classList.remove('visible');
  document.getElementById('crosshair').classList.add('visible');
}

let projZoomLevel = 100;
function projZoom(delta) {
  projZoomLevel = Math.max(50, Math.min(300, projZoomLevel + delta));
  document.getElementById('proj-zoom-val').textContent = projZoomLevel + '%';
  const img = document.getElementById('proj-img');
  if (img) img.style.transform = `scale(${projZoomLevel / 100})`;
}
