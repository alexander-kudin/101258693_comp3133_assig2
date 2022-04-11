import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import { GraphqlapiService } from 'src/app/services/graphqlapi.service';
import { MatSnackBar } from '@angular/material/snack-bar';

const LOGIN = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(loginInput: { username: $username, password: $password }) {
      user {
        id
        username
        firstname
        lastname
        password
        email
        type
      },
      token
    }
  }
`;

const REGISTER = gql`
  mutation createUser($username: String!, $firstname: String!, $lastname: String!, $password: String!, $email: String!, $type: String!) {
    createUser(userInput: { username: $username, firstname: $firstname, lastname: $lastname, password: $password, email: $email, type: $type }) {
      id
      username
      firstname
      lastname
      password
      email
      type
    }
  }
`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  authUser: any = null;
  bookings:  any[];
  listings:  any[];

  constructor(private apollo: Apollo, private graphqlapiService: GraphqlapiService, private snackBar:MatSnackBar,) {}

  ngOnInit() {
    this.getListings()
  }

  getListings(){
    this.graphqlapiService
    .getListings()
    .subscribe((listings: Object[]) => {
      this.listings = listings;
    });
  }

  getListingById(id: number){
    return this.listings.find(listing => listing.id === id)
  }

  login(username: string, password: string) {
    this.apollo
    .mutate<any>({
      mutation: LOGIN,
      variables: {
        username: username,
        password: password,
      },
    })
    .subscribe((result) => {
      if (result?.data?.loginUser){
        this.authUser = result?.data?.loginUser?.user
        this.snackBar.open('Login Successful','',{duration:1000})
        this.graphqlapiService
        .getUserBookings(this.authUser?.username)
        .subscribe((bookings: Object[]) => {
          console.log(bookings)
          this.bookings = bookings;
        });
        return
      }else{
        this.snackBar.open('Login error','',{duration:1000})
        return
      }
    });
    this.snackBar.open('Login error','',{duration:1000})
  }

  register(username: string, firstname: string, lastname: string, password: string, email: string, type: string) {
    this.apollo
    .mutate<any>({
      mutation: REGISTER,
      variables: {
        username: username,
        firstname: firstname,
        lastname: lastname,
        password: password,
        email: email,
        type: type,
      },
    })
    .subscribe((result) => {
      if (result?.data?.createUser){
        this.snackBar.open('Register Successful','',{duration:1000})
        return
      }else{
        this.snackBar.open('Register error','',{duration:1000})
        return
      }
    });
    this.snackBar.open('Register error','',{duration:1000})
  }

  logout(){
    this.authUser = null;
  }
}
