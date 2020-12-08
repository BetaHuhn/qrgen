# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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