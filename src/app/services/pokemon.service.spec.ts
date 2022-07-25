import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpTestingController: HttpTestingController;
  const authorId = 1

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PokemonService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('show addPokemon', () => {
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

    const expectData = {
      attack: 85,
      defense: 33,
      hp: 0,
      id: 1612,
      id_author: 1,
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/005.png',
      name: 'charmilion',
      type: 'hoja',
    };

    let dataResponse;

    service.addPokemon(data).subscribe((response) => {
      dataResponse = response;
    });

    const addPokemon = 'https://bp-pokemons.herokuapp.com/';
    const req = httpTestingController.expectOne(addPokemon);
    req.flush(expectData);
    expect(dataResponse).toBe(expectData);
    expect(req.request.method).toEqual('POST');
  });

  it('show updatePokemon', () => {
    const data = {
      attack: 10,
      defense: 80,
      hp: 0,
      id: 1500,
      idAuthor: 1,
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/005.png',
      name: 'charmilion',
      type: 'hoja',
    };

    const expectData = {
      attack: 85,
      defense: 33,
      hp: 0,
      id: 1500,
      id_author: 1,
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/005.png',
      name: 'charmilion',
      type: 'hoja',
    };

    let dataResponse;

    service.updatePokemon(data).subscribe((response) => {
      dataResponse = response;
    });

    const updatePokemon = 'https://bp-pokemons.herokuapp.com/1500';
    const req = httpTestingController.expectOne(updatePokemon);
    req.flush(expectData);
    expect(dataResponse).toBe(expectData);
    expect(req.request.method).toEqual('PUT');
  });

  it('show deletePokemon', () => {
    const data = {
      attack: 10,
      defense: 80,
      hp: 0,
      id: 1500,
      idAuthor: 1,
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/005.png',
      name: 'charmilion',
      type: 'hoja',
    };

    let dataResponse;

    service.deletePokemon(data).subscribe((response) => {
      dataResponse = response;
    });

    const deletePokemon = 'https://bp-pokemons.herokuapp.com/1500';
    const req = httpTestingController.expectOne(deletePokemon);
    expect(dataResponse).toBeUndefined();
    expect(req.request.method).toEqual('DELETE');
  });

  it('show listPokemon', () => {
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
      },
      {
        id: 1608,
        name: 'test',
        image: 'test',
        attack: 57,
        defense: 76,
        hp: 1,
        type: 'test',
        id_author: 1,
      },
      {
        id: 1612,
        name: 'charmilion',
        image:
          'https://assets.pokemon.com/assets/cms2/img/pokedex/full/005.png',
        attack: 85,
        defense: 33,
        hp: 0,
        type: 'hoja',
        id_author: 1,
      },
    ];

    let dataResponse;

    service.getPokemon().subscribe((response) => {
      dataResponse = response;
    });

    console.log('hola', dataResponse);
    const listPokemon = 'https://bp-pokemons.herokuapp.com/?' + ''.concat(`idAuthor=${authorId}`);
    const req = httpTestingController.expectOne(listPokemon);
    req.flush(expectData);
    expect(dataResponse).toBe(expectData);
    expect(req.request.method).toEqual('GET');
  });
});

