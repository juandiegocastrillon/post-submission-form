<!DOCTYPE>
<html>
<head>
    <link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link href="./form_style.css" rel="stylesheet" media="screen">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>

</head>
<body>
	<div class="input_box">
		<p id="success">Success!</p>
		<p>Your post has been submitted for review. Check back to the Gallery in the future to see your post.</p>
		<?php 
			$post_type =  $_POST['post-type']; 
			$url = $_POST['url'];
			$subtitle = $_POST['subtitle'];
			$tags = $_POST['tags'];
			
			$content = "";

			switch ($post_type)
			{
				case "Image":
				  $img_link = $_POST['link'];
				  $content .= '<p class="img_enveloper" style="background-image: url('   . $url . ');">';
				  $content .= '<a href="' . $img_link . '"><img class="alignnone" alt="" src="'  . $url .  '" /></a></p>';
				  break;
				
				case "YouTube":
				  $content .= $url;
				  break;
				
				case "Vimeo":
				  $len = strlen("vimeo.com");
				  $index = strrpos($url,"/",$len) + 1;
				  $id = substr($url, $index);
				  $content .= '[vimeo clip_id=' . $id . ' title=0 byline=0 portrait=0]';
				  break;
				
				case "Vine":
				  $content .= '<iframe id="eFrame" src="' . $url . '/embed/simple" width="320" height="320" frameborder="0"></iframe>';
				  break;
			
				default:
				  echo "It's broken";
			}
			
			$content .= ' <br>' . $subtitle;
			$content .= ' tags: ' . $tags ;

			$to = "n3jw0czv@s92826500.onlinehome.us";
			$subject = $subtitle;
			$message = $content;
			$from = "craziness@hotmail.com";
			$headers = "From:" . $from;
			
			//mail form
			//mail($to,$subject,$message,$headers);
			echo "Mail Sent";
		?>	  
		<p>Content: <?php echo $content ?> </p>

	</div>

</body>
</html>
