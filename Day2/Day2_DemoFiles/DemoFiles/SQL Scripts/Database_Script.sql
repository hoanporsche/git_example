USE CMC_Training
GO

CREATE TABLE dbo.Table1
(ID INT, Value VARCHAR(10))
INSERT INTO dbo.Table1 (ID, Value)
SELECT 1,'First'
UNION ALL
SELECT 2,'Second'
UNION ALL
SELECT 3,'Third'
UNION ALL
SELECT 4,'Fourth'
UNION ALL
SELECT 5,'Fifth'
GO
CREATE TABLE dbo.Table2
(ID INT, Value VARCHAR(10))
INSERT INTO dbo.Table2 (ID, Value)
SELECT 1,'First'
UNION ALL
SELECT 2,'Second'
UNION ALL
SELECT 3,'Third'
UNION ALL
SELECT 6,'Sixth'
UNION ALL
SELECT 7,'Seventh'
UNION ALL
SELECT 8,'Eighth'
GO
