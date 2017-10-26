
USE CMC_Training
GO
select * from Table1
select * from Table2
SELECT t1.ID t1ID, t1.Value t1Value,t2.ID t2ID, t2.Value t2Value
FROM dbo.Table1 t1
LEFT JOIN dbo.Table2 t2 ON t1.ID = t2.ID
WHERE t2.ID IS NULL
GO

SELECT t1.ID t1ID, t1.Value t1Value,t2.ID t2ID, t2.Value t2Value
FROM	dbo.Table1 t1
JOIN dbo.Table2 t2 
ON		t1.ID = t2.ID