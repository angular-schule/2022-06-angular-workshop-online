import { Injectable } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookRatingService {

  constructor() { }

  rateUp(book: Book): Book {
    return {
      ...book,
      rating: book.rating < 5 ? book.rating + 1 : book.rating
    };
  }

  rateDown(book: Book): Book {
    /*return {
      ...book,
      rating: Math.max(book.rating - 1, 1)
    };*/
    const clone = structuredClone(book);
    clone.rating = Math.max(book.rating - 1, 1);
    return clone;
  }
}



