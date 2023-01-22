## EventTrackerProject

# Description
This project is an implementation of a RESTful API using Java and Spring JPA to query a MySQL database. There is one main entity, Race, that describes a Race or Species of person. This is to include fictional and non-fictional races such as Klingon, Human, Kha'jit, and other Races/Species. The idea behind this project is to act as access to a data repository of all races in existence.

Access to the API is available at the following URL: http://52.15.43.38:8080/RaceRepository/api/

# API Calls
| HTTP Verb | URI                  | Request Body | Response Body |
|-----------|----------------------|--------------|---------------|
| GET       | `/api/races`    |              | JSON of `List<Race>` |
| GET       | `/api/races/17` |              | JSON of `Race` 17 |
| GET       | `/api/races/search/Yuki` |              | JSON of 'List<Race>' with name matching Yuki |
| POST      | `/api/races`    | JSON of a new `Race` | JSON of created `Race` |
| PUT       | `/api/races/17` | JSON of a new version of `Race` 17 | JSON of updated `Race` |
| DELETE    | `/api/races/17` |              | |
| GET       | `/api/languages`    |              | JSON of `List<Language>` |
| GET       | `/api/languages/17` |              | JSON of `Language` 17 |
| POST      | `/api/languages`    | JSON of a new `Language` | JSON of created `Language` |
| PUT       | `/api/languages/17` | JSON of a new version of `Language` 17 | JSON of updated `Language` |
| DELETE    | `/api/languages/17` |              | |
| GET       | `/api/series`    |              | JSON of `List<Series>` |
| GET       | `/api/series/17` |              | JSON of `Series` 17 |
| POST      | `/api/series`    | JSON of a new `Series` | JSON of created `Series` |
| PUT       | `/api/series/17` | JSON of a new version of `Series` 17 | JSON of updated `Series` |
| DELETE    | `/api/series/17` |              | |

# Lessons Learned
One big lesson learned is that one has to account for blank strings when working with a keyword API call. A typical Spring Boot controller may be able to get away with returning all results from a database when a blank string is provided, but the API needs to be able to tell the difference between a URL that ends in a keyword and one that does not.

# Technologies Used
* Java
* Spring JPA
* Spring Boot
* Git
* Gradle
* MySQL
