const musicContainer = document.getElementById('music-container');
const title = document.getElementById('title')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const audio = document.getElementById('audio')
const cover = document.getElementById('cover')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
const playBtn = document.getElementById('play')
const currTime = document.getElementById('curr-time')
const durTime = document.getElementById('dur-time')

const songsNames = ['hey', 'summer', 'ukulele']
let songIndex = 2

//functions
const loadSong = (item) => {
    title.innerText = item
    audio.src = `music/${item}.mp3`
    cover.src = `images/${item}.jpg`
}

const playSong = () => {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
}

const pauseSong = () => {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')

    audio.pause()
}

const playChecking = () => {
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying) {
        pauseSong()
    }
    else{
        playSong()
    }
}

const prevSong = () => {
    --songIndex
    if(songIndex < 0){
        songIndex = songsNames.length - 1
    }

    loadSong(songsNames[songIndex])
    playSong()
}

const nextSong = () => {
    ++songIndex
    if(songIndex > songsNames.length -1)
    {
        songIndex = 0
    }
    loadSong(songsNames[songIndex])
    playSong()
}

const updateProgress = (e) => {
    const {duration, currentTime} = e.srcElement
    const progressPercentage = (currentTime / duration) * 100
    progress.style.width = `${progressPercentage}%`
}

//use regular function for this (refers to element that invoke function)
function setProgress(e){
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

const moreThanSixty = (x) => {
    let time;

    for (var i = 1; i<=60; i++){
        if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
            time = Math.floor(x) - (60*i);
            time = time <10 ? '0'+time:time;
        }
    }

    return time;
}

// define seconds currentTime
const get_sec = (x) => {
    let sec;

    if(Math.floor(x) >= 60){      
        sec = moreThanSixty(x)
    }else{
        sec = Math.floor(x);
        sec = sec < 10 ? '0'+sec : sec;
    }

    return sec;
} 

const get_sec_d = (x, duration) => {
    let sec_d;
    if(Math.floor(x) >= 60){  
        sec_d = moreThanSixty(x)
    }else{
        sec_d = (isNaN(duration) === true)? '0':
        Math.floor(x);
        sec_d = sec_d < 10 ? '0'+sec_d : sec_d;
    }

    return sec_d;
} 

const DurTime = (e) => {
	const {duration,currentTime} = e.srcElement;
	var sec;
	var sec_d;

	// define minutes currentTime
	let min = (currentTime==null)? 0:
	 Math.floor(currentTime/60);
	 min = min <10 ? '0'+min:min;

	sec = get_sec (currentTime,sec);

	// change currentTime DOM
	currTime.innerHTML = min +':'+ sec;

	// define minutes duration
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	// define seconds duration
	sec_d = get_sec_d (duration, sec_d);

	// change duration DOM
	durTime.innerHTML = min_d +':'+ sec_d;		
}

//listeners
playBtn.addEventListener('click', playChecking)
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

//update progress
audio.addEventListener('timeupdate', updateProgress)   //song or time update
progressContainer.addEventListener('click', setProgress) //progressbar click
audio.addEventListener('ended', nextSong)   //song ended
audio.addEventListener('timeupdate',DurTime) //song time

//play, pause, foward, backward with keyboard
document.addEventListener('keydown', (e) => {
    if(e.key === ' '){
        playChecking()
    }
})

document.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowRight'){
        nextSong()
    }
})

document.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowLeft'){
        prevSong()
    }
})

loadSong(songsNames[songIndex])