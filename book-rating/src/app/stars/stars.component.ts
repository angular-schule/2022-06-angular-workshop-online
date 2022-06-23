import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'br-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent {

  @Input() rating: number = 0;

  getRating() {
    return new Array(this.rating);
  }


}
