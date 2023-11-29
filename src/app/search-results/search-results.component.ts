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
  

  constructor(private route: ActivatedRoute) {}
   ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const results = JSON.parse(params['results']);
      this.results = results.results || [];
    });
  }
}
