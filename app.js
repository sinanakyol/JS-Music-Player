const container = document.querySelector(".container");
const image = document.querySelector("#music-image ");
const title = document.querySelector("#title");
const singer = document.querySelector("#singer");
const play = document.querySelector("#play");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const ul = document.querySelector("ul");

const player = new MusicPlayer(musicList);

// Sayfa yüklendiğinde;
window.addEventListener("load", () => {
  let music = player.getMusic();
  displayMusic(music);
  displayMusicList(player.musicList);
  isPlayingNow();
});

const displayMusic = (music) => {
  title.innerHTML = music.getName();
  image.src = "img/" + music.img;
  audio.src = "mp3/" + music.file;
};

play.addEventListener("click", () => {
  const isMusicPlay = container.classList.contains("playing"); // boolean / true-false
  isMusicPlay ? pauseMusic() : playMusic();
});

// Previous Music
prev.addEventListener("click", () => {
  prevMusic();
});

const prevMusic = () => {
  player.prev(); //index değiştir.
  let music = player.getMusic(); //indexi değiştirilen müzik bilgisini getir.
  displayMusic(music); // müzik bilgisini sayfa üzerinde göster.
  playMusic(); // müzik çal.
  isPlayingNow();
};

// Next Music
next.addEventListener("click", () => {
  nextMusic();
});

const nextMusic = () => {
  player.next();
  let music = player.getMusic();
  displayMusic(music);
  playMusic();
  isPlayingNow();
};

const pauseMusic = () => {
  container.classList.remove("playing");
  play.querySelector("i").classList = "fa-solid fa-play";
  audio.pause();
};

const playMusic = () => {
  container.classList.add("playing");
  play.querySelector("i").classList = "fa-solid fa-pause";
  audio.play();
};

const calculateTime = (toplamSaniye) => {
  const dakika = Math.floor(toplamSaniye / 60);
  const saniye = Math.floor(toplamSaniye % 60);
  const guncellenenSaniye = saniye < 10 ? `0${saniye}` : `${saniye}`;
  const sonuc = `${dakika}:${guncellenenSaniye}`;
  return sonuc;
};

// Müzik bilgisini yükler.  //duration ve currentTime aynı zamanda <audio property> sidir.
audio.addEventListener("loadedmetadata", () => {
  duration.textContent = calculateTime(audio.duration);
  progressBar.max = Math.floor(audio.duration);
});

// Saniye değiştikçe çalışır.
audio.addEventListener("timeupdate", () => {
  progressBar.value = Math.floor(audio.currentTime);
  currentTime.textContent = calculateTime(progressBar.value);
});

// input => input elemanın eventi.
progressBar.addEventListener("input", () => {
  currentTime.textContent = calculateTime(progressBar.value);
  audio.currentTime = progressBar.value;
});

let sesDurumu = "sesli";

volumeBar.addEventListener("input", (e) => {
  const value = e.target.value;
  audio.volume = value / 100; // volume property'si 0-1 arasında olduğu için; 0-100 arası olan volumeBar değerini 100'e böldük.
  if (audio.volume == 0) {
    audio.muted = true;
    sesDurumu = "sessiz";
    volume.classList = "fa-solid fa-volume-xmark";
  } else {
    audio.muted = false;
    sesDurumu = "sesli";
    volume.classList = "fa-solid fa-volume-high";
  }
});

volume.addEventListener("click", () => {
  if (sesDurumu === "sesli") {
    audio.muted = true;
    sesDurumu = "sessiz";
    volume.classList = "fa-solid fa-volume-xmark";
    volumeBar.value = 0;
  } else {
    audio.muted = false;
    sesDurumu = "sesli";
    volume.classList = "fa-solid fa-volume-high";
    volumeBar.value = 100;
  }
});

// Listenin gösterilmesi - Eleman eklenmesi. /  li-index => Liste içerisindeki elemana ulaşmak için kullandık.
const displayMusicList = (list) => {
  for (let i = 0; i < list.length; i++) {
    let liTag = `
    <li li-index="${i}" onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
      <span>${list[i].getName()}</span>
      <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
      <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
    </li>
    `;

    ul.insertAdjacentHTML("beforeend", liTag);

    let liAudioDuration = document.querySelector(`#music-${i}`);
    let liAudioTag = document.querySelector(`.music-${i}`);

    liAudioTag.addEventListener("loadeddata", () => {
      liAudioDuration.innerHTML = calculateTime(liAudioTag.duration);
    });
  }
};

// Liste üzerinden seçilen müziğin oynatmak.
const selectedMusic = (li) => {
  player.index = li.getAttribute("li-index");
  displayMusic(player.getMusic());
  playMusic();
  isPlayingNow();
};

// Oynatılan liste elemanının rengini değiştirmek.
const isPlayingNow = () => {
  for (let li of ul.querySelectorAll("li")) {
    if (li.classList.contains("playing")) {
      li.classList.remove("playing");
    }

    if (li.getAttribute("li-index") == player.index) {
      li.classList.add("playing");
    }
  }
};

audio.addEventListener("ended", () => {
  nextMusic();
});
