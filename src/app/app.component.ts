import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { QuerysService } from './services/querys.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ChartModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'clash-front';
  options: any;

  lossesCombo: Array<string> = [];

  WinLossPercentageData: any;

  pushValueToLossesConmbo(card: string) {
    this.lossesCombo.push(card);
  }

  constructor(private querys: QuerysService) {}

  WinLossPercentage(cardName: string, startDate: string, endDate: string) {
    this.querys
      .winLossPercentage(cardName, startDate, endDate)
      .subscribe((result) => {
        let parsed = JSON.stringify(result);
        let obj = JSON.parse(parsed);

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.WinLossPercentageData = {
          labels: ['Loss', 'Win'],
          datasets: [
            {
              data: [obj.lossPercentage, obj.winPercentage],
              backgroundColor: ['#e84351', '#3ebf9b'],
              hoverBackgroundColor: ['#434a54', '#4d86dc'],
            },
          ],
        };

        this.options = {
          plugins: {
            legend: {
              labels: {
                usePointStyle: true,
                color: textColor,
              },
            },
          },
        };
      });
  }

  decksWithWinPercentage(
    winPercentage: string,
    startDate: string,
    endDate: string
  ) {
    this.querys
      .decksWithWinPercentage(Number(winPercentage), startDate, endDate)
      .subscribe((result) => {
        console.log(result);
      });
  }

  lossesByCombo(startDate: string, endDate: string) {
    this.querys
      .lossesByCombo(startDate, endDate, this.lossesCombo)
      .subscribe((result) => {
        console.log(result);
      });
  }

  topCombos(
    comboSize: string,
    winPercentage: string,
    startDate: string,
    endDate: string
  ) {
    this.querys
      .topCombos(Number(comboSize), Number(winPercentage), startDate, endDate)
      .subscribe((result) => {
        console.log(result);
      });
  }

  mostUsedCards(level: string, limit: string) {
    this.querys
      .mostUsedCards(Number(level), Number(limit))
      .subscribe((result) => {
        console.log(result);
      });
  }

  undefeatedPlayers(trophies: string) {
    this.querys.undefeatedPlayers(Number(trophies)).subscribe((result) => {
      console.log(result);
    });
  }

  cardsWithHighLossRate(startDate: string, endDate: string, limit: string) {
    this.querys
      .cardsWithHighLossRate(startDate, endDate, Number(limit))
      .subscribe((result) => {
        console.log(result);
      });
  }
}
