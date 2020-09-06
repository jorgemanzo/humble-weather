package main

import (
	"humble-weather/api/httphandlers"
	"net/http"
)

func main() {
	http.HandleFunc("/upsert_location_with_query", httphandlers.UpsertLocationAndSearch)

	http.ListenAndServe(":8080", nil)
}
