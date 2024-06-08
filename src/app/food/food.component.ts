
import { FoodInfoApiServiceService } from './../api-services/food-info-api-service.service';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Food } from './food.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrl: './food.component.css'
})
export class FoodComponent {
  constructor(private service: FoodInfoApiServiceService, private http: HttpClient) { }

  public dataSource: MatTableDataSource<any> = new MatTableDataSource<Food>()
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    if (this.foods.length === 0) {
      this.refreshFoodInfo();
    }
  }
  foodInfoParrent: Food;
  foods: Food[] = [];
  searchFood = '';
  showPopup = false;
  isEditMode : boolean = false;

  refreshFoodInfo() {
    this.service.getFoodInfos().subscribe(data => {
      this.foods = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  filteredFoods(searchFood: string) {
    this.dataSource.filter = searchFood.trim().toLocaleLowerCase();
    const filterValue = searchFood;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onMatSortChange() {
    this.dataSource.sort = this.sort;
  }


  openPopup() {
    this.foodInfoParrent = {
      id: null,
      imageMenu: "",
      name: "",
      price: 0,
      description: "",
      ingredient: "",
      imageDetail: ""
    };
    this.showPopup = true;
  }

  openEditPopup(foodInfoEdit: Food) {
    this.foodInfoParrent = foodInfoEdit;
    this.showPopup = true;
  }

  closePopup() {
    console.log("close popup");
    this.showPopup = false;
  }

  deleteFood(idFood: any) {
    const confirmDelete = confirm('Do you want to delete this food?');
    if (confirmDelete) {
      this.service.deleteFoodInfo(idFood).subscribe(() => {
        this.refreshFoodInfo();
      });
    }
  }
}
