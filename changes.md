# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) 
and this project adheres to [Semantic Versioning](http://semver.org/).

## [0.3.0 2017-02-23]
### Added
- basic gene page 
- basic gene information loaded from standard JSON schema, loaded into ES and displayed on gene page dynamically
- DIOPT data loaded into AGR Postgres DB and also available in JSON format
- DIOPT ElasticSearch loader written but not currently loading data as a result of memory issues
- hardcoded example data disease, jbrowse, and orthology tables on the gene page
- search mapping updated to use basic gene information JSON schema and data
- autocomplete of search functions with symbols and names
- implemented class architecture for load scripts
- loading BGI data comes from an AWS S3 bucket
- upgraded to ElasticSearch 5

### Deprecated
- removed panther data and loads and ui components
- removed omim data and loads and but not ui components
