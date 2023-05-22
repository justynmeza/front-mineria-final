import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router, Event } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  sidebarVisible: boolean = false;
  items: any = [];
  closed: boolean = false;


  constructor(private router: Router) {
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
    this.items = [{
      label: 'File',
      items: [
        { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/dashboard' },
        { label: 'Games', icon: 'pi pi-download', routerLink: ['/games'] },
        { label: 'Administrator', icon: 'pi pi-download', routerLink: ['/administrator']},
        //{label: 'Recent Files', icon: 'pi pi-download', routerLink: ['/pagename'], queryParams: {'recent': 'true'}}
      ]
    }];
  }

}
