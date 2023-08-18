const { User } = require('../');
const { v4: uuidv4  } = require('uuid')

const userData = [
  {
    id: uuidv4(),
    email: 'gorp@gorpy.com',
    author_name: 'Ralph Gorp',
    password: 'password123',
    admin: true
  },
  {
    id: uuidv4(),
    email: 'me@cake.bum',
    author_name: 'Shoe McGee',
    password: 'password123'
  },
  {
    id: uuidv4(),
    email: 'john@rugcleaning.net',
    author_name: 'John Johnson',
    password: 'password123'
  },
  {
    id: uuidv4(),
    email: 'billbill231@yahoo.com',
    author_name: 'bill billson',
    password: 'password123'
  },
  {
    id: uuidv4(),
    email: 'steve@grillmaster.org',
    author_name: 'Steven Stevenstein',
    password: 'password123'
  },
];



const userSeeds = () => User.bulkCreate(userData, { individualHooks: true });



module.exports = userSeeds;
