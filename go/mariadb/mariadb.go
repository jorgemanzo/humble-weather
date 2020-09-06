package mariadb

import (
	"database/sql"
	"log"

	// Imported as per docs
	_ "github.com/go-sql-driver/mysql"
)

const mySQLInfo = "admin:password@(127.0.0.1:3306)/weather_history"
const insertLocationWithZipCode = "INSERT locations (zipCode) VALUES (?)"
const selectLocationByZipCode = "SELECT location_id FROM locations WHERE zipCode = (?)"

func InsertLocation(zipCode string) (int64, error) {
	db, openErr := sql.Open("mysql", mySQLInfo)
	if openErr != nil {
		log.Fatal("InsertShare(): ", openErr)
	}
	result, err := db.Exec(insertLocationWithZipCode, zipCode)
	db.Close()
	if err != nil {
		log.Fatal("InsertShare(): ", err)
	}
	return result.LastInsertId()
}

func SelectLocationByZipCode(zipCode string) *sql.Row {
	db, openErr := sql.Open("mysql", mySQLInfo)
	if openErr != nil {
		log.Fatal("SelectLocationByZipCode(): ", openErr)
	}
	result := db.QueryRow(selectLocationByZipCode, zipCode)
	db.Close()
	return result
}
