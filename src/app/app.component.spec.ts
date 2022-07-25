import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(() => {
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should receiveDataPokemon ', () => {
    const data = {
      attack: 83,
      defense: 84,
      hp: 10,
      id: 1602,
      id_author: 1,
      image: 'https://technical-test-nttdata-leobar37.vercel.app',
      name: 'gh',
      type: 'Fuego',
    };

    component.receiveDataPokemon(data);
    expect(component).toBeDefined();
  });

  it('should updateListPokemon ', () => {
    component.updateListPokemon(true)
    expect(component).toBeTruthy;

  })
});
