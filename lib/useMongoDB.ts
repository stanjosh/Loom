import connectMongo from "./mongodb";
import { Branch, User, Story } from "./models/index";

const useMongoDB = {
    getBranch: async (id) => {
        console.log('id', id);
        await connectMongo();
        const branchData =  await Branch.findById(id);
        return branchData;

    },

    getStory:  async (id) => {
    await connectMongo();
    const storyData =  await Story.findById(id);
    return storyData;
    },

    getUser: async (id) => {
        await connectMongo();
        const userData =  await User.findById(id);
        return userData;
    },

    getBranches: async () => {
        await connectMongo();
        const branchData =  await Branch.find();
        return branchData;
    },

    getStories: async () => {
        await connectMongo();
        const storyData =  await Story.find();
        return storyData;
    },

    createBranch:  async (id, branchData) => {
        console.log(branchData)
        await connectMongo();
        const newBranchData = await Branch.create(branchData);
        const currentBranch = await Branch.findById(id);
        currentBranch.choices.push(newBranchData._id);
        currentBranch.save();
        return newBranchData;
    }
};

export default useMongoDB;

