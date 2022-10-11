 // Load the AWS SDK for Node.js
//  var AWS = require('aws-sdk');
// var sns = new AWS.SNS({apiVersion: '2010-03-31'});


// var smsTopic = process.env.SNS_TOPIC || ""

// exports.handler = async function handler( event:any ) {
//   console.log("EVENT : ", event);
  
//   // Create publish parameters
//   var params = {
//     Message: 'Hello this is mishaal', /* required */
//     PhoneNumber: '+923183884163',
//   };

//   try {
//     // Create promise and SNS service object
//     var response = await sns.publish(params).promise();
//     console.log("SNS Response : ", response);
//   } catch (err) {
//     console.log("SNS Error : ", err);
//   }
// }

exports.handler = async function(event:any) {
  console.log("Received Event:", JSON.stringify(event, undefined, 2));
  let message = event.Records[0].Sns.Message;
  let subject = event.Records[0].Sns.Subject;
  let type = event.Records[0].Sns.Type;
  let response = {
      message: message,
      subject: subject,
      type: type
  }
  // Create SMS Attribute parameters
// var params = {
//   attributes: { /* required */
//     'DefaultSMSType': 'Transactional', /* highest reliability */
//     //'DefaultSMSType': 'Promotional' /* lowest cost */
//   }
// };

// // Create promise and SNS service object
// var setSMSTypePromise = new AWS.SNS({apiVersion: '2010-03-31'}).setSMSAttributes(params).promise();
  console.log('SNS record: ', JSON.stringify(response, null, 2));
  return response
};





