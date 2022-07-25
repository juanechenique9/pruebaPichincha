import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ipokemon } from 'src/app/model/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-add-pokemon',
  templateUrl: './add-pokemon.component.html',
  styleUrls: ['./add-pokemon.component.css'],
})
export class AddPokemonComponent implements OnInit, OnChanges {
  @Input() dataPokemon: any;
  @Input() onPokemon: any;
  @Output()
  updateListPokemon = new EventEmitter<any>();

  public showAddPokemon = false;
  public pokemonForm!: FormGroup;
  public validFormPokemon: boolean;
  valueAttack: any = 50;
  valuedefense: any = 50;
  readonly MIN = 0;
  readonly MAX = 100;

  @ViewChildren('attack') attack?: QueryList<ElementRef>;
  @ViewChildren('defense') defense?: QueryList<ElementRef>;

  constructor(
    private render: Renderer2,
    private pokemonService: PokemonService,
    private fb: FormBuilder,
    private changeDetector: ChangeDetectorRef
  ) {
    this.formPokemon();
    this.validFormPokemon = false;
  }

  ngOnInit(): void {}

  private formPokemon(): void {
    this.pokemonForm = this.fb.group({
      id: [],
      name: [''],
      image: [''],
      attack: [50],
      defense: [50],
      hp: [],
      type: [],
      idAuthor: [],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['onPokemon']?.currentValue) {
      this.showAddPokemon = true;
      
    }
    if (changes['dataPokemon']?.currentValue) {
      this.pokemonForm.setValue({
        id: this.dataPokemon?.id,
        name: this.dataPokemon?.name,
        image: this.dataPokemon?.image,
        attack: this.dataPokemon?.attack,
        defense: this.dataPokemon?.defense,
        hp: this.dataPokemon?.hp,
        type: this.dataPokemon?.type,
        idAuthor: this.dataPokemon?.id_author,
      });

      if (this.showAddPokemon) {
        this.changeDetector.detectChanges();
        this.attackPokemon(null, this.dataPokemon?.attack);
        this.defensePokemon(null, this.dataPokemon?.defense);
      }
    }

    this.pokemonForm.valueChanges.subscribe(() => {
      this.validFormPoke();
    });
  }

  attackPokemon(event?: any, attack?: any) {
    const value = event?.target.value;
    this.valueAttack = value ? value : attack;
    let result =
      ((value ? value : attack - this.MIN) / (this.MAX - this.MIN)) * 100;
    this.render.setStyle(
      this.attack?.first?.nativeElement,
      'background',
      'linear-gradient(to right, #7532f9 0%, #7532f9 ' +
        result +
        '%, #efefef ' +
        result +
        '%, #efefef 100%)'
    );
  }

  defensePokemon(event?: any, defense?: any) {
    const value = event?.target.value;
    this.valuedefense = value ? value : defense;
    let result =
      ((value ? value : defense - this.MIN) / (this.MAX - this.MIN)) * 100;
    this.render.setStyle(
      this.defense?.first?.nativeElement,
      'background',
      'linear-gradient(to right, #7532f9 0%, #7532f9 ' +
        result +
        '%, #efefef ' +
        result +
        '%, #efefef 100%)'
    );
  }

  onCreatePokemon() {
    debugger;
    const data = this.pokemonForm.getRawValue();
    let pokemonToSave: Ipokemon = {
      id: data.id,
      name: data.name,
      image: data.image,
      attack: data.attack,
      defense: data.defense,
      hp: this.dataPokemon?.hp ? this.dataPokemon?.hp : 0,
      type: this.dataPokemon?.type ? this.dataPokemon?.type : 'hoja',
      idAuthor: this.dataPokemon?.id_author ? this.dataPokemon?.id_author : 1,
    };
    if (this.dataPokemon?.id) {
      this.pokemonService
        .updatePokemon(pokemonToSave)
        .subscribe((response: Ipokemon) => {
          console.log('respuesta servicio actualizar', response);
          this.pokemonForm.reset();
          this.valueAttack = 50;
          this.valuedefense = 50;
          this.updateListPokemon.emit({ updateList: true });
          this.showAddPokemon = false;
        });
    } else {
      this.pokemonService
        .addPokemon(pokemonToSave)
        .subscribe((response: Ipokemon) => {
          console.log('respuesta servicio', response);
          this.pokemonForm.reset();
          this.valueAttack = 50;
          this.valuedefense = 50;
          this.updateListPokemon.emit({ updateList: true });
          this.showAddPokemon = false;
        });
    }
  }

  validFormPoke() {
    if (
      this.pokemonForm.get('name')?.value !== '' &&
      this.pokemonForm.get('image')?.value !== '' &&
      this.pokemonForm.get('attack')?.value !== '' &&
      this.pokemonForm.get('defense')?.value !== ''
    ) {
      this.validFormPokemon = true;
    } else {
      this.validFormPokemon = false;
    }
  }

  closePokemon() {
    this.showAddPokemon = false;
    this.formPokemon()
    this.valueAttack = 50;
    this.valuedefense = 50;
  }
}
