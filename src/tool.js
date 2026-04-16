// treebeam-mcp/src/tools.ts
export const tools = [
    {
        name: 'treebeam_login',
        description:
            'Start device flow authentication for TreeBeam. Returns a URL and code for the user to complete in their browser. The server polls for the token in the background automatically. ALWAYS display the entire output message from this tool to the user in your instructions.',
        inputSchema: {
            type: 'object',
            properties: {},
            required: []
        }
    },
    {
        name: 'treebeam_logout',
        description: 'Log out of TreeBeam by removing stored credentials from the OS keychain.',
        inputSchema: {
            type: 'object',
            properties: {},
            required: []
        }
    },
    {
        name: 'treebeam_auth_status',
        description:
            'Check current TreeBeam authentication status — whether a valid token is stored and when it expires. If the user is not authenticated, log them in with the treebeam_login tool before using other tools that would require authentication.',
        inputSchema: {
            type: 'object',
            properties: {},
            required: []
        }
    },
    {
        name: 'list_organizations',
        description: 'List all accounting organizations accessible to the user. Results are paginated — if a continuationToken is returned, pass it in the next call to retrieve more.',
        inputSchema: {
            type: 'object',
            properties: {
                continuationToken: {
                    type: 'string',
                    description: 'Pagination token returned by a previous call. Pass this to retrieve the next page of results.'
                }
            },
            required: []
        }
    },
    {
        name: 'list_projects',
        description: 'List all accounting projects accessible to the user, optionally filtered by organization. Results are paginated — if a continuationToken is returned, pass it in the next call to retrieve more.',
        inputSchema: {
            type: 'object',
            properties: {
                o: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Optional organization ID to filter projects.'
                },
                continuationToken: {
                    type: 'string',
                    description: 'Pagination token returned by a previous call. Pass this to retrieve the next page of results.'
                }
            },
            required: []
        }
    },
    // --- Adjustment Types (GET only — write operations are admin-only) ---
    {
        name: 'list_adjustment_types',
        description: 'List all available adjustment types (e.g. PAJE, TAJE). These are global reference values not scoped to a project. Results are paginated — if a continuationToken is returned, pass it in the next call to retrieve more.',
        inputSchema: {
            type: 'object',
            properties: {
                continuationToken: {
                    type: 'string',
                    description: 'Pagination token returned by a previous call. Pass this to retrieve the next page of results.'
                }
            },
            required: []
        }
    },
    {
        name: 'get_adjustment_type',
        description: 'Get a single adjustment type by ID.',
        inputSchema: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The adjustment type ID'
                }
            },
            required: ['id']
        }
    },
    {
        name: 'search_entities',
        description: 'Search/list entities within a project. Supports filtering — see server instructions for filter syntax. Results are paginated — if a continuationToken is returned, pass it in the next call to retrieve more.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                name: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Entity name (text filter, default: [contains])'
                },
                number: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Entity number/code (text filter, default: [contains])'
                },
                description: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Entity description (text filter, default: [contains])'
                },
                since: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Only return records modified after this timestamp'
                },
                includeDeprecatedItems: {
                    type: 'boolean',
                    description: 'Include deprecated entities (default: false)',
                    default: false
                },
                continuationToken: {
                    type: 'string',
                    description: 'Pagination token returned by a previous call. Pass this to retrieve the next page of results.'
                }
            },
            required: ['collectionId']
        }
    },
    {
        name: 'get_entity',
        description: 'Get a single entity by ID within a project.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The entity ID'
                }
            },
            required: ['collectionId', 'id']
        }
    },
    {
        name: 'create_entity',
        description: 'Create a new entity within a project.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                number: {
                    type: 'string',
                    description: 'Entity number or code'
                },
                name: {
                    type: 'string',
                    description: 'Entity name'
                },
                description: {
                    type: 'string',
                    description: 'Entity description'
                },
                isDeprecated: {
                    type: 'boolean',
                    description: 'Whether the entity is deprecated',
                    default: false
                }
            },
            required: ['collectionId', 'name']
        }
    },
    {
        name: 'update_entity',
        description: 'Update an existing entity within a project.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The entity ID'
                },
                number: {
                    type: 'string',
                    description: 'Entity number or code'
                },
                name: {
                    type: 'string',
                    description: 'Entity name'
                },
                description: {
                    type: 'string',
                    description: 'Entity description'
                },
                isDeprecated: {
                    type: 'boolean',
                    description: 'Whether the entity is deprecated'
                }
            },
            required: ['collectionId', 'id']
        }
    },
    {
        name: 'delete_entity',
        description: 'Delete an entity from a project. Requires the entity ETag for optimistic concurrency control.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The entity ID'
                },
                etag: {
                    type: 'string',
                    description: 'The entity ETag value (from the _etag field) for optimistic concurrency'
                }
            },
            required: ['collectionId', 'id', 'etag']
        }
    },
    // --- Account Groups ---
    {
        name: 'search_account_groups',
        description: 'Search/list raw account group records within a project. Supports filtering — see server instructions for filter syntax. Use this tool to look up a specific subset of account groups by type. DO NOT use this tool to build financial summaries by account group — use the pivot_trial_balance_by_account_group or pivot_trial_balance_by_fs_group tools instead, which return pre-aggregated totals in a single response with no pagination. Results are paginated — if a continuationToken is returned, pass it in the next call to retrieve more.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                name: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Account group name (text filter, default: [contains])'
                },
                number: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Account group number/code (text filter, default: [contains])'
                },
                description: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Account group description (text filter, default: [contains])'
                },
                accountGroupTypeCode: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Account group type code — a (asset), l (liability), q (equity), r (revenue), x (expense) (ID filter, default: [eq])'
                },
                since: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Only return records modified after this timestamp'
                },
                includeDeprecatedItems: {
                    type: 'boolean',
                    description: 'Include deprecated account groups (default: false)',
                    default: false
                },
                continuationToken: {
                    type: 'string',
                    description: 'Pagination token returned by a previous call. Pass this to retrieve the next page of results.'
                }
            },
            required: ['collectionId']
        }
    },
    {
        name: 'get_account_group',
        description: 'Get a single account group by ID within a project.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The account group ID'
                }
            },
            required: ['collectionId', 'id']
        }
    },
    {
        name: 'create_account_group',
        description: 'Create a new account group within a project.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                number: {
                    type: 'string',
                    description: 'Account group number or code'
                },
                name: {
                    type: 'string',
                    description: 'Account group name'
                },
                accountGroupTypeCode: {
                    type: 'string',
                    description: 'Account group type code'
                },
                description: {
                    type: 'string',
                    description: 'Account group description'
                }
            },
            required: ['collectionId', 'name']
        }
    },
    {
        name: 'update_account_group',
        description: 'Update an existing account group within a project.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The account group ID'
                },
                number: {
                    type: 'string',
                    description: 'Account group number or code'
                },
                name: {
                    type: 'string',
                    description: 'Account group name'
                },
                description: {
                    type: 'string',
                    description: 'Account group description'
                }
            },
            required: ['collectionId', 'id']
        }
    },
    {
        name: 'delete_account_group',
        description: 'Delete an account group from a project. Requires the account group ETag for optimistic concurrency control.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The account group ID'
                },
                etag: {
                    type: 'string',
                    description: 'The account group ETag value (from the _etag field) for optimistic concurrency'
                }
            },
            required: ['collectionId', 'id', 'etag']
        }
    },
    // --- Entity Relationship Sets ---
    {
        name: 'search_entity_relationship_sets',
        description: 'Search/list entity relationship sets within a project. Results are paginated — if a continuationToken is returned, pass it in the next call to retrieve more.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                since: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Only return records modified after this timestamp'
                },
                includeDeprecatedItems: {
                    type: 'boolean',
                    description: 'Include deprecated entity relationship sets (default: false)',
                    default: false
                },
                continuationToken: {
                    type: 'string',
                    description: 'Pagination token returned by a previous call. Pass this to retrieve the next page of results.'
                }
            },
            required: ['collectionId']
        }
    },
    {
        name: 'get_entity_relationship_set',
        description: 'Get a single entity relationship set by ID within a project.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The entity relationship set ID'
                }
            },
            required: ['collectionId', 'id']
        }
    },
    {
        name: 'create_entity_relationship_set',
        description: 'Create a new entity relationship set within a project.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                name: {
                    type: 'string',
                    description: 'Relationship set name'
                },
                description: {
                    type: 'string',
                    description: 'Relationship set description'
                }
            },
            required: ['collectionId', 'name']
        }
    },
    {
        name: 'update_entity_relationship_set',
        description: 'Update an existing entity relationship set within a project.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The entity relationship set ID'
                },
                name: {
                    type: 'string',
                    description: 'Relationship set name'
                },
                description: {
                    type: 'string',
                    description: 'Relationship set description'
                }
            },
            required: ['collectionId', 'id']
        }
    },
    {
        name: 'delete_entity_relationship_set',
        description: 'Delete an entity relationship set from a project. Requires the ETag for optimistic concurrency control.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The entity relationship set ID'
                },
                etag: {
                    type: 'string',
                    description: 'The ETag value (from the _etag field) for optimistic concurrency'
                }
            },
            required: ['collectionId', 'id', 'etag']
        }
    },
    // --- Accounts ---
    {
        name: 'search_accounts',
        description: 'Search/list raw account records within a project. Supports filtering — see server instructions for filter syntax. Use this tool to look up a specific subset of accounts by entity or account group. DO NOT use this tool to build trial balances or financial summaries — use the pivot_trial_balance_* tools instead, which return account-level balances pre-calculated in a single response with no pagination. Results are paginated — if a continuationToken is returned, pass it in the next call to retrieve more.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                name: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Account name (text filter, default: [contains])'
                },
                number: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Account number/code (text filter, default: [contains])'
                },
                description: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Account description (text filter, default: [contains])'
                },
                entityId: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Filter by entity ID (ID filter, default: [eq])'
                },
                accountGroupId: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Filter by account group ID (ID filter, default: [eq])'
                },
                since: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Only return records modified after this timestamp'
                },
                includeDeprecatedItems: {
                    type: 'boolean',
                    description: 'Include deprecated accounts (default: false)',
                    default: false
                },
                continuationToken: {
                    type: 'string',
                    description: 'Pagination token returned by a previous call. Pass this to retrieve the next page of results.'
                }
            },
            required: ['collectionId']
        }
    },
    {
        name: 'get_account',
        description: 'Get a single account by ID within a project.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The account ID'
                }
            },
            required: ['collectionId', 'id']
        }
    },
    {
        name: 'create_account',
        description: 'Create a new account within a project.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                entityId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The entity this account belongs to'
                },
                accountGroupId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The account group this account belongs to'
                },
                number: {
                    type: 'string',
                    description: 'Account number or code'
                },
                name: {
                    type: 'string',
                    description: 'Account name'
                },
                description: {
                    type: 'string',
                    description: 'Account description'
                }
            },
            required: ['collectionId', 'number', 'name']
        }
    },
    {
        name: 'update_account',
        description: 'Update an existing account within a project.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The account ID'
                },
                number: {
                    type: 'string',
                    description: 'Account number or code'
                },
                name: {
                    type: 'string',
                    description: 'Account name'
                },
                description: {
                    type: 'string',
                    description: 'Account description'
                }
            },
            required: ['collectionId', 'id']
        }
    },
    {
        name: 'delete_account',
        description: 'Delete an account from a project. Requires the ETag for optimistic concurrency control.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The account ID'
                },
                etag: {
                    type: 'string',
                    description: 'The ETag value (from the _etag field) for optimistic concurrency'
                }
            },
            required: ['collectionId', 'id', 'etag']
        }
    },
    // --- Periods ---
    {
        name: 'search_periods',
        description: 'Search/list accounting periods within a project. Supports filtering — see server instructions for filter syntax. Results are paginated — if a continuationToken is returned, pass it in the next call to retrieve more.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                name: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Period name (text filter, default: [contains])'
                },
                number: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Period number/code (text filter, default: [contains])'
                },
                description: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Period description (text filter, default: [contains])'
                },
                isLocked: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Filter by locked status — "true" or "false" (boolean filter)'
                },
                currencyCode: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Currency code, e.g. USD, EUR (ID filter, default: [eq])'
                },
                startDate: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Filter by start date in yyyy-MM-dd format (date filter, default: [eq])'
                },
                endDate: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Filter by end date in yyyy-MM-dd format (date filter, default: [eq])'
                },
                since: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Only return records modified after this timestamp'
                },
                includeDeprecatedItems: {
                    type: 'boolean',
                    description: 'Include deprecated periods (default: false)',
                    default: false
                },
                continuationToken: {
                    type: 'string',
                    description: 'Pagination token returned by a previous call. Pass this to retrieve the next page of results.'
                }
            },
            required: ['collectionId']
        }
    },
    {
        name: 'get_period',
        description: 'Get a single accounting period by ID within a project.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The period ID'
                }
            },
            required: ['collectionId', 'id']
        }
    },
    {
        name: 'create_period',
        description: 'Create a new accounting period within a project.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                number: {
                    type: 'string',
                    description: 'Period number or code'
                },
                name: {
                    type: 'string',
                    description: 'Period name'
                },
                startDate: {
                    type: 'string',
                    format: 'date',
                    description: 'Period start date (YYYY-MM-DD)'
                },
                endDate: {
                    type: 'string',
                    format: 'date',
                    description: 'Period end date (YYYY-MM-DD)'
                },
                currencyCode: {
                    type: 'string',
                    description: 'Currency code (e.g. usd, eur, gbp) all lowercase'
                },
                ordinal: {
                    type: 'integer',
                    description: 'Sort order for the period'
                }
            },
            required: ['collectionId', 'name', 'startDate', 'endDate', 'currencyCode']
        }
    },
    {
        name: 'update_period',
        description: 'Update an existing accounting period within a project.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The period ID'
                },
                name: {
                    type: 'string',
                    description: 'Period name'
                },
                number: {
                    type: 'string',
                    description: 'Period number or code'
                },
                description: {
                    type: 'string',
                    description: 'Period description'
                },
                startDate: {
                    type: 'string',
                    format: 'date',
                    description: 'Period start date (YYYY-MM-DD)'
                },
                endDate: {
                    type: 'string',
                    format: 'date',
                    description: 'Period end date (YYYY-MM-DD)'
                },
                currencyCode: {
                    type: 'string',
                    description: 'Currency code (e.g. usd, eur, gbp) all lowercase'
                }
            },
            required: ['collectionId', 'id']
        }
    },
    {
        name: 'delete_period',
        description: 'Delete an accounting period from a project. Requires the ETag for optimistic concurrency control.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The period ID'
                },
                etag: {
                    type: 'string',
                    description: 'The ETag value (from the _etag field) for optimistic concurrency'
                }
            },
            required: ['collectionId', 'id', 'etag']
        }
    },
    // --- Unadjusted Balances ---
    {
        name: 'search_unadjusted_balances',
        description: 'Search/list raw unadjusted balance records within a project. Supports filtering — see server instructions for filter syntax. Use this tool to look up a specific subset of balance records by period, account, or amount. DO NOT use this tool to calculate trial balances or summarize financial data — use the pivot_trial_balance_* tools instead, which return pre-calculated totals in a single response with no pagination. Results are paginated — if a continuationToken is returned, pass it in the next call to retrieve more.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                periodId: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Filter by period ID (ID filter, default: [eq])'
                },
                accountId: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Filter by account ID (ID filter, default: [eq])'
                },
                interimPeriodId: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Filter by interim period ID (ID filter, default: [eq])'
                },
                amount: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Filter by amount (numeric filter, default: [eq])'
                },
                since: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Only return records modified after this timestamp'
                },
                includeDeprecatedItems: {
                    type: 'boolean',
                    description: 'Include deprecated unadjusted balances (default: false)',
                    default: false
                },
                continuationToken: {
                    type: 'string',
                    description: 'Pagination token returned by a previous call. Pass this to retrieve the next page of results.'
                }
            },
            required: ['collectionId']
        }
    },
    {
        name: 'get_unadjusted_balance',
        description: 'Get a single unadjusted balance by ID within a project.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The unadjusted balance ID'
                }
            },
            required: ['collectionId', 'id']
        }
    },
    {
        name: 'create_unadjusted_balance',
        description: 'Create an unadjusted balance within a project.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                periodId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The period this balance belongs to'
                },
                accountId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The account this balance belongs to'
                },
                amount: {
                    type: 'number',
                    description: 'Balance amount'
                }
            },
            required: ['collectionId', 'periodId', 'accountId', 'amount']
        }
    },
    {
        name: 'update_unadjusted_balance',
        description: 'Update an existing unadjusted balance within a project.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The unadjusted balance ID'
                },
                amount: {
                    type: 'number',
                    description: 'Balance amount'
                }
            },
            required: ['collectionId', 'id', 'amount']
        }
    },
    {
        name: 'delete_unadjusted_balance',
        description: 'Delete an unadjusted balance from a project. Requires the ETag for optimistic concurrency control.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The unadjusted balance ID'
                },
                etag: {
                    type: 'string',
                    description: 'The ETag value (from the _etag field) for optimistic concurrency'
                }
            },
            required: ['collectionId', 'id', 'etag']
        }
    },
    // --- Adjustments ---
    {
        name: 'search_adjustments',
        description: 'Search/list raw adjustment records within a project. Supports filtering — see server instructions for filter syntax. Use this tool to look up a specific subset of adjustments by period, type, status, or other criteria. DO NOT use this tool to summarize or analyze adjustment data across periods or accounts — use the pivot_adjustments_* tools instead, which return pre-aggregated totals in a single response with no pagination. Results are paginated — if a continuationToken is returned, pass it in the next call to retrieve more.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                name: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Adjustment name (text filter, default: [contains])'
                },
                number: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Adjustment number/code (text filter, default: [contains])'
                },
                description: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Adjustment description (text filter, default: [contains])'
                },
                periodId: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Filter by period ID (ID filter, default: [eq])'
                },
                interimPeriodId: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Filter by interim period ID (ID filter, default: [eq])'
                },
                adjustmentTypeId: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Filter by adjustment type ID (ID filter, default: [eq])'
                },
                adjustmentStatus: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Adjustment status, e.g. "draft", "posted" (text filter, default: [contains])'
                },
                reference: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Reference text (text filter, default: [contains])'
                },
                isPreparedByClient: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Whether prepared by client — "true" or "false" (boolean filter)'
                },
                since: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Only return records modified after this timestamp'
                },
                includeDeprecatedItems: {
                    type: 'boolean',
                    description: 'Include deprecated adjustments (default: false)',
                    default: false
                },
                continuationToken: {
                    type: 'string',
                    description: 'Pagination token returned by a previous call. Pass this to retrieve the next page of results.'
                }
            },
            required: ['collectionId']
        }
    },
    {
        name: 'get_adjustment',
        description: 'Get a single adjustment by ID within a project.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The adjustment ID'
                }
            },
            required: ['collectionId', 'id']
        }
    },
    {
        name: 'create_adjustment',
        description: 'Create a new adjustment with line items within a project. Line item amounts must sum to zero (debits = credits).',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                periodId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The period this adjustment belongs to'
                },
                adjustmentTypeId: {
                    type: 'string',
                    description: 'The adjustment type (e.g. PAJE, TAJE)'
                },
                number: {
                    type: 'string',
                    description: 'Adjustment number or code'
                },
                name: {
                    type: 'string',
                    description: 'Adjustment name'
                },
                description: {
                    type: 'string',
                    description: 'Adjustment description'
                },
                lineItems: {
                    type: 'array',
                    description: 'Line items for the adjustment. Amounts must sum to zero (positive = debit, negative = credit). Minimum 2 items required.',
                    items: {
                        type: 'object',
                        properties: {
                            accountId: {
                                type: 'string',
                                format: 'uuid',
                                description: 'The account ID this line item affects'
                            },
                            amount: {
                                type: 'number',
                                description: 'Amount (positive = debit, negative = credit)'
                            },
                            description: {
                                type: 'string',
                                description: 'Description/memo for this line item'
                            },
                            reference: {
                                type: 'string',
                                description: 'Reference code or identifier'
                            },
                            ordinal: {
                                type: 'integer',
                                description: 'Sort order (auto-assigned if not provided)'
                            }
                        },
                        required: ['accountId', 'amount']
                    },
                    minItems: 2
                }
            },
            required: ['collectionId', 'periodId', 'adjustmentTypeId', 'name', 'lineItems']
        }
    },
    {
        name: 'update_adjustment',
        description: 'Update an existing adjustment within a project.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The adjustment ID'
                },
                name: {
                    type: 'string',
                    description: 'Adjustment name'
                },
                description: {
                    type: 'string',
                    description: 'Adjustment description'
                },
                lineItems: {
                    type: 'array',
                    description: 'Updated line items. Amounts must sum to zero. Replaces all existing line items.',
                    items: {
                        type: 'object',
                        properties: {
                            accountId: {
                                type: 'string',
                                format: 'uuid',
                                description: 'The account ID this line item affects'
                            },
                            amount: {
                                type: 'number',
                                description: 'Amount (positive = debit, negative = credit)'
                            },
                            description: {
                                type: 'string',
                                description: 'Description/memo for this line item'
                            },
                            reference: {
                                type: 'string',
                                description: 'Reference code or identifier'
                            },
                            ordinal: {
                                type: 'integer',
                                description: 'Sort order (auto-assigned if not provided)'
                            }
                        },
                        required: ['accountId', 'amount']
                    },
                    minItems: 2
                }
            },
            required: ['collectionId', 'id']
        }
    },
    {
        name: 'delete_adjustment',
        description: 'Delete an adjustment from a project. Requires the ETag for optimistic concurrency control.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The adjustment ID'
                },
                etag: {
                    type: 'string',
                    description: 'The ETag value (from the _etag field) for optimistic concurrency'
                }
            },
            required: ['collectionId', 'id', 'etag']
        }
    },
    // --- Adjustment Line Items ---
    {
        name: 'search_adjustment_line_items',
        description: 'Search/list raw adjustment line item records within a project. Supports filtering — see server instructions for filter syntax. Use this tool to look up a specific subset of line items by adjustment, account, or amount. DO NOT use this tool to analyze adjustment activity across accounts or periods — use the pivot_adjustments_* tools instead, which return pre-joined and pre-aggregated data in a single response with no pagination. Results are paginated — if a continuationToken is returned, pass it in the next call to retrieve more.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                adjustmentId: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Filter by parent adjustment ID (ID filter, default: [eq])'
                },
                accountId: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Filter by account ID (ID filter, default: [eq])'
                },
                description: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Line item description (text filter, default: [contains])'
                },
                reference: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Reference text (text filter, default: [contains])'
                },
                amount: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Filter by amount (numeric filter, default: [eq])'
                },
                since: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Only return records modified after this timestamp'
                },
                includeDeprecatedItems: {
                    type: 'boolean',
                    description: 'Include deprecated adjustment line items (default: false)',
                    default: false
                },
                continuationToken: {
                    type: 'string',
                    description: 'Pagination token returned by a previous call. Pass this to retrieve the next page of results.'
                }
            },
            required: ['collectionId']
        }
    },
    {
        name: 'get_adjustment_line_item',
        description: 'Get a single adjustment line item by ID within a project.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The adjustment line item ID'
                }
            },
            required: ['collectionId', 'id']
        }
    },
    {
        name: 'create_adjustment_line_item',
        description: 'Create a new adjustment line item within a project.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                adjustmentId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The parent adjustment this line item belongs to'
                },
                accountId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The account this line item affects'
                },
                amount: {
                    type: 'number',
                    description: 'Amount (positive = debit, negative = credit)'
                },
                description: {
                    type: 'string',
                    description: 'Description/memo for this line item'
                },
                reference: {
                    type: 'string',
                    description: 'Reference code or identifier'
                },
                ordinal: {
                    type: 'integer',
                    description: 'Sort order within the adjustment (auto-assigned if not provided)'
                }
            },
            required: ['collectionId', 'adjustmentId', 'accountId', 'amount']
        }
    },
    {
        name: 'update_adjustment_line_item',
        description: 'Update an existing adjustment line item within a project.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The adjustment line item ID'
                },
                amount: {
                    type: 'number',
                    description: 'Amount (positive = debit, negative = credit)'
                },
                description: {
                    type: 'string',
                    description: 'Description/memo for this line item'
                },
                reference: {
                    type: 'string',
                    description: 'Reference code or identifier'
                },
                ordinal: {
                    type: 'integer',
                    description: 'Sort order within the adjustment'
                }
            },
            required: ['collectionId', 'id']
        }
    },
    {
        name: 'delete_adjustment_line_item',
        description: 'Delete an adjustment line item from a project. Requires the ETag for optimistic concurrency control.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The adjustment line item ID'
                },
                etag: {
                    type: 'string',
                    description: 'The ETag value (from the _etag field) for optimistic concurrency'
                }
            },
            required: ['collectionId', 'id', 'etag']
        }
    },
    // --- Pivot Tools ---
    // These tools return pre-calculated, pre-aggregated data in a single response with NO pagination.
    // PREFER these tools over search_* tools whenever the user asks about balances, totals, summaries,
    // trial balances, financial statements, or any analytical/reporting question.
    //
    // Workflow: Use search_periods to find period IDs, then pass them to the pivot tool.
    // Optionally use search_entities to find entity IDs if you need to scope to specific entities.
    // Use list_adjustment_types if you need to filter by adjustment type.

    // --- Pivot: Trial Balance ---
    {
        name: 'pivot_trial_balance_by_account',
        description:
            'PREFERRED for financial data retrieval. Returns a trial balance pivoted by account — one row per account with the unadjusted balance, total adjustments, and adjusted balance for each requested period. All data is returned in a single response with NO pagination. Use this tool whenever the user asks about account balances, trial balances, or financial position at the account level. You must provide at least one periodId — use search_periods first to find period IDs if needed.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                periodIds: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'One or more period IDs to include in the pivot. Required. Use search_periods to find period IDs.'
                },
                entityIds: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Optional. Scope results to specific entities. If omitted, all entities in the project are included.'
                },
                interimPeriodId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Optional. Filter unadjusted balances and adjustments to a specific interim period.'
                },
                adjustmentTypeIds: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Optional. Explicit list of adjustment type IDs to include. If omitted, all types except "passed" are included. Use list_adjustment_types to find valid IDs.'
                }
            },
            required: ['collectionId', 'periodIds']
        }
    },
    {
        name: 'pivot_trial_balance_by_account_group',
        description:
            'PREFERRED for financial data retrieval. Returns a trial balance pivoted by account group — one row per account group with amounts summed across all accounts in that group, for each requested period. All data is returned in a single response with NO pagination. Use this tool whenever the user asks about balances or totals grouped by account group (e.g. "Cash and Cash Equivalents", "Accounts Payable"). You must provide at least one periodId — use search_periods first to find period IDs if needed.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                periodIds: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'One or more period IDs to include in the pivot. Required. Use search_periods to find period IDs.'
                },
                entityIds: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Optional. Scope results to specific entities. If omitted, all entities in the project are included.'
                },
                interimPeriodId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Optional. Filter unadjusted balances and adjustments to a specific interim period.'
                },
                adjustmentTypeIds: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Optional. Explicit list of adjustment type IDs to include. If omitted, all types except "passed" are included. Use list_adjustment_types to find valid IDs.'
                }
            },
            required: ['collectionId', 'periodIds']
        }
    },
    {
        name: 'pivot_trial_balance_by_fs_group',
        description:
            'PREFERRED for high-level financial summaries. Returns a trial balance pivoted by financial statement group — one row per financial statement type (Asset, Liability, Equity, Revenue, Expense) with amounts summed across all account groups of that type, for each requested period. All data is returned in a single response with NO pagination. Use this tool whenever the user asks about high-level financial position, total assets vs liabilities, or financial statement summaries. You must provide at least one periodId — use search_periods first to find period IDs if needed.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                periodIds: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'One or more period IDs to include in the pivot. Required. Use search_periods to find period IDs.'
                },
                entityIds: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Optional. Scope results to specific entities. If omitted, all entities in the project are included.'
                },
                interimPeriodId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Optional. Filter unadjusted balances and adjustments to a specific interim period.'
                },
                adjustmentTypeIds: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Optional. Explicit list of adjustment type IDs to include. If omitted, all types except "passed" are included. Use list_adjustment_types to find valid IDs.'
                }
            },
            required: ['collectionId', 'periodIds']
        }
    },
    // --- Pivot: Adjustments ---
    {
        name: 'pivot_adjustments_by_adjustment',
        description:
            'PREFERRED for reviewing adjustments. Returns each adjustment with its line items pre-joined, including the resolved account name and account number on each line item. All data is returned in a single response with NO pagination. Use this tool whenever the user asks to see adjustments with their detail line items, or needs to review journal entries. You must provide at least one periodId — use search_periods first to find period IDs if needed.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                periodIds: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'One or more period IDs to include. Required. Use search_periods to find period IDs.'
                },
                entityIds: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Optional. Scope results to specific entities. If omitted, all entities in the project are included.'
                },
                interimPeriodId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Optional. Filter to a specific interim period.'
                },
                adjustmentTypeIds: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Optional. Explicit list of adjustment type IDs to include. If omitted, all types except "passed" are included. Use list_adjustment_types to find valid IDs.'
                },
                adjustmentStatus: {
                    type: 'string',
                    description: 'Reserved for future use.'
                }
            },
            required: ['collectionId', 'periodIds']
        }
    },
    {
        name: 'pivot_adjustments_by_account',
        description:
            'PREFERRED for analyzing adjustment impact by account. Returns one row per impacted account with the sum of adjustment line item amounts and count of distinct adjustments, for each requested period. Only accounts that have adjustment activity are included. All data is returned in a single response with NO pagination. Use this tool whenever the user asks which accounts were adjusted, or how much adjustment activity hit a particular account. You must provide at least one periodId — use search_periods first to find period IDs if needed.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                periodIds: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'One or more period IDs to include. Required. Use search_periods to find period IDs.'
                },
                entityIds: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Optional. Scope results to specific entities. If omitted, all entities in the project are included.'
                },
                interimPeriodId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Optional. Filter to a specific interim period.'
                },
                adjustmentTypeIds: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Optional. Explicit list of adjustment type IDs to include. If omitted, all types except "passed" are included. Use list_adjustment_types to find valid IDs.'
                },
                adjustmentStatus: {
                    type: 'string',
                    description: 'Reserved for future use.'
                }
            },
            required: ['collectionId', 'periodIds']
        }
    },
    {
        name: 'pivot_adjustments_by_account_group',
        description:
            'PREFERRED for analyzing adjustment impact by account group. Returns one row per impacted account group with summed adjustment amounts and distinct adjustment counts, for each requested period. Only account groups that have adjustment activity are included. All data is returned in a single response with NO pagination. Use this tool whenever the user asks about adjustment totals grouped by account group. You must provide at least one periodId — use search_periods first to find period IDs if needed.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                periodIds: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'One or more period IDs to include. Required. Use search_periods to find period IDs.'
                },
                entityIds: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Optional. Scope results to specific entities. If omitted, all entities in the project are included.'
                },
                interimPeriodId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Optional. Filter to a specific interim period.'
                },
                adjustmentTypeIds: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Optional. Explicit list of adjustment type IDs to include. If omitted, all types except "passed" are included. Use list_adjustment_types to find valid IDs.'
                },
                adjustmentStatus: {
                    type: 'string',
                    description: 'Reserved for future use.'
                }
            },
            required: ['collectionId', 'periodIds']
        }
    },
    {
        name: 'pivot_adjustments_by_fs_group',
        description:
            'PREFERRED for high-level adjustment analysis. Returns one row per impacted financial statement type (Asset, Liability, Equity, Revenue, Expense) with summed adjustment amounts and distinct adjustment counts, for each requested period. Only financial statement types that have adjustment activity are included. All data is returned in a single response with NO pagination. Use this tool whenever the user asks about adjustment impact at the financial statement level. You must provide at least one periodId — use search_periods first to find period IDs if needed.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                periodIds: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'One or more period IDs to include. Required. Use search_periods to find period IDs.'
                },
                entityIds: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Optional. Scope results to specific entities. If omitted, all entities in the project are included.'
                },
                interimPeriodId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Optional. Filter to a specific interim period.'
                },
                adjustmentTypeIds: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Optional. Explicit list of adjustment type IDs to include. If omitted, all types except "passed" are included. Use list_adjustment_types to find valid IDs.'
                },
                adjustmentStatus: {
                    type: 'string',
                    description: 'Reserved for future use.'
                }
            },
            required: ['collectionId', 'periodIds']
        }
    },
    // --- Pivot: Consolidation ---
    {
        name: 'pivot_consolidation_by_account_group',
        description:
            'PREFERRED for multi-entity consolidated reporting. Returns a consolidated trial balance by account group — one row per account group with totals summed across all included entities, plus a per-entity breakdown showing each entity\'s contribution to the row totals. All data is returned in a single response with NO pagination. Use this tool whenever the user asks about consolidated balances, cross-entity totals, or needs to compare entities side by side at the account group level. You must provide at least one periodId — use search_periods first to find period IDs if needed.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                periodIds: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'One or more period IDs to include. Required. Use search_periods to find period IDs.'
                },
                entityIds: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Optional. Scope to specific entities for consolidation. If omitted, all entities in the project are consolidated.'
                },
                interimPeriodId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Optional. Filter unadjusted balances and adjustments to a specific interim period.'
                },
                adjustmentTypeIds: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Optional. Explicit list of adjustment type IDs to include. If omitted, all types except "passed" are included. Use list_adjustment_types to find valid IDs.'
                }
            },
            required: ['collectionId', 'periodIds']
        }
    },
    {
        name: 'pivot_consolidation_by_fs_group',
        description:
            'PREFERRED for high-level multi-entity consolidated reporting. Returns a consolidated trial balance by financial statement group — one row per financial statement type (Asset, Liability, Equity, Revenue, Expense) with totals summed across all included entities, plus a per-entity breakdown. All data is returned in a single response with NO pagination. Use this tool whenever the user asks about consolidated financial position at the highest level, or needs a summary across all entities by financial statement type. You must provide at least one periodId — use search_periods first to find period IDs if needed.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                periodIds: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'One or more period IDs to include. Required. Use search_periods to find period IDs.'
                },
                entityIds: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Optional. Scope to specific entities for consolidation. If omitted, all entities in the project are consolidated.'
                },
                interimPeriodId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Optional. Filter unadjusted balances and adjustments to a specific interim period.'
                },
                adjustmentTypeIds: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Optional. Explicit list of adjustment type IDs to include. If omitted, all types except "passed" are included. Use list_adjustment_types to find valid IDs.'
                }
            },
            required: ['collectionId', 'periodIds']
        }
    }
];
