function createCSVDownloadLink(selector){
    var downloadClass = 'download-table2CSV';
    function createLink(){
        var linkLabel = 'Download CSV';
        var $link = $('<a>');

        $link.attr( 'href', '#' );
        $link.addClass( downloadClass )
        $link.html( linkLabel );

        return $link[0];
    }

    function table2CSV($table){
        var output = '';

        var escapeCSV = function( txt ){

            if ( txt.indexOf( '"' ) > -1 ) {
                txt = txt.replace( /"/g,  '""' );
            } 

            if ( txt.indexOf( ',' ) > -1 ) {
                txt = '"' + txt + '"';
            }

            return txt;
        };

        $table.find('tr').each(function(i, e){
            var s = (i === 0) ? 'th' : 'td';

            var placeholder = [];
            $(this).find( s ).each(function(ci, ce){
                var val = escapeCSV( $(this).html() );
                placeholder.push( val );
            });

            output += placeholder.join(',');
            output += '\n';
        });

        return output;
    }

    $(selector).each(function(i, e){
        // Add link after it with action generate & download CSV
        $link = createLink();
        $(this).after( $link );
    });

    $( 'body' ).on( 'click', '.' + downloadClass, function () {
        var csv = encodeURIComponent( table2CSV( $(this).prev() ) );
        // setTimeout is required for Safari to work
        setTimeout( function(){
                apex.navigation.download('data:text/csv;charset=utf-8,' + csv );
            }, 10
        );
    });
}