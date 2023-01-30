package com.ourogula.racedb.controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	public List<Race> findAllRaces() {
		return raceService.findAllRaces();
	}

	@GetMapping("races/{id}")
	public Race findRaceById(@PathVariable int id, HttpServletResponse resp) {
		Race output = raceService.findRaceById(id);
		if (output == null) {
			resp.setStatus(404);
		} else {
			resp.setHeader("Location", "races/" + output.getId());
		}
		return output;
	}
	
	@GetMapping("races/search/{keyword}")
	public List<Race> findRacesByNameKeyword(@PathVariable String keyword, HttpServletResponse resp) {
		List<Race> output = raceService.findRacesByNameKeyword(keyword);
		if (output == null) {
			resp.setStatus(404);
		}
		return output;
	}

	@PostMapping("races")
	public Race createRace(@RequestBody Race createMe, HttpServletResponse resp) {
		Race created = null;
		try {
			if (createMe.getName().equals("")) {
				resp.setStatus(400);
			} else {
			created = raceService.createRace(createMe);
			resp.setStatus(201);
			resp.setHeader("Location", "races/" + created.getId());
			}
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(400);
		}
		return created;
	}

	@PutMapping("races/{id}")
	public Race updateRace(@PathVariable int id, @RequestBody Race updateMe, HttpServletResponse resp) {
		Race updatedRace = null;
		if (raceService.findRaceById(id) == null) {
			resp.setStatus(404);
		} else {
			try {
				updatedRace = raceService.updateRace(id, updateMe);
				resp.setStatus(202);
				resp.setHeader("Location", "races/" + updatedRace.getId());
			} catch (Exception e) {
				e.printStackTrace();
				resp.setStatus(400);
			}
		}

		return updatedRace;
	}

	@DeleteMapping("races/{id}")
	public void deleteRace(@PathVariable int id, HttpServletResponse resp) {
		Boolean success = raceService.deleteRace(id);
		if (success) {
			resp.setStatus(204);
		} else {
			resp.setStatus(404);
		}
	}
}
