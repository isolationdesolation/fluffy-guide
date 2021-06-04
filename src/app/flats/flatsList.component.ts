import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flat } from './flatDataType';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from "./flats.service"
import { FilterPipe } from "src/app/pipes/filter.pipe";
import { FlatTypePipe } from "src/app/pipes/flatType.pipe";
import { CityPipe } from "src/app/pipes/city.pipe";
import { roomsOptions, categoryOptions, citySelect } from "src/app/flats/facetOptions"

export interface roomsCheckbox {
  roomsAmount: number;
  chosen: boolean;
}

@Component({
  selector: 'app-flats',
  templateUrl: './flatsList.component.html',
  styleUrls: ['./flatsList.component.css'],
  providers: [HttpService]

})


export class FlatsListComponent implements OnInit {


  flatCards: Flat[] = [];
  selectedCity: string = "Все города";

  checkboxesRoom = roomsOptions;
  checkboxesCategory = categoryOptions;
  citySelect = citySelect;


  constructor(private httpService: HttpService) {

  }

  onRoomsCheckboxChange(e: any) {
    if (e.target.checked) {
      this.httpService.getFlatsWithFacets(1, undefined, undefined, e.target.value).subscribe((data: any) => this.flatCards = data["results"]);
    }
    else {
      this.httpService.getFlatsWithFacets(1).subscribe((data: any) => this.flatCards = data["results"]);
    }
  }

  onCategoryCheckboxChange(e: any) {
    if (e.target.checked) {

      this.httpService.getFlatsWithFacets(1, undefined, e.target.value).subscribe((data: any) => this.flatCards = data["results"]);
    } else {
      this.httpService.getFlatsWithFacets(1).subscribe((data: any) => this.flatCards = data["results"]);
    }
  }

  onCityChange(city: string) {
    if (city !== "Все города") {
      this.httpService.getFlatsWithFacets(1, city).subscribe((data: any) => this.flatCards = data["results"]);
    }
    else {
      this.httpService.getFlatsWithFacets(1).subscribe((data: any) => this.flatCards = data["results"]);
    }
  }


  ngOnInit() {
    this.httpService.getFlatsWithFacets(1).subscribe((data: any) => this.flatCards = data["results"]);
  }
}