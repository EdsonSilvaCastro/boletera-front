import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export class Artist {
  id: number;
  name: string;
  descripton: string;
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class ArtistCrudService {
  httpOptions = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  createArtist(artist: Artist): Observable<any> {
    return this.httpClient.post<Artist>('http://localhost:4000/api/create-artist',artist,this.httpOptions)
      .pipe(catchError(this.handleError<Artist>('Error occured')));
  }

  getArtist(id): Observable<Artist[]> {
    return this.httpClient
      .get<Artist[]>('http://localhost:4000/api/fetch-artist/' + id)
      .pipe(
        tap((_) => console.log(`Artist fetched: ${id}`)),
        catchError(this.handleError<Artist[]>(`Get artist id=${id}`))
      );
  }

  getArtists(): Observable<Artist[]> {
    return this.httpClient
      .get<Artist[]>('http://localhost:4000/api/artist')
      .pipe(
        tap((artists) => console.log('Artists retrieved!')),
        catchError(this.handleError<Artist[]>('Get artist', []))
      );
  }

  updateArtist(id, artist: Artist): Observable<any> {
    return this.httpClient
      .put(
        'http://localhost:4000/api/update-artist/' + id,
        artist,
        this.httpOptions
      )
      .pipe(
        tap((_) => console.log(`Artist updated: ${id}`)),
        catchError(this.handleError<Artist[]>('Update artist'))
      );
  }

  deleteArtist(id): Observable<Artist[]> {
    return this.httpClient
      .delete<Artist[]>(
        'http://localhost:4000/api/delete-artist/' + id,
        this.httpOptions
      )
      .pipe(
        tap((_) => console.log(`Artist deleted: ${id}`)),
        catchError(this.handleError<Artist[]>('Delete artist'))
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
