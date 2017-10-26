USE AdventureWorks
SELECT EmployeeID, HireDate, VacationHours, Gender,
NTILE(3) OVER (ORDER BY HireDate) AS HireGroup
FROM Humanresources.Employee