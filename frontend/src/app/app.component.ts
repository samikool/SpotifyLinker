import { Component, OnInit} from '@angular/core';

export interface Song {
  name: string;
  position: number;
  artist: string;
  album: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'spotifylinker';
  loggedIn = false;
  allData = {};
  dataSource: Song[] = [];
  playlistName: string = ''; 
  playListNames: string[] = [];

  constructor(){
    if(localStorage.getItem('accessToken')){
      this.loggedIn = true;
    }
  }

  async onLoginClick(){
    window.location.href = "http://spotifygrabber.mooo.com:3005/login";
  }

  async onLogoutClick(){
    console.log('clicked')
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.loggedIn = false;
    window.location.reload();
  }

  async onPlayListChange(event){
    this.playlistName = event.target.value;
    this.updateTableData();
  }

  async ngOnInit(){
    let url = window.location.toString();
    console.log(url)
    if(url !== 'http://spotifygrabber.mooo.com:4200/'){
      console.log(url);
      let accessToken = url.split('#')[1].split('&')[0].split('=')[1];
      let refreshToken = url.split('#')[1].split('&')[1].split('=')[1];
      console.log(accessToken);
      console.log(refreshToken);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      
      window.location.href = 'http://spotifygrabber.mooo.com:4200/';
    }
    if(localStorage.getItem('accessToken')){
      let playlists = await this.getPlaylists();
      playlists.forEach((playList,index) => {
        console.log(playList.name);

        this.playListNames.push(playList.name)
        
        this.getSongs(playList)
        .then((tracks)=>{
          console.log(playList.name);
          this.allData[playList.name] = tracks;
        })
        .then(() => {
           if(index===0){
            this.playlistName = playList.name;
            this.updateTableData();
           }
        })
      });
    }
  }

  //returns playlists for users
  async getPlaylists(){
    console.log('access')
    let token = await localStorage.getItem('accessToken');
    let response = await fetch('http://spotifygrabber.mooo.com:3005/playlists', {
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
    return response['playlists'];
  }

  //returns songs for a given playlist
  async getSongs(playList){
    let url = playList.tracks.href;
    let total = playList.tracks.total

    let token = await localStorage.getItem('accessToken');
    let response = await fetch('http://spotifygrabber.mooo.com:3005/tracks', {
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
    console.log(response)
    return response['tracks']; 
  }

  //sets table to display data about current playlist name
  async updateTableData(){
    let tempData: Song[] = []
    console.log(this.allData)
    this.allData[this.playlistName].forEach((track,index) => {
      track = track['track'];
      tempData.push(
        {
          name: track.name,
          album: track.album.name,
          position: index,
          artist: track.artists[0].name,
        }
      );
    });
    console.log(tempData);
    this.dataSource = tempData;
  }
}
