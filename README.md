# Journal App

## React Journal Application

## Install yarn
```
yarn
```
## Install React Router
```
yarn add react-router-dom
```
## To Install material ui should use:
```
yarn add @mui/material @emotion/react @emotion/styled

yarn add @fontsource/roboto

yarn add @mui/icons-material
```
## Technologies:

- Redux Devtools
- Thunks
- Google Sign in 
- Firebase -> Firestore

<hr >



## NOTE INSTALL JEST TEST WITH VITE:

### Install
```
yarn add --dev jest babel-jest @babel/preset-env @babel/preset-react 
yarn add --dev @testing-library/react @types/jest jest-environment-jsdom
```

### Install
```
yarn add --dev whatwg-fetch
```

### Update scripts package.json
```
"scripts: {
  ...
  "test": "jest --watchAll"
}
```
### Create file "babel.config.json"
```
{
    "presets": [
        [ "@babel/preset-env", { "targets": { "esmodules": true } } ],
        [ "@babel/preset-react", { "runtime": "automatic" } ]
    ]
}
```
### Create config file "jest.config.js"
```
export default {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js']
}
```
### Create file "jest.setup.js"
```
import 'whatwg-fetch'; // <-- yarn add whatwg-fetch

```


### Cloudinary install

```
yarn add -D cloudinary
yarn add -D setimmediate
```
### Add to file "jest.config.js"
```
...
import 'setimmediate';
```


