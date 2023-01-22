package com.ourogula.racedb.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ourogula.racedb.entities.Race;
import com.ourogula.racedb.services.RaceService;

@RestController
@RequestMapping("api")
public class RaceController {

	@Autowired
	private RaceService raceService;
	
	@GetMapping("races")
	public List<Race> findAllRaces () {
		return raceService.findAllRaces();
	}
}
