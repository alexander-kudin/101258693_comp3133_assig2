import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListinglistComponent } from './listinglist.component';

describe('ListinglistComponent', () => {
  let component: ListinglistComponent;
  let fixture: ComponentFixture<ListinglistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListinglistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListinglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
