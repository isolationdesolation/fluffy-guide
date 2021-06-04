import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flat } from './flatDataType';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FilterPipe } from "src/app/pipes/filter.pipe";
import { FlatTypePipe} from "src/app/pipes/flatType.pipe";
import { CityPipe} from "src/app/pipes/city.pipe";
import { roomsOptions, categoryOptions, citySelect } from "src/app/flats/facetOptions"

export interface roomsCheckbox {
  roomsAmount: number;
  chosen: boolean;
}

@Component({
  selector: 'app-flats',
  templateUrl: './flatsList.component.html',
  styleUrls: ['./flatsList.component.css'],

})


export class FlatsListComponent implements OnInit {


  flatCards: Flat[] = [];
  filterPipe: FilterPipe = new FilterPipe;
  flatTypePipe: FlatTypePipe = new FlatTypePipe;
  cityPipe: CityPipe = new CityPipe;

  checkboxesRoom = roomsOptions;
  checkboxesCategory = categoryOptions;
  citySelect = citySelect;


  constructor(private http: HttpClient) {

  }

  onRoomsCheckboxChange(e: any) {
  
    if (e.target.checked) {
      this.flatCards = this.filterPipe.transform(this.flatCards, e.target.value)
      console.log(typeof(e.target.value))
    } else {
      this.http.get('https://www.sdvor.com/api/common/flats').subscribe((data: any) => this.flatCards = data["results"])
    }
  }

  onCategoryCheckboxChange(e: any) {
    if (e.target.checked) {
      this.flatCards = this.flatTypePipe.transform(this.flatCards, e.target.value)
      console.log(typeof(e.target.value))
    } else {
      this.http.get('https://www.sdvor.com/api/common/flats').subscribe((data: any) => this.flatCards = data["results"])
    }
  }

  onChange(newValue: any) {
    console.log(newValue);
    this.flatCards = this.cityPipe.transform(this.flatCards, newValue)
}

  


  ngOnInit() {
    this.http.get('https://www.sdvor.com/api/common/flats').subscribe((data: any) => this.flatCards = data["results"]);
  }
}