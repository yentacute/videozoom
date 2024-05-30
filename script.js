const videoInput = document.getElementById('videoInput');
const videoPreview = document.querySelector('#videoPreview');
const downloadButton = document.querySelector('#downloadButton');
const scaleRatioInput = document.getElementById('scaleRatio');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
let urlBlob;
let scaleRatio = 1; // Default scale ratio

videoInput.addEventListener('change', () => {
  const file = videoInput.files[0];
  urlBlob = URL.createObjectURL(file);
  videoPreview.src = urlBlob;
  videoPreview.load();
  videoPreview.onloadeddata = function() {
    // Set the canvas dimensions to match the video
    canvas.width = videoPreview.videoWidth;
    canvas.height = videoPreview.videoHeight;

    // Update scale ratio when the input value changes
    scaleRatioInput.addEventListener('input', () => {
      scaleRatio = parseFloat(scaleRatioInput.value);
      canvas.width = videoPreview.videoWidth * scaleRatio;
      canvas.height = videoPreview.videoHeight * scaleRatio;
    });

    // Draw the video on the canvas and apply any desired edits
    function drawFrame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(scaleRatio, scaleRatio);
      ctx.drawImage(videoPreview, 0, 0);
      ctx.restore();
      requestAnimationFrame(drawFrame);
    }
    drawFrame();
  }
});

downloadButton.addEventListener('click', () => {
  canvas.toBlob((blob) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = 'scaled_video.mp4';
    link.dispatchEvent(
      new MouseEvent('click', { 
        bubbles: true, 
        cancelable: true, 
        view: window 
      })
    );
  }, 'video/mp4');
});