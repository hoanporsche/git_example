USE AdventureWorks;

select max(Production.Product.ListPrice) from Production.Product
GO
WHILE (SELECT AVG(ListPrice) FROM Production.Product) < $1000
BEGIN
   UPDATE Production.Product
      SET ListPrice = ListPrice + $200
   SELECT MAX(ListPrice) FROM Production.Product
   IF (SELECT MAX(ListPrice) FROM Production.Product) > $4000
      BEGIN
	  PRINT 'Break'
      BREAK
	  END
   ELSE   
	  PRINT 'Too much for the market to bear'
END

select avg(Production.Product.ListPrice) from Production.Product