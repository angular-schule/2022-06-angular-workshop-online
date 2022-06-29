import { Component } from '@angular/core';
import { ReplaySubject, throwError, of, EMPTY, retry, catchError, timer, Observable } from 'rxjs';

import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'rxw-error-handling',
  templateUrl: './error-handling.component.html',
})
export class ErrorHandlingComponent {

  logStream$ = new ReplaySubject<unknown>();

  constructor(private es: ExerciseService) { }

  /**
   * Das Observable aus `this.es.randomError()` liefert mit hoher Wahrscheinlichkeit einen Fehler.
   * Probiere verschiedene Strategien aus, um den Fehler zu behandeln:
   * - wiederholen
   * - Fehler weiterwerfen
   * - Fehler umwandeln (in ein normales Element)
   * - Fehler verschlucken/ignorieren
   */

  start() {
    this.es.randomError().pipe(
      // retry(5),
      // retry({ count: 5, delay: 1000 })
      catchError(err => {
        // verschlucken
        // return of();
        // return EMPTY; // EMPTY: keine Ausgabe, sofort complete

        // weiterwerfen
        // return new Observable(sub => sub.error('MEIN FEHLER!!'))
        // return throwError(() => 'MY ERROR');
        throw 'BÖSER FEHLER!';

        // ersetzen durch "normales" Element
        // return of('nichts', 'passiert!');
      })
    ).subscribe({
      next: e => this.logStream$.next(e),
      error: err => this.logStream$.next('❌ ERROR: ' + err)
    });
  }
}
