const router = require('express').Router();
const { db } = require('../model');


router.get('/titles/:storyID', async (req, res) => {
  let branches = await db.getBranchTitles(req.params.storyID);
  if (branches) {
    return res.status(200).json(branches)
  }
  else {
    return res.status(404).send('No branches found')
  }
});


router.get('/:id', async (req, res) => {
  let branches = await db.getBranch(req.params.id);
  if (branches) {
    return res.status(200).json(branches)
  }
  else {
    return res.status(404).send('No branch found')
  }
});

router.get('/', async (req, res) => {
  let branches = await db.getBranches();
  if (branches) {
    return res.status(200).json(branches)
  }
  else {
    return res.status(404).send('No branches found')
  }
});




router.post('/', async (req, res) => {
    await db.createBranch(req.session.user_id, req.body)
      .then((branch) => {
        return res.status(200).json(branch);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  });


router.post('/', async (req, res) => {
  await db.createBranch(req.session.user_id, req.body)
    .then((branch) => {
      return res.status(200).json(branch);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
});

router.delete('/:id', async (req, res) => {

  await db.deleteBranch(req.session.user_id, req.params.id)
  .then((branch) => {
    return res.status(200).send("Successfuly deleted blog post")
  })
  .catch((err) => {
    console.log(err)
    return res.status(500).json(err);
  })
});







module.exports = router
