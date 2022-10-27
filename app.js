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

const player = new MusicPlayer(musicList);

// Sayfa yüklendiğinde;
window.addEventListener("load", () => {
  let music = player.getMusic();
  displayMusic(music);
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
};

const pauseMusic = () => {
  container.classList.remove("playing");
  play.classList = "fa-solid fa-play";
  audio.pause();
};

const playMusic = () => {
  container.classList.add("playing");
  play.classList = "fa-solid fa-pause";
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

volume.addEventListener("click", () => {
  console.log("aa");
});
