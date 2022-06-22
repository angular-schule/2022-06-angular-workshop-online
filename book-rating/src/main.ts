import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


  ///////////////////

export class Customer {
  /*id: number;

  constructor(id: number) {
    this.id = id;
  }*/

  constructor(public id: number) {}

  fooBar(foo: string): string {
    setTimeout(() => {
      console.log('ID', this.id);
    }, 2000);

    return '';
  }
}

const myCustomer = new Customer(6);

console.log(myCustomer);
myCustomer.fooBar('');

///////////////

/*
function (param) {
  return param + 1;
}

param => {
  return param + 1;
}
*/
