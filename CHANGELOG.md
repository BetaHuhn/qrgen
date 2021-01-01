## [v2.1.0] - 2021-01-01

[Release notes](https://github.com/BetaHuhn/qrgen/releases/tag/v2.1.0) · [Compare](https://github.com/BetaHuhn/qrgen/compare/v2.0.0...v2.1.0) · [Tag](https://github.com/BetaHuhn/qrgen/tree/v2.1.0) · Archive ([zip](https://github.com/BetaHuhn/qrgen/archive/v2.1.0.zip) · [tar.gz](https://github.com/BetaHuhn/qrgen/archive/v2.1.0.tar.gz))

### New features

- [`c723174`](https://github.com/BetaHuhn/qrgen/commit/c723174)  Release new version

### Updates

- [`7b6eab6`](https://github.com/BetaHuhn/qrgen/commit/7b6eab6)  Use semantic-release

### Dependency updates

- [`0c3a733`](https://github.com/BetaHuhn/qrgen/commit/0c3a733)  Bump eslint from 7.15.0 to 7.16.0 (#48)
(Issues: [`#48`](https://github.com/BetaHuhn/qrgen/issues/48))- [`8a41796`](https://github.com/BetaHuhn/qrgen/commit/8a41796)  Bump @typescript-eslint/eslint-plugin from 4.10.0 to 4.11.1
- [`0a626ab`](https://github.com/BetaHuhn/qrgen/commit/0a626ab)  Bump metadata-scraper from 0.1.1 to 0.2.2 (#43)
(Issues: [`#43`](https://github.com/BetaHuhn/qrgen/issues/43))- [`90bb808`](https://github.com/BetaHuhn/qrgen/commit/90bb808)  Bump eslint-plugin-vue from 7.2.0 to 7.4.0 in /client (#45)
(Issues: [`#45`](https://github.com/BetaHuhn/qrgen/issues/45))- [`bf675b2`](https://github.com/BetaHuhn/qrgen/commit/bf675b2)  Bump @typescript-eslint/parser from 4.10.0 to 4.11.1 (#47)
(Issues: [`#47`](https://github.com/BetaHuhn/qrgen/issues/47))- [`ca7b10e`](https://github.com/BetaHuhn/qrgen/commit/ca7b10e)  Bump mongoose from 5.11.8 to 5.11.9 (#44)
(Issues: [`#44`](https://github.com/BetaHuhn/qrgen/issues/44))

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
