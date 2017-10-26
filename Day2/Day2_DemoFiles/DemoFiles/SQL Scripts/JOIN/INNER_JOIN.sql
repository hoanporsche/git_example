USE AdventureWorks;
GO
SELECT 
	e.EmployeeID
,	c.FirstName
,	c.LastName
,	e.NationalIDNumber
,	e.Title
,	e.BirthDate
,	e.MaritalStatus
FROM	HumanResources.Employee AS e
JOIN	Person.Contact AS c
ON	e.ContactID = c.ContactID


USE CMC_Training
GO

SELECT t1.ID t1ID, t1.Value t1Value,t2.ID t2ID, t2.Value t2Value
FROM	dbo.Table1 t1
JOIN dbo.Table2 t2 
ON		t1.ID = t2.ID
GO