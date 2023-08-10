
const Branch = require("../Branch")
const branchData = [

    {
        reference: "1",
        branch_title: "This is the title to the starting branch",
        branch_content: "This is what happened and where you are",
        story_choices: [
            {
                text: "Go east and find your dad who is probably still at the store",
                branch: "2"
            },
            {
                text: "Go west and get a hamburger",
                branch: "3"
            },
            {
                text: "lay down and take a nap",
                branch: "4"
            }
        ]


    },
    {
        reference: "2",
        branch_title: "You go east. Your dad is not here.",
        branch_content: "This is what happened and where you are",
        story_choices: [
            {
                text: "Go west and back to where you started",
                branch: "1"
            },
            {
                text: "Look for trinkets",
                branch: "5"
            }
        ]
    },

    {
        reference: "3",
        branch_title: "Dairy Queen.",
        branch_content: "You're at Dairy Queen.",
        story_choices: [
            {
                text: "Get a burger",
                branch: "6"
            },
            {
                text: "Get a shake",
                branch: "7"
            }
        ]
    }

]

const branchSeeds = Branch.bulkCreate(branchData)

module.exports = branchData;
