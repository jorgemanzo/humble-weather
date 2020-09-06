package weatherstatesservice

import (
	"fmt"
	"humble-weather/api/mariadb"
	"humble-weather/api/messagetypes"
	"log"
)

type Weather struct {
	LocationID int    `json:"locationID"`
	Temp       int    `json:"temp"`
	Units      string `json:"units"`
	Humidity   int    `json:"humidity"`
}

func InsertWeatherState(weatherState Weather) messagetypes.ExecutionMessage {
	resultMessage := messagetypes.ExecutionMessage{
		Message: "",
		OK:      true,
		ID:      -1,
	}
	lastInsertID, err := mariadb.InsertWeatherState(
		weatherState.LocationID,
		weatherState.Temp,
		weatherState.Units,
		weatherState.Humidity)
	if err != nil {
		// Something horrible happened
		log.Print(err)
		resultMessage.Message = fmt.Sprint(err)
		resultMessage.OK = false
		return resultMessage
	}
	resultMessage.Message = "New weather state created."
	resultMessage.ID = int(lastInsertID)
	return resultMessage
}
