//ng g service api
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Bolo } from './bolos';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://localhost:3000/api/v1/bolos";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  	constructor(private http: HttpClient) { }

  	private handleError<T> (operation = 'operation', result?: T) {
	    return (error: any): Observable<T> => {

	      // TODO: send the error to remote logging infrastructure
	      console.error(error); // log to console instead

	      // Let the app keep running by returning an empty result.
	      return of(result as T);
	    };
	}

	getBolos(): Observable<Bolo[]>{
		return this.http.get<Bolo[]>(apiUrl).pipe(
			tap(bolos => console.log('fetched bolos')),
			catchError(this.handleError('getBolos',[]))
		);
	};

	getBolo(id): Observable<Bolo>{
		const url = `${apiUrl}/${id}`;
		return this.http.get<Bolo>(url).pipe(
			tap(bolo => console.log(`fetched bolo id=${id}`)),
			catchError(this.handleError<Bolo>(`getBolo id=${id}`))
		);
	};

	addBolo(bolo): Observable<Bolo>{
		return this.http.post<Bolo>(apiUrl, bolo, httpOptions).pipe(
			tap((bolo: Bolo) => console.log(`added product w/ id=${bolo._id}`)),
			catchError(this.handleError<Bolo>(`addBolo`))
		);
	};

	updateBolo(id, bolo): Observable<any>{
		const url = `${apiUrl}/${id}`;
		return this.http.put(apiUrl, bolo, httpOptions).pipe(
			tap(bolo => console.log(`updated bolo w/ id=${id}`)),
			catchError(this.handleError<any>(`updateBolo id=${id}`))
		);
	};

	deleteBolo(id): Observable<Bolo>{
		const url = `${apiUrl}/${id}`;
		return this.http.delete<Bolo>(apiUrl, httpOptions).pipe(
			tap(bolo => console.log(`deleted bolo w/ id=${id}`)),
			catchError(this.handleError<Bolo>(`deleteBolo id=${id}`))
		);
	};
}
