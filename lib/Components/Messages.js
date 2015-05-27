'use strict';

var React   = require('react-native');
var Request = require('superagent');

var { Text, TextInput, TouchableHighlight, View } = React;

class Messages extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      accessToken: this.props.accessToken,
      friend: this.props.friend,
      subject: '',
      text: ''
    };
  }

  _sendPrivateMessage() {
    console.log(this.state.friend);
    Request
      .post('https://oauth.reddit.com/api/compose')
      .query({
        subject: 'message_from:_nlscrub',
        text: this.state.text,
        to: 'im_in_newyork'
      })
      .set('Authorization', 'Bearer ' + this.state.accessToken)
      .end((error, response) => this._handleResponse(error, response));
  }

  _handleResponse(error, response){
    if (response.ok) {

     } else {
        console.log('---------- ERROR ----------');
        console.log(response);
     }
  }

  _updateSubject(event){
    this.setState({ subject: event.nativeEvent.text });
  }

  _updateText(event){
    this.setState({ text: event.nativeEvent.text });
  }

  render(){
    return (
      <View style={styles.container}>

        <View style={styles.flowRight}>
          <Text style={styles.label}>Message:</Text>
          <TextInput style={styles.text} value={this.state.text} onChange={this._updateText.bind(this)} />
        </View>

        <TouchableHighlight style={styles.button} underlayColor='#CEE3F8' onPress={this._sendPrivateMessage.bind(this)}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>

        <Text>Send {this.props.friend.name} a mesasge!</Text>
        <Text>And the access token is {this.props.accessToken}</Text>
      </View>
    );
  }

}


var styles = React.StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  label: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  subject: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  text: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
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

module.exports = Messages;
