import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'forum-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    isNavbarCollapsed = true;
    @Output() onSwitchLang = new EventEmitter<string>();

    switchLang(lang: string) {
        this.onSwitchLang.emit(lang);
    }
}
