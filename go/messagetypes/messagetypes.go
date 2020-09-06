package messagetypes

type ExecutionMessage struct {
	Message string `json:"Message"`
	OK      bool   `json:"OK"`
	ID      int    `json:"ID"`
}
