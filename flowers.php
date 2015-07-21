<?php

	header('Content-type: application/json');

	$files = glob('img/*');

	foreach ($files as $genus) {
		$photos = array();

		$photos[$genus] = array();
		for ($i = 0; $i < count($genus); $i++) {
			$photos[$genus][$i] = scandir($genus)[$i];
		}

		print(json_encode($photos)); 
	}

?>