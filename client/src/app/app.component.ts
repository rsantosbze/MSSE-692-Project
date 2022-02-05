import { HostListener } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    styleUrls: ['./app.component.css'],
    templateUrl: './app.component.html',
})
export class AppComponent {
    public title = 'AMS';
    // @HostListener('window:beforeunload', ['$event'])
    // public clearLocalStorage(event: Event) {
    //     localStorage.clear();
    // }
}
