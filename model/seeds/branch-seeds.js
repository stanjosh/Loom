const { Choice, Story, Branch } = require("..");



const branchData = [

    {   
        story_reference_id: "andrew's story",
        reference_id: "1",
        start_here: true,
        branch_title: "This is the title to the starting branch",
        branch_content: 
        `This is what happened and where you are. You are here.
        You find a small carrot. It is rotten.`,
        story_choices: [
            {
                choice_text: "Go east and find your dad who is probably still at the store",
                next_branch: "2"
            },
            {
                choice_text: "Go west and get a hamburger",
                next_branch: "3"
            },

        ]
    },
    {
        story_reference_id: "andrew's story",
        reference_id: "2",
        branch_title: "East of the starting point",
        branch_content: "You go east. Your dad is not here",
        received_item: "Coconut",
        story_choices: [

        ]
    },

    {
        story_reference_id: "andrew's story",
        reference_id: "3",
        branch_title: "Dairy Queen.",
        branch_content: "You're at Dairy Queen.",
        story_choices: [

        ]
    }

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
        branchUUIDs[branch.reference_id] = branch.id;
    });

    //assign branch and story UUIDs or null to story choice objects 
    // and return only story choice objects as array to be created
    
    let storyChoicesData = []
    console.log(branchData)
    branchData.forEach((branchStoryChoices) => {
        
        let branch_id = branchUUIDs[branchStoryChoices.reference_id]
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