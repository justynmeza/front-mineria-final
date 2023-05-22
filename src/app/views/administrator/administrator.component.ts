import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DropDownModels, GamesModel } from 'src/app/interfaces/games';
import { GamesService } from 'src/app/services/games.service';


@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class AdministratorComponent {

  @ViewChild('dt') dt: Table | undefined;

  gameDialog: boolean = false;

  games: GamesModel[] = [];

  gameO: GamesModel = {} as GamesModel;

  selectedGame: GamesModel[] | null = [];

  submitted: boolean = false;

  statuses: any[] = [];

  consoles: any[] = [];
  years: any[] = [];
  genders: any[] = [];

  constructor(private gameService: GamesService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {

    this.getAllConsoles();
    this.getAllGenders();
    this.getYears();

    this.getAllGames();

  }

  getAllGames() {
    this.gameService.getAllGames().subscribe({
      next: (res) => {
        console.log(res);
        if (res != null) {
          this.games = res;
        }
      }, error: (err) => console.log(err)
    });
  }

  openNew() {
    this.gameO = {} as GamesModel;
    this.submitted = false;
    this.gameDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.games = this.games.filter((val) => !this.selectedGame!.includes(val));
        this.selectedGame = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      }
    });
  }

  editProduct(product: GamesModel) {
    this.gameO = { ...product };
    this.gameDialog = true;
  }

  deleteProduct(game: GamesModel) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + game.game + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let data = {
          id: game.id
        }
        console.log(data);
        this.gameService.deleteGame(data).subscribe({
          next: (res) => {
            if (res != null) {
              this.gameO = {} as GamesModel;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
              this.getAllGames();
            }
          }, error: (err) => console.log(err)
        });
        //this.games = this.games.filter((val) => val.id !== product.id);
      }
    });
  }

  hideDialog() {
    this.gameDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;
    console.log('asdas');
    if (this.gameO.game) {
      if (this.gameO.id) {
        //Edit
        //this.games[this.findIndexById(this.gameO.id)] = this.gameO;
        this.gameService.updateGame(this.gameO).subscribe({
          next: (res) => {
            if (res != null) {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Game Updated', life: 3000 });
              this.getAllGames();
            }
          }, error: (err) => console.log(err)
        });
      } else {
        //Create
        this.gameService.createGame(this.gameO).subscribe({
          next: (res) => {
            if (res != null) {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Game Created', life: 3000 });
              this.getAllGames();
            }
          }, error: (err) => console.log(err)
        });
        //this.gameO.id = this.createId();
        //this.games.push(this.gameO);
      }

      //this.games = [...this.games];
      this.gameDialog = false;
      this.gameO = {} as GamesModel;
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.games.length; i++) {
      if (this.games[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  filterTable($event: any, valorCampo: string) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, valorCampo);
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return '';
    }
  }

  getAllConsoles() {
    this.gameService.getAllConsoles().subscribe({
      next: (res: any) => {
        res.forEach((element: { console: string; }) => {
          let data = {
            title: element.console,
            value: element.console
          }
          this.consoles.push(data);
        });
      },
      error: (err: any) => console.log(err)
    });
  }

  getAllGenders() {
    this.gameService.getAllGenders().subscribe({
      next: (res: any) => {
        res.forEach((element: { gender: string; }) => {
          let data = {
            title: element.gender,
            value: element.gender
          }
          this.genders.push(data)
        });
      },
      error: (err: any) => console.log(err)
    });
  }

  getYears() {
    var max = new Date().getFullYear();
    var min = max - 40;

    for (var i = max; i >= min; i--) {
      let data= {
        title: i,
        value: i
      }
      this.years.push(data)
    }
  }

}
