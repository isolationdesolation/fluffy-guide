import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FlatResponse, Flat } from './flatDataType';
import { FlatService } from "../facade/flat.services";
import { Observable, Subject, Subscription } from 'rxjs';

import { roomsOptions, categoryOptions, citySelect, categoriesArray } from "src/app/flats/facetOptions"


@Component({
  selector: 'app-flats',
  templateUrl: './flatsList.component.html',
  styleUrls: ['./flatsList.component.css'],
  providers: [FlatService]
})


export class FlatsListComponent implements OnInit {


  flatResponse$: Subject<FlatResponse> | undefined;
  flatCard: Flat | undefined;

  defaultPage: number = 1;
  currentPageNumber: number = 1;
  form: FormGroup = new FormGroup({});
  params: Array<string> = [];
  // subscription: Subscription;

  cities: Array<{ name: string, id?: number }> = [
    { name: "Все города" },
    { id: 3, name: "Нижневартовск" },
    { id: 13, name: "Челябинск" },
    { id: 5, name: "Пермь" },
    { id: 6, name: "Сургут" },
    { id: 8, name: "Тюмень" },
    { id: 1, name: "Москва" },
    { id: 2, name: "Екатеринбург" },
  ];
  countRooms: Array<number> = Array.from({ length: 5 }, (_, i) => i + 1)

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

    // this.subscription = this.httpService.onFormChange(this.form).subscribe();
}



  ngOnInit() {

    interface FormData {
      [name: string]: FormControl;
    }


    let categories: FormData = {};

    let countRooms: FormData = {};

    this.countRooms.forEach((item, index) => {
      countRooms[item] = new FormControl();
    });

    this.categories.forEach((item, index) => {
      categories[item.id] = new FormControl();
    })

    this.form = new FormGroup({
      cities: new FormControl(""),
      categories: new FormGroup(categories),
      countRooms: new FormGroup(countRooms),
    });


    this.form.valueChanges.subscribe(value => {
    this.httpService.getFlatsWithFacets(this.form)
    });
    
    
    this.httpService.getFlatsWithFacets(this.form);
  }

    



}