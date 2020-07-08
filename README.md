# homfy-backend


### Installing

Yarn used as a package manager, so first install deps by running.

```
yarn
```

from project root. Use node version 12 or 14.
Also for now you have to add `.env` file in the root folder and `ACCESS_TOKEN_KEY` random string for generating jwt tokens.

### Running


```
// dev environment
yarn start 
```

### Building App

```

yarn build

// then to run production version

node build/index.js

```

### Testing

Testing is done with Jest, to run

```
yarn jest 
// or with coverage report
yarn jest --coverage
```
