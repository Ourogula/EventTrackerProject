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

import com.ourogula.racedb.entities.Language;
import com.ourogula.racedb.services.LanguageService;

@RestController
@RequestMapping("api")
public class LanguageController {
	
	@Autowired
	LanguageService langService;
	
	@GetMapping("languages")
	public List<Language> findAll() {
		return langService.findAll();
	}
	
	@GetMapping("languages/{id}")
	public Language findById(@PathVariable int id, HttpServletResponse resp) {
		Language output = langService.findById(id);
		if (output == null) {
			resp.setStatus(404);
		}
		return output;
	}
	
	@PostMapping("languages")
	public Language createLanguage(@RequestBody Language createMe, HttpServletResponse resp) {
		Language output = langService.createLanguage(createMe);
		if (output == null) {
			resp.setStatus(400);
		} else {
			langService.createLanguage(createMe);
			resp.setStatus(201);
			resp.setHeader("Location","languages/" + output.getId());
		}
		return output;
	}
	
	@PutMapping("languages/{id}")
	public Language updateLanguage(@PathVariable int id, @RequestBody Language updateMe, HttpServletResponse resp) {
		Language output = null;
		output = langService.updateLanguage(id, updateMe);
		if (output == null) {
			resp.setStatus(400);
		} else {
			resp.setStatus(202);
			resp.setHeader("Location", "languages/" + output.getId());
		}
		return output;
	}
	
	@DeleteMapping("languages/{id}")
	public void deleteLanguage(@PathVariable int id, HttpServletResponse resp) {
		Boolean success = langService.deleteLanguage(id);
		if (success) {
			resp.setStatus(204);
		} else {
			resp.setStatus(404);
		}
	}
}
