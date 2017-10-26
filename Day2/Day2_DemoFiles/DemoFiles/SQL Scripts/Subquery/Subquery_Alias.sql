USE AdventureWorks;
GO
SELECT e1.EmployeeID,e1.LoginID, e1.ManagerID
FROM HumanResources.Employee AS e1
WHERE e1.ManagerID IN
    (SELECT e2.ManagerID
     FROM HumanResources.Employee AS e2
     WHERE e2.EmployeeID = 12)