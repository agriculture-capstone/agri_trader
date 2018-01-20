
const React = require('react-native');
const { Platform, Dimensions, StyleSheet } = React;

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;


export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3F51B5',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 200, 
    width: 200,
  },
  label: {
    left: -8,
  },
  loginButton: {
    backgroundColor: 'white',
  },
  buttonRow: {
    paddingTop: 14,
  },
  buttonText: {
    color: 'black',
  },
  labelText: {
    color: 'white',
    paddingLeft: 8,
  },
});
