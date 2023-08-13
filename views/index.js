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
    let branchData = await db.getBranch(null, storyID=req.params.id)
    req.session.branchData = branchData 
        ? branchData.get({plain:true}) 
        : null
    
    req.session.branchData 
        ? req.session.save(() => res.redirect('/branch'))
        : res.render('error', { 
            error: `There doesn't seem to be a start branch there. <br>
            Do you want to <a href="/branch">start the story</a>?` 
        })
});

router.get('/branch/:id', async (req, res) => {
    let branchData = await db.getBranch(branchID=req.params.id, null)

    req.session.branchData = branchData 
        ? branchData.get({plain:true}) 
        : null
    
    req.session.branchData 
        ? req.session.save(() => res.redirect('/branch')) 
        : res.render('error', { 
            error: `There doesn't seem to be a branch there. <br>
            Do you want to <a href="/branch">make a branch</a>?` 
        })
});

router.get('/branch', async (req, res) => {
    res.render('branch')
})

router.post('/branch/', async (req, res) => {
    req.body.user_id = req.session.user_id
    req.body.story_id = req.session.branchData.story_id
    req.body.end_here = 'on' ? true : false

    let newBranch = await db.createBranch(req.body)
    let newChoicesData = prepareChoices(req.body, newBranch.id)
    await db.updateChoice(req.session.createBranchChoice_id, { 
        next_branch: newBranch.id 
    })
    console.log(newChoicesData)
    newChoicesData ? await db.createChoices(newChoicesData) : null
    
    req.session.branchData = await db.getBranch(newBranch.id)
    req.session.save(() => res.redirect('/branch'))
});

router.get('/story/new', async (req, res) => {  
    res.render('create', { stories: storyData });
});






router.use((req, res) => {
    res.render('error', { error: "One of us made a wrong turn somewhere."})
})




const prepareChoices = (data, newBranchID) => {
    console.log(data)
    let choicesData = [
    data.choice_text ? 
        { 
            user_id : data.user_id,
            branch_id : newBranchID,
            story_id : data.story_id,
            choice_text : data.choice_text,
            required_item : data.required_item 
                ? data.required_item 
                : null,
            next_branch : null
        }
    
    : null,

    data.choice_text_2 ? 
        { 
            user_id : data.user_id,
            branch_id :  newBranchID,
            story_id : data.story_id,
            choice_text : data.choice_text_2,
            required_item : data.required_item_2 
                ? data.required_item_2 
                : null,
            next_branch : null
        }
    
    : null,

    data.choice_text_3 ? 
        { 
            user_id : data.user_id,
            branch_id :  newBranchID,
            story_id : data.story_id,
            choice_text : data.choice_text_3,
            required_item : data.required_item_3 
                ? data.required_item_3 
                : null,
            next_branch : null
        }
    : null
    ]

    choicesData = choicesData.filter((choice) => choice != null)
    return choicesData.length > 0 ? choicesData : null
}



module.exports = router;