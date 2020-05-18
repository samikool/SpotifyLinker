import {Component, OnInit, Input, ViewChild} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface Song {
  name: string;
  position: number;
  artist: string;
  album: string;
}

@Component({
  selector: 'app-music-table',
  templateUrl: './music-table.component.html',
  styleUrls: ['./music-table.component.css']
})
export class MusicTableComponent implements OnInit{
  displayedColumns: string[] = ['position', 'name', 'artist', 'album'];
  @Input() dataSource: Song[] = [];
  dataSourcee = new MatTableDataSource(this.dataSource);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(){
    this.dataSourcee.sort = this.sort;
  }

  ngOnChanges(){
    console.log('change')
    this.dataSourcee = new MatTableDataSource(this.dataSource);
    this.dataSourcee.sort = this.sort;
  }

}