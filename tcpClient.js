import net from 'net';
import Log from './log';
let log = Log('tcpClient');

export let tcpClient = function () {
  let socket = net.Socket();

  socket.on('close', function (closed) {
    log.warn('remote closed');
  });

  socket.on('connect', function () {
    log.address(socket.remoteAddress, socket.remotePort, 'connected');
  });

  socket.on('ready', function () {
    log.address(socket.remoteAddress, socket.remotePort, 'ready');
  });

  socket.on('data', function (data) {
    // console.log 'received: ', socket.bytesRead
    console.log(data);
  });

  socket.on('end', function () {
    log.warn('end');
  });

  socket.on('error', function (error) {
    return log.error(error.message);
  });
  socket.liveConnect = function (options, timeout = 5000) {
    var connect;
    connect = function () {
      return socket.connect(options);
    };
    socket.on('close', function () {
      return setTimeout(connect, timeout);
    });
    return connect();
  };
  socket.drop = function (data, encoding, cb) {
    if (socket.pending) {
      return;
    }
    return socket.write(data, encoding, cb);
  };
  return socket;
};
