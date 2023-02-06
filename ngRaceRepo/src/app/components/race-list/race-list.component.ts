import { RaceService } from './../../services/race.service';
import { Component, OnInit } from '@angular/core';
import { Race } from 'src/app/models/race';
import { Router } from '@angular/router';

@Component({
  selector: 'app-race-list',
  templateUrl: './race-list.component.html',
  styleUrls: ['./race-list.component.css']
})
export class RaceListComponent implements OnInit{

  races:Race[] = [];
  showDetails:boolean = false;
  showControls:boolean = false;

constructor(private raceService:RaceService, private router:Router) {}

ngOnInit () {
  this.reload();
}

  reload () {
    this.raceService.index().subscribe({
      next: (races) => {
        this.races = races;
      },
      error: (err) => {
        console.error('Unable to grab races: ' + err);
      }
    })
  }

  create(){}

  updateRedirect(id:number) {
    this.router.navigateByUrl('/update/' + id);
  }

  delete(id:number) {
    this.raceService.deleteRace(id).subscribe({
      next: () => {
        this.router.navigateByUrl('/races');
        this.reload();
      },
      error: (err) => {
        console.error('Error deleting Race from database: '  + err);
        this.router.navigateByUrl('/home');
      }
    });
  }
}
