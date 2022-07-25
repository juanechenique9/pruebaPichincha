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

  private formSearchPokemon(): void {
    this.pokemonSearch = this.fb.group({
      nameSearch: new FormControl(''),
    });
  }

  // Metodo para traer listado de pokemon

  allPokemon() {
    this.pokemonService.getPokemon().subscribe((result) => {
      this.listPokemon = result;
      this.copylistPokemon = result;
    });
  }

  // Metodo para eliminar pokemon

  onDeletePokemon(pokemon: Ipokemon) {
    this.pokemonService.deletePokemon(pokemon).subscribe((response) => {
      console.log(response);
      this.allPokemon();
    });
  }

  // Metodo para enviar datos de pokemon editar

  onUpdatePokemon(pokemon: Ipokemon) {
    this.sendDataPokemon.emit(pokemon);
  }

  // Metodo para buscar pokemon por el nombre

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

  // Metodo para enviar abrir formulario de agregar pokemon

  onAddPokemon(event: any) {
    this.onShowPokemon.emit({ showAddPokemon: true });
  }
}
