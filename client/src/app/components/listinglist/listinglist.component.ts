import {Component, OnInit} from '@angular/core';
import { gql} from 'apollo-angular';
import { GraphqlapiService } from 'src/app/services/graphqlapi.service';

@Component({
  selector: 'app-listinglist',
  templateUrl: './listinglist.component.html',
  styleUrls: ['./listinglist.component.scss']
})


export class ListinglistComponent implements OnInit {
  listings:  any[];

  constructor(private graphqlapiService: GraphqlapiService) {}

  ngOnInit() {
    this.graphqlapiService
    .getListings()
    .subscribe((listings: Object[]) => {
      this.listings = listings;
    });
  }
}