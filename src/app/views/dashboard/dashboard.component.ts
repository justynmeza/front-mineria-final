import { Component } from '@angular/core';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  selling: string = '';
  count: number = 0;
  highQualification: number = 0;
  total: number = 0;

  bestFiveTitle: string[] = [];
  bestFiveValue: number[] = [];

  bestContinentalTitle: string[] = [];
  bestContinentalValue: Array<any> = [];

  bestGameWorld:any[] = [];

  lineData: unknown;
  lineOptions: unknown;

  barData: any;
  barOptions: any;

  barData2: any;
  barOptions2: any;

  pieData: unknown;
  pieOptions: unknown;

  doughnutData: unknown;
  doughnutOptions: unknown;

  polarData: unknown;
  polarOptions: unknown;

  constructor(private gameService: GamesService) {
  }

  ngOnInit() {
    this.getBestFive();
    setTimeout(() => {
      this.getBestNA();
    }, 1);
    setTimeout(() => {
      this.getBestEUR();
    }, 1);
    setTimeout(() => {
      this.getSBestJP();
    }, 1);
    setTimeout(() => {
      this.getBestROW();
    }, 1);
    setTimeout(() => {
      this.getBestGlobal();
    }, 1);
    
    setTimeout(() => {
      this.initBarChart();
      this.initBar2Chart();
      this.initPieChart();
    }, 1000);
  }

  //#region Inicializar las graficas

  initBarChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.barData = {
      labels: this.bestFiveTitle,
      datasets: [
        {
          label: 'Ventas',
          data: this.bestFiveValue,
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1
        }
      ]
    };

    this.barOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  initPieChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.pieData = {
      labels: this.bestFiveTitle,
      datasets: [
        {
          data: this.bestFiveValue,
          backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
        }
      ]
    };

    this.pieOptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };
  }

  initBar2Chart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.barData2 = {
      labels: this.bestContinentalTitle,
      datasets: [
        {
          label: 'Ventas',
          data: this.bestContinentalValue,
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1
        }
      ]
    };

    this.barOptions2 = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }
  //#endregion

  //#region Consulta de datos
  getBestFive() {
    this.gameService.getBestFive().subscribe({
      next: (res: any) => {
        res.forEach((element: { game: string; global: number }) => {
          this.bestFiveTitle.push(element.game);
          this.bestFiveValue.push(element.global);
        });
      },
      error: (err: any) => console.log(err)
    });
  }

  getBestNA() {
    this.gameService.getBestNA().subscribe({
      next: (res: any) => {
        console.log(res);
        res.forEach((element: { game: string; global: number }) => {
          this.bestContinentalTitle.push(element.game);
          this.bestContinentalValue.push(element.global);
        });
      },
      error: (err: any) => console.log(err)
    });
  }

  getBestEUR() {
    this.gameService.getBestEUR().subscribe({
      next: (res: any) => {
        console.log(res);
        res.forEach((element: { game: string; global: number }) => {
          this.bestContinentalTitle.push(element.game);
          this.bestContinentalValue.push(element.global);
        });
      },
      error: (err: any) => console.log(err)
    });
  }

  getSBestJP() {
    this.gameService.getBestJP().subscribe({
      next: (res: any) => {
        console.log(res);
        res.forEach((element: { game: string; global: number }) => {
          this.bestContinentalTitle.push(element.game);
          this.bestContinentalValue.push(element.global);
        });
      },
      error: (err: any) => console.log(err)
    });
  }

  getBestROW() {
    this.gameService.getBestROW().subscribe({
      next: (res: any) => {
        console.log(res);
        res.forEach((element: { game: string; global: number }) => {
          this.bestContinentalTitle.push(element.game);
          this.bestContinentalValue.push(element.global);
        });
      },
      error: (err: any) => console.log(err)
    });
  }

  getBestGlobal() {
    this.gameService.getBestGlobal().subscribe({
      next: (res: any) => {
        console.log(res);
        res.forEach((element: { game: string; global: number }) => {
          this.bestGameWorld.push(element.game);
          this.bestGameWorld.push(element.global);
        });
      },
      error: (err: any) => console.log(err)
    });
  }

  //#endregion

}
