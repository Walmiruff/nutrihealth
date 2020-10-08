import { Component, HostBinding, OnInit } from '@angular/core';
import { ToasterService, ToasterConfig } from 'angular2-toaster';

import { SettingsService } from './core/settings/settings.service';
import { MessageStore } from './shared/store/message.store';
import { IMessage } from './shared/models/message.model';

import { AlimentosService } from './shared/services/alimentos.service';
import IBGE from '../assets/resources/alimentos/IBGE.json';
import TACO from '../assets/resources/alimentos/TACO.json';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    @HostBinding('class.layout-fixed') get isFixed() { return this.settings.getLayoutSetting('isFixed'); };
    @HostBinding('class.aside-collapsed') get isCollapsed() { return this.settings.getLayoutSetting('isCollapsed'); };
    @HostBinding('class.layout-boxed') get isBoxed() { return this.settings.getLayoutSetting('isBoxed'); };
    @HostBinding('class.layout-fs') get useFullLayout() { return this.settings.getLayoutSetting('useFullLayout'); };
    @HostBinding('class.hidden-footer') get hiddenFooter() { return this.settings.getLayoutSetting('hiddenFooter'); };
    @HostBinding('class.layout-h') get horizontal() { return this.settings.getLayoutSetting('horizontal'); };
    @HostBinding('class.aside-float') get isFloat() { return this.settings.getLayoutSetting('isFloat'); };
    @HostBinding('class.offsidebar-open') get offsidebarOpen() { return this.settings.getLayoutSetting('offsidebarOpen'); };
    @HostBinding('class.aside-toggled') get asideToggled() { return this.settings.getLayoutSetting('asideToggled'); };
    @HostBinding('class.aside-collapsed-text') get isCollapsedText() { return this.settings.getLayoutSetting('isCollapsedText'); };

    public message: IMessage;
    public toasterconfig: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right',
        showCloseButton: true
    });

    constructor(
        private messageStore: MessageStore,
        private alimentosService: AlimentosService,
        public settings: SettingsService,
        public toasterService: ToasterService,
    ) { }

    ngOnInit() {
        document.addEventListener('click', e => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'A') e.preventDefault();
        });

        this.messageStore.message$.subscribe((msg: IMessage) => {
            this.toasterService.pop(msg);
        });

        this.loadData();
    }

    public loadData(): void {
        this.alimentosService.load(IBGE, TACO);
    }

}
