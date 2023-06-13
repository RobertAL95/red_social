const express = require('express');
const swaggerUI = require('swagger-ui-express');
const user = require('../api/components/user/network');
const post = require('../api/components/post/network')
const swaggerDoc = require('../api/Swagger.json');
const auth = require('../api/components/auth/network');
const errors = require('../network/errors.js');


const router = express.Router();

router.use('/api/user', user);
router.use('/api/auth', auth);
router.use('/api/post', post);
router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
router.use(errors);


module.exports = router;


