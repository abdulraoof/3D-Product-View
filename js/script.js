var textureImg = "models/ShoesColourGrey.jpg";

//Load product to the canvas
loadProduct();

function loadProduct(){
	var camera, controls, scene, renderer;
	init();
	animate();
}

function init(){

	//Scene
	scene = new THREE.Scene();

	//initializing camera
	var WIDTH = 400,
		HEIGHT = 300;

	var VIEW_ANGLE = 45,
		ASPECT = WIDTH/HEIGHT,
		NEAR = 0.1,
		FAR = 10000;

	camera = new THREE.PerspectiveCamera(
		VIEW_ANGLE,
		ASPECT,
		NEAR,
		FAR
	);
	camera.position.x = 3;
	camera.position.y = 33;
	camera.position.z = 50;
	camera.position.Y = 100;

	//Lights
	var pointLight1 = new THREE.PointLight(0xFFFFFF);
	pointLight1.position.y = 50;
	pointLight1.position.z = 100;
	pointLight1.intensity = 10;
	scene.add(pointLight1);

	var pointLight2 = new THREE.PointLight(0xFFFFFF);
	pointLight2.position.y = -50;
	pointLight2.position.z = -100;
	pointLight2.intensity = 10;
	scene.add(pointLight2);

	//initializing trackball controls
	controls = new THREE.TrackballControls( camera );

	controls.rotateSpeed = 3.0;
	controls.zoomSpeed = 1.2;
	controls.panSpeed = 0.8;

	controls.noZoom = false;
	controls.noPan = false;

	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;

	controls.addEventListener( 'change', render );
	scene.add(camera);

	//gird helper
	/*var size = 10;
    var step = 1;
    var gridHelper = new THREE.GridHelper( size, step );
    gridHelper.position.set( 10, 10, 0 );
    gridHelper.rotation.set( 45, 0, 0 );
    scene.add( gridHelper );*/

	//renderer
	var $container = $('#container');
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(WIDTH,HEIGHT);
	$container.append(renderer.domElement);
	renderer.setClearColor( 0xffffff, 1);

	//texture
	var manager = new THREE.LoadingManager();
	manager.onProgress = function (item, loaded, total) {
		console.log(item, loader, total);
	}
	var texture = new THREE.Texture();

	var loader = new THREE.ImageLoader(manager);
	loader.load(textureImg, function(image) {
		texture.image = image;
		texture.needsUpdate = true;
	});

	//model
	var loader = new THREE.OBJLoader(manager);
	loader.load('models/shoes.obj',function( object ){
		object.traverse(function( child ){
			if (child instanceof THREE.Mesh){
				child.material.map = texture;
				child.material.side = THREE.DoubleSide;
			}
		})
		scene.add(object);
	});

}

function animate(){
	render();
	requestAnimationFrame(animate);
	controls.update();
}

function render(){
	renderer.render(scene,camera);
	camera.lookAt( scene.position );
}

//Events handling to change color
$("#red").on('click', function(){
	$('#container').empty();
	textureImg = "models/ShoesColourRed.jpg";
	loadProduct();
});

$("#green").on('click', function(){
	$('#container').empty();
	textureImg = "models/ShoesColourGreen.jpg";
	loadProduct();
});

$("#yellow").on('click', function(){
	$('#container').empty();
	textureImg = "models/ShoesColourYellow.jpg";
	loadProduct();
});

$("#grey").on('click', function(){
	$('#container').empty();
	textureImg = "models/ShoesColourGrey.jpg";
	loadProduct();
});