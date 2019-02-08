VTEX Category Menu
=====

## Description
The VTEX Category Menu app shows a department list of the store on an customizable menu. 
This is a VTEX app that is used by Dreamstore product.

:loudspeaker: **Disclaimer:** Don't fork this project, use, contribute, or open issue with your feature request.

## Release schedule
| Release  | Status              | Initial Release | Maintenance LTS Start | End-of-life | Dreamstore Compatibility
| :--:     | :---:               |  :---:          | :---:                 | :---:       | :---: 
| [1.x]    | **Maintenance LTS** |  2018-08-24     | 2018-11-20            | March 2019  | 1.x
| [2.x]    | **Current Release** |  2018-11-20     |                       |             | 2.x
See our [LTS policy](https://github.com/vtex-apps/awesome-io#lts-policy) for more information.

## Table of Contents
- [Usage](#usage)
- [API](#api)
  - [Blocks API](#blocks-api)
    - [Configuration](#configuration)
  - [Styles API](#styles-api)
- [Troubleshooting](#troubleshooting)

## Usage

This app use our store builder with the blocks architecture. To know more about Store Builder [click here.](https://help.vtex.com/en/tutorial/understanding-storebuilder-and-stylesbuilder#structuring-and-configuring-our-store-with-object-object)

To use this app you need to import in your dependencies on `manifest.json`.

```json
  dependencies: {
    "vtex.category-menu": "2.x"
  }
```

Then, add `category-menu` block into your app theme, like we do in our [Dreamstore app](https://github.com/vtex-apps/dreamstore/blob/master/store/blocks.json). 

### Blocks API
:construction: :construction: :construction:

This app have an interface that describes what are the rules that the blocks must implement when you want to use the category-menu block. 

```json
  "category-menu": {
    "component": "index"
  }
}
```

#### Configuration 
Through the Storefront you can change the behavior and interface of minicart. But, you also can make adjusts in your theme app, like Dreamstore does.

| Prop name          | Type       | Description                                                                 |
| ------------------ | ---------- | --------------------------------------------------------------------------- |
| `showPromotionCategory`                      | `Boolean`   | Shows the promotion category in menu               |
| `showGiftCategory`          | `Boolean`  | Shows the gift category in menu                               |
| `showAllDepartments`              | `Boolean`  | Shows all departments category in menu                              |
| `menuDisposition`                   | `Enum`  | Indicates the disposition of the menu on the screen (left, center, right)                                     |
| `showSubcategories`        | `Boolean`   | Decides if the subcategories will be displayed
| `departments` | `Array`   | List of departments to be displayed on the menu  |


### Styles API
:construction: :construction: :construction:

## Troubleshooting
You can check if others are passing through similar issues [here](https://github.com/vtex-apps/category-menu/issues). Also feel free to [open issues](https://github.com/vtex-apps/category-menu/issues/new) or contribute with pull requests.