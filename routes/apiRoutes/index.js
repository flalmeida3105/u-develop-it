const router = require('express').Router();

router.use(require('./candidateRoutes'));
router.use(require('./partyRoutes'));
router.use(require('./voterRoutes.js'));
router.use(require('./voteRoutes.js'));

module.exports = router;