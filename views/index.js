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

router.get('/story/:id', async (req, res) => {
    let storyData = await db.getStory(req.params.id);   
    res.render('story', { story: storyData });
});

router.get('/story/:id/start', async (req, res) => {
    console.log(req.params.id)
    let branchData = await db.getBranch(branchID=null, start=true, storyID=req.params.id);
    console.log(branchData)
    res.render('branch', { branch: branchData.get({plain: true}) });
});

router.get('/branch/:id', async (req, res) => {
    console.log(req.params.id)
    let branchData = await db.getBranch(branchID=req.params.id);
    console.log(branchData)
    res.render('branch', { branch: branchData.get({plain: true}) });
});

router.get('/branch/', async (req, res) => {
    res.render('create');
});

router.post('/branch/', async (req, res) => {

    let newBranchID = await db.createBranch(req.session.user_id, req.body)
    
    res.redirect(`/branch/${newBranchID}`)
});

router.get('/story/:branchID', async (req, res) => {
    let branchData = await db.getBranch(req.params.branchID);
    res.render('branch', { branch: branchData });
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