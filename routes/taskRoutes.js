const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/test', auth , (req,res) => {
    res.json({
        message : 'Task routes are working!',
        user : req.user
    });
});

//CRUD operation for authenticated users


module.exports = router;