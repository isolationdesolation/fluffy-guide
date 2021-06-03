import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Flat } from '../flats/flatDataType';


@Component({
  selector: 'app-facet',
  templateUrl: './facet.component.html',
  styleUrls: ['./facet.component.css'],

})

export class FacetComponent implements OnInit { 
   
  flatCards: Flat[]=[];
   
  constructor(private http: HttpClient){}
    
  ngOnInit(){
        
      this.http.get('https://www.sdvor.com/api/common/flats').subscribe((data: any) => this.flatCards=data["results"]);
  }
}