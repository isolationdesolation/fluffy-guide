import { Component, OnInit } from '@angular/core';
import { FlatResponse, Flat } from './flatDataType';
import { HttpService } from "./flats.service"
import { Observable } from 'rxjs';

import { roomsOptions, categoryOptions, citySelect } from "src/app/flats/facetOptions"


@Component({
  selector: 'app-flats',
  templateUrl: './flatsList.component.html',
  styleUrls: ['./flatsList.component.css'],
  providers: [HttpService]
})


export class FlatsListComponent implements OnInit {
  flatResponse$: Observable<FlatResponse> | undefined;
  flatCard: Flat | undefined;

  selectedCity: string = "Все города";
  defaultPage: number = 1;
  currentPageNumber: number = 1;

  checkboxesRoom = roomsOptions;
  checkboxesCategory = categoryOptions;
  citySelect = citySelect;

  constructor(private httpService: HttpService) {
  }

  onRoomsCheckboxChange(e: any) {
    if (e.target.checked) {
      this.flatResponse$ = this.httpService.getFlatsWithFacets(this.defaultPage, undefined, undefined, e.target.value);
    }
    else {
      this.flatResponse$ = this.httpService.getFlatsWithFacets(this.defaultPage);
    }
  }

  onCategoryCheckboxChange(e: any) {
    if (e.target.checked) {

      this.flatResponse$ = this.httpService.getFlatsWithFacets(this.defaultPage, undefined, e.target.value);
    } else {
      this.flatResponse$ = this.httpService.getFlatsWithFacets(this.defaultPage);
    }
  }

  onCityChange(city: string) {
    if (city !== "Все города") {
      this.flatResponse$ = this.httpService.getFlatsWithFacets(this.defaultPage, city);
    }
    else {
      this.flatResponse$ = this.httpService.getFlatsWithFacets(this.defaultPage);
    }
  }

  onPageChange(page: number) {
    if (page !== this.currentPageNumber) {
      this.flatResponse$ = this.httpService.getFlatsWithFacets(page);
      this.currentPageNumber = page;
    }

  }

  ngOnInit() {
    this.flatResponse$ = this.httpService.getFlatsWithFacets(this.defaultPage);
  }

}