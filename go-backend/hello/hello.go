package main

import (
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"net/http"
)

func main() {
	lambda.Start(handler)
}

func handler(_ events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	resp := events.APIGatewayProxyResponse{StatusCode: http.StatusOK, Body: "Welcome to the Hourkeeper API!"}
	return &resp, nil
}
