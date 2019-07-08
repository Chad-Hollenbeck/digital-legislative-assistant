import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RoutesService} from '../../routes.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private routeService: RoutesService, private authService: AuthService) {
    this.authService.logout().then(
      () => {
        this.router.navigate([this.routeService.byName('login')]);
      },
      () => {
        this.router.navigate([this.routeService.byName('login')]);
      }
    );
  }

  ngOnInit() {
  }

}
