import { Component, OnInit } from '@angular/core';
import { FlatResponse, Flat } from './flatDataType';
import { FlatService } from "../facade/flat.services";
import { Observable } from 'rxjs';

import { roomsOptions, categoryOptions, citySelect } from "src/app/flats/facetOptions"


@Component({
  selector: 'app-flats',
  templateUrl: './flatsList.component.html',
  styleUrls: ['./flatsList.component.css'],
  providers: [FlatService]
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

  constructor(private httpService: FlatService) {
  }

  onRoomsCheckboxChange(e: any) {
    if (e.target.checked) {
      this.flatResponse$ = this.httpService.getFlatsWithFacets({currentPage: this.defaultPage, roomsAmount: e.target.value});
    }
    else {
      this.flatResponse$ = this.httpService.getFlatsWithFacets({currentPage: this.defaultPage});
    }
  }

  onCategoryCheckboxChange(e: any) {
    if (e.target.checked) {

      this.flatResponse$ = this.httpService.getFlatsWithFacets({currentPage: this.defaultPage, flatCategory:e.target.value});
    } else {
      this.flatResponse$ = this.httpService.getFlatsWithFacets({currentPage: this.defaultPage});
    }
  }

  onCityChange(city: string) {
    if (city !== "Все города") {
      this.flatResponse$ = this.httpService.getFlatsWithFacets({currentPage: this.defaultPage, city: city});
    }
    else {
      this.flatResponse$ = this.httpService.getFlatsWithFacets({currentPage: this.defaultPage});
    }
  }

  onPageChange(page: number) {
    if (page !== this.currentPageNumber) {
      this.flatResponse$ = this.httpService.getFlatsWithFacets({currentPage: page});
      this.currentPageNumber = page;
    }

  }

  ngOnInit() {
    this.flatResponse$ = this.httpService.getFlatsWithFacets({currentPage: this.defaultPage});
  }

}