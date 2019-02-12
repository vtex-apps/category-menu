# VTEX Category Menu

## Description
The VTEX Category Menu app shows a department list of the store on an customizable menu. 
This is a VTEX app that is used by Dreamstore product.

:loudspeaker: **Disclaimer:** Don't fork this project. Use, contribute, or open issue with your feature request.

## Release schedule
| Release  | Status              | Initial Release | Maintenance LTS Start | End-of-life | Dreamstore Compatibility
| :--:     | :---:               |  :---:          | :---:                 | :---:       | :---: 
| [1.x]    | **Maintenance LTS** |  2018-08-24     | 2018-11-20            | March 2019  | 1.x
| [2.x]    | **Current Release** |  2018-11-20     |                       |             | 2.x
See our [LTS policy](https://github.com/vtex-apps/awesome-io#lts-policy) for more information.

## Table of Contents
- [Usage](#usage)
  - [Blocks API](#blocks-api)
    - [Configuration](#configuration)
  - [Styles API](#styles-api)
- [Troubleshooting](#troubleshooting)
- [Tests](#tests)

## Usage

This app uses our store builder with the blocks architecture. To know more about Store Builder [click here.](https://help.vtex.com/en/tutorial/understanding-storebuilder-and-stylesbuilder#structuring-and-configuring-our-store-with-object-object)

To use this app you need to add it in your dependencies in the `manifest.json` file.

```json
  dependencies: {
    "vtex.category-menu": "2.x"
  }
```

Then, add `category-menu` block into your app theme, like we do in our [Dreamstore app](https://github.com/vtex-apps/dreamstore/blob/master/store/blocks.json). 

### Blocks API
:construction: :construction: :construction:

This app has an interface that describes what rules must be implemented by a block when you want to use the category-menu block.

```json
  "category-menu": {
    "component": "index"
  }
}
```

#### Configuration 
Through the Storefront you can change the behavior and interface of `CategoryMenu`. But, you can also make adjusts in your theme app, like Dreamstore does.

| Prop name          | Type       | Description                                                                 |
| ------------------ | ---------- | --------------------------------------------------------------------------- |
| `showPromotionCategory`                      | `Boolean`   | Shows the promotion category in menu               |
| `showGiftCategory`          | `Boolean`  | Shows the gift category in menu                               |
| `showAllDepartments`              | `Boolean`  | Shows all departments category in menu                              |
| `menuDisposition`                   | `Enum`  | Indicates the disposition of the menu on the screen (left, center, right)                                     |
| `showSubcategories`        | `Boolean`   | Decides if the subcategories will be displayed
| `departments` | `Array(items)`   | List of departments `items` to be displayed on the menu  |

Items:

| Prop name          | Type       | Description                                                                 |
| ------------------ | ---------- | --------------------------------------------------------------------------- |
| `id`                      | `Number`   | The department Id to be displayed on the menu               |

### Styles API
This app has CSS customization through `CSS Modules`. CSS Modules is a CSS file in which all class names and animation names are scoped locally by default. You can read more about CSS Modules [here](https://github.com/css-modules/css-modules).

We use it `css-loader` to generate a CSS token on a HTML element. For example, the builder generate a CSS token based on app vendor, name and major version. Like `container` token declared in category-menu, generate the classname `vtex.category-menu-2-x-container`.

Below, we describe the tokens, their explanation and the component where it is located.

| Token name         | Component          | Description                                            |
| ------------------ | ----------         |------------------------------------------------------- |
| `container`        | [index](https://github.com/vtex-apps/category-menu/blob/master/react/index.js)           | The main container of Category Menu for all sizes                        |
| `mobile`          | [index](https://github.com/vtex-apps/category-menu/blob/master/react/index.js)            | The main container of Category Menu for mobile size                                        |
| `animation`            | [SideBar](https://github.com/vtex-apps/category-menu/blob/master/react/components/SideBar.js)            | Category menu mobile sidebar animation         |
| `sidebarOpen`              | [SideBar](https://github.com/vtex-apps/category-menu/blob/master/react/components/SideBar.js)            | Active when the sidebar is opened                        | 
| `sidebarScrim`          | [SideBar](https://github.com/vtex-apps/category-menu/blob/master/react/components/SideBar.js)  | the sidebar shadow backdrop content                           |
| `sidebar`     | [SideBar](https://github.com/vtex-apps/category-menu/blob/master/react/components/SideBar.js)   | The main container of sidebar                     |
| `sidebarHeader`     | [SideBar](https://github.com/vtex-apps/category-menu/blob/master/react/components/SideBar.js)  | The sidebar header container                     |
| `sidebarContent`  | [SideBar](https://github.com/vtex-apps/category-menu/blob/master/react/components/SideBar.js)   | The sidebar content container              | 
| `firstLevelLink`    | [ItemContainer](https://github.com/vtex-apps/category-menu/blob/master/react/components/ItemContainer.js)          | First level of the Category Menu, the main categories links                      |
| `secondLevelLink `          | [ItemContainer](https://github.com/vtex-apps/category-menu/blob/master/react/components/ItemContainer.js)          | Second level of the Category Menu, the subcategories links                        |
| `itemContainer`    | [CategoryItem](https://github.com/vtex-apps/category-menu/blob/master/react/components/CategoryItem.js)            | Main container of a category item/department                                    |
| `sidebarItem`     | [SideBarItem](https://github.com/vtex-apps/category-menu/blob/master/react/components/SideBarItem.js)   | The container of a sidebar category item/department     |

To override the default CSS, you need to import `styles` on your manifest:

```json
  "builders": {
    "styles": "1.x"
  }
```

Also, create a `vtex.categoryMenu.css` file in `styles/css` for your handlers customization.


## Troubleshooting
You can check if others are passing through similar issues [here](https://github.com/vtex-apps/category-menu/issues). Also feel free to [open issues](https://github.com/vtex-apps/category-menu/issues/new) or contribute with pull requests.

## Tests

To execute our tests go to react/ folder and run yarn test