import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'br-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {

  bookForm = new FormGroup({
    isbn: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10), Validators.maxLength(13)]
    }),
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(50)]
    }),
    description: new FormControl('', { nonNullable: true }),
    rating: new FormControl(1, {
      nonNullable: true,
      validators: [Validators.min(1), Validators.max(5)]
    }),
    price: new FormControl(0, { nonNullable: true, validators: Validators.min(0) }),
  });

  constructor(private bs: BookStoreService, private router: Router) {}

  ngOnInit(): void {
  }

  hasError(controlName: string, errorCode: string): boolean {
    const control = this.bookForm.get(controlName);
    return !!control && control.hasError(errorCode) && control.touched;
    // return !!control && control.getError(errorCode) && control.touched;
  }


  isInvalid(controlName: string): boolean {
    const control = this.bookForm.get(controlName);
    return !!control && control.invalid && control.touched;
    // return (control instanceof AbstractControl) && control.invalid && control.touched;
  }

  submitForm() {
    // value: nur aktive Felder
    // getRawValue(): alle Felder (aktiv und inaktiv)
    const book: Book = this.bookForm.getRawValue();

    this.bs.create(book).subscribe(receivedBook => {
      this.router.navigate(['/books', receivedBook.isbn]); // [routerLink]="['/books', receivedBook.isbn]"
      // this.router.navigateByUrl('/books' + receivedBook.isbn); // [routerLink]="'/books' + receivedBook.isbn"
    });
  }

}


/*
TODO
- Submit-Button
- abschicken
- HTTP-Request
  - bei Erfolg: Navigation zur Detailseite

*/
