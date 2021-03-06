import mockFilters from "../mocks/filters.json";
import { API } from "aws-amplify";

export async function getAllFiltersMock() {
    const { companies, departments, locations, titles, skills } = mockFilters;

    const parsedSkills = skills.reduce((acc, { skillLabel, categoryLabel }) => {
        // const skillId = `${categoryLabel}:::${skillLabel}`;
        const skillId = skillLabel;
        acc[categoryLabel] = !acc[categoryLabel]
            ? [skillId]
            : acc[categoryLabel].concat(skillId);
        return acc;
    }, {});
    // We are currently using text names (e.g. Vancouver) as ids
    // so we don't need to set the general byId redux field
    // If in the future, if we decide to store filters by non-text names (i.e. some numeric id or UUID)
    // we then need to populate the general byId field so that lookup skills from it with some skill id
    return {
        companyAllId: companies,
        departmentAllId: departments,
        locationAllId: locations,
        titleAllId: titles,
        skillAllId: parsedSkills,
    };
}

export async function getAllFilters() {
    const myInit = {};
    return API.get("ae-api", "getAllFilters", myInit).then((response) => {
        const { companies, departments, locations, titles, skills } = response;
        const parsedSkills = skills.reduce(
            (acc, { skillLabel, categoryLabel }) => {
                acc[categoryLabel] = !acc[categoryLabel]
                    ? [skillLabel]
                    : acc[categoryLabel].concat(skillLabel);
                return acc;
            },
            {}
        );
        return {
            companyAllId: companies,
            departmentAllId: departments,
            locationAllId: locations,
            titleAllId: titles,
            skillAllId: parsedSkills,
        };
    });
}

export async function getFilterAPI() {
    const myInit = {
        queryStringParameters: { LocationPhysical: "Vancouver" },
    };
    return API.get("ae-api", "search", myInit);
}
