$(function () {
    'use strict';

    paper.install(window);
    paper.setup(document.getElementById('mainCanvas'));

    var tool = new Tool();

    var c = Shape.Circle(200, 200, 80);
    c.fillColor = 'black';
    var text = new PointText(200, 200);
    text.justification = 'center';
    text.fillColor = 'white';
    text.fontSize = 20;
    text.content = 'hello world';

    tool.onMouseDown = function (event) {
        var c = Shape.Circle(event.point, 20);
        c.fillColor = 'green';
    };

    paper.view.draw();
});