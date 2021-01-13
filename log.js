
import { bgBlue, green, bgRed, yellow } from 'chalk';

export let Log = function (name = '') {

  return {
    address: function (host, port, text) {
      console.log(bgBlue('%s %s:%s %s'), name, host, port, text);
    },
    info: function (message) {
      console.log(green('%s %s'), name, message);
    },
    error: function (message) {
      console.log(bgRed('%s %s'), name, message);
    },
    warn: function (message) {
      console.log(yellow('%s %s'), name, message);
    }
  };
};
