import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatorService } from '../core/translator/translator.service';
import { MenuService } from '../core/menu/menu.service';
import { SharedModule } from '../shared/shared.module';


import { menu } from './menu';
import { routes } from './routes';
import { Error404Component } from './pages/error404/error404.component';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forRoot(routes),
    ],
    declarations: [Error404Component],
    exports: [
        RouterModule
    ]
})

export class RoutesModule {
    constructor(public menuService: MenuService, tr: TranslatorService) {
        menuService.addMenu(menu);
    }
}
