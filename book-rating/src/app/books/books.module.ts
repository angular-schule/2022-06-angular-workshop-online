import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookComponent } from './book/book.component';
import { StarsComponent } from './stars/stars.component';


@NgModule({
  declarations: [
    DashboardComponent,
    BookComponent,
    StarsComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule
  ],
  exports: [DashboardComponent]
})
export class BooksModule { }
