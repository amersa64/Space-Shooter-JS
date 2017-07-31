#pragma strict

public var tumble: float;
private var rb: Rigidbody;

function Start () {
	rb = GetComponent. <Rigidbody>();
	rb.angularVelocity = Random.insideUnitSphere * tumble;
}

