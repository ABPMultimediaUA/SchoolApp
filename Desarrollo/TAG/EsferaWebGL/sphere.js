window.addEventListener('load', function() {
    var black = new Pre3d.RGBA(0, 0, 0, 1);

    var screen_canvas = document.getElementById('canvas');
    var renderer = new Pre3d.Renderer(screen_canvas);

    var sphere = Pre3d.ShapeUtils.makeSphere(10,30,20);

    function draw() {
      renderer.fill_rgba = new Pre3d.RGBA(0,255,0,0.2);
      renderer.bufferShape(sphere);

      renderer.ctx.setFillColor(0, 0, 0, 1);
      renderer.drawBackground();

      renderer.drawBuffer();
      renderer.emptyBuffer();
    }

    renderer.camera.focal_length = 2.5;

    // Have the engine handle mouse / camera movement for us.
    DemoUtils.autoCamera(renderer, 0, 0, -30, 0.40, -1.06, 0, draw);

    draw();
}, false);