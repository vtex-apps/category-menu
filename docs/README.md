📢 Use this project, [contribute](https://github.com/vtex-apps/category-menu) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Category Menu

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

The Category Menu app is a store component that shows the store’s department list on a custom menu.

![category-menu](https://cdn.jsdelivr.net/gh/vtexdocs/dev-portal-content@main/docs/vtex-menu-0.png)

## Configuration

1. Add the app to your store theme's dependencies in the `manifest.json`.

```json
  dependencies: {
    "vtex.category-menu": "2.x"
  }
```

2. Add the `category-menu` block to your store theme.

```json
{
  "category-menu": {
    "props": {
      "showAllDepartments": true,
      "showSubcategories": true,
      "menuDisposition": "center",
      "departments": [],
      "sortSubcategories": "name"
    }
  }
}
```

### `category-menu` props

| Prop name            | Type           | Description                                                                                     | Default Value |
| -------------------- | -------------- | ----------------------------------------------------------------------------------------------- | ------------- |
| `showAllDepartments` | `Boolean`      | Shows all department categories in the menu                                                          | `true`        |
| `menuDisposition`    | `Enum`         | Indicates the menu's position on the screen. Possible values: `left`, `center`, `right` | `center`      |
| `showSubcategories`  | `Boolean`      | Defines if the subcategories will be displayed                                                  | `true`        |
| `departments`        | `Array(items)` | List of department `items` to be displayed on the menu                                         | `[]`          |
| `mobileMode`         | `Boolean`      | Renders the category menu in a sidebar if set to `true`                                     | `false`       |
| `sortSubcategories`  | `Enum`         | Determines how subcategories are sorted. Possible value: `name`                                  |               |

### `category-menu` items

| Prop name | Type     | Description                                   |
| --------- | -------- | --------------------------------------------- |
| `id`      | `Number` | The department ID to be displayed on the menu |

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles                 |
| --------------------------- |
| `container`                 |
| `departmentLink`            |
| `departmentList`            |
| `firstLevelLink`            |
| `firstLevelLinkContainer`   |
| `firstLevelList`            |
| `itemContainer`             |
| `itemContainer--category`   |
| `itemContainer--department` |
| `menuContainer`             |
| `secondLevelLink`           |
| `secondLevelLinkContainer`  |
| `secondLevelList`           |
| `section--category`         |
| `section--department`       |
| `sidebar`                   |
| `sidebarContainer`          |
| `sidebarContent`            |
| `sidebarHeader`             |
| `sidebarItem`               |
| `sidebarItemContainer`      |
| `sidebarOpen`               |
| `sidebarScrim`              |
| `submenuItem`               |
| `submenuList`               |

<!-- DOCS-IGNORE:start -->
## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/khrizzcristian"><img src="https://avatars.githubusercontent.com/u/43498488?v=4?s=100" width="100px;" alt=""/><br /><sub><b>khrizzcristian</b></sub></a><br /><a href="https://github.com/vtex-apps/category-menu/commits?author=khrizzcristian" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!
<!-- DOCS-IGNORE:end -->
