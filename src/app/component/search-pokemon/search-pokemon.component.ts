import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Ipokemon } from 'src/app/model/pokemon';
import { PokemonService } from '..//../services/pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styleUrls: ['./search-pokemon.component.css'],
})
export class SearchPokemonComponent implements OnInit {
  @Output()
  sendDataPokemon = new EventEmitter<Ipokemon>();
  @Output()
  onShowPokemon = new EventEmitter<any>();
  @Input() set onUpdateList(event: any) {
    this.allPokemon();
  }

  listPokemon: Array<Ipokemon> = new Array<Ipokemon>();
  copylistPokemon: Array<Ipokemon> = new Array<Ipokemon>();
  public pokemonSearch!: FormGroup;

  constructor(private pokemonService: PokemonService, private fb: FormBuilder) {
    this.formSearchPokemon();
  }

  ngOnInit(): void {
    this.allPokemon();
    this.searchPokemon();
  }

  // Metodo que inicializa el formulario

  // Method that initializes the form

  private formSearchPokemon(): void {
    this.pokemonSearch = this.fb.group({
      nameSearch: new FormControl(''),
    });
  }

  // Metodo para traer listado de pokemon

  // Method to bring list of pokemon

  allPokemon() {
    this.pokemonService.getPokemon().subscribe((result) => {
      this.listPokemon = result;
      this.copylistPokemon = result;
    });
  }

  // Metodo para eliminar pokemon
  
  // method to delete pokemon

  onDeletePokemon(pokemon: Ipokemon) {
    this.pokemonService.deletePokemon(pokemon).subscribe((response) => {
      console.log(response);
      this.allPokemon();
    });
  }

  // Metodo para enviar datos de pokemon a editar

  // Method to send pokemon data to edit

  onUpdatePokemon(pokemon: Ipokemon) {
    this.sendDataPokemon.emit(pokemon);
  }

  // Metodo para buscar pokemon por el nombre

  // Method to search for pokemon by name

  searchPokemon() {
    this.pokemonSearch
      .get('nameSearch')
      ?.valueChanges.subscribe((namePokemon) => {
        if (namePokemon === '') {
          this.listPokemon = this.copylistPokemon;
        } else {
          this.listPokemon = this.copylistPokemon.filter((x) => {
            return x.name?.toLowerCase().includes(namePokemon.toLowerCase());
          });
        }
      });
  }

  // Metodo de abrir formulario para agregar pokemon

  // Method to open form to add pokemon

  onAddPokemon(event: any) {
    this.onShowPokemon.emit({ showAddPokemon: true });
  }
}
