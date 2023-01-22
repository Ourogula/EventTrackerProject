package com.ourogula.racedb.entities;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Race {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String name;
	private String description;
	private String lore;
	@Column(name="personality_traits")
	private String personalityTraits;
	@Column(name="physical_traits")
	private String physicalTraits;
	private String planet;
	private String region;
	@ManyToOne
	@JoinColumn(name="language_id")
	private Language language;
	@ManyToOne
	@JoinColumn(name="series_id")
	private Series series;
	
	
	public Race () {}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getLore() {
		return lore;
	}

	public void setLore(String lore) {
		this.lore = lore;
	}

	public String getPersonalityTraits() {
		return personalityTraits;
	}

	public void setPersonalityTraits(String personalityTraits) {
		this.personalityTraits = personalityTraits;
	}

	public String getPhysicalTraits() {
		return physicalTraits;
	}

	public void setPhysicalTraits(String physicalTraits) {
		this.physicalTraits = physicalTraits;
	}

	public String getPlanet() {
		return planet;
	}

	public void setPlanet(String planet) {
		this.planet = planet;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public Language getLanguage() {
		return language;
	}

	public void setLanguage(Language language) {
		this.language = language;
	}

	public Series getSeries() {
		return series;
	}

	public void setSeries(Series series) {
		this.series = series;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Race other = (Race) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "Race [id=" + id + ", name=" + name + ", description=" + description + ", lore=" + lore
				+ ", personalityTraits=" + personalityTraits + ", physicalTraits=" + physicalTraits + ", planet="
				+ planet + ", region=" + region + ", language=" + language + ", series=" + series + "]";
	}
	
	
	
}
