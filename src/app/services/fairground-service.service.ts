/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export class Fairground {
  fairgroundStreet: any;
  fairgroundExternalNumber: any;
  fairgroundInternalNumber: any;
  fairgroundLatitude: any;
  fairgroundLongitud: any;
  fairgroundName: any;
  fairgroundZipCode: any;
  sequence: any;
}

@Injectable({
  providedIn: 'root',
})
export class FairgroundCrudService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  createFairground(fairground: Fairground): Observable<any> {
    return this.httpClient.post<Fairground>('http://sharkathon.one:8182/v1/api/fairgrounds',fairground,this.httpOptions)
      .pipe(catchError(this.handleError<Fairground>('Error occured')));
  }

  getFairground(id): Observable<Fairground[]> {
    return this.httpClient
      .get<Fairground[]>('http://sharkathon.one:8182/v1/api/fairgrounds/' + id)
      .pipe(
        tap((_) => console.log(`Fairground fetched: ${id}`)),
        catchError(this.handleError<Fairground[]>(`Get Fairground id=${id}`))
      );
  }

  getFairgrounds(): Observable<Fairground[]> {
    return this.httpClient.get<Fairground[]>('http://sharkathon.one:8182/v1/api/fairgrounds').pipe(
      tap((fairground) => console.log('Fairground retrieved!')),
      catchError(this.handleError<Fairground[]>('Get Fairground', []))
    );
  }

  updateFairground(id, fairground: Fairground): Observable<any> {
    return this.httpClient
      .put(
        'http://sharkathon.one:8182/v1/api/fairgrounds' + id,
        fairground,
        this.httpOptions
      )
      .pipe(
        tap((_) => console.log(`Fairground updated: ${id}`)),
        catchError(this.handleError<Fairground[]>('Update Fairground'))
      );
  }

  deleteFairground(id): Observable<Fairground[]> {
    return this.httpClient
      .delete<Fairground[]>(
        'http://sharkathon.one:8182/v1/api/fairgrounds/' + id,
        this.httpOptions
      )
      .pipe(
        tap((_) => console.log(`Fairground deleted: ${id}`)),
        catchError(this.handleError<Fairground[]>('Delete Fairground'))
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
