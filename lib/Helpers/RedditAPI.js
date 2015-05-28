'use strict';

var DataStore = require('../Stores/MainStore');
var Request = require('superagent');

var RedditAPI = {

  getFriends(cb){
    Request
      .get('https://oauth.reddit.com/api/v1/me/friends')
      .set('Authorization', 'Bearer ' + DataStore.accessToken)
      .end(cb);
  },

  isAuthenticated(){
    return false;
  }

}

module.exports = RedditAPI;
