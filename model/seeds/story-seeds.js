const Story = require("../Story")
const storyData = [

    {
        user_id: "",
        reference_id: "andrew's story",
        story_title: "Story Title # 1",
        story_content: "This is a preface to the story.",
    },
    {
        user_id: "",
        reference_id: "strahd",
        story_title: "Story Title # 2",
        story_content: "This is a preface to strahd story.",
    },
   
]

const storySeeds = async (users) => {
    storyData.forEach((story) => {
        story.user_id = users[0]
    });
    await Story.bulkCreate(storyData)
  };



module.exports = storySeeds;