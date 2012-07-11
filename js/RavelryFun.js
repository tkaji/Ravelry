var RavelryJS = (function() {
	var getDetailsDiv = function(project){
		var notes = '';
		if(project.notes != null && project.notes != undefined)
			notes = project.notes;
		else
			notes = '<p>  N/A  </p>';
		
		var detailsDiv = '<div class="detailsDiv" id="'+project.permalink+'">'
		+'<span id="title">'+project.name+'</span><hr />'
		+'<span id="notes">'+notes+'</span></div>';
		
		return detailsDiv;
	};
	var getThumbnailImg = function(thumbnail) {
		var thumbnailHtml = 'img\\missing.jpg';
		if(thumbnail == undefined || thumbnail == null)
			return thumbnailHtml;
		
		thumbnailHtml = thumbnail.src;
		return thumbnailHtml;	
	};
	return {
		createProjects : function(project) {
			var imgHtml = 
				'<img class="imgThumbnail" src="'+getThumbnailImg(project.thumbnail)+'"'
				+' onmouseover="return RavelryJS.showDetails(\''+$.trim(project.permalink)+'\');"'
				+' onclick="return RavelryJS.navigateProject(\''+$.trim(project.url)+'\');"'
				+' onmouseout="RavelryJS.resumeShow(\''+$.trim(project.permalink)+'\');"	/>';
			return imgHtml;
		},
		createDetailData : function(project) {
			var projectDetailHtml = getDetailsDiv(project);
			return projectDetailHtml;
		},
		navigateProject : function(url){
			var projwindow = window.open(url, '_blank', '', true);
			return false;
		},
		showDetails : function(id){
			$('.slideshow').cycle('pause');
			$('#'+id).show();
			$('#arrowdiv').show();
			return false;
		},
		resumeShow : function(id) {
			$('#'+id).hide();
			$('#arrowdiv').hide();
			$('.slideshow').cycle('resume');
		}
	};
})();

$(function() 
{
	$(document).ready(function()
	{
		$.getJSON("http://api.ravelry.com/projects/tinkcool/progress.json?key=b797913bede9dfdbb6ce168068115e9eee55c5a0&status=in-progress+hibernating+finished+frogged&notes=true&callback=?", function(data)
		{
			$.each(data.projects, function(i,project)
			{
				var imgData = RavelryJS.createProjects(project);
				var detailData = RavelryJS.createDetailData(project);
				$(imgData).appendTo("#myProjectImgs");
				$(detailData).appendTo("#myProjectDetails");
			});
			
			$('.slideshow').cycle({
				fx: 'fade'
			});
		});
	
		return false;
	});
});