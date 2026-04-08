console.log("Welcome to spotify");
//Initialize the Variables
let songIndex=0;
let audioElement=new Audio("songs/Sailor_song.mp3");
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
  {songName: "sad", filePath: "songs/1 (5).mp3", coverPath: "covers/6.jpg"},
  {songName: "Bad Boy", filePath: "songs/1 (6).mp3", coverPath: "covers/7.jpg"},
  {songName: "Moonlight", filePath: "songs/1 (8).mp3", coverPath: "covers/8.jpg"},
  {songName: "Changes", filePath: "songs/1 (9).mp3", coverPath: "covers/9.jpg"},
  {songName: "Jocelyn Flores", filePath: "songs/1 (10).mp3", coverPath: "covers/10.jpg"}
];
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});
//audioElement.play
//handle play/pause click
masterPlay.addEventListener("click",()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
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
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener("click",(e)=>{
        console.log(e.target);
        let clickedIndex=parseInt(e.target.id);
        if(songIndex==clickedIndex && !audioElement.paused){
            audioElement.pause();
            e.target.classList.remove("fa-pause-circle");
            e.target.classList.add("fa-play-circle");
            masterPlay.classList.remove("fa-pause-circle");
            masterPlay.classList.add("fa-play-circle");
            gif.style.opacity=0;
        }
        else{
        makeAllPlays();
        songIndex=clickedIndex;
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        audioElement.src=songs[songIndex].filePath;
        masterSongName.innerText=songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play().then(()=>{
        isManualChange=false;
    });

        gif.style.opacity=1;
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
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
    audioElement.play();

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
