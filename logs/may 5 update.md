# 🗓️ May 5

## Game
Kieran added a Render Feature to the game to set up custom shader rendering.
For now, there's only a simple chromatic aberration effect, but the code will
be used as a base for more effects later on. He also updated the graphics to
be pixelated for the game style (requested by Jarvis).

<div class="alt-image-layout">
<div>
    <img class="alt-image" src="/img/may5/aberration.png" alt="chromatic aberration shader" />
    <p id="alt-text">The chromatic aberration shader shifts the red and blue pixel coordinates in opposite directions</p>
</div>
</div>

Arav (mostly) fixed the spherecast so now the player can jump properly. He added
throwing objects to the pickup controller so now the player can hold down to build up
and let go to release. The camera fov shrinks as the player holds down. There is a limit to
how long you can hold down, but you can keep it held there for as long as you want.

<div class="alt-image-layout">
<div>
    <img class="alt-image" src="/img/may5/throw.png" alt="chromatic aberration shader" />
    <img class="alt-image" src="/img/may5/throw-zoom.png" alt="chromatic aberration shader" />
    <p id="alt-text">Player holding cube (top), Player holding down button to throw cube (bottom)</p>
</div>
</div>

Jarvis updated the sprint code to make it seem more natural. He refactored some
code to be easier to use in the editor and made a quick fix for an item rotation bug.