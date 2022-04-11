import { Injectable } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

const GET_LISTINGS = gql`
  {
    getListings {
      id
      listing_title
      description
      street
      city
      postal_code
      price
      email
      username
    }
  }
`;

const GET_BOOKINGS = gql`
  query getUserBookings($username: String!) {
    getUserBookings(username: $username) {
      id
      listing_id
      booking_date
      booking_start
      booking_end
      username
    }
  }
`;

const CREATE_LISTING = gql`
  mutation createListing(
    $listing_title: String!, 
    $description: String!,
    $city: String!,
    $street: String!,
    $postal_code: String!,
    $price: Number!,
    $email: String!) {
    createListing(listingInput: { 
      listing_title: $listing_title, 
      description: $description, 
      city: $city, 
      street: $street, 
      postal_code: $postal_code, 
      price: $price,
      email: $email}) {
        id
        listing_title
        description
        street
        city
        postal_code
        price
        email
        username
    }
  }
`;

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

@Injectable({
  providedIn: 'root'
})

export class GraphqlapiService {
  private _authUser: Object;
  
  public get authUser(): Object {
    return this._authUser;
  }
  public set authUser(value: Object) {
    this._authUser = value;
  }

  constructor(private apollo: Apollo) {}

  async login(username: string, password: string) {

    return this.apollo
      .mutate<any>({
        mutation: LOGIN,
        variables: {
          username: username,
          password: password,
        },
      })
      .subscribe((result) => {
        console.log(result?.data?.loginUser)
        this._authUser = result?.data?.loginUser
      });
  }

  getUserBookings(username: String): Observable<any> {
    return this.apollo
    .watchQuery<any>({
      query: GET_BOOKINGS,
      variables: { username: username }
    })
    .valueChanges.pipe(map((result) => result?.data?.getUserBookings));
  }

  async createListing(
    listing_title: string, 
    description: string,
    city: string,
    street: string,
    postal_code: string,
    price: Number,
    email: string) {

    return this.apollo
      .mutate<any>({
        mutation: CREATE_LISTING,
        variables: {
          listing_title: listing_title, 
          description: description,
          city: city,
          street: street,
          postal_code: postal_code,
          price: price,
          email: email
        },
      })
      .subscribe((result) => {
        console.log(result?.data?.createListing)
      });
  }
  
  getListings(): Observable<any> {
    return this.apollo
    .watchQuery<any>({query: GET_LISTINGS})
    .valueChanges.pipe(map((result) => result?.data?.getListings));
  }
}