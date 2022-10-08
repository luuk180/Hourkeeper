package main

import (
	"encoding/json"
	"os"
	"time"

	utility "api.hourkeeper.net/utils"
)

type resultRows struct {
	Hours float64   `json:"hours"`
	Date  time.Time `json:"date,string"`
}

func getFromDB(userSub interface{}, body string) []byte {
	dbUrl := os.Getenv("DB_URL")

	gormDB := utility.GetDB(dbUrl)

	var bodyParseVar map[string]interface{}
	_ = json.Unmarshal([]byte(body), &bodyParseVar)

	month := bodyParseVar["reqMonth"]
	year := bodyParseVar["reqYear"]

	var resultRowsVar []resultRows

	gormDB.Table("hours").Select("hours, date").Joins("JOIN users u ON u.uuid = hours.user_uuid").Where("u.auth0sub LIKE ? "+
		"AND EXTRACT(MONTH from date) = CAST(? AS NUMERIC) AND EXTRACT(YEAR from date) = CAST(? AS NUMERIC)", userSub, month, year).Find(&resultRowsVar)

	returnString, err := json.Marshal(resultRowsVar)
	if err != nil {
		print(err)
	}

	return returnString
}
