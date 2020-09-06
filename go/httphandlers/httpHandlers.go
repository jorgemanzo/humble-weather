package httphandlers

import (
	"encoding/json"
	"humble-weather/api/locationsservice"
	"log"
	"net/http"
)

type searchQuery struct {
	ZipCode string `json:"zipCode"`
	Main    string `json:"main"`
	Temp    string `json:"temp"`
	City    string `json:"city"`
}

func setHeaders(w http.ResponseWriter, contentType string) {
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:4200")
	w.Header().Set("Content-Type", contentType)
}

func UpsertLocationAndSearch(w http.ResponseWriter, r *http.Request) {
	var query searchQuery
	json.NewDecoder(r.Body).Decode(&query)
	log.Print(query.ZipCode)
	resultMessage := locationsservice.UpsertLocation(query.ZipCode)
	setHeaders(w, "application/json")
	json.NewEncoder(w).Encode(resultMessage)
}
