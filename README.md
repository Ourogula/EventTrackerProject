## EventTrackerProject



# API Calls
| HTTP Verb | URI                  | Request Body | Response Body |
|-----------|----------------------|--------------|---------------|
| GET       | `/api/races`    |              | JSON of `List<Race>` |
| GET       | `/api/races/17` |              | JSON of `Race` 17 |
| POST      | `/api/races`    | JSON of a new `Race` | JSON of created `Race` |
| PUT       | `/api/races/17` | JSON of a new version of `Race` 17 | JSON of updated `Race` |
| DELETE    | `/api/races/17` |              | |
