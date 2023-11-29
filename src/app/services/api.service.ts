import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment  } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public search: any;
  private clientId = environment.clientId;
  private apiKey = environment.apiKey;
  constructor(private http: HttpClient) { }
  getJobsdata(){
    return this.http.get (`https://api.adzuna.com/v1/api/jobs/us/search/1?app_id={this.clientId}&app_key={this.apiKey}`);
  }
  getLocation(){
    return this.http.get (`https://api.adzuna.com/v1/api/jobs/us/categories?app_id=${this.clientId}&app_key=${this.apiKey}`);
  }
  getRelevance(){
    return this.http.get (`https://api.adzuna.com/v1/api/jobs/us/top_companies?app_id=${this.clientId}&app_key=${this.apiKey}`);
  }
  getDetailedSearch(){
    return this.http.get (`http://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${this.clientId}&app_key=${this.apiKey}&what=${this.search}&results_per_page=5&content-type=application/json`)
  }
  updateFields(what: string) {
    this.search = what;
  }
}
