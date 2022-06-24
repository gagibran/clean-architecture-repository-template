[![Clean Architecture Build Job](https://github.com/gagibran/clean-architecture-repository-template/workflows/Clean%20Architecture%20Build%20Job/badge.svg)](https://github.com/gagibran/clean-architecture-repository-template/actions)
[![Publish Template to NuGet Job](https://github.com/gagibran/clean-architecture-repository-template/workflows/Publish%20Template%20to%20Nuget%20Job/badge.svg)](https://github.com/gagibran/clean-architecture-repository-template/actions)

# Clean Architecture Repository and Unit of Work Template

.NET template for creating projects using clean architecture with the repository pattern and optionally unit of work.

It uses PostgreSQL 14, React 18 (with TypeScript) and .NET 6 and it comes with a docker-compose file configured for development.

This app was developed using docker-compose version 1.29.2.

## Table of contents

- [Motivation](#motivation)
- [Installation](#installation)
- [Running and options](#running-and-options)
- [To do](#to-do)

## Motivation

I created this template so that I don't have to write a lot of boilerplate code when I want to create a new project and I wanted to share my approach to this architecture.

This is heavily inspired in Steve 'Ardalis' Smith's [clean architecture template](https://github.com/ardalis/CleanArchitecture). Checkout his [YouTube channel](https://www.youtube.com/c/Ardalis) for more information on this architecture.

## Installation

This package is hosted on NuGet and can be installed by simply running the command:

`dotnet new --install Gagibran.CleanArchRepo.Template`

Alternatively, download this repository and, in its root directory, run:

`dotnet new --install .`

## Running and options

Once installed, to use the template, simply run the command:

`dotnet new cleanarchrepo -o <output-directory-name> -s <solution-name>`

A project clean architecture project will be created with Swagger support and the unit of work pattern by default.

Note that the parameter `-s`, or `--solutionName` **is a required parameter**.

Alternatively, run the command without the `-o` parameter in order to create the template outside of a containing output directory.

In order to disabled these options, the following flags are available: `-e` or `--enableSwagger` and `-c` or `--configureUnitOfWork`. Example:

`dotnet new cleanarchrepo -o <project-name> -e false -c false`

Use `dotnet new cleanarchrepo --help` to see the list of parameters and more information.

## To do

Currently, the project does not contain a unit tests project. This will be added soon.

I will also add Angular support and an option to configure different databases.

Finally, I will be adding a production configuration with Dockerfiles and a production Docker Compose file.