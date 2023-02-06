import { Router } from '@angular/router';
import { RaceService } from './../../services/race.service';
import { Component } from '@angular/core';
import { Race } from 'src/app/models/race';

@Component({
  selector: 'app-create-race-form',
  templateUrl: './create-race-form.component.html',
  styleUrls: ['./create-race-form.component.css']
})
export class CreateRaceFormComponent {
  createMe:Race = new Race();

  constructor(private raceService:RaceService, private router:Router){}

  create(createMe:Race) {
    this.raceService.create(createMe).subscribe({
      next: (created) => {
        this.router.navigateByUrl('/races/' + created.id);
      },
      error: (err) => {
        console.error('Error creating race: ' + err);
      }
    })
  }

}
