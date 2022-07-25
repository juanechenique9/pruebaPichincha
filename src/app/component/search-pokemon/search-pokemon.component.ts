import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Ipokemon } from 'src/app/model/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styleUrls: ['./search-pokemon.component.css']
})
export class SearchPokemonComponent implements OnInit {

  
  @Output()
  sendDataPokemon = new EventEmitter<Ipokemon>();
  @Output()
  onShowPokemon = new EventEmitter<any>();
  @Input() set onUpdateList(event:any){
    this.allPokemon();
  }
  

  listPokemon: Array<Ipokemon> = new Array<Ipokemon>()
  copylistPokemon: Array<Ipokemon> = new Array<Ipokemon>()
  public pokemonSearch!: FormGroup;

  constructor(
    private pokemonService:PokemonService,
    private fb: FormBuilder) {
      this.formSearchPokemon()
    }

  ngOnInit(): void {
    this.allPokemon();
    this.searchPokemon();

  }

  private formSearchPokemon(): void {
    this.pokemonSearch = this.fb.group({
      nameSearch: [],
    })
  }

  allPokemon(){
    this.pokemonService.getPokemon().subscribe((result) => {
      this.listPokemon = result
      this.copylistPokemon = result
    });
  }

  onDeletePokemon(pokemon:Ipokemon) {
   this.pokemonService.deletePokemon(pokemon).subscribe((response) => {
    this.allPokemon();
   } )
  }

  onUpdatePokemon(pokemon:Ipokemon) {
    this.sendDataPokemon.emit(pokemon)
  }

  searchPokemon() {

    this.pokemonSearch.get('nameSearch')?.valueChanges.subscribe(namePokemon => {
      if ( namePokemon === '') {
        this.listPokemon = this.copylistPokemon
      } else {
       this.listPokemon = this.copylistPokemon.filter((x) => {
        return x.name?.toLowerCase().includes(namePokemon.toLowerCase())
       })
      }
   })

  }


  onAddPokemon(event: any) {
    this.onShowPokemon.emit({showAddPokemon: true});
  }

}
