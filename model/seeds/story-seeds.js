const Story = require("../Story")
const { v4: uuidv4  } = require('uuid')

const storyData = [

    {
        id: uuidv4(),
        user_id: "",
        reference_id: "andrew's story",
        story_title: "Story Title # 1",
        story_content: "The Awakening.",
    },
    {
        id: uuidv4(),
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