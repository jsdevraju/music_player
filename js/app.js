// all selector
const audio = document.querySelector(".audio");
const play_pause = document.querySelector(".play_pause");
const currentTime = document.querySelector(".player span");
const endTime = document.querySelector(".player span:last-child");
const volume = document.querySelector(".volume");
const progress = document.querySelector(".progress");
const progressRange = document.querySelector(".player input");
const song_list = document.querySelector(".main_songs");
const audia_img = document.querySelector(".audia_img");
const right_side = document.querySelector(".right_side span");

let is_playing = false;

// play Pause
const playPause = () => {
  if (is_playing) {
    // pause
    audio.pause();
    is_playing = false;
    play_pause.innerHTML = '<i class="fa-solid fa-play"></i>';
  } else {
    // play
    audio.play();
    is_playing = true;
    play_pause.innerHTML = '<i class="fa-solid fa-pause"></i>';
  }
};

play_pause.addEventListener("click", playPause);

// Format Current Time
const timeFormat = (time) => {
  return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
};

// Set Start and end time
audio.addEventListener("loadedmetadata", () => {
  // COnvert Sec to mins
  endTime.innerHTML = timeFormat(audio.duration);
  currentTime.innerHTML = timeFormat(audio.currentTime);
  progressRange.setAttribute("max", audio.duration);
});

// UpdateProgress
const updateProgress = () => {
  progress.style.left = `
    ${(audio.currentTime / audio.duration) * 100}%
    `;
};

// Update Current Time
audio.addEventListener("timeupdate", () => {
  currentTime.innerHTML = timeFormat(audio.currentTime);
  updateProgress();
});

// Update Volume
volume.addEventListener("change", (e) => {
  audio.volume = e.target.value / 100;
});

// Seek Audio
progressRange.addEventListener("change", (e) => {
  audio.currentTime = e.target.value;
});

(() => {
  let html = "";
  right_side.innerHTML = `${data.length}`;
  data.forEach((song) => {
    html += `
        <div class='songs' data-song=${song.audio} data-img=${song.img}>
        <div class="song_name">
        <span>${song.album}</span>
      </div>
      <div class="song_artists">
        <span>${song.artists}</span>
      </div>
      <div class="song_album">
        <span>${song.album}</span>
      </div>
      <div class="song_duration">
        <span>${song.duration}</span>
      </div>
        </div>
        `;
  });
  song_list.innerHTML = html;
})();

const allSongs = document.querySelectorAll(".songs");

allSongs.forEach((song) => {
  song.addEventListener("click", (e) => {
    allSongs.forEach((song) => song.classList.remove("selected_song"));
    song.classList.add("selected_song");
    changeSong(song.getAttribute("data-song"));
    changeImg(song.getAttribute("data-img"));
  });
});

// Change Audi0
const changeSong = (src) => {
  audio.src = src;
  progressRange.setAttribute("value", 0);
  is_playing = false;
  playPause();
};

// Change Images
const changeImg = (src) => {
  audia_img.src = src;
  progressRange.setAttribute("value", 0);
  is_playing = false;
  playPause();
};
