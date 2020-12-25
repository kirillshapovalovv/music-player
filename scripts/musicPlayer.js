import addZero from './supScripts.js';

const musicPlayerInit = () => {
    const audio = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img');
    const audioHeader = document.querySelector('.audio-header');
    const audioPlayer = document.querySelector('.audio-player');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioButtonPlay = document.querySelector('.audio-button__play');
    const audioProgress = document.querySelector('.audio-progress');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioTimeTotal = document.querySelector('.audio-time__total');

    // плейлист песен
    const playList = ['hello', 'flow', 'speed'];
    // индекс песни, играющей в данный момент 
    let trackIndex = 0;

    const loadTrack = () => {
        const isPlayed = audioPlayer.paused;
        const track = playList[trackIndex];

        audioImg.src = `./audio/${track}.jpg`;
        audioHeader.textContent = track.toUpperCase();
        audioPlayer.src = `./audio/${track}.mp3`;
        

        // если трек стоит на паузе
        if(isPlayed) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        };
    };

    const prevTrack = () => {
        // если трек первый
        if(trackIndex !== 0) {
            trackIndex--;
        } else {
            // переход к последнему треку
            trackIndex = playList.length - 1;
        };
        loadTrack();
    };

    const nextTrack = () => {
        // если трек последний
        if(trackIndex === playList.length - 1) {
            trackIndex = 0;
        } else {
            trackIndex++;
        };
        loadTrack();
    };

    // при клике на навигацию
    audioNavigation.addEventListener('click', e => {
        // клик по кнопке play
        if(e.target.classList.contains('audio-button__play')) {
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');

            if(audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            };

            const track = playList[trackIndex];
            audioHeader.textContent = track.toUpperCase();
        };

        // клик по кнопке prev 
        if(e.target.classList.contains('audio-button__prev')) {
            prevTrack();
        };

        // клик по кнопке next 
        if(e.target.classList.contains('audio-button__next')) {
            nextTrack();
        };
    });

    // когда трек закончился
    audioPlayer.addEventListener('ended', () => {
        nextTrack();
        audioPlayer.play();
    });

    // прогрессбар
    audioPlayer.addEventListener('timeupdate', () => {
        const durationTime = audioPlayer.duration;
        const currentTime = audioPlayer.currentTime;
        const progress = (currentTime / durationTime) * 100;

        audioProgressTiming.style.width = `${progress}%`;


        const minutesPassed = Math.floor(currentTime / 60) || '0';
        const secondsPassed = Math.floor(currentTime % 60) || '0';

        const minutesTotal = Math.floor(durationTime / 60) || '0';
        const secondsTotal = Math.floor(durationTime % 60) || '0';

        audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
        audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
    });

    // перемотка трека
    audioProgress.addEventListener('click', e => {
        const x = e.offsetX;
        const allWidth = audioProgress.clientWidth;
        const durationTime = audioPlayer.duration;
        const progress = (x / allWidth) * durationTime;

        audioPlayer.currentTime = progress;
    });


};

export default musicPlayerInit;