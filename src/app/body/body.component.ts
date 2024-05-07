import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {

  @Input() collapsed = false;
  @Input() ScreenWidth = 0;

  getBodyClass() : string {
    let styleClass = '';
    if (this.collapsed && this.ScreenWidth > 768) {
      styleClass = 'body-trimed';
    } else if (this.collapsed && this.ScreenWidth <= 768 && this.ScreenWidth > 0) {
      styleClass = 'body-md-screen';
    }
    return styleClass;
  }
}
