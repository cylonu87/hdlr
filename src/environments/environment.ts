// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

export function getApiUrl(user: string, repo: string) {
  //return "http://localhost/download.json"
  return "https://api.bitbucket.org/2.0/repositories/" + user + "/" + repo + "/downloads?pagelen=100&fields=values.name,values.downloads,values.created_on,values.size,next"
}

export function getChangelogUrl() {
  return "http://localhost:4200/assets/changelog.json"
}


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.