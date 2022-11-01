class Music {
  constructor(title, singer, img, file) {
    this.title = title;
    this.singer = singer;
    this.img = img;
    this.file = file;
  }

  getName() {
    return this.title + " - " + this.singer;
  }
}

const musicList = [
  new Music(
    "Ara",
    "Zeynep Bastik",
    "1.jpg",
    "mp3indirdur-Zeynep-Bastik-Ara.mp3"
  ),
  new Music(
    "Küçük Bir Yol",
    "Hadise",
    "2.jpg",
    "mp3indirdur-Hadise-Kucuk-Bir-Yol.mp3"
  ),
  new Music(
    "Aşk Dediğin",
    "Hadise",
    "3.jpg",
    "mp3indirdur-Hadise-Ask-Dedigin.mp3"
  ),
  new Music(
    "Bu da Geçer mi Sevgilim",
    "Yalın",
    "4.jpg",
    "mp3indirdur-Yalin-Bu-Da-Gecer-Mi-Sevgilim.mp3"
  ),
  new Music("Yaz Gülü", "Yalın", "5.jpg", "mp3indirdur-Yalin-Yaz-Gulu.mp3"),
  new Music(
    "Belki",
    "Dedublüman",
    "6.jpg",
    "mp3indirdur-Dedubluman-Belki-(Akustik)-.mp3"
  ),
  new Music(
    "Karakol",
    "Mabel Matiz",
    "7.jpg",
    "mp3indirdur-Mabel-Matiz-Karakol.mp3"
  ),
  new Music(
    "Gelsin Hayat Bildiği Gibi",
    "Ceza",
    "8.jpg",
    "mp3indirdur-Ceza-Gelsin-Hayat-Bildigi-Gibi-feat-Sezen-Aksu.mp3"
  ),
];
