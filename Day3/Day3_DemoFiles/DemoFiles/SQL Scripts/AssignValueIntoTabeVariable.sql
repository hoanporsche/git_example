USE AdventureWorks
GO

DECLARE @temp TABLE
(
	ContactID		INT
,	FirstName		VARCHAR(100)
,	LastName		VARCHAR(100)
,	EmailAddress	VARCHAR(100)
) 

INSERT @temp 
(
	ContactID
,	FirstName
,	LastName
,	EmailAddress
)
SELECT 
	ContactID
,	FirstName
,	LastName
,	EmailAddress 
FROM	Person.Contact 

SELECT * FROM @temp
