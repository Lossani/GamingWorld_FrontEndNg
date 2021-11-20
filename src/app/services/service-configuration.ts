import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceConfiguration {
  baseUrl: string = 'http://localhost:8080';
}
