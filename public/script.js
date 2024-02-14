


const playJumpScare = async (sound) => {
    return new Howl({
        src: [sounds[sound]],
        loop: false,
        volume: 0.7,
        autoplay: true
    })
}

const playKeySound = () => {
    const key1 = new Audio("/sound/key1.mp3")
    const key2 = new Audio("/sound/key2.mp3")
    const key3 = new Audio("/sound/key3.mp3")
    let keySounds = [key1, key2, key3]
    keySounds[Math.floor(Math.random() * keySounds.length)].play()
}



const ambience = {
    playingTrack: null,
    drone: '../sound/ambient/drone.ogg',
    hum: '../sound/ambient/hum.ogg',
    footsteps: '../sound/ambient/footsteps.ogg',
    loudhum: '../sound/ambient/loudhum.ogg',
    ticks: '../sound/ambient/ticks.ogg',
    cpufanhit: '../sound/ambient/cpufanhit.ogg',
    play: async (track, loop) => {
        if (track === ambience.playingTrack?.src) return
        if (ambience.playingTrack) ambience.playingTrack.fade(0.3, 0, 2300)
        
        ambience.playingTrack = new Howl({
            src: [ambience[track]],
            loop: loop,
            volume: ambience.playingTrack ? 0 : 0.3,
            autoplay: true,
            onload: () => {ambience.playingTrack.fade(0, 0.3, 2300)}
        });
    }
}













const initPassage = async () => {
    document.getElementById('choices').style.display = 'none'
    const passage = document.getElementById('passage')  
    const audioTrack = passage.getAttribute('data-audio-track')
    const loop = (passage.getAttribute('data-audio-loop') === 'true')
    console.log(audioTrack, loop)
    ambience.play(audioTrack, loop)
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








