$(window).on("scroll",function(){$(window).scrollTop()>530?$(".corp-sel-panel").addClass("fixed-top"):$(".corp-sel-panel").removeClass("fixed-top")}),$(document).ready(function(){$(".csp-item:not(.c-soon)").click(function(){var e=$(this).data("target");$("html,body").animate({scrollTop:$("#"+e).offset().top-70})})});;