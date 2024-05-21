const songsList =
  [
    {
      name: "MADONNA & RIHANNA",
      artist: "Rich Amiri",
      src: "1.mp3",
      cover: "1.jpg"
    },
    {
      name: "Type Shit",
      artist: "Future, Travis Scott, Playboi Carti",
      src: "2.mp3",
      cover: "2.png"
    },
    {
      name: "NOSTYLIST",
      artist: "Destroy Lonely",
      src: "3.mp3",
      cover: "3.webp"
    },
    {
      name: "Figure It Out",
      artist: "Ian",
      src: "4.mp3",
      cover: "4.webp"
    },
    {
      name: "Brad Pitt",
      artist: "Playboi Carti",
      src: "5.mp3",
      cover: "5.jpg"
    }
  ];

const artistName = document.querySelector('.artist-name');
const musicName = document.querySelector('.song-name');
const fillBar = document.querySelector('.fill-bar');
const time = document.querySelector('.time');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const shuffleBtn = document.getElementById('play');
const prog = document.querySelector('.progress-bar');

let song = new Audio();
let currentSong = 0;
let playing = false;

document.addEventListener('DOMContentLoaded', () => {
  /*loadSong(currentSong);*/
  loadSong(random = Math.floor(Math.random() * songsList.length));
  song.addEventListener('timeupdate', updateProgress);
  song.addEventListener('ended', nextSong);
  prevBtn.addEventListener('click', prevSong);
  nextBtn.addEventListener('click', nextSong);
  playBtn.addEventListener('click', togglePlayPause);
  prog.addEventListener('click', seek);
});

function loadSong(index) {
  const { name, artist, src, cover: thumb } = songsList[index];
  artistName.innerText = artist;
  musicName.innerText = name;
  song.src = src;
  cover.style.backgroundImage = `url(${thumb})`;
}

function updateProgress() {
  if (song.duration) {
    const pos = (song.currentTime / song.duration) * 100;
    fillBar.style.width = `${pos}%`;
    const duration = formatTime(song.duration);
    const currentTime = formatTime(song.currentTime);
    time.innerText = `${currentTime} - ${duration}`;
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function togglePlayPause() {
  if (playing) {
    song.pause();
  } else {
    song.play();
  }
  playing = !playing;
  playBtn.classList.toggle('fa-pause', playing);
  playBtn.classList.toggle('fa-play', !playing);
  cover.classList.toggle('active', playing);
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (4 - 1)) + 1;
}

function nextSong() {
  currentSong = (currentSong + randomNumber()) % songsList.length;
  playMusic();
}

function prevSong() {
  currentSong = (currentSong - 1 + songsList.length) % songsList.length;
  playMusic();
}

function playMusic() {
  loadSong(currentSong);
  song.play();
  playing = true;
  playBtn.classList.add('fa-pause');
  playBtn.classList.remove('fa-play');
  cover.classList.add('active');
}

function seek(e) {
  const pos = (e.offsetX / prog.clientWidth) * song.duration;
  song.currentTime = pos;
}

document.body.onkeyup = function (e) {
  if (e.keyCode == 32) {
    togglePlayPause();
  }
}

document.body.onkeyup = function (a) {
  if (a.keyCode == 39) {
    nextSong();
  }
}

document.body.onkeyup = function (o) {
  if (o.keyCode == 37) {
    prevSong();
  }
}