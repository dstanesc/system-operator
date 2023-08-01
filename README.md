# System Operator

System operator prototype. Rule based system recovery. Docker events are used to trigger system events. Custom rules consume system events and trigger system (recovery) actions.


## Build
```sh
npm run clean
npm install
npm run build
```

## Terminal 1
```sh
xhost +local:docker
docker-compose up
```

## Terminal 2
```sh
npm start
```

## Terminal 3
```sh
docker-compose kill relay
```

> Note: Could also close the `gui` window to see the system recovery in action.

## Licenses

Licensed under either [Apache 2.0](http://opensource.org/licenses/MIT) or [MIT](http://opensource.org/licenses/MIT) at your option.