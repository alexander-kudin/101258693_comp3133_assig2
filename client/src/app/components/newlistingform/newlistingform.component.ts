import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GraphqlapiService } from 'src/app/services/graphqlapi.service';

@Component({
  selector: 'app-newlistingform',
  templateUrl: './newlistingform.component.html',
  styleUrls: ['./newlistingform.component.scss']
})
export class NewlistingformComponent implements OnInit {

  constructor(private snackBar:MatSnackBar, private graphqlapiService: GraphqlapiService){

  }

  ngOnInit(): void {
  }

  createListing(
    listing_title: string, 
    description: string,
    city: string,
    street: string,
    postal_code: string,
    price: string,
    email: string){
    try {
      this.graphqlapiService.createListing(listing_title, description, city, street, postal_code, Number(price), email);
      this.snackBar.open('Listing Created','',{duration:1000})
    } catch (error) {
      this.snackBar.open('Listing was not created','',{duration:1000})
    }
  }

}
