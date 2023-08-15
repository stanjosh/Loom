const { Choice, Story, Branch } = require("..");



const branchData = [

    {   
        story_reference_id: "andrew's story",
        start_here: true,
        reference_id: "1",
        branch_title:"Awakening",
        branch_content:
         `You awake in a panic! You look around and realize you are in a hospital and while everything seems vaguely 
        familiar but then you realize you have no memory. You stand but almost collapse over your own weight.
         You Must find a purpose`,
        story_choices: [
            {
                choice_text: "Look around",
                next_branch: "Initial Items"
            },
            {
                choice_text: "Exit the room",
                next_branch: "Hospital Halls"
            }
        ]
    },
    {
        story_reference_id: "andrew's story",
        reference_id: "2",
        branch_title: "Initial Items",
        branch_content: "You see a flashlight",
        story_choices: [
            {
                choice_text: "Pick up flashlight",
                next_branch: "Flashlight description"
            }
        ]
    },

    {
        story_reference_id: "andrew's story",
        reference_id: "3",
        branch_title: "Flashlight description",
        recieved_item: "flashlight",
        branch_content: "You notice the flashlight does not have batteries but you take it anyway",
        story_choices: [
            {   
                
                choice_text: "Exit the room",
                next_branch: "Hospital Halls"
            }
        ],
    },
    {   
        story_reference_id: "andrew's story",
        reference_id: "4",
        branch_title:"Hospital Halls",
        branch_content:
         `You exit the room and notice no staff or life of any kind in the building.
          You see a receptionist desk that looks abandoned and tattered.`,
        story_choices: [
            {
                choice_text: "Go to reception desk",
                next_branch: "Reception Desk"
            },
            {
                choice_text: "Go down the hall",
                next_branch: "Stairwell Hallway Init"
            }
        ]
    },
    {   
        story_reference_id: "andrew's story",
        reference_id: "5",
        branch_title:"Reception Desk",
        branch_content:
         `A messy desk with a with a locked drawer`,
        story_choices: [
            {
                choice_text: "Unlock Drawer",
                next_branch: "Locked Drawer"
            },
            {
                choice_text: "Go back",
                next_branch: "Hospital Halls"
            }
        ]
    },
    {   
        story_reference_id: "andrew's story",
        reference_id: "6",
        branch_title:"Locked Drawer",
        branch_content:
         `The drawer is locked with a 3 digit keypad combination.
         You see a sticky note that says. The meaning of the universe`,
        story_choices: [
            {
                type: "input",
                choice_text: "What could the code be?",
                next_branch: "Drawer Success",
                fail_branch: "Drawer Fail"
            },
            {
                choice_text: "Go back",
                next_branch: "Reception Desk"
            }
        ]
    },
    {   
        story_reference_id: "andrew's story",
        reference_id: "7",
        branch_title:"Drawer Fail",
        branch_content:
         `You giggle the lock but it does not open`,
        story_choices: [
            {
                type: "input",
                choice_text: "What could the code be?",
                next_branch: "Drawer Success",
                fail_branch: "Drawer Fail"
            },
            {
                choice_text: "Go back",
                next_branch: "Reception Desk"
            },
        ]
    },
    {   
        story_reference_id: "andrew's story",
        reference_id: "8",
        branch_title:"Drawer Success",
        branch_content:
         `*click*
         The drawer opens to reveal batteries. You pick them up and slot them into the flashlight.`,
        story_choices: [
            {
                choice_text: "Go back",
                next_branch: "Hospital Halls"
            },
        ]
    },
    {   
        story_reference_id: "andrew's story",
        reference_id: "9",
        branch_title:"Stairwell Hallway Init",
        branch_content:
         `The one unlocked door is to the stairwell.
          There is nothing blocking from going up or down`,
        story_choices: [
            {
                choice_text: "Go Down",
                next_branch: "Down Stairs Init"
            },
            {
                choice_text: "Go Up",
                next_branch: "Up Stairs"
            },
            {
                choice_text: "Go back",
                next_branch: "Hospital Halls"
            },
        ]
    },
    {   
        story_reference_id: "andrew's story",
        reference_id: "10",
        branch_title:"Stairwell Hallway",
        branch_content:
         `Which way to go?`,
        story_choices: [
            {
                choice_text: "Go Down",
                next_branch: "Down Stairs"
            },
            {
                choice_text: "Go Up",
                next_branch: "Up Stairs"
            },
            {
                choice_text: "Check reception desk",
                next_branch: "Reception Desk"
            },
        ]
    },
    {   
        story_reference_id: "andrew's story",
        reference_id: "11",
        branch_title:"Down Stairs Init",//////
        branch_content:
         `!Ah! An exit door. Finally I can get out of here.
         *Giggle Giggle*
         Of course it's locked! Why wouldn't it be locked?!
         *You feel dread as you wollow in your mind*
         I have to find another way.`,
        story_choices: [
            {
                choice_text: "Go up",
                next_branch: "Stairwell Hallway"
            },
            {
                choice_text: "Go to main lobby",
                next_branch: "Main Lobby"
            }
        ]
    },
    {   
        story_reference_id: "andrew's story",
        reference_id: "12",
        branch_title:"Down Stairs",//////
        branch_content:
         `Back at the bottom of the stairs`,
        story_choices: [
            {
                choice_text: "Go up",
                next_branch: "Stairwell Hallway"
            },
            {
                choice_text: "Go to main lobby",
                next_branch: "Main Lobby Init"
            }
        ]
    },
    {   
        story_reference_id: "andrew's story",
        reference_id: "13",
        branch_title:"Up Stairs",
        branch_content:
         `You notice another locked door labeled roof access`,
        story_choices: [
            {
                choice_text: "Try door",
                next_branch: "Final Door"///////////////////////////////////////////////////////////////////////////
            },
            {
                choice_text: "Go back",
                next_branch: "Stairwell Hallway"
            },
        ]
    },
    {   
        story_reference_id: "andrew's story",
        reference_id: "14",
        branch_title:"Main Lobby Init",
        branch_content:
         `A Dormant room with cobwebs and.....Is that a person? A real person?!`,
        story_choices: [
            {
                choice_text: "Approach Person",
                next_branch: "Figure Dialog"
            },
            {
                choice_text: "Go back",
                next_branch: "Down Stairs"
            },
        ]
    },
    {   
        story_reference_id: "andrew's story",
        reference_id: "15",
        branch_title:"Figure Dialog",
        branch_content:
         ` ══════════════▒████████████████████
         ════════════▓█████████▓███▓▓██▓███▓█████
         ══════════██▓████████▓██▓███▓██▒▒▒███▓██
         ═══════▒██████▓████▓██▓██▓▒▒▒▓▓▓▓▓▒█████
         ═══════██████▓████▓██▓▓██▒▒▓▓▒▓▓▒▒▒▒████
         ═════▓██████████▓███▓▓████▓▓▓▒▓█████▓▓██
         ═════█████▓████▓▓███▓█████═█▓▒██▓████▓▓█
         ════█████▓████▓▓███▓▓████░═▒█████▓████▓█
         ════████▓█████▓███▓▓▓████════░████▓████▓
         ═══▒████▓████▓████▓▓████══════▒████▓████
         ═══████▓████▓████▓▓█▓██════════░████████
         ═══████▓███▓▓███▓▓█▒▒█════████▒══███▓███
         ═══▓██▓████████▓██▓═█════██═══▒▓══██████
         ════██████▓███▓███═█════█▓════════██▓███
         ════████▓███▓███▒═░═══════════════██▓███
         ════▓██▓███▓██▓══════════════════▓█▓████
         ═════█▓██████═══════════════▓███═▒█▓████
         ═════██▓███═══░════════════██████▓█▓████
         ════▒█████═══███▓═════════██═░█▒████████
         ════████▓██═██░▒██═══════░█═░▓██▒═▒█▓███
         ═══████▓███═█═══██░══════▒══████═══█████
         ══▓███▓████▓══░███════════════▒════██▓██
         ══███▓▓█████════▓══════════════════██▓▓█
         ═▓███▓███▓██══════════════════════░███▓█
         ═▓███▓▓█████░════════════════════▒██████
         ══████▓▓████▒═══════════════════███▓███▓
         ══░████▓▓███▓══════════════════════▒███▓
         ═══▒████▓▓███═════════════════════▓████▓
         ════▒████▓███▒═══════════════════██████▓
         ═════████▓████═════░███▓════════██████▓█
         ═════▒█████▓███════▓▒══░█══════██████▓▓█
         ═════███▓██▓████════█▒▓█▓═════▒████▓▓███
         ════██▓███▓██████═══▒██▓══════████▓▓████
         ═══██▓█████▓██████═══════════░███▓▓█████
         ═▒██████▓██▓▓██████══════════▓███▓██████
         ░█░████▓█████▓███▓██░════════▒████▓█████
         █═░███▓██████▓███▓███▓══░═════█████▓████
         ═░███▓██████▓███▓████████═══════████▓███

         
         "Oh! You are awake"`,
        story_choices: [
            {
                choice_text: "Where am I?",
                next_branch: "Where"
            },
            {
                choice_text: "Who am I?",
                next_branch: "Who"
            }
        ]
    },
    {   
        story_reference_id: "andrew's story",
        reference_id: "16",
        branch_title:"Where",
        branch_content:
         `"You are where you are meant to be......"`,
        story_choices: [
            {
                choice_text: "Who am I?",
                next_branch: "Who"
            }
        ]
    },
    {   
        story_reference_id: "andrew's story",
        reference_id: "17",
        branch_title:"Who",
        branch_content:
         `"You are the man that killed them....Don't you remember?"
         
         You almost collapse to the sound of screeching metal.
        When you regain your sanity the figure dissapeared.`,
        story_choices: [
            {
                choice_text: "Go back to Main Lobby",
                next_branch: "Main Lobby"
            }
        ]
    },
    {   
        story_reference_id: "andrew's story",
        reference_id: "18",
        branch_title:"Main Lobby",
        branch_content:
         `You notice a pitch black hallway where sound is defened by the darkness?`,
        story_choices: [
            {
                choice_text: "Go back to stairwell",
                next_branch: "Down Stairs"
            },
            {
                choice_text: "Investigate hallway with flashlight",
                next_branch: "1st Floor Hall"
            },
        ]
    },
    {   
        story_reference_id: "andrew's story",
        reference_id: "19",
        branch_title:"1st Floor Hall Init",
        branch_content:
         `With your flashlight in hand you can conquer the darkness.
          You notice a open hospital room with a faint light.`,
        story_choices: [
            {
                choice_text: "Go Into Hospital Room",
                next_branch: "Hospital Room Scripted"////////
            },
            {
                choice_text: "Go back",
                next_branch: "Main Lobby"
            },
            {
                choice_text: "Keep going through hallway",
                next_branch: "Hospital Chapel"///////////
            }
        ]
    },

    {   
        story_reference_id: "andrew's story",
        reference_id: "20",
        branch_title:"1st Floor Hall Fail",
        branch_content:
         `its too dark. I need to find a way to make it through.`,
        story_choices: [
            {
                choice_text: "Go Back",
                next_branch: "Main Lobby"
            },

        ]
    },
    //TODO: Write Scripted Hospital visit
    {   
        story_reference_id: "andrew's story",
        reference_id: "21",
        branch_title:"1st Floor Hall",
        branch_content:
         `Back in that main hall. Don't want to go back into that creepy room`,
        story_choices: [
            {
                choice_text: "Go Into Hospital Room",
                next_branch: "Hospital Room Scripted"
            },
            {
                choice_text: "Go back",
                next_branch: "Main Lobby"
            },
            {
                choice_text: "Keep going through hallway",
                next_branch: "Hospital Chapel"///////////
            }
        ]
    },
    {   
        story_reference_id: "andrew's story",
        reference_id: "22",
        branch_title:"1st Floor Hall",
        branch_content:
         `With your flashlight in hand you can conquer the darkness.
          You notice a open hospital room with a faint light.`,
        story_choices: [
            {
                choice_text: "Go Into Hospital Room",
                next_branch: "Hospital Room Scripted"
            },
            {
                choice_text: "Go back",
                next_branch: "Main Lobby"
            },
            {
                choice_text: "Keep going through hallway",
                next_branch: "Hospital Chapel"
            }
        ]
    },
]





const branchSeeds = async (storyRefUUIDs, userUUIDs) => {
    // assign story UUIDs to branches
    console.log(storyRefUUIDs)
    branchData.forEach((branch) => {
        branch.story_id = storyRefUUIDs[branch.story_reference_id]
        branch.user_id = userUUIDs[0]
    })
    
    // create branch data so we can get the UUIDs and have it return the 
    // objects and clean them up
    let branches = await Branch.bulkCreate(branchData, { returning: true});
    branches = branches.map(branch => branch.get({ plain: true }));

    //assign the UUIDs to the local data
    let branchUUIDs = {};
    branches.forEach((branch) => {
        branchUUIDs[branch.branch_title] = branch.id;
        console.log(branchUUIDs)
    });

    //assign branch and story UUIDs or null to story choice objects 
    // and return only story choice objects as array to be created
    
    let storyChoicesData = []
    console.log(branchData)
    branchData.forEach((branchStoryChoices) => {
        
        let branch_id = branchUUIDs[branchStoryChoices.branch_title]
        let story_id = storyRefUUIDs[branchStoryChoices.story_reference_id]
        
        branchStoryChoices = branchStoryChoices.story_choices 
            ? branchStoryChoices.story_choices 
            : null
        if (branchStoryChoices) {
            branchStoryChoices.forEach((branchStoryChoice) => {
                branchStoryChoice.next_branch = branchUUIDs[branchStoryChoice.next_branch] 
                    ? branchUUIDs[branchStoryChoice.next_branch] 
                    : null
                branchStoryChoice.fail_branch = branchUUIDs[branchStoryChoice.fail_branch] 
                    ? branchUUIDs[branchStoryChoice.fail_branch] 
                    : null  
                branchStoryChoice.story_id = story_id
                branchStoryChoice.branch_id = branch_id
                storyChoicesData.push(branchStoryChoice)
            })
        }
    })
    console.log(storyChoicesData)
    storyChoicesData ? await Choice.bulkCreate(storyChoicesData) : null

}

module.exports = branchSeeds;