const Story = require("../Story")
const storyData = [

    {
        user_id: "",
        reference_id: "1",
        story_title: "This is the title of the story",
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