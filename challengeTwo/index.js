const fs = require('fs')

const RANDOM_TXT_PATH = process.env.RANDOM_TXT_PATH || __dirname+'/../challengeOne/random.txt';
const LOG_LABEL='Challenge2'

const fd = fs.openSync(RANDOM_TXT_PATH, 'r')
const buf = Buffer.alloc(1000)

function readRandomText(file=fd, buffer=buf){
    console.time(LOG_LABEL);
    let position = 0;
    let remainder = ''
    while(true){
        const bytesRead = fs.readSync(file, buffer, 0, 1000, position);
        position += bytesRead

        const randomObjects = remainder+buffer.toString();
        const lastComma = bytesRead === 1000 ? randomObjects.lastIndexOf(',') : bytesRead+remainder.length
        const toPrint = randomObjects.slice(0, lastComma)
        
        remainder = randomObjects.slice(lastComma, bytesRead+remainder.length)
        
        toPrint.replaceAll(' ', '').split(',').map(logByType)

        if(bytesRead === 0) break;
    }
    console.timeEnd(LOG_LABEL);
}

function logByType(randomObject){
    if(Number(randomObject)){
        if(randomObject.indexOf('.') > -1) console.log('Real number:  ', randomObject)
        else                               console.log('Integer:      ', randomObject)
    } else {
        if(randomObject.length === 1)      console.log('Alphabetical: ', randomObject)
        else if(randomObject)              console.log('Alphanumeric: ', randomObject)
    }
}

module.exports = readRandomText;