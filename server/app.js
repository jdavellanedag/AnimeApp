require('../config/config');
const express = require('express');
const app = express();
const rootPath = process.env.ROOT_PATH;

const router = express.Router();

const anime = require('../api/routes/anime');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * API Routes
 */
router.use('/anime', anime);
app.use(rootPath, router);

module.exports = app;