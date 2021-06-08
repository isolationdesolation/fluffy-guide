import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Flat } from "../flats/flatDataType";
import { FlatService } from "../facade/flat.services";
import {Observable, Subscription} from "rxjs"



@Component({
    selector: 'flat-details',
    templateUrl: './flatPage.component.html',
    styleUrls: ['./flatPage.component.css'],
    providers: [FlatService]
})

export class FlatPageComponent implements OnInit {
    public flat$: Subscription;
    flat = {} as Flat;
    isLoaded = false;

    constructor(private httpService: FlatService, private route: ActivatedRoute, ) {
        this.flat$ = this.httpService.flat$.subscribe(
          (flat$) => {
            this.flat = flat$;
            this.isLoaded = true;
          }
        );
      }

    ngOnInit() {
        const routeParams = this.route.snapshot.paramMap;
        const flatIdFromRoute = Number(routeParams.get('id'));
        this.httpService.getFlatWithId(flatIdFromRoute)
    }
}