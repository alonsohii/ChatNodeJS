CREATE FUNCTION Test ( starting_value INT )
RETURNS INT

BEGIN

   DECLARE income INT;

   SET income = 0;

   SELECT COUNT(1) INTO income FROM projectb.bp_personas;

   RETURN income;

END; //
