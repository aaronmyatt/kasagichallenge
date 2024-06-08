const fs = require('node:fs/promises');
const generateAsync = require("./worker.js");

const RANDOM_TXT_PATH = process.env.RANDOM_TXT_PATH || __dirname+'/random.txt';
const LOG_LABEL='Challenge1'

const generateRandomText = (async function() {
    console.time(LOG_LABEL);
    const file = await fs.open(RANDOM_TXT_PATH, 'a');

    // 10 threads seems like the sweet spot
    const workers = Array.from({length: 10}, () => generateAsync());
    const resolvedWorkers = await Promise.all(workers);

    console.timeLog(LOG_LABEL);

    const writePromises = resolvedWorkers
                          .map(randomText => fs.appendFile(file, ','+randomText))
    await Promise.all(writePromises)
    
    console.timeEnd(LOG_LABEL);
    file.close()
});

module.exports = generateRandomText;