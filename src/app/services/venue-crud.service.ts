/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export class Venue {
  id: number;
  placeEvent: string;
  nameEvent: string;
  dateEvent: Date;
  artistas: [string];
  typeEvent: string;
}

@Injectable({
  providedIn: 'root',
})
export class VenueCrudService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  createVenue(venue: Venue): Observable<any> {
    return this.httpClient.post<Venue>('http://localhost:8182/api/event',venue,this.httpOptions)
      .pipe(catchError(this.handleError<Venue>('Error occured')));
  }

  getVenue(id): Observable<Venue[]> {
    return this.httpClient
      .get<Venue[]>('http://localhost:4000/api/fetch-venue/' + id)
      .pipe(
        tap((_) => console.log(`Venue fetched: ${id}`)),
        catchError(this.handleError<Venue[]>(`Get venue id=${id}`))
      );
  }

  getVenues(): Observable<Venue[]> {
    return this.httpClient.get<Venue[]>('https://venue.free.beeceptor.com/getVenues').pipe(
      tap((venues) => console.log('Venues retrieved!')),
      catchError(this.handleError<Venue[]>('Get venue', []))
    );
  }

  updateVenue(id, venue: Venue): Observable<any> {
    return this.httpClient
      .put(
        'http://localhost:4000/api/update-venue/' + id,
        venue,
        this.httpOptions
      )
      .pipe(
        tap((_) => console.log(`Venue updated: ${id}`)),
        catchError(this.handleError<Venue[]>('Update venue'))
      );
  }

  deleteVenue(id): Observable<Venue[]> {
    return this.httpClient
      .delete<Venue[]>(
        'http://localhost:4000/api/delete-venue/' + id,
        this.httpOptions
      )
      .pipe(
        tap((_) => console.log(`Venue deleted: ${id}`)),
        catchError(this.handleError<Venue[]>('Delete venue'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
