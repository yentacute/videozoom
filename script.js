const fileUrl = document.querySelector('.file-url');
const uploadFile = document.querySelector('#videoInput');
const scale = document.querySelector('#scaleRatio');
const downloadButton = document.querySelector('#downloadButton');
const videoPreview = document.querySelector('#videoPreview');
const videoPlayIcon = document.querySelector('.box-video svg');
const playEl = document.querySelector('.box-play');
let videoFile;

uploadFile.addEventListener('change', () => {
  videoFile = uploadFile.files[0];
  const tempUrl = URL.createObjectURL(videoFile);
  videoPreview.src = tempUrl;
  videoPlayIcon.classList.remove('hidden');
  videoPlayIcon.classList.add('show')
});

downloadButton.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(videoFile);
  downloadFile(videoFile || fileUrl.value);
});

function downloadFile(blob) {
    if (videoFile) {
      // revoke the old object url to avoid using more memory than needed
      URL.revokeObjectURL(videoFile);  
    }
      const tempUrl = URL.createObjectURL(blob);
      const aTag = document.createElement('a');
      aTag.href = tempUrl;
      aTag.download = 'video_edited.mp4';
      document.body.appendChild(aTag);
      aTag.click();
      aTag.remove();
}

function playStopVideo() {
  if (videoPreview.paused) {
    videoPreview.play();
    videoPlayIcon.classList.add('hidden')
    videoPlayIcon.classList.remove('show')
  } else {
    videoPreview.pause();
    videoPlayIcon.classList.remove('hidden')
    videoPlayIcon.classList.add('show')
  }
}

videoPreview.addEventListener('click', playStopVideo);
