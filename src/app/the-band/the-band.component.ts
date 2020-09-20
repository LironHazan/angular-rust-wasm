import { Component, OnInit } from '@angular/core';
import {defer, Observable} from 'rxjs';

interface Artist {
  strArtist: string;
  intFormedYear: string;
  strBiographyEN: string;
  strGenre: string;
  intMembers: string;
  strArtistBanner: string;
}

@Component({
  selector: 'app-the-band',
  templateUrl: './the-band.component.html',
  styleUrls: ['./the-band.component.css']
})
export class TheBandComponent implements OnInit {
  band: Artist;
  band$: Observable<Artist>;

  ngOnInit(): void {
    this.band$ = this.getTheBand$('היהודים');
  }

  private async getTheBand(name: string): Promise<Artist> {
    const artist = await import('../../../wasm/pkg/rust_wasm_part');
    return artist.query_band(name);
  }

  getTheBand$(name): Observable<Artist> {
    return defer(() => this.getTheBand(name));
  }

}
