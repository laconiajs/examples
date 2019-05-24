This is an example usage of laconia with serverless framework.
This function is triggered by a websocket event from APIGateway. 
Note, that the communication is not request response, but async. Messages to the websocket connection are sent via the aws-sdk in this example.
[Documentation](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api.html)