    function build_home_page() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            myfunction(xhttp);
        }
    };
    xhttp.open("GET", "http://ie.ce-it.ir/hw3/xml/home.xml", true);
    xhttp.send();

}

var url = new Array();
function myfunction(xml) {

    var xmlDoc = xml.responseXML;
    var games = xmlDoc.getElementsByTagName("game");
    var header = xmlDoc.getElementsByTagName("header");
    var background = header[0].getElementsByTagName("background")[0].firstChild.data;
    var pwd = header[0].getElementsByTagName("pwd")[0].firstChild.data;
    var game_color = games[0].getAttribute("color");
    var game_color_hover = games[0].getAttribute("hover");
    var max_onlines_background, max_onlines_border_width, max_onlines_border_color, max_onlines_border_sytle;
    var games_Attr = xmlDoc.getElementsByTagName("games");
    max_onlines_background = games_Attr[0].getAttribute("max-onlines-background");
    max_onlines_border_width = games_Attr[0].getAttribute("max-onlines-border-width");
    max_onlines_border_color = games_Attr[0].getAttribute("max-onlines-border-color");
    max_onlines_border_sytle = games_Attr[0].getAttribute("max-onlines-border-style");
    

    document.getElementById("pwd").style.color = pwd;
    document.getElementsByTagName("header")[0].style.backgroundColor = background;
    document.getElementById("home-icon").style.display = "none";
    document.getElementById("games").style.color = game_color;
    var max_online_name = "", max_online = 0;
    for (var i = 0; i < games.length; i++) {
        if (i < (games.length - 1)) {
            var name_of_game = games[(i + 1)].getElementsByTagName("name")[0].firstChild.data;
            var image = games[(i + 1)].getElementsByTagName("image")[0].firstChild.data;
            var online = games[(i + 1)].getElementsByTagName("onlines")[0].firstChild.data;
            var text = games[(i + 1)].getElementsByTagName("text")[0].firstChild.data;
            var text_color = games[(i + 1)].getElementsByTagName("text")[0].getAttribute("color");
            var text_color_hover = games[(i + 1)].getElementsByTagName("text")[0].getAttribute("hover");
            var active_games = games[(i + 1)].getAttribute("active");
            if (active_games == "true") {
                if (online > max_online) {
                    max_online = online;
                    max_online_name = name_of_game;
                }
                //create elements
                url[name_of_game]=games[(i + 1)].getElementsByTagName("url")[0].firstChild.data;
                var div_game = document.createElement("div");
                var div_game_inner = document.createElement("div");
                var img = document.createElement("img");
                var name_of_game_p = document.createElement("p");
                div_game_inner.onclick=function () {
                    game_onclick(url[name_of_game]);
                }
                //set attribute
                div_game.setAttribute("class", "game-block");
                div_game.setAttribute("id", name_of_game);
                div_game.setAttribute("data-onlines", online);
                div_game.setAttribute("data-name", name_of_game);
                div_game_inner.setAttribute("class", "game-image-container");
                var css = 'div#'+name_of_game
                img.src = image;
                //remember to add hovering to paragraph after finishing the project
                //name_of_game_p.style.color = text_color_hover;
                name_of_game_p.innerHTML = text;
                div_game_inner.appendChild(img);
                div_game_inner.appendChild(name_of_game_p);
                div_game.appendChild(div_game_inner);
                document.getElementById("main-container").appendChild(div_game);

            }
        }

    }
    //set attributes to game_container that have max_online clients
    document.getElementById(max_online_name).style.border
        = max_onlines_border_width + " " + max_onlines_border_color + " " + max_onlines_border_sytle;
    document.getElementById(max_online_name).style.backgroundColor = max_onlines_background;
}