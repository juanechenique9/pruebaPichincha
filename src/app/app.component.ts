import {  Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'pruebaPokemon';
  dataPokemon: any;
  onPokemon: any;
  onUpdateList: any;

 // Método que recibe parámetros del componente hijo para editar pokemon

 // Method that receives parameters from the child component to edit pokemon

  receiveDataPokemon(pokemon:any) {
    const value = {showAddPokemon: true}
    this.onShowPokemon(value);
    this.dataPokemon = {...pokemon};
  }

  // Método que recibe parámetros del componente hijo  para abrir formulario de agregar pokemon

  // Method that receives parameters from the child component to open the add pokemon form

  onShowPokemon(event: any) {
    this.onPokemon = {...event.showAddPokemon};
    this.dataPokemon = null
  }

  // Método que recibe parámetros del componente hijo  para actualizar lista de pokemon

  // Method that receives parameters from the child component to update the pokemon list

  updateListPokemon(event:any) {
    this.onUpdateList = {...event}
  }
}
