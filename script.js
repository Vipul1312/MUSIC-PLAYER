let songName = document.querySelector("#song-name");
let songSinger = document.querySelector("#song-singer");
let songImage = document.querySelector(".song-image");
let playpauseImg = document.querySelector("#play-pause");
let volumeRange = document.querySelector("#volume-range");
let songRange = document.querySelector("#song-duration");
let volSvg = document.querySelector("#vol-svg");
let musicGif = document.querySelector("#music-gif");
let playlistImg= document.querySelector("#playlist-img");
let playlist= document.querySelector(".playlist");
let playlistSong= document.querySelectorAll(".playlist-song");
let index=0;
let playingSong=false;
let track=document.createElement("audio");
let songs=[
    {
        name:"Satranga",
        path:"satranga.mp3",
        image:"satranga.png",
        singer:"singer -- Arijit Singh"
    },
    {
        name:"Husn",
        path:"husn.mp3",
        image:"husn.png",
        singer:"singer -- Anuv Jain"
    },
    {
        name:"Meri_Maa",
        path:"Meri_Maa.mp3",
        image:"Meri_Maa.png",
        singer:"singer -- Pritam,KK"
    },
    {
        name:"Zaroor",
        path:"zaroor.mp3",
        image:"zaroor.png",
        singer:"singer -- Aparshakti Khurana"
    }
]
function loadTrack(index){
    track.src=songs[index].path;
    songName.innerHTML=songs[index].name;
    songSinger.innerHTML=songs[index].singer;
    songImage.style=`background-image: url("${songs[index].image}");`
    volume()
    duration()
    setInterval(()=>{
        songRange.max=track.duration
        songRange.value=track.currentTime
    },1000)
    track.loop=true
    track.load()
}
loadTrack(index);

function playpause(){
    if(playingSong==false){
        playSong()
    } else {
        pauseSong()
    }
}
    function playSong() {
        track.play();
        playingSong = true;
        playpauseImg.src="pause.svg"
        musicGif.style.display="block"
    }
    function pauseSong(){
        track.pause();
        playingSong = false;
        playpauseImg.src="play.svg"
        musicGif.style.display="none"
    }

    function nextSong(){
        if(index<songs.length-1){
         index++;
         loadTrack(index)
         playSong()
    } else{
        index=0;
        loadTrack(index)
        playSong()
    }
}
    function previousSong(){
        if(index>0){
         index--;
         loadTrack(index)
         playSong()
    } else{
        index=songs.length-1;
        loadTrack(index)
        playSong()
    }
 }
function volume(){
  track.volume=volumeRange.value/100;
  if(volumeRange.value==0){
   volSvg.src="mute.svg"
  } else {
    volSvg.src="volume.svg"
  }
}
function duration(){
    track.currentTime=songRange.value
}
playlistImg.addEventListener('click',()=>{
playlist.classList.toggle("playlist-active")
if(playlist.classList.contains("playlist-active")){
     playlistImg.src="cross.svg"
} else {
    playlistImg.src="playlist.svg"
}
})
playlistSong.forEach((song,index)=>{
    song.addEventListener('click',()=>{
        loadTrack(index);
        playSong()
        playlist.classList.remove("playlist-active")
        playlistImg.src="playlist.svg"
    })
})
