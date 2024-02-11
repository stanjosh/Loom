
const sounds = {
    drone: '../sound/drone.ogg',
    hum: '../sound/hum.ogg',
    footsteps: '../sound/footsteps.ogg',
    loudhum: '../sound/loudhum.ogg',
    ticks: '../sound/ticks.ogg',
    hit: '../sound/cpufanhit.ogg',
}
const soundsArray = Object.values(sounds)

const playKeySound = () => {
    const key1 = new Audio("/sound/key1.mp3")
    const key2 = new Audio("/sound/key2.mp3")
    const key3 = new Audio("/sound/key3.mp3")
    let keySounds = [key1, key2, key3]
    keySounds[Math.floor(Math.random() * keySounds.length)].play()
}

const typeItOut = async () => {
    document.getElementById('choices').style.display = 'none'
    const passage = document.getElementById('passage')  
    if (passage === null) return
    let text = passage.getAttribute('data-type-text')
    if (text === null) return
    text = text.replace(/\s+/g,' ').trim();

        
        let i = 0;
        let timer = setInterval( async () => {
            if (i < text.length) {
                setTimeout(() => {
                    text.charAt(i) === " " ? null : playKeySound()
                    passage?.append(text.charAt(i))
                    passage.scrollTop = passage.scrollHeight
                    i++
                }, Math.floor(Math.random() * 80));
            } else {
                clearInterval(timer)
                passage.innerHTML = text
                document.getElementById('choices').style.display = 'flex'
            }
        }, 110);
        document.onclick = async () => {
            i = text.length
            passage.innerHTML = text
            document.getElementById('choices').style.display = 'flex'
        };    
}




const playJumpScare = async (sound) => {
    return new Howl({
        src: [sounds[sound]],
        loop: false,
        volume: 0.7,
        autoplay: true
    })
}


const ambience = (track) => {
    return new Howl({
    src: [track],
    loop: true,
    volume: 0.0,
    autoplay: false
    })
}

let audio, ambienceTrack;
ambienceTrack = ambience(sounds[$('#ambient_track').val()])
audio = ambienceTrack.play()



