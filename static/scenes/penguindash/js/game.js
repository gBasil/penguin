/*
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

import $ from 'jquery';
import { Constants } from './constants';
import { Preloader } from './preloader';
import { Start } from './start';
import { LevelUp } from '../../_shared/js/levelup';
import { Gameover } from '../../_shared/js/gameover';
import { Scoreboard } from '../../_shared/js/scoreboard';
import { Tutorial } from '../../_shared/js/tutorial';

/**
 * Main game class.
 * @param {!Element} elem DOM element containing the game.
 * @constructor
 * @export
 */
const Game = function(elem, componentDir) {
  this.startPromise = new Promise((resolve) => {
    this.resolveStart = resolve;
  });
  this.startPromise.then(() => {
    this.updateSize_();
  });

  this._realElem = elem;
  this.elem = $(elem);
  this.componentDir = componentDir;

  this.sceneElem = this.elem.find('#penguindash-game');

  this.level = 1;
  this.sceneSize = { width: 0, height: 0 };
  this.entities = [];
  this.isPlaying = false;
  this.paused = false;
  this.hidden = false;
  this.scale = 1;
  this.gameStartTime = +new Date;
  this.watchSceneSize_();
  this.watchOrientation_();

  this.scoreboard = new Scoreboard(this, this.elem.find('.board'), Constants.TOTAL_LEVELS);
  this.levelUp = new LevelUp(this, this.elem.find('.levelup'), this.elem.find('.levelup--number'));
  this.gameoverView = new Gameover(this, this.elem.find('.gameover'));
  this.tutorial = new Tutorial('device-tilt keys-arrows spacenav-arrows');

  this.gyroPresent = false;
  var detectGyro = function(event){
    if (!this.gyroPresent) {
      var e = event.originalEvent;
      if (e.alpha || e.beta || e.gamma) {
        this.gyroPresent = true;
      }
      this.showLockscreenMessage();
    }
  }.bind(this);
  $(window).on('deviceorientation.penguindash', function(event){
    detectGyro(event);
  });

  this.initGame = this.initGame.bind(this);
  this.initGame(true);
};


/**
 * Starts the game. Should only be called once.
 */
Game.prototype.start = function() {
  this.tutorial.start();

  //in case the game hasn't been fully loaded
  this.game.penguinPauseOnStart = false;
  this.game.paused = false;

  this.scoreboard.reset();
  this.scoreboard.restart();

	// I can't get this to work with Vite, and it seems to resize by itself anyway

  // make sure canvas is real size
//   const canvas = this._realElem.querySelector('canvas');
//   function checkSize() {

//     if (canvas.width && canvas.height) {
//       return;  // great
//     }
//     window.dispatchEvent(new Event('resize'));  // kick phaser

//     window.requestAnimationFrame(checkSize);
//   }
//   checkSize();
};


/**
 * Restarts the game. Can be called at any time.
 */
Game.prototype.restart = function() {
  this.initGame(false);

  this.scoreboard.reset();
  this.scoreboard.restart();
};

/**
 * Initialize the game to speed up start time.
 @param {boolean} pause Indicate if the game should pause after initialization.
 */
Game.prototype.initGame = function(pause) {
  window.PhaserGlobal = {};
  window.PhaserGlobal.disableAudio = true;
  
  if(this.game) {
    this.game.destroy();
  }

  this.game = new Phaser.Game('100%', '100%', Phaser.AUTO, this.sceneElem[0], null, true);
  this.game.st_parent = this;

  this.game.penguinPauseOnStart = pause;

  this.game.state.add('Preloader', Preloader);
  this.game.state.add('Game', Start);
  this.game.state.start('Preloader');
};


/**
 * Scale the game down for smaller resolutions.
 * @param {number} scale A scale between 0 and 1 on how much to scale.
 */
Game.prototype.setScale = function(scale) {
  this.scale = scale;
  if (this.game && this.game.world) {
    this.game.setScale(scale);
  }
};


/**
 * Freezes the game. Stops the onFrame loop and stops any CSS3 animations.
 * Used both for game over and pausing.
 */
Game.prototype.freezeGame = function() {
  this.isPlaying = false;
  this.elem.addClass('frozen');
  if (this.game) {
    this.game.pause();
  }
};


/**
 * Unfreezes the game.
 */
Game.prototype.unfreezeGame = function() {
  if (!this.isPlaying) {
    this.isPlaying = true;
    this.elem.removeClass('frozen').focus();
    if (this.game) {
      this.game.unpause();
    }
  }
};


/**
 * Stops the game as game over. Displays the game over screen as well.
 */
Game.prototype.gameover = function() {
  this.freezeGame();
  this.gameoverView.show();
  window.santaApp.fire('sound-trigger', 'music_ingame_gameover');
//   window.santaApp.fire('analytics-track-game-over', {
//     gameid: 'penguindash',
//     score: this.scoreboard.score,
//     level: this.level,
//     timePlayed: new Date - this.gameStartTime
//   });
};


/**
 * Pause the game.
 */
Game.prototype.pause = function() {
  this.paused = true;
  this.freezeGame();
};


/**
 * Resume the game.
 */
Game.prototype.resume = function() {
  this.paused = false;
  this.unfreezeGame();
};

/**
 * Show Lockscreen Message.
 */
Game.prototype.showLockscreenMessage = function () {
  if (this.gyroPresent){
    var paused = this.paused;
    var lockElem = this.elem.find('.lockscreen');
    if (lockElem.attr('hidden')) {
      return;  // do nothing
    }
    if (!paused) {
      this.pause();
    }
    lockElem.removeClass('hidden');
    window.setTimeout(() => {
      lockElem.addClass('hidden');
      if (!paused) {
        this.resume();
      }
    }, 3000);
  }
};


Game.prototype.updateSize_ = function() {
  var width = window.innerWidth,
    height = window.innerHeight - window.santaApp.headerSize,
    scale = width < 980 ? (width + 490) / (980 + 490) : 1;
  this.setScale(scale);
//   console.info('got size', scale);

  this.sceneSize.height = height * (1 / this.scale);
  this.sceneSize.width = width * (1 / this.scale);

  const canvas = this._realElem.querySelector('canvas');
  if (canvas) {
    canvas.focus();
  } else {
    this._realElem.focus();
  }

  this.showLockscreenMessage();
};


/**
 * Manages a cache of the scene size. Updates on window resize.
 * @private
 */
Game.prototype.watchSceneSize_ = function() {
  this.updateSize_();
  $(window).on('resize.penguindash', this.updateSize_.bind(this));
};


/**
 * Manages device orientation. Updates on orientation change.
 * @private
 */
Game.prototype.watchOrientation_ = function() {
  // var updateOrientation = function() {
  //   if ((screen.orientation && screen.orientation.angle !== 0) ||
  //     (window.orientation && window.orientation !== 0)) {
  //     this.pause();
  //   }
  //   else {
  //     this.resume();
  //   }
  // }.bind(this);

  // updateOrientation();
  // $(window).on('orientationchange.penguindash', updateOrientation);
};


/**
 * Cleanup
 * @export
 */
Game.prototype.dispose = function() {
  this.freezeGame();

  $(window).off('.penguindash');
  $(document).off('.penguindash');
  this.elem.off('.penguindash');

  this.tutorial.dispose();
};

export { Game };