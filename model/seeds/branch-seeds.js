const { Choice, Story, Branch } = require("..");



const branchData = [

    {   
        story_reference_id: "andrew's story",
        start_here: true,
        reference_id: "1",
        branch_title:"Awakening",
        branch_content:
         `You awake in a panic! You look around and realize
          you are in a hospital. While everything seems vaguely 
          familiar, you have no memory.
          You stand but almost collapse under your own weight.
          You must find a purpose.`,
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
        branch_content: "You find a flashlight.",
        story_choices: [
            {
                choice_text: "Pick up the flashlight",
                next_branch: "Flashlight description"
            }
        ]
    },

    {
        story_reference_id: "andrew's story",
        reference_id: "3",
        branch_title: "Flashlight description",
        received_item: "Dead Flashlight",
        branch_content: "You notice the flashlight does not have batteries, but you take it anyway",
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
         `You exit the room and notice no staff, or life of any kind, in the building.
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
         `You're standing at a messy desk with a with a locked drawer.`,
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
         You see a sticky note that says, "The meaning of the universe?"`,
        story_choices: [
            {
                type: "input",
                choice_text: "042?",
                next_branch: "Drawer Success",
                fail_branch: "Drawer Fail"
            },
            {
                type: "input",
                choice_text: "069?",
                next_branch: "Drawer Fail",
                fail_branch: "Drawer Fail"
            },
            {
                type: "input",
                choice_text: "420?",
                next_branch: "Drawer Fail",
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
         `You jiggle the lock but it does not open`,
        story_choices: [
            {
                type: "input",
                choice_text: "What could the code be?",
                next_branch: "Locked Drawer",
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
        received_item: "Flashlight",
        removed_item: "Dead Flashlight",
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
         `The unlocked door goes to the stairwell.
          There is nothing stopping you from going up or down.`,
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
         `"Which way to go? Am I talking to myself?"`,
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
         `"Ah! An exit door. Finally I can get out of here."
          You jiggle the handle a few times.
         "Of course it's locked! Why wouldn't it be locked?!"
         You feel dread as you wallow in your mind.
         "I have to find another way."`,
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
        reference_id: "12",
        branch_title:"Down Stairs",//////
        branch_content:
         `You're at the bottom of the stairs.`,
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
        reference_id: "13",
        branch_title:"Up Stairs",
        branch_content:
         `You notice another locked door labeled "Roof Access."`,
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
         `A dormant room with cobwebs and... Is that a person? A real person?!`,
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
         ═══════▒██████▓████▓██▓██▓▒▒▒▓▓▓▓▓▒█████
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

         
         "Oh! You're awake"`,
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
         `"You are where you are meant to be..."`,
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
         `"You're the man that killed them... Don't you remember?"
         
         You almost collapse to the sound of screeching metal.
        By the time you regain your sanity, the figure has disappeared.`,
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
         `You notice a pitch black hallway where the darkness is deafening.`,
        story_choices: [
            {
                choice_text: "Go back to stairwell",
                next_branch: "Down Stairs"
            },
            {
                choice_text: "Investigate hallway with flashlight",
                next_branch: "1st Floor Hall Init"
            },
        ]
    },
    {   
        story_reference_id: "andrew's story",
        reference_id: "19",
        branch_title:"1st Floor Hall Init",
        required_item: "Flashlight",
        branch_content:
         `With your flashlight in hand, you can conquer the darkness.
          You notice an open hospital room with a faint light.`,
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
                next_branch: "Chapel Door Locked"
            }
        ]
    },

    {   
        story_reference_id: "andrew's story",
        reference_id: "20",
        branch_title:"1st Floor Hall Fail",
        branch_content:
         `"It's too dark. I need to find a way to make it through," you say to yourself.`,
        story_choices: [
            {
                choice_text: "Go Back",
                next_branch: "Main Lobby 2"
            },

        ]
    },
    //TODO: Write Scripted Hospital visit
    {   
        story_reference_id: "andrew's story",
        reference_id: "21",
        branch_title:"1st Floor Hall",
        branch_content:
         `"Now that power is back this dark and creepy hall isn't so dark and creepy.
          Don't want to go back into that creepy room."`,
        story_choices: [
            {
                choice_text: "Go back",
                next_branch: "Main Lobby 2"
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
        branch_title:"Chapel Door Locked",
        branch_content:
         `A large wooden door appears through the darkness.
         Candelight can be seen through the bottom of the
         door but it won't budge.`,
        story_choices: [
            {
                choice_text: "Go back",
                next_branch: "Main Lobby"
            },
            {
                choice_text: "Enter Room",
                next_branch: "Hospital Room Scripted"///////////
            }
        ]
    },
    
    {   
        story_reference_id: "andrew's story",
        reference_id: "23",
        branch_title:"Hospital Room Scripted",
        branch_content:
         `The door creaks open.

          Your head throbs as you feel a sense of regret and unease. 
          Anxiety fills your chest as figures appear around the room.
          The world narrows around you, and... you faint.`,
        story_choices: [
            {
                choice_text: "Continue",
                next_branch: "Hospital Chapel Init"
            }
        ]
    },
    {   
        story_reference_id: "andrew's story",
        reference_id: "24",
        branch_title:"Hospital Chapel Init",
        branch_content:
         `You awake in what seems to be the chapel in the hospital.
           As creepy as it is, you feel at peace.`,
        story_choices: [
            {
                choice_text: "Approach Altar",
                next_branch: "Altar"
            },
            {
                choice_text: "Unlock Door",
                next_branch: "Chapel Door Unlocked"
            }
        ]
    },
    {   
        story_reference_id: "andrew's story",
        reference_id: "25",
        branch_title:"Altar",
        branch_content:
         `Candles and offerings surround the altar.
         
         The photos of people the memorial is dedicated to 
         stare into your eyes as if they knew who approached
         them.
         \n\n
         The feeling of anxiety is back, crushing your ribs
         under the weight of guilt.
         \n\n
         "Did I kill these people?"
          \n...
          \nDid you?`,
        story_choices: [
            {
                choice_text: "Look around",
                next_branch: "Chapel Look"
            },
            {
                choice_text: "Unlock Door",
                next_branch: "Chapel Door Unlocked"
            }
        ]
    },
    {   
        story_reference_id: "andrew's story",
        reference_id: "26",
        branch_title:"Main lobby 2",
        branch_content:
         `"Back at the main lobby, glad that woman isn't here."`,
        story_choices: [
            {
                choice_text: "Go back to stairwell",
                next_branch: "Down Stairs"
            },
            {
                choice_text: "Keep going through hallway",
                next_branch: "1st Floor Hall"
            }
        ]
    },
    // TODO ADD CHAPEL UPSTAIRS AND ELEVATOR
    {   
        story_reference_id: "andrew's story",
        reference_id: "27",
        branch_title:"Chapel Look",
        branch_content:
         `You see a path that leads upstairs.`,
        story_choices: [
            {
                choice_text: "Go up stairs",
                next_branch: "Chapel Upstairs"
            },
            {
                choice_text: "Go to chapel door",
                next_branch: "Chapel Door Unlocked"///////////
            }
        ]
    },
    {   
        story_reference_id: "andrew's story",
        reference_id: "28",
        branch_title:"Chapel Door Unlocked",
        branch_content:
         `You move a large plank from its resting place across the door
         and drop it on the ground.
         
         You feel uneasy, leaving so quickly.`,
        story_choices: [
            {
                choice_text: "Go to altar",
                next_branch: "Chapel Altar"///////////
            }
        ]
    },
    {   
        story_reference_id: "andrew's story",
        reference_id: "29",
        branch_title:"Chapel Upstairs",
        branch_content:
         `The stairs seem like they are at least a century old.
         Upon arriving at the top, you notice an elevator
         and a closet.`,
        story_choices: [
            {
                choice_text: "Go into closet",
                next_branch: "Chapel Closet init"
            },
            {
                choice_text: "Go to elevator",
                next_branch: "Elevator Init"///////////
            }
        ]
    },
    {   
        story_reference_id: "andrew's story",
        reference_id: "30",
        branch_title:"Hospital Chapel",
        branch_content:
         `"Back in the chapel."
        You try not to look at the photos.`,
        story_choices: [
            {
                choice_text: "Go up stairs",
                next_branch: "Chapel Upstairs"
            },
            {
                choice_text: "Go through the unlocked door",
                next_branch: "1st Floor Hallway"///////////
            }
        ]
    },
    {   
        story_reference_id: "andrew's story",
        reference_id: "31",
        branch_title:"Chapel Closet init",
        branch_content:
         `You see a breaker box with cut wires.
         \n\n
         "I'm no electrician..."`,
        story_choices: [
            {
                choice_text: "Go to elevator",
                next_branch: "Elevator Init"///////////
            }
        ]
    },
    {   
        story_reference_id: "andrew's story",
        reference_id: "32",
        branch_title:"Elevator Init",
        branch_content:
         `"Wow, a creepy elevator. No surprise there."
         
         You try the elevator, but it has no power.
         
         "Guess it's time to become an electrician."`,
        story_choices: [
            {
                choice_text: "Go into closet",
                next_branch: "Chapel Closet"
            },
            {
                choice_text: "Go to elevator",
                next_branch: "Elevator"///////////
            }
        ]
    },
    {   
        story_reference_id: "andrew's story",
        reference_id: "33",
        branch_title:"Chapel Closet",
        branch_content:
         `"Here goes nothing."`,
        story_choices: [
            {
                choice_text: "Connect wires randomly",
                next_branch: "Power Fail"
            },
            {
                choice_text: "Connect blue to blue and red to red",
                next_branch: "Power Success"///////////
            }
        ]
    },
    {   
        story_reference_id: "andrew's story",
        reference_id: "34",
        branch_title:"Power Fail",
        branch_content:
         `You're shocked that this is going so well, then you're just shocked.
         \n\n
        "Ow! I hate this place!"`,
        story_choices: [
            {
                choice_text: "Try again",
                next_branch: "Chapel Closet"
            }
        ]
    },
    {   
        story_reference_id: "andrew's story",
        reference_id: "35",
        branch_title:"Power Success",
        branch_content:
         `Lights illuminate the room as power fills the hospital.
         
         "Maybe I found my new career."`,
        story_choices: [
            {
                choice_text: "Go back to elevator",
                next_branch: "Elevator"
            }
        ]
    },
    {   
        story_reference_id: "andrew's story",
        reference_id: "36",
        branch_title:"Elevator",
        branch_content:
         `With the power back on, you can take the elevator.`,
        story_choices: [
            {
                choice_text: "Take the elevator",
                next_branch: "Basement"
            },
            {
                choice_text: "Wait",
                next_branch: "Chapel Upstairs"///////////
            }
        ]
    },
    {   
        story_reference_id: "andrew's story",
        reference_id: "37",
        branch_title:"Basement",
        branch_content:
         `You arrive in a dark and dreary basement.
          You see a dark pit. Whispers fill your mind, begging you to come closer.
          Whispers seep from the darkness, "Please....I beg you."`,
        story_choices: [
            {
                choice_text: "Go to the pit",
                next_branch: "Pit"
            }
        ]
    },
    {   
        story_reference_id: "andrew's story",
        reference_id: "38",
        branch_title:"Pit",
        branch_content:
         `The pit is a pool of endless darkness. Maybe some light will help.`,
        story_choices: [
            {
                choice_text: "Shine flashlight in pit",
                next_branch: "Pit"
            }
        ]
    },
    {   
        story_reference_id: "andrew's story",
        reference_id: "39",
        branch_title:"Skeleton 1",
        branch_content:
         `*SCREeEeeEeEeEEeCH*
         ⠈⠈⠀⠁⠁⠈⠈⠁⠀⠐⠃⠈⠀⠀⠀⠀⠘⢚⠂⠁⠁⠈⠔⠐⠐⢋⠉⠃⠑⠋⢉⠊⠂⠙⠉⢍⠈⠈⠙⠐⠈⠁⠝⠉⠀⠚⠀⠋⠨⠁⠁⠀⠀⠙⠁⠆⠂⠈⠀⠀⠀⠀⠀⠀⠀
⡀⠀⠀⠀⠀⢀⠀⠀⡄⢀⡐⠐⣄⡒⡨⣀⣐⢀⡀⠂⠀⠐⠨⡀⠀⡀⠐⡰⠂⢀⠐⣀⠀⢊⡊⢀⠐⢀⢠⠀⠀⠀⢄⠐⠠⠀⠐⡗⡀⢂⡀⠸⠔⡲⡂⢒⠁⢀⢀⣠⣴⣾⠗⠀⠀
⠦⠀⠠⠄⠤⡀⠀⠀⠀⠄⣀⠀⡀⠀⠀⠀⠢⠀⠀⠢⠄⠀⠀⠐⠀⠘⠀⠀⢄⠀⠀⠀⠀⠀⠐⠆⠠⢀⠀⠀⡀⡀⠀⠄⠀⠦⠀⠺⢀⠀⠀⠠⠀⠀⠀⠀⠀⣴⣿⣿⠟⠁⠀⠁⣀
⣉⠀⠀⠀⠀⠀⠀⠠⠆⠂⠀⠀⠀⡀⠀⠐⠊⠰⠀⠀⡍⠀⠰⠄⠃⠴⠸⢀⠀⠀⠀⠈⠀⠀⠈⠈⢀⠀⢀⠀⠁⠁⠀⠀⡀⠐⠘⠀⠉⠖⠐⠂⠀⠂⡀⢧⣿⣿⣿⠃⢀⣠⣾⣶⡿
⠀⠀⠂⠄⠀⠀⠡⠒⠀⢠⠀⡀⠀⠀⠀⠀⠐⠀⠒⡆⢰⡄⠀⠀⠀⠐⠰⠀⣄⠁⢰⠀⠀⠁⠈⢠⠁⠉⡍⡌⠀⠀⢀⡀⠀⠀⠄⠁⠀⠂⠀⢠⡀⠀⢰⣿⣿⣿⠁⣠⣿⣿⠟⠋⠀
⠀⠠⠀⠀⠀⠀⠀⠀⠀⠅⠀⠊⠉⢀⣁⣦⣈⣀⣤⣤⣶⣦⣇⠀⠀⠀⠢⠀⠙⢧⡅⠀⠀⠀⠤⠠⠠⠁⠰⠀⢀⠈⠢⠠⠁⠀⠠⠁⠀⠁⠀⠠⠀⠂⢀⣿⣿⣿⣾⣿⣟⣁⣠⣴⣤
⠀⢀⠀⠐⠀⢀⠂⠑⠂⠠⠄⣠⣿⢟⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡷⣐⠰⠀⡂⠈⠳⢘⠀⠀⠰⠂⠆⠀⠂⠀⠂⢸⣦⣶⣿⣶⣦⣬⣈⡐⠀⠐⠂⣂⣴⣿⣿⣿⣿⣿⣿⣟⡛⠛⢉
⠀⠐⠀⢀⠂⠀⡣⢀⠀⠀⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡀⠠⢸⠠⠐⠀⢤⡋⠂⠄⠀⠃⢌⠊⡂⠈⠻⠿⠿⠿⠿⣿⣿⣯⣷⣶⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⠿
⠀⠀⠀⠁⠀⣀⠨⠄⠀⢀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⡁⠁⢃⢇⣀⠈⠓⣔⠀⠀⡐⠄⢀⠈⠀⠒⠒⠐⠀⡀⢙⠛⠻⠟⢋⣹⣿⣿⣿⣿⣽⡏⠿⠿⠋⠉⠀⠀
⠀⠈⠀⠀⢀⠐⠁⡀⠀⠀⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠠⠨⠈⠘⣿⣆⠀⠘⡏⠀⠥⠽⠀⠐⠀⠌⠨⠤⠦⠀⢀⠀⠀⢄⣴⣾⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀
⠀⠀⠀⣐⠀⠁⠀⠀⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⢸⠸⠀⠈⠻⣧⢀⠀⢸⣰⠀⢀⠀⣅⠀⠒⢈⠉⣁⠀⠦⢈⣤⣿⣿⣿⣿⢟⣿⣿⡆⡀⢀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠂⠀⠳⢿⣿⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢿⣿⢳⣿⠆⠂⠰⡟⣷⣤⡐⢻⡆⢰⠀⠀⠀⡔⢐⠀⠄⠀⣦⣾⣿⣿⣿⡿⢃⣾⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠊⠀⠐⠀⠈⠀⠸⠁⣶⣿⣿⣿⣸⡿⠿⠿⣿⣿⣿⣿⣥⣴⣿⡏⠾⣯⡹⢦⣄⣁⠄⡈⠀⣾⣏⢹⡆⠀⠀⠠⠉⠈⠀⠐⠿⣿⣿⣿⠟⢁⣾⣿⣿⣿⣿⠟⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠢⠀⠀⠄⠀⠘⣿⣿⣯⣟⣷⣶⣾⣿⡿⢿⣿⣿⣿⣿⠇⠀⢼⣥⣾⣿⡏⡅⣠⢘⣿⣿⡾⣻⣗⠂⠂⠐⠀⣁⣥⣤⣿⣿⣯⣾⣿⣿⣿⣿⣿⠯⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠠⠀⠁⠀⠀⠀⠌⠈⠛⠿⣿⣿⣿⣿⣿⣷⣶⣿⣿⣿⡇⠄⠀⣼⣿⣿⣿⣿⣷⣥⣬⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⡏⠃⠀⠀⠀⠀⠂⠀⠀⠀
⠀⠀⠀⣀⠀⠀⠀⠀⠈⠂⠀⡀⠑⣀⢀⣸⣿⣿⢿⣿⣿⣿⣿⢻⣿⣋⡓⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⡀⠀⠐⠀⠀⠠⠀⠀⠀⠀
⠀⡀⠀⠀⠉⠀⠀⢀⡀⠱⡄⠀⡀⠘⢽⣿⣿⣿⣷⣿⣿⣿⣿⣿⡿⠀⣽⣿⣿⣿⣿⣿⣿⣿⣿⡟⠉⠉⠛⠛⢻⠿⣿⣿⠿⠟⠿⠻⠿⠿⣿⣿⡿⣯⠄⠀⠀⠀⠁⠄⠀⠀⠀⢐⠀
⠀⠀⠀⠠⠂⠀⠈⡀⠀⠀⠉⠀⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿⠿⠁⢰⣿⣿⠟⠛⠿⣿⣿⣿⣿⣧⠠⠀⣦⣰⠽⠓⠉⠉⠚⡀⠒⠂⠀⠂⡈⢹⠷⡆⡀⠀⠀⠀⠀⠀⠀⠐⠀⠈⠀
⠀⠀⠀⠀⠌⠀⠀⠀⠀⠄⠸⡃⠀⠨⠀⢸⣿⣿⣿⣿⣽⣽⣿⣷⣶⣿⣿⢏⣴⣿⣿⣿⣿⣿⣽⣿⣆⡀⢉⡇⠓⠄⠘⠷⠄⠁⠁⢰⠈⢠⠡⠰⠀⠀⡄⠀⠀⠀⠀⠀⠀⠀⠀⠠⠀
⠀⠀⠀⣰⣴⡷⣺⣶⣧⡴⠿⣿⣀⣈⣥⣼⣿⣿⣿⣿⣿⣿⣿⣽⣛⣿⣱⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠩⠈⠀⠀⠁⠀⠅⠨⠀⠤⠀⠆⠀⠀⣤⣁⡀⠀⠀⠒⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢛⡃⣠⣿⣿⣿⣶⣾⣿⣿⣿⡿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣿⣿⣿⣿⣿⣿⣿⣿⠿⢿⣯⠇⠠⠀⡀⠀⠐⡢⠁⡒⠃⠈⠦⡀⡀⢃⠂⠀⠙⢓⠀⠀⠀⠀⠀⠀⠀⠐⠀
⠀⢄⡀⢈⣱⣿⣿⣿⣿⡁⠀⠀⠀⠀⢠⣿⣟⣥⣿⣿⣿⣿⣿⣿⣿⣾⣿⣿⣿⣿⣿⣿⣿⣧⡀⠈⠁⠈⢈⠉⠀⠀⡋⠐⠈⠀⠁⡈⠀⠀⠈⠂⠀⠆⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀
⠀⠸⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣶⣶⣼⣿⣿⡿⢿⣿⣿⣿⣿⣿⣿⣿⢟⣽⣿⣿⣿⣿⣿⣿⣷⣌⡈⠁⣀⠐⠀⡈⡁⠀⠐⠀⠈⡰⠀⠐⠆⠀⡀⢃⠀⡀⠈⠀⠀⠀⠀⠀⠀⠀⠀
⢠⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣁⣤⣾⣿⣿⣿⣫⣿⣿⣿⣿⣿⡿⢋⣠⣿⣿⣈⣻⣿⣿⡎⠥⣄⠱⠁⠁⠉⠠⠅⢀⢀⡉⡀⠁⢁⠄⡠⡁⠀⠀⠀⠀⠦⠀⠀⠀⠀⠀
⢚⣿⣿⣿⣿⣿⣿⡟⠛⢿⣿⣿⣿⣿⣿⣿⠿⠟⣋⣵⣿⣿⣿⣿⣿⣿⣿⣷⣾⣿⣿⣿⠿⢿⣿⣿⣿⣄⠀⢸⣂⠐⠃⠀⠈⠢⠆⢠⢂⠀⠀⡘⠀⠀⢌⡅⠀⠀⠐⠀⠀⡀⠀⠀⠀
⠀⠙⢙⣿⣿⣿⣿⡁⠀⠈⣿⣿⣿⣿⣿⣿⣯⣾⣿⠟⢛⣩⣿⣿⣿⣿⣿⣿⣯⣥⣴⣶⣶⣶⣮⣝⣿⣿⣷⣮⠿⠠⠤⠀⡀⠂⠈⠂⠄⠄⠀⠀⠈⠠⠄⡀⠀⠀⠁⠀⠀⠤⠀⠀⠀
⠀⢠⣾⣿⣿⣿⣿⠇⠄⠂⠙⠻⢻⣿⣿⣿⣿⣿⣧⣠⣾⣿⢿⣿⣿⣿⣿⣿⣿⣿⣻⣿⣿⣛⠻⣿⣿⣿⡿⣿⡄⠐⠅⠠⠁⠀⠐⠑⠐⠀⠀⠐⠀⠂⠀⠂⠀⠀⠠⠀⠂⠀⠀⠀⠀
⠀⢸⣿⣿⣿⣿⣿⠀⠐⠃⠀⠀⢸⣿⣿⡟⣿⣿⣿⡿⢟⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣮⡛⢿⣿⣿⢿⡗⠅⠀⠈⠠⠂⠀⠂⠌⠑⠀⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢸⣿⣿⣿⣿⡛⠀⡀⠀⠄⣤⣾⣿⣟⣼⣿⣿⣿⣴⣿⣿⢯⣿⣿⣿⣿⢿⣿⡟⠻⠿⣿⣿⣿⣿⣿⣦⣹⣿⠀⠀⠔⣦⢄⠀⠀⢀⠄⠂⠈⠀⠀⡁⠀⠤⠀⠀⠀⡀⠀⠀⠀⢀⠀

`,
        story_choices: [
            {
                choice_text: "Go to the pit",
                next_branch: "Pit init"
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