const router = require('express').Router();
const { db } = require('../model')


router.post('/', async (req, res) => {
    req.body.user_id = req.session.user_id;
    return await db.createStory(req.body)
  .then((story) => {
    return res.status(200).json(story);
  })
  .catch((err) => {
    console.log(err)
    return res.status(500)
  })
});

router.get('/:id', async (req, res) => {
  return db.getStory(req.params.id)
  .then((story) => {
    return res.status(200).json(story);
  })
  .catch((err) => {
    console.log(err)
    return res.status(500)
  })
});

router.get('/', async (req, res) => {
  return db.getAllStories()
  .then((stories) => {
    return res.status(200).json(stories);
  })
  .catch((err) => {
    console.log(err)
    return res.status(500)
  })
});

router.delete('/:id', async (req, res) => {
    await db.deleteStory(req.session.user_id, req.params.id)
    .then((story) => {
      console.log(story)
      return res.status(200).send("Successfuly deleted story")
    })
    .catch((err) => {
      console.log(err)
      return res.status(500)
    })
});`1`




module.exports = router;
