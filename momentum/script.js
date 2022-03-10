/*..........................................................время.................................................*/

function showTime() {
  let time = document.querySelector('.main_time');
  let date = document.querySelector('.main_date');
  let dateTime = new Date();
  let dateDate = new Date();
  let options = {weekday: 'long', day: 'numeric', month: 'long'};
  time.textContent = dateTime.toLocaleTimeString();
  date.textContent = dateDate.toLocaleDateString('en-EN', options);
  setTimeout(showTime, 1000);
}
showTime();

/*.........................................................приветствие.................................................*/

function greetingMomentum() {
  let greeting = document.querySelector('.main_greeting_title');
  let name = document.querySelector('.main_name');
  let getGreeting = (time) => {
    let timeOfDay = ['night', 'morning', 'day', 'evening'];
    let getTime = time => Math.floor((time / 6));
    return `Good ${timeOfDay[getTime(time)]}`
  };

  let showGreeting = () => {
    let date = new Date();
    let hours = date.getHours();
    greeting.textContent = getGreeting(hours);
    setTimeout(showGreeting, 1000)
  };


  let setLocalStorage = () => {
    localStorage.setItem('main_name', name.value);
  };

  let getLocalStorage = () => {
    if (localStorage.getItem('main_name')) {
      name.value = localStorage.getItem('main_name');
    }
  };
  window.addEventListener('load', showGreeting);
  window.addEventListener('load', getLocalStorage);
  window.addEventListener('beforeunload', setLocalStorage)
};
greetingMomentum();

/*..........................................................аудиоплеер.................................................*/

let buttonClick = document.querySelector('.button_player');
let playPrev = document.querySelector('.momentum_play_prev');
let playNext = document.querySelector('.momentum_play_next');
let playItem = document.querySelectorAll('.momentum_play_item');
let nowSounds = 0;
let sounds = [new Audio('assets/sounds/Aqua Caelestis.mp3'), new Audio('assets/sounds/River Flows In You.mp3'), new Audio('assets/sounds/Summer Wind.mp3'), new Audio('assets/sounds/Ennio Morricone.mp3')];

function colorItem() {
  for(let i = 0; i < playItem.length; i++) {
    if (i === nowSounds) {
      playItem[i].style.color = '#C5B358';
      playItem[i].style.opacity = '1';
    } else {
      playItem[i].style.color = '#fff';
      playItem[i].style.opacity = '.7';
    }
  }
};

buttonClick.addEventListener('click', function() {
  if (buttonClick.classList.contains('momentum_play')) {
    buttonClick.classList.remove('momentum_play');
    buttonClick.classList.add('momentum_pause');
    sounds[nowSounds].currentTime = 0;
    sounds[nowSounds].play();
  } else {
    buttonClick.classList.remove('momentum_pause');
    buttonClick.classList.add('momentum_play');
    sounds[nowSounds].pause();
  }
  colorItem();
});

playNext.addEventListener('click', function() {
  sounds[nowSounds].pause();
  if (nowSounds === 3) {
    nowSounds = 0;
  } else {
    nowSounds++;
  };
  sounds[nowSounds].currentTime = 0;
  sounds[nowSounds].play();
  buttonClick.classList.remove('momentum_play');
  buttonClick.classList.add('momentum_pause');
  colorItem();
});

playPrev.addEventListener('click', function() {
  sounds[nowSounds].pause();
  if (nowSounds === 0) {
    nowSounds = 3;
  } else {
    nowSounds--;
  };
  sounds[nowSounds].currentTime = 0;
  sounds[nowSounds].play();
  buttonClick.classList.remove('momentum_play');
  buttonClick.classList.add('momentum_pause');
  colorItem();
});

/*..........................................................цитаты.................................................*/

let renew = document.querySelector('.footer_renew');
let quoteTitle = document.querySelector('.footer_quote_title');
let authorTitle = document.querySelector('.footer_author_title');
let quote = ['Chop your own wood and it will warm you twice.', 'Forgiveness is the attribute of the strong.', 'Choose a job you love, and you will never have to work a day in your life.', 'Beauty is in the eye of the beholder.', 'To be, or not to be: that is the question. ']
let author = ['Henry Ford', 'Mahatma Gandhi', 'Confucius', 'Oscar Wilde', 'Shakespeare']
let newQuote = 0;

renew.addEventListener('click', function() {
  if (newQuote === 4) {
    newQuote = 0;
  } else {
    newQuote++;
  };
  quoteTitle.textContent = quote[newQuote];
  authorTitle.textContent = author[newQuote];
});


/*..........................................................погода.................................................*/

let weatherIcon = document.querySelector('.weather_icon');
let temperature = document.querySelector('.weather_temperature');
let weatherDescription = document.querySelector('.weather_description');
let weatherCity = document.querySelector('.weather_city');
let url = `https://api.openweathermap.org/data/2.5/weather?q=${localStorage.getItem('weather_city') || 'Minsk'}&lang=en&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;

async function getWeather() {  
  let res = await fetch(url);
  let data = await res.json(); 
  
  weatherIcon.className = 'weather_icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
}
getWeather()

weatherCity.addEventListener('change', function() {
  url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherCity.value}&lang=en&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
  getWeather()
});

let setLocalStorage = () => {
  localStorage.setItem('weather_city', weatherCity.value);
};

let getLocalStorage = () => {
  if (localStorage.getItem('weather_city')) {
    weatherCity.value = localStorage.getItem('weather_city');
  }
};
window.addEventListener('load', getLocalStorage);
window.addEventListener('beforeunload', setLocalStorage)

/*..........................................................слайдер.................................................*/

let slidePrev = document.querySelector('.main_slide_left');
let slideNext = document.querySelector('.main_slide_right');
let body = document.querySelector('body');
let timesOfHour; 
let randomImages = getRandomNum(1, 20);


function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function zero(a) {
  if (a < 10) {
  return '0' + a.toString();
  } else {
  return a.toString();
  }
};

function timesOfDay() {
  let dateDate = new Date();
  let hour = dateDate.getHours();

  if (hour < 6) {
    timesOfHour = 'night';
  } else if (hour < 12) {
    timesOfHour = 'morning';
  } else if (hour < 18) {
    timesOfHour = 'afternoon';
  } else {
    timesOfHour = 'evening';
  }
};
timesOfDay();

function styleImg() {
  body.style.backgroundImage = "url(https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/" + timesOfHour + "/" + zero(randomImages) + ".jpg)";
}
styleImg();

slidePrev.addEventListener('click', function() {
  if (randomImages === 1) {
    randomImages = 20;
    styleImg();
  } else {
    randomImages--;
    styleImg();
  };
});

slideNext.addEventListener('click', function() {
  if (randomImages === 20) {
    randomImages = 1;
    styleImg();
  } else {
    randomImages++;
    styleImg();
  };
});

/*..........................................................настройки.................................................*/