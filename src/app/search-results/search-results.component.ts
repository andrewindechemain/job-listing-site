/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CustomDatePipe } from '../pipes/date.pipe';
import { CustomSortPipe } from '../pipes/custom-sort.pipe';
import { PaginationInstance } from 'ngx-pagination';
@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule,RouterModule, FormsModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
  providers: [CustomDatePipe,CustomSortPipe]
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
  sortDate: string = 'date';
  p: number = 1;
  itemsPerPage: number = 10; 
  totalItems: number = 3;
  pageOfItems: any[] = [];

  onPageChange(page: number) {
    this.setPage(page);
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pageOfItems = this.filteredResults.slice(startIndex, endIndex);
    console.log('Filtered Results:', this.filteredResults); 
    console.log('Pagination:', this.pageOfItems); 
  }

  setPage(page: number) {
    this.p = page;
  }

  constructor(
  private route: ActivatedRoute, private service: ApiService,private customDatePipe: CustomDatePipe,
  private http: HttpClient,private cdr: ChangeDetectorRef ) {}

  formatDate(value: string): string {
    return this.customDatePipe.transform(value);
  }
   ngOnInit() {
    this.results = [];
    this.filteredResults = [];
  
    this.route.queryParams.subscribe(params => {
      const newResults = JSON.parse(params['results']);
      this.results = newResults.results || [];
      console.log('Results:', this.results);
      this.applyFilters();
      this.totalItems = this.filteredResults.length;
      this.pageOfItems = this.filteredResults.slice(0, this.itemsPerPage);
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
    const today = new Date().getTime();
    const oneMonthAgo = new Date().setMonth(new Date().getMonth() - 1);
  
    if (this.date === 'today') {
      this.filteredResults = this.results.filter(result => new Date(result.created).toDateString() === new Date().toDateString());
    } else if (this.date === 'this_month') {
      this.filteredResults = this.results.filter(result => new Date(result.created).getTime() > oneMonthAgo && new Date(result.created).getTime() <= today);
    } else if (this.date === 'last_month') {
      this.filteredResults = this.results.filter(result => new Date(result.created).getTime() > oneMonthAgo - 30 * 24 * 60 * 60 * 1000 && new Date(result.created).getTime() <= oneMonthAgo);
    } else {
      this.filteredResults = this.results;
    }
  
    this.sortByDate();
   }

  onRelevanceChange() {
    this.applyFilters();
    this.sortByRelevance();
  }

  onTypeChange() {
    this.applyFilters();
  }

  sortByDate() {
    this.filteredResults.sort((a, b) => {
      return new Date(b.created).getTime() - new Date(a.created).getTime();
    });
    this.cdr.detectChanges();
  }
  sortByRelevance(){
    this.filteredResults.sort((a, b) => {
      const dateA = new Date(a.created).getTime();
      const dateB = new Date(b.created).getTime();
  
      if (this.relevance === 'most_relevant') {
        return dateB - dateA;
      } else if (this.relevance === 'least_relevant') {
        return dateA - dateB;
      } else {
        return 0;
      }
    });
    this.cdr.detectChanges();
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
    this.results = [];
    this.filteredResults = [];
  
    this.service.getDetailedSearch().subscribe((newResults: ApiService) => {
      console.log('API Response:', newResults);
      this.searchResults = newResults || { results: [] };
      this.results = this.searchResults.results || [];
      this.applyFilters();
      this.totalItems = this.filteredResults.length;
      this.pageOfItems = this.filteredResults.slice(0, this.itemsPerPage);
    });
  }
  onInputChange(event: any) {
    this.searchInput = event.target.value;
    this.service.updateFields(this.searchInput);
  }
}
