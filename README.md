## EventTrackerProject

# Description
The Race Repository is a single-page application (SPA) that showcases full CRUD capability. There is a creation form that will take the form inputs and attempt to create a Race. If successful, the table below the form will dynamically update with the new race.

A user can click on any race in the race table to get more detailed information regarding that race. The user can click on the word 'Update' to pull up the update form for that given race. The user can also click the 'Delete' text in that race's table row in order to delete the race from the database. All changes to the race table will dynamically update.

There are two tables to the right of the race table. One table shows the current number of races that match each series, and another table that shows similar information but for languages spoken. These tables will dynamically change with any update to the Race Repository database.

This project uses an implementation of RESTful API using Java and Spring JPA to query a MySQL database. There is one main entity, Race, that describes a Race or Species of person. This is to include fictional and non-fictional races such as Klingon, Human, Kha'jit, and other Races/Species. The idea behind this project is to act as access to a data repository of all races in existence.

Access to the web application is available at the following URL: http://52.15.43.38:8080/RaceRepository/

Access to the API is available at the following URL: http://52.15.43.38:8080/RaceRepository/api/

# API Calls
| HTTP Verb | URI                  | Request Body | Response Body |
|-----------|----------------------|--------------|---------------|
| GET       | `/api/races`    |              | JSON of `List<Race>` |
| GET       | `/api/races/{raceId}` |              | JSON of `Race` {raceId} |
| GET       | `/api/races/search/{keyword}` |              | JSON of `List<Race>` with name matching {keyword} |
| POST      | `/api/races`    | JSON of a new `Race` | JSON of created `Race` |
| PUT       | `/api/races/{raceId}` | JSON of a new version of `Race` {raceId} | JSON of updated `Race` |
| DELETE    | `/api/races/{raceId}` |              | |
| GET       | `/api/languages`    |              | JSON of `List<Language>` |
| GET       | `/api/languages/{languageId}` |              | JSON of `Language` {languageId} |
| POST      | `/api/languages`    | JSON of a new `Language` | JSON of created `Language` |
| PUT       | `/api/languages/{languageId}` | JSON of a new version of `Language` {languageId} | JSON of updated `Language` |
| DELETE    | `/api/languages/{languageId}` |              | |
| GET       | `/api/series`    |              | JSON of `List<Series>` |
| GET       | `/api/series/{seriesId}` |              | JSON of `Series` {seriesId} |
| POST      | `/api/series`    | JSON of a new `Series` | JSON of created `Series` |
| PUT       | `/api/series/{seriesId}` | JSON of a new version of `Series` {seriesId} | JSON of updated `Series` |
| DELETE    | `/api/series/{seriesId}` |              | |

# Lessons Learned
One big lesson learned is that one has to account for blank strings when working with a keyword API call. A typical Spring Boot controller may be able to get away with returning all results from a database when a blank string is provided, but the API needs to be able to tell the difference between a URL that ends in a keyword and one that does not.

Learning to account for asynchronous programming in JavaScript was a big factor of this project. Planning out where to call a method proved to be one of the most important parts of writing the JavaScript of this project, and often there was refactoring that needed to be done to prevent issues coming from the JavaScript Event Loop and asynchronicity.

# Technologies Used
* Java
* Spring JPA
* Spring Boot
* Git
* Gradle
* MySQL
