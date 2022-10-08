package main

import (
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"gorm.io/gorm"
	"net/http"
)

var gormDB *gorm.DB

func main() {
	lambda.Start(handler)
}

func handler(event events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	resp := events.APIGatewayProxyResponse{Headers: map[string]string{"Content-Type": "application/json"},
		Body:       string(getFromDB(event.RequestContext.Authorizer, event.Body)),
		StatusCode: http.StatusOK}
	return &resp, nil
}
