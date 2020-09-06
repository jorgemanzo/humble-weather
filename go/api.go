package main

import (
	"humble-weather/api/httphandlers"
	"net/http"
)

func main() {
	http.HandleFunc("/upsert_location_with_query", httphandlers.UpsertLocationAndSearch)

	http.HandleFunc("/insert_weather_state", httphandlers.InsertWeatherState)

	http.ListenAndServe(":8080", nil)
}
