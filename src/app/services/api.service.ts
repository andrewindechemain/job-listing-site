import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jobPosting } from '../jobs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private username: string;
  private token = environment['token'];
  private clientId = environment.clientId;
  private clientSecret = environment.clientSecret;
  constructor() { }
}
