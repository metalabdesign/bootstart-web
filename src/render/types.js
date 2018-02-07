// @flow

export type Asset = {
  url: string,
  name: string,
  chunkName: string,
};

export type WebpackStats = {
  assets: Array<Asset>,
  chunks: Array<mixed>,
  hash: string,
  publicPath: string,
};

export type AssetMap = {
  [string]: Array<Asset>,
};
