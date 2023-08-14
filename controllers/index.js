const router = require('express').Router();
const branchRoutes = require('./branch-routes');
const storyRoutes = require('./story-routes');
const userRoutes = require('./user-routes');

const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
        res.redirect('home', { message: "You are not logged in!"})
    } else next()
}

router.use('/api/branch', branchRoutes);
router.use('/api/story', storyRoutes);
router.use('/user', userRoutes);



module.exports = router;