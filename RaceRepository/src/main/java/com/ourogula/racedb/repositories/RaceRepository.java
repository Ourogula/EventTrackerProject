package com.ourogula.racedb.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ourogula.racedb.entities.Race;

public interface RaceRepository extends JpaRepository<Race, Integer>{

}
