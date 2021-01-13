let request = require('request');

let uuid = require('./uuid');

module.exports = function (options) {
  return function (channel) {
    var data, i, idx, len, option, ref, v;
    // return '' unless channel.data
    data = [];
    uuid(0, channel.ch, options.deviceNo, options.projectNo);
    ref = channel.data;
    for (idx = i = 0, len = ref.length; i < len; idx = ++i) {
      v = ref[idx];
      // continue unless v
      data.push({
        uuid: uuid(idx + 1),
        value: v.measure
      });
    }
    option = {
      url: options.host + channel.type,
      form: {
        time: channel.time,
        data: data
      }
    };
    return new Promise(function (resolve, reject) {
      return request.post(option, function (err, rs, body) {
        if (err) {
          reject(err);
        }
        return resolve(body);
      });
    });
  };
};
