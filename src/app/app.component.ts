import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-rust-wasm';

  ngOnInit(): void {
    // POC
    import('../../wasm/pkg/rust_wasm_part')
      .then(native => {
        native.greet();
        return native.queryBand('audioslave');
      })
      .then((data) => {
        console.log(data);
      });
  }
}
