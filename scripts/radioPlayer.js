const radioPlayerInit = () => {
    const radio = document.querySelector('.radio');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioHeader = document.querySelector('.radio-header__big');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioStop = document.querySelector('.radio-stop');


    const audio = new Audio();
    audio.type='audio/aac';

    radioStop.disabled = true;

    const changeIconPlay = () => {
        if(audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-pause');
        } else {
            radio.classList.add('play');
            radioStop.classList.remove('fa-play');
            radioStop.classList.add('fa-pause');
        }
    };

    const selectItem = elem => {
        radioItem.forEach(item => {
            item.classList.remove('select');
            elem.classList.add('select');
        });
    };


    // при клике на радиостанцию
    radioNavigation.addEventListener('change', e => {
        radioStop.disabled = false;
        audio.src = e.target.dataset.radioStantion;
        audio.play();

        changeIconPlay();
        
        const currentParentTarget = e.target.closest('.radio-item');
        // удаление класса select у всех item и добавление класса select к текущему элементу
        selectItem(currentParentTarget);

        const title = currentParentTarget.querySelector('.radio-name').textContent;
        const imageUrl = currentParentTarget.querySelector('.radio-img').src;

        radioHeader.textContent = title;
        radioCoverImg.src = imageUrl;
        
    });
    // при клике на кнопку стоп
    radioStop.addEventListener('click', () => {
        if(audio.paused) {
            audio.play();
        } else {
            audio.pause();
        };

        changeIconPlay();
    });
};

export default radioPlayerInit;