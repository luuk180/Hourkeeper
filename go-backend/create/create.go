package main

import (
	"database/sql"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"net/http"
)

func main() {
	sqlDB, _ := sql.Open("pgx", "mydb_dsn")
	gormDB, _ = gorm.Open(postgres.New(postgres.Config{
		Conn: sqlDB,
	}), &gorm.Config{})

	lambda.Start(handler)
}

func handler(event events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	resp := events.APIGatewayProxyResponse{Headers: map[string]string{"Content-Type": "application/json"},
		Body:       "Hey!",
		StatusCode: http.StatusOK}
	return &resp, nil
}
