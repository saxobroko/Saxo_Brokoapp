<!DOCTYPE html>
<html lang = 'en'>
	<head>
		<title>Chess</title>
		<meta charset = 'utf-8'/>
        <meta name = 'viewport' content = 'width=device-width, initial-scale=0.95, maximum-scale=0.95, user-scalable=yes'/>
		<link rel = 'icon' type = 'image/png' href = 'img/chesspieces/wikipedia/wR.png'/>
		<link rel = 'stylesheet' type = 'text/css' href = 'js/chessboard-0.3.0.min.css'/>
		<link rel = 'stylesheet' type = 'text/css' href = 'js/material.min.css'/>
		<link rel = 'stylesheet' type = 'text/css' href = 'https://fonts.googleapis.com/icon?family=Material+Icons'/>
		<!-- UI Libraries -->
		<script type = 'text/javascript' src = 'js/material.min.js'></script>
		<script type = 'text/javascript' src = 'js/jquery-1.12.4.min.js'></script>
		<script type = 'text/javascript' src = 'js/block.js'></script>
		<!-- chess libraries -->
		<script type = 'text/javascript' src = 'js/chess.min.js'></script>
		<script type = 'text/javascript' src = 'js/chessboard-0.3.0.min.js'></script>
		<!-- Firebase API -->
		<script type = 'text/javascript' src = 'https://www.gstatic.com/firebasejs/live/3.0/firebase.js'></script>
		<script type = 'text/javascript' src = 'https://www.gstatic.com/firebasejs/3.0.5/firebase-app.js'></script>
	  	<script type = 'text/javascript' src = 'https://www.gstatic.com/firebasejs/3.0.5/firebase-auth.js'></script>
	  	<script type = 'text/javascript' src = 'https://www.gstatic.com/firebasejs/3.0.5/firebase-database.js'></script>
		<!-- app -->
		<script type = 'text/javascript' src = 'app.js'></script>
		<style>
			@font-face {
				font-family: lsansuni;
				src: url('img/lsansuni.ttf');
			}

			* {
				font-family: "Lucida Sans Unicode", lsansuni, "Lucida Grande", "Helvetica", "Arial", sans-serif;
			}
		</style>
	</head>
	<body>
		<!-- chessroom -->
		<div id = 'loading' style = 'position: absolute; top: 0; left; 0; width: 100%; height: 100%; display: table; text-align: center; opacity: 1; transition: opacity 0.1s ease;'>
            <div style = 'display: table-cell; vertical-align: middle; margin: 0 auto;'>
				<img src = 'img/ripple.gif'/>
            </div>
        </div>
		<?php include_once($_SERVER['DOCUMENT_ROOT'].'/php/tracking.php');?>
		<?php include_once($_SERVER['DOCUMENT_ROOT'].'/php/cookies.php');?>
	</body>
</html>
