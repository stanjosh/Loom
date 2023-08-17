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

router.get('/branch/create/:choice_id', async (req, res) => {
    req.session.createBranchChoice_id = req.params.choice_id
    req.session.save(() => res.redirect('/branch/create'));
});

router.get('/branch/create/', async (req, res) => {
    res.render('create', { choice_id : req.params.choice_id })    
});

router.get('/story/:id', async (req, res) => {
    req.session.storyInventory=[]
    let branchData = await db.getBranch(branchID=null, storyID=req.params.id)
    req.session.branchData = branchData 
        ? branchData.get({plain:true}) 
        : null
    
    let historyEntry = {}
    historyEntry[branchData.id] = branchData.branch_title
    
    req.session.branchHistory.push(historyEntry)

    req.session.branchData 
        ? req.session.save(() => res.redirect('/branch')) 
        : res.render('error', { 
            error: `No branch found there, pal.` 
        })

});

router.get('/branch/:id', async (req, res) => {
    let branchData = await db.getBranch(branchID=req.params.id, storyID=null)
    req.session.branchData = branchData 
        ? branchData.get({plain:true}) 
        : null
    
    let historyEntry = {}
    historyEntry[branchData.id] = branchData.branch_title
    
    req.session.branchHistory.push(historyEntry)

    req.session.branchData 
        ? req.session.save(() => res.redirect('/branch')) 
        : res.render('error', { 
            error: `No branch found there, pal.` 
        })

});



router.get('/branch', async (req, res) => {
    if (req.session.loggedIn) {
        let inventory = req.session.storyInventory
        let receivedItem = req.session.branchData.received_item ? req.session.branchData.received_item : null
        let removedItem = req.session.branchData.removed_item ? req.session.branchData.removed_item : null
        if (receivedItem && !inventory.includes(receivedItem)) {
            req.session.storyInventory.push(receivedItem)
        }
        if (removedItem && inventory.includes(removedItem)) {
            req.session.storyInventory = inventory.filter(item => item !== removedItem)
        }
        req.session.save(() => res.render('branch'))
    } else {
        res.redirect('/')
    }
})

router.post('/story/', async (req, res) => {

    let newBranchData = req.body.branchData
    let newStoryData = req.body.storyData
    newStoryData['user_id'] = req.session.user_id
    
    let newStory = await db.createStory(newStoryData)

    newBranchData['user_id'] = req.session.user_id
    newBranchData['story_id'] = newStory.id
    await db.createBranch(newBranchData)

    req.session.save(() => res.redirect('/'))
})


router.post('/branch/', async (req, res) => {

    let currentBranch = req.session.branchData
    let newBranchData = req.body.branchData
    let newChoiceData = req.body.choiceData

    if (newChoiceData.next_branch === 'null') {
        newBranchData['user_id'] = req.session.user_id
        newBranchData['story_id'] = currentBranch.story_id
        let newBranch = await db.createBranch(newBranchData)
        newChoiceData['next_branch'] = newBranch.id
    }
    newChoiceData['user_id'] = req.session.user_id
    newChoiceData['branch_id'] = currentBranch.id
    newChoiceData['story_id'] = currentBranch.story_id

    await db.createChoice(newChoiceData)
    
    req.session.branchData = await db.getBranch(branchID=newChoiceData.next_branch)
    req.session.save(() => res.redirect('/branch'))
})


router.get('/story/new', async (req, res) => {  
    res.render('create', { stories: storyData });
});


router.use((req, res) => {
    res.render('error', { error: "One of us made a wrong turn somewhere."})
})




module.exports = router;