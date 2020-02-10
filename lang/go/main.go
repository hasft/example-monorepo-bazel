package main

import (
	"fmt"
	"log"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "hasft/app!!\n")
}

func main() {
	log.Print("hasft app server ready")
	http.HandleFunc("/", handler)
	http.ListenAndServe(":8080", nil)
}
