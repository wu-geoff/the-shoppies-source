import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OmdbService {

  constructor(private http: HttpClient) { }

  response: any;

  search(terms: Observable<string>): any {
    return terms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((term: string) => this.getMovie(term))
    );
  }

  getMovie(name: string): Observable<object> {
    const apikey = "59657f00", url = "https://www.omdbapi.com", type = "movie";
    const options = {
      params: {
        "apikey": apikey,
        "s": name,
        "type": type
      }
    };
    /*this.http.get(url, options).subscribe(data => {
      this.response = data;
    });
    console.log(this.response);
    return this.response;*/
    if (name === '') {
      return of({});
    }
    return this.http.get(url, options);
  }
}
