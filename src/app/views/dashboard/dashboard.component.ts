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

  sellBrandsTitle: string[] = [];
  sellBrandsValue: number[] = [];

  brands: string[] = [];
  brandsFill: number[] = [];

  bestBrandsPriceTitle: string[] = [];
  bestBrandsPriceValue: Array<any> = [];

  bestBrandsTitle: string[] = [];
  bestBrandsValues: number[] = [];

  priceSizeTitle: string[] = [];
  priceSizeValue: any[] = [];

  updateRateTitle: string[] = [];
  updateRateValue: string[] = [];

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
    this.getBestNA();
    this.getBestEUR();
    this.getSBestJP();
    this.getBestROW();
    this.getBestGlobal();
    setTimeout(() => {
      this.initLineChart();
      this.initBarChart();
      this.initBar2Chart();
      this.initPieChart();
      this.initDoughnutChart();
      this.initPolarChart();
    }, 1000);
  }

  //#region Inicializar las graficas
  initLineChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.lineData = {
      labels: this.bestBrandsPriceTitle,
      datasets: [
        {
          label: this.bestBrandsPriceTitle[0],
          data: this.bestBrandsPriceValue[0],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
          borderColor: documentStyle.getPropertyValue('--bluegray-700'),
          tension: .4
        },
        {
          label: this.bestBrandsPriceTitle[1],
          data: this.bestBrandsPriceValue[1],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--green-600'),
          borderColor: documentStyle.getPropertyValue('--green-600'),
          tension: .4
        },
        {
          label: this.bestBrandsPriceTitle[2],
          data: this.bestBrandsPriceValue[2],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
          borderColor: documentStyle.getPropertyValue('--yellow-500'),
          tension: .4
        }
      ]
    };

    this.lineOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
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

  initBarChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.barData = {
      labels: this.sellBrandsTitle,
      datasets: [
        {
          label: 'Ventas',
          data: this.sellBrandsValue,
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
      labels: this.bestBrandsTitle,
      datasets: [
        {
          data: this.bestBrandsValues,
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

  initDoughnutChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.doughnutData = {
      labels: this.sellBrandsTitle,
      datasets: [
        {
          data: this.sellBrandsValue,
          backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
        }
      ]
    };


    this.doughnutOptions = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
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
      labels: this.priceSizeTitle,
      datasets: [
        {
          label: 'Ventas',
          data: this.priceSizeValue,
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

  initPolarChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.polarData = {
      datasets: [
        {
          data: this.updateRateValue,
          backgroundColor: [
            documentStyle.getPropertyValue('--red-500'),
            documentStyle.getPropertyValue('--green-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--bluegray-500'),
            documentStyle.getPropertyValue('--blue-500')
          ],
          label: 'Tasa de Refrezco'
        }
      ],
      labels: this.updateRateTitle
    };

    this.polarOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        r: {
          grid: {
            color: surfaceBorder
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
        console.log(res)
        //this.selling = res[0].brand;
      },
      error: (err: any) => console.log(err)
    });
  }

  getBestNA() {
    this.gameService.getBestNA().subscribe({
      next: (res: any) => {
        console.log(res);
        //this.highQualification = res[0].qualification;
      },
      error: (err: any) => console.log(err)
    });
  }

  getBestEUR() {
    this.gameService.getBestEUR().subscribe({
      next: (res: any) => {
        console.log(res);
        //this.total = res[0].sum_price;
      },
      error: (err: any) => console.log(err)
    });
  }

  getSBestJP() {
    this.gameService.getBestJP().subscribe({
      next: (res: any) => {
        console.log(res);
        /* res.forEach((element: { brand: string; count: number }) => {
          this.sellBrandsTitle.push(element.brand);
          this.sellBrandsValue.push(element.count);
        }); */
      },
      error: (err: any) => console.log(err)
    });
  }

  getBestROW() {
    this.gameService.getBestROW().subscribe({
      next: (res: any) => {
        console.log(res);
        /* res.forEach((element: { brand: string; }) => {
          this.brands.push(element.brand)
        }); */
      },
      error: (err: any) => console.log(err)
    });
  }

  getBestGlobal() {
    this.gameService.getBestGlobal().subscribe({
      next: (res: any) => {
        console.log(res);
        /* res.forEach((element: { brand: string; count: number }) => {
          this.bestBrandsTitle.push(element.brand);
          this.bestBrandsValues.push(element.count);
        }); */
      },
      error: (err: any) => console.log(err)
    });
  }

  //#endregion

}
