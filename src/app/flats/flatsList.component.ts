import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Flat } from './flatDataType';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';



@Component({
  selector: 'app-flats',
  templateUrl: './flatsList.component.html',
  styleUrls: ['./flatsList.component.css'],

})

export class FlatsListComponent implements OnInit { 
   
  flatCards: Flat[]=[];
 
  constructor(private http: HttpClient, private activateRoute: ActivatedRoute){

  }
    
  ngOnInit(){
        
      this.http.get('https://www.sdvor.com/api/common/flats').subscribe((data: any) => this.flatCards=data["results"]);
  }
}