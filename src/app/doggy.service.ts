import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class DogService {
  constructor(private http: HttpClient) {}

  private dogBreedsUrl = 'https://dog.ceo/api/breeds/list/all';

  getAllBreeds(): Observable<any> {
    return this.http
      .get<any>(this.dogBreedsUrl)
      .pipe(catchError(this.handleError('getAllBreeds', [])));
  }

  searchByBreed(breed): Observable<any> {
    return this.http
      .get<any>('https://dog.ceo/api/breed/' + breed + '/images/random')
      .pipe(catchError(this.handleError('getAllBreeds', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
