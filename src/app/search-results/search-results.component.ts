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
export class SearchResultsComponent implements OnInit  {
job: any;
  constructor(private route: ActivatedRoute) { }
  jobs: any[] = [];
  search: string = '';
  categories: any[] = [];
  location: string = 'all';
  title: string = 'all';
  company: string = 'all';
  date: string = 'all'; 
  type: string = 'all';
  relevance: string = 'all';
  filterJobs() {
    this.jobs = this.categories.filter(job => {
      return (this.location === 'all' || job.location === this.location) &&
             (this.date === 'all' || job.date === this.date) &&
             (this.type === 'all' || job.type === this.type) &&
             (this.relevance === 'all' || job.relevance === this.relevance);
    });
  }

  ngOnInit() { 
    this.route.queryParams.subscribe(params => {
      this.search = params['search'];
      this.categories = JSON.parse(params['categories']);
      this.filterJobs();
    });
  }
  onLocationChange(event: any) {
    this.location = event.target.value;
    this.filterJobs();
  }
}
