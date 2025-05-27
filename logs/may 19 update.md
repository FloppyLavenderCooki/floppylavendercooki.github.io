# 🗓️ May 19

## Game
<div class="alt-image-layout">
<div>
    <img class="alt-image" src="/img/may19/big-ui.png" alt="old ui system">
    <p id="alt-text">The old UI system, the library is visible in bottom-left</p>
</div>
</div>

Above is the current UI (just a cursor) set up with Unity's old UI system. As you can see, the 2D
elements are in the 3D world space, causing there to be a giant box in the editor. It can also cause
flickering and objects covering up UI elements when the camera moves far from the origin. The level
is limited to a small area so it won't cause any flickering issues, but it's still better to switch
for the sake of the editor.

The new UI system is called UI Toolkit, and it works just like HTML and CSS.
<div class="alt-image-layout">
<div>
    <img class="alt-image" src="/img/may19/new-ui.png" alt="new ui system">
    <p id="alt-text">The UI toolkit editor window</p>
</div>
</div>
The cursor is a <code>VisualElement</code> which is the same as a <code>&lt;div&gt;</code> in HTML.
It has <code>border-radius</code> set to 16px causing it to be a circle. The cursor is 8x8 pixels
and is black with 75% opacity. The cursor is positioned in the center of the screen due to its parent
element using alignment set to the center.

Since the pixelation only affects object in the game world, the new UI is not pixelated. This can be fixed
in the future by using a texture for the cursor or possibly some special styling.

We need Arav to fix a few faces in the kiosk mesh as the normals are flipped, and Jarvis should be getting to
work on a book name generator.
