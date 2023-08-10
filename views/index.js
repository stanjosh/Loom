const router = require('express').Router();
const { db } = require('../model') 

router.use(async (req, res, next) => {
    res.locals.session = req.session;
    next();
})


router.get('/', async (req, res) => {
    let storyData = await db.getAllStories();  
    res.render('home', { stories: storyData });
});

router.get('/story', async (req, res) => {
    let storyData = await db.getAllStories();   
    res.render('story', { stories: storyData });
});

router.get('/story/:storyID/branch/:branchID', async (req, res) => {
    let storyData = await db.getStory(req.params.storyID)   
    res.render('story', { story: storyData, branch: req.params.branchID });
});

router.get('/create/story', async (req, res) => {  
    res.render('create', { stories: storyData });
});

router.get('/create/branch/:branchID', async (req, res) => {
    let storyData = await db.getStory(req.params.storyID)
    res.render('create', { story: storyData, branch: req.params.branchID });
});

router.get('/dashboard', async (req, res) => {
    let storyData = await db.getUserStories(req.session.user_id);   
    res.render('story', { stories: storyData });
});


module.exports = router;