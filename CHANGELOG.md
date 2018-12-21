# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Fixed
- Fix `SideBar` not showing the hole content.

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
