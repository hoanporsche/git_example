DECLARE @MaritalStatus NCHAR(2)

SELECT @MaritalStatus = MaritalStatus
FROM HumanResources.Employee WHERE EmployeeID = 1

IF (RTRIM(@MaritalStatus) = 'M')
	PRINT 'This is a man.'
ELSE
	PRINT 'This is a woman.'





