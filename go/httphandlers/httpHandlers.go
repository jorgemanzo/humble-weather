package httphandlers

import (
	"encoding/json"
	"humble-weather/api/locationsservice"
	"humble-weather/api/weatherstatesservice"
	"log"
	"net/http"
)

func setHeaders(w http.ResponseWriter, contentType string) {
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:4200")
	w.Header().Set("Content-Type", contentType)
}

func UpsertLocationAndSearch(w http.ResponseWriter, r *http.Request) {
	var query locationsservice.SearchQuery
	json.NewDecoder(r.Body).Decode(&query)
	log.Print(query)
	resultMessage := locationsservice.UpsertLocation(query)
	setHeaders(w, "application/json")
	json.NewEncoder(w).Encode(resultMessage)
}

func InsertWeatherState(w http.ResponseWriter, r *http.Request) {
	var weatherState weatherstatesservice.Weather
	json.NewDecoder(r.Body).Decode(&weatherState)
	log.Printf("Temp: %d\n", weatherState.Temp)
	resultMessage := weatherstatesservice.InsertWeatherState(weatherState)
	setHeaders(w, "application/json")
	json.NewEncoder(w).Encode(resultMessage)
}

func GetWeatherStatesByZipCode(w http.ResponseWriter, r *http.Request) {
	var query locationsservice.SearchQuery //TODO: Move search query into this file
	json.NewDecoder(r.Body).Decode(&query)
	resultMessage := weatherstatesservice.GetWeatherStates(query.ZipCode)
	setHeaders(w, "application/json")
	json.NewEncoder(w).Encode(resultMessage)
}
