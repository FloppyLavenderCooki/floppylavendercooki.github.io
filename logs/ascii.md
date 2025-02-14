# Image/Video to ASCII
<input type="file" id="img" name="img" accept="image/*"></input> 
<label for="res">Resolution: </label>
<input type="number" id="res" name="res" min="1" max="16" value="4"></input> 
<label for="aspect-x">Aspect Ratio: </label>
<input type="number" id="aspect-x" name="aspect-x" min="1" max="16" value="16"></input>
<input type="number" id="aspect-y" name="aspect-y" min="1" max="9" value="9"></input>
<label for="colour">Colour: </label>
<input type="checkbox" id="colour" name="colour"></input>
<p id="ascii" class="jb-mono-800"></p>
<br>
<br>
<canvas id="canvas"></canvas>
<script src="../scripts/ascii.js"></script>