// treebeam-mcp/src/tools.ts
export const tools = [
    {
        name: 'treebeam_login',
        description: 'Start device flow authentication for TreeBeam. Returns a URL and code for the user to complete in their browser. The server polls for the token in the background automatically. ALWAYS display the entire output message from this tool to the user in your instructions.',
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
        description: 'Check current TreeBeam authentication status — whether a valid token is stored and when it expires. If the user is not authenticated, log them in with the treebeam_login tool before using other tools that would require authentication.',
        inputSchema: {
            type: 'object',
            properties: {},
            required: []
        }
    },
    {
        name: 'list_organizations',
        description: 'List all accounting organizations accessible to the user',
        inputSchema: {
            type: 'object',
            properties: {},
            required: []
        }
    },
    {
        name: 'list_projects',
        description: 'List all accounting projects accessible to the user, optionally filtered by organization.',
        inputSchema: {
            type: 'object',
            properties: {
                o: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Optional organization ID to filter projects.'
                }
            },
            required: []
        }
    },
    // --- Adjustment Types (GET only — write operations are admin-only) ---
    {
        name: 'list_adjustment_types',
        description: 'List all available adjustment types (e.g. PAJE, TAJE). These are global reference values not scoped to a project.',
        inputSchema: {
            type: 'object',
            properties: {},
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
        description: 'List or search entities within a project, optionally filtered by modification date.',
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
                    description: 'Return only entities modified since this timestamp'
                },
                includeDeprecatedItems: {
                    type: 'boolean',
                    description: 'Include deprecated entities (default: false)',
                    default: false
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
        description: 'Search/list account groups within a project.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                accountGroupTypeCode: {
                    type: 'string',
                    description: 'Filter by account group type code'
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
        description: 'Search/list entity relationship sets within a project.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
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
        description: 'Search/list accounts within a project.',
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
                    description: 'Filter by entity ID'
                },
                accountGroupId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Filter by account group ID'
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
            required: ['collectionId', 'entityId', 'accountGroupId', 'name']
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
        description: 'Search/list accounting periods within a project.',
        inputSchema: {
            type: 'object',
            properties: {
                collectionId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The project ID'
                },
                startDateFrom: {
                    type: 'string',
                    format: 'date',
                    description: 'Filter periods with startDate on or after this date'
                },
                startDateTo: {
                    type: 'string',
                    format: 'date',
                    description: 'Filter periods with startDate on or before this date'
                },
                endDateFrom: {
                    type: 'string',
                    format: 'date',
                    description: 'Filter periods with endDate on or after this date'
                },
                endDateTo: {
                    type: 'string',
                    format: 'date',
                    description: 'Filter periods with endDate on or before this date'
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
                    description: 'Currency code (e.g. USD)'
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
                startDate: {
                    type: 'string',
                    format: 'date',
                    description: 'Period start date (YYYY-MM-DD)'
                },
                endDate: {
                    type: 'string',
                    format: 'date',
                    description: 'Period end date (YYYY-MM-DD)'
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
        description: 'Search/list unadjusted balances within a project.',
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
                    description: 'Filter by period ID'
                },
                entityId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Filter by entity ID'
                },
                accountId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Filter by account ID'
                },
                minAmount: {
                    type: 'number',
                    description: 'Filter balances with amount greater than or equal to this value'
                },
                maxAmount: {
                    type: 'number',
                    description: 'Filter balances with amount less than or equal to this value'
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
        description: 'Search/list adjustments within a project.',
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
                    description: 'Filter by period ID'
                },
                adjustmentTypeId: {
                    type: 'string',
                    description: 'Filter by adjustment type (e.g. PAJE, TAJE)'
                },
                minAmount: {
                    type: 'number',
                    description: 'Filter adjustments with total amount greater than or equal to this value'
                },
                maxAmount: {
                    type: 'number',
                    description: 'Filter adjustments with total amount less than or equal to this value'
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
        description: 'Search/list adjustment line items within a project.',
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
                    description: 'Filter by parent adjustment ID'
                },
                accountId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Filter by account ID'
                },
                minAmount: {
                    type: 'number',
                    description: 'Filter line items with amount greater than or equal to this value'
                },
                maxAmount: {
                    type: 'number',
                    description: 'Filter line items with amount less than or equal to this value'
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
    }
    // {
    //     name: 'get_trial_balance',
    //     description: 'Retrieve complete trial balance for a project/period with accounts, unadjusted balances, adjustment totals, and adjusted balances.',
    //     inputSchema: {
    //         type: 'object',
    //         properties: {
    //             projectId: {
    //                 type: 'string',
    //                 format: 'uuid',
    //                 description: 'The project ID'
    //             },
    //             periodId: {
    //                 type: 'string',
    //                 format: 'uuid',
    //                 description: 'The accounting period ID'
    //             },
    //             includeZeroBalances: {
    //                 type: 'boolean',
    //                 description: 'Include accounts with zero balances (default: false)',
    //                 default: false
    //             }
    //         },
    //         required: ['projectId', 'periodId']
    //     }
    // },
    // {
    //     name: 'list_adjustments',
    //     description: 'List adjustments (journal entries) with line item details for a project, optionally filtered by period or adjustment type.',
    //     inputSchema: {
    //         type: 'object',
    //         properties: {
    //             projectId: {
    //                 type: 'string',
    //                 format: 'uuid',
    //                 description: 'The project ID'
    //             },
    //             periodId: {
    //                 type: 'string',
    //                 format: 'uuid',
    //                 description: 'Optional period ID to filter adjustments'
    //             },
    //             adjustmentTypeId: {
    //                 type: 'string',
    //                 format: 'uuid',
    //                 description: 'Optional adjustment type ID to filter (e.g., PAJE, TAJE)'
    //             }
    //         },
    //         required: ['projectId']
    //     }
    // },
    // {
    //     name: 'create_adjustment',
    //     description: 'Create a new adjustment (journal entry) with line items. Validates that debits equal credits and the period is not locked.',
    //     inputSchema: {
    //         type: 'object',
    //         properties: {
    //             projectId: {
    //                 type: 'string',
    //                 format: 'uuid',
    //                 description: 'The project ID'
    //             },
    //             periodId: {
    //                 type: 'string',
    //                 format: 'uuid',
    //                 description: 'The accounting period ID'
    //             },
    //             adjustmentTypeId: {
    //                 type: 'string',
    //                 format: 'uuid',
    //                 description: 'The adjustment type ID'
    //             },
    //             name: {
    //                 type: 'string',
    //                 description: 'Name/title of the adjustment'
    //             },
    //             description: {
    //                 type: 'string',
    //                 description: 'Detailed description of the adjustment'
    //             },
    //             lineItems: {
    //                 type: 'array',
    //                 description: 'Line items for the journal entry (debits must equal credits)',
    //                 items: {
    //                     type: 'object',
    //                     properties: {
    //                         accountId: {
    //                             type: 'string',
    //                             format: 'uuid',
    //                             description: 'The account ID'
    //                         },
    //                         debit: {
    //                             type: 'number',
    //                             description: 'Debit amount (use 0 if credit)',
    //                             minimum: 0
    //                         },
    //                         credit: {
    //                             type: 'number',
    //                             description: 'Credit amount (use 0 if debit)',
    //                             minimum: 0
    //                         },
    //                         memo: {
    //                             type: 'string',
    //                             description: 'Optional memo for this line item'
    //                         }
    //                     },
    //                     required: ['accountId', 'debit', 'credit']
    //                 },
    //                 minItems: 2
    //             }
    //         },
    //         required: ['projectId', 'periodId', 'adjustmentTypeId', 'name', 'lineItems']
    //     }
    // },
    // {
    //     name: 'get_chart_of_accounts',
    //     description: 'Retrieve the full chart of accounts organized by entity and account group.',
    //     inputSchema: {
    //         type: 'object',
    //         properties: {
    //             projectId: {
    //                 type: 'string',
    //                 format: 'uuid',
    //                 description: 'The project ID'
    //             },
    //             entityId: {
    //                 type: 'string',
    //                 format: 'uuid',
    //                 description: 'Optional entity ID to filter accounts'
    //             }
    //         },
    //         required: ['projectId']
    //     }
    // },
    // {
    //     name: 'get_entity_structure',
    //     description: 'Retrieve entity ownership/consolidation hierarchy with ownership percentages.',
    //     inputSchema: {
    //         type: 'object',
    //         properties: {
    //             projectId: {
    //                 type: 'string',
    //                 format: 'uuid',
    //                 description: 'The project ID'
    //             },
    //             entityRelationshipSetId: {
    //                 type: 'string',
    //                 format: 'uuid',
    //                 description: 'Optional relationship set ID (uses default if not specified)'
    //             }
    //         },
    //         required: ['projectId']
    //     }
    // },
    // {
    //     name: 'get_period_summary',
    //     description: 'Get summary statistics for an accounting period including account counts, totals by type, and lock status.',
    //     inputSchema: {
    //         type: 'object',
    //         properties: {
    //             projectId: {
    //                 type: 'string',
    //                 format: 'uuid',
    //                 description: 'The project ID'
    //             },
    //             periodId: {
    //                 type: 'string',
    //                 format: 'uuid',
    //                 description: 'The accounting period ID'
    //             }
    //         },
    //         required: ['projectId', 'periodId']
    //     }
    // },
    // {
    //     name: 'search_accounts',
    //     description: 'Search accounts by name, number, or description with optional filters by entity or account group.',
    //     inputSchema: {
    //         type: 'object',
    //         properties: {
    //             projectId: {
    //                 type: 'string',
    //                 format: 'uuid',
    //                 description: 'The project ID'
    //             },
    //             query: {
    //                 type: 'string',
    //                 description: 'Search query (matches account name, number, or description)'
    //             },
    //             entityId: {
    //                 type: 'string',
    //                 format: 'uuid',
    //                 description: 'Optional entity ID to filter results'
    //             },
    //             accountGroupId: {
    //                 type: 'string',
    //                 format: 'uuid',
    //                 description: 'Optional account group ID to filter results'
    //             }
    //         },
    //         required: ['projectId', 'query']
    //     }
    // }
];
