import radioPlayerInit from './radioPlayer.js';
import musicPlayerInit from './musicPlayer.js';
import videoPlayerInit from './videoPlayer.js';

// кнопки
const playerBtn = document.querySelectorAll('.player-btn');
// контент
const playerBlock = document.querySelectorAll('.player-block');
// заголовок
const temp = document.querySelector('.temp')


// удаление класса активности
const deactivationPlayer = () => {
    playerBtn.forEach(item => item.classList.remove('active'));
    playerBlock.forEach(item => item.classList.remove('active'));
}


playerBtn.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        deactivationPlayer();
        temp.style.display = 'none'
        btn.classList.toggle('active')
        playerBlock[i].classList.add('active');
    });
})

radioPlayerInit();
musicPlayerInit();
videoPlayerInit();