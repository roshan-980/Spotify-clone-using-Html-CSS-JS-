console.log("let write js");
let songs;
let currentsong = new Audio();
let currfolder;


function secondtomin(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}



async function getsongs(folder) {
    currfolder=folder;
    let a = await fetch(`${folder}/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
     songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1]);
        }

    }

    let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    songul.innerHTML="";
    for (const song of songs) {
        songul.innerHTML = songul.innerHTML + `  <li>
        <img  class = "invert" src="img/music.svg" alt="">
        <div class="info">
            <div>${song.replaceAll("%20", " ")}</div>
            <div>Roshan</div>
        </div>
        <div class="playnow">
            <span>Play Now</span>
        <img class= "invert" src="img/play.svg" alt="">
    </div> </li>`;
    }

      // attach an event listener to the all song
      Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            // console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
        })
    });
    return songs;

}


const playmusic = (track, pause = false) => {
    // let audio=new Audio("/songs/"+ track)
    currentsong.src = `/${currfolder}/` + track
    if (!pause) {
        currentsong.play();
        play.src = "img/pause.svg"

    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00/00:00"

}
    async function displayalbums(){
        let a = await fetch(`/songs/`);
        let response = await a.text();
        let div = document.createElement("div");
        div.innerHTML = response;
        let anchors=div.getElementsByTagName("a")
        let cardcontainer=document.querySelector(".cardcontainer");
       let array= Array.from(anchors)
       for (let index = 0; index < array.length; index++) {
            const e = array[index];
            if(e.href.includes("/songs")&& !e.href.includes(".htaccess")){
            let folder=e.href.split("/").slice(-2)[0];
            let a = await fetch(`/songs/${folder}/info.json`);
            let response = await a.json(); 
            cardcontainer.innerHTML=cardcontainer.innerHTML+`     <div data-folder="${folder}" class="card">
            <div  class="play">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="24" fill="#00C853" />
                    <polygon points="18,14 18,34 34,24" fill="black" />
                </svg>
            </div>

            <img src="/songs/${folder}/cover.jpg"
                alt="">
            <h2>${response.title}</h2>
            <p>${response.description}</p>
        </div>`
            }

        
       }
            // load the playslist when card clicked
   Array.from(document.getElementsByClassName("card")).forEach(e=>{
    e.addEventListener("click", async item=>{
        songs=await getsongs(  `songs/${item.currentTarget.dataset.folder}`);
       playmusic(songs[0])
    })
})
    }
async function main() {

    await getsongs("songs/ncs");
    playmusic(songs[0], true);

   
    // DISPLAY ALL THE ALLBUMS ON THE PAGE 
    displayalbums()

  

    // attach and event listener to play pause nad next 
    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play();
            play.src = "img/pause.svg"
        }
        else {
            currentsong.pause();
            play.src = "img/play.svg"
        }
    })
    // listen for time update 
    currentsong.addEventListener("timeupdate", () => {
        // console.log(currentsong.currentTime, currentsong.duration)
        document.querySelector(".songtime").innerHTML = `${secondtomin(currentsong.currentTime)}/${secondtomin(currentsong.duration)}`
        document.querySelector(".circle").style.left = ((currentsong.currentTime / currentsong.duration) * 100) + "%"
    })


    // eventlistener to seek bar
    document.querySelector(".seekbar").addEventListener("click", e => {
        // console.log(e.offsetX);
        let percent= (e.offsetX/e.target.getBoundingClientRect().width)*100;
       document.querySelector(".circle").style.left=percent+"%";
       currentsong.currentTime=((currentsong.duration)*percent)/100;
    
    
    })  

    // add event lsitenr to hamburger
    document.querySelector(".hamburger").addEventListener("click",()=>{
        document.querySelector(".left").style.left="0";
    })

    // add event lsitenr to close
    document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".left").style.left="-120%";
    })
   

    //add event listener to previous next 
    previous.addEventListener("click",()=>{
        // console.log("clicked me prev")
        let index=songs.indexOf(currentsong.src.split("/").slice(-1)[0])
       
        if((index-1)>=0){
             playmusic(songs[index-1]);
        }
    })

    next.addEventListener("click",()=>{
        // console.log("clicked me next")
        currentsong.pause();
        let index=songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        

        if((index+1)<=(songs.length-1)){

            playmusic(songs[index+1]);
        }
    })

    // add an event to volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
       
        currentsong.volume=parseInt(e.target.value)/100;
        if(currentsong.volume>0){
            document.querySelector(".volume> img").src=    document.querySelector(".volume> img").src.replace("volume.svg","mute.svg");
        }
    })

    // to mute track
    document.querySelector(".volume> img").addEventListener("click",(e)=>{
        if(e.target.src.includes("volume.svg")){
            e.target.src= e.target.src.replace("volume.svg","mute.svg");
            currentsong.volume=0;
            document.querySelector(".range").getElementsByTagName("input")[0].value=0
            
        }
        else{
            e.target.src=e.target.src.replace("mute.svg","volume.svg");
            currentsong.volume=.10;
            document.querySelector(".range").getElementsByTagName("input")[0].value=10;
        }

    })
}
main();