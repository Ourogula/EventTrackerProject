package com.ourogula.racedb.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ourogula.racedb.entities.Language;
import com.ourogula.racedb.repositories.LanguageRepository;

@Service
public class LanguageServiceImpl implements LanguageService {

	@Autowired
	LanguageRepository repo;
	
	public List<Language> findAll() {
		return repo.findAll();
	}

	@Override
	public Language findById(int id) {
		Optional<Language> result = repo.findById(id);
		Language output = null;
		if (result.isPresent()) {
			output = result.get();
		}
		
		return output;
	}

	@Override
	public Language createLanguage(Language createMe) {
		Language output = null;
		if (createMe != null) {
			repo.saveAndFlush(createMe);
			output = createMe;
		}
		return output;
	}

	@Override
	public Language updateLanguage(int id, Language updateMe) {
		Language output = null;
		if (updateMe != null) {
			Optional <Language> result = repo.findById(id);
			if (result.isPresent()) {
				output = result.get();
				output.setName(updateMe.getName());
				repo.saveAndFlush(output);
			}
		}
		
		return output;
	}

	@Override
	public Boolean deleteLanguage(int id) {
		Boolean success = false;
		Optional <Language> result = repo.findById(id);
		if (result.isPresent()) {
			repo.delete(result.get());
			success = true;
		}
		return success;
	}
}
