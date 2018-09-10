/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { Server } from 'boardgame.io/server';
import KoaHelmet from 'koa-helmet';
import KoaStatic from 'koa-static';
import KoaWebpack from 'koa-webpack';
import path from 'path';

import Chess from './modules/chess/game';
import TicTacToe from './modules/tic-tac-toe/game';
import TurnExample from './modules/turnorder/game';
import WebpackConfig from './webpack.dev.js';

const PORT = process.env.PORT || 8000;
const DEV = process.env.NODE_ENV === 'development';
const PROD = !DEV;

const server = Server({ games: [TicTacToe, Chess, TurnExample] });

if (DEV) {
  server.app.use(
    KoaWebpack({
      config: WebpackConfig,
    })
  );
}

if (PROD) {
  server.app.use(KoaStatic(path.join(__dirname, 'dist')));
  server.app.use(KoaHelmet());
}

server.run(PORT, () => {
  console.log(`Serving at: http://localhost:${PORT}/`);
});
