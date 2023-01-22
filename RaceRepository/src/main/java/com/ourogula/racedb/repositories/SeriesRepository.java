package com.ourogula.racedb.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ourogula.racedb.entities.Series;

public interface SeriesRepository extends JpaRepository<Series, Integer> {

}
