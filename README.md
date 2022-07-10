[![Build, Test And Deploy](https://github.com/gagibran/clean-architecture-repository-template/workflows/Build%20Test%20And%20Deploy/badge.svg)](https://github.com/gagibran/clean-architecture-repository-template/actions)
[![NuGet Version](https://img.shields.io/nuget/v/Gagibran.CleanArchRepo.Template.svg)](https://www.nuget.org/packages/Gagibran.CleanArchRepo.Template)
[![NuGet Downloads](https://img.shields.io/nuget/dt/Gagibran.CleanArchRepo.Template.svg)](https://www.nuget.org/packages/Gagibran.CleanArchRepo.Template)

# Clean Architecture Repository and Unit of Work Template

.NET template for creating projects using clean architecture with the repository pattern and optionally unit of work.

It uses PostgreSQL 14, React 18 (with TypeScript) and .NET 6 and it comes with a docker-compose file configured for development.

This app was developed using Docker version 20.10.16 and Docker Compose version 1.29.2.

It also uses xUnit and Moq as testing frameworks on the back end.

Give it a star if you like it! Feel free to contribute.

## Table of contents

- [Motivation](#motivation)
- [Installation](#installation)
- [Running And Options](#running-and-options)
- [Running The Created Project](#running-the-created-project)
    - [Development](#development)
- [Adding Migrations](#adding-migrations)
- [To Do](#to-do)

## Motivation

I created this template so that I don't have to write a lot of boilerplate code when I want to create a new project and I wanted to share my approach to this architecture.

This is heavily inspired in Steve 'Ardalis' Smith's [clean architecture template](https://github.com/ardalis/CleanArchitecture). Check out his [YouTube channel](https://www.youtube.com/c/Ardalis) for more information on this architecture. **I did not use the [specification pattern](https://www.youtube.com/watch?v=BgWWbBUWyig&t=146s) here**.

## Installation

This package is hosted on [NuGet](https://www.nuget.org/packages/Gagibran.CleanArchRepo.Template) and can be installed by simply running the command:

`dotnet new --install Gagibran.CleanArchRepo.Template`

Alternatively, download this repository and, in its root directory, run:

`dotnet new --install .`

## Running And Options

Once installed, to use the template, simply run the command:

`dotnet new cleanarchrepo -o <output-directory-name> -s <solution-name>`

A clean architecture project will be created without Swagger support and without the unit of work pattern by default.

Note that the parameter `-s`, or `--solutionName` **is a required parameter**.

Alternatively, run the command without the `-o` parameter in order to create the template outside of a containing output directory.

In order to change the default options, the following flags are available: `-e` or `--enableSwagger` and `-c` or `--configureUnitOfWork`. Example:

`dotnet new cleanarchrepo -o <output-directory-name> -s <solution-name> -e true -c true`

Use `dotnet new cleanarchrepo --help` to see the list of parameters and more information.

## Running The Created Project

The project is configured to run inside Docker containers.

### Development

Once your project has been generated with the template, go the the project's root directory and execute the command:

`docker-compose -f docker-compose-development.yml up`

To start the application. The front end URL will be: http://localhost:3000. If you enabled Swagger during the template creation, you can access it going to the following URL: http://localhost:5000/swagger.

It comes with a default `User` entity so that you can test the CRUD operations right out of the box by either using Swagger or an API platform, such as [Postman](https://www.postman.com/).

You can also do CRUD operations using the UI (React). There is only one user component added to represent how the front end communicates with the back end. There are no custom CSS styles.

To terminate the application and delete the created images, containers, networks and volumes, hit `Ctrl+C` on your running terminal to stop the application, go the the project's root directory and run:

`docker-compose -f docker-compose-development.yml down -v`

## Adding Migrations

To add a migration, go to the project's root directory and run:

`dotnet ef migrations add <migration-name> -p .\src\Infrastructure\ -s .\src\API\ -o .\Data\Migrations\`

No need to install the [dotnet-ef tool](https://docs.microsoft.com/en-us/ef/core/cli/dotnet#installing-the-tools), because it is already in the `.\.config\dotnet-tools.json` manifest file.

## To Do

- I will also add Angular support and an option to configure different databases.
- I will try to get the project to work with HTTPS on Docker.
- Finally, I will be adding a production configuration with Dockerfiles and a production Docker Compose file.