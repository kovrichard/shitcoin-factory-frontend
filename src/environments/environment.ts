// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  bscScan: '#',
  etherScan: '#',
  bscContractAddress: '0x0000000000000000000000000000000000000000',
  etherContractAddress: '0x0000000000000000000000000000000000000000',
  bscShapeshifterAddress: '0x0000000000000000000000000000000000000000',
  ethShapeshifterAddress: '0x0000000000000000000000000000000000000000',
  bscUsdtAddress: '0x55d398326f99059fF775485246999027B3197955',
  etherUsdtAddress: '0x36Bd2d15EDf178Af5896AD551c4884f90F44C926',
  bscNetworkUrl: 'http://localhost:8545',
  etherNetworkUrl: 'http://localhost:8545',
  validChains: [1, 3, 56, 97, 1337],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
