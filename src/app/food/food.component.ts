
import { FoodInfoApiServiceService } from './../api-services/food-info-api-service.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { PopupAddFoodComponent } from '../popup-add-food/popup-add-food.component';
import { Food } from './food.model';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrl: './food.component.css'
})
export class FoodComponent {
  constructor(private service: FoodInfoApiServiceService) { }
  ngOnInit(): void {
    this.refreshFoodInfo();
  }
  foods: Food[] = [];
  showPopup = false;
  selectedFood: Food;
  showEditPopup: boolean = false;

  refreshFoodInfo() {
    this.service.getFoodInfos().subscribe(data => {
      this.foods = data;
    });
  }

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  addNewFood(result: boolean) {
    this.refreshFoodInfo();
    this.closePopup();
  }

  deleteFood(id: any) {
    
  }

  editFood(food : any) {
    this.selectedFood = food;
    this.showEditPopup = true;
  }

  saveEditedFood(editedFood: any) {
    this.showEditPopup = false;
  }

  closeEditPopup() {
    this.showEditPopup = false;
  }
}
