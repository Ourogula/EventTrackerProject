import { Race } from './../models/race';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  url:string = environment.baseUrl + 'api/races';

  constructor(private http:HttpClient) { }

  index() {
    return this.http.get<Race[]>(this.url).pipe(
      catchError((err:any) => {
        return throwError(
          () => new Error('RaceService.index(): error retrieving Race: ' + err)
        )
      })
    )
  }

  show(id:any):Observable<Race> {
    return this.http.get<Race>(this.url + "/" + id).pipe(
      catchError((err:any) => {
        return throwError(
          () => new Error('RaceService.index(): error retrieving Race: ' + err)
          )
        })
    )
  }

  create(createMe:Race): Observable<Race>{
    return this.http.post<Race>(this.url, createMe).pipe(
      catchError((err:any) => {
      console.error(err);
      return throwError(
        () => new Error('RaceService.create(): error creating Race: ' + err))
      ;}
      ))
  }

  updateRace(updateMe:Race): Observable<Race> {
    return this.http.put<Race>(this.url + "/" + updateMe.id, updateMe).pipe(
      catchError((err:any) => {
        return throwError(
          () => new Error('RaceService.updateRace(): error updating Race' + err))
        ;}
      ))
  }

  deleteRace(id:number): Observable<void> {
    return this.http.delete<void>(this.url + "/" + id).pipe(
      catchError((err:any) => {
        return throwError(
          () => new Error('RaceService.deleteRace(): error deleting Race' + err))
        ;}
      )
    )
  }
}
