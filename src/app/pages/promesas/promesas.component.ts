import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuarios().then( usuarios =>{
      console.log(usuarios);
    })
    
    // const promesa = new Promise((resolve, reject) => {
    //   if (false){
    //     resolve('Hola mundo');
    //   }else{
    //     reject('Algo salio mal');
    //   }
    // });

    // promesa.then((promesas) => {
    //   console.log(promesas);
    // })
    // .catch(error => console.log('Error en mi promesas: ' + error));

    // console.log('Fin de Init');

  }
  getUsuarios(){
    return new Promise( resolve => {
      fetch('https://reqres.in/api/users')
        .then(resp => resp.json()
        .then(body => resolve(body.data))
      );
    });
    
  }
}
