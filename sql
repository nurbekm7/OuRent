

ALTER TABLE product
 ALTER COLUMN img drop DEFAULT,
 ALTER COLUMN img type text[] using array[img],
 ALTER COLUMN img set default '{}';


 ALTER TABLE product ALTER COLUMN pr_cost TYPE numeric(20,2);