import { Component, OnInit } from '@angular/core';
import { DownloadAppService } from '../../services/download-app.service';
import { catchError } from 'rxjs/operators'
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Downloads } from '../../models/downloads';
import { transition, state, style, animate, trigger } from '@angular/animations';
import { faDownload } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'download-app-button',
  templateUrl: './download-app-button.component.html',
  styleUrls: ['./download-app-button.component.css'],
  animations: [
    trigger('fadeIn', [

      state('hidden', style({opacity: 0})),
      state('shown', style({opacity: 1})),
      
      transition('hidden => shown', [
        animate(1000)
      ])

    ])
  ]
})
export class DownloadAppButtonComponent implements OnInit {
  downloadInfo = null
  visible = false
  
  faDownload = faDownload

  constructor(private downloadAppService: DownloadAppService) { }

  ngOnInit() {
    this.downloadAppService.getDownloadInfo('cylonu87', 'animedlr')
    .pipe(
      catchError( (err: HttpErrorResponse) => { 
        return throwError(err.message)
      } )
    )
    .subscribe(
      infos => {
        this.handleInfos(infos);
      },
      error => {
        console.log(error)
      }
    )
  }

  private handleInfos(infos: Downloads) {
    if(infos.values) {
      for(let download of infos.values) {
        if(!this.downloadInfo && download.name.startsWith("HDLR-")) {
           let splitted = download.name.split("-")
           if(splitted.length === 3 && splitted[0] === "HDLR") {
            let version = splitted[1]
            let size = download.size
            let downloadsCount = download.downloads
            let name = download.name

            this.downloadInfo = {
              file: "https://bitbucket.org/cylonu87/animedlr/downloads/" + name,
              version: version,
              size: size,
              downloads: downloadsCount
            }
            this.visible = true
           }
        }
      }
    }
  }

}
