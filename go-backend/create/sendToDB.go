package main

import (
	utility "api.hourkeeper.net/utils"
	"encoding/json"
	"os"
	"time"
)

type Rows struct {
	Hours float64   `json:"hours"`
	Date  time.Time `json:"date,string"`
}

func sendToDB(userSub interface{}, body string) string {
	var sendTo Rows

	json.Unmarshal([]byte(body), &sendTo)
	dbUrl := os.Getenv("DB_URL")
	gormDB := utility.GetDB(dbUrl)

	gormDB.Table("hours")
	return "Success!"
}
