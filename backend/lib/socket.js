'use strict'

const fs     = require('fs')
const logger = require('pine')()
const csv    = require('./csv-util')
let Files = {}


function listen(app) {
  const io = require('socket.io').listen(app)
  console.log('Socket.io waiting for events...')

  setConnectionEvent(io)

  return io
}

function setConnectionEvent(io) {
  io.sockets.on('connection', function(socket) {
    console.log('New socket conection received')
    setStartEvent(socket)
    setUploadEvent(socket)
  })
}

function setStartEvent(socket) {
  socket.on('Start', function(data) {
    let uuid = data.uuid
    let Place = 0
    Files[uuid] = {
      FileSize : data.Size,
      Name: data.name,
      Data     : '',
      Downloaded : 0
    }

    try {
      let Stat = fs.statSync('Temp/' +  uuid)
      if (Stat.isFile()) {
        Files[uuid].Downloaded = Stat.size
        Place = Stat.size / 524288
      }
    }
    catch (er) {
    }
    fs.open('Temp/' + uuid + '.csv', 'a', '0755', function(err, fd) {
      if (err) {
        logger.error('Could not open the file', err)
        return
      }

      Files[uuid].Handler = fd
      socket.emit('MoreData', { Place: Place, Percent: 0 })
    })
  })
}

function setUploadEvent(socket) {
  socket.on('Upload', function(data) {
    let uuid = data.uuid
    let name = Files[uuid].Name
    Files[uuid].Downloaded += data.Data.length
    Files[uuid].Data += data.Data

    if (Files[uuid].Downloaded === Files[uuid].FileSize) {
      fs.write(Files[uuid].Handler, Files[uuid].Data, null, 'Binary', function() {
        try {
          logger.info('Started writing csv to text')
          csv.writeToTextFile(uuid, name)
            .then(() => {
              socket.emit('Done', {})
              fs.unlink('Temp/' + uuid + '.csv', () => {})
              logger.info('End writing csv to text. Stored in /csv as [%s]', name + '.txt')
            })
            .catch((err) => {
              console.log(err)
            })
        }
        catch (er) {}
      })
    } else if (Files[uuid].Data.length > 10485760) {
      fs.write(Files[uuid].Handler, Files[uuid].Data, null, 'Binary', function() {
        Files[uuid].Data = '' // Reset The Buffer
        let Place = Files[uuid].Downloaded / 524288
        let Percent = (Files[uuid].Downloaded / Files[uuid].FileSize) * 100

        socket.emit('MoreData', { Place: Place, Percent:  Percent})
      })
    } else {
      let Place = Files[uuid].Downloaded / 524288
      let Percent = (Files[uuid].Downloaded / Files[uuid].FileSize) * 100

      socket.emit('MoreData', { Place: Place, Percent:  Percent})
    }
  })
}

exports.listen = listen
