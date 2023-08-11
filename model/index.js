const User = require('./User');
const Story = require('./Story');
const Branch = require('./Branch')
const StoryChoice = require('./StoryChoice')


Branch.belongsTo(Story, {
  foreignKey: 'story_id'
})

StoryChoice.belongsTo(Branch, {
  foreignKey: 'branch_id'
});

StoryChoice.hasOne(User, {
  foreignKey: 'user_id'
})
Story.hasOne(User, {
  foreignKey: 'user_id'
})
Branch.hasOne(User, {
  foreignKey: 'user_id'
})


User.hasMany(Branch);
User.hasMany(Story)
User.hasMany(StoryChoice)
Story.hasMany(Branch)
Branch.hasMany(StoryChoice);

module.exports = {
  User,
  Story,
  Branch,
  StoryChoice
};

const db = {

  createStory: async (story) => {
    return await Story.create(story)
    .catch((err) => {
      console.log(err)
      return err
    })
  },

  getStory: async (reference_id) => {
    let story = await Story.findAll({
      where: { reference_id : reference_id },
      raw: true,
      nest: true,
      include: [
        { model: User, 
          attributes: ["id", "author_name"], 
          as: "user" },
        { model: Branch,
          include: [ { model: StoryChoice } ] }
      ]
    })
    .catch((err) => {
      return err
    });
    return story
  },

  getUserStories: async (userId) => {
    let stories = await Story.findAll({
      where: { user_id : userId },
      raw: true,
      nest: true,
      include: [
        { model: User, 
          attributes: ["id", "author_name"], 
          as: "user" },
        { model: Branch,
          include: [ { model: StoryChoice } ] }
      ]
    })
    .catch((err) => {
      return err
    });
    return stories
  },

  getAllStories: async () => {
    let stories = await Story.findAll({
      raw: true,
      nest: true,
      include: [
        { model: User, 
          attributes: ["id", "author_name"], 
          as: "user" },
        { model: Branch,
          include: [ 
            { model: StoryChoice },

          ] },
      ],
    })
    .catch((err) => {
      return err
    });
    console.log(stories)
    return stories
  },

  createBranch: async (sessionUserId, branch) => {
    branch.user_id = sessionUserId
    console.log(branch)

    return await Branch.create(branch)
    .catch((err) => {
      console.log(err)
      return err
    })
    
  },

  getBranch: async (branchID=null, start=false, storyID) => {
    let branchTerms = start ? { start_here : true, story_id : storyID } : { id : branchID }
    console.log(branchTerms)
    return await Branch.findAll({
      where: branchTerms,
      raw: true,
      nest: true,
      include: [
        { model: Story, attributes: ['story_title']},
        { model: User, attributes: ['author_name'] },
        { model: StoryChoice, attributes: [
          'choice_text', 
          'choice_type', 
          'next_branch',  
          'required_item',  
          'fail_branch' 
        ]}
      ],
    })
    .catch((err) => {
      return err
    });
  },

  getBranches: async (branchID=null, start=false, storyID) => {
    return await Branch.findAll({
      raw: true,
      nest: true,
      include: [
        { model: Story, attributes: ['story_title']},
        { model: User, attributes: ['author_name'] },
        { model: StoryChoice, attributes: [
          'choice_text', 
          'choice_type', 
          'next_branch',  
          'required_item',  
          'fail_branch' 
        ]}
      ],
    })
    .catch((err) => {
      return err
    });
  },

  updateBranch: async (sessionUserId, branchID, branch) => {
    console.log(sessionUserId, branch)
    return await Branch.update(branch, { 
      where: { 
        id: branchID, 
        user_id: sessionUserId 
      } 
    })
    .catch((err) => {
      return err 
    });
  },

  deleteBranch: async (sessionUserId, branchId) => {
    console.log(sessionUserId, branchId)
    return await Branch.destroy({ 
      where: { 
        id: branchId, 
        user_id: sessionUserId 
      } 
    })
    .then((blog) => {
      return true
    })
    .catch((err) => {
      return err 
    });
  },

  deleteStory: async (sessionUserId, storyID) => {
    return await Story.destroy({ 
      where: { 
        id: storyID, 
        user_id: sessionUserId 
      } 
    })
    .then((story) => {
      return true
    })
    .catch((err) => {
      return err 
    });
    
  },

  createUser: async (user) => {
    console.log(user)
    return await User.create(user)
    .catch((err) => {
      console.log(err)
      return err
    })
  },

  getUser: async (id) => {
    return await User.scope('withoutPassword').findByPk(id, {
      plain: true,
      include: [{ model: Branch }, { model: Comment }],
    })
    .catch((err) => {
      return err
    });
  },

  updateUser: async (sessionUserId, userId, info) => {
    return await User.update(info, { 
      where: { 
        id: userId && sessionUserId 
      }, 
        individualHooks: true 
      })
    .catch((err) => {
      return false 
    });
  },

  authUser: async (user) => {
    console.log(user)
    let password = user.password;
    let authUser = await User.findOne({
      where: { email: user.email }
    })
    if (authUser) {
    return authUser.authenticate(password) ? authUser.toJSON() : false;
    } else {
      return false;
    }
  },
}

module.exports = { db, User, Story, Branch, StoryChoice };
