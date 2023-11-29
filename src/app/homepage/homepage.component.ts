/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { FormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
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

        constructor(private router: Router,private cdr: ChangeDetectorRef,
          private service: ApiService, private http:HttpClient, private fb: FormBuilder) {
            this.searchForm = this.fb.group({
              search: ['', Validators.required]
            })
           }
          
        
        searchUser() {
          if (this.searchForm.valid) {
          this.service.getDetailedSearch()
          .subscribe(data => {
            this.router.navigate(['search'], 
            { queryParams: { results: JSON.stringify(data) } });
            this.searchResults = data;
            this.cdr.detectChanges();
            console.log(data);
    });
        }
      }
        onInputChange(event: any) {
          this.searchInput = event.target.value;
          this.service.updateFields(this.searchInput);
        }

        ngOnInit() {
          this.searchResults = this.service.getDetailedSearch();
          this.searchResults.subscribe((data: ApiService) => {
            this.searchResults = data || { results: [] };
  });
  this.searchForm = this.fb.group({
    search: ['', Validators.required]
  });

        }
        

       
}
