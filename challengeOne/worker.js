const {
    Worker, isMainThread, parentPort,
  } = require('node:worker_threads');


function *generateRandomNumber(max=999999999999999) {
    while(true){
        const number = Math.floor(Math.random() * max);
        yield number;
    }
}

function *generateRandomChar() {
    while(true){
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const index = Math.floor(Math.random() * characters.length);
        yield characters[index]
    }
}

function *generateRandomDecimal() {
    while(true){
        const number = Math.random() * 10;
        yield number;
    }
}

function *generateRandomAlphanumeric() {
  const genChar = generateRandomChar()
  const genNumber =generateRandomNumber(10)
  const genPadding = generateRandomNumber(8)
  const genOrder = generateRandomNumber(2)
  while(true){
      const alpha = genChar.next().value
      const number = genNumber.next().value
      const padding = genPadding.next().value
      const output = genOrder.next().value === 1 ? alpha+String(number) : String(number)+alpha;
      yield output.padStart(padding).padEnd(10);
  }
}

function *pickOne(generators=[generateRandomChar(), generateRandomNumber(), generateRandomDecimal(), generateRandomAlphanumeric()]) {
    const genSelection = generateRandomNumber(generators.length)
    while(true){
        const index = genSelection.next().value
        yield generators[index].next().value;
    }
}
  
  if (isMainThread) {
    module.exports = function parseJSAsync() {
      return new Promise((resolve, reject) => {
        const worker = new Worker(__filename);
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
          if (code !== 0)
            reject(new Error(`Worker stopped with exit code ${code}`));
        });
      });
    };
  } else {
    const store = [];
    let howBig = 0;

    while(howBig < 999_999){
        const value = String(pickOne().next().value)
        store.push(value);
        howBig += value.length
    }
    parentPort.postMessage(store.join(','));
  } 