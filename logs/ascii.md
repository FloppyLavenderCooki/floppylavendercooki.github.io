# Image/Video to ASCII
<input type="file" id="img" name="img" accept="image/*, .zip"></input> 
<label for="res">Resolution: </label>
<input type="number" id="res" name="res" min="1" max="16" value="4"></input> 
<label>Aspect Ratio: </label>
<input type="number" id="aspect-x" name="aspect-x" min="1" max="16" value="16"></input>
<input type="number" id="aspect-y" name="aspect-y" min="1" max="9" value="9"></input>
<label for="colour">Colour: <input type="checkbox" id="colour" name="colour"></input></label>
<label for="brightness">Brightness Added: <input type="number" id="brightness" name="brightness" min="-255" max="255" value="0"></input></label>
<p id="ascii" class="jb-mono-800"></p>
<br>
<br>
<canvas id="canvas"></canvas>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js" integrity="sha512-XMVd28F1oH/O71fzwBnV7HucLxVwtxf26XV8P4wPk26EDxuGZ91N8bsOttmnomcCD3CS5ZMRL50H0GgOHvegtg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="../scripts/ascii.js"></script>