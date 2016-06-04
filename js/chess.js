var white_player_array, black_player_array;
class chessman {
    constructor(type_of_chess_piece, chess_piece_unicode, isAlive, coordinate_X, coordinate_Y) {
        this.type_of_chess_piece = type_of_chess_piece;
        this.chess_piece_unicode = chess_piece_unicode;
        this.isAlive = isAlive;
        this.x = coordinate_X;
        this.y = coordinate_Y;
    }
}
function loadXMLDoc(filename) {
    var xhttp;
    if (window.ActiveXObject) {
        xhttp = new ActiveXObject("Msxml2.XMLHTTP");
    }
    else {
        xhttp = new XMLHttpRequest();
    }
    xhttp.open("GET", filename, false);
    try {
        xhttp.responseType = "msxml-document"
    } catch (err) {
    } // Helping IE11
    xhttp.send("");
    return xhttp.responseXML;
}
function add_pieces_to_player_field(player, array) {
    var name = "", row, col;
    var pieces = $(player).children();
    for (var i = 0; i < pieces.length; i++) {
        name = $(pieces[i]).prop('tagName');
        row = $(pieces[i]).attr("row");
        col = $(pieces[i]).attr("col");
        array.push(new chessman(name, get_unicode(name), "true", col, row));
    }
}
function get_unicode(piece_name) {
    if (piece_name == "pawn" || piece_name == "♟")
        return "&#9823";
    if (piece_name == "rook" || piece_name == "♜")
        return "&#9820";
    if (piece_name == "knight" || piece_name == "♞")
        return "&#9822";
    if (piece_name == "bishop" || piece_name == "♝")
        return "&#9821";
    if (piece_name == "queen" || piece_name == "♛")
        return "&#9819";
    if (piece_name == "king" || piece_name == "♚")
        return "&#9818";
}

function initial() {
    var url = "http://ie.ce-it.ir/hw3/xml/chess.xml";
    var xslt_url = "http://ceit.aut.ac.ir/~9231018/build_chess.xslt.xml";
    var xmlDoc = loadXMLDoc(url);
    var xsl = loadXMLDoc(xslt_url);
    if (document.implementation && document.implementation.createDocument) {
        var xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xsl);
        var resultDocument = xsltProcessor.transformToFragment(xmlDoc, document);
        document.getElementById("main-container").appendChild(resultDocument);
    }
    white_player_array = new Array();
    black_player_array = new Array();

    var board = $(xmlDoc).find("board")[0];
    var score = $(xmlDoc).find("score")[0];

    var score_white = $(score).find("white")[0].innerHTML;
    var score_black = $(score).find("black")[0].innerHTML;

    var black_player = $(board).find("black")[0];
    var white_player = $(board).find("white")[0];

    var black_cells = board.getAttribute("black-cells")
    var white_cells = board.getAttribute("white-cells");

    var black_player_field = black_player.getAttribute("field");
    var white_player_field = white_player.getAttribute("field");

    var table = document.getElementById("game_chess");
    initial_table(table);

    add_pieces_to_player_field(black_player, black_player_array);
    add_pieces_to_player_field(white_player, white_player_array);
    initial_page(black_player_array, "black");
    initial_page(white_player_array, "white");
}
function search(row, col, table) {
    var tr = $(table).children();
    return $(tr[row]).children()[col];
}
function initial_table(table) {
    for (var i = 0; i < 8; i++) {
        var tr = document.createElement("tr");
        table.appendChild(tr);
        for (var j = 0; j < 8; j++) {
            var td = document.createElement("td");
            $(td).attr("row", i).attr("col", j);
            tr.appendChild(td);
        }
    }
}
function initial_page(player, color) {
    var table = document.getElementById("game_chess");
    var tr = $(table).find("tr");
    for (var i = 0; i < player.length; i++) {
        var row = player[i].y;
        var col = player[i].x;
        $(search(row, col, table)).css("color", color);
        search(row, col, table).innerHTML = player[i].chess_piece_unicode;
    }
}
function update_page(new_row, new_col, table, unicode) {
    search(new_row, new_col, table).innerHTML = unicode;
}
function search_peices(player_array, y, x) {
    for (var i = 0; i < player_array.length; i++) {
        if ((player_array[i].y == y) && (player_array[i].x == x))
            return player_array[i];
    }
    return null;
}
function AnimateRotate(ang) {
    var angle = ang;
    var $elem = $('#game_chess');
    $({deg: 0}).animate({deg: angle}, {
        duration: 2000,
        step: function (now) {
            $elem.css({
                transform: 'rotate(' + now + 'deg)'
            });
        }
    });
}
function display_chess() {
    $("#main-container").empty();
    $("document").ready(function () {

        var pawn_unicode = "&#9823;";
        var rook_unicode = "&#9820;";
        var knight_unicode = "&#9822;";
        var bishop_unicode = "&#9821;";
        var queen_unicode = "&#9819;";
        var king_unicode = "&#9818;";

        initial();

        var table = document.getElementById("game_chess");
        var clicked_item;
        $("td").on("click", function () {


            // var row = this.getAttribute("row");
            // var col = this.getAttribute("col");
            // var x = search_peices(white_player_array, row, col);


            if (clicked_item == null)
                clicked_item = this;
            else {
                var last_row = clicked_item.getAttribute("row");
                var last_col = clicked_item.getAttribute("col");

                // $(clicked_item).removeAttr("row col style");
                $(clicked_item).empty();

                var clicked = search_peices(white_player_array, last_row, last_col);

                var row = this.getAttribute("row");
                var col = this.getAttribute("col");
                update_page(row, col, table, clicked.chess_piece_unicode);
                clicked_item = null;


            }
            // var clicked_row = this.getAttribute("row");
            // var clicked_col = this.getAttribute("col");
            // clicked_item = search_peices(white_player_array, clicked_row, clicked_col);
            // if (clicked_item == null) {
            //     alert(clicked_row);
            // }
            //
            //
            // else {
            //     var row = this.getAttribute("row");
            //     var col = this.getAttribute("col");
            //     update_page(row, col, table, clicked_item.chess_piece_unicode);
            // }


        });


        // $(table).on("click", function () {
        //     angle = -angle;
        //     AnimateRotate(angle);
        // });


        // $(table).find("td").on("click", change_back_color);

    });
}