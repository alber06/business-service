'use strict'

const fs     = require('fs-promise')
const Reader = require('promised-csv')

let parser = new Reader()

function writeToTextFile(userUuid, name) {
  let fileName = 'Temp/' +  userUuid + '.csv'
  let Stat = fs.statSync(fileName)

  if (!Stat.isFile()) {
    return Promise.reject(new Error('Thefile does not exist'))
  }
  parser.on('error', () => {})

  return parser
    .read(fileName, (record) => {
      let recordNormalized = {
        'product id': record[0],
        year:  record[1],
        month: record[2],
        day:   record[3],
        sales: record[4]
      }

      return recordNormalized
    })
    .then((_output) => {
      let fileTextName = 'csv/' +  name + '.txt'
      console.log(fileTextName)
      fs.open(fileTextName, 'a', '0755')
        .then((fd) => {
          _output.shift()
          fs.write(fd, JSON.stringify(_output), 'utf8')
        })
    })
}

exports.writeToTextFile = writeToTextFile
