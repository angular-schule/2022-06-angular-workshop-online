import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, Observable, debounceTime, switchMap, tap } from 'rxjs';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'br-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {

  books$: Observable<Book[]>;
  isLoading: boolean = false;

  searchControl = new FormControl('', { nonNullable: true });

  constructor(private bs: BookStoreService) {
    // TODO
    this.books$ = this.searchControl.valueChanges.pipe(
      filter(value => value.length >= 3),
      tap(() => this.isLoading = true),
      debounceTime(200),
      switchMap(value => this.bs.search(value)),
      tap(() => this.isLoading = false),
    );
  }

  ngOnInit(): void {
  }

}
