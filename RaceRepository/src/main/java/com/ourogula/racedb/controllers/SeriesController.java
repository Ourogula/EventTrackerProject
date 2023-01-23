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

import com.ourogula.racedb.entities.Series;
import com.ourogula.racedb.services.SeriesService;

@RestController
@RequestMapping("api")
public class SeriesController {

	@Autowired
	private SeriesService seriesService;

	@GetMapping("series")
	public List<Series> findAll() {
		return seriesService.findAll();
	}

	@GetMapping("series/{id}")
	public Series findById(@PathVariable int id, HttpServletResponse resp) {
		Series output = seriesService.findById(id);
		if (output == null) {
			resp.setStatus(404);
		}
		return output;
	}

	@PostMapping("series")
	public Series createSeries(@RequestBody Series createMe, HttpServletResponse resp) {
		Series output = seriesService.createSeries(createMe);
		if (output == null) {
			resp.setStatus(400);
		} else {
			seriesService.createSeries(createMe);
			resp.setStatus(201);
			resp.setHeader("Location", "series/" + output.getId());
		}
		return output;
	}

	@PutMapping("series/{id}")
	public Series updateSeries(@PathVariable int id, @RequestBody Series updateMe, HttpServletResponse resp) {
		Series output = null;
		output = seriesService.updateSeries(id, updateMe);
		if (output == null) {
			resp.setStatus(400);
		} else {
			resp.setStatus(202);
			resp.setHeader("Location", "series/" + output.getId());
		}
		return output;
	}

	@DeleteMapping("series/{id}")
	public void deleteSeries(@PathVariable int id, HttpServletResponse resp) {
		try {
		Boolean success = seriesService.deleteSeries(id);
		if (success) {
			resp.setStatus(204);
		} else {
			resp.setStatus(404);
		}} catch (Exception e) {
			resp.setStatus(400);
		}
	}
}
