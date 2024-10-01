import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class QuerysService {
  constructor(private http: HttpClient) {}

  winLossPercentage(cardName: string, startDate: string, endDate: string) {
    return this.http.get(`${environment.apiUrl}win-loss-percentage`, {
      params: {
        cardName: cardName,
        startDate: startDate,
        endDate: endDate,
      },
    });
  }

  decksWithWinPercentage(
    winPercentage: number,
    startDate: string,
    endDate: string
  ) {
    return this.http.get(`${environment.apiUrl}decks-with-win-percentage`, {
      params: {
        winPercentage: winPercentage,
        startDate: startDate,
        endDate: endDate,
      },
    });
  }

  lossesByCombo(startDate: string, endDate: string, combo: Array<string>) {
    return this.http.get(`${environment.apiUrl}losses-by-combo`, {
      params: {
        startDate: startDate,
        endDate: endDate,
        combo: combo,
      },
    });
  }

  topCombos(
    comboSize: number,
    winPercentage: number,
    startDate: string,
    endDate: string
  ) {
    return this.http.get(`${environment.apiUrl}top-combos`, {
      params: {
        comboSize: comboSize,
        winPercentage: winPercentage,
        startDate: startDate,
        endDate: endDate,
      },
    });
  }

  mostUsedCards(level: number, limit: number) {
    return this.http.get(`${environment.apiUrl}most-used-cards`, {
      params: {
        level: level,
        limit: limit,
      },
    });
  }

  undefeatedPlayers(trophies: number) {
    return this.http.get(`${environment.apiUrl}undefeated-players`, {
      params: {
        trophies: trophies,
      },
    });
  }

  cardsWithHighLossRate(startDate: string, endDate: string, limit: number) {
    return this.http.get(`${environment.apiUrl}cards-with-high-loss-rate`, {
      params: {
        startDate: startDate,
        endDate: endDate,
        limit: limit,
      },
    });
  }
}
