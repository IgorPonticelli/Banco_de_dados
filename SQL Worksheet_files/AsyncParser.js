define( [ "jquery" ], function ( $ ) {
    var file = livesql.parserDirectory + "/Worker.js";
    var worker = new Worker( file );
    var ready = false;
    var idle = true;
    var queue = [];
    var id = 1;

    worker.onmessage = function( msg ){
        if ( msg.data === 'PARSER_READY' ) {
            ready = true;
        } else {
            finished( msg );
        }
        process();
    };

    function finished( msg ) {
        var req;
        for ( var i = 0; i < queue.length; i++ ) {
            req = queue[ i ];
            if ( req.id === msg.data.id ) {
                queue.splice( i, 1 );
                req.def.resolve( msg.data );
                break;
            }
        }
        idle = true;
    }

    function process() {
        var req = queue[ 0 ];
        if ( req && ready && idle ) {
            idle = false;
            worker.postMessage({
                id : req.id,
                start : req.start,
                source : req.source
            });
        }
    }
    function exports ( source, start ) {
        var def = $.Deferred();
        var req = {
            id : id++,
            source : source,
            start : start,
            def : def
        };
        queue.push( req );
        process();
        return def.promise();
    }

    return exports;
} );
