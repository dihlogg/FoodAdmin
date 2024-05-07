import { Component } from '@angular/core';
import { faBarsStaggered, faL } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faKitchenSet } from '@fortawesome/free-solid-svg-icons';
import { faTruck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  // variable to control tabs
  new:boolean = true;
  completed:boolean = false
  delivery:boolean = false

  // function to control tabs
  onNewClick() {
    this.new = true
    this.completed = false
    this.delivery = false
  }

  onCompletedClick() {
    this.new = false
    this.completed = true
    this.delivery = false
  }

  onDeliveryClick() {
    this.new = false
    this.completed = false
    this.delivery = true
  }

  faBarsStaggered:any = faBarsStaggered
  faClock:any = faClock
  faKitchenSet:any = faKitchenSet
  faTruck:any = faTruck
}
