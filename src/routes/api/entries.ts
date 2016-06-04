import * as Entries from '../../data/entries';
import bodyParser = require('body-parser');
import express = require('express');
var router = express.Router();
var jsonParser = bodyParser.json();

/* GET home page. */
router.put('/entries', jsonParser, function(req, res, next) {
    let entry = <Entries.IEntry>req.body;
    Entries.save(entry);
});

router.post('/entries', jsonParser, function(req, res, next) {
    let entry = <Entries.IEntry>req.body;
    Entries.save(entry, (entry: Entries.IEntryModel) => {
        res.json(entry.toJSON());
    });
});

router.get('/entries', jsonParser, function(req, res, next) {
    Entries.all(entries => {
        res.json(entries);
    });
});

router.get('/entries/:id', jsonParser, function(req, res, next) {
    Entries.findEntryById(req.params.id, (entry: Entries.IEntryModel) => {
        res.json(entry.toJSON());
    });
});

router.delete('/entries/:id', (req, res, next) => {
    Entries.deleteEntryById(req.params.id, (entry: Entries.IEntryModel) => {
        res.json(entry.toJSON());
    });
})

module.exports = router;