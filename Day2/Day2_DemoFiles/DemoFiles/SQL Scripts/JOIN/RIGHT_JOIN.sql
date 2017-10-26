/* RIGHT JOIN */
USE AdventureWorks;
GO
SELECT st.Name AS Territory, sp.SalesPersonID
FROM Sales.SalesTerritory st 
RIGHT OUTER JOIN Sales.SalesPerson sp
ON st.TerritoryID = sp.TerritoryID ;


USE CMC_Training
GO
SELECT t1.ID t1ID, t1.Value t1Value,t2.ID t2ID, t2.Value t2Value
FROM dbo.Table1 t1
RIGHT JOIN dbo.Table2 t2 ON t1.ID = t2.ID
GO