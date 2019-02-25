# VTEX Category Menu

## Description
The VTEX Category Menu app is a store component that shows a department list of the store on an customizable menu, and this app is used by store theme.

:loudspeaker: **Disclaimer:** Don't fork this project; use, contribute, or open issue with your feature request.

## Release schedule
| Release  | Status              | Initial Release | Maintenance LTS Start | End-of-life | Store  Compatibility
| :--:     | :---:               |  :---:          | :---:                 | :---:       | :---: 
| [2.x]    | **Current Release** |  2018-11-20     |                       |             | 2.x
| [1.x]    | **Maintenance LTS** |  2018-08-24     | 2018-11-20            | March 2019  | 1.x

See our [LTS policy](https://github.com/vtex-apps/awesome-io#lts-policy) for more information.

## Table of Contents
- [Usage](#usage)
  - [Blocks API](#blocks-api)
    - [Configuration](#configuration)
  - [Styles API](#styles-api)
    - [CSS namespaces](#css-namespaces)
- [Troubleshooting](#troubleshooting)
- [Tests](#tests)

## Usage

This app uses our store builder with the blocks architecture. To know more about Store Builder [click here.](https://help.vtex.com/en/tutorial/understanding-storebuilder-and-stylesbuilder#structuring-and-configuring-our-store-with-object-object)

We add the category-menu as a block in our [Store Header](https://github.com/vtex-apps/store-header/blob/master/store/interfaces.json).

To configure or customize this app, you need to import it in your dependencies in `manifest.json`.

```json
  dependencies: {
    "vtex.category-menu": "2.x"
  }
```

Then, add `category-menu` block into your app theme, like we do in our [Store theme app](https://github.com/vtex-apps/store-theme/blob/master/store/blocks.json). 

Now, you can change the behavior of the `category-menu` block that is in the store header. See an example of how to configure: 

```json
"category-menu": {
    "props": {
      "showPromotionCategory": true,
      "showGiftCategory": true,
      "showAllDepartments": true,
      "showSubcategories": true,
      "menuPosition": "center",
      "departments": [],
      "additionalItems": []
    }
  }
```

### Blocks API

This app has an interface that describes what rules must be implemented by a block when you want to use the category-menu block.

```json
  "category-menu": {
    "component": "index"
  }
}
```

#### Configuration 
Through the Storefront you can change the behavior and interface of `CategoryMenu`. But, you can also make adjusts in your theme app, like Store does.

| Prop name          | Type       | Description                                                                 | Default Value |
| ------------------ | ---------- | --------------------------------------------------------------------------- | -------------- |
| `showPromotionCategory` | `Boolean`   | Shows the promotion category in menu               | false |
| `showGiftCategory`     | `Boolean`  | Shows the gift category in menu                               | false|
| `showAllDepartments`     | `Boolean`  | Shows all departments category in menu                              | true|
| `menuPosition`      | `Enum`  | Indicates the position of the menu on the screen. Possible values: left, center, right   | center|
| `showSubcategories`    | `Boolean`   | Decides if the subcategories will be displayed |true|
| `departments` | `Array(Department)`   | List of `department` to be displayed in the menu  | []|
| `additionalItems` | `Array(Item)` | List of `item` to be displayed in the menu | [] |

Department:

| Prop name          | Type       | Description                                                                 |
| ------------------ | ---------- | --------------------------------------------------------------------------- |
| `id` | `Number` | The department id |

Item:

| Prop name          | Type       | Description                                                                 |
| ------------------ | ---------- | --------------------------------------------------------------------------- |
| `name` | `String` | The name of the item |
| `slug` | `String` | The slug of the item. It must describe the relative path of the item, considering the root of the store.|
| `page` | `String` | The page to which the item will redirect. Can be used in conjunction with params to redirect to a search
| `params` | `Object` | The params for the page of this item. Must be undefined if no page is defined for the item
| `children` | `Array(item)` | The children of this item. There can be at most 2 levels of children above an item. It means that if one item has one child (lets call it A), and  A has a child B, and B has a child C, the children of C won't be considered.|

### Styles API

This app provides some CSS classes as an API for style customization.

To use this CSS API, you must add the `styles` builder and create an app styling CSS file.

1. Add the `styles` builder to your `manifest.json`:

```json
  "builders": {
    "styles": "1.x"
  }
```

2. Create a file called `vtex.category-menu.css` inside the `styles/css` folder. Add your custom styles:

```css
.container {
  margin-top: 10px;
}
```
#### CSS namespaces
Below, we describe the namespaces that are define in the `CategoryMenu`.

| Class name         |    Description     |  Component Source                                           |
| ------------------ | ----------         |------------------------------------------------------- |
| `container`        |  The main container of Category Menu for all sizes                        | [index](/react/index.js) |
| `mobile`          | The main container of Category Menu for mobile size | [index](/react/index.js)                                      |
| `animation`     | Category menu mobile sidebar animation         | [SideBar](/react/components/SideBar.js) |
| `sidebarOpen`              |  Active when the sidebar is opened                        | [SideBar](/react/components/SideBar.js)            |
| `sidebarScrim`          |  the sidebar shadow backdrop content                           | [SideBar](/react/components/SideBar.js)  |
| `sidebar`     |  The main container of sidebar                     | [SideBar](/react/components/SideBar.js)   |
| `sidebarHeader`     |  The sidebar header container                     | [SideBar](/react/components/SideBar.js)  |
| `sidebarContent`  |  The sidebar content container              |  [SideBar](/react/components/SideBar.js)   |
| `firstLevelLink`    |  First level of the Category Menu, the main categories links                      | [ItemContainer](/react/components/ItemContainer.js)          | 
| `secondLevelLink `          |  Second level of the Category Menu, the subcategories links                        | [ItemContainer](/react/components/ItemContainer.js)          |
| `itemContainer`    |  Main container of a category item/department                                    | [CategoryItem](/react/components/CategoryItem.js)            |
| `sidebarItem`     |  The container of a sidebar category item/department     | [SideBarItem](/react/components/SideBarItem.js)   |

## Troubleshooting
You can check if others are passing through similar issues [here](https://github.com/vtex-apps/category-menu/issues). Also feel free to [open issues](https://github.com/vtex-apps/category-menu/issues/new) or contribute with pull requests.

## Tests

To execute our tests go to react/ folder and run yarn test

### Travis CI

 [![Build Status](https://api.travis-ci.org/vtex-apps/category-menu.svg?branch=master)](https://travis-ci.org/vtex-apps/category-menu)