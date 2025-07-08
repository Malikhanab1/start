let currentSong = new Audio();
let songs = [];
let currFolder = "song";

//from internet, udhr se uthaya this func
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

async function getSongs(folder) {
    currFolder = folder;
    try {
        let a = await fetch(`http://127.0.0.1:5500/PROJECTS/spotify/${folder}/`);
        let response = await a.text();
        let div = document.createElement("div");
        div.innerHTML = response;
        let as = div.getElementsByTagName("a");
        songs = [];

        for (let index = 0; index < as.length; index++) {
            const element = as[index];
            if (element.href.endsWith(".mp3")) {
                
                let songPath = element.href.split(`/${folder}/`)[1];
                songs.push(decodeURIComponent(songPath));
            }
        }

       
        let songUL = document.querySelector(".songList ul");
        songUL.innerHTML = "";
        for (const song of songs) {
            songUL.innerHTML += `<li>
                <img class="invert" width="34" src="img/music.svg" alt="">
                <div class="info">
                    <div>${song.replace(".mp3", "")}</div>
                    <div>HANAB</div>
                </div>
                <div class="playnow">
                    <span>Play Now</span>
                    <img class="invert" src="img/play.svg" alt="">
                </div>
            </li>`;
        }

        // Click to play song
        Array.from(songUL.querySelectorAll("li")).forEach((li, index) => {
            li.addEventListener("click", () => {
                playMusic(songs[index]);
            });
        });

        return songs;
    } catch (error) {
        console.error("Error fetching songs:", error);
        return [];
    }
}

function playMusic(track, pause = false) {
    if (!track) return;
    
    currentSong.src = `/PROJECTS/spotify/${currFolder}/${encodeURIComponent(track)}`;
    document.querySelector(".songinfo").innerHTML = track.replace(".mp3", "");
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
    
    if (!pause) {
        currentSong.play();
        document.getElementById("play").src = "img/pause.svg";
    }
}

async function main() {
    await getSongs("song");
    
    if (songs.length > 0) {
        playMusic(songs[0], true);
    }

    // Player controls
    document.getElementById("play").addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "img/pause.svg";
        } else {
            currentSong.pause();
            play.src = "img/play.svg";
        }
    });

    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = 
            `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;
        document.querySelector(".circle").style.left = 
            (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent) / 100;
    });

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });

    document.getElementById("previous").addEventListener("click", () => {
        let currentTrack = currentSong.src.split('/').pop();
        let index = songs.indexOf(decodeURIComponent(currentTrack));
        if (index > 0) playMusic(songs[index - 1]);
    });

    document.getElementById("next").addEventListener("click", () => {

        let currentTrack = currentSong.src.split('/').pop();

        let index = songs.indexOf(decodeURIComponent(currentTrack));
        if (index < songs.length - 1) playMusic(songs[index + 1]);
    });

    document.querySelector(".range input").addEventListener("input", e => {
        currentSong.volume = e.target.value / 100;
        if (currentSong.volume > 0) {
            document.querySelector(".volume>img").src = "img/volume.svg";
        } else {
            document.querySelector(".volume>img").src = "img/mute.svg";
        }
    });
}

main();