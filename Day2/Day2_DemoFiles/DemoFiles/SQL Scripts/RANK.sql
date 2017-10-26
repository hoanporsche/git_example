USE AdventureWorks;
GO
SELECT i.ProductID, p.Name, i.LocationID, i.Quantity
    ,DENSE_RANK() OVER 
    (PARTITION BY i.LocationID ORDER BY i.Quantity DESC) AS 'RANK'
FROM Production.ProductInventory i 
    INNER JOIN Production.Product p 
        ON i.ProductID = p.ProductID
ORDER BY LocationID,Quantity desc;
GO