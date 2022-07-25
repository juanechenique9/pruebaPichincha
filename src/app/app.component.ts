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


  receiveDataPokemon(pokemon:any) {
    const value = {showAddPokemon: true}
    this.onShowPokemon(value);
    this.dataPokemon = {...pokemon};
  }

  onShowPokemon(event: any) {
    this.onPokemon = {...event.showAddPokemon};
    this.dataPokemon = null
  }

  updateListPokemon(event:any) {
    this.onUpdateList = {...event}
  }
}
