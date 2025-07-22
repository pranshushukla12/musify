console.log("Welcome to Musify");
//initiliaze the variables
let songIndex = 0;
let audioElement = new Audio('song/Tum Prem Ho (PenduJatt.Com.Se).mp3');
let masterPlay = document.getElementById('masterPlay');


let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let mastersongname = document.getElementById('mastersongname');

let songitem = Array.from(document.getElementsByClassName('songitem'));


let song = [
    {songname:"Tum Prem Ho", filePath:"song/Tum Prem Ho (PenduJatt.Com.Se).mp3", coverPath:"cover/Raadhe.jpg"},
    {songname:"Humnava", filePath:"song/Humnava Hamari Adhuri Kahani (pagalall.com).mp3", coverPath:"cover/Humnava.webp"},
    {songname:"Shayad Fir Se", filePath:"song/Shayad Fir Se (PenduJatt.Com.Se).mp3", coverPath:"cover/shayad-fir-se-rahul-vaidya.webp"},
    {songname:"Jaage-Jaage", filePath:"song/Jaage Jaage (PenduJatt.Com.Se).mp3", coverPath:"cover/jaage jaage.webp"},
    {songname:"MereLiye", filePath:"song/Mere Liye - (Raag.Fm).mp3", coverPath:"cover/mere liye.jpg"},
    {songname:"Bol Na  Halke", filePath:"song/Bol Na Halke Halke - (Raag.Fm).mp3", coverPath:"cover/bol na halke.jpg"},
    {songname:"Bulleya", filePath:"song/Bulleya - (Raag.Fm).mp3", coverPath:"cover/bulleya.jpg"},
    {songname:"O Aasmaan Wale", filePath:"song/O Aasman Wale (PenduJatt.Com.Se).mp3", coverPath:"cover/o-aasman-wale-jubin-nautiyal.webp"},
   

]
songitem.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = song[i].coverPath;
    element.getElementsByClassName("songname")[0].innerText = song[i].songname;
})
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
   }
})
audioElement.addEventListener('timeupdate',()=>{
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myprogressbar.value = progress;
})
myprogressbar.addEventListener('change',()=>{
    audioElement.currentTime = myprogressbar.value * audioElement.duration/100;
})
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.classList.remove('fa-circle-pause');
    element.classList.add('fa-circle-play');
   })
}
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=7){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = song[songIndex].filePath;
        mastersongname.innerText = song[songIndex].songname;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;    
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
})
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = song[songIndex].filePath;
        mastersongname.innerText = song[songIndex].songname;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
})
audioElement.addEventListener('ended', () => {
    if(songIndex >= song.length - 1){
        songIndex = 0; // loop back to the first song
    } else {
        songIndex++;
    }
    audioElement.src = song[songIndex].filePath;
    mastersongname.innerText = song[songIndex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    makeAllPlays(); 
    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-circle-pause');
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});
const coverImages = document.querySelectorAll('.cover-img');

// Remove rotating class from all covers
const stopAllRotations = () => {
  coverImages.forEach(img => img.classList.remove('rotating'));
};
Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
  element.addEventListener('click', (e) => {
    let clickedIndex = parseInt(e.target.id);
    if (songIndex === clickedIndex && !audioElement.paused) {
      audioElement.pause();
      e.target.classList.remove('fa-circle-pause');
      e.target.classList.add('fa-circle-play');
      masterPlay.classList.remove('fa-circle-pause');
      masterPlay.classList.add('fa-circle-play');
      gif.style.opacity = 0;
      stopAllRotations(); // stop rotating
    } else {
      makeAllPlays();
      stopAllRotations();
      songIndex = clickedIndex;
      audioElement.src = song[songIndex].filePath;
      audioElement.currentTime = 0;
      audioElement.play();
      mastersongname.innerText = song[songIndex].songname;
      e.target.classList.remove('fa-circle-play');
      e.target.classList.add('fa-circle-pause');
      masterPlay.classList.remove('fa-circle-play');
      masterPlay.classList.add('fa-circle-pause');
      gif.style.opacity = 1;
      document.querySelectorAll('.cover-img')[songIndex].classList.add('rotating');
    }
  });
});
audioElement.onplay = () => {
  stopAllRotations();
  document.querySelectorAll('.cover-img')[songIndex].classList.add('rotating');
};

audioElement.onpause = () => {
  stopAllRotations();
};
const volUpBtn = document.getElementById('vol-up');
const volDownBtn = document.getElementById('vol-down');
const volMuteBtn = document.getElementById('vol-mute');
let lastVolume = 1;
const volumeBar = document.getElementById('volume-bar');
const volumePercent = document.getElementById('volume-percent');
audioElement.volume = 1;
volumeBar.value = audioElement.volume * 100;
volumePercent.innerText = `${volumeBar.value}%`;
volumeBar.addEventListener('input', () => {
  const volumeValue = volumeBar.value / 100;
  audioElement.volume = volumeValue;
  volumePercent.innerText = `${volumeBar.value}%`;
  if (volumeValue === 0) {
    volMuteBtn.innerHTML = '<i class="fas fa-volume-xmark"></i>';
  } else {
    volMuteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
});
volUpBtn.addEventListener('click', () => {
  audioElement.volume = Math.min(audioElement.volume + 0.1, 1);
  volumeBar.value = Math.round(audioElement.volume * 100);
  volumePercent.innerText = `${volumeBar.value}%`;
});
volDownBtn.addEventListener('click', () => {
  audioElement.volume = Math.max(audioElement.volume - 0.1, 0);
  volumeBar.value = Math.round(audioElement.volume * 100);
  volumePercent.innerText = `${volumeBar.value}%`;
});
volMuteBtn.addEventListener('click', () => {
  if (audioElement.volume > 0) {
    lastVolume = audioElement.volume;
    audioElement.volume = 0;
    volumeBar.value = 0;
    volumePercent.innerText = `0%`;
    volMuteBtn.innerHTML = '<i class="fas fa-volume-xmark"></i>';
  } else {
    audioElement.volume = lastVolume;
    volumeBar.value = Math.round(lastVolume * 100);
    volumePercent.innerText = `${volumeBar.value}%`;
    volMuteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
});


