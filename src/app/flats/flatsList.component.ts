import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FlatResponse, Flat } from './flatDataType';
import { FlatService } from "../facade/flat.services";
import { Observable } from 'rxjs';

import { roomsOptions, categoryOptions, citySelect, categoriesArray } from "src/app/flats/facetOptions"


@Component({
  selector: 'app-flats',
  templateUrl: './flatsList.component.html',
  styleUrls: ['./flatsList.component.css'],
  providers: [FlatService]
})


export class FlatsListComponent implements OnInit {

  checkboxesRoom = roomsOptions;
  checkboxesCategory = categoryOptions;
  citySelect = citySelect;

  flatResponse$: Observable<FlatResponse> | undefined;
  flatCard: Flat | undefined;

  selectedCity: string = "Все города";
  defaultPage: number = 1;
  currentPageNumber: number = 1;
  form: FormGroup;

  cities: Array<string> = ["Все города", "Тюмень", "Москва", "Екатеринбург", "Сургут", "Нижневартовск", "Пермь", "Челябинск"]
  countRooms = Array(5).fill(null);
  categories = [
    { name: "квартира", id: "8" },
    { name: "дом", id: "4" },
    { name: "участок", id: "5" },
    { name: "дом с участком", id: "10" },
    { name: "дача", id: "11" },
    { name: "коммерческая", id: "9" },
  ];

  constructor(
    private httpService: FlatService,
  ) {

    interface FormData {
      [name: string]: FormControl;
    }

    const categories: FormData = {};

    const countRooms: FormData = {};

    const cities: FormData = {};

    this.countRooms.forEach((item, index) => {
      countRooms[index] = new FormControl();
    });

    this.categories.forEach((item, index) => {
      categories[index] = new FormControl();
    })

    this.cities.forEach((item, index) => {
      cities[index] = new FormControl();
    })

    this.form = new FormGroup({
      cities: new FormControl(""),
      categories: new FormGroup(categories),
      countRooms: new FormGroup(countRooms),
    });


  }



  submit(event: any) {
    this.form.get("categories")?.setValue(event.target.value)
    this.flatResponse$ = this.httpService.getFlatsWithFacets({ currentPage: this.currentPageNumber, flatCategory: this.form.get("categories")?.value })
    console.log(this.form)
  }

  ngOnInit() {
    this.flatResponse$ = this.httpService.getFlatsWithFacets({ currentPage: this.defaultPage });
  }

}