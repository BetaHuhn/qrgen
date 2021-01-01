## [v2.1.0] - 2020-12-23

### Added
- Dockerfile

## [v2.0.2] - 2020-12-15

### Fixed
- handle case where metadata is missing for old link

### Changed
- update dependencies

## [v2.0.1] - 2020-12-08

### Changed
- update dependencies
- add issue templates

## [v2.0.0] - 2020-11-14

This version adds support for dynamic metatags.

### Added
- scrape metadata of URL (title, description, image)
- more CI workflows

### Changed
- render redirect page with ejs instead of Vue (for dynamic metatags)
- use GitHub Actions instead of Travis CI
- refactoring of backend
