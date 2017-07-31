#pragma strict
import UnityEngine.SceneManagement;
//variables for creating Astroids
public var hazard: GameObject[];
public  var spawnValues : Vector3;
public var hazardCount : int;
public var spawnWait: float;
public var startWait: float;
public var waveWait: float;
private static  var scoreText: GUIText;
private static var gameOverText: GUIText;
private static var restartText: GUIText;
private static var score: int;
private static var gameOver: boolean ;
private static var restart: boolean;

function Start(){
	gameOver = false;
	restart = false;
	restartText = GameObject.FindGameObjectWithTag("RestartText").GetComponent.<GUIText>();
	scoreText = GameObject.FindGameObjectWithTag("ScoreText").GetComponent.<GUIText>();
	gameOverText = GameObject.FindGameObjectWithTag("GameOverText").GetComponent.<GUIText>();
	restartText.text = "";
	gameOverText.text = "";
	score = 0;
	UpdateScore();
	SpawnWaves();
}
function Update(){
	if(restart && Input.GetKeyDown(KeyCode.R)){
			SceneManager.LoadScene("Main");
	}
}

function SpawnWaves(){
	//do this code by pieces
	yield WaitForSeconds (startWait);
	//then this to do waves
	while(true){
	//then this to do hazardcount
		for(var i:int = 0; i < hazardCount ; i++){
			if(gameOver){
				restartText.text = "Press 'R' to restart";
				restart = true;
				return;
			}
		//start this to spwan one
			var spawnPosition : Vector3 = Vector3(Random.Range(-spawnValues.x,spawnValues.x),spawnValues.y, spawnValues.z);
			var spawnRotation : Quaternion = Quaternion.identity;
			GameObject.Instantiate(hazard[Random.Range(0,hazard.length)], spawnPosition, spawnRotation);
			yield WaitForSeconds(spawnWait);
			}
		yield WaitForSeconds(waveWait);
		}
}
static function AddScore(newScoreValue: int){
	score+=newScoreValue;
	UpdateScore();

}
static function UpdateScore(){
	scoreText.text = "Score: " + score;
}
static function GameOver(){
	gameOverText.text = "Game Over!";
	gameOver = true;
}
//ends static class def