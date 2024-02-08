const branchSeeds = require('./branch-seeds');
const userSeeds = require('./user-seeds');
const storySeeds = require('./story-seeds');
const sequelize = require('../../config/connection');
const { User, Story } = require('../');

const seedAll = async () => {

  await sequelize.sync({ force: true })
  console.log('\n----- DATABASE SYNCED -----\n')
    
  await userSeeds()
  console.log('\n----- USERS SEEDED -----\n')

  const randomUserIDs = async () => {
    let users = await User.findAll()
    users = users.map(user => user.get({ plain: true }))
    .map(user => user.id);
    return users
  }

  const userIDs = await randomUserIDs();


  await storySeeds(userIDs)
  console.log('\n----- STORIES SEEDED -----\n')

  const storyRefUUIDs = async () => {
    let storyUUIDs = {}
    let stories = await Story.findAll()
    stories = stories.map(story => story.get({ plain: true }));
    stories.forEach(story => storyUUIDs[story.reference_id] = story.id);
    return storyUUIDs
  }

  const storyIDs = await storyRefUUIDs()


  await branchSeeds(storyIDs, userIDs)
  console.log('\n----- BRANCHES AND CHOICES SEEDED -----\n')



  



  process.exit(0);
};



seedAll();
