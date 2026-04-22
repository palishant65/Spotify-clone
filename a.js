console.log("Welcome to spotify");
//Initialize the Variables
let songIndex=0;
let audioElement=new Audio("songs/Sailor_song.mp3");
audioElement.preload = 'auto';
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById("gif");
let masterSongName = document.getElementById('masterSongName');
let songItems= Array.from(document.getElementsByClassName("songItem"));
let isManualChange=false;
let songs = [
  {songName: "Sailor song", filePath: "songs/Sailor_song.mp3", coverPath: "covers/1.jpg"},
  {songName: "Lucid Dreams", filePath: "songs/1 (1).mp3", coverPath: "covers/2.jpg"},
  {songName: "Robbery", filePath: "songs/1 (2).mp3", coverPath: "covers/3.jpg"},
  {songName: "Legends", filePath: "songs/1 (3).mp3", coverPath: "covers/4.jpg"},
  {songName: "Come & Go", filePath: "songs/1 (4).mp3", coverPath: "covers/5.jpg"},
  {songName: "sad", filePath: "songs/1(5).mp3", coverPath: "covers/6.jpg"},
  {songName: "Bad Boy", filePath: "songs/1(6).mp3", coverPath: "covers/7.jpg"},
  {songName: "Moonlight", filePath: "songs/1(7).mp3", coverPath: "covers/8.jpg"},
  {songName: "Changes", filePath: "songs/1(8).mp3", coverPath: "covers/9.jpg"},
  {songName: "Jocelyn Flores", filePath: "songs/1(9).mp3", coverPath: "covers/10.jpg"}
];
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});
audioElement.addEventListener('error', function(e) {
    console.error('Audio load error for song:', songs[songIndex].songName, e);
    alert('Failed to load song: ' + songs[songIndex].songName + '. Please check the file path and format.');
});
audioElement.addEventListener('loadeddata', function() {
    console.log('Audio data loaded for:', songs[songIndex].songName);
});
audioElement.addEventListener('canplaythrough', function() {
    console.log('Song can play through:', songs[songIndex].songName);
});
//audioElement.play
//handle play/pause click
masterPlay.addEventListener("click",()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play().then(() => {
            console.log('Playing');
        }).catch(error => {
            console.error('Playback failed:', error);
            alert('Playback failed for: ' + songs[songIndex].songName);
        });
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        makeAllPlays();
        document.getElementById(songIndex).classList.remove("fa-play-circle")
        document.getElementById(songIndex).classList.add("fa-pause-circle")
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        document.getElementById(songIndex).classList.remove("fa-pause-circle")
        document.getElementById(songIndex).classList.add("fa-play-circle")
        gif.style.opacity=0;
        

    }
})
//listen to Events
audioElement.addEventListener("timeupdate",()=>{
    //update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
})
myProgressBar.addEventListener("input",()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
});
const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
     element.classList.remove("fa-pause-circle");
     element.classList.add("fa-play-circle");

})
}
songItems.forEach((element, i) => {
    element.addEventListener("click", (e) => {
        if (songIndex == i && !audioElement.paused) {
            // pause
            audioElement.pause();
            masterPlay.classList.remove("fa-pause-circle");
            masterPlay.classList.add("fa-play-circle");
            element.querySelector('.songItemPlay').classList.remove("fa-pause-circle");
            element.querySelector('.songItemPlay').classList.add("fa-play-circle");
            gif.style.opacity = 0;
        } else {
            makeAllPlays();
            songIndex = i;
            audioElement.src = songs[songIndex].filePath;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            console.log('Loading song:', songs[i].filePath);
            audioElement.play().then(() => {
                isManualChange = false;
                console.log('Song playing:', songs[songIndex].songName);
            }).catch(error => {
                console.error('Playback failed for:', songs[songIndex].songName, error);
                alert('Failed to play song: ' + songs[songIndex].songName + '. Check file or format.');
            });
            gif.style.opacity = 1;
            masterPlay.classList.remove("fa-play-circle");
            masterPlay.classList.add("fa-pause-circle");
            element.querySelector('.songItemPlay').classList.remove("fa-play-circle");
            element.querySelector('.songItemPlay').classList.add("fa-pause-circle");
        }
    });
});
audioElement.addEventListener("ended", () => {

    if(isManualChange){
        isManualChange = false;
        return;
    }

    songIndex = (songIndex + 1) % songs.length;

    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play().then(()=>{
        isManualChange=false;
    }).catch(error => {
        console.error('Auto-play failed for:', songs[songIndex].songName, error);
    });

    makeAllPlays();

    let currentIcon = document.getElementById(songIndex);
    if(currentIcon){
        currentIcon.classList.remove("fa-play-circle");
        currentIcon.classList.add("fa-pause-circle");
    }

    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
});
previous.addEventListener("click", () => {

    isManualChange = true;
        songIndex--;

    if(songIndex < 0){
        songIndex = songs.length - 1;
    }

    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play().catch(error => {
        console.error('Previous play failed:', error);
    });

    makeAllPlays();

    let currentIcon = document.getElementById(songIndex);
    if(currentIcon){
        currentIcon.classList.remove("fa-play-circle");
        currentIcon.classList.add("fa-pause-circle");
    }

    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
});
next.addEventListener("click", () => {

    isManualChange = true;

    // index update
    songIndex = (songIndex + 1) % songs.length;

        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;

        audioElement.currentTime = 0;
        audioElement.play().then(()=>{
        isManualChange=false;
    }).catch(error => {
        console.error('Next play failed:', error);
    });

    makeAllPlays();

    // current song icon update
    let currentIcon = document.getElementById(songIndex);
    if(currentIcon){
        currentIcon.classList.remove("fa-play-circle");
        currentIcon.classList.add("fa-pause-circle");
    }

    // master play sync
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");

});
