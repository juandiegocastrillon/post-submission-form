$(document).ready(function(){
        function displayPostType()
        {
                var select_post = $("#select-post").val();
                if (select_post == "0")
                        select_post = "Post";
                $(".post-type").text(select_post + " URL:");
                var specs = "";
var value="<?php echo isset( $_POST[\'link\']) ? $_POST[\'link\'] : '' ?>"
		var img_link =          ' <label class="post-type control-label">Image Link:</label><div class="controls"><input type="text" id="link" name="link" placeholder="Paste link" ><p id="error"><?php echo $errormsg[\'lin_errormsg\']; ?></p></div>';
	

                switch(select_post)
                {
                        case "Image":
                                specs = "URL should end with a valid image extension (.jpg, .png, .jpeg, etc.)";
				$(".specs").after('<div class="control-group" id="img_link"></div>');
				$("#img_link").after('<p class="img_link_specs" style="margin: -25px 0 10px;"></p>');
				$("#img_link").html(img_link);
				$(".img_link_specs").text("What do you want your picture to link to?");
                                break;
                        case "YouTube":
                                specs = "ex: http://www.youtube.com/watch?v=__D5qBvr2Cw";
				$("#img_link").remove();
				$(".img_link_specs").remove();
                                break;
                        case "Vimeo":
                                specs = "ex: http://vimeo.com/71893945";
				$("#img_link").remove();
				$(".img_link_specs").remove();
                                break;
                        case "Vine":
                                specs = "ex: https://vine.co/v/hZmEpe0mV7I";
				$("#img_link").remove();
				$(".img_link_specs").remove();
                                break;
			default:
				$("#img_link").remove();
				$(".img_link_specs").remove();
				
                }
                $(".specs").text(specs);
		$(".specs").css("margin","-25 0 0");
        }
	$(document).ready(displayPostType);
        $("select").change(displayPostType);

	$.getJSON('http://eric_r.scripts.mit.edu/wp/?json=get_tag_index',function(data)
	{
		data = data.tags;
		for(var i=0;i<data.length;i++)
		{
			var tag = data[i].slug;
			$(".control-group:last").before('<a href="#"><span class="label label-info tag active" id='+tag+'>' + tag.charAt(0).toUpperCase() + tag.slice(1) + '</span></a>');
		}

		data = sortByKey(data,'post_count');
		for(var i=0;i<10;i++)
		{
			var tag = data[i].slug;
			$("#"+ tag).addClass("top");
			$("#"+ tag).css("background-color","rgb(66, 54, 131)");
			$("#"+ tag).hover(function() { $(this).css("background-color","#3BB1EE");}, function() { $(this).css("background-color","rgb(66, 54, 131)");});
		}	

		$('.tag').click(function() 
		{
			var tag = $(this).text();
			if($(this).hasClass('active')){
				$("#tags").val(function(i,origTxt){
					if(origTxt)
						return origTxt + ", " + tag;
					return tag;
				});
				$(this).css("background-color","gray");
				if($(this).hasClass("top")){
					$(this).hover(function() { $(this).css("background-color","gray");}, function() { $(this).css("background-color","gray");});
				}
				$(this).removeClass("active");
			}
			else{
				$("#tags").val(function(i,origTxt){
					if(origTxt.indexOf(', '+tag)>=0){
						return origTxt.replace(', '+tag,'');
					}
					else{
						if(origTxt.indexOf(tag+', ')>=0){
							return origTxt.replace(tag+', ','');
						}
					}
					return origTxt.replace(tag,'');
				});
				$(this).css("background-color","#3a87ad");
				if($(this).hasClass("top")) {
					$(this).hover(function() { $(this).css("background-color","#3BB1EE");}, function() { $(this).css("background-color","rgb(66, 54, 131)");});
				}
				$(this).addClass("active");
			}
		});
	});
	
	function sortByKey(array, key) {
	    return array.sort(function(a, b) {
		var x = a[key]; var y = b[key];
		return ((x < y) ? 1 : ((x > y) ? -1 : 0));
	    });
	}	

}); 
