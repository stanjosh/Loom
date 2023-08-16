const User = require('./User');
const Story = require('./Story');
const Branch = require('./Branch')
const Choice = require('./Choice')
const BranchChoice = require('./BranchChoice')



User.hasMany(Story, {
  foreignKey: 'user_id'
})
Story.belongsTo(User)
User.hasMany(Branch, {
  foreignKey: 'user_id'
})
Branch.belongsTo(User)
User.hasMany(Choice, {
  foreignKey: 'user_id'
})
Choice.belongsTo(User)

Story.hasMany(Branch, {
  foreignKey: 'story_id'
})
Branch.hasMany(Choice)

Choice.belongsTo(Branch, {
  through: BranchChoice
})

Choice.belongsTo(Story)

Choice.hasOne(Branch, {
  foreignKey: 'branch_id'
})
Choice.belongsTo(Branch)

Branch.hasOne(Story, {
  foreignKey: 'branch_id'
})
Branch.belongsTo(Story)

module.exports = {
  User,
  Story,
  Branch,
  Choice
};

const db = {

  createStory: async (story) => {
    return await Story.create(story, {returning: true})
    .catch((err) => {
      console.log(err)
      return err
    })
  },

  getStory: async (id) => {
    let story = await Story.findByPk(id, {
      //raw: true,
      nest: true,
      include: [
        { model: User, 
          attributes: ["id", "author_name"], 
          as: "user" },
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
      plain: true,
      nest: true,
      include: [
        { model: User, 
          attributes: ["id", "author_name"], 
          as: "user" },
        { model: Branch,
          include: [ { model: Choice } ] }
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
      ],
    })
    .catch((err) => {
      return err
    });
    console.log(stories)
    return stories
  },


  createBranch: async (data) => {
    let branchData = await Branch.create(data, {returning: true})
    .catch((err) => {
      console.log(err)
      return err
    })
    
    return branchData
  },

  getBranch: async (branchID=null, storyID=null) => {
    let branchTerms = branchID 
      ? { id : branchID }
      : { start_here : true, story_id : storyID }
       
    let branchData = await Branch.findOne({
      where: branchTerms,
      plain: true,
      nest: true,
      include: [
        { model: Story, attributes: ['story_title']},
        { model: User, attributes: ['id', 'author_name'] },
        { model: Choice }
      ],
    })
    .catch((err) => {
      return err
    });
    return branchData
  },

  getBranches: async () => {
    return await Branch.findAll({
      plain: true,
      nest: true,
      include: [
        { model: Story, attributes: ['story_title']},
        { model: User, attributes: ['author_name'] },

      ],
    })
    .catch((err) => {
      return err
    });
  },

  getBranchTitles: async (storyID) => {
    return await Branch.findAll({
      attributes: ['id', 'branch_title'],
      // plain: true,
      // nest: true,
      where: {
        story_id: storyID
      }
    })
    .catch((err) => {
      return err
    });
  },

  updateBranch: async (sessionUserId, branchID, branch) => {
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

  createChoice: async (data) => {
    return await Choice.create(data, {returning: true})
    .catch((err) => {
      console.log(err)
      return err
    })
  },


  createChoices: async (data) => {
    console.log(data)
    return await Choice.bulkCreate(data, {returning: true})
    .catch((err) => {
      console.log(err)
      return err
    })
  },

  updateChoice: async (id, data) => {
    return await Choice.update(data, { 
      where : { id : id }
    })
    .catch((err) => {
      console.log(err)
      return err
    })
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
    return await User.create(user)
    .catch((err) => {
      console.log(err)
      return err
    })
  },

  getUser: async (id) => {
    return await User.scope('withoutPassword').findByPk(id, {
      plain: true,
      include: [{ model: Branch }, { model: Choice }],
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




module.exports = { db, User, Story, Branch, BranchChoice, Choice };
