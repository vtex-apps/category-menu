# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.18.0] - 2022-12-23

### Fixed
- Arabic translation.

### Added
- Thai and Indonesian translations.

## [2.17.1] - 2022-03-17

### Fixed
- Arabic translation.

## [2.17.0] - 2022-03-08

### Added
- Arabic translation.

## [2.16.0] - 2021-05-31
### Added
- `sortSubcategories` as option for `category-menu`

## [2.15.0] - 2020-10-20

### Fixed
- See all link work inside `category` and `subcategory`in mobile

## [2.14.1] - 2020-09-02
### Fixed
- Add missing documentation for prop `mobileMode`.

## [2.14.0] - 2020-04-08
### Added
- CSS Handles to the app.

### Fixed
- Update docs.

### Remove
- Not implemented props `showPromotionCategory` and `showGiftCategory`.

## [2.13.2] - 2019-08-29
### Changed
- Updated to use `vtex.store-icons` instead of the deprecated `vtex.dreamstore-icons`.
- Updated components to hooks.

## [2.13.1] - 2019-08-29

## [2.13.0] - 2019-05-17

### Added

- `eslint` configuration.

## [2.12.0] - 2019-04-24
### Changed
- Scope messages by domain

## [2.11.6] - 2019-03-21

### Fixed

- Remove uppercase from links

## [2.11.5] - 2019-03-14
### Changed
- Change language files to most generic.

## [2.11.4] - 2019-02-27

### Changed

- Component `Container` inside nav container in order to make menu full-width

## [2.11.3] - 2019-02-21

### Changed

- Sidemenu sections text token from `t-heading-4` to `t-body`

## [2.11.2] - 2019-02-19

### Fixed

- Removed `overflow-hidden` from container in order to display submenus.

## [2.11.1] - 2019-02-18

## [2.11.0] - 2019-02-15

### Fixed

- Main overflow to allow any container to fit and resize `category-menu`.

### Added

- Prettier for better coding style.

## [2.10.5] - 2019-02-14

### Added

- Add API docs.

### Fixed

- Fix alignment of subcategories items.

### Fixed

- Add missing css-handles in components in order to allow customization with CSS Modules.

## [2.10.4] - 2019-02-14

## [2.10.3] - 2019-02-14

## [2.10.2] - 2019-02-12

### Fixed

- Fix position on mobile.

## [2.10.1] - 2019-02-11

### Fixed

- Get path correctly using ramda.

## [2.10.0] - 2019-02-07

### Added

- Customization of the menu disposition (left, center, right).

## [2.9.0] - 2019-02-05

### Added

- Highlight the selected category in desktop view.

## [2.8.3] - 2019-02-04

### Changed

- Rename 'showDepartmentsCategory' to 'showAllDepartments'.

## [2.8.2] - 2019-02-04

### Fixed

- Fix the return result of 'get departments()' function allowing the customization of categories by props.

## [2.8.1] - 2019-02-01

### Fixed

- Use `ul` and `li` and improve code quality.

## [2.8.0] - 2019-01-30

### Changed

- Use icons from `vtex.dreamstore-icons`.

## [2.7.1] - 2019-01-29

### Fixed

- Remove `inheritComponent` from blocks.

## [2.7.0] - 2019-01-24

## [2.6.2] - 2019-01-18

### Changed

- Adjust the way to import render-runtime components.

## [2.6.1] - 2019-01-18

## [2.6.0] - 2019-01-18

### Changed

- Bump vtex.styleguide to 9.x.

## [2.5.0] - 2019-01-18

### Changed

- Update React builder to 3.x.

## [2.4.4] - 2019-01-17

### Fixed

- Fixed incorrect align rendering category items with tree level above 2.

## [2.4.3] - 2019-01-15

### Fixed

- Using html5 tags to a more semantic structure.

## [2.4.2] - 2019-01-14

### Changed

- Remove `undefined` classes.

## [2.4.1] - 2019-01-09

## [2.4.0] - 2019-01-09

### Changed

- Bye `pages.json`! Welcome `store-builder`.

## [2.3.4] - 2019-01-08

### Fixed

- Show default props correctly on pages-editor.

## [2.3.3] - 2018-12-21

### Fixed

- Fix `SideBar` not showing the whole content when scrolling.

## [2.3.2] - 2018-12-21

### Fixed

- Fix `Sidebar` shadow not filling the whole width of the screen and fix left padding.

## [2.3.1] - 2018-12-21

### Fixed

- Scroll is not appearing in the mobile mode when the `CategoryMenu` overflow its container.

## [2.3.0] - 2018-12-19

### Added

- Support to messages builder.

## [2.2.2] - 2018-12-19

### Fixed

- Fix `Sidebar` alignment.

## [2.2.1] - 2018-12-18

### Fixed

- Fix subcategories that were not being displayed.

## [2.2.0] - 2018-12-18

### Added

- Support to CSS Modules.

## [2.1.0] - 2018-11-30

### Changed

- Add new icons and improve layout

## [2.0.0] - 2018-11-20

### Changed

- Replace typography and color classes with design tokens.

## [1.6.0] - 2018-11-20

### Added

- Add option to get all products from a specific category

## [1.5.0] - 2018-11-07

### Added

- Add prop `showSubcategories` with default `true` to allow users to hide subcategories.

## [1.4.0] - 2018-11-06

### Added

- Add prop `showDepartmentsCategory` with default `true` to allow users to hide the departments category.

## [1.3.3] - 2018-10-30

### Fixed

- Fix menu borders

## [1.3.2] - 2018-10-03

### Fixed

- Fix category itens size and alignment

## [1.3.1] - 2018-09-26

### Fixed

- Close category menu on click item.

## [1.3.0] - 2018-09-26

### Added

- `departments` property to schema.

## [1.2.2] - 2018-09-20

### Changed

- Sidebar header now matches the minicart one.

## [1.2.1] - 2018-09-19

### Changed

- Remove widths to match page default padding.

### Fixed

- Scroll being prevented on mobile.

## [1.2.0] - 2018-09-17

### Added

- Add animation to mobile sidebar.

## [1.1.1] - 2018-09-05

### Changed

- Update css to use tachyons classes.

### Fixed

- Fix wrap of department divider.

## [1.1.0] - 2018-08-31

### Changed

- Update the `Styleguide` version.

## [1.0.1] - 2018-08-31

### Fixed

- Fix design issues.

## [1.0.0] - 2018-08-24

### Added

- `SideBar` menu when mobile mode.

### Changed

- Update design to light style.

## [0.3.0] - 2018-08-17

### Changed

- `CategoryMenu` design.

### Removed

- `CategorySubMenu`, `CategorySubMenuItems` and `LoadingBar` components.

## [0.2.3] - 2018-08-07

### Fixed

- Return the 3 level of categories and just map when defined

## [0.2.2] - 2018-07-25

### Removed

- Remove `NoSSR` component.

## [0.2.1] - 2018-7-6

### Fixed

- Link redirect of menus and subMenus.

## [0.2.0] - 2018-6-11

### Added

- Schema translation.

## [0.1.1] - 2018-05-12

### Fixed

- Using Link instead of anchor tag to link to the search page.

## [0.1.0] - 2018-05-12

### Added

- Add SSR fallback.
- Add LoadingBar component

### Changed

- Component style to match desgin specification.
- Migrate submenu to separate component.
