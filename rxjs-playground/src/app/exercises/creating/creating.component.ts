import { Component } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject, map, filter, Observer, Subscriber } from 'rxjs';

@Component({
  selector: 'rxw-creating',
  templateUrl: './creating.component.html',
})
export class CreatingComponent {

  logStream$ = new ReplaySubject<string | number>();

  constructor() {
    /**
     * 1. Erstelle ein Observable und abonniere den Datenstrom.
     *    Probiere dazu die verschiedenen Creation Functions aus: of(), from(), timer(), interval()
     * 2. Implementiere außerdem ein Observable manuell, indem du den Konstruktor "new Observable()" nutzt.
     *
     * Tipps:
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */

    /******************************/

    /*new Observable(sub => {
      sub.next(1);
      sub.next(2);
      sub.next(3);
      sub.next(4);
      sub.next(5);
      sub.complete();
    })*/

    // of(1,2,3,4,5)
    // from([1,2,3,4,5])
    // interval(1000) // ---0---1---2---3---4---5---...
    // timer(1000, 1000) === interval(1000)
    // timer(2000) // ------0|
    // timer(3000, 1000) // ---------0---1---2---3---4---5---...
    // timer(0, 1000) // 0---1---2---3---4---5---...

    timer(0, 1000).pipe(
      map(e => e * 3),
      filter(n => n % 2 === 0)
    ).subscribe({
      next: e => this.log(e),
      complete: () => this.log('COMPLETE')
    });


    timer(0, 1000).pipe(
      map(() => Date.now())
    ).subscribe(console.log)


    /******************************/


    function producer(subscriber: Subscriber<number>) {
      subscriber.next(Math.random());
      subscriber.next(2);
      const timer1 = setTimeout(() => subscriber.next(3), 2000);
      setTimeout(() => subscriber.complete(), 3000);

      // Teardown Logic
      return () => {
        clearTimeout(timer1);
      };
    }

    const observer: Observer<number> = {
      next: value => {
        console.log(value);
      },
      error: (err: any) => {
        console.error(err)
      },
      complete: () => {
        console.log('COMPLETE');
      }
    }

    // producer(observer);
    // Finnische Notation
    const myObservable$ = new Observable(producer);
    // myObservable$.subscribe(observer);

    // so KÖNNTE Observable implementiert sein
    /*class MyObservable {
      constructor(private producer: any) {}

      subscribe(obs: Partial<Observer<any>>) {
        const subscriber = fixObserver(obs);
        this.producer(subscriber);
      }
    }*/


    /******************************/
  }

  private log(msg: string | number) {
    this.logStream$.next(msg);
  }

}
