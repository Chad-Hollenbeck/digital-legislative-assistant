import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TranslatorService} from '@core/translator/translator.service';
import {MenuService} from '@core/menu/menu.service';
import {SharedModule} from '@shared/shared.module';

import {routes} from './routes';
import {RoutesService} from './routes.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  providers: [RoutesService],
  exports: [
    RouterModule
  ]
})

export class RoutesModule {
  constructor(public menuService: MenuService, tr: TranslatorService, routeService: RoutesService) {
    menuService.addMenu(routeService.getMenu());
  }
}
