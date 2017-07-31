#pragma strict

private var rb : Rigidbody;
private var Audio : AudioSource;
public var speed : float ;
public var tilt : float ;


//don't forget to make an instance of that class so you can access it
var boundary : Boundary;
public var shot : GameObject;
//this is not necessary you can just the object transform but
//for our understanding it is better to do it this way
public var shotSpawn: Transform ;
private var nextFire : float = 0.5;
private var myTime : float = 0.0;
public var fireDelta : float = 0.5;
//private var newProjectile : GameObject;
class Boundary{
    var xMin : float;
    var xMax : float;
    var zMin : float;
    var zMax : float;
}

 


function Start () {
	// we can not do this but everytime we wanna access a component we call 
	//but this is just to make things easier
	rb = GetComponent.<Rigidbody>();
	Audio = GetComponent.<AudioSource>();
}

function FixedUpdate () {
	var moveVertical = Input.GetAxis("Vertical");
	var moveHorizen = Input.GetAxis("Horizontal");
	var move = Vector3(moveHorizen, 0.0, moveVertical);
	rb.velocity = speed * move;
	rb.position = Vector3(
						Mathf.Clamp(rb.position.x, boundary.xMin, boundary.xMax),
						0,
						Mathf.Clamp(rb.position.z, boundary.zMin, boundary.zMax)
						);

	rb.rotation = Quaternion.Euler(0.0,0.0, rb.position.x * -tilt);
}

function Update() {
	myTime = myTime + Time.deltaTime;
	if ( Input.GetButton("Fire1") && (myTime > nextFire)) {
		nextFire = myTime+ fireDelta;
		//use this if you need access to the projectile
//		newProjectile = 
		Instantiate (shot,shotSpawn.position,shotSpawn.rotation);
		Audio.Play();
		//try shot, shotSpawn.position , shotSpawn.rotation
		//this is just to reset the time so it doesn't go so big
		nextFire = nextFire - myTime;
        myTime = 0.0;
        }
}
