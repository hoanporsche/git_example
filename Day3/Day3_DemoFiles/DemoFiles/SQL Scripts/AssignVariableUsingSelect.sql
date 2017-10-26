USE AdventureWorks
GO

DECLARE @FirstName VARCHAR(100)
SELECT @FirstName = FirstName FROM Person.Contact WHERE ContactID = 1

SELECT @FirstName FirstName



