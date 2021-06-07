import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Flat } from "../flats/flatDataType";
import { FlatService } from "../facade/flat.services";
import {Observable} from "rxjs"



@Component({
    selector: 'flat-details',
    templateUrl: './flatPage.component.html',
    styleUrls: ['./flatPage.component.css'],
    providers: [FlatService]
})

export class FlatPageComponent implements OnInit {
    flat$: Observable<Flat>|undefined

    constructor(
        private route: ActivatedRoute,
        private httpService: FlatService
    ) { }

    ngOnInit() {
        const routeParams = this.route.snapshot.paramMap;
        const flatIdFromRoute = Number(routeParams.get('id'));
        this.flat$ = this.httpService.getFlatWithId(flatIdFromRoute);
    }
}