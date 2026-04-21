import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pkg = require('../package.json');

// Server identity
export const SERVER_NAME = pkg.name;
export const SERVER_VERSION = pkg.version;

// Keychain storage
export const SERVICE_NAME = 'treebeam-mcp';
export const ACCOUNT_NAME = 'default';

// Endpoints (configurable via environment variables)
export const IDENTITY_URL = process.env.TREEBEAM_IDENTITY_URL || 'https://identity.treebeam.com';
export const API_URL = process.env.TREEBEAM_API_URL || 'https://api.treebeam.com';

// OAuth
export const CLIENT_ID = 'fa8b447f-5db0-4c8b-912c-22d616a7a72c';
export const OAUTH_SCOPE = 'openid profile tns.api.data.read tns.api.data.write';
export const DEVICE_AUTH_ENDPOINT = '/connect/deviceauthorization';
export const TOKEN_ENDPOINT = '/connect/token';
export const GRANT_TYPE_DEVICE_CODE = 'urn:ietf:params:oauth:grant-type:device_code';
export const GRANT_TYPE_REFRESH_TOKEN = 'refresh_token';

// Token management
export const TOKEN_EXPIRY_BUFFER_MS = 300000; // 5 minutes
export const DEFAULT_DEVICE_CODE_EXPIRY_S = 300;
export const DEFAULT_POLL_INTERVAL_S = 5;
export const SLOW_DOWN_INCREMENT_S = 5;

// API tool routing
export const TOOL_NAME_TO_ENDPOINT_MAP = {
    list_projects: { endpoint: 'c', method: 'GET', pathParams: [], queryParams: ['o'], payload: [] },
    list_organizations: { endpoint: 'o', method: 'GET', pathParams: [], queryParams: [], payload: [] },
    // Adjustment Types (GET only)
    list_adjustment_types: { endpoint: 'adjustmentTypes', method: 'GET', pathParams: [], queryParams: [], payload: [] },
    get_adjustment_type: { endpoint: 'adjustmentTypes/{id}', method: 'GET', pathParams: ['id'], queryParams: [], payload: [] },
    search_entities: { endpoint: 'c/{collectionId}/entities', method: 'GET', pathParams: ['collectionId'], queryParams: ['name', 'number', 'description', 'since', 'includeDeprecatedItems'], payload: [] },
    get_entity: { endpoint: 'c/{collectionId}/entities/{id}', method: 'GET', pathParams: ['collectionId', 'id'], queryParams: [], payload: [] },
    create_entity: { endpoint: 'c/{collectionId}/entities', method: 'POST', pathParams: ['collectionId'], queryParams: [], payload: ['collectionId', 'number', 'name', 'description', 'isDeprecated'] },
    update_entity: {
        endpoint: 'c/{collectionId}/entities/{id}',
        method: 'POST',
        pathParams: ['collectionId', 'id'],
        queryParams: [],
        payload: ['collectionId', 'number', 'name', 'description', 'isDeprecated'],
        merge: true
    },
    delete_entity: { endpoint: 'c/{collectionId}/entities/{id}', method: 'DELETE', pathParams: ['collectionId', 'id'], queryParams: [], payload: [] },
    // Account Groups
    search_account_groups: { endpoint: 'c/{collectionId}/accountgroups', method: 'GET', pathParams: ['collectionId'], queryParams: ['name', 'number', 'description', 'accountGroupTypeCode', 'since', 'includeDeprecatedItems'], payload: [] },
    get_account_group: { endpoint: 'c/{collectionId}/accountgroups/{id}', method: 'GET', pathParams: ['collectionId', 'id'], queryParams: [], payload: [] },
    create_account_group: {
        endpoint: 'c/{collectionId}/accountgroups',
        method: 'POST',
        pathParams: ['collectionId'],
        queryParams: [],
        payload: ['collectionId', 'number', 'name', 'accountGroupTypeCode', 'description']
    },
    update_account_group: {
        endpoint: 'c/{collectionId}/accountgroups/{id}',
        method: 'POST',
        pathParams: ['collectionId', 'id'],
        queryParams: [],
        payload: ['collectionId', 'number', 'name', 'description'],
        merge: true
    },
    delete_account_group: { endpoint: 'c/{collectionId}/accountgroups/{id}', method: 'DELETE', pathParams: ['collectionId', 'id'], queryParams: [], payload: [] },
    // Entity Relationship Sets
    search_entity_relationship_sets: { endpoint: 'c/{collectionId}/entityrelationshipsets', method: 'GET', pathParams: ['collectionId'], queryParams: ['since', 'includeDeprecatedItems'], payload: [] },
    get_entity_relationship_set: { endpoint: 'c/{collectionId}/entityrelationshipsets/{id}', method: 'GET', pathParams: ['collectionId', 'id'], queryParams: [], payload: [] },
    create_entity_relationship_set: {
        endpoint: 'c/{collectionId}/entityrelationshipsets',
        method: 'POST',
        pathParams: ['collectionId'],
        queryParams: [],
        payload: ['collectionId', 'name', 'description']
    },
    update_entity_relationship_set: {
        endpoint: 'c/{collectionId}/entityrelationshipsets/{id}',
        method: 'POST',
        pathParams: ['collectionId', 'id'],
        queryParams: [],
        payload: ['collectionId', 'name', 'description'],
        merge: true
    },
    delete_entity_relationship_set: { endpoint: 'c/{collectionId}/entityrelationshipsets/{id}', method: 'DELETE', pathParams: ['collectionId', 'id'], queryParams: [], payload: [] },
    // Accounts
    search_accounts: { endpoint: 'c/{collectionId}/accounts', method: 'GET', pathParams: ['collectionId'], queryParams: ['name', 'number', 'description', 'entityId', 'accountGroupId', 'since', 'includeDeprecatedItems'], payload: [] },
    get_account: { endpoint: 'c/{collectionId}/accounts/{id}', method: 'GET', pathParams: ['collectionId', 'id'], queryParams: [], payload: [] },
    create_account: {
        endpoint: 'c/{collectionId}/accounts',
        method: 'POST',
        pathParams: ['collectionId'],
        queryParams: [],
        payload: ['collectionId', 'entityId', 'accountGroupId', 'number', 'name', 'description']
    },
    update_account: {
        endpoint: 'c/{collectionId}/accounts/{id}',
        method: 'POST',
        pathParams: ['collectionId', 'id'],
        queryParams: [],
        payload: ['collectionId', 'number', 'name', 'description'],
        merge: true
    },
    delete_account: { endpoint: 'c/{collectionId}/accounts/{id}', method: 'DELETE', pathParams: ['collectionId', 'id'], queryParams: [], payload: [] },
    // Periods
    search_periods: {
        endpoint: 'c/{collectionId}/periods',
        method: 'GET',
        pathParams: ['collectionId'],
        queryParams: ['name', 'number', 'description', 'isLocked', 'currencyCode', 'startDate', 'endDate', 'since', 'includeDeprecatedItems'],
        payload: []
    },
    get_period: { endpoint: 'c/{collectionId}/periods/{id}', method: 'GET', pathParams: ['collectionId', 'id'], queryParams: [], payload: [] },
    create_period: {
        endpoint: 'c/{collectionId}/periods',
        method: 'POST',
        pathParams: ['collectionId'],
        queryParams: [],
        payload: ['collectionId', 'number', 'name', 'description', 'startDate', 'endDate', 'currencyCode', 'ordinal']
    },
    update_period: {
        endpoint: 'c/{collectionId}/periods/{id}',
        method: 'POST',
        pathParams: ['collectionId', 'id'],
        queryParams: [],
        payload: ['collectionId', 'name', 'number', 'description', 'startDate', 'endDate', 'currencyCode'],
        merge: true
    },
    delete_period: { endpoint: 'c/{collectionId}/periods/{id}', method: 'DELETE', pathParams: ['collectionId', 'id'], queryParams: [], payload: [] },
    // Unadjusted Balances
    search_unadjusted_balances: {
        endpoint: 'c/{collectionId}/unadjustedbalances',
        method: 'GET',
        pathParams: ['collectionId'],
        queryParams: ['periodId', 'accountId', 'interimPeriodId', 'amount', 'since', 'includeDeprecatedItems'],
        payload: []
    },
    get_unadjusted_balance: { endpoint: 'c/{collectionId}/unadjustedbalances/{id}', method: 'GET', pathParams: ['collectionId', 'id'], queryParams: [], payload: [] },
    create_unadjusted_balance: {
        endpoint: 'c/{collectionId}/unadjustedbalances',
        method: 'POST',
        pathParams: ['collectionId'],
        queryParams: [],
        payload: ['collectionId', 'periodId', 'accountId', 'amount']
    },
    update_unadjusted_balance: {
        endpoint: 'c/{collectionId}/unadjustedbalances/{id}',
        method: 'POST',
        pathParams: ['collectionId', 'id'],
        queryParams: [],
        payload: ['collectionId', 'amount'],
        merge: true
    },
    delete_unadjusted_balance: { endpoint: 'c/{collectionId}/unadjustedbalances/{id}', method: 'DELETE', pathParams: ['collectionId', 'id'], queryParams: [], payload: [] },
    // Adjustments
    search_adjustments: {
        endpoint: 'c/{collectionId}/adjustments',
        method: 'GET',
        pathParams: ['collectionId'],
        queryParams: ['name', 'number', 'description', 'periodId', 'interimPeriodId', 'adjustmentTypeId', 'adjustmentStatus', 'reference', 'isPreparedByClient', 'since', 'includeDeprecatedItems'],
        payload: []
    },
    get_adjustment: { endpoint: 'c/{collectionId}/adjustments/{id}', method: 'GET', pathParams: ['collectionId', 'id'], queryParams: [], payload: [] },
    create_adjustment: {
        endpoint: 'c/{collectionId}/adjustments',
        method: 'POST',
        pathParams: ['collectionId'],
        queryParams: [],
        payload: ['collectionId', 'periodId', 'adjustmentTypeId', 'number', 'name', 'description', 'reference', 'isPreparedByClient']
    },
    update_adjustment: {
        endpoint: 'c/{collectionId}/adjustments/{id}',
        method: 'POST',
        pathParams: ['collectionId', 'id'],
        queryParams: [],
        payload: ['collectionId', 'name', 'number', 'description', 'periodId', 'adjustmentTypeId', 'reference', 'isPreparedByClient'],
        merge: true
    },
    delete_adjustment: { endpoint: 'c/{collectionId}/adjustments/{id}', method: 'DELETE', pathParams: ['collectionId', 'id'], queryParams: [], payload: [] },
    // Adjustment Line Items
    search_adjustment_line_items: {
        endpoint: 'c/{collectionId}/adjustmentlineitems',
        method: 'GET',
        pathParams: ['collectionId'],
        queryParams: ['adjustmentId', 'accountId', 'description', 'reference', 'amount', 'since', 'includeDeprecatedItems'],
        payload: []
    },
    get_adjustment_line_item: { endpoint: 'c/{collectionId}/adjustmentlineitems/{id}', method: 'GET', pathParams: ['collectionId', 'id'], queryParams: [], payload: [] },
    create_adjustment_line_item: {
        endpoint: 'c/{collectionId}/adjustmentlineitems',
        method: 'POST',
        pathParams: ['collectionId'],
        queryParams: [],
        payload: ['collectionId', 'adjustmentId', 'accountId', 'amount', 'description', 'reference', 'ordinal']
    },
    update_adjustment_line_item: {
        endpoint: 'c/{collectionId}/adjustmentlineitems/{id}',
        method: 'POST',
        pathParams: ['collectionId', 'id'],
        queryParams: [],
        payload: ['collectionId', 'amount', 'description', 'reference', 'ordinal'],
        merge: true
    },
    delete_adjustment_line_item: { endpoint: 'c/{collectionId}/adjustmentlineitems/{id}', method: 'DELETE', pathParams: ['collectionId', 'id'], queryParams: [], payload: [] },
    // Pivot – Trial Balance
    pivot_trial_balance_by_account: {
        endpoint: 'c/{collectionId}/pivot/trialbalance/byaccount',
        method: 'POST',
        pathParams: ['collectionId'],
        queryParams: [],
        payload: ['periodIds', 'entityIds', 'interimPeriodId', 'adjustmentTypeIds', 'fsGroupCodes', 'accountGroupIds', 'accountIds']
    },
    pivot_trial_balance_by_account_group: {
        endpoint: 'c/{collectionId}/pivot/trialbalance/byaccountgroup',
        method: 'POST',
        pathParams: ['collectionId'],
        queryParams: [],
        payload: ['periodIds', 'entityIds', 'interimPeriodId', 'adjustmentTypeIds', 'fsGroupCodes', 'accountGroupIds']
    },
    pivot_trial_balance_by_fs_group: {
        endpoint: 'c/{collectionId}/pivot/trialbalance/byfsgroup',
        method: 'POST',
        pathParams: ['collectionId'],
        queryParams: [],
        payload: ['periodIds', 'entityIds', 'interimPeriodId', 'adjustmentTypeIds', 'fsGroupCodes']
    },
    // Pivot – Adjustments
    pivot_adjustments_by_adjustment: {
        endpoint: 'c/{collectionId}/pivot/adjustments/byadjustment',
        method: 'POST',
        pathParams: ['collectionId'],
        queryParams: [],
        payload: ['periodIds', 'entityIds', 'interimPeriodId', 'adjustmentTypeIds', 'adjustmentStatus', 'adjustmentIds']
    },
    pivot_adjustments_by_account: {
        endpoint: 'c/{collectionId}/pivot/adjustments/byaccount',
        method: 'POST',
        pathParams: ['collectionId'],
        queryParams: [],
        payload: ['periodIds', 'entityIds', 'interimPeriodId', 'adjustmentTypeIds', 'adjustmentStatus', 'fsGroupCodes', 'accountGroupIds', 'accountIds']
    },
    pivot_adjustments_by_account_group: {
        endpoint: 'c/{collectionId}/pivot/adjustments/byaccountgroup',
        method: 'POST',
        pathParams: ['collectionId'],
        queryParams: [],
        payload: ['periodIds', 'entityIds', 'interimPeriodId', 'adjustmentTypeIds', 'adjustmentStatus', 'fsGroupCodes', 'accountGroupIds']
    },
    pivot_adjustments_by_fs_group: {
        endpoint: 'c/{collectionId}/pivot/adjustments/byfsgroup',
        method: 'POST',
        pathParams: ['collectionId'],
        queryParams: [],
        payload: ['periodIds', 'entityIds', 'interimPeriodId', 'adjustmentTypeIds', 'adjustmentStatus', 'fsGroupCodes']
    },
    // Pivot – Consolidation
    pivot_consolidation_by_account_group: {
        endpoint: 'c/{collectionId}/pivot/consolidation/byaccountgroup',
        method: 'POST',
        pathParams: ['collectionId'],
        queryParams: [],
        payload: ['periodIds', 'entityIds', 'interimPeriodId', 'adjustmentTypeIds', 'fsGroupCodes', 'accountGroupIds']
    },
    pivot_consolidation_by_fs_group: {
        endpoint: 'c/{collectionId}/pivot/consolidation/byfsgroup',
        method: 'POST',
        pathParams: ['collectionId'],
        queryParams: [],
        payload: ['periodIds', 'entityIds', 'interimPeriodId', 'adjustmentTypeIds', 'fsGroupCodes']
    }
};

export const accountGroupTypes = [
    { id: 'a', displayName: 'Asset' },
    { id: 'l', displayName: 'Liability' },
    { id: 'q', displayName: 'Equity' },
    { id: 'r', displayName: 'Revenue' },
    { id: 'x', displayName: 'Expense' }
];

// Log prefix
export const LOG_PREFIX = '[treebeam-mcp]';

// Server instructions — delivered to the agent once at session start
export const SERVER_INSTRUCTIONS = `TreeBeam is a financial management API for accounting projects. Each project contains entities, account groups, accounts, periods, unadjusted balances, adjustments, and adjustment line items.

## Search Tool Filter Syntax

All search tools (search_*) support a consistent filter system. Filter parameters are arrays of strings. Each element applies a filter condition.

### Operators

| Operator    | Meaning                          | Applies to          |
|-------------|----------------------------------|----------------------|
| [eq]        | Exact match                      | All field types      |
| [contains]  | Case-insensitive substring match | Text and ID fields   |
| [gt]        | Greater than                     | Date, numeric fields |
| [lt]        | Less than                        | Date, numeric fields |
| [ge]        | Greater than or equal            | Date, numeric fields |
| [le]        | Less than or equal               | Date, numeric fields |

### Defaults

When you pass a bare value without an operator prefix, the default operator is applied:
- **Text fields** (name, number, description, reference, adjustmentStatus): default is [contains]
- **ID fields** (periodId, entityId, accountId, accountGroupId, adjustmentId, adjustmentTypeId, interimPeriodId): default is [eq]
- **Boolean fields** (isLocked, isPreparedByClient): only [eq] is supported, values are "true" or "false"
- **Date fields** (startDate, endDate): default is [eq], format is yyyy-MM-dd
- **Numeric fields** (amount): default is [eq]

### Combining Filters

- **Different fields are ANDed:** name: ["[contains]Cash"] with entityId: ["[eq]abc"] returns records matching BOTH conditions.
- **Multiple array elements for the same field are ANDed:** name: ["[contains]Cash", "[contains]Equivalents"] returns records whose name contains "Cash" AND contains "Equivalents".
- **Multiple operator-value pairs within a single element are ORed:** name: ["[contains]Cash[contains]Bank"] returns records whose name contains "Cash" OR "Bank".

### Range Queries

For numeric and date fields, use multiple array elements to create ranges:
- amount: ["[gt]1000", "[lt]5000"] — amounts between 1,000 and 5,000
- startDate: ["[ge]2024-01-01", "[lt]2025-01-01"] — start dates in the year 2024
- amount: ["[lt]0"] — negative amounts only
- periodId: ["[eq]abc", "[eq]def"] — records for period "abc" AND period "def"

### Common Parameters

All search tools also accept:
- **since** (string, date-time): Only return records modified after this timestamp.
- **includeDeprecatedItems** (boolean): Include archived/deprecated records. Default: false.
- **continuationToken** (string): Pagination token from a previous response.

### Filter Errors

Invalid filter syntax returns a 400 error. Bad filters never silently return unfiltered results.

### Pivot Tools

For financial summaries, trial balances, and aggregated reporting, prefer the pivot_* tools over search_* tools. Pivot tools return pre-calculated totals in a single response with no pagination.
`;
