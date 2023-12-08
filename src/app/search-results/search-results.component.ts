import { Component, OnInit, ChangeDetectorRef    } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnInit   {
  results: any[] = [];
  location: string = 'all';
  date: string = 'all';
  type: string = 'all';
  relevance: string = 'all';
  filteredResults: any[] = [];

  constructor(
  private route: ActivatedRoute) {}
  private service!: ApiService; 
    private cdr!: ChangeDetectorRef
   ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const results = JSON.parse(params['results']);
      this.results = results.results || [];
      this.applyFilters();
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
    this.filteredResults = this.results.slice();
    if (this.location !== 'all') {
      this.filteredResults = this.filteredResults.filter(
        (result) => result.location.area.includes(this.location)
      );
    }
    if (this.date !== 'all') {
      const filterDate = new Date();
      filterDate.setDate(filterDate.getDate() - 7); 

      this.filteredResults = this.filteredResults.filter(
        (result) => new Date(result.created) >= filterDate
      );
    }
    if (this.type !== 'all') {
      this.filteredResults = this.filteredResults.filter(
        (result) => result.contract_type === this.type
      );
    }
    if (this.relevance === 'most-relevant') {
      this.filteredResults = this.filteredResults.filter(
        (result) => result.company.display_name === this.relevance
      );
    } else if (this.relevance === 'least-relevant') {
      this.filteredResults = this.filteredResults.filter(
        (result) => result.salary_min === this.relevance
        );
      }
  }
}
