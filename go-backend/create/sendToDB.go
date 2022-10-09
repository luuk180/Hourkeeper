package main

import (
	utility "api.hourkeeper.net/utils"
	"encoding/json"
	"fmt"
	"os"
)

type Hours struct {
	Date     string
	Hours    string
	UserUUID string
}

func sendToDB(userSub interface{}, body string) string {
	dbUrl := os.Getenv("DB_URL")
	gormDB := utility.GetDB(dbUrl)

	var bodyParseVar map[string]interface{}
	_ = json.Unmarshal([]byte(body), &bodyParseVar)

	inputDate := fmt.Sprintf("%s", bodyParseVar["date"])
	inputHours := fmt.Sprintf("%s", bodyParseVar["hours"])

	var userUUID map[string]interface{}
	gormDB.Table("users").Where("auth0sub LIKE ?", userSub).Find(&userUUID)

	HoursVar := Hours{Date: inputDate, Hours: inputHours, UserUUID: fmt.Sprintf("%s", userUUID["uuid"])}
	err := gormDB.Select("date", "hours", "user_uuid").Create(&HoursVar)
	if err != nil {
		print(err)
	}

	return "Success!"
}
