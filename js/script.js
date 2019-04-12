let hambur = document.querySelector('.hamburger');// гамбургер
let dataSlide = document.querySelector('[data-slide="nav"]');//строка поиска и ночного режима
let mor = document.querySelector('.more');//кнопка ЗАГРУЗАТЬ ЕЩЁ
let modal = document.querySelector('.modal');//окно проигрывателя
let videos = document.querySelectorAll('.videos__item');// массив с карточками имеющимися
let active = false;// сласс плавного всплытия
let player;



// выдвижение окна поиска
hambur.addEventListener('click', function(){
	if(active === false){
		active = true;
		dataSlide.style.height = 30 + 'px';
		dataSlide.style.opacity = 1;
	}
	else {
		active = false;
		dataSlide.style.height = 0 + 'px';
		dataSlide.style.opacity = 0;
	}
});


let switcher = document.getElementById('cbx');
let nigth = false;

// включение ночного режима
switcher.addEventListener('change', function(){
	if(nigth === false){
		nigth = true;
		document.body.style.backgroundColor = '#000';
		hambur.querySelectorAll('line').forEach(item => {
			 item.style.stroke = '#fff';
		 });
		dataSlide.querySelector('.header__item-descr').style.color = '#fff';
		document.querySelectorAll('.videos__item-descr').forEach(item => {
			item.style.color = '#fff';
		});
		document.querySelector('.logo > img').src = 'logo/youtube_night.svg';
		
	}
	else {
		nigth = false;
		document.body.style.backgroundColor = '#fff';
		hambur.querySelectorAll('line').forEach(item => {
			 item.style.stroke = '#000';
		 });
		dataSlide.querySelector('.header__item-descr').style.color = '#000';
		document.querySelectorAll('.videos__item-descr').forEach(item => {
			item.style.color = '#000';
		});
		document.querySelector('.logo > img').src = 'logo/youtube.svg';
	}
});


const data = [ 
	['img/thumb_3.webp', 'img/thumb_4.webp', 'img/thumb_5.webp'],
	
	['#3 Верстка на flexbox CSS | Блок преимущества и галерея | Марафон верстки | Артем Исламов', '#2 Установка spikmi и работа с ветками на Github | Марафон вёрстки Урок 2', '#1 Верстка реального заказа landing Page | Марафон вёрстки | Артём Исламов'],
	
	['3,6 тыс. просмотров', '4,2 тыс. просмотров', '28 тыс. просмотров'], 
	
	['X9SmcY3lM-U', '7BvHoh0BrMw', 'mC8JW_aG2EM'] ];

//создание новых карточек при нажатии на кнопку
mor.addEventListener('click', function(){
		
	const videosWrapper = document.querySelector('.videos__wrapper');
		mor.remove();		 
			
	for(let i = 0; i < data[0].length; i++){
		
		let card = document.createElement('a');
		card.classList.add('videos__item', 'videos__item-active');
		card.setAttribute('data-url', data[3][i]);
		
		card.innerHTML = `

		 <img src= ${data[0][i]}>
          <div class="videos__item-descr">
                            ${data[1][i]}</div>
                        <div class="videos__item-views">
                            ${data[2][i]}
                        </div>
		
		`;
		
		videosWrapper.appendChild(card);
		
		setTimeout(()=>{
			bindNewModal(card);
			card.classList.remove('videos__item-active');
		}, 10);
	};
	sliceTitle(".videos__item-descr", 100);
	
	});
// обрезаем днинну строки
function sliceTitle(selector, count) {
	document.querySelectorAll(selector).forEach(item => {

		item.textContent.trim();
		if(item.textContent.length < count){
			return;
		} else {
			const str = item.textContent.slice(0, count) + "...";
			item.textContent = str;
		}

	});
}

sliceTitle(".videos__item-descr", 100);
// вкллючение основного плеера
function openModal (){
	modal.style.display = 'block';
}
//выключение основного плеера
function closeModal () {
	modal.style.display = 'none';
	player.stopVideo();	
};


//слушатель открытия окна на все имеющиеся карточки
function bindModal(cards) {
		 
	cards.forEach(item => {
		item.addEventListener('click', (e) => {
			e.preventDefault();
			const id = item.getAttribute('data-url');
			loadVideo(id);
			openModal();
		})
	});
}
bindModal(videos);

// слушатель на 1ну карточку открытия основного проигрывателя
function bindNewModal (cards) {
	cards.addEventListener('click', (e) => {
		e.preventDefault();
		const id = cards.getAttribute('data-url');
			loadVideo(id);
		openModal();
	})
}

modal.addEventListener('click', (e) => {
	
	if(!e.target.classList.contains('.modal__body')){
		closeModal();
	}
})

function createVideo (){
	var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
	  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	  
	 setTimeout(() => {
		player = new YT.Player('frame', {
			height: '100%',
			width: '100%',
			videoId: 'M7lc1UVf-VE',
			
		  });
	 },300)
}
createVideo();

// загружает новый id  в плеер 
function loadVideo (id) {
	player.loadVideoById({'videoId': `${id}`})
}
