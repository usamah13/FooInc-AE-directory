SELECT sc."SkillCategoryId", s."SkillId" FROM "SkillCategory" sc, "Skill" s WHERE sc."SkillCategoryId" = s."SkillCategoryId" AND sc."Label" = :p0 AND s."Label" = :p1