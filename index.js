const AWS = require('aws-sdk');

// Set the region 
const ses = new AWS.SES({ region: 'us-east-1' });

exports.handler = async (event) => {

  if (!event.body) {
    return;
  }

  const body = JSON.parse(event.body);

  if (!body.message) {
    return;
  }

  const pubSubMessage = body.message;

  const message_data = JSON.parse(Buffer.from(pubSubMessage.data, 'base64').toString());

  let params;

  switch (message_data.type) {
    case "verify_email":

      params = {
        Destination: {
          ToAddresses: [message_data.recipient] // Replace with your own email address
        },
        Message: {
          Body: {
            Text: {
              Data: `${message_data.email_text} \n ${message_data.verify_email_link}`
            }
          },
          Subject: {
            Data: `${message_data.subject}`
          }
        },
        Source: 'Verify Email <support@tikitiki.me>' // Replace with your own email address
      };

      break;
    case "forgot_password":
      params = {
        Destination: {
          ToAddresses: [message_data.recipient] // Replace with your own email address
        },
        Message: {
          Body: {
            Text: {
              Data: `${message_data.email_text} \n ${message_data.verify_email_link}`
            }
          },
          Subject: {
            Data: `${message_data.subject}`
          }
        },
        Source: 'Password Reset <support@tikitiki.me>' // Replace with your own email address
      };

      break;
    case "claims":
      params = {
        Destination: {
          ToAddresses: [message_data.recipient] // Replace with your own email address
        },
        Message: {
          Body: {
            Text: {
              Data: `${message_data.email_text}`
            }
          },
          Subject: {
            Data: `${message_data.subject}`
          }
        },
        Source: 'TikiTiki Prize Claims <support@tikitiki.me>' // Replace with your own email address
      };
      break;

    default:
      break;
  }


  try {
    const result = await ses.sendEmail(params).promise();
    console.log(result);
    const response = {
      statusCode: 200,
      body: JSON.stringify('Email sent successfully.')
    }
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};