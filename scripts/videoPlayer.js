import addZero from './supScripts.js';

const videoPlayerInit = () => {
    const videoPlayer = document.querySelector('.video-player');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoProgress = document.querySelector('.video-progress');
    const videoTimeTotal = document.querySelector('.video-time__total');

    const toggleIcon = () => {
        if(videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.add('fa-pause');
            videoButtonPlay.classList.remove('fa-play');
        }
    };

    const togglePlay = () => {
        if(videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }

        toggleIcon();
    };

    const stopPlay = () => {
        videoPlayer.pause();
        // начать видео с начала
        videoPlayer.currentTime = 0;  
        toggleIcon();
    };

    const updateTime = () => {
        // прошедшее время
        const currentTime = videoPlayer.currentTime;
        // длительность всего видео
        const durationTime = videoPlayer.duration;

        const minutesPassed = Math.floor(currentTime / 60) || '0';
        const secondsPassed = Math.floor(currentTime % 60) || '0';

        const minutesTotal = Math.floor(durationTime / 60) || '0';
        const secondsTotal = Math.floor(durationTime % 60) || '0';

        videoTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
        videoTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;

        // изменение прогрессбара
        videoProgress.value = (currentTime / durationTime) * 100;
    };
    

    const changeVideoProgress = () => {
        const durationTime = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (value * durationTime) / 100
    }




    // при клике на область экрана
    videoPlayer.addEventListener('click', togglePlay);

    // при клике на кнопку переключатель между остановить и воспроизвести
    videoButtonPlay.addEventListener('click', togglePlay);

    // при клике на кнопку остановить
    videoButtonStop.addEventListener('click', stopPlay);

    // изменение видео
    videoPlayer.addEventListener('timeupdate', updateTime)

    // перемотка видео
    videoProgress.addEventListener('change', changeVideoProgress);

};

export default videoPlayerInit;