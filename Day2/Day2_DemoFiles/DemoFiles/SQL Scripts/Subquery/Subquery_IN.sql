USE AdventureWorks;
GO

SELECT Name, ProductID, ProductSubcategoryID 
FROM Production.Product
WHERE ProductSubcategoryID IN
    (SELECT ProductSubcategoryID
     FROM Production.ProductSubcategory
     WHERE Name = 'Wheels')

USE AdventureWorks;
SELECT ProductSubcategoryID, Name
     FROM Production.ProductSubcategory
     WHERE Name = 'Wheels'

 select ProductID, ProductSubcategoryID, Name from Production.Product
 where ProductSubcategoryID='17'