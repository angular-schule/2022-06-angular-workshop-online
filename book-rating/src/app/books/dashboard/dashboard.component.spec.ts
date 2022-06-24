import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    const ratingMock = {
      rateUp: (b: Book) => b,
      rateDown: (b: Book) => b
    };

    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers: [
        // BRS ersetzen: Wenn jemand BRS anfordert, wird stattdessen ratingMock ausgeliefert
        {
          provide: BookRatingService,
          useValue: ratingMock
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service.rateUp once for doRateUp()', () => {
    // Arrange
    const service = TestBed.inject(BookRatingService);
    spyOn(service, 'rateUp').and.callThrough();
    // spyOn(service, 'rateUp').and.callFake(b => b);
    // spyOn(service, 'rateUp').and.returnValue({ isbn: '123' } as Book)

    // Act
    const book: Book = { isbn: '123' } as Book; // Achtung: Type Assertion
    component.doRateUp(book);

    // Assert
    expect(service.rateUp).toHaveBeenCalled();
    expect(service.rateUp).toHaveBeenCalledTimes(1);
    expect(service.rateUp).toHaveBeenCalledOnceWith(book);


  });
});
