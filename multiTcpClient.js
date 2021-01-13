var multiTcpClient, tcpClient;

tcpClient = require('./tcpClient');

module.exports = multiTcpClient = function () {
  return {
    one: tcpClient
  };
};
