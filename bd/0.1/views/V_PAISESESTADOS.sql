CREATE VIEW V_PAISESESTADOS AS
select * from catpaises Pais 
INNER JOIN catestados est on est.isoEst = pais.iso