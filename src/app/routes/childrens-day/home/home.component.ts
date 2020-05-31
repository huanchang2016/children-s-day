import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable, fromEvent, Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit, AfterViewInit {

  
  @ViewChild('audioBtn', { static: false}) audioBtn;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    const click$ = fromEvent(this.audioBtn.nativeElement, 'click');
    const audio:any = document.getElementById('audio'); 
    
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
}
