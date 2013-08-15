<!DOCTYPE>
<html>
<head>
    <link href="css/bootstrap.min.css" rel="stylesheet" media="all" />
    <link href="./form_style.css" rel="stylesheet" media="all" />
    <script src="js/bootstrap.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script src="./form.js"></script>
</head>
<body>
<?php
        if ($_SERVER["REQUEST_METHOD"] == "POST"){

                $errormsg = array(
                        "url_errormsg" => "",
			"lin_errormsg" => "",
                        "sub_errormsg" => "",
                        "tag_errormsg" => ""
                );

                $fields = array("url","link","subtitle","tags");

                //Check if URL, subtitle, tag fields are empty
                foreach ($fields as $field)
                {
		//	if (in_array($field,$_POST)){
				if($_POST[$field]){
					continue;
				}
				else { $errormsg[substr($field,0,3) . "_errormsg"] = "Please enter a ".$field; }
		//	}
                }

                //Check if Valid URL
                if( empty($errormsg["url_errormsg"]) && !filter_var($_POST['url'],FILTER_VALIDATE_URL)){
                        $errormsg["url_errormsg"] = "Please enter a valid URL";
                }

                //Check if Youtube URL is valid
                if( empty($errormsg["url_errormsg"]) && $_POST['post-type'] == "YouTube" && !strstr($_POST['url'],"youtube")){
                        $errormsg["url_errormsg"] = "Please enter a valid YouTube URL";
                }

                //Check if Vimeo URL is valid
                if( empty($errormsg["url_errormsg"]) && $_POST['post-type'] == "Vimeo" && !strstr($_POST['url'],"vimeo.com")){
                        $errormsg["url_errormsg"] = "Please enter a valid Vimeo video URL";
                }
                //Check if Vine URL is valid
                if( empty($errormsg["url_errormsg"]) && $_POST['post-type'] == "Vine" && !strstr($_POST['url'],"vine")){
                        $errormsg["url_errormsg"] = "Please enter a valid Vine URL";
                }


	}
?>
	<div class="input_box">
	<form class="form-horizontal" action="form.php" method="post" id="form">
	<select id="select-post" name="post-type">
	  <option value="0" <?=($_POST['post-type']==0)?" selected":""?> >Select post type:</option>
	  <option value="Image" <?=($_POST['post-type']=="Image")?" selected":""?> >Image</option>
	  <option value="YouTube" <?=($_POST['post-type']=="YouTube")?" selected":""?> >YouTube Video</option>
	  <option value="Vimeo" <?=($_POST['post-type']=="Vimeo")?" selected":""?>>Vimeo Video</option>
	  <option value="Vine" <?=($_POST['post-type']=="Vine")?" selected":""?>>Vine Video</option>
	</select>
	<div class="break"></div>
	  <div class="control-group">
	    <label class="post-type control-label">Post URL:</label>
	    <div class="controls">
	      <input type="text" id="url" name="url" placeholder="Paste URL" value="<?php echo isset( $_POST['url']) ? $_POST['url'] : '' ?>">
	      <p id="error"><?php echo $errormsg["url_errormsg"]; ?></p>
	    </div>
	  </div>
	  <p class="specs"></p>
	  <div class="control-group">
	    <label class="control-label">Subtitle:</label>
	    <div class="controls">
	      <input type="text" id="subtitle" name="subtitle" placeholder="Enter Text..." value="<?php echo isset( $_POST['subtitle']) ? $_POST['subtitle'] : '' ?>">
	      <p id="error"><?php echo $errormsg["sub_errormsg"]; ?></p>
	    </div>
	  </div>
	  <div class="control-group">
	    <label class="control-label">Tag(s):</label>
	    <div class="controls">
	      <input type="text" id="tags" name="tags" placeholder="Select Below or Enter Text..."value="<?php echo isset( $_POST['tags']) ? $_POST['tags'] : '' ?>">
	      <p id="error"><?php echo $errormsg["tag_errormsg"]; ?></p>
	    </div>
	  </div>
	  <p class="tag_specs">Separate with commas</p>
	  <div class="control-group">
	    <div class="controls">
	      <input type="submit" class="btn" >
	    </div>
	  </div>
	</form>
	</div>
<?php
        if ($_SERVER["REQUEST_METHOD"] == "POST"){
                if(!array_filter($errormsg)) {
			echo'<script>$(\'form\').get(0).setAttribute(\'action\',\'confirmation.php\');</script>';
			echo '<script>$(\'form\').submit();</script>';
		}
	}
?>
</body>
</html>