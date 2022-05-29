import jQuery from 'jquery'; 
(function( $ ) {
    "use strict"


 var dzChartlist = function(){
	
	var screenWidth = $(window).width();
	var marketChart = function(){
		 var options = {
          series: [{
          name: 'series1',
          data: [200, 400, 300, 400, 200, 400, 200,300, 200, 300]
        }, {
          name: 'series2',
          data: [500, 300, 400, 200, 500, 200, 400, 300, 500, 200]
        }],
          chart: {
          height: 300,
          type: 'area',
		  toolbar:{
			  show:false
		  }
        },
		colors:["#FFAB2D","#00ADA3"],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
		  width:3
        },
		legend:{
			show:false
		},
		grid:{
			show:false,
			strokeDashArray: 6,
			borderColor: '#dadada',
		},
		yaxis: {
		  labels: {
			style: {
				colors: '#B5B5C3',
				fontSize: '12px',
				fontFamily: 'Poppins',
				fontWeight: 400
				
			},
			formatter: function (value) {
			  return value + "k";
			}
		  },
		},
        xaxis: {
          categories: ["Week 01","Week 02","Week 03","Week 04","Week 05","Week 06","Week 07","Week 08","Week 09","Week 10"],
		  labels:{
			  style: {
				colors: '#B5B5C3',
				fontSize: '12px',
				fontFamily: 'Poppins',
				fontWeight: 400
				
			},
		  }
        },
		fill:{
			type:'solid',
			opacity:0.05
		},
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        },
        };

        var chart = new ApexCharts(document.querySelector("#marketChart"), options);
        chart.render();
	}
	var currentChart = function(){
		 var options = {
          series: [85, 60, 67, 50],
          chart: {
          height: 315,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
				startAngle:-90,
			   endAngle: 90,
            dataLabels: {
              name: {
                fontSize: '22px',
              },
              value: {
                fontSize: '16px',
              },
            }
          },
        },
		stroke:{
			 lineCap: 'round',
		},
        labels: ['Income', 'Income', 'Imcome', 'Income'],
		 colors:['#ec8153', '#70b944','#498bd9','#6647bf'],
        };

        var chart = new ApexCharts(document.querySelector("#currentChart"), options);
        chart.render();
	}
	
	var recentContact = function(){
		jQuery('.testimonial-one').owlCarousel({
			loop:true,
			autoplay:true,
			margin:20,
			nav:false,
			rtl:true,
			dots: false,
			navText: ['', ''],
			responsive:{
				0:{
					items:3
				},
				450:{
					items:4
				},
				600:{
					items:5
				},	
				991:{
					items:5
				},			
				
				1200:{
					items:7
				},
				1601:{
					items:5
				}
			}
		})
	}
	
	
	/* Function ============ */
		return {
			init:function(){
			},
			
			
			load:function(){
					marketChart();
					currentChart();
					recentContact();
					
			},
			
			resize:function(){
			}
		}
	
	}();

	
		
	jQuery(window).on('load',function(){
		setTimeout(function(){
			dzChartlist.load();
		}, 1000); 
		
	});

	jQuery(window).on('resize',function(){
		
		
	});     

    
var themeOptionArr = {
    typography: '',
    version: '',
    layout: '',
    primary: '',
    headerBg: '',
    navheaderBg: '',
    sidebarBg: '',
    sidebarStyle: '',
    sidebarPosition: '',
    headerPosition: '',
    containerLayout: '',
    direction: '',
};



/* Cookies Function */
function setCookie(cname, cvalue, exhours) 
{
var d = new Date();
d.setTime(d.getTime() + (30*60*1000)); /* 30 Minutes */
var expires = "expires="+ d.toString();
document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) 
{
var name = cname + "=";
var decodedCookie = decodeURIComponent(document.cookie);
var ca = decodedCookie.split(';');
for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
        c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
    }
}
return "";
}

function deleteCookie(cname) 
{
var d = new Date();
d.setTime(d.getTime() + (1)); // 1/1000 second
var expires = "expires="+ d.toString();
//document.cookie = cname + "=1;" + expires + ";path=/";
document.cookie = cname + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT"+";path=/";
}

function deleteAllCookie(reload = true)
{
jQuery.each(themeOptionArr, function(optionKey, optionValue) {
        deleteCookie(optionKey);
});
if(reload){
    location.reload();
}
}

/* Cookies Function END */	

})(jQuery);