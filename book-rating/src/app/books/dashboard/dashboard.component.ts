import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  books: Book[] = [];

  constructor() {
    this.books = [
      {
        isbn: '123',
        title: 'Angular',
        description: 'Das rote Buch',
        rating: 5,
        price: 36.9
      },
      {
        isbn: '456',
        title: 'Vue.js',
        description: 'Das grüne Buch',
        rating: 3,
        price: 32.9
      }
    ];
  }

  doRateUp(book: Book) {
    console.log('UP', book);
  }

  doRateDown(book: Book) {
    console.log('DOWN', book);
  }

  ngOnInit(): void {}

}


