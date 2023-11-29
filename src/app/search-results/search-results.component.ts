import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule],
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

  constructor(private route: ActivatedRoute) {}
   ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const results = JSON.parse(params['results']);
      this.results = results.results || [];
    });
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
      // Implement logic for most-relevant filtering
    } else if (this.relevance === 'least-relevant') {
      // Implement logic for least-relevant filtering
    }
  }
}
