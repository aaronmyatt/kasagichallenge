# Kasagi Labo Code Challenge

Tested with:
```js
node -v
v21.6.1
```

## Challenge One
Run with: `node -e "require('./challengeOne/index.js')()"`

Writes 10mb worth of comma separated random: integers, real numbers, alphabetical and alphanumeric strings to `./challengeOne/random.txt`

## Challenge Two
Run with: `node -e "require('./challengeTwo/index.js')()"`

Reads `./challengeOne/random.txt` to stdout.

## Challenge Three
Build the Docker container: 

`docker build -t kasagilabochallenge .`

Evaluate challenges one and two inside of the container and syncs `./random.txt` with the host:

`docker run -v $(pwd)/random.txt:/usr/src/app/random.txt kasagilabochallenge`

