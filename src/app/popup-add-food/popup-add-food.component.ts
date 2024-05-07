import { FoodInfoApiServiceService } from './../api-services/food-info-api-service.service';
import {  Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-popup-add-food',
  templateUrl: './popup-add-food.component.html',
  styleUrl: './popup-add-food.component.css'
})
export class PopupAddFoodComponent {
  constructor(private service: FoodInfoApiServiceService) { }
  
  @Output() addFood = new EventEmitter<void>();
  @Output() submit = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();
  
  imageMenu: string;
  name: string;
  price: string;
  description: string;
  ingredient: string;

  submitForm() {
    const addFoodInfo = {
      imageMenu: this.imageMenu,
      name: this.name,
      price: this.price,
      description: this.description,
      ingredient: this.ingredient,
    };
    this.service.postFoodInfo(addFoodInfo).subscribe(res => {
      console.log(res);
        if(res === true){
          this.addFood.emit(res);
        }
    });
  }

  closePopup() {
    this.close.emit();
  }
}
