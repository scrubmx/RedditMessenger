'use strict';

var React   = require('react-native');
var Request = require('superagent');

var { AlertIOS, Text, TextInput, TouchableHighlight, View } = React;

class Messages extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      accessToken : this.props.accessToken,
      friend      : this.props.friend,
      subject     : '',
      text        : ''
    };
  }

  _sendPrivateMessage() {
    Request
      .post('https://oauth.reddit.com/api/compose')
      .query({
        subject: 'New RedditMessenger message',
        text: this.state.text,
        to: this.props.friend.name
      })
      .set('Authorization', 'Bearer ' + this.state.accessToken)
      .end((error, response) => this._handleResponse(error, response));
  }

  _handleResponse(error, response){
    if (response.ok) {
      // TODO: Mostrar mensaje de exito
      AlertIOS.alert('Success!', `Your message was sent to ${this.state.friend.name}`)
     } else {
        console.log('---------- ERROR ----------');
        console.log(response);
     }
  }

  _updateText(text:string){
    this.setState({ text });
  }

  render(){
    return (
      <View>
        <Text style={styles.container}>
          Send {this.props.friend.name} a mesasge! and display previous messages.
          And the access token is {this.props.accessToken}
        </Text>
        <View style={styles.messageContainer}>
          <View style={styles.flowRight}>
            <TextInput style={styles.messageInput} onChangeText={ this._updateText.bind(this) } />
            <TouchableHighlight style={styles.button} underlayColor='#CEE3F8' onPress={this._sendPrivateMessage.bind(this)}>
              <Text style={styles.buttonText}>Send</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }

}


var styles = React.StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center',
  },
  messageContainer: {
    padding: 10,
    position: 'relative',
    bottom: 0,
    alignItems: 'center',
    backgroundColor: '#EFF0F1'
  },
  flowRight: {
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#336699',
    alignSelf: 'center'
  },
  button: {
    height: 35,
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
  },
  messageInput: {
    height: 36,
    padding: 4,
    paddingLeft: 8,
    marginRight: 4,
    flex: 4,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#5F99CF',
    borderRadius: 6,
    color: '#222222',
    backgroundColor: '#FFFFFF'
  }
});


module.exports = Messages;
