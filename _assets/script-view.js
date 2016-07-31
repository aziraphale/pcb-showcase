// Wait until everything's loaded (including all SVGs)
$(window).on('load', function() {
    // Find all PCB Layers on the page and run svg-pan-zoom on each of them.
    // No idea how widely the `forEach` function is supported among browsers, but meh.
    var panZoomObjs = [];
    document.querySelectorAll('.pcb-layer').forEach(function(layer){
        panZoomObjs.push(
            svgPanZoom('#' + layer.id, {
                zoomEnabled        : true,
                controlIconsEnabled: true,
                fit                : true,
                center             : true
            })
        );
    });

    // Update sizing & fit of SVGs when window is resized
    $(window).on('resize', function() {
        for (var i in panZoomObjs) {
            panZoomObjs[i].resize();
            panZoomObjs[i].fit();
            panZoomObjs[i].center();
        }
    });

    /**
     * Function from http://ariutta.github.io/svg-pan-zoom/demo/limit-pan.html
     *
     * Intention is to stop the user being able to pan the SVG completely out
     *  of view, but this implementation has a side-effect of completely
     *  breaking zooming in a way that results in each zoom shifting the board
     *  image around awkwardly :(
     */
    // var beforePan = function(oldPan, newPan) {
    //     var stopHorizontal = false,
    //         stopVertical = false,
    //         gutterWidth  = 100,
    //         gutterHeight = 100,
    //
    //         // Computed variables
    //         sizes        = this.getSizes(),
    //         leftLimit    = -((sizes.viewBox.x + sizes.viewBox.width) * sizes.realZoom) + gutterWidth,
    //         rightLimit   = sizes.width - gutterWidth - (sizes.viewBox.x * sizes.realZoom),
    //         topLimit     = -((sizes.viewBox.y + sizes.viewBox.height) * sizes.realZoom) + gutterHeight,
    //         bottomLimit  = sizes.height - gutterHeight - (sizes.viewBox.y * sizes.realZoom);
    //
    //     customPan = {};
    //     customPan.x = Math.max(leftLimit, Math.min(rightLimit, newPan.x));
    //     customPan.y = Math.max(topLimit, Math.min(bottomLimit, newPan.y));
    //
    //     return customPan
    // };
    // for (var i in panZoomObjs) {
    //     panZoomObjs[i].setBeforePan(beforePan);
    // }

    // Also need to enable mobile use via Hammer.js
    // See http://ariutta.github.io/svg-pan-zoom/demo/mobile.html
});
