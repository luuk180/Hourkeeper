package utility

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func GetDB(dbUrl string) *gorm.DB {
	gormDB, _ := gorm.Open(postgres.Open(dbUrl), &gorm.Config{})
	return gormDB
}

func ParseSub(authorizer map[string]interface{}) interface{} {
	jwtVar := authorizer["jwt"].(map[string]interface{})
	claimsVar := jwtVar["claims"].(map[string]interface{})

	userSub := claimsVar["sub"]
	return userSub
}
