/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit   {
          searchInput:any;
          searchResults:any;
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

        constructor(private cdr: ChangeDetectorRef,private service: ApiService, private router: Router, private http:HttpClient) { }

        searchUser() {
          this.service.getDetailedSearch()
          .subscribe(data => {
            this.searchResults = data;
            this.cdr.detectChanges();
            console.log(data);
    });
        }
        onInputChange(event: any) {
          this.searchInput = event.target.value;
          this.service.updateFields(this.searchInput);
        }

        ngOnInit() {
          this.searchInput = '';
          this.searchResults = [];

        }

       
}
