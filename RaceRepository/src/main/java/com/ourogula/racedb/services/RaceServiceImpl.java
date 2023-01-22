package com.ourogula.racedb.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ourogula.racedb.entities.Language;
import com.ourogula.racedb.entities.Race;
import com.ourogula.racedb.entities.Series;
import com.ourogula.racedb.repositories.LanguageRepository;
import com.ourogula.racedb.repositories.RaceRepository;
import com.ourogula.racedb.repositories.SeriesRepository;

@Service
public class RaceServiceImpl implements RaceService {
	@Autowired
	private RaceRepository repo;
	@Autowired
	private LanguageRepository langRepo;
	@Autowired
	private SeriesRepository seriesRepo;

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
	public List<Race> findRacesByNameKeyword(String keyword) {
		List<Race> output = null;
		if (keyword != null) {
			keyword = "%" + keyword + "%";
			output = repo.findByNameLike(keyword);
		}
		if (output != null && output.isEmpty()) {
			output = null;
		}
		
		return output;
	}

	@Override
	public Race createRace(Race createMe) {
		if (createMe.getLanguage() == null) {
			createMe.setLanguage(langRepo.findById(1).get());
		} else {
			Optional<Language> raceLang = langRepo.findById(createMe.getLanguage().getId());
			if (raceLang.isPresent()) {
				createMe.setLanguage(raceLang.get());
			}
		}
		
		if (createMe.getSeries() == null) {
			createMe.setSeries(seriesRepo.findById(1).get());
		} else {
			Optional<Series> raceSeries = seriesRepo.findById(createMe.getSeries().getId());
			if (raceSeries.isPresent()) {
				createMe.setSeries(raceSeries.get());
			} 
		}
		
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
			output.setDescription(updateMe.getDescription());
			output.setImageUrl(updateMe.getImageUrl());
			output.setLore(updateMe.getLore());
			output.setPersonalityTraits(updateMe.getPersonalityTraits());
			output.setPhysicalTraits(updateMe.getPhysicalTraits());
			output.setPlanet(updateMe.getPlanet());
			output.setRegion(updateMe.getRegion());
			//Language error Checking
			if (updateMe.getLanguage() == null) {
				updateMe.setLanguage(langRepo.findById(1).get());
			} else {
				Optional<Language> raceLang = langRepo.findById(updateMe.getLanguage().getId());
				if (raceLang.isPresent()) {
					updateMe.setLanguage(raceLang.get());
				}
			}
			output.setLanguage(updateMe.getLanguage());
			//Series error checking
			if (updateMe.getSeries() == null) {
				updateMe.setSeries(seriesRepo.findById(1).get());
			} else {
				Optional<Series> raceSeries = seriesRepo.findById(updateMe.getSeries().getId());
				if (raceSeries.isPresent()) {
					updateMe.setSeries(raceSeries.get());
				} 
			}
			output.setSeries(updateMe.getSeries());
			
			repo.saveAndFlush(output);
		}
		return output;
	}

	@Override
	public Boolean deleteRace(int id) {
		Boolean success = false;

		Optional<Race> result = repo.findById(id);
		if (result.isPresent()) {
			Race deleteMe = result.get();
			repo.deleteById(deleteMe.getId());
			success = true;
		}

		return success;
	}
}
