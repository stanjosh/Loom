



const playKeySound = () => {
    const key1 = new Audio("../sound/key1.mp3")
    const key2 = new Audio("../sound/key2.mp3")
    const key3 = new Audio("../sound/key3.mp3")
    const keySounds = [key1, key2, key3]
    keySounds[Math.floor(Math.random() * keySounds.length)].play()
}




  $(document).ready(() => {
    $('.passage').each(function() {
        let text = $(this).attr('data-type-text')
        text = text.replace(/\s+/g,' ').trim();

        let element = $(this)
        let i = 0;
        let timer = setInterval( async () => {
            if (i < text.length) {
                setTimeout(() => {
                    text.charAt(i) === " " ? null : playKeySound()
                    element.append(text.charAt(i))
                    i++
                }, Math.floor(Math.random() * 80));
            } else {
                clearInterval(timer)
                element.text(text)
                $('.choice').removeClass('hidden')
            }
        }, 110);
        $(document).on('click', async () => {
            i = text.length
            element.text(text)
            $('.choice').removeClass('hidden')
        })
    });    
  })


const handleNewBranch = async () => {
    let choiceText = $('#choice_text').val();
    let requiredItem = $('#required_item').val()
    let nextBranchTitle = $('#next_branch_title').val()
    let nextBranchContent = $('#next_branch_content').val()
    let receivedItem = $('#received_item').val()
    let removeItem = $('#remove_item').is(':checked')
    let endHere = $('#end_here').is(':checked')
    let useOldBranch = $('#use_old_branch').val() === 'null' ? null : $('#use_old_branch').val()
    
    let branchData = {
        branch_title : nextBranchTitle,
        branch_content : nextBranchContent,
        received_item : receivedItem ? receivedItem : null,
        removed_item : removeItem ? requiredItem : null,
        end_here : endHere
    }

    let choiceData = {
        choice_text : choiceText,
        required_item : requiredItem !== 'null' ? requiredItem : null,
        next_branch : $('#use_old_branch').val()
    }


    await fetch(`/branch/`, {
        method: "POST",
        body: JSON.stringify({
            branchData : useOldBranch ? null : branchData,
            choiceData : choiceData
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
}

const handleNewStory = async () => {
    let branchTitle = $('#branch_title').val();
    let branchContent = $('#branch_content').val()
    let receivedItem = $('#received_item').val()
    let storyTitle = $('#story_title').val()
    let storyContent = $('#story_content').val()


    await fetch(`/story/`, {
        method: "POST",
        body: JSON.stringify({
            branchData : {
                branch_title : branchTitle,
                branch_content : branchContent,
                received_item : receivedItem ? receivedItem : null,
                end_here : false,
                start_here : true   
            },
            storyData : {
                story_title : storyTitle,
                story_content : storyContent
            }
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
}

$('#saveNewStory').on('click', ()=> {
    handleNewStory()
})

$('#saveNewUser').on('click', () => {
    handleSignup()
})


$('#saveNewBranch').on('click', () => {
    handleNewBranch()
})

$('#required_item').change(() => {
    $('option:selected').text() == 'no' ? $('#removeItemOption').hide() : $('#removeItemOption').show()
})

$('#use_old_branch').change(() => {
    if ($('option:selected').text() == 'no') {
        $('#writeNewBranchOption').show()
    } else {
        $('#writeNewBranchOption').hide()
    }
})

$('#notepad').on('click', () => {
    console.log('clicked')
    $('#notepad').toggleClass('notepad-show')
})