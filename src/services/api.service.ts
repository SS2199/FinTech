import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface Item {
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://celescontainerwebapp-staging-b5g9ehgkhyb0dpe9.westus3-01.azurewebsites.net';
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

  // addItem(item: any): Observable<any> {
  //   return this.http.post(this.apiUrl, item).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  /*addItem(item: Item): Observable<any> {
    // Specify the expected response type (if JSON)
    return this.http.post<any>(this.apiUrl, item).pipe(
      // Handle successful response with map operator (optional)
      map(response => {
        // Process the response data here (if needed)
        return response;
      }),
      // Handle errors using catchError operator
      catchError(this.handleError)
    );
  }*/

    addItem(item: any): Observable<Item> {
      return this.http.post<Item>('https://https://celescontainerwebapp-staging-b5g9ehgkhyb0dpe9.westus3-01.azurewebsites.net/items', item, {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'json' as 'json' // Explicitly expect JSON
      });
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
