'use strict';

var React   = require('react-native');
var Login   = require('./Login');
var Request = require('superagent');

var {
  ActivityIndicatorIOS,
  Image,
  ListView,
  Text,
  TouchableHighlight,
  View,
} = React;


class Friends extends React.Component {

  constructor(props) {
    super(props);

    var dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id
    });

    this.state = {
      isLoading: true,
      dataSource: dataSource.cloneWithRows([])
    };
  }

  componentWillMount() {
    Request
      .get('https://oauth.reddit.com/api/v1/me/friends')
      .set('Authorization', 'Bearer ' + this.props.access_token)
      .end((err,res) => this._handleResponse(err,res));
  }

  _handleResponse(err,res) {
    this.setState({
      isLoading: false,
      dataSource: this.state.dataSource.cloneWithRows( JSON.parse(res.text).data.children )
    });
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight underlayColor='#DDDDDD'>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumbnail} source={{ uri: 'http://lh6.ggpht.com/_jDjI4hiPhI4/S3XIgT93qoI/AAAAAAABylc/fYFuwWVGXP8/d_silhouette_reddit.jpg' }} />
            <View  style={styles.textContainer}>
              <Text style={styles.name}>{rowData.name}</Text>
              <Text style={styles.note} numberOfLines={2}>{rowData.note}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} />
  }

}


var styles = React.StyleSheet.create({
  thumbnail: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 30
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#222222'
  },
  note: {
    fontSize: 14,
    color: 'grey'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  }
});


module.exports = Friends;