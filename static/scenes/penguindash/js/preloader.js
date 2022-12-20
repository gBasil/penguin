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

const Preloader = function(game) {};

Preloader.prototype.preload = function() {
  this.load.crossOrigin = 'anonymous';
//   this.load.baseURL = this.game.st_parent.componentDir;
//   this.load.baseURL = '/static/scenes/';
  this.load.baseURL = '/img/sprites/';

  // nb. set asBlob to true for CORS
  this.load.video('background', 'wave-bg-slow-big-no-waves.mp4', 'canplaythrough', true);

  this.load.spritesheet('sprite-penguin', 'sprite-penguin.png', 153, 108, 32);
  this.load.image('shadow-penguin', 'penguin-shadow.png');
  this.load.spritesheet('sprite-dust', 'sprite-dust.png', 150, 108, 16);

  this.load.image('element-present1', 'element-present1.png');
  this.load.image('element-present2', 'element-present2.png');
  this.load.image('element-present3', 'element-present3.png');
  this.load.image('element-present4', 'element-present4.png');
  this.load.image('element-present5', 'element-present5.png');
  this.load.image('element-present6', 'element-present6.png');
  this.load.image('element-presentStacked', 'element-presentStacked.png');

  this.load.image('element-coal1', 'element-coal1.png');
  this.load.image('element-coal2', 'element-coal2.png');
  this.load.image('element-coal3', 'element-coal3.png');
  this.load.image('element-tree1', 'element-tree1.png');
  this.load.image('element-tree2', 'element-tree2.png');

  this.load.spritesheet('sprite-duck', 'sprite-duck.png', 169, 202, 22);
  this.load.spritesheet('sprite-green_elf', 'sprite-green_elf.png', 169, 202, 17);
  this.load.spritesheet('sprite-orange_elf', 'sprite-orange_elf.png', 169, 202, 16);
  this.load.spritesheet('sprite-walrus', 'sprite-walrus.png', 169, 202, 17);
  this.load.spritesheet('sprite-angels', 'sprite-angels.png', 900, 750, 1);
  this.load.spritesheet('sprite-sm_iceberg', 'sprite-sm_iceberg.png', 720, 480, 1);
  this.load.spritesheet('sprite-iceberg', 'sprite-iceberg.png', 1200, 900, 1);
  this.load.spritesheet('sprite-snowman', 'sprite-snowman.png', 736, 616, 1);

  // still image fallback for mobile
  this.load.spritesheet('element-duck', 'element-duck.png');
  this.load.spritesheet('element-green_elf', 'element-green_elf.png');
  this.load.spritesheet('element-orange_elf', 'element-orange_elf.png');
  this.load.spritesheet('element-walrus', 'element-walrus.png');
  this.load.spritesheet('element-angels', 'element-angels.png');
  this.load.spritesheet('element-sm_iceberg', 'element-sm_iceberg.png');
  this.load.spritesheet('element-iceberg', 'element-iceberg.png');
  this.load.spritesheet('element-snowman', 'element-snowman.png');

  this.load.image('element-snow1', 'element-snow1.png');
  this.load.image('element-snow1-shadow', 'element-snow1-shadow.png');
  this.load.image('element-snow2', 'element-snow2.png');
  this.load.image('element-snow2-shadow', 'element-snow2-shadow.png');
  this.load.image('element-snow3', 'element-snow3.png');
  this.load.image('element-snow3-shadow', 'element-snow3-shadow.png');
  this.load.image('element-snow4', 'element-snow4.png');
  this.load.image('element-snow4-shadow', 'element-snow4-shadow.png');
  this.load.image('element-snow5', 'element-snow5.png');
  this.load.image('element-snow5-shadow', 'element-snow5-shadow.png');
  this.load.image('element-ice1', 'element-ice1.png');
  this.load.image('element-ice1-shadow', 'element-ice1-shadow.png');
  this.load.image('element-ice2', 'element-ice2.png');
  this.load.image('element-ice2-shadow', 'element-ice2-shadow.png');
  this.load.image('element-ice3', 'element-ice3.png');
  this.load.image('element-ice3-shadow', 'element-ice3-shadow.png');
  this.load.image('element-ice4', 'element-ice4.png');
  this.load.image('element-ice4-shadow', 'element-ice4-shadow.png');
  this.load.image('element-ice5', 'element-ice5.png');
  this.load.image('element-ice5-shadow', 'element-ice5-shadow.png');
  this.load.image('element-finish', 'element-finish.png');

  this.load.image('element-start', 'element-start.png');
  this.load.image('element-finish', 'element-finish.png');
  this.load.image('element-celebrate', 'element-celebrate.png');
  this.load.image('element-pole', 'element-pole.png');

  this.load.spritesheet('sprite-wave1', 'sprite-wave1.png', 250, 100, 41);
  this.load.spritesheet('sprite-wave2', 'sprite-wave2.png', 250, 100, 55);
};


Preloader.prototype.create = function() {
  this.game.state.start('Game');
};

export { Preloader };