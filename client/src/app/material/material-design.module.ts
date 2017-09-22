import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatToolbarModule, MdCardModule, MdIconModule, MdMenuModule, MdToolbarModule } from '@angular/material';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MdCardModule,
        MdMenuModule,
        MdToolbarModule,
        MdIconModule
    ],
    exports: [
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MdCardModule,
        MdMenuModule,
        MdToolbarModule,
        MdIconModule
    ],
    declarations: []
})
export class MaterialDesignModule {
}
