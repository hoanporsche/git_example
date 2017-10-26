USE AdventureWorks;
GO

CREATE FUNCTION dbo.fnc_InlineTable()
RETURNS TABLE
AS
	RETURN SELECT * from Production.Product
	WHERe Name like 'Flat%'
GO	
SELECT * FROM dbo.fnc_InlineTable() 

DROP FUNCTION dbo.fnc_InlineTable