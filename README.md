## Lambda function that sends emails

This lambda function runs on AWS lambda.
It is called from a GCLOUD pubsub PUSH subscription.

Since lambda fuctions have an http endpoint, the message from
GCLOUD pubsub can be used to trigger the function.

# Ensure you have SES setup to send emails

# Ensure you have created the function in AWS and have the http endpoint