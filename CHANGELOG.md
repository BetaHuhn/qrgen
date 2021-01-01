## [v2.0.1] - 2021-01-01

[Release notes](https://github.com/BetaHuhn/qrgen/releases/tag/v2.0.1) · [Compare](https://github.com/BetaHuhn/qrgen/compare/v2.0.0...v2.0.1) · [Tag](https://github.com/BetaHuhn/qrgen/tree/v2.0.1) · Archive ([zip](https://github.com/BetaHuhn/qrgen/archive/v2.0.1.zip) · [tar.gz](https://github.com/BetaHuhn/qrgen/archive/v2.0.1.tar.gz))

### Updates

- [`7b6eab6`](https://github.com/BetaHuhn/qrgen/commit/7b6eab6)  Use semantic-release

### Dependency updates

- [`0c3a733`](https://github.com/BetaHuhn/qrgen/commit/0c3a733)  Bump eslint from 7.15.0 to 7.16.0 (#48)
(Issues: [`#48`](https://github.com/BetaHuhn/qrgen/issues/48))- [`8a41796`](https://github.com/BetaHuhn/qrgen/commit/8a41796)  Bump @typescript-eslint/eslint-plugin from 4.10.0 to 4.11.1

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
