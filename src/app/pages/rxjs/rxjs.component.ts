import { Component, OnDestroy } from '@angular/core';
import { Observable, retry, interval, take, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSub: Subscription;

  constructor() {
    // this.retornaObservable().pipe(
    //   retry(2)
    // ).subscribe(
    //   valor => console.log('Subs', valor),
    //   err => console.warn('Error', err),
    //   () => console.info('Obs Completado')
    // );

    this.intervalSub = this.retornaIntervalo().subscribe(console.log)
  }

  retornaIntervalo(): Observable<number> {
    return interval(100)
      .pipe(
        //take(10),
        map(valor => { return valor + 1; }),
        filter(valor => (valor % 2 === 1)),
      );

  }
  ngOnDestroy(): void {
    this.intervalSub.unsubscribe();
  }

  retornaObservable(): Observable<number> {
    let i = -1;
    return new Observable<number>(observer => {
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }
        if (i === 2) {
          observer.error('i llego a valor de 2');
        }
      }, 1000)
    });

  }



}
