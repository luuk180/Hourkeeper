package main

import (
	utility "api.hourkeeper.net/utils"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"net/http"
)

func main() {
	lambda.Start(handler)
}

func handler(event events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	resp := events.APIGatewayProxyResponse{Headers: map[string]string{"Content-Type": "application/json"},
		Body:       string(getFromDB(utility.ParseSub(event.RequestContext.Authorizer), event.Body)),
		StatusCode: http.StatusOK}
	return &resp, nil
}
