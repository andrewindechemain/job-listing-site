/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CustomDatePipe } from '../pipes/date.pipe';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule,RouterModule, FormsModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
  providers: [CustomDatePipe]
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
  private route: ActivatedRoute, private service: ApiService,private customDatePipe: CustomDatePipe,
  private http: HttpClient,private cdr: ChangeDetectorRef ) {}

  formatDate(value: string): string {
    return this.customDatePipe.transform(value);
  }
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
    this.sortByDate();
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);
    this.filteredResults = this.filteredResults.filter(result => {
      const resultDate = new Date(result.created);
      if (this.date === 'latest') {
        return resultDate.toDateString() === today.toDateString();
      } else if (this.date === 'this month') {
        return resultDate.getMonth() === today.getMonth();
      } else if (this.date === 'last month') {
        return resultDate.getMonth() === oneMonthAgo.getMonth();
      } else {
        return true;
      }
    });
  }

  onTypeChange() {
    this.applyFilters();
  }

  onRelevanceChange() {
    this.applyFilters();
  }
  sortByDate(){
    this.results.sort((a, b) => {
      return new Date(b.created).getTime() - new Date(a.created).getTime();
     });
  }
  sortByRelevance(){
    
  }
  applyFilters() {
    this.filteredResults = this.results.filter(result => {
      if (this.location === 'all') {
        return true; 
      } else {
        return result.location.display_name === this.location;
      }
    });
  }
  updateSearchResults() {
      this.service.getDetailedSearch().subscribe((newResults: ApiService) => {
        console.log('API Response:', newResults);
        this.searchResults = newResults || { results: [] };
        this.results = this.searchResults.results || [];     
      });
  }
  onInputChange(event: any) {
    this.searchInput = event.target.value;
    this.service.updateFields(this.searchInput);
  }
}
