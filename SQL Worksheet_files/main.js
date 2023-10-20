define( [ "./AsyncParser.js" ], function( AsyncParser ) {
    /**
     * Translated strings for the error message
     * @type {Object}
     */
     const error_string = {
        expected: "Expected",
        found: "Found"
    };

    /**
     * Formats the received error content
     * @param {Object} error - Error received from the AsyncParser
     * @return {string} - Formated error message
     */
    function formatErrorMsg( error ) {
        const _error = error || {};
        _error.expected = _error.expected || [];
        _error.found = _error.found || '';

        const expected = [];
        for( const item of _error.expected ) {
            // Left padding for the message styling
            expected.push(`    ${ item }`);
        }

        const message = [`${ error_string.expected }`,
                            ...expected,
                        `${ error_string.found } ${ _error.found }`
                    ].join('\n');

        return message
    }


    /**
     * Transalated string for the unexpected symbol
     * @type {string}
     */
     const unexpectedSymbolStr = "Unexpected Synbol";


    /**
     * Look for errors using the AsyncParser and returning them in a promise
     * resolving an array of errors
     * @function getParsingErrors
     * @param {string} query - Text to be analyzed
     */
    const getParsingErrors = ( query ) => new Promise(( resolve, reject ) => {
        // Look for errors usign the AsyncParser
        AsyncParser( query )
            .then( res => {
                const errors = [];

                if( res.errors ) {
                    for(const error of res.errors) {
                        error.range = {
                            start: {
                                line: error.line,
                                column: error.column
                            },
                            end: {
                                line: error.line,
                                column: error.column + error.found.length
                            }
                        };

                        error.options = {
                            message: formatErrorMsg(error),
                            marginHoverMessage: `&nbsp;${ unexpectedSymbolStr }&nbsp;`
                        };

                        errors.push( error );
                    }
                }
                resolve( errors );
            })
    });

    const exports = {
        getParsingErrors: getParsingErrors
    }

    return exports;
} );
