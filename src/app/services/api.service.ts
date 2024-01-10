import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment  } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public search: any;
  private clientId = environment.clientId;
  private apiKey = environment.apiKey;
  constructor(private http: HttpClient) { }
  getJobsdata(){
    return this.http.get (`https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${this.clientId}&app_key=${this.apiKey}`);
  }
  getLocation(){
    return this.http.get (`https://api.adzuna.com/v1/api/jobs/us/categories?app_id=${this.clientId}&app_key=${this.apiKey}`);
  }
  getRelevance(){
    return this.http.get (`https://api.adzuna.com/v1/api/jobs/us/top_companies?app_id=${this.clientId}&app_key=${this.apiKey}`);
  }
  getDetailedSearch(): Observable<any> {
    const apiUrl  = `http://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${this.clientId}&app_key=${this.apiKey}&what=${this.search}&results_per_page=6`;
    return this.http.get(apiUrl);
  }
  updateFields(what: string) {
    this.search = what;
  }
}
