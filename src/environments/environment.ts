// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  etherScan: '#?test=1',
  bscScan: '#?test=2',
  polygonScan: '#?test=3',
  snowTrace: '#?test=4',
  etherContractAddress: '0x0000000000000000000000000000000000000001',
  bscContractAddress: '0x0000000000000000000000000000000000000002',
  polygonContractAddress: '0x0000000000000000000000000000000000000003',
  avaxContractAddress: '0x0000000000000000000000000000000000000004',
  etherNetworkUrl: 'http://localhost:8545',
  bscNetworkUrl: 'http://localhost:8545',
  polygonNetworkUrl: 'http://localhost:8545',
  avaxNetworkUrl: 'http://localhost:8545',
  validChains: [1, 56, 97, 137, 1337, 43113, 43114, 80001, 11155111],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
