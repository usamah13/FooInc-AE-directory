insert into "Employee" ("EmployeeNumber","CompanyCode","OfficeCode","GroupCode","FirstName", "LastName", "EmploymentType", "Title", "HireDate", "TerminationDate", "SupervisorEmployeeNumber", "YearsPriorExperience", "Email","WorkPhone", "WorkCell", "PhysicalLocationId", "PhotoUrl", "isContractor")
SELECT CONCAT('c',CAST(nextval('"public".contractorseq') as VARCHAR(10))),:p0, :p1, :p2, :p3, :p4, :p5, :p6, CAST(:p7 as DATE), CAST(:p8 as DATE), :p9, CAST(:p10 as NUMERIC), :p11, :p12, :p13, :p14, :p15, true
WHERE NOT EXISTS(
    SELECT * FROM "Employee" WHERE "Email" LIKE :p11
)
RETURNING "EmployeeNumber"