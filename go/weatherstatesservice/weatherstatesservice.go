package weatherstatesservice

import (
	"fmt"
	"humble-weather/api/mariadb"
	"humble-weather/api/messagetypes"
	"log"
)

type Weather struct {
	LocationID int    `json:"locationID"`
	Date       string `json:"date"`
	Temp       int    `json:"temp"`
	Units      string `json:"units"`
	Humidity   int    `json:"humidity"`
}

type QueryResultMessage struct {
	Message string    `json:"message"`
	OK      bool      `json:"ok"`
	Results []Weather `json:"results"`
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

func GetWeatherStates(zipCode string) QueryResultMessage {
	resultMessage := QueryResultMessage{
		Message: "",
		OK:      true,
		Results: []Weather{},
	}
	weatherStateRows, err := mariadb.SelectWeatherStatesByZipCode(zipCode)
	defer weatherStateRows.Close()

	if err != nil {
		// Something horrible happened
		log.Print(err)
		resultMessage.Message = fmt.Sprint(err)
		resultMessage.OK = false
		return resultMessage
	}
	weatherStates := []Weather{}
	for weatherStateRows.Next() {
		var state Weather
		rowError := weatherStateRows.Scan(&state.LocationID, &state.Temp, &state.Units, &state.Humidity, &state.Date)
		if rowError != nil {
			// Something horrible happened
			log.Print(rowError)
			resultMessage.Message = fmt.Sprint(rowError)
			resultMessage.OK = false
			return resultMessage
		}
		weatherStates = append(weatherStates, state)
	}
	resultMessage.Results = weatherStates
	resultMessage.Message = "Previous weather states selected."
	return resultMessage
}
