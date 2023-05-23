import { Component, Inject, OnInit } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router, Event } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  sidebarVisible: boolean = false;
  items: any = [];
  closed: boolean = false;
  invitado : boolean | undefined;

  constructor(private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService,) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        //console.log('a')
      }

      if (event instanceof NavigationError) {
        //console.error(event.error);
      }

      if (event instanceof NavigationEnd) {
        this.sidebarVisible = false;
      }
    });
  }

  ngOnInit() {
    this.storage.get('User') != undefined ? this.invitado = true : this.invitado = false;
    this.items = [{
      label: 'File',
      items: [
        { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/dashboard' },
        { label: 'Games', icon: 'pi pi-th-large', routerLink: ['/games'] },
        { label: 'Administrator', icon: 'pi pi-folder', routerLink: ['/administrator']},
        //{label: 'Recent Files', icon: 'pi pi-download', routerLink: ['/pagename'], queryParams: {'recent': 'true'}}
      ]
    }];
  }

}
