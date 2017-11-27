const express = require('express');
const router = express.Router();
const input = require('../file/input.js');
const path = require('path');
const util = require('util');



/* Accessing File adventures-of-sherlock-holmes.txt. */
var fileName = "adventures-of-sherlock-holmes.txt"
var filePath = path.join(__dirname , "../" + fileName);

router.get('/input', function(req, res, next) {
    var response = input.readFile(filePath).then(response =>{
        console.log(util.inspect(response));
        res.render('response', {
            response: response.sampleText
        });
    });
});

router.get('/stat', function(req, res, next) {
    var response = input.getFileStats(filePath).then(response =>{
        console.log(util.inspect(response));
        res.render('response', {
            response: response
        });
    });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
      title: 'File Consumer',
      fileName: fileName,
  });
});

module.exports = router;
