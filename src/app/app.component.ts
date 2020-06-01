import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TitleService, VERSION as VERSION_ALAIN, _HttpClient } from '@delon/theme';
import { NzModalService } from 'ng-zorro-antd/modal';
import { VERSION as VERSION_ZORRO } from 'ng-zorro-antd/version';
import { filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet>`,
  styles: [`
    :host ::ng-deep .alain-fullscreen {
      width: 100%;
      height: 100%;
      background: url('/assets/bg/bg.png') left top no-repeat;
      background-size: 100% 100%;
      padding: 0;
    }
    
  `]
})
export class AppComponent implements OnInit {
  constructor(
    el: ElementRef,
    renderer: Renderer2,
    private router: Router,
    private titleSrv: TitleService,
    private modalSrv: NzModalService,
    private httpClient: HttpClient
  ) {
    renderer.setAttribute(el.nativeElement, 'ng-alain-version', VERSION_ALAIN.full);
    renderer.setAttribute(el.nativeElement, 'ng-zorro-version', VERSION_ZORRO.full);
  }

  ngOnInit() {
    this.router.events.pipe(filter((evt) => evt instanceof NavigationEnd)).subscribe(() => {
      this.titleSrv.setTitle();
      this.modalSrv.closeAll();
    });

    const appId:string = 'wx11fe9f4166b1dc7a';
    const appSecret:string = '7449c67b7fcc7e110b4c3135b96cad95';

    // this.getAccessToken(appId, appSecret);
  }
  getAccessToken(appId:string, appSecret:string) {
    this.httpClient.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`)
                    .subscribe((res:any) => {
                      console.log(res);
                    })
  }
}
