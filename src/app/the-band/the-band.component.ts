import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-the-band',
  templateUrl: './the-band.component.html',
  styleUrls: ['./the-band.component.css']
})
export class TheBandComponent implements OnInit {

  band;
  constructor() { }

  ngOnInit(): void {
    import('../../../wasm/pkg/rust_wasm_part')
      .then(native => {
        native.greet();
        return native.query_band('audioslave');
      })
      .then((data) => {
        this.band = data;
        console.log(data);
      });
  }

}
