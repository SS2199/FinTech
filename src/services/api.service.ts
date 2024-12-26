import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://celescontainerwebapp-server.mongo.cosmos.azure.com:443/';
  //private apiUrl = 'http://localhost:5000/items';

  constructor(private http: HttpClient) {}

  getItems(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      map(response => {
        // Ensure the response is JSON
        if (typeof response === 'object') {
          return response;
        } else {
          throw new Error('Unexpected response format');
        }
      }),
      catchError(this.handleError)
    );
  }

  addItem(item: any): Observable<any> {
    return this.http.post(this.apiUrl, item).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server error (status: ${error.status}): ${error.message}`;
      // Optionally log the text content if available
      if (error.error?.text) {
        console.error('Error response text:', error.error.text);
      }
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
