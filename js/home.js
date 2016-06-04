var _container, _header;

function _hover(element_on, element, color, color_hover) {
    element.style.color = color;
    element_on.onmouseover = function () {
        element.style.color = color_hover;
    }
    element_on.onmouseout = function () {
        element.style.color = color;
    }
}

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

    var gameicon_color = header[0].getElementsByTagName("gameicon")[0].getAttribute("color");
    var gameicon_color_hover = header[0].getElementsByTagName("gameicon")[0].getAttribute("hover");
    var game_color = header[0].getElementsByTagName("gameicon")[0].getElementsByTagName("game")[0].getAttribute("color");
    var game_color_hover = header[0].getElementsByTagName("gameicon")[0].getElementsByTagName("game")[0].getAttribute("hover");


    var game_icon = document.getElementById("games").firstElementChild;
    _hover(game_icon, game_icon, gameicon_color, gameicon_color_hover);

    var name = xmlDoc.getElementsByTagName("name");
    var image = xmlDoc.getElementsByTagName("image");
    var onlines = xmlDoc.getElementsByTagName("onlines");
    var text = xmlDoc.getElementsByTagName("text");
    var background = header[0].getElementsByTagName("background")[0].firstChild.data;
    var pwd = header[0].getElementsByTagName("pwd")[0].firstChild.data;


    var max_onlines_background, max_onlines_border_width, max_onlines_border_color, max_onlines_border_sytle;
    var games_Attr = xmlDoc.getElementsByTagName("games");

    max_onlines_background = games_Attr[0].getAttribute("max-onlines-background");
    max_onlines_border_width = games_Attr[0].getAttribute("max-onlines-border-width");
    max_onlines_border_color = games_Attr[0].getAttribute("max-onlines-border-color");
    max_onlines_border_sytle = games_Attr[0].getAttribute("max-onlines-border-style");


    document.getElementById("pwd").style.color = pwd;
    document.getElementsByTagName("header")[0].style.backgroundColor = background;
    //remmember to fix this shit
    document.getElementById("home-icon").style.display = "none";

    var active_game = new Array();
    var name_of_game = new Array();
    var max_online_name = "", max_online = 0;
    for (var i = 0; i < games.length; i++) {
        if (i < (games.length - 1)) {
            var name_of_game = games[(i + 1)].getElementsByTagName("name")[0].firstChild.data;
            var image = games[(i + 1)].getElementsByTagName("image")[0].firstChild.data;
            var online = games[(i + 1)].getElementsByTagName("onlines")[0].firstChild.data;
            var text = games[(i + 1)].getElementsByTagName("text")[0].firstChild.data;
            var text_color = games[(i + 1)].getElementsByTagName("text")[0].getAttribute("color");
            var text_color_hover = games[(i + 1)].getElementsByTagName("text")[0].getAttribute("hover");
            var active_game = games[(i + 1)].getAttribute("active");


            //create elements

            var div_game = document.createElement("div");
            var div_game_inner = document.createElement("div");
            var img = document.createElement("img");
            var name_of_game_p = document.createElement("p");
            var li = document.createElement("li");
            //set attributes
            div_game.setAttribute("class", "game-block");
            div_game.setAttribute("id", name_of_game);
            div_game.setAttribute("data-onlines", online);
            div_game.setAttribute("data-name", name_of_game);
            div_game_inner.setAttribute("class", "game-image-container");
            _hover(div_game, name_of_game_p, text_color, text_color_hover);
            if (active_game == "true") {
                li.setAttribute("id", "li_" + name_of_game);
                li.innerHTML = name_of_game;
                li.style.color = game_color;
                document.getElementById("games").appendChild(li);

                url[name_of_game] = games[(i + 1)].getElementsByTagName("url")[0].firstChild.data;
            }
        }
        img.src = image;
        name_of_game_p.innerHTML = text;
        div_game_inner.appendChild(img);
        div_game_inner.appendChild(name_of_game_p);
        div_game.appendChild(div_game_inner);
        document.getElementById("main-container").appendChild(div_game);

        if (online > max_online) {
            max_online = online;
            max_online_name = name_of_game;
        }
    }
    document.getElementById("sudoku").onclick = displaySudoku;
    document.getElementById("chess").onclick = display_chess;
    document.getElementById("snake").onclick = notImplemented;
    document.getElementById("mario").onclick = notImplemented;
    document.getElementById("maze").onclick = notImplemented;

    var toggle = true;
    game_icon.onclick = $().animate()
    {
        duration:400;
        function step() {
            if (toggle) {
                document.getElementById("li_sudoku").style.display = 'inline-block';
                document.getElementById("li_chess").style.display = 'inline-block';
                toggle = false;
            }
            else {
                document.getElementById("li_sudoku").style.display = 'none';
                document.getElementById("li_chess").style.display = 'none';
                toggle = true;
            }
        }


    }
    _hover(document.getElementById("li_sudoku"), document.getElementById("li_sudoku"), game_color, game_color_hover);
    _hover(document.getElementById("li_chess"), document.getElementById("li_sudoku"), game_color, game_color_hover);

    document.getElementById("li_chess").onclick = display_chess;
    document.getElementById("li_sudoku").onclick = displaySudoku;

//set attributes to game_container that have max_online clients
    document.getElementById(max_online_name).style.border
        = max_onlines_border_width + " " + max_onlines_border_color + " " + max_onlines_border_sytle;
    document.getElementById(max_online_name).style.backgroundColor = max_onlines_background;

    _container = document.getElementById("main-container");
    _header = document.body.firstElementChild;
}
function notImplemented() {
    document.getElementById("main-container").innerHTML = "This game is not implemented yet";
    // var home_icon = document.getElementById("home-icon");
    // home_icon.style.display = 'inline';
    // home_icon.onclick = function () {
    //     // re_build_home_page();
    // };
}

function re_build_home_page() {
    document.body.appendChild(_header);
    document.body.appendChild(_container);
    document.getElementById("home-icon").style.display = 'none';
}
