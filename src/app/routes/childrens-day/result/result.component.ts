import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { fromEvent } from 'rxjs';

class Hero {
  id: number;
  name: string;
  avatar: string;
  picture: string;
  description: string;
}


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.less']
})
export class ResultComponent implements OnInit, AfterViewInit {
  list:Hero[] = [];

  currentSelectedHero:Hero;

  @ViewChild('audioBtn', {static: true}) audioBtn: any;

  constructor(
    private httpClient: _HttpClient
  ) {
    // const item = localStorage.getItem('currentSelectedHero');
    // if(item) {
    //   this.currentSelectedHero = JSON.parse(item);
    // }else {
    //   this.getDataList();
    // }
    this.getDataList();
  }
  ngOnInit() {}

  ngAfterViewInit(): void {
    const click$ = fromEvent(this.audioBtn.nativeElement, 'click');
    const audio:any = document.getElementById('audio'); 
    // if(audio !== null && audio.paused) {
    //   audio.play();
    // }
    click$.subscribe(e => {
      if(audio!==null){             
        //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
        if(audio.paused)                     {                 
          audio.play();//audio.play();// 这个就是播放  
        }else{
          audio.pause();// 这个就是暂停
        }
      }
    });
  }

  getDataList():void {
    this.httpClient.get('/assets/data/data.json').subscribe((res:Hero[]) => {
      this.list = res;
      this.chooseAnyOne();
    })
  }


  chooseAnyOne():void {
    const rand:number = Math.floor(Math.random() * (this.list.length));
    setTimeout(() => {
      this.currentSelectedHero = this.list[rand];
    }, 800);
    
    // localStorage.setItem('currentSelectedHero', JSON.stringify(this.currentSelectedHero));
  }
}
