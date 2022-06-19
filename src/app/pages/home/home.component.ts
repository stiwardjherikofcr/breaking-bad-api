import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { BreakingBadApiService } from 'app/services/breaking-bad-api.service';
import { ICharacter } from '@interfaces/character.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit, OnDestroy {

  public characters: ICharacter[] = [];
  public charactersCopy: ICharacter[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(
    private breakingBadApiService: BreakingBadApiService
  ) { }

  ngOnInit(): void {
    this.breakingBadApiService.getCharacter()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.characters = data.map(
          ({ char_id, name, nickname, img, status, occupation }: ICharacter) => {
            return {
              char_id,
              name,
              nickname,
              img,
              status,
              occupation,
            };
          }
        );
        this.charactersCopy = [...this.characters];
      });
  }

  public filterCharacters(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.characters = this.charactersCopy.filter(({ name }: ICharacter) => {
      return name.toLowerCase().includes(filterValue.toLowerCase());
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
