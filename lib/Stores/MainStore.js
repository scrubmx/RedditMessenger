'use strict';

var Reddit = require('../Helpers/RedditAPI');

var MainStore = {

	getFriends(cb){
		Reddit.getFriends(cb);
	}
}

module.exports = MainStore;