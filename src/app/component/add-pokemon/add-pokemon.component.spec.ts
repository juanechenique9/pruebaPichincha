import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokemonService } from '../../services/pokemon.service';
import { AddPokemonComponent } from './add-pokemon.component';

describe('AddPokemonComponent', () => {
  let component: AddPokemonComponent;
  let fixture: ComponentFixture<AddPokemonComponent>;
  let httpTestingController: HttpTestingController;
  const authorId = 1131;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPokemonComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPokemonComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should closePokemon', () => {
    component.showAddPokemon = false;
    component.valueAttack = 50;
    component.valuedefense = 50;
    component.closePokemon();
    expect(component).toBeDefined();
  });

  it('should validFormPoke', () => {
    component.pokemonForm.controls['name'].setValue('charizard'),
      component.pokemonForm.controls['image'].setValue(
        'https://assets.pokemon.com/assets/cms2/img/pokedex/full/005.png'
      ),
      component.pokemonForm.controls['attack'].setValue('80'),
      component.pokemonForm.controls['defense'].setValue('90');
    component.validFormPoke();
    component.pokemonForm.controls['name'].setValue(''),
      component.pokemonForm.controls['image'].setValue(
        'https://assets.pokemon.com/assets/cms2/img/pokedex/full/005.png'
      ),
      component.pokemonForm.controls['attack'].setValue('80'),
      component.pokemonForm.controls['defense'].setValue('90');
    component.validFormPoke();
    expect(component).toBeDefined();
  });

  it('should onCreatePokemon', () => {
    component.onCreatePokemon();

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

    const addPokemon = 'https://bp-pokemons.herokuapp.com/';
    const req = httpTestingController.expectOne(addPokemon);
    req.flush(expectData);
    expect(component).toBeDefined();
  });

  it('should ngOnchanges', () => {
    let changes: any = {
      dataPokemon: {
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

      onPokemon: {
        currentValue: 1,
      },
    };

    component.ngOnChanges(changes);
    expect(component).toBeDefined();
  });

  it('should defensePokemon', () => {
    const value = 50;
    const value2 = 30;
    component.defensePokemon(value, value2);
    expect(component).toBeDefined();
  });

  it('should attackPokemon', () => {
    const value = 45;
    const value2 = 11;
    component.attackPokemon(value, value2);
    expect(component).toBeDefined();
  });

  it('should be validFormPoke', () => {
    let changes: any = {
      dataPokemon: {
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

      onPokemon: {
        currentValue: 1,
      },
    };

    component.ngOnChanges(changes);

    const control1 = component.pokemonForm.controls['name'];
    control1.setValue('charizar');
    const control2 = component.pokemonForm.controls['image'];
    control2.setValue('imagen');
    const control3 = component.pokemonForm.controls['attack'];
    control3.setValue('51');
    const control4 = component.pokemonForm.controls['defense'];
    control4.setValue('14');

    component.validFormPoke();

    expect(component).toBeDefined;
  });
});
