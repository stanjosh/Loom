const router = require('express').Router();
const { db } = require('../model') 




const parseInventory = (inventory, branchData) => {
    try {
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
    } catch(err) {
        console.log(err)
    }
    return inventory
}

const storeHistory = (branchHistory, branchData) => {
    try {
        if (branchData) {
            let branchHistoryEntry = {}
            branchHistoryEntry[branchData.id] = branchData.branch_title
            branchHistory.length < 6 
            ? branchHistory.push(branchHistoryEntry)
            : branchHistory.shift(branchHistoryEntry)
        } else {
            console.log('no branch data for history')
            return new Error('No branch data for history')
        }
    } catch(err) {
        console.log(err)
    }
    console.log(branchHistory)
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

router.post('/story/:view/', async (req, res) => {
    // let layout = `${req.params.view}.hbs`
    let newBranchData = req.body.branchData
    let newStoryData = req.body.storyData
    newStoryData['user_id'] = req.session.user_id
    
    let newStory = await db.createStory(newStoryData)

    newBranchData['user_id'] = req.session.user_id
    newBranchData['story_id'] = newStory.id
    
    req.session.branchData = newBranchData 
        ? newBranchData.get({plain:true}) 
        : null

    branchHistory = storeHistory(req.session.branchHistory, req.session.branchData)
    storyInventory = parseInventory(req.session.storyInventory, req.session.branchData)
    req.session.branchHistory = branchHistory
    req.session.storyInventory = storyInventory

    req.session.save(() => res.redirect(`/branch/${req.params.view}`))
})

router.post('/branch/:view/', async (req, res) => {
    let data = {
        newBranchData : {
            user_id : req.session.user_id,
            story_id : req.session.branchData.story_id,
            ...req.body.newBranchData
        },
        newChoiceData : {
            user_id : req.session.user_id,
            story_id : req.session.branchData.story_id,
            branch_id : req.session.branchData.id,
            ...req.body.newChoiceData
        }
    }

    let branchData = await db.createBranch(data)
    console.log("!!!" + req.params.view + "!!!")
    req.session.save(() => res.redirect(`/branch/${req.params.view}/${branchData.id}`))
})

router.get('/branch/:view/:id', async (req, res) => {
    if (req.session.loggedIn) {
        // let layout = `${req.params.view}.hbs`
        let newBranchData = await db.getBranch(req.params.id)

        req.session.branchData = newBranchData 
            ? newBranchData.get({plain:true}) 
            : null

        console.log(req.session.branchHistory)
        console.log(req.session.storyInventory)
        branchHistory = storeHistory(req.session.branchHistory, newBranchData)
        storyInventory = parseInventory(req.session.storyInventory, newBranchData)
        req.session.branchHistory = branchHistory
        req.session.storyInventory = storyInventory

        req.session.save(() => res.redirect(`/branch/${req.params.view}`))
    } else {
        res.redirect('/')
    }
});


router.get('/branch/:view', async (req, res) => {
    let layout = `${req.params.view}.hbs`
    
    req.session.branchData 
        ? res.render('branch', { layout: layout })
        : res.render('error', { 
            layout: layout, 
            error: `No branch found there, pal.` 
        })
})





router.use((req, res) => {
    res.render('error', { 
        layout: 'monitor.hbs', 
        error: "404 - one of us made a wrong turn somewhere."})
})




module.exports = router;