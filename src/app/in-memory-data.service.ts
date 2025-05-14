import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes: Hero[] = [
      { id: 12, name: 'Dr. Nice', strength: 10, dexterity: 8, intelligence: 7, hp: 100, mana: 50 },
      { id: 13, name: 'Bombasto', strength: 12, dexterity: 6, intelligence: 6, hp: 110, mana: 40 },
      { id: 14, name: 'Celeritas', strength: 8, dexterity: 12, intelligence: 8, hp: 90, mana: 60 },
      { id: 15, name: 'Magneta', strength: 7, dexterity: 7, intelligence: 12, hp: 80, mana: 100 },
      { id: 16, name: 'RubberMan', strength: 11, dexterity: 9, intelligence: 5, hp: 120, mana: 30 },
      { id: 17, name: 'Dynama', strength: 9, dexterity: 10, intelligence: 10, hp: 95, mana: 70 },
      { id: 18, name: 'Dr. IQ', strength: 6, dexterity: 6, intelligence: 15, hp: 70, mana: 120 },
      { id: 19, name: 'Magma', strength: 14, dexterity: 5, intelligence: 4, hp: 130, mana: 20 },
      { id: 20, name: 'Tornado', strength: 10, dexterity: 11, intelligence: 9, hp: 100, mana: 65 }
    ];
    return { heroes };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
