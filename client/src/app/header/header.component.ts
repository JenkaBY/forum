import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'forum-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    isNavbarCollapsed = true;
    @Output() onOpenAdminDashboard = new EventEmitter<boolean>();
    @Output() onSwitchLang = new EventEmitter<string>();

    switchLang(lang: string) {
        this.onSwitchLang.emit(lang);
    }

    openAdminDashboard() {
        console.log('AdminDashboard Button was pressed!');
        this.onOpenAdminDashboard.emit(true);
    }
}
