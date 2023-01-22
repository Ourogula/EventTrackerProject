package com.ourogula.racedb.services;

import java.util.List;

import com.ourogula.racedb.entities.Race;

public interface RaceService {
	List<Race> findAllRaces();
	Race findRaceById(int id);
	List<Race> findRacesByNameKeyword(String keyword);
	Race createRace(Race createMe);
	Race updateRace(int id, Race updateMe);
	Boolean deleteRace(int id);
}
