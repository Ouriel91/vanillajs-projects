const videoEl = document.getElementById('video')
const playEl = document.getElementById('play')
const stopEl = document.getElementById('stop')
const progressEl = document.getElementById('progress')
const timestampEl = document.getElementById('timestamp')

//controls
videoEl.addEventListener('click', toggleStatus)
videoEl.addEventListener('pause', updateIcons)
videoEl.addEventListener('play',updateIcons)
videoEl.addEventListener('timeupdate', updateProgress)

//buttons
playEl.addEventListener('click', toggleStatus)
stopEl.addEventListener('click', stopVideo)
progressEl.addEventListener('change', setVideoProgress)

function toggleStatus() {
    if(videoEl.paused)
    {
        videoEl.play()
    }
    else {
        videoEl.pause()
    }
}

function updateIcons() {
    if(videoEl.paused)
    {
        playEl.innerHTML = `
            <i class="fa fa-play fa-2x"></i>
        `
    }
    else {
        playEl.innerHTML = `
        <i class="fa fa-pause fa-2x"></i>
        `
    }
}

function updateProgress() {
    progressEl.value = (+videoEl.currentTime / videoEl.duration) * 100

    let mins = Math.floor(video.currentTime / 60)
    if(mins < 10){
        mins = '0' + String(mins)
    }
    
    let secs = Math.floor(video.currentTime % 60)
    if(secs < 10){
        secs = '0' + String(secs)
    }

    timestampEl.innerHTML = `${mins}:${secs}`
}

function stopVideo() {
    videoEl.currentTime = 0
    videoEl.pause()
}

function setVideoProgress() {
    videoEl.currentTime = (+progressEl.value * videoEl.duration) / 100
}