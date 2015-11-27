# Simple example of setting up node with webpack.

## Demonstrates:
1. Using externals to for node libraries
2. Using babel to use ES6/ES7
3. Use of ES7 async/await
4. Converting nodebacks to promises


## Install

Assuming you're using nvm...We built this with node 5.0.

```
nvm use
npm i
```

## Build with Babel

This copies puts the files in `/lib`

```
scripts/build
```

## Lint
```
scripts/lint
```

## Try It

### Very simple example with async/await:
```
node lib/example1/example1.js
```

### Example with a node and external package being called:

Prints directory contents
```
node lib/example2/example2.js
```

Or your home directory
```
node lib/example2/example2.js ~
```

## References
* [Backend Apps with Webpack (Part I)](http://jlongster.com/Backend-Apps-with-Webpack--Part-I)

## Debugger

```
npm i -g node-inspector
npm i -g babel-node-debug
```

Then to run the example with the debugger:
```
node-debug dist/example1-bundle.js
```


# Alternate Webpack Instructions
## Start webpack

```
npm run watch
```
## Try It

### Very simple example with async/await:
```
node dist/example1.bundle.js
```

### Example with a node and external package being called:
Prints directory contents
```
node dist/example2.bundle.js
node dist/example2.bundle.js ~
```

## References
* [Backend Apps with Webpack (Part I)](http://jlongster.com/Backend-Apps-with-Webpack--Part-I)
