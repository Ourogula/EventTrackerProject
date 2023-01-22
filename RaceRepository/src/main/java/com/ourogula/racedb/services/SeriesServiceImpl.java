package com.ourogula.racedb.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ourogula.racedb.entities.Language;
import com.ourogula.racedb.entities.Series;
import com.ourogula.racedb.repositories.SeriesRepository;

@Service
public class SeriesServiceImpl implements SeriesService {

	@Autowired
	private SeriesRepository repo;

	@Override
	public List<Series> findAll() {
		return repo.findAll();
	}

	@Override
	public Series findById(int id) {
		Optional<Series> result = repo.findById(id);
		Series output = null;
		if (result.isPresent()) {
			output = result.get();
		}
		
		return output;
	}

	@Override
	public Series createSeries(Series createMe) {
		Series output = null;
		if (createMe != null) {
			repo.saveAndFlush(createMe);
			output = createMe;
		}
		return output;
	}

	@Override
	public Series updateSeries(int id, Series updateMe) {
		Series output = null;
		if (updateMe != null) {
			Optional <Series> result = repo.findById(id);
			if (result.isPresent()) {
				output = result.get();
				output.setName(updateMe.getName());
				repo.saveAndFlush(output);
			}
		}
		
		return output;
	}

	@Override
	public Boolean deleteSeries(int id) {
		Boolean success = false;
		Optional <Series> result = repo.findById(id);
		if (result.isPresent()) {
			repo.delete(result.get());
			success = true;
		}
		return success;
	}
}
