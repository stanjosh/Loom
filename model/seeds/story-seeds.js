const Story = require("../Story")
const storyData = [

    {
        user_id: "",
        reference_id: "1",
        story_title: "Awakened to Madness",
        story_content: "Waking up with no memory and a dark past leads you to discover not just where you are but who.",
    },
    {
        user_id: "",
        reference_id: "2",
        story_title: "Story Title # 2",
        story_content: "This is a preface to the story.",
    }
   
]

const storySeeds = async (users) => {
    storyData.forEach((story) => {
    story.user_id = users[0]
    });
    console.log(storyData)
    await Story.bulkCreate(storyData)
  };



module.exports = storySeeds;