
const sounds = {
    drone: '../sound/ambient/drone.ogg',
    hum: '../sound/ambient/hum.ogg',
    footsteps: '../sound/ambient/footsteps.ogg',
    loudhum: '../sound/ambient/loudhum.ogg',
    ticks: '../sound/ambient/ticks.ogg',
    hit: '../sound/ambient/cpufanhit.ogg',
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
                    i++
                }, Math.floor(Math.random() * 80));
            } else {
                clearInterval(timer)
                passage.innerHTML = text
                
                
            }
        }, 110);
        document.onclick = async () => {
            i = text.length
            passage.innerHTML = text
        };    
}



const handleNewBranch = async () => {
    let newBranchData = 
        {
            branch_title : $('#next_branch_title').val() 
                ? $('#next_branch_title').val() 
                : $('#story_branch_title').val() 
                ? $('#story_branch_title').val() 
                : null,
            branch_content : $('#next_branch_content').val()
                ? $('#next_branch_content').val() 
                : $('#story_branch_content').val() 
                ? $('#story_branch_content').val() 
                : null,
            received_item : $('#received_item').val() 
                ? $('#received_item').val() 
                : $('#story_received_item').val() 
                ? $('#story_received_item').val() 
                : null,
            removed_item : $('#remove_item').is(':checked') ? $('#required_item').val() : null,
            end_here : $('#end_here').is(':checked')
        }

    

    let newChoiceData = $('#choice_text').val() ? 
        {
            choice_text : $('#choice_text').val() ? $('#choice_text').val() : null,
            required_item : $('#required_item').val() !== 'null' ? $('#required_item').val() : null,
            next_branch : $('#use_old_branch').val() !== 'null' ? $('#use_old_branch').val() : null
        }
        : null 

    let newStoryData = ($('#story_title').val() && $('#story_content').val())
        ? {
            story_title : $('#story_title').val(),
            story_content : $('#story_content').val()
        } 
        :null
    let checkBranchContent = [
        newBranchData.branch_title,
        newBranchData.branch_content,
    ]
    
    if ((checkBranchContent.every(Boolean) || newChoiceData.next_branch) && (newChoiceData || newStoryData)) {
    let branch = await fetch(`/branch/monitor/`, {
        method: "POST",
        body: JSON.stringify({
            newBranchData : newBranchData,
            newChoiceData : newChoiceData ? newChoiceData : null,
            newStoryData: newStoryData ? newStoryData : null
        }),
        headers: {
            "Content-Type": "application/json"
        }
        })
        .then((res) => res.text())
        .catch((err) => {
            console.log(err)
        })
        $('#newBranchModal').modal('hide')
        $('#newStoryModal').modal('hide')
        $(".form-control").val('')
        displayNextBranch(branch)
    } else {

        alert('This is not enough information to create!')
    }
}

const handleSignup = async () => {
    let authorName = $("#signupAuthorName").val();
    let email = $("#signupEmail").val();
    let password = $("#signupPassword").val();

    await fetch(`/user/`, {
        method: "POST",
        body: JSON.stringify({
            author_name: authorName,
            email: email,
            password: password
        }),
        headers: {
            "Content-Type": "application/json"
        }
        })
        .then((_res) => {
            location.reload()
        })
        .catch((err) => {
            console.log(err)
        })
        $('#newUserModal').modal('hide')
}

$('#saveNewStory').on('click', ()=> {
    handleNewBranch()
})

$('#saveNewUser').on('click', () => {
    handleSignup()
})


$('#saveNewBranch').on('click', () => {
    handleNewBranch()
})



$('#notepad').on('click', () => {
    $('#notepad').toggleClass('notepad-show')
})

$(document).on('click', '.choice', (e) => {
    e.preventDefault();
    let branchID = $(e.target).data('next-branch')
    console.log(branchID)
    loadNextBranch(branchID)
})

const loadNextBranch = async (branchID) => {
    let page = await fetch(`/branch/monitor/${branchID}`)
    .then((res) => res.text())
    .catch((err) => console.log(err))
    displayNextBranch(page)
}

const displayNextBranch = async (page) => {
    let parser = new DOMParser();
    page = parser.parseFromString(page, 'text/html')
    $('#monitor').html(page.body.innerHTML)
    $('#monitor').get()

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


const loadedNewContent = async () => {
    let track = sounds[$('#ambient_track').val()]

    console.log(ambienceTrack.playing(track) + ' ' + track + ' ' + ambienceTrack._src)
    if (!ambienceTrack._src !== track) {
        ambienceTrack.fade(0.3, 0.0, 2300, audio)
        ambienceTrack = ambience(track)
        audio = ambienceTrack.play()
        ambienceTrack.fade(0.0, 0.3, 2300, audio)
    }

    
    $('#inventoryList').empty()
    $('#required_item').empty()
    $('#required_item').append($('<option value="null">no</option>'))
    $('input[data-item-name]').each((index, element) => {
        let item = $(element).data('item-name')
        $('#notepad').removeClass('notepad-gone')
        $('#inventoryList').append(`<li>${item}</li>`)
        $('#required_item').append($(`<option class="inventoryItem" value="${item}">${item}</option>`))
    })
    $('#required_item').get()

    $('#use_old_branch').empty()
    $('#use_old_branch').append($('<option value="null">New Branch</option>'))
    $('input[data-branch-id]').each((index, element) => {
        let branchTitle = $(element).data('branch-title')
        let branchID = $(element).data('branch-id')
        $('#use_old_branch').append($(`<option class="branchHistoryItem" value="${branchID}">${branchTitle}</option>`))    
    })
    $('#use_old_branch').get()

    $('#required_item').change(() => {
        $('#required_item').val() === "null" ? $('#removeItemOption').hide() : $('#removeItemOption').show()
    })
    
    $('#use_old_branch').change(() => {
        $('#use_old_branch').val() === "null" ? $('#writeNewBranchOption').removeClass('hidden') : $('#writeNewBranchOption').addClass('hidden')
    
    })
  

    if ($('#sound_effect').val()) {
        playJumpScare($('#sound_effect').val())

    }
    
    await typeItOut()
}

$(document).ready(() => {
    loadedNewContent()

})

