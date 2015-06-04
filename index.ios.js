/**
 * Simple reddit messaging system app.
 * https://github.com/facebook/react-native
 */
'use strict';

var Auth  = require('./lib/Components/Auth');
var React = require('react-native');

var { AppRegistry, NavigatorIOS } = React;

class RedditMessenger extends React.Component {
  render() {
    return (
      <NavigatorIOS
        style={{ flex: 1 }}
        initialRoute={{ title: 'Login', component: Auth }} />
    );
  }
}

AppRegistry.registerComponent('RedditMessenger', () => RedditMessenger);
