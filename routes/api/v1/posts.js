const express = require('express');
const passport = require('passport')
const router = express.Router();
require('../../../config/passport-jwt-strategy.js')
const postApi = require('../../../controllers/api/v1/posts_api')
router.delete('/:id' , passport.authenticate('jwt' , {session:false}) ,postApi.destroy)
// To prevent session cookie generate we will put here false

router.get('/' , postApi.index);
module.exports = router;