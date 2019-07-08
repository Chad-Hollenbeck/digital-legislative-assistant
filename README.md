# Ng2angle V4.3

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.4.

## Authentication
Authentication types vary by branch. This master branch does not include any authentication. See the branches below for auth details. 
* `master` : Ng2Angle FULL Angular project. Used for code retrieval without having to re-download the solution files. 
* `seed` : Ng2Angle SEED Angular project. Use as starter project w/out pre-built firebase libraries or auth/user features.
* `firebaseBasic` : Email username & password w/ Firebase. User details stored in Firestore collection.
* `firebaseOAuth` : OAuth providers w/ Firebase. User details stored in Firestore collection.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

Be mindful of the menu structure.  For all menu items (features) you must create a feature folder then run `ng generate component component-name` in the feature folder.  You must then add this line to the children array in the routes.ts file:

`{path: 'test', loadChildren: './test/test.module#TestModule', data: {showError: false}}`

Remove the import lines and component names from the declarations lines from the routes.module.ts file if they are auto-generated:
```
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    //Testv1Component
  ],
  exports: [
    RouterModule
  ]
})
```

The feature structure should be as follows:

```
-routes
--featurename
----subfeaturename
--featurename.module.ts
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
