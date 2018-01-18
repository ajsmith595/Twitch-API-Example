var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];



$(document).ready(function(){
    var template = $('#channelResultTemplate').html();
    callAjax(template);

    $('.channelResult').hover(function(e){
        console.log("Hover!");
    });
});
var i = 0;
function callAjax(template){
    $.ajax({
        url: "https://wind-bow.glitch.me/twitch-api/streams/" + users[i],
        type: "GET",
        success: function(data){
            var template_ = $(template).clone();
            if(data.stream === null){
                $(template_).addClass('notlive');
                $(template_).find('.status').html("OFFLINE");
                $(template_).find('.game').html("NONE");
            }
            else{
                $(template_).addClass('live');
                $(template_).find('.status').html("STREAMING - " + data.stream.channel.status.toUpperCase());
                $(template_).find('.game').html(data.stream.game.toUpperCase());
            }
            $(template_).find('.channelName').html(users[i].toUpperCase());
            $(template_).children().attr('href', 'https://twitch.tv/' + users[i]);
            $('#channelResults').append(template_);

            i++;
            if(i < users.length){
                callAjax(template);
            }
        }
    });

}
