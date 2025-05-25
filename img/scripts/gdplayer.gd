extends Node3D

var playerLook = Vector2(0.0, 0.0)
var lookSensitivity = 1
var speed = 50

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	Input.mouse_mode = Input.MOUSE_MODE_CAPTURED;

# Called every frame. 'delta' is the elapsed time since the previous frame.
#func _process(delta: float) -> void:
	#pass

func _input(event):
	if event is InputEventMouseButton and event.pressed:
		if event.button_index == MOUSE_BUTTON_LEFT:
			print("Left mouse button")
		if event.button_index == MOUSE_BUTTON_RIGHT:
			print("Left mouse button")
		if event.button_index == MOUSE_BUTTON_WHEEL_UP:
			print("Scroll wheel up")
		if event.button_index == MOUSE_BUTTON_WHEEL_DOWN:
			print("Scroll wheel down")
	elif event is InputEventMouseMotion:
		playerLook.x -= event.relative.y * 0.01
		playerLook.x = minf(maxf(playerLook.x, -1.5), 1.5)
		playerLook.y -= event.relative.x * 0.01
		
	rotation.x = playerLook.x * lookSensitivity
	rotation.y = playerLook.y * lookSensitivity
	
	if Input.is_action_just_released("close"):
		get_tree().quit()

func _physics_process(delta: float) -> void:
	var input = Input.get_vector("left", "right", "forward", "backward")
	var updown = Input.get_vector("up", "down", "up", "down")
	var dir = (global_transform.basis * Vector3(input.x, updown.x, input.y)).normalized()
	
	position.x += dir.x * (delta * speed)
	position.y += dir.y * (delta * speed)
	position.z += dir.z * (delta * speed)
