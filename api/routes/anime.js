const express = require('express');
const app = express();
const api = require('../api');

app.get('/search/:query', (req, res) => {

    let query = req.params.query;
    api.search(query)
        .then(search => {
            res.status(200).json({
                search
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/details/:word/:id/:name', (req, res) => {
    let word = req.params.word;
    let id = req.params.id;
    let name = req.params.name;
    api.getDetailsAnimeByPath(word, id, name)
        .then(search => {
            res.status(200).json({
                search
            });
        })
        .catch((err) => {
            console.log(err);
        });
})

module.exports = app;