// @flow

export type Asset = {
  name: string,
  chunkName: string,
};

export type WebpackStats = {
  assets: Array<Asset>,
  chunks: Array<mixed>,
  hash: string,
  publicPath: string,
};

export type AssetWithUrl = Asset & {url: string};

export type AssetMap = {
  [string]: Array<AssetWithUrl>,
};
