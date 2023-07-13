# Todo Vuedoo

## Requirements

[.Net Core 7.0.0 SDK](https://dotnet.microsoft.com/en-us/download). Check your version installed by running `dotnet --version`

Local instance of MS Sql Server.

NPM package manager, which is installed along with [Node.js](https://nodejs.org/en/download/?utm_source=blog). To check if NPM is already installed, run `npm -v`, it should be version ^6.0.0, if not, run `npm install -g npm@latest`

Recommended IDE for this project is [VS Code](https://code.visualstudio.com/download).

**Note:** The API and frontend run independently of each other. Two command prompts, one for each, are required to run the app. I open the api folder and web folder in different instances of VS Code and use the built in terminals.

---

## Setup Database

Create a new table called Todo and execute this script in SSMS which will create the Todo table:

```
USE [Todo]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Todo](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [varchar](100) NULL,
	[Completed] [bit] NULL,
	[CompletedDate] [datetime] NULL,
 CONSTRAINT [PK_Todo] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
```

Install EF framework:
```
dotnet tool install --global dotnet-ef
```

Put your connection string in the `"db_conn_string"` in `api\appsettings.Development.json`

Then scaffold the database:


```
dotnet ef dbcontext scaffold --use-database-names Name="db_conn_string" Microsoft.EntityFrameworkCore.SqlServer -o Models
```

In `api\Program.cs` replace line 7 with `builder.Services.AddDbContext<TodoContext>();`

Then scaffold the controller:

```
dotnet-aspnet-codegenerator controller -name TodoController -async -api -m Todo -dc TodoContext -outDir Controllers
```

---

## Setup and run API

In the api folder:

```
dotnet restore
dotnet build
dotnet run
```

---

## Setup and run Web

In the web folder:

```
npm install
npm run dev
```

Open the link shown in the console output
