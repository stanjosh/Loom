const { StoryChoice, Story, Branch } = require("..");



const branchData = [

    {   
        story_id: "1",
        reference_id: "1",
        branch_title: "This is the title to the starting branch",
        branch_content: "This is what happened and where you are",
        story_choices: [
            {
                choice_text: "Go east and find your dad who is probably still at the store",
                next_branch: "East of the starting point"
            },
            {
                choice_text: "Go west and get a hamburger",
                next_branch: "Dairy Queen."
            },
            {
                choice_text: "lay down and take a nap",
                next_branch: "You lay down and take a nap..."
            }
        ]
    },
    {
        story_id: "1",
        reference_id: "2",
        branch_title: "East of the starting point",
        branch_content: "You go east. Your dad is not here",
        story_choices: [
            {
                choice_text: "Go west and back to where you started",
                next_branch: "Well, you're back at the start."
            },
            {
                choice_text: "Look for trinkets",
                next_branch: "You look for treasure in the general area."
            }
        ]
    },

    {
        story_id: "1",
        reference_id: "3",
        branch_title: "Dairy Queen.",
        branch_content: "You're at Dairy Queen.",
        story_choices: [
            {   
                
                choice_text: "Get a burger",
                next_branch: "You order a burger from the lady at the counter."
            },
            {
                choice_text: "Get a shake",
                next_branch: "You order a shake from the lady at the counter."
            }
        ]
    }

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