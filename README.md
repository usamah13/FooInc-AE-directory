# Foo Inc. Associated Engineering Project
**:warning: Please refer to the Config & Release document for detailed instructions on how to set up this project.**

**:warning: Before running the deploy script, you must have all tools and configurations installed and configured correctly!**

When running the deploy script (`./ deploy`) use `-p %your-account-name-here%` to indicate the AWS profile you are using if it isn't the default one. Use `-e prod`, `-e test` or `-e dev` to indicate which environment you want to deploy to. You can change environements at any time but that will require you to run dropAllTables and then initDatabase.

## How to initialize the Database
After deploying everything else:
* go to the AWS console in your browser
* go to the lambda service
* select the databaseInit lambda
* Click the "test" button in the upper right
* this should the ask you to create a test. All you have to do it is give it a name and click save
* with your test selected from the drop down (it should be selected automatically) press test and wait
* hopefully after a while (these lambdas have a long cold start time and is something we are looking into) the lambdas returns successfully
* The database should now have all the table and data in it

## Testing that the data got initialized in the database
* go to the AWS console in your browser
* go to the lambda service
* select the getEmployees lambda
* Click the "test" button in the upper right
* this should the ask you to create a test. All you have to do it is give it a name and click save
* with your test selected from the drop down (it should be selected automatically) press test and wait
* hopefully after a while (these lambdas have a long cold start time and is something we are looking into) the lambdas returns successfully
* There should be a bunch of number returned (It isn't displayed nicely but aslong as you see an output of a bunch of numbers then it's good)


for lambdas (in Handler/src/Handler):
* dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
* dotnet add package Microsoft.AspNet.Identity --version 3.0.0-rc1-final
* dotnet add package Microsoft.AspNet.Identity.EntityFramework
* dotnet add package Microsoft.EntityFrameworkCore.Tools --version 5.0.2
* dotnet add package System.Data.SqlClient
* dotnet add package Npgsql --version 5.0.3
* dotnet add package AWSSDK.S3 --version 3.5.8.5


## Database:
The database is in an Isolated VPC so it can't be connected to from local machines. 

How to connect locally:
* Change the all VPC subnetTypes to to PUBLIC
* Add `PubliclyAccessible = true` to the DatabaseInstanceProps constructor.
* Add an inbound rule that allows everything `securityGroup.AddIngressRule(ec2.Peer.Ipv4("0.0.0.0/0"), ec2.Port.Tcp(5432));` should work but if not you can do it from the AWS console.

