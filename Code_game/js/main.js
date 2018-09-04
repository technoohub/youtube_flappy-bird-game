$(function () {

    //saving dom objects to variables
    var container = $('.container');
    var bird = $('.bird');
    var pole1 = $('.pole1');
    var pole2 = $('.pole2');
    var pole_1 = $('#pole_1');
    var pole_2 = $('#pole_2');
    var pole_3 = $('#pole_3');
    var pole_4 = $('#pole_4');
    var score = $('.score');
    var speed_span = $('.speed');
    var restart_btn = $('.restart_btn');
    
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    
    var pole1_initial_position = parseInt(pole1.css('right'));
    var pole2_initial_position = parseInt(pole2.css('right'));
    
    var pole1_initial_height = parseInt(pole1.css('height'));
    var pole2_initial_height = parseInt(pole2.css('height'));
    var bird_left = parseInt(bird.css('left'));
    var bird_height = parseInt(bird.css('height'));
    var speed = 10;

    //other declaration
    var go_up = false;
    var score_update1 = false;
    var score_update2 = false;
    var game_over = false;
    
    var the_game = setInterval(function() {
        
        if(collision(bird, pole_1) || collision(bird, pole_2) || collision(bird, pole_3) || collision(bird, pole_4) || parseInt(bird.css('top')) <= 0 || parseInt(bird.css('top')) > container_height- bird_height ) {
            
            stop_game();
            
        } else {
            var pole1_current_position = parseInt(pole1.css('right'));
            var pole2_current_position = parseInt(pole2.css('right'));

            //update the score when the poles have passed the bird succesfuly 
            if(pole1_current_position > container_width - bird_left) {
                
                
                if(score_update1 === false) {
                    score.text(parseInt(score.text()) + 1);
                    score_update1 = true;
                }
            }
            
            
            if(pole2_current_position > container_width - bird_left) {
                
                if(score_update2 === false) {
                    score.text(parseInt(score.text())+1);
                    score_update2 = true;
                }
            }
            

            //check wether the poles went out of the container 
            if(pole1_current_position > container_width) {
                var new_height = parseInt(Math.random() * 100);
                var new_height2 = parseInt(Math.random() * 75);

                //change Poles height
                pole_1.css('height', pole1_initial_height + new_height);
                pole_2.css('height', pole1_initial_height - new_height);
                pole_3.css('height', pole2_initial_height + new_height2);
                pole_4.css('height', pole2_initial_height - new_height2);

                //change Speed
                speed = speed + 1;
                speed_span.text(speed);
                score_update1 = false;
                score_update2 = false;

                pole1_current_position = pole1_initial_position;
                pole2_current_position = pole2_initial_position;
                
            }

            //move the poles
            pole1.css('right', pole1_current_position + speed);
            pole2.css('right', pole2_current_position + speed);

            if(go_up === false) {
                go_down();
            }      
        }
    }, 40);
    
    $(document).on('keydown', function(e) {
        var key = e.keyCode;
        if(key === 32 && go_up === false && game_over === false) {
            go_up = setInterval(up, 50);
        }
    });
    
    $(document).on('keyup', function(e) {
        var key = e.keyCode;
        if(key === 32) {
           clearInterval(go_up);
            go_up = false;
            
        }
    });
    
    function go_down() {
        bird.css('top', parseInt(bird.css('top')) + 5);
    }
    

   function up() {
       bird.css('top', parseInt(bird.css('top')) - 10);
   }
    
    function stop_game() {
        clearInterval(the_game);
        game_over = true;
        restart_btn.slideDown();
    }
    
    restart_btn.click(function() {
        location.reload();
    })
    
        function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }
       // pole1 and 3 is top 0 so offset top of bird > pole height with height (y1 < b2)
        // pole2 and 4 is bottom 0 so offset of bird with height < pole with offset top (b1 < y2)
        // bird offset left > width pole + pole offset left  (x1 > r2)
        // bird offset left + width < pole  offset left
        


});
