import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAddFoodComponent } from './popup-add-food.component';

describe('PopupAddFoodComponent', () => {
  let component: PopupAddFoodComponent;
  let fixture: ComponentFixture<PopupAddFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupAddFoodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupAddFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
