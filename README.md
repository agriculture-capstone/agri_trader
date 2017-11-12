# agritrader

This project is a mobile application to be used by traders that interact with farmers to collect agricultural goods. 

## Development
### Setting up your Development Environment
Follow steps found in the `Building Projects with Native Code` tab in the [React Native documentation for Getting Started](https://facebook.github.io/react-native/docs/getting-started.html) for installing dependencies and setting up the mobile development environment (ie. the Android SDK and build tools). 

### Setting up your Device
To try running the code on a device, follow the steps found in the [React Native documentation for Running your app on a Device](https://facebook.github.io/react-native/docs/running-on-device.html).

#### Common Issues
- Make sure your `JAVA_HOME` and `ANDROID_HOME` are set in your environment variables.
- Make sure the `adb` command is available from your terminal. You might have to add the sdk platform tools directory to your path in your environment variables (the platform tools directory can be found in `D:\Users\<your username>\AppData\Local\Android\sdk\platform-tools`)
- When trying to run the application on your device, make sure your phone is connected. Try running `adb devices` to make sure your phone can be detected.


### Running the Application
Follow these steps to run the application once your development environment has been set up.
1. Clone the repository
2. Run `npm install` to install the dependencies
3. Ensure your device is connected to your computer or your emulator is set up
4. Run `npm run start:android` or `npm run start:ios` to run the application 

### Running Tests
1. Run `npm test` to execute all unit tests and check code coverage thresholds.
2. View code coverage in the local `coverage/` directory.

### Contributing 
Please label branches using the following format: 
```
<full name>/AT-<issue number>/<feature name>
```

Please write commit messages using the following format: 
```
AT-<issue number> <commit message>
```