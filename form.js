$(document).ready(function(){
	//changes Post URL title, specs, and adds Image Link input field
        function displayPostType()
        {
		//changes Post URL title
                var select_post = $("#select-post").val();
                if (select_post == "0")
                        select_post = "Post";
                $(".post-type").text(select_post + " URL:");
                var specs = "";

		//accounts for different post types
                switch(select_post)
                {
                        case "Image":
				//Adds specs on each type of input
                                specs = "URL should end with a valid image extension (.jpg, .png, .jpeg, etc.)";

				//Adds an extra input field to posts with an Image -- called Link
				$("#link").attr('type','text');
				$("#link").next("p").andSelf().wrapAll('<div class="controls" id="link_wrap"/>');
				$("#link").parent().wrap('<div class="control-group" id="link_wrap_two"/>');
				$("#link").parent().before('<label class="post-type control-label link">Image Link:</label>');
				$("#link_wrap_two").after('<p class="img_link_specs" style="margin: -25px 0 10px;"></p>');
				$(".img_link_specs").text("What do you want your picture to link to?");
                                break;
                        case "YouTube":
                                specs = "ex: http://www.youtube.com/watch?v=__D5qBvr2Cw";
				removeImgLink();
                                break;
                        case "Vimeo":
                                specs = "ex: http://vimeo.com/71893945";
				removeImgLink();
                                break;
                        case "Vine":
                                specs = "ex: https://vine.co/v/hZmEpe0mV7I";
				removeImgLink();
                                break;
			default:
				removeImgLink();
				
                }
                $(".specs").text(specs);
		$(".specs").css("margin","-25 0 0");

		//removes img link text box when post type is not Image
		function removeImgLink(){
			var cnt = $("#link_wrap_two").contents();
			$("#link_wrap_two").replaceWith(cnt);
			cnt = $("#link_wrap").contents();
			$("#link_wrap").replaceWith(cnt);
			$(".img_link_specs").remove();
			$("label.link").remove();	
			$("#link").attr('type','hidden');
			$("#error.link").text('');
		}
        }
	//load function upon loading document and everytime the input changes
	$(document).ready(displayPostType);
        $("select").change(displayPostType);


	//Using JSON-API for wordpress...used to generate tag list
	$.getJSON('http://eric_r.scripts.mit.edu/wp/?json=get_tag_index',function(data)
	{
		//Add all tags to page
		data = data.tags;
		for(var i=0;i<data.length;i++)
		{
			var tag = data[i].slug;
			$(".control-group:last").before('<a href="#"><span class="label label-info tag active" id='+tag+'>' + tag.charAt(0).toUpperCase() + tag.slice(1) + '</span></a>');
		}
		//sort tags by post count and change the top ten most frequently used to dark blue background
		data = sortByKey(data,'post_count');
		for(var i=0;i<10;i++)
		{
			var tag = data[i].slug;
			$("#"+ tag).addClass("top");
			$("#"+ tag).css("background-color","rgb(66, 54, 131)");
			$("#"+ tag).hover(function() { $(this).css("background-color","#3BB1EE");}, function() { $(this).css("background-color","rgb(66, 54, 131)");});
		}	

		//When a tag is clicked
		$('.tag').click(function() 
		{
			var tag = $(this).text();
			//If a tag hasn't been chosen before
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
			//Make tag 'active' again
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
	
	//quick sort function by chosen key
	function sortByKey(array, key) {
	    return array.sort(function(a, b) {
		var x = a[key]; var y = b[key];
		return ((x < y) ? 1 : ((x > y) ? -1 : 0));
	    });
	}	

}); 
