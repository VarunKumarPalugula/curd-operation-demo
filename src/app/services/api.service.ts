import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  todoUrl = `https://jsonplaceholder.typicode.com/todos`;

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {
  }

  // get API request
  public apiGetRequest(id?): Observable<any> {
    this.spinner.show();
    const url = id ? `${this.todoUrl}/${id}` : this.todoUrl;
    return this.http.get(url, { observe: 'response' })
      .pipe((tap<any>(response => { return response; })),
        catchError(this.handleError('apiGetRequest')));
  }

  // Post API request
  public apiPostRequest(obj): Observable<any> {
    this.spinner.show();
    return this.http.post(this.todoUrl, obj, { observe: 'response' })
      .pipe((tap<any>(response => {
        return response;
      })),
        catchError(this.handleError('apiPostRequest')));
  }
  // Post API request
  public apiPutRequest(id, obj): Observable<any> {
    this.spinner.show();
    const url = id ? `${this.todoUrl}/${id}` : this.todoUrl;
    return this.http.put(url, obj, { observe: 'response' })
      .pipe((tap<any>(response => {
        return response;
      })),
        catchError(this.handleError('apiPostRequest')));
  }
  // Post API request
  public apiDeleteRequest(id): Observable<any> {
    this.spinner.show();
    const url = id ? `${this.todoUrl}/${id}` : this.todoUrl;
    return this.http.delete(url, { observe: 'response' })
      .pipe((tap<any>(response => {
        return response;
      })),
        catchError(this.handleError('apiPostRequest')));
  }

  // API error handling
  private handleError(operation: String) {
    return (err: HttpErrorResponse) => {
      let errMsg = `error in ${operation}()  status: ${err.status}, ${err.statusText || ''}, ${err} `;
      if (err instanceof HttpErrorResponse) {

        //console.log(`status: ${err.status}, ${err.statusText}`);

      }
      return Observable.throw(err);
    }
  }

}
