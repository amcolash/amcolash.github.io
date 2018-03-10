particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 120
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#999"
            },
            "polygon": {
                "nb_sides": 5
            }
        },
        "opacity": {
            "value": 0.4
        },
        "size": {
            "value": 2
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.3,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 1,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    canvas: {
        w: "100%",
        h: "350px"
    },
    "retina_detect": true
});

var update = function () {
    requestAnimationFrame(update);
};

requestAnimationFrame(update);