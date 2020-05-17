import { __awaiter, __decorate } from "tslib";
import { Component, Injectable } from '@angular/core';
const ELEMENT_DATA = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
    { position: 11, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 12, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 13, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 14, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 15, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 16, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 17, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 18, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 19, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 20, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
    { position: 21, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 22, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 23, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 24, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 25, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 26, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 27, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 28, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 29, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 30, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
let MusicTableComponent = class MusicTableComponent {
    constructor(http) {
        this.http = http;
        this.displayedColumns = ['position', 'name', 'weight', 'symbol'];
        this.dataSource = ELEMENT_DATA;
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
};
MusicTableComponent = __decorate([
    Component({
        selector: 'app-music-table',
        templateUrl: './music-table.component.html',
        styleUrls: ['./music-table.component.css']
    }),
    Injectable()
], MusicTableComponent);
export { MusicTableComponent };
//# sourceMappingURL=music-table.component.js.map