(function() {

    var map, bumpMap, specularMap;

    var textureLoader = new THREE.TextureLoader()
    textureLoader.crossOrigin = "Anonymous"


    var webglEl = document.getElementById('webgl');

    if (!Detector.webgl) {
        Detector.addGetWebGLMessage(webglEl);
        return;
    }

    var width = window.innerWidth,
        height = window.innerHeight;

    // Earth params
    var radius = 0.5,
        segments = 32,
        rotation = 6;

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
    camera.position.z = 1.5;

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    scene.add(new THREE.AmbientLight(0x333333));

    var light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 3, 5);
    scene.add(light);

    var sphere = createSphere(radius, segments);
    sphere.rotation.y = rotation;
    scene.add(sphere)

    var clouds = createClouds(radius, segments);
    clouds.rotation.y = rotation;
    scene.add(clouds)

    var stars = createStars(90, 64);
    scene.add(stars);

    var controls = new THREE.TrackballControls(camera);

    webglEl.appendChild(renderer.domElement);

    render();

    function render() {
        controls.update();
        sphere.rotation.y += 0.0005;
        clouds.rotation.y += 0.0005;
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    var water_4k_url = "https://1.bp.blogspot.com/-bDMAMPD1OVg/X3Tk0ivOknI/AAAAAAAABSw/VH1d28lk30UAc76FNJArP4CTxfZ-cAW2QCLcBGAsYHQ/s2508/water_4k.png"
    var elev_bump_4k_url = "https://1.bp.blogspot.com/-kVpUWGOkNcg/X3TkzIubw2I/AAAAAAAABSg/rccIbFUJ2rIVo3D8ZMpxjPw2sbxoS3_wwCLcBGAsYHQ/s2508/elev_bump_4k.jpg"
    var no_clouds_4k_url = "https://1.bp.blogspot.com/-xfXuuz-u3G8/X3TkzBO2glI/AAAAAAAABSk/j49sJERxEnMk4KwdwkOdUdl_CNKnVKaSwCLcBGAsYHQ/s2508/2_no_clouds_4k.jpg"
    var fair_clouds_4k_url = "https://1.bp.blogspot.com/-2-yTx-Z5CSI/X3TkzuGJXAI/AAAAAAAABSo/biMaZkqyMUcP-anZ9DuyTDn0WGa_m33RQCLcBGAsYHQ/s2508/fair_clouds_4k.png"
    var galaxy_starfield_url = "https://1.bp.blogspot.com/-ZY6RbSxXgtI/X3Tk0cTYo6I/AAAAAAAABSs/_hej2IwInz07V1HDtIgwWBuMHrx6UFEMQCLcBGAsYHQ/s2508/galaxy_starfield.png"

    function createSphere(radius, segments) {
        return new THREE.Mesh(
            new THREE.SphereGeometry(radius, segments, segments),
            new THREE.MeshPhongMaterial({
                map: THREE.TextureLoader(no_clouds_4k_url),
                bumpMap: THREE.TextureLoader(elev_bump_4k_url),
                bumpScale: 0.005,
                specularMap: THREE.TextureLoader(water_4k_url),
                specular: new THREE.Color('grey')
            })
        );
    }

    function createClouds(radius, segments) {
        return new THREE.Mesh(
            new THREE.SphereGeometry(radius + 0.003, segments, segments),
            new THREE.MeshPhongMaterial({
                map: THREE.TextureLoader(fair_clouds_4k_url),
                transparent: true
            })
        );
    }

    function createStars(radius, segments) {
        return new THREE.Mesh(
            new THREE.SphereGeometry(radius, segments, segments),
            new THREE.MeshBasicMaterial({
                map: THREE.TextureLoader(galaxy_starfield_url),
                side: THREE.BackSide
            })
        );
    }

}());