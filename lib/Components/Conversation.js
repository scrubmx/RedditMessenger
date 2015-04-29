'use strict';

var React = require('react-native');
var Request = require('superagent');

var { Text, View } = React;

class Conversation extends React.Component {

  render(){
    return (
      <View style={styles.container}>
        <Text>
          Send {this.props.friend.name} a mesasge!
        </Text>
      </View>
    );
  }

}


var styles = React.StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60
  }
});

module.exports = Conversation;