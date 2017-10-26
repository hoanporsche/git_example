CREATE TABLE dbo.Employee
(
	Emp_ID		INT IDENTITY(1,1)
,	Emp_name	VARCHAR(100)
,	Emp_Sal		DECIMAL (10,2)
)

CREATE TABLE dbo.Employee_Audit
(
	Emp_ID			INT
,	Emp_name		VARCHAR(100)
,	Emp_Sal			DECIMAL (10,2)
,	Audit_Action	VARCHAR(100)
,	Audit_Timestamp DATETIME
)

INSERT INTO dbo.Employee VALUES ('Anees',1000);
INSERT INTO dbo.Employee VALUES ('Rick',1200);
INSERT INTO dbo.Employee VALUES ('John',1100);
INSERT INTO dbo.Employee VALUES ('Stephen',1300);
INSERT INTO dbo.Employee VALUES ('Maria',1400);