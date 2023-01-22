package com.ourogula.racedb.services;

import java.util.List;

import com.ourogula.racedb.entities.Series;

public interface SeriesService {
	List<Series> findAll();
	Series findById(int id);
	Series createSeries(Series createMe);
	Series updateSeries(int id, Series updateMe);
	Boolean deleteSeries(int id);
}
