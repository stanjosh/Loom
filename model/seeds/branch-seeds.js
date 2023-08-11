const { StoryChoice, Story, Branch } = require("..");



const branchData = [

    {   
        story_id: "1",
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
        story_id: "1",
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
        story_id: "1",
        reference_id: "3",
        branch_title: "Flashlight description",
        branch_content: "You notice the flashlight does not have batteries but you take it anyway",
        story_choices: [
            {   
                
                choice_text: "Exit the room",
                next_branch: "Hospital Halls"
            }
        ]
    },
    {   
        story_id: "1",
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
                next_branch: "Stairwell Hallway"
            }
        ]
    },
    {   
        story_id: "1",
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
        story_id: "1",
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
        story_id: "1",
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
        story_id: "1",
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
        story_id: "1",
        reference_id: "9",
        branch_title:"Stairwell Hallway",
        branch_content:
         `The one unlocked door is to the stairwell.
          There is nothing blocking from going up or down`,
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
                choice_text: "Go back",
                next_branch: "Hospital Halls"
            },
        ]
    },

]







const branchSeeds = async (storyRefUUIDs, userUUIDs) => {
    // assign story UUIDs to branches
    console.log(storyRefUUIDs)
    branchData.forEach((branch) => {
        branch.story_id = storyRefUUIDs[branch.story_id]
        branch.user_id = userUUIDs[0]
    })
    
    // create branch data so we can get the UUIDs and have it return the 
    // objects and clean them up
    let branches = await Branch.bulkCreate(branchData, { returning: true});
    branches = branches.map(branch => branch.get({ plain: true }));

    //assign the UUIDs to the local data
    let branchUUIDs = {};
    branches.forEach((branch) => {
        branchUUIDs[branch.reference_id] = branch.id;
    });
    //assign branch and story UUIDs or null to story choice objects 
    // and return only story choice objects as array to be created

    let storyChoicesData = []

    branchData.forEach((branchStoryChoices) => {
        let branch_id = branchUUIDs[branchStoryChoices.reference_id]
        branchStoryChoices = branchStoryChoices.story_choices
        branchStoryChoices.forEach((branchStoryChoice) => {
            branchStoryChoice.branch_id = branch_id
            storyChoicesData.push(branchStoryChoice)
        })
    })
    console.log(storyChoicesData)
    await StoryChoice.bulkCreate(storyChoicesData)

}


module.exports = branchSeeds;