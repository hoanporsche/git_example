USE AdventureWorks;
GO 
--UPDATE Production.Product
--SET ListPrice = ListPrice --* 2
select ProductID, ListPrice from Production.Product
WHERE ProductID IN
    (SELECT ProductID 
     FROM Purchasing.ProductVendor
     WHERE VendorID = 51);
GO

UPDATE Production.Product
SET ListPrice = ListPrice + 2
WHERE ProductID IN
    (SELECT ProductID 
     FROM Purchasing.ProductVendor
     WHERE VendorID = 51);