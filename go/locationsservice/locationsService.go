package locationsservice

import (
	"fmt"
	"humble-weather/api/mariadb"
	"humble-weather/api/messagetypes"
	"log"
)

func UpsertLocation(zipCode string) messagetypes.ExecutionMessage {
	resultMessage := messagetypes.ExecutionMessage{
		Message: "",
		OK:      true,
		ID:      -1,
	}
	locationRow := mariadb.SelectLocationByZipCode(zipCode)
	notFound := locationRow.Scan(&(resultMessage.ID))
	if notFound != nil {
		// Try to insert
		log.Print(notFound)
		lastInsertID, err := mariadb.InsertLocation(zipCode)
		if err != nil {
			// Something horrible happened
			log.Print(err)
			resultMessage.Message = fmt.Sprint(err)
			resultMessage.OK = false
			return resultMessage
		}
		resultMessage.Message = "New location created."
		resultMessage.ID = int(lastInsertID)
	} else {
		resultMessage.Message = "Existing location found."
	}
	resultMessage.OK = true
	return resultMessage
}
