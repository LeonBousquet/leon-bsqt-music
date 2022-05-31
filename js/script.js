/*

Script  : Main Script JS
Version : 1.0
Author  : Surjith S M
URI     : http://themeforest.net/user/surjithctly

Copyright © All rights Reserved
Surjith S M / @surjithctly

*/


$(function() {

    "use strict";

    /*======= SLICK SLIDER ========*/


    if ($('.header-slider').length) {

        $('.header-slider').on('init', function(event, slick) {
            $(this).css('height', 'auto');
        });

        $('.header-slider').slick({
            infinite: true,
            fade: true,
            cssEase: 'linear',
            autoplay: true,
            dots: true
        });
    }

    if ($('.testimonial-slider').length) {

        $('.testimonial-slider').on('init', function(event, slick) {
            $(this).css('height', 'auto');
        });

        $('.testimonial-slider').slick({
            cssEase: 'linear',
            autoplay: true,
            dots: true
        });
    }

    /*======= HIDE LOADER ON CLICK ========*/

    // helpful incase the user is bored of loading
    // and want to see actual content

    $('#page-loader').on('click', function() {
        $(this).fadeOut();
        $("body").removeClass("preload");
    });
    // automatically hide loading if it takes too much time (eg: JS Error)

    setTimeout(function() {
        $('#page-loader').fadeOut();
        $("body").removeClass("preload");
    }, 10000);


    /* ================================================
       Parallax
       ================================================ */

    var query = Modernizr.mq('(min-width: 900px)');
    if (query) {
        // the browser window is larger than 900px
        if ($('.has-parallax').length && jQuery().parallax) {
            $('.has-parallax').parallax({
                speed: 0.30
            });
        }
    }



    if ($('.particle').length) {
        var rellax = new Rellax('.particle', { center: true });
    }


    /* ================================================
       Album Apple TV Parallax Hover Effect
       ================================================ */
    if ($('.atvImg').length && $.isFunction(atvImg)) {
        atvImg();
    }

    /* ================================================
       Fixed Audio Player
       ================================================ */
    if ($('.audio-player').length) {

        var myPlaylist = new jPlayerPlaylist({
            jPlayer: "#jquery_jplayer_1",
            cssSelectorAncestor: "#jp_container_1"
        }, [{
            title: "LONE STAR STATE ⭐",
            artist: "Leon Bousquet",
            mp3: "songs/mp3/LONE-STAR-STATE.mp3",
            oga: "songs/ogg/LONE-STAR-STATE.ogg"
        }, {
            title: "W.O.L.F",
            artist: "Leon Bousquet",
            mp3: "songs/mp3/FURY.mp3",
            oga: "songs/ogg/FURY.ogg"
        }, {
            title: "Breathin'",
            artist: "Leon Bousquet",
            mp3: "songs/mp3/Breathin.mp3",
            oga: "songs/ogg/Breathin.ogg"
        }], {
            swfPath: "js/plugins",
            supplied: "oga, mp3",
            wmode: "window",
            useStateClassSkin: true,
            autoBlur: false,
            smoothPlayBar: true,
            keyEnabled: true,
            playlistOptions: {
                autoPlay: false // Change to true to start playing songs on page load
            }
        }); // end jplayer initiate

        /* ======== Other Audio Player Functions ======== */

        $("#jquery_jplayer_1").on(
            $.jPlayer.event.ready + ' ' + $.jPlayer.event.play,
            function(event) {

                /* === ENABLE PLAYLIST ==== */

                var current = myPlaylist.current;
                var playlist = myPlaylist.playlist;
                $.each(playlist, function(index, obj) {
                    if (index == current) {
                        $(".jp-now-playing").html("<div class='jp-track-name'>" + obj.title + "</div> <div class='jp-artist-name'>" + obj.artist + "</div>");

                    }
                });

                /* === VOLUME DRAGGING ==== */

                $('.jp-volume-bar').mousedown(function() {
                        var parentOffset = $(this).offset(),
                            width = $(this).width();
                        $(window).mousemove(function(e) {
                            var x = e.pageX - parentOffset.left,
                                volume = x / width
                            if (volume > 1) {
                                $("#jquery_jplayer_1").jPlayer("volume", 1);
                            } else if (volume <= 0) {
                                $("#jquery_jplayer_1").jPlayer("mute");
                            } else {
                                $("#jquery_jplayer_1").jPlayer("volume", volume);
                                $("#jquery_jplayer_1").jPlayer("unmute");
                            }
                        });
                        return false;
                    })
                    .mouseup(function() {
                        $(window).unbind("mousemove");
                    });

                /* === ENABLE DRAGGING ==== */

                var timeDrag = false; /* Drag status */
                $('.jp-play-bar').mousedown(function(e) {
                    timeDrag = true;
                    updatebar(e.pageX);
                });
                $(document).mouseup(function(e) {
                    if (timeDrag) {
                        timeDrag = false;
                        updatebar(e.pageX);
                    }
                });
                $(document).mousemove(function(e) {
                    if (timeDrag) {
                        updatebar(e.pageX);
                    }
                });

                //update Progress Bar control
                var updatebar = function(x) {

                    var progress = $('.jp-progress');
                    //var maxduration = myPlaylist.duration; //audio duration

                    var position = x - progress.offset().left; //Click pos
                    var percentage = 100 * position / progress.width();

                    //Check within range
                    if (percentage > 100) {
                        percentage = 100;
                    }
                    if (percentage < 0) {
                        percentage = 0;
                    }

                    $("#jquery_jplayer_1").jPlayer("playHead", percentage);

                    //Update progress bar
                    $('.jp-play-bar').css('width', percentage + '%');
                };

                /* === Playlist Functions ==== */

                $('#playlist-toggle, #playlist-text, #playlist-wrap li a').unbind().on('click', function() {
                    $('#playlist-wrap').fadeToggle();
                    $('#playlist-toggle, #playlist-text').toggleClass('playlist-is-visible');
                });

                /*Hide Player*/
                $('.hide_player').unbind().on('click', function() {
                    $('.audio-player').toggleClass('is_hidden');
                    $(this).html($(this).html() == '<i class="fa fa-angle-down"></i> HIDE' ? '<i class="fa fa-angle-up"></i> SHOW PLAYER' : '<i class="fa fa-angle-down"></i> HIDE');
                });

                // Play Audio From media Page
                $('.audio-play-btn').unbind().on('click', function() {
                    $('.audio-play-btn').removeClass('is_playing');
                    $(this).addClass('is_playing');
                    var playlistId = $(this).data('playlist-id');
                    myPlaylist.play(playlistId);
                });
            }); // end jplayer event ready
    }
    /* ================================================
       On Scroll Menu
       ================================================ */

    $(window).scroll(function() {
        if ($(window).scrollTop() > 100) {
            $('.js-on-scroll').addClass('menu-is-scrolling');
        } else {
            $('.js-on-scroll').removeClass('menu-is-scrolling');
        }
    });

    /* ================================================
       Other Scroll Functions
       ================================================ */

    /**
     * BACK TO TOP
     */

    $(window).scroll(function() {
        if ($(window).scrollTop() > 1000) {
            $('.back_to_top').fadeIn('slow');
        } else {
            $('.back_to_top').fadeOut('slow');
        }
    });

    /**
     * ONE PAGE SCROLL
     */

    $('.navbar-nav a, .back_to_top').on('click', function(e) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 50
        }, 1000);
        e.preventDefault();
    });

    /*------------  ------------ */



    /* ================================================
       Magnific popup
       ================================================ */

    if ($('.image-link').length) {

        $('.image-link').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    }



    /* ================================================
       Magnific popup Video
       ================================================ */

    if ($('.mfp-youtube').length) {
        $('.mfp-youtube').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 0,
            preloader: false,
            fixedContentPos: false,

        });
    }



    /* ================================================
       Modernizr
       ================================================ */

    if (!Modernizr.objectfit) {
        $('.object-fit-container').each(function() {
            var $container = $(this),
                imgUrl = $container.find('img').prop('src');
            if (imgUrl) {
                $container
                    .css('backgroundImage', 'url(' + imgUrl + ')')
                    .addClass('compat-object-fit');
            }
        });
    }


    /* ================================================
       Initialize Countdown
       ================================================ */

    /*Fetch Event Date From HTML via data-* attr */

    var get_date = $('#countdown').data('event-date');
    /*init*/
    if (get_date) {

        $("#countdown").countdown({
            date: get_date,
            /*Change date and time in HTML data-event-date attribute */
            format: "on"
        });
    }

}); // End jQuery Function XXXXXXXXXXXXXXXXXXXXXXXX

/* ================================================
   REMOVE LOADING
   ================================================ */
$(window).load(function() {
    $('#page-loader').fadeOut();
    $("body").removeClass("preload");
});


/* ================================================
   Twitter Widget
   ================================================ */

window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function(f) {
        t._e.push(f);
    };

    return t;
}(document, "script", "twitter-wjs"));
