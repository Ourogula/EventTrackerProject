package com.ourogula.racedb.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ourogula.racedb.entities.Race;
import com.ourogula.racedb.repositories.RaceRepository;

@Service
public class RaceServiceImpl implements RaceService {
	@Autowired
	private RaceRepository repo;

	@Override
	public List<Race> findAllRaces() {
		return repo.findAll();
	}

	@Override
	public Race findRaceById(int id) {
		Optional<Race> results = repo.findById(id);
		Race output = null;
		if (results.isPresent()) {
			output = results.get();
		}
		return output;
	}

	@Override
	public List<Race> findRacesByKeyword(String keyword) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Race createRace(Race createMe) {
		Race output = repo.saveAndFlush(createMe);
		return output;
	}

	@Override
	public Race updateRace(int id, Race updateMe) {
		Optional<Race> results = repo.findById(id);
		Race output = null;
		if (results.isPresent()) {
			output = results.get();
			output.setName(updateMe.getName());
		}
		return output;
	}

	@Override
	public Boolean deleteRace(int id) {
		// TODO Auto-generated method stub
		return null;
	}
}
