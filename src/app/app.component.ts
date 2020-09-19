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
        return native.run('LironHazan/angular-rust-wasm');
      })
      .then((data) => {
        console.log(data);
        console.log('The latest commit to the angular-rust-wasm %s branch is:', data.name);
        console.log('%s, authored by %s <%s>', data.commit.sha, data.commit.commit.author.name, data.commit.commit.author.email);
      });
  }
}
