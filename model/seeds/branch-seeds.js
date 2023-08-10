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
                next_branch: "2"
            },
            {
                choice_text: "Go west and get a hamburger",
                next_branch: "3"
            },
            {
                choice_text: "lay down and take a nap",
                next_branch: "4"
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
                next_branch: "1"
            },
            {
                choice_text: "Look for trinkets",
                next_branch: "5"
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
                next_branch: "6"
            },
            {
                choice_text: "Get a shake",
                next_branch: "7"
            }
        ]
    }

]







const branchSeeds = async (storyRefUUIDs, userUUIDs) => {
    branchData.forEach((branch) => {
        branch.story_id = storyRefUUIDs[branch.story_id]
        branch.user_id = userUUIDs[0]
    })
    
    

    await Branch.bulkCreate(branchData);

 
    let branchUUIDs = {}
    let branches = await Branch.findAll()

    branches = branches.map(branch => branch.get({ plain: true }))

    
    branches.forEach((branch) => {
        console.log(branch)
        branchUUIDs[branch.reference_id] = branch.id;
    });
    
    let choiceData = branchData.map((branch) => {
        branch.story_choices.forEach((choice) => {
            choice.branch_id = branchUUIDs[branch.reference_id];
            choice.next_branch = branchUUIDs[choice.next_branch] ? branchUUIDs[choice.next_branch] : null;
        })
        return branch.story_choices;
    });
    console.log(choiceData)

    // await StoryChoice.bulkCreate(choiceData)

}


module.exports = branchSeeds;