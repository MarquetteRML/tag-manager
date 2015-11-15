
var trackCall = setInterval(function () {
  var dummy = jQuery(".result-list-li");
  clearInterval(trackCall);
},500);

function dlpush(o, e){
	if (typeof(e) === "undefined") { e = 'eds_event'; }
	o['event'] = e;
	
	dataLayer.push(o);
}

function eventObj(c,a,l,e){
	if (typeof(e) === "undefined") { e = 'eds_event'; }
	var o = {'category'	  : c,
				     'action'	  : a,
				     'label'		: l};
	dlpush(o,e);			
}


    var results = jQuery(".result-list-li");
    
    jQuery(document).ready(function() {
      jQuery("a[title='EDSAnalytics']").css("display","none");
      results.each(function(){
          var customLinkUrl = jQuery(this).find("a[title='EDSAnalytics']").attr("href");
          if (customLinkUrl) {
            var targetURL = decodeURIComponent(customLinkUrl.substring(customLinkUrl.indexOf("&su=")+4));
            var an = targetURL.substring(targetURL.indexOf("an=")+3);
            an = an.substring(0,an.indexOf("&db="));
            var db = targetURL.substring(targetURL.indexOf("db=")+3);
            db = db.substring(0,db.indexOf("&journal="));
            var journal = targetURL.substring(targetURL.indexOf("journal=")+8);
            jQuery(this).find("a").click(function () {
                var reference = db+": "+an;
                eventObj('results', 'click', reference);
                eventObj('databases', 'click', db);
                if (journal.length > 0) {
                  eventObj('journals', 'click', decodeURIComponent(journal));
                }
            });
          }
      });
  
      var limiters = jQuery('.rl-limiters li');
      limiters.each(function(){
        var limiterId = jQuery(this).find("label").text().trim();
        if (jQuery(this).find("input:checked").size() > 0) {
          limiterId += " (unchecked)";
        }
        jQuery(this).click(function () {
        	eventObj('limiter', 'click', limiterId);
        });
        jQuery(this).find("a").click(function () {
        	eventObj('limiter', 'click', limiterId);
        });
        jQuery(this).find("input").click(function () {
            eventObj('limiter', 'click', limiterId);
        });
      });
      
      var appliedLimiters = jQuery('.selected-limiters li');
      appliedLimiters.each(function(){
        var limiterId = jQuery(this).text().trim();
        limiterId += " (unchecked via Breadbox)";
        jQuery(this).click(function () {
        	eventObj('breadbox', 'click', limiterId);
        });
      });    
          
      var dateRanges = jQuery('.publication-dates input');
      dateRanges.each(function(){
        var limiterId = "Changed Date";
        jQuery(this).change(function () {
        	eventObj('limiter', 'click', limiterId);
        });      
      });
  
      var dateRanges = jQuery('.ui-slider-handle');
      dateRanges.each(function(){
        var limiterId = "Changed Date (using slider)";
        jQuery(this).change(function () {
        	eventObj('limiter', 'click', limiterId);
        });      
      });
      
      var showmore = jQuery('.multiSelectPanel');
      showmore.each(function(){
        var limiterId = jQuery(this).find("a.rl-lim-heading").text().trim();
        limiterId = "Show More: "+limiterId;
        jQuery(this).find("a.panelShowMore").click(function () {
        	eventObj('limiter', 'click', limiterId);
        });      
      });
      
      var searchLinks = jQuery('#findFieldLinks a');
      searchLinks.each(function(){
        var limiterId = jQuery(this).text().trim();
        jQuery(this).click(function () {
        	eventObj('links', 'click', limiterId);
        });      
      });

      var iteration = 0;
      var waitForRS = setInterval(function () {
          iteration++;
          if (iteration > 10) {
            clearInterval(waitForRS);
          } else {
            var researchStarter = jQuery('.placard-container a.title-link');
            if (researchStarter.size() > 0) {
            clearInterval(waitForRS);
  
              var limiterId = researchStarter.text().trim();
              
              if (jQuery("#PlacardTitle1_edspub").size() > 0) {
                limiterId = "Publication Finder: "+limiterId;
              } else if (jQuery("#PlacardTitle1_ers").size() > 0) {
                limiterId = "Research Starters: "+limiterId;            
              } else {
                limiterId = "Placard: "+limiterId;
              }
              
              researchStarter2 = jQuery('.placard-container a');
              researchStarter2.each(function () {
                jQuery(this).click(function () {
                	eventObj('placard', 'click', limiterId);
                	eventObj('results', 'click', 'Clicked in Placard');
                });      
              });
              researchStarter3 = jQuery('.placard-container input');
              researchStarter3.each(function () {
                jQuery(this).click(function () {
                	eventObj('placard', 'click', limiterId);
                	eventObj('results', 'click', 'Clicked in Placard');
                });      
              });
            }
        }
      }, 500);
      
      iteration = 0;
      var waitForSpringshare = setInterval(function () {
          iteration++;
          if (iteration > 10) {
            clearInterval(waitForSpringshare);
          } else {
            var springshare = jQuery('#Placard_springy a');
            if (springshare.size() > 0) {
            clearInterval(waitForSpringshare);
            springshare.each(function () {
                var limiterId = "Springshare Placard: " + jQuery(this).text().trim();
                jQuery(this).click(function () {
                	eventObj('placard', 'click', limiterId);
                	eventObj('results', 'click', 'Clicked in Placard');
                });      
              });
            }
        }
      }, 500);

      iteration = 0;
      var waitForPlacards = setInterval(function () {
          iteration++;
          if (iteration > 10) {
            clearInterval(waitForPlacards);
          } else {
            var knownitems = jQuery('.knownitems a');
            if (knownitems.size() > 0) {
            clearInterval(waitForPlacards);
            knownitems.each(function () {
                var limiterId = "Known Item Placard: " + jQuery(this).text().trim();
                jQuery(this).click(function () {
                	eventObj('placard', 'click', limiterId);
                	eventObj('results', 'click', 'Clicked in Placard');
                });      
              });
            }
        }
      }, 500);

    });    

