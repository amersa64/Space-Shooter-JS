#pragma strict
public var explosion: GameObject;
public var playerExplosion: GameObject;
//private var gameController: GameController;
public var scoreValue: int; 
function Start(){
//	var gameControllerObject : GameObject = GameObject.FindWithTag("GameController");
//	if(gameControllerObject != null){
//		gameController = gameControllerObject.GetComponent(GameController);
//	}
//	if (gameController == null){
//		Debug.Log("Cannot Find 'GameController' script");
//	}
}
function OnTriggerEnter (other :Collider){
	if(other.CompareTag("Boundary")){
		return;
	}
	Destroy(other.gameObject);
	Destroy(gameObject);
	if(other.tag == "Player"){
		Instantiate(playerExplosion, transform.position,transform.rotation);
		GameController.GameOver();
	}else{
		Instantiate(explosion, transform.position,transform.rotation);
		GameController.AddScore(scoreValue);
	}
}