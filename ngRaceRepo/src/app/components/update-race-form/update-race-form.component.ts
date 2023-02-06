import { ActivatedRoute, Router } from '@angular/router';
import { RaceService } from './../../services/race.service';
import { Component } from '@angular/core';
import { Race } from 'src/app/models/race';

@Component({
  selector: 'app-update-race-form',
  templateUrl: './update-race-form.component.html',
  styleUrls: ['./update-race-form.component.css']
})
export class UpdateRaceFormComponent {

  updateMe:Race = new Race();

  constructor(private raceService:RaceService, private router:Router, private route: ActivatedRoute){}

  ngOnInit () {
    this.reload();
  }

  update(race:Race) {
    this.raceService.updateRace(race).subscribe({
      next: (updated) => {
        this.router.navigateByUrl('/races/' + updated.id);
      },
      error: (err) => {
        console.error('Failed to update race: ' + err);
      }
    })
  }

  reload() {
    let id = this.route.snapshot.paramMap.get('id');
    this.raceService.show(id).subscribe({
      next: (toUpdate) => {
        this.updateMe = toUpdate;
      },
      error: (err) => {
        console.error('Error getting Race to update: ' + err);
        this.router.navigateByUrl('/notFound');
      }
    })
  }
}
