import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Flat } from './flatDataType';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {FilterPipe} from "src/app/pipes/filter.pipe";


@Component({
  selector: 'app-flats',
  templateUrl: './flatsList.component.html',
  styleUrls: ['./flatsList.component.css'],

})

export class FlatsListComponent implements OnInit { 
   
  @Output() sizeChange = new EventEmitter<number>();


  flatCards: Flat[]=[];
  filterPipe: FilterPipe = new FilterPipe;
  

 
  constructor(private http: HttpClient){

  }
    
  filterByRooms() {
    this.flatCards = this.filterPipe.transform(this.flatCards, 2)
}
  ngOnInit(){
      this.http.get('https://www.sdvor.com/api/common/flats').subscribe((data: any) => this.flatCards=data["results"]);
  }
}