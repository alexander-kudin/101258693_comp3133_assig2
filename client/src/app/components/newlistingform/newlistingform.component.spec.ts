import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewlistingformComponent } from './newlistingform.component';

describe('NewlistingformComponent', () => {
  let component: NewlistingformComponent;
  let fixture: ComponentFixture<NewlistingformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewlistingformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewlistingformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
