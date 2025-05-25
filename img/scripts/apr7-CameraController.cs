using System;
using UnityEngine;
using UnityEngine.InputSystem;


public class CameraController : MonoBehaviour {
    private InputAction lookAction;
    
    public float mouseSensitivity = 1f;

    [SerializeField] private Camera playerCam;

    [Range(-90f, 90f)] private float cameraY;
    private float cameraX;
    
    void Start() {
        LockCursor();
        lookAction = InputSystem.actions.FindAction("Look");
    }

    private void Update() {
            Vector2 lookInput = lookAction.ReadValue<Vector2>();

            float inputY = lookInput.y * mouseSensitivity;
            float inputX = lookInput.x * mouseSensitivity;
            
            if (cameraY - inputY < 90f && cameraY - inputY > -90f) {
                cameraY -= inputY;
            }

            cameraX += inputX;

            transform.rotation = Quaternion.Euler(cameraY, cameraX, 0f);
    }

    public void LockCursor() {
        Cursor.lockState = CursorLockMode.Locked;
    }
}