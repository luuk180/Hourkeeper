package main

import (
	"fmt"
	"github.com/jackc/pgtype"
	//"github.com/gofrs/uuid"
	//"github.com/jackc/pgtype"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
	//"net/http"
	//"strings"
)

var db *gorm.DB

type hours struct {
	date  pgtype.Date
	hours float32
}

//func queryHandler(w http.ResponseWriter, r *http.Request) {
//	var auth = r.Header.Get("Authorization")
//	if auth != "" {
//		strings.TrimLeft(auth, "Bearer ")
//		db.Table("hours").Select("hours.date, hours.hours").Joins("left join users on users.uuid = hours.user_uuid").Where("users.google_sub = " + auth)
//	}
//}

func main() {
	var err error
	db, err = gorm.Open(postgres.Open("postgresql://hourkeeper:5M9u2YNc6n4UhkAfvHQudw@free-tier13.aws-eu-central-1.cockroachlabs.cloud:26257/hourkeeper?sslmode=verify-full&options=--cluster%3Dlost-sable-1588"))
	if err != nil {
		log.Fatal(err)
	}
	var hours []hours
	db.Table("hours").Select("hours.date, hours.hours").Joins("JOIN users on users.uuid = hours.user_uuid").Where("users.email = ?", "luuk.volkering@gmail.com").Find(&hours)
	for i, _ := range hours {
		fmt.Print(hours[i].date)
		fmt.Print(": ")
		fmt.Println(hours[i].hours)
	}
	//http.HandleFunc("/query", queryHandler)
	//log.Fatal(http.ListenAndServe(":3000", nil))
}
