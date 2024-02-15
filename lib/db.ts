import connectMongo from "./mongoose";
import { Branch, User, Story } from "./models/index";
import { type branchSchema } from "./models/Branch";

const db = {
    branch : {

        getOne: async (id: string) => {
            console.log('id', id);
            await connectMongo();
            const branchData =  await Branch.findById(id);
            return branchData;
        },

        getAll: async () => {
            await connectMongo();
            const branchData =  await Branch.find();
            return branchData;
        },

        create:  async (id: string, branchData: branchSchema) => {
            console.log(branchData)
            await connectMongo();
            const newBranchData = await Branch.create(branchData);
            const currentBranch = await Branch.findById(id);
            currentBranch.choices.push(newBranchData._id);
            currentBranch.save();
            return newBranchData;
        }

    },

    story: {

        getStory:  async (id: string) => {
            await connectMongo();
            const storyData =  await Story.findById(id);
            return storyData;
            },

        getAll: async () => {
            await connectMongo();
            const storyData =  await Story.find();
            return storyData;
        },
    },

    user: {

        getUser: async (id: string) => {
            await connectMongo();
            const userData =  await User.findById(id);
            return userData;
        },

        updateUser: async (id: string, userData: any) => {
            console.log('userData', userData);
            await connectMongo();
            const updatedUserData =  await User.findById(id)
            updatedUserData.theme = userData.theme;
            updatedUserData.save();            
            console.log('updatedUserData', updatedUserData);
            return updatedUserData;
        }

    }
};

export default db;

