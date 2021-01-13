
import Log from './log';
let log = Log('tcpServer');
import { createServer } from ('net');

let countConnect = function (server) {
  server.getConnections(function (error, count) {
    if (error) {
      log.error(error);
    } else {
      log.info('total:' + count);
    }
  });
};
/**
 * @returns net.Server
 */
export const tcpServer = function () {
  const server = createServer(function (socket) {
    log.address(socket.remoteAddress, socket.remotePort, 'connected');
    countConnect(server);

    socket.on('data', function (data) {
      console.log(data);
    });

    socket.on('error', function (error) {
      log.error(error.message);
    });

    socket.on('close', function (had_error) {
      log.warn('client closed');
      countConnect(server);
    });
  });

  server.on('close', function (closed) {
    log.warn('server closed');
  });

  server.on('error', function (error) {
    log.error(error.message);
    if (error.code == 'EADDRINUSE') { server.close() }
  });

  server.on('listening', function () {
    let { address, port } = server.address();
    log.address(address, port, 'listening');
  });

  return server;
};
