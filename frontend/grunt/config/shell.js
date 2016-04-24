'use strict';

module.exports = {

  awsS3clean: {
    command: 'aws s3 rm s3://... --recursive'
  },
  awsS3deploy: {
    command: 'aws s3 cp www/ s3://... --recursive'
  }

};
