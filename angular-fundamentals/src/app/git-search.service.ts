import { Injectable } from '@angular/core';
import { GitSearch } from './git-search';
import { HttpClient } from '@angular/common/http';
import 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GitSearchService {
  cachedValues: Array<{
      [query: string]: GitSearch
  }> = [];
  constructor(private http: HttpClient) {
   }

   gitSearch = (query: string, pagequery: string): Promise<GitSearch> => {
     let promise = new Promise<GitSearch>((resolve, reject) => {
       if (this.cachedValues[query]){
          resolve(this.cachedValues[query])
       }
       else{
          this.http.get('https://api.github.com/search/repositories?q=' + query +'&page=' + pagequery )
          .toPromise()
          .then( (response) => {
              resolve(response as GitSearch)
          }, (error) => {
              reject(error);
          })
       }
     })
     return promise;
   }
}

