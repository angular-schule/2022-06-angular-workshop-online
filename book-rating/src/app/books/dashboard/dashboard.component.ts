import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  books: Book[] = [];

  constructor(private rs: BookRatingService, private bs: BookStoreService) {
    this.bs.getAll().subscribe(receivedBooks => {
        this.books = receivedBooks;
      });

  }

  doRateUp(book: Book) {
    const ratedBook = this.rs.rateUp(book);
    this.updateList(ratedBook);
  }

  doRateDown(book: Book) {
    const ratedBook = this.rs.rateDown(book);
    this.updateList(ratedBook);
  }

  private updateList(ratedBook: Book) {
    // [1,2,3,4,5,6].filter(e => e > 3) // [4, 5, 6]
    // [1,2,3,4,5,6].map(e => e * 10) // [10, 20, 30, 40, 50, 60]

    /*this.books.map(b => {
      if (b.isbn === ratedBook.isbn) {
        return ratedBook;
      } else {
        return b;
      }
    })*/

    this.books = this.books.map(b => b.isbn === ratedBook.isbn ? ratedBook : b);
  }

  ngOnInit(): void {}

  trackBook(index: number, item: Book) {
    return item.isbn;
  }

}


