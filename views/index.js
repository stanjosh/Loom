const router = require('express').Router();
const { db } = require('../model') 




const parseInventory = (inventory, branchData) => {
    try {
        if (branchData.received_item || branchData.removed_item) {
        let receivedItem = branchData.received_item ? branchData.received_item: null
        let removedItem = branchData.removed_item ? branchData.removed_item: null
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
    return inventory ? inventory : []
}

const storeHistory = (branchHistory, branchData) => {
    try {
        if (branchData) {
            let branchHistoryEntry = {
                branch_id : branchData.id,
                title: branchData.branch_title
            }

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

router.post('/branch/:view/', async (req, res) => {
    if (req.session.loggedIn) {
        let data = {
            user_id : req.session.user_id,
            branch_id : req.session.branchData ? req.session.branchData.id : null,
            newBranchData : req.body.newBranchData,
            story_id : req.body.newStoryData ? null : req.session.branchData.story_id,
            newStoryData : req.body.newStoryData ? req.body.newStoryData : null,
            newChoiceData : req.body.newChoiceData ? req.body.newChoiceData : null,
        }
        let branchData = await db.createBranch(data)
        req.session.save(() => res.redirect(`/branch/${req.params.view}/${branchData.id}`))
    } else {
        res.redirect('/')
    }
})

router.get('/start/:view/:id', async(req, res) => {
    if (req.session.loggedIn) {
        req.session.storyInventory = []
        req.session.branchHistory = []
        req.session.save(() => res.redirect(`/branch/${req.params.view}/${req.params.id}`))
    } else {
        res.redirect('/')
    }
})

router.get('/branch/:view/:id/', async (req, res) => {
    
    if (req.session.loggedIn) {

        // let layout = `${req.params.view}.hbs`
        let newBranchData = await db.getBranch(req.params.id);

        req.session.branchData = newBranchData 
            ? newBranchData.get({plain:true}) 
            : null;

        branchHistory = storeHistory(req.session.branchHistory, newBranchData);
        storyInventory = parseInventory(req.session.storyInventory, newBranchData);
        req.session.branchHistory = branchHistory;
        req.session.storyInventory = storyInventory;

        req.session.save(() => {

            res.redirect(`/branch/${req.params.view}`)
        });
        
    } else {
        res.redirect('/')
    }
});


router.get('/branch/:view', async (req, res) => {
    let layout = `${req.params.view}.hbs`
    if (req.session.loggedIn) {
    req.session.branchData 
        ? res.render('branch', { layout: layout })
        : res.render('error', { 
            layout: layout, 
            error: `No branch found there, pal.` 
        })
    } else {
        res.redirect('/')
    }
})





router.use((req, res) => {
    res.render('error', { 
        layout: 'monitor.hbs', 
        error: "404 - one of us made a wrong turn somewhere."})
})




module.exports = router;