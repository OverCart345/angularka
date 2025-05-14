import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  heroForm!: FormGroup;
  hero: Hero | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero = hero;
        if (hero) {
          this.initializeForm(hero);
        }
      });
  }

  initializeForm(hero: Hero): void {
    this.heroForm = this.fb.group({
      id: [hero.id],
      name: [hero.name, Validators.required],
      strength: [hero.strength, [Validators.required, Validators.min(1), Validators.max(100)]],
      dexterity: [hero.dexterity, [Validators.required, Validators.min(1), Validators.max(100)]],
      intelligence: [hero.intelligence, [Validators.required, Validators.min(1), Validators.max(100)]],
      hp: [hero.hp, [Validators.required, Validators.min(0)]],
      mana: [hero.mana, [Validators.required, Validators.min(0)]]
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.heroForm.valid && this.hero) {
      const updatedHero: Hero = {
        ...this.hero,
        ...this.heroForm.value
      };

      this.heroService.updateHero(updatedHero)
        .subscribe(() => this.goBack());
    }
  }
}
