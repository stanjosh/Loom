import { Branch, Story } from './models/index.js';
import { Types } from 'mongoose';
import connectMongo from './mongodb.js';

type objectIdsListType = {
    [key: string]: Types.ObjectId;
};

const objectIdsList: objectIdsListType = {};

const mapObjectIds = (key: string) => {
    if (!objectIdsList[key]) {
        objectIdsList[key] = new Types.ObjectId();
    }
    return objectIdsList[key];
};


const fakeUserId = new Types.ObjectId();

const branchData = [
    {   
        _id: mapObjectIds('dirt path'),
        userId: fakeUserId,
        description: 'Dirt path',
        content:
         `You are standing on a dirt path. You see a house and a mailbox.`,
        choices: [
                mapObjectIds('house'),
                mapObjectIds('mailbox')
        ]
    },
    {
        _id: mapObjectIds('house'),
        userId: fakeUserId,
        description: 'Go to the house',
        content:
         `You walk up to the house and knock on the door. No one answers.`,
        choices: [
            mapObjectIds('dirt path')
        ]
    },
    {
        _id: mapObjectIds('mailbox'),
        userId: fakeUserId,
        description: 'Check the mailbox',
        content:
         `You open the mailbox and find a letter. It's addressed to you.`,
        choices: []
    }


];

const storyData = [
    {
        userId: fakeUserId,
        description: 'The house',
        branch: mapObjectIds('dirt path')
    }
];



const seed = async () => {
    await connectMongo();
    await Branch.deleteMany({});
    await Branch.insertMany(branchData);
    await Story.deleteMany({});
    await Story.insertMany(storyData);
    console.log('Branches seeded');
    process.exit(0);
};




seed();