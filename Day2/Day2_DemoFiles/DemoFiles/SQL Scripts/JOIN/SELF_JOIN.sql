USE AdventureWorks;

select * from HumanResources.Employee

SELECT MgrTable.LoginID AS ManagerName,EmplTable.ManagerID, 
    EmplTable.LoginID, EmplTable.EmployeeID
FROM HumanResources.Employee AS EmplTable
    JOIN HumanResources.Employee AS MgrTable
        ON EmplTable.ManagerID = MgrTable.EmployeeID
ORDER BY MgrTable.LoginID, EmplTable.LoginID


USE AdventureWorks;
GO
SELECT e1.LoginID EmployeeName, ISNULL(e2.LoginID, 'Top Manager') AS ManagerName
FROM HumanResources.Employee e1
LEFT JOIN HumanResources.Employee e2
ON e1.ManagerID = e2.EmployeeID
GO