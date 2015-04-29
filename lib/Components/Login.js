'use strict';

var React = require('react-native');

var {
  ActivityIndicatorIOS,
  Image,
  Text,
  TouchableHighlight,
  View,
  LinkingIOS
} = React;

class Login extends React.Component {

  constructor() {
    this.state = { isLoading: false };
  }

  componentDidMount() {
    LinkingIOS.addEventListener('url', this._handleOpenURL);
  }

  componentWillUnmount() {
    LinkingIOS.removeEventListener('url', this._handleOpenURL);
  }

  _handleOpenURL(event) {
    event.url
  }

  _sendLoginRequest(){
    this.setState({ isLoading: true });

    /**
     * Open safari so the user can login to reddit.
     * After the autorization flow, redirect back to the app with a custom url scheme.
     * @link http://iosdevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
     */
    LinkingIOS.openURL('https://www.reddit.com/api/v1/authorize?client_id=MZA8zqHVFBAMtQ&response_type=token&state=authorized_client&redirect_uri=RedditMessenger://oauth/authorize&scope=read');
  }

  render(){
    var spinner = this.state.isLoading ? <ActivityIndicatorIOS hidden='true' size='large'/> : <View/>;

    return (
      <View style={styles.container}>
        <Image source={require('image!reddit-logo')} style={styles.logo} />
        <Text style={styles.title}>Connect with your friends.</Text>

        <TouchableHighlight style={styles.button} underlayColor='#CEE3F8' onPress={this._sendLoginRequest.bind(this)}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
        <Text style={styles.description}>Please login with your reddit account.</Text>
        {spinner}
      </View>
    );
  }

}


var styles = React.StyleSheet.create({
  logo: {
    width: 220,
    height: 79
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FF4500'
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    color: 'gray',
    marginBottom: 20
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#336699',
    alignSelf: 'center'
  },
  button: {
    height: 35,
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#EFF7FF',
    borderColor: '#5F99CF',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 10,
  }
});


module.exports = Login;