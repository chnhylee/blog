const express = require('express');
const router = express.Router();
router.use('/',async function(req,res){
    res.send('ok')
})
module.exports = router;