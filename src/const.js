import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pkg = require('../package.json');

// Server identity
export const SERVER_NAME = pkg.name;
export const SERVER_VERSION = pkg.version;

// Keychain storage
export const SERVICE_NAME = 'treebeam-mcp';
export const ACCOUNT_NAME = 'default';

// Endpoints
//export const IDENTITY_URL = 'https://localhost:7180';
export const IDENTITY_URL = 'https://dev.identity.treebeam.com';
export const TREEBEAM_API = 'https://dev.api.treebeam.com';

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
    list_projects:         { endpoint: 'c',                    method: 'GET', pathParams: [],     queryParams: ['o'], payload: [] },
    list_organizations:    { endpoint: 'o',                    method: 'GET', pathParams: [],     queryParams: [],    payload: [] },
    // Adjustment Types (GET only)
    list_adjustment_types: { endpoint: 'adjustmentTypes',      method: 'GET', pathParams: [],     queryParams: [],    payload: [] },
    get_adjustment_type:   { endpoint: 'adjustmentTypes/{id}', method: 'GET', pathParams: ['id'], queryParams: [],    payload: [] },
    search_entities: { endpoint: 'c/{collectionId}/entities', method: 'GET', pathParams: ['collectionId'], queryParams: ['since', 'includeDeprecatedItems'], payload: [] },
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
    search_account_groups: { endpoint: 'c/{collectionId}/accountgroups', method: 'GET', pathParams: ['collectionId'], queryParams: ['accountGroupTypeCode'], payload: [] },
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
    search_entity_relationship_sets: { endpoint: 'c/{collectionId}/entityrelationshipsets', method: 'GET', pathParams: ['collectionId'], queryParams: [], payload: [] },
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
    search_accounts: { endpoint: 'c/{collectionId}/accounts', method: 'GET', pathParams: ['collectionId'], queryParams: ['entityId', 'accountGroupId'], payload: [] },
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
        queryParams: ['startDateFrom', 'startDateTo', 'endDateFrom', 'endDateTo'],
        payload: []
    },
    get_period: { endpoint: 'c/{collectionId}/periods/{id}', method: 'GET', pathParams: ['collectionId', 'id'], queryParams: [], payload: [] },
    create_period: {
        endpoint: 'c/{collectionId}/periods',
        method: 'POST',
        pathParams: ['collectionId'],
        queryParams: [],
        payload: ['collectionId', 'number', 'name', 'startDate', 'endDate', 'currencyCode', 'ordinal']
    },
    update_period: {
        endpoint: 'c/{collectionId}/periods/{id}',
        method: 'POST',
        pathParams: ['collectionId', 'id'],
        queryParams: [],
        payload: ['collectionId', 'name', 'startDate', 'endDate'],
        merge: true
    },
    delete_period: { endpoint: 'c/{collectionId}/periods/{id}', method: 'DELETE', pathParams: ['collectionId', 'id'], queryParams: [], payload: [] },
    // Unadjusted Balances
    search_unadjusted_balances: {
        endpoint: 'c/{collectionId}/unadjustedbalances',
        method: 'GET',
        pathParams: ['collectionId'],
        queryParams: ['periodId', 'entityId', 'accountId', 'minAmount', 'maxAmount'],
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
        queryParams: ['periodId', 'adjustmentTypeId', 'minAmount', 'maxAmount'],
        payload: []
    },
    get_adjustment: { endpoint: 'c/{collectionId}/adjustments/{id}', method: 'GET', pathParams: ['collectionId', 'id'], queryParams: [], payload: [] },
    create_adjustment: {
        endpoint: 'c/{collectionId}/adjustments',
        method: 'POST',
        pathParams: ['collectionId'],
        queryParams: [],
        payload: ['collectionId', 'periodId', 'adjustmentTypeId', 'number', 'name', 'description', 'lineItems']
    },
    update_adjustment: {
        endpoint: 'c/{collectionId}/adjustments/{id}',
        method: 'POST',
        pathParams: ['collectionId', 'id'],
        queryParams: [],
        payload: ['collectionId', 'name', 'description', 'lineItems'],
        merge: true
    },
    delete_adjustment: { endpoint: 'c/{collectionId}/adjustments/{id}', method: 'DELETE', pathParams: ['collectionId', 'id'], queryParams: [], payload: [] },
    // Adjustment Line Items
    search_adjustment_line_items:  { endpoint: 'c/{collectionId}/adjustmentlineitems',      method: 'GET',    pathParams: ['collectionId'],       queryParams: ['adjustmentId', 'accountId', 'minAmount', 'maxAmount'],                payload: [] },
    get_adjustment_line_item:      { endpoint: 'c/{collectionId}/adjustmentlineitems/{id}', method: 'GET',    pathParams: ['collectionId', 'id'], queryParams: [],                                                                     payload: [] },
    create_adjustment_line_item:   { endpoint: 'c/{collectionId}/adjustmentlineitems',      method: 'POST',   pathParams: ['collectionId'],       queryParams: [],                                                                     payload: ['collectionId', 'adjustmentId', 'accountId', 'amount', 'description', 'reference', 'ordinal'] },
    update_adjustment_line_item:   { endpoint: 'c/{collectionId}/adjustmentlineitems/{id}', method: 'POST',   pathParams: ['collectionId', 'id'], queryParams: [],                                                                     payload: ['collectionId', 'amount', 'description', 'reference', 'ordinal'],          merge: true },
    delete_adjustment_line_item:   { endpoint: 'c/{collectionId}/adjustmentlineitems/{id}', method: 'DELETE', pathParams: ['collectionId', 'id'], queryParams: [],                                                                     payload: [] }
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
