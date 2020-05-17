import {Component, OnInit} from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface Song {
  name: string;
  position: number;
  artist: string;
  album: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 12, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 13, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 14, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 15, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 16, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 17, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 18, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 19, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 20, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 21, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 22, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 23, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 24, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 25, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 26, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 27, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 28, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 29, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 30, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-music-table',
  templateUrl: './music-table.component.html',
  styleUrls: ['./music-table.component.css']
})
export class MusicTableComponent implements OnInit{
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  songColumns: string[] = ['position', 'name', 'artist', 'album']
  dataSource = ELEMENT_DATA;
  allData = {};
  playlistName: string = ''; 

  async ngOnInit(){
    let url = window.location.toString();
    if(url !== 'http://localhost:4200/'){
      console.log(url);
      let accessToken = url.split('#')[1].split('&')[0].split('=')[1];
      let refreshToken = url.split('#')[1].split('&')[1].split('=')[1];
      console.log(accessToken);
      console.log(refreshToken);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      
      window.location.href = 'http://localhost:4200/';
    }

    if(localStorage.getItem('accessToken')){
      this.getPlaylists()
    }
  }

  async getPlaylists(){
    console.log('access')
    let token = await localStorage.getItem('accessToken');
    let response = await fetch('http://localhost:3005/playlists', {
      method: 'GET',
      headers: {
        'ContentType' : 'application/json',
        'Authorization' : 'Bearer ' + token,
      }
    })
    
    if(!response.ok){
      console.log('error getting playlists')
    }

    response = await response.json();
    console.log(response);
    console.log(response['playlists'])

    let data = {};
    response['playlists'].forEach(async (playList) => {
      console.log(playList.name)
      data[playList.name] = await this.getSongs(playList.tracks.href, playList.tracks.total)
    });
    this.allData = data; 
  }

  async getSongs(url, total){
    let token = await localStorage.getItem('accessToken');
    let response = await fetch('http://localhost:3005/tracks', {
    method: 'GET',
    headers: 
      {
        'ContentType' : 'application/json',
        'Authorization' : 'Bearer ' + token,
        'link' : url,
        'total' : total.toString(),
      }
    })
    
    response = await response.json();
    return response['tracks']; 
  }

  async setTableData(playlistName, tracks){
    let tempData = []

  }
}