import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-save-color',
  templateUrl: './save-color.page.html',
  styleUrls: ['./save-color.page.scss'],
})
export class SaveColorPage implements OnInit {

  public color = {
    value: "#0000ff",
  }

  public imageSource: string = "https://docs-demo.ionic.io/assets/madison.jpg";

  constructor() { }

  ngOnInit() {
  }

  save() {

  }

  tryAgain() {
    
  }

}
