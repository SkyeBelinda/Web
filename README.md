# µPad

µPad is an open digital note taking app.

Try it today at https://web.getmicropad.com

## What's going on with development?
There's a [Waffle](https://waffle.io/MicroPad/Web) board with what's in development. That board would also be a great place to look for cases to contribute to.

## Building MicroPad
You will need the following:  
- [https://yarnpkg.com/lang/en/](Yarn)
- [https://nodejs.org/en/](Node.js) (preferably >=v10.x)

### Installing dependencies
```bash
git clone https://github.com/MicroPad/Web micropad-web
cd micropad-web/app
yarn
```

### Running a dev server
```bash
yarn start
```
### Building for production
```bash
yarn test # not needed to build, but definitely a good idea to make sure these pass
yarn build
```
