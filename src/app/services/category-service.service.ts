/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export class Category {
  categoryName: string;
  id: string;

}

@Injectable({
  providedIn: 'root',
})
export class CategoryCrudService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  createCategory(category: Category): Observable<any> {
    return this.httpClient.post<Category>('http://sharkathon.one:8182/v1/api/categories',category,this.httpOptions)
      .pipe(catchError(this.handleError<Category>('Error occured')));
  }

  getCategory(id): Observable<Category[]> {
    return this.httpClient
      .get<Category[]>('http://sharkathon.one:8182/v1/api/categories/' + id)
      .pipe(
        tap((_) => console.log(`Category fetched: ${id}`)),
        catchError(this.handleError<Category[]>(`Get Category id=${id}`))
      );
  }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>('http://sharkathon.one:8182/v1/api/categories').pipe(
      tap((category) => console.log('Category retrieved!')),
      catchError(this.handleError<Category[]>('Get Category', []))
    );
  }

  updateCategory(id, category: Category): Observable<any> {
    return this.httpClient
      .put(
        'http://sharkathon.one:8182/v1/api/categories' + id,
        category,
        this.httpOptions
      )
      .pipe(
        tap((_) => console.log(`Category updated: ${id}`)),
        catchError(this.handleError<Category[]>('Update Category'))
      );
  }

  deleteCategory(id): Observable<Category[]> {
    return this.httpClient
      .delete<Category[]>(
        'http://sharkathon.one:8182/v1/api/categories/' + id,
        this.httpOptions
      )
      .pipe(
        tap((_) => console.log(`Category deleted: ${id}`)),
        catchError(this.handleError<Category[]>('Delete Category'))
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
