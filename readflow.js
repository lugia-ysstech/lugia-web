/**
 *
 * create by ligx
 *
 * @flow
 */

const fs = require('fs');
const childProcess = require('child_process');
const container = [];
const fileNames = new Set();

function readLines (input, func) {
  let remaining = '';
  input.on('data', function(data) {
    remaining += data;
    let index = remaining.indexOf('\n');
    while ( index > -1 ) {
      const line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      func(line);
      index = remaining.indexOf('\n');
    }

  });

  input.on('end', function() {
    fs.writeFileSync(__dirname + '/flow-error-line.log', container.join('\n'));
    fs.writeFileSync(__dirname + '/flow-error-filename.log', [ ...fileNames ].join('\n'));
    if (remaining.length > 0) {
      func(remaining);
    }
  });
}

function func (data) {
  if (data.startsWith('Error -----------')) {
    const fileName = data.split(':')[ 0 ].split(' ')[ 2 ];
    fileNames.add(fileName);
    container.push(data);
  }
}

const input = fs.createReadStream(__dirname + '/flow-error-detail.log');
readLines(input, func);

