// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
//export const HOSTNAME:string =location.hostname;
export const HOSTNAME:string ="35.239.88.80";
export const WEBSOCKET_HOSTNAME = '35.202.187.226';
export const ROUTESERVICE_HOSTNAME = '35.224.68.94';

export const ROUTESERVICE_PORT: number = 8083;
export const WEBSOCKET_PORT: number = 8084;
export const PORT:number = 8085;
export const PUBLISHER_PORT:number = 8082;
export const GATEWAYSERVICE_PORT:number = 5555;
