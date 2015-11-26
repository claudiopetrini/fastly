/**
 * Fastly API client.
 *
 * @package fastly
 * @author Andrew Sliwinski <andrew@diy.org>
 */

/**
 * Dependencies
 */
var request = require('request');

/**
 * Constructor
 */
function Fastly(apikey) {
  this.apikey = apikey || '';
}

/**
 * Adapter helper method.
 *
 * @param {string} Method
 * @param {string} URL
 * @param {params} Optional params to update.
 * @param {callback} callback to execute with response.
 *
 * @return {Object}
 */
Fastly.prototype.request = function (method, url, params, callback) {
  var self = this;

  // Allow for optional update params.
  if (typeof params === 'function') {
    callback = params;
    params = null;
  }

  // Construct headers
  var headers = {
    'fastly-key': self.apikey
  };

  // HTTP request
  request({
    method: method,
    url: 'https://api.fastly.com' + url,
    headers: headers,
    form: params
  }, function (err, response, body) {
    if (response) {
      var statusCode = response.statusCode;
      if (!err && (statusCode < 200 || statusCode > 302))
        err = new Error(body);
      if (err) err.statusCode = statusCode;
    }
    if (err) return callback(err);
    if (response.headers['content-type'] === 'application/json') {
      try {
        body = JSON.parse(body);
      } catch (er) {
        return callback(er);
      }
    }

    callback(null, body);
  });
};

// -------------------------------------------------------

Fastly.prototype.purge = function (host, url, callback) {
  this.request('POST', '/purge/' + host + url, callback);
};

Fastly.prototype.purgeAll = function (service, callback) {
  var url = '/service/' + encodeURIComponent(service) + '/purge_all';
  this.request('POST', url, callback);
};

Fastly.prototype.purgeKey = function (service, key, callback) {
  var url = '/service/' + encodeURIComponent(service) + '/purge/' + key;
  this.request('POST', url, callback);
};

Fastly.prototype.stats = function (service, callback) {
  var url = '/service/' + encodeURIComponent(service) + '/stats/summary';
  this.request('GET', url, callback);
};

Fastly.prototype.getService = function (service, callback) {
  var url = '/service/' + encodeURIComponent(service) + '/details';
  this.request('GET', url, callback);
};

Fastly.prototype.getVersions = function (service, callback) {
  var url = '/service/' + encodeURIComponent(service) + '/version';
  this.request('GET', url, callback);
};

Fastly.prototype.cloneVersion = function (service, version, callback) {
  var url = '/service/' + encodeURIComponent(service) + '/version/' + encodeURIComponent(version) + '/clone';
  this.request('PUT', url, callback);
};

Fastly.prototype.activateVersion = function (service, version, callback) {
  var url = '/service/' + encodeURIComponent(service) + '/version/' + encodeURIComponent(version) + '/activate';
  this.request('PUT', url, callback);
};

Fastly.prototype.createDomain = function (service, version, domain, callback) {
  var url = '/service/' + encodeURIComponent(service) + '/version/' + encodeURIComponent(version) + '/domain';
  var body = {
    name: domain
  };
  this.request('POST', url, body, callback);
};

Fastly.prototype.getDictionary = function (service, version, dictionary, callback) {
  var url = '/service/' + encodeURIComponent(service) + '/version/' + encodeURIComponent(version) + '/dictionary/' + encodeURIComponent(dictionary);
  this.request('GET', url, callback);
};

Fastly.prototype.createDictionaryItem = function (service, dictionary, key, value, callback) {
  var url = '/service/' + encodeURIComponent(service) + '/dictionary/' + encodeURIComponent(dictionary) + '/item'
  var body = {
    item_key: key,
    item_value: value
  };
  this.request('POST', url, body, callback);
};


/**
 * Export
 */
module.exports = function (apikey) {
  return new Fastly(apikey);
};