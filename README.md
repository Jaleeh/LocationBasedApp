# LocationBasedApp

Cross-platform app that displays the phone's current GPS position.

## Task List
- [x] Init Project
- [x] Init Google Maps
- [x] Display location
- [x] Get user's current location
- [x] Track user's location
- [x] Send location to server
- [x] Handle errors on sending location to server

## Packages Used
- [react-native-maps](https://github.com/react-native-maps/react-native-maps)
- [react-native-permissions](https://github.com/zoontek/react-native-permissions)
- [react-native-community/geolocation](https://github.com/react-native-geolocation/react-native-geolocation)
- [react-native-device-info](https://github.com/react-native-device-info/react-native-device-info)
- [axios](https://github.com/axios/axios)
- [moment](https://momentjs.com/)


## Local Developement and Test
To setup the development environment, please follow the guide [here](https://reactnative.dev/docs/environment-setup).

### Clone repo
```cmd
git clone https://github.com/Amine-ounn/ASEGP2
```

### Install packages
```cmd
npm install
```


### Install pods (Necessary for iOS)
At the root of your project, navigate to ios folder and install pods
```cmd
cd ios && pod install
```


### Run project
Note: these commands may be different depending on your setup, if you are experiencing issue please follow the react-native guide you used while setting up your environment.

**iOS**
```
npm run ios
```

**Android**
```
npm run android
```
