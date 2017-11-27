const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const util = require('util');

var readFile = function(filePath){
    return new Promise(function (resolve, reject){
        if (!fs.existsSync(filePath)) {
            console.log("No such file");
            reject("No such file");
            return;
        }

        var rstream = fs.createReadStream(filePath);

        // Use stream to process file
        var outstream = new stream;

        // Reads file line by line
        var rl = readline.createInterface(rstream, outstream);

        var lineCounter = 0;
        var avgLineLength = 0;
        var totalLength = 0;
        var maxLineLength = 0;

        var sampleTextLength = 10;
        var sampleText = "";

        rl.on('line', function(line) {

          // process line here
          console.log("line: " + lineCounter + " : "+  line );

          var lineSize = line.length;

          totalLength += lineSize;
          console.log("length : " + lineSize);
          console.log("length in bytes: " +  Buffer.byteLength(line, 'utf16') + " bytes");
          if(maxLineLength < lineSize){
              console.log("Changed***");
              maxLineLength = lineSize;
          }

          if(lineCounter < sampleTextLength){
              sampleText += line;
          }

          avgLineLength += line.length;
          lineCounter++;
        });

        rl.on('close', function() {
          console.log("Closed");
          console.log("Average Line length : " + avgLineLength/lineCounter);
          console.log("Max Line length : " + maxLineLength);
          console.log("Total File Length : " + totalLength);

          resolve({
              avgLineLength: avgLineLength/lineCounter,
              maxLength: maxLineLength,
              totalLength: totalLength,
              sampleText: sampleText
          });
        });
    });
}

var writeFile = function(filePath){
    var wstream = fs.createWriteStream(filePath);
    wstream.on('error', function(err) { console.error(err); });
    wstream.write("New File");
    wstream.end( function () {
        console.log('The length was:', dataLength);
    });
}

var getFileStats = function(filePath){
    return new Promise(function (resolve, reject) {
        if (!fs.existsSync(filePath)) {
            reject("No such file");
        }

        fs.stat(filePath, function(err, stats) {
            if (err) throw err;
            //console.log(util.inspect(stats));
            return resolve(stats);
        });
    });
}

module.exports = {
    readFile : readFile,
    getFileStats : getFileStats
}
