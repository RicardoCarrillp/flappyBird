import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  containerHeight!: number;
  containerWidth!: number;

  gameStarted: boolean=false;
  gameOver: boolean=false;

  score:number = 0;
  musicActive:boolean = false;
  music = new Audio('/assets/music/ionic-bird-track.MP3')

  birdHeight:number = 38;
  birdWidth:number = 43;
  birdPosition:number = 300;
  birdInterval!:any;


  obstacleHeight: number = 0;
  obstacleWidth: number = 52;
  obstaclePosition: number = this.containerWidth;
  obstacleGap:number = 200;
  obstacleInterval!: any;

  constructor(
    private platform: Platform
  ) { }

  ngOnInit(): void {
    this.setContainerSize();
    this.birdInterval=setInterval(this.addGravity.bind(this),24)
    this.obstacleInterval =setInterval(this.moveObstacles.bind(this),24)
   }

   startGame(){
      this.gameStarted = true;
      this.gameOver = false;
      this.score = 0;
  }

  jump(){
    if (this.gameStarted) {
      if (this.birdPosition < this.birdHeight) this.birdPosition = 0;
      else this.birdPosition -= 60;
    }
  }

  moveObstacles(){
    let speed: number = this.containerWidth < 400 ? 4 : 6;

      if (this.gameStarted && this.obstaclePosition>=this.obstacleWidth) this.obstaclePosition -= speed;
      else{
        this.resetObstaclePositions();
        if (this.gameStarted) this.score++;
      }

    this.checkCollision();
  }

  setGameOver(){
    this.gameStarted=false;
    this.gameOver=true;
    this.birdPosition=300;
  }

  checkCollision(){
    let floorCollision = (this.birdPosition + 40) >= this.containerHeight;
    let topObsacleCollision = this.birdPosition >= 0 && this.birdPosition < this.obstacleHeight;
    let bottomObstacleCollision = this.birdPosition >= this.containerHeight - (this.containerHeight - this.obstacleGap - this.obstacleHeight) - this.birdHeight;

    if (floorCollision) this.setGameOver();

    if (this.obstaclePosition >= this.obstacleWidth
        && this.obstaclePosition <= this.obstacleWidth + 80
      && (topObsacleCollision || bottomObstacleCollision )
      ) {
      this.setGameOver()
    }
  }


  resetObstaclePositions(){
    this.obstaclePosition = this.containerWidth;
    this.obstacleHeight = Math.floor(Math.random()*(this.containerHeight - this.obstacleGap));
  }

  setContainerSize(): void {
    this.containerHeight = this.platform.height();
    this.containerWidth = this.platform.width() < 576 ? this.platform.width() : 526;
  }

  addGravity(): void {
    let gravity=4.5;
    if(this.gameStarted) this.birdPosition += gravity;
  }

  playMusic(){
    this.musicActive=!this.musicActive;
    if (this.musicActive) {
      this.music.play();
      this.music.loop;
    }
    else this.music.pause();
  }
}
