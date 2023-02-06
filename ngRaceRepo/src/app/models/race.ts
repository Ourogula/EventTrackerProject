export class Race {
  id:number;
  name:string;
  description:string;
  lore:string;
  personalityTraits:string;
  physicalTraits:string;
  planet:string;
  region:string;
  imageUrl:string;

  constructor(id:number = 0, name:string = '', description:string = '', lore:string = '', personalityTraits:string = '', physicalTraits:string = '',
  planet:string = '', region:string = '', imageUrl:string = '') {
    this.id = id;
    this.name = name;
    this.description = description;
    this.lore = lore;
    this.personalityTraits = personalityTraits;
    this.physicalTraits = physicalTraits;
    this.planet = planet;
    this.region = region;
    this.imageUrl = imageUrl;
  }

//   +--------------------+---------------+------+-----+---------+----------------+
// | Field              | Type          | Null | Key | Default | Extra          |
// +--------------------+---------------+------+-----+---------+----------------+
// | id                 | int(11)       | NO   | PRI | NULL    | auto_increment |
// | name               | varchar(45)   | NO   |     | NULL    |                |
// | description        | text          | YES  |     | NULL    |                |
// | lore               | text          | YES  |     | NULL    |                |
// | personality_traits | varchar(1000) | YES  |     | NULL    |                |
// | physical_traits    | varchar(1000) | YES  |     | NULL    |                |
// | planet             | varchar(100)  | YES  |     | NULL    |                |
// | region             | varchar(200)  | YES  |     | NULL    |                |
// | image_url          | varchar(2048) | YES  |     | NULL    |                |
// | series_id          | int(11)       | NO   | MUL | NULL    |                |
// | language_id        | int(11)       | NO   | MUL | NULL    |                |
}
