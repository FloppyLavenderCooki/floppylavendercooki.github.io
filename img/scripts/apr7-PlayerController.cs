using System;
using UnityEngine;
using UnityEngine.InputSystem;

public class PlayerController : MonoBehaviour {
    [SerializeField] private Rigidbody rb;
    [SerializeField] private new Transform camera;

    private InputAction MoveAction;
    private InputAction JumpAction;

    private float XInput;
    private float YInput;

    public float MoveSpeed = 50f;
    public float JumpForce = 50f;
    
    void Start() {
        MoveAction = InputSystem.actions.FindAction("Move");
        JumpAction = InputSystem.actions.FindAction("Jump");
    }

    void Update() {
        // movement
        XInput = MoveAction.ReadValue<Vector2>().x;
        YInput = MoveAction.ReadValue<Vector2>().y;

        if (JumpAction.WasPressedThisFrame()) {
            rb.linearVelocity = new Vector3(rb.linearVelocity.x, JumpForce, rb.linearVelocity.z);
        }
    }

    private void FixedUpdate() {
        // movement
        rb.transform.rotation = Quaternion.Euler(0f, camera.eulerAngles.y, 0f);

        float inputH = XInput * MoveSpeed;
        float inputV = YInput * MoveSpeed;

        Vector3 playerF = rb.transform.forward;
        playerF.y = 0f;
        Vector3 cameraR = camera.transform.right;
        cameraR.y = 0f;

        Vector3 forwardRel = inputV * playerF;
        Vector3 rightRel = inputH * cameraR;

        Vector3 moveDir = forwardRel + rightRel;

        rb.linearVelocity = new Vector3(moveDir.x, rb.linearVelocity.y, moveDir.z);
    }
}