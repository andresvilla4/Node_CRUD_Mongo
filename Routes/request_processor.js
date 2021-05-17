const express = require('express');
const app = express();

app.use(require('../DB/users/use_functions'));

module.exports = app;