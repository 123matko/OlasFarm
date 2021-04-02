$(document).ready(function(){
   
        $('#slnko').css({
            visibility: 'visible'
        });
        var slnko=$('#slnko');
        var hore='-=10';
        var vlavo='+=10';
        var uhol=0,j=0;
        for(i=0;i<35;i++){

        slnko.animate({ top: hore, left: vlavo, }, 25);

       
        }
        setTimeout(() => {
            $('#stodola_div').append("<img src='../img/ovecka.png' class='ovecka' id='ovecka'>");
            $("#ovecka").animate({left: '+=60%'},2000);
        }, 1000);
        
        setTimeout(() => {
            $('#stodola_div').append("<img src='../img/ovecka.png' class='ovecka' id='ovecka1'>");
            $("#ovecka1").animate({left: '+=50%'},2000);
        }, 2000);
        setTimeout(() => {
            $('#stodola_div').append("<img src='../img/ovecka.png' class='ovecka' id='ovecka2'>");
            $("#ovecka2").animate({left: '+=40%'},2000);
        }, 3000);
            setTimeout(() => {
            $('#stodola_div').append("<img src='../img/ovecka.png' class='ovecka' id='ovecka3'>");
            $("#ovecka3").animate({left: '+=30%'},2000);
        }, 4000);
            setTimeout(() => {
            $('#stodola_div').append("<img src='../img/ovecka.png' class='ovecka' id='ovecka4'>");
            $("#ovecka4").animate({left: '+=20%'},2000);
        }, 5000);
            
       
        
        
        
       
        
        
                  
            
         
           
            
        
        
           
       
        
        setInterval(() => {
            slnko.css({
                "-moz-transform":"rotate("+uhol+"deg)",
                "-webkit-transform":"rotate("+uhol+"deg)",
                "-ms-transform":"rotate("+uhol+"deg)",
                "transform":"rotate("+uhol+"deg)",
               
            });
            uhol+=10;
            if(uhol==360){
            uhol=0;
            }
        }, 100);
       
        
    
});



