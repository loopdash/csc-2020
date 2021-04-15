 (function($){
    //"use strict";
     function init(){
         $( 'nav a, a.scroll-to, .scroll-to a, .tosection, a[href="#top"], button.scroll-to' ).on( 'click', scrollTo );
         w.on( 'resize', resize );
         resize();
         $( '.mobile-toggle' ).on( 'click', toggle_menu );
         $( '.show-more-toggle' ).on( 'click', toggle_show_more );
         $( 'section' ).waypoint({
             handler: handle_waypoint,
             offset: 160,
         });

     }
     
     function toggle_show_more( e ){
         e.preventDefault();
         var button = $( e.target ),
             showMoreContainerId = button.attr( 'href' ),
             showMoreContainer = $( showMoreContainerId ),
             showMoreItems = showMoreContainer.find( '.show-more,.show-more-tease' ),
             showMoreFirst = showMoreItems.first();
         if ( showMoreFirst.hasClass( 'open' ) ){
             showMoreItems.removeClass( 'open' ).attr( 'aria-hidden', 'true' );
             button.text( 'Show More' ).attr( 'aria-expanded', 'false' ).removeClass( 'open' );
         } else {
             showMoreItems.addClass( 'open' ).attr( 'aria-hidden', 'false' );
             button.text( 'Show Less' ).attr( 'aria-expanded', 'true' ).addClass( 'open' );
         }
         
     }
     
     function handle_waypoint(direction) {
         
         var ndx = 'down' === direction ? 5 : 6,
             pct = ( $( this.element ).index() - ndx ) / $( 'section' ).length * 100;
         $( '.progress-bar' ).css( { width: pct + 'vw' } );
         if ( 'about' === this.element.id ) {
             if ( 'down' === direction ){
                 $( 'body' ).addClass( 'scrolled' );
             } else {
                 $( 'body' ).removeClass( 'scrolled' );
             }
             
         }
         if ( 'financials' === this.element.id ){
             if ( 'down' === direction ){
                $( '.donate-footer' ).removeClass( 'sticky-footer' );
             } else {
                $( '.donate-footer' ).addClass( 'sticky-footer' );
             }
         } else {
             $( '.donate-footer' ).addClass( 'sticky-footer' );
         }
         console.log(this.element.id + ' hit', direction, $( this.element ).index(), $( 'section' ).length, pct )
     }
     
     function toggle_menu( e ){
         e.preventDefault();
         if ( $( '.mobile-toggle' ).hasClass( 'open' ) ){
            $( '.mobile-nav-container' ).removeClass( 'open' ).attr( 'aria-hidden', true );
            $( '.mobile-toggle' ).removeClass( 'open' ).attr( 'aria-expanded', false );
        } else {
            $( '.mobile-nav-container' ).addClass( 'open' ).attr( 'aria-hidden', false );
            $( '.mobile-toggle' ).addClass( 'open' ).attr( 'aria-expanded', true );
        }
     }
     function resize(){
         //console.log( 'resize' );
         if ( $( '.breakflag' ).is( ':visible' ) ){
             if ( $( '.mobile-nav' ).length ){
                 $( '.primary-nav' ).detach().appendTo( '.primary-nav-container' ).removeClass( 'mobile-nav' );
             } else {
                 return;
             }
         } else {
             if ( $( '.mobile-nav' ).length ){
                 return;
             } else {
                 $( '.primary-nav' ).detach().appendTo( '.mobile-nav-container' ).addClass( 'mobile-nav' );
             }
         }
     }
     function scrollTo( e ){
        //console.log( 'scroll-to' );
        e.preventDefault();
        var el      = $( e.currentTarget ),
            target  = el.attr( 'href' ),
            adjust  = undefined === el.data( 'adjust' ) ? ( $( '.breakflag' ).is( ':visible' ) ? 160 : 90 ) : parseInt( el.data( 'adjust' ) ),
            offset  = target && $( target).length ? $(target).offset().top - adjust : 0,
            container = $( 'html, body' );
        container.animate( { scrollTop: offset }, 'slow', function(){
            history.replaceState( null, null, ' ' );
        } );      
       $( '.mobile-nav-container,.mobile-toggle' ).removeClass( 'open' );
       $( '.mobile-nav-container' ).attr( 'aria-hidden', true )
       $( '.mobile-toggle' ).attr( 'aria-expanded', false )
    }
    var w = $( window );
    $( document ).ready( init );
})(jQuery);