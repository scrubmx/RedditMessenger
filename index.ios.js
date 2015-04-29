/**
 * Simple reddit messaging system app.
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Login = require('./lib/Components/Login');

var { AppRegistry, NavigatorIOS } = React;

var RedditMessenger = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={{ flex: 1 }}
        initialRoute={{ title: 'Login', component: Login }} />
    );
  }
});

AppRegistry.registerComponent('RedditMessenger', () => RedditMessenger);
