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
  decksWithWinPercentageData: any;
  lossesByComboData: any;
  topCombosData: any;
  mostUsedCardsData: any;
  undefeatedPlayersData: any;
  cardsWithHighLossRateData: any;

  pushValueToLossesConmbo(card: string) {
    this.lossesCombo.push(card);
  }

  constructor(private querys: QuerysService) {}

  WinLossPercentage(cardName: string, startDate: string, endDate: string) {
    this.querys
      .winLossPercentage(cardName, startDate, endDate)
      .subscribe((result: any) => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.WinLossPercentageData = {
          labels: ['Loss', 'Win'],
          datasets: [
            {
              data: [result.lossPercentage, result.winPercentage],
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
      .subscribe((result: any) => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const surfaceBorder =
          documentStyle.getPropertyValue('--surface-border');

        this.decksWithWinPercentageData = {
          labels: result.map((item: any) => item.cardName),
          datasets: [
            {
              data: result.map((item: any) => item.winPercentage),
              backgroundColor: [
                '#6495ED',
                '#ADD8E6',
                '#98FB98',
                '#7FFF00',
                '#9370DB',
                '#DDA0DD',
                '#CD5C5C',
                '#FF8C00',
                '#F0E68C',
                '#FFA500',
                '#FFE4E1',
                '#2F4F4F',
                '#87CEFA',
              ],
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

  lossesByCombo(startDate: string, endDate: string) {
    this.querys
      .lossesByCombo(startDate, endDate, this.lossesCombo)
      .subscribe((result: any) => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.lossesByComboData = {
          labels: ['Losses'],
          datasets: [
            {
              data: [result],
              backgroundColor: ['#B22222'],
              hoverBackgroundColor: ['#8B0000'],
            },
          ],
        };

        this.options = {
          cutout: '60%',
          plugins: {
            legend: {
              labels: {
                color: textColor,
              },
            },
          },
        };
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
        this.topCombosData = result;
      });
  }

  mostUsedCards(level: string, limit: string) {
    this.querys
      .mostUsedCards(Number(level), Number(limit))
      .subscribe((result: any) => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const surfaceBorder =
          documentStyle.getPropertyValue('--surface-border');

        this.mostUsedCardsData = {
          labels: result.map((item: any) => item._id),
          datasets: [
            {
              data: result.map((item: any) => item.count),
              backgroundColor: [
                '#6495ED',
                '#ADD8E6',
                '#98FB98',
                '#7FFF00',
                '#9370DB',
                '#DDA0DD',
                '#CD5C5C',
                '#FF8C00',
                '#F0E68C',
                '#FFA500',
                '#FFE4E1',
                '#2F4F4F',
                '#87CEFA',
              ],
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

  undefeatedPlayers(trophies: string) {
    this.querys.undefeatedPlayers(Number(trophies)).subscribe((result: any) => {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.undefeatedPlayersData = {
        labels: result.map((item: any) => item.name),
        datasets: [
          {
            data: result.map((item: any) => item.trophies),
            backgroundColor: [
              '#6495ED',
              '#ADD8E6',
              '#98FB98',
              '#7FFF00',
              '#9370DB',
              '#DDA0DD',
              '#CD5C5C',
              '#FF8C00',
              '#F0E68C',
              '#FFA500',
              '#FFE4E1',
              '#2F4F4F',
              '#87CEFA',
            ],
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

  cardsWithHighLossRate(startDate: string, endDate: string, limit: string) {
    this.querys
      .cardsWithHighLossRate(startDate, endDate, Number(limit))
      .subscribe((result: any) => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const surfaceBorder =
          documentStyle.getPropertyValue('--surface-border');

        this.cardsWithHighLossRateData = {
          labels: result.map((item: any) => item._id),
          datasets: [
            {
              data: result.map((item: any) => item.lossRate),
              backgroundColor: [
                '#6495ED',
                '#ADD8E6',
                '#98FB98',
                '#7FFF00',
                '#9370DB',
                '#DDA0DD',
                '#CD5C5C',
                '#FF8C00',
                '#F0E68C',
                '#FFA500',
                '#FFE4E1',
                '#2F4F4F',
                '#87CEFA',
              ],
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
}
