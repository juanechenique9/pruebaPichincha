import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokemonService } from 'src/app/services/pokemon.service';
import { SearchPokemonComponent } from './search-pokemon.component';

describe('SearchPokemonComponent', () => {
  let component: SearchPokemonComponent;
  let fixture: ComponentFixture<SearchPokemonComponent>;
  let httpTestingController: HttpTestingController;
  const authorId = 1

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchPokemonComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchPokemonComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should  onAddPokemon', () => {
    component.onAddPokemon(true);
    expect(component.onAddPokemon).toBeTruthy();
  });

  it('should  onUpdatePokemon', () => {
    const data = {
      attack: 85,
      defense: 33,
      hp: 0,
      id: null,
      idAuthor: 1,
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/005.png',
      name: 'charmilion',
      type: 'hoja',
    };

    component.onUpdatePokemon(data);
    expect(component.onUpdatePokemon).toBeDefined();
  });

  it('should  searchPokemon', () => {
    const control = component.pokemonSearch.controls['nameSearch'];
    control.setValue('');
    component.searchPokemon();
    control.setValue('charmander');
    component.searchPokemon();

    expect(component).toBeDefined;
  });

  it('should  onDeletePokemon', () => {
    const data = {
      attack: 85,
      defense: 33,
      hp: 0,
      id: 1500,
      idAuthor: 1,
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/005.png',
      name: 'charmilion',
      type: 'hoja',
    };

    component.onDeletePokemon(data);

    const req = httpTestingController.expectOne(
      'https://bp-pokemons.herokuapp.com/1500'
    );
    req.flush({ data: [], success: true, type: 'pokemon_removed' });
    expect(component).toBeDefined();
  });

  it('should  onListPokemon', () => {
    
    const expectData = [
      {
        id: 1131,
        name: 'Charmeleon 242',
        image:
          'https://assets.pokemon.com/assets/cms2/img/pokedex/full/005.png',
        attack: 30,
        defense: 80,
        hp: 1000,
        type: 'n/a',
        id_author: 1,
      },
      {
        id: 1602,
        name: 'gh',
        image: 'https://technical-test-nttdata-leobar37.vercel.app/',
        attack: 83,
        defense: 84,
        hp: 10,
        type: 'Fuego',
        id_author: 1,
      },
      {
        id: 1603,
        name: 'sadasd',
        image: 'https://technical-test-nttdata-leobar37.vercel.app/',
        attack: 76,
        defense: 61,
        hp: 10,
        type: 'Fuego',
        id_author: 1,
      }
    ];

    const req = httpTestingController.expectOne(
      'https://bp-pokemons.herokuapp.com/?' + ''.concat(`idAuthor=${authorId}`)
    );
    req.flush(expectData);
    component.allPokemon();
    expect(component).toBeDefined();
  });

  it('should onUpdateList', () => {
    component.onUpdateList;
    expect(component.allPokemon).toBeDefined();
  });

});
