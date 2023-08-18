const router = require('express').Router();
const { db } = require('../model') 




const parseInventory = (inventory, branchData) => {
    if (branchData.received_item || branchData.removed_item) {
    let receivedItem = branchData.received_item ? branchData.received_item : null
    let removedItem = branchData.removed_item ? branchData.removed_item : null
        if (receivedItem && !inventory.includes(receivedItem)) {
            inventory.push(receivedItem)
        }
        if (removedItem && inventory.includes(removedItem)) {
            inventory = inventory.filter(item => item !== removedItem)
        }
    }
    return inventory
}

const storeHistory = (branchHistory, branchData) => {
    let branchHistoryEntry = {}
    branchHistoryEntry[branchData.id] = branchData.branch_title
    branchHistory.length < 6 
        ? branchHistory.push(branchHistoryEntry)
        : branchHistory.shift(branchHistoryEntry)
    return branchHistory
}


router.use(async (req, res, next) => {
    res.locals.session = req.session;
    
    next()
})

router.get('/', async (req, res) => {
    let storyData = await db.getAllStories();  
    res.render('home', { stories: storyData });
});

router.get('/branch/:view/:id', async (req, res) => {
    let layout = `${req.params.view}.hbs`
    let branchData = await db.getBranch(req.params.id)

    req.session.branchData = branchData 
        ? branchData.get({plain:true}) 
        : null

    req.session.branchHistory = storeHistory(req.session.branchHistory, branchData)
    req.session.storyInventory = parseInventory(req.session.storyInventory, branchData)

    req.session.save(() => res.render('/branch', { layout: layout }))
});

router.get('/branch', async (req, res) => {
    req.session.branchData 
        ? res.render('/branch')
        : res.render('error', { 
            error: `No branch found there, pal.` 
        })
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
    
    req.session.branchData = await db.getBranch(branchID)
    req.session.save(() => res.redirect('/branch'))
})


router.get('/story/new', async (req, res) => {  
    res.render('create', { stories: storyData });
});


router.use((req, res) => {
    res.render('error', { error: "404 - one of us made a wrong turn somewhere."})
})




module.exports = router;