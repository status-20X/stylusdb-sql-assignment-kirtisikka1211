function parseWhereClause(whereString) {
    // Check if the whereString is empty or undefined
    if (!whereString) {
        return [];
    }

    // Split the whereString into conditions
    const conditions = whereString.split(/ AND | OR /i);

    // Check if the conditions are in the correct format
    const validConditions = conditions.every(condition => {
        const parts = condition.split(/\s+/);
        return parts.length === 3; // Expecting field, operator, value
    });

    if (!validConditions) {
        throw new Error('Invalid WHERE clause format');
    }

    // Parse each condition
    return conditions.map(condition => {
        const [field, operator, value] = condition.split(/\s+/);
        return { field, operator, value };
    });
}

module.exports = parseQuery;
