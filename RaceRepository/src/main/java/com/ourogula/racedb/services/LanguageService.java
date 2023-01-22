package com.ourogula.racedb.services;

import java.util.List;

import com.ourogula.racedb.entities.Language;

public interface LanguageService {
	List<Language> findAll();
	Language findById(int id);
	Language createLanguage(Language createMe);
	Language updateLanguage(int id, Language updateMe);
	Boolean deleteLanguage(int id);
}
