import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  hideLayout = false;

  constructor(router: Router) {
    router.events.subscribe((ev: any) => {
        if (ev instanceof NavigationEnd) {
          this.hideLayout = (ev.urlAfterRedirects.includes('/auth/'));
        }
      }
    );

  }

  ngOnInit() {

  }

}
