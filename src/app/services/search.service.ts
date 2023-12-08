/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, OnInit } from '@angular/core';
import { FormsModule,FormBuilder, FormGroup} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root',
})
export class SearchService  {
  searchInput:any;
  searchResults:any[] = [];
  searchForm!: FormGroup; 
  search: any;
  title: any;
  job_logo: any;
  display_name: any;
  location: any;
  description: any;
  contract_type: any;
  tags: any;
  relevance: any;
  date_posted: any
  constructor(private service: ApiService, private http:HttpClient, private fb: FormBuilder) { }
  
  resetSearchInput() {
    this.searchInput = '';
  }
  searchUser() {
    this.service.getDetailedSearch().subscribe((data: any) => {
      this.searchResults = data.results || [];
    });
  }
  onInputChange(event: any) {
    this.searchInput = event.target.value;
    this.service.updateFields(this.searchInput);
  }
}
