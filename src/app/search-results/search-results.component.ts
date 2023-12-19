/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule,RouterModule, FormsModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnInit   {
  searchResults:any;
  searchInput:any;
  results: any[] = [];
  location: string = 'all';
  date: string = 'all';
  type: string = 'all';
  relevance: string = 'all';
  filteredResults: any[] = [];

  constructor(
  private route: ActivatedRoute, private service: ApiService,private http: HttpClient,private cdr: ChangeDetectorRef ) {}

   ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const results = JSON.parse(params['results']);
      this.results = results.results || [];
      this.applyFilters();
      this.searchResults = this.service.getDetailedSearch();
    });
  }
  
  onApplyNowClick() {
    alert('Your Application has been recieved!'); 
  }
  onLocationChange() {
    this.applyFilters();
  }

  onDateChange() {
    this.applyFilters();
  }

  onTypeChange() {
    this.applyFilters();
  }

  onRelevanceChange() {
    this.applyFilters();
  }
  applyFilters() {
   
  }
  updateSearchResults() {
    this.results = [];
    this.service.getDetailedSearch().subscribe((newResults: ApiService) => {
      this.searchResults = newResults || { results: [] };
      this.results = this.searchResults.results || [];
    });
  }
  onInputChange(event: any) {
    this.searchInput = event.target.value;
    this.service.updateFields(this.searchInput);
  }
}
