var _last_row, _last_col, _new_row, _new_col;
var turn = "";
var white_score, black_score;
var white_deleted, black_deleted;
var rotate = 180;

var white_player_array, black_player_array;

var white_coordinate, black_coordinate;

class chessman {
    constructor(type_of_chess_piece, chess_piece_unicode, isAlive, coordinate_X, coordinate_Y) {
        this.name = type_of_chess_piece;
        this.chess_piece_unicode = chess_piece_unicode;
        this.isAlive = isAlive;
        this.x = coordinate_X;//col
        this.y = coordinate_Y;//row
    }
}
class coordinate {
    constructor(_x, _y) {
        this.x_coordinate = _x;
        this.y_coordinate = _y;
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

function promotion(x, y) {

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
function pieces_score(name) {
    if (name == "pawn")
        return 1;
    if (name == "knight")
        return 3;
    if (name == "bishop")
        return 3;
    if (name == "rook")
        return 5;
    if (name == "queen")
        return 9;
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
        document.body.appendChild(resultDocument);
    }
    white_player_array = new Array();
    black_player_array = new Array();

    white_coordinate = new Array();
    black_coordinate = new Array();

    white_score = new Array();
    black_score = new Array();

    white_deleted = new Array();
    black_deleted = new Array();

//--INITIAL VARIABLES--------------------------------------------------------
    turn = $(xmlDoc).find("chess")[0].getAttribute("turn");

    var board = $(xmlDoc).find("board")[0];
    var score = $(xmlDoc).find("score")[0];

    var white_score_initial = $(score).find("white")[0].innerHTML;
    var black_score_initial = $(score).find("black")[0].innerHTML;

    white_score.push(white_score_initial);
    black_score.push(black_score_initial);

    var black_player = $(board).find("black")[0];
    var white_player = $(board).find("white")[0];

    var black_cells = board.getAttribute("black-cells")
    var white_cells = board.getAttribute("white-cells");

    var black_player_field = black_player.getAttribute("field");
    var white_player_field = white_player.getAttribute("field");
//---INITIAL VARIABLES_END--------------------------------------------------------

//---INITIAL TABLE--------------------------------------------------------
    var table = document.getElementById("game_chess");
    initial_table(table);
//----INITIAL TABLE_END------------------------------------------------------------

// ---FIRST INITIATE---------------------------------------------------------------
    add_pieces_to_player_field(black_player, black_player_array);
    add_pieces_to_player_field(white_player, white_player_array);
    initial_page(black_player_array, "black");
    initial_page(white_player_array, "white");
    update_score();


    if (turn == "white")
        _setOnClick(white_player_array, table);
    else if (turn == "black")
        _setOnClick(black_player_array, table);

// ---FIRST INITIATE_END---------------------------------------------------------------------
}

//---CLICK EVENT-----------------------------------------------------------------------------
function highlight(col, row, name) {
    var array = new Array();
    assign_forward(name, array, col, row);
    for (var i = 0; i < array.length; i++)
        $(search(array[i].y_coordinate, array[i].x_coordinate, $("#game_chess")[0])).css("opacity", "0.7");
}


function _setOnClick(arr, table) {
    for (var i = 0; i < arr.length; i++) {
        $(search(arr[i].y, arr[i].x, table)).on("click", td_click_handler);
    }
}
function td_click_handler() {
    _last_row = $(this).attr("row");
    _last_col = $(this).attr("col");
    $(search(_last_row, _last_col, $("#game_chess")[0])).css("opacity", "0.9").css("color", "purple");
    if (turn == "white") {
        var name = array_search(white_player_array, _last_row, _last_col).name;
        highlight(parseInt(_last_col), parseInt(_last_row), name);
        _setOnClickWithout(white_player_array, $("#game_chess")[0]);
    }
    else if (turn == "black") {
        var name = array_search(black_player_array, _last_row, _last_col).name;
        highlight(parseInt(_last_col), parseInt(_last_row), name);
        _setOnClickWithout(black_player_array, $("#game_chess")[0]);
    }
}
function _setOnClickWithout(arr, table) {
    $('td').prop('onclick', null).off('click');
    $("td").on("click", td_click_handlerWithout);
    for (var i = 0; i < arr.length; i++) {
        $(search(arr[i].y, arr[i].x, table)).off("click", td_click_handlerWithout);
    }
}

function td_click_handlerWithout() {
    $('td').prop('onclick', null).off('click');
    _new_row = $(this).attr("row");
    _new_col = $(this).attr("col");
    $('#turn').toggleClass("black", "white");
    if (turn == "white") {
        kill(black_player_array, _new_col, _new_row);
        update_score();
        initial_score_page();
        update_player_table(white_player_array, _last_row, _last_col, _new_row, _new_col);
        update_table(black_player_array, white_player_array);
        _setOnClick(black_player_array, $("#game_chess")[0]);
        $('#turn').text("black");
        turn = "black";
    }
    else if (turn == "black") {
        kill(white_player_array, _new_col, _new_row);
        update_score();
        initial_score_page();
        $('#turn').text("white");
        update_player_table(black_player_array, _last_row, _last_col, _new_row, _new_col);
        update_table(black_player_array, white_player_array);
        _setOnClick(white_player_array, $("#game_chess")[0]);

        turn = "white";
    }
}

function find_score_page(player, arr) {
    var black = player.find("tr");
    for (var i = 0; i < arr; i++) {
        for (var j = 0; j < 2; j++)
            $(black[i]).find("td")[j].innerHTML = arr[i].chess_piece_unicode;
    }
}
function initial_score_page() {
    black_deleted.push(new chessman())
    var black = $('#black-chessman-panel');
    var white = $('#white-chessman-panel');
    find_score_page(black, black_deleted);
}

//(arr, row, col)
function update_score() {
    var white = 0, black = 0;
    for (var i = 0; i < white_score.length; i++)
        white += parseInt(white_score[i]);
    for (var i = 0; i < black_score.length; i++)
        black += parseInt(black_score[i]);
    $('#white-score').text(white);
    $('#black-score').text(black);
}

function kill(player, x, y) {
    var temp = array_search(player, y, x);
    if (temp != null) {
        if (turn == "white") {

            white_score.push(pieces_score(temp.name));
        }
        if (turn == "black") {
            black_score.push(pieces_score(temp.name));
        }
        delete_peices(1,1,get_unicode("pawn"));
        player.splice(player.indexOf(temp), 1);
    }
}

function delete_peices(i,j,unicode) {
    var black = $('#black-chessman-panel');
    var white = $('#white-chessman-panel');

    $(black.children()[i]).children()[j].innerHTML=unicode;
}

function _combine(player, movement) {
    var array = new Array();
    for (var i = 0; i < player.length; i++)
        array.push(new coordinate(player[i].x, player[i].y));
    for (var i = 0; i < movement.length; i++)
        array.push(new coordinate(movement[i].x, movement[i].y));
    return array;
}


//---PIECES MOVEMENT -----------------------------------------------
function isValid(num) {
    if ((num >= 0) && (num <= 7))
        return true;
    return false;
}

function highlight_cuter(x, y) {
    if (turn == "white")
        for (var i = 0; i < white_player_array.length; i++) {
            if (white_player_array[i].x == x && white_player_array[i].y == y)
                return false;
        }
    if (turn == "black")
        for (var j = 0; j < black_player_array.length; j++) {
            if (black_player_array[j].x == x && black_player_array[j].y == y)
                return false;
        }
    return true;
}

function pawn_forward(x, y, array) {
    if (isValid(parseInt(y - 1)) && turn == "white")
        array.push(new coordinate(x, y - 1));
    if (isValid(parseInt(y + 1)) && turn == "black")
        array.push(new coordinate(x, y + 1));
}

function knight_forward(y, x, array) {
    if ((isValid(parseInt(y - 2))) && (isValid(parseInt(x - 1))) && highlight_cuter(parseInt(y - 2), parseInt(x - 1)))
        array.push(new coordinate(parseInt(y - 2), parseInt(x - 1)));
    if ((isValid(parseInt(y - 1))) && (isValid(parseInt(x - 2))) && highlight_cuter(parseInt(y - 1), parseInt(x - 2)))
        array.push(new coordinate(parseInt(y - 1), parseInt(x - 2)));
    if ((isValid(parseInt(y - 2))) && (isValid(parseInt(x + 1))) && highlight_cuter(parseInt(y - 2), parseInt(x + 1)))
        array.push(new coordinate(parseInt(y - 2), parseInt(x + 1)));
    if ((isValid(parseInt(y - 1))) && (isValid(parseInt(x + 2))) && highlight_cuter(parseInt(y - 1), parseInt(x + 2)))
        array.push(new coordinate(parseInt(y - 1), parseInt(x + 2)));
    if ((isValid(parseInt(y + 1))) && (isValid(parseInt(x + 2))) && highlight_cuter(parseInt(y + 1), parseInt(x + 2)))
        array.push(new coordinate(parseInt(y + 1), parseInt(x + 2)));
    if ((isValid(parseInt(y + 2))) && (isValid(parseInt(x + 1))) && highlight_cuter(parseInt(y + 2), parseInt(x + 1)))
        array.push(new coordinate(parseInt(y + 2), parseInt(x + 1)));
    if ((isValid(parseInt(y + 2))) && (isValid(parseInt(x - 1))) && highlight_cuter(parseInt(y + 2), parseInt(x - 1)))
        array.push(new coordinate(parseInt(y + 2), parseInt(x - 1)));
    if ((isValid(parseInt(y + 1))) && (isValid(parseInt(x - 2))) && highlight_cuter(parseInt(y + 1), parseInt(x - 2)))
        array.push(new coordinate(parseInt(y + 1), parseInt(x - 2)));
}

function rook_forward(x, y, array) {
    var tr1 = true, tr2 = true, tr3 = true, tr4 = true;
    for (var i = 0; i < 8; i++) {
        if (!(highlight_cuter(parseInt(x) + i + 1, parseInt(y))))
            tr1 = false;
        if (!(highlight_cuter(parseInt(x) - i - 1, parseInt(y))))
            tr2 = false;
        if (!(highlight_cuter(parseInt(x), parseInt(y) + i + 1)))
            tr3 = false;
        if (!(highlight_cuter(parseInt(x), parseInt(y) - 1 - i)))
            tr4 = false;
    }
    for (var i = 0; i < 8; i++) {
        if ((isValid(parseInt(x + i + 1))) && (isValid(parseInt(y))) && tr1)
            array.push(new coordinate(parseInt(x + i + 1), parseInt(y)));
        if ((isValid(parseInt(x - i - 1))) && (isValid(parseInt(y))) & tr2)
            array.push(new coordinate(parseInt(x - i - 1), parseInt(y)));
        if ((isValid(parseInt(x))) && (isValid(parseInt(y) + 1 + i)) && tr3)
            array.push(new coordinate(parseInt(x), parseInt(y) + i + 1));
        if ((isValid(parseInt(x))) && (isValid(parseInt(y) - 1 - i)) && tr4)
            array.push(new coordinate(parseInt(x), parseInt(y) - 1 - i));
    }
}

function bishop_forward(x, y, array) {
    var tr1 = true, tr2 = true, tr3 = true, tr4 = true;
    for (var i = 0; i < 8; i++) {
        if (!(highlight_cuter(parseInt(x) + i + 1, parseInt(y) + i + 1)))
            tr1 = false;
        if (!(highlight_cuter(parseInt(x) - i - 1, parseInt(y) - 1 - i)))
            tr2 = false;
        if (!(highlight_cuter(parseInt(x) + i + 1, parseInt(y) - i - 1)))
            tr3 = false;
        if (!(highlight_cuter(parseInt(x) - i - 1, parseInt(y) + 1 + i)))
            tr4 = false;
    }
    for (var i = 0; i < 8; i++) {
        if ((isValid(parseInt(x + i + 1))) && (isValid(parseInt(y + i + 1))) && tr1)
            array.push(new coordinate(parseInt(x) + i + 1, parseInt(y + i + 1)));
        if ((isValid(parseInt(x - 1 - i))) && (isValid(parseInt(y - 1 - i))) && tr2)
            array.push(new coordinate(parseInt(x) - 1 - i, parseInt(y - 1 - i)));
        if ((isValid(parseInt(x + i + 1))) && (isValid(parseInt(y - 1 - i))) && tr3)
            array.push(new coordinate(parseInt(x) + i + 1, parseInt(y - i - 1)));
        if ((isValid(parseInt(x - i - 1))) && (isValid(parseInt(y + 1 + i))) && tr4)
            array.push(new coordinate(parseInt(x) - i - 1, parseInt(y + 1 + i)));
    }
}

function queen_forward(x, y, array) {
    rook_forward(x, y, array);
    bishop_forward(x, y, array);
}

function king_forward(x, y, array) {
    if ((isValid(parseInt(x) - 1)) && (isValid(parseInt(y) - 1)) && highlight_cuter(parseInt(y) - 1, parseInt(x) - 1))
        array.push(new coordinate(parseInt(x) - 1), parseInt(y) - 1);

    if ((isValid(parseInt(x) + 1)) && (isValid(parseInt(y) + 1)) && highlight_cuter(parseInt(y) + 1, parseInt(x) + 1))
        array.push(new coordinate(parseInt(x) + 1), parseInt(y) + 1);

    if ((isValid(parseInt(x) + 1)) && (isValid(parseInt(y) - 1)) && highlight_cuter(parseInt(y) + 1, parseInt(x) - 1))
        array.push(new coordinate(parseInt(x) - 1), parseInt(y) + 1);

    if ((isValid(parseInt(x) - 1)) && (isValid(parseInt(y) + 1)) && highlight_cuter(parseInt(y) - 1, parseInt(x) + 1))
        array.push(new coordinate(parseInt(x) + 1), parseInt(y) - 1);

    if ((isValid(parseInt(x) - 1)) && (isValid(parseInt(y) + 1)) && highlight_cuter(parseInt(y) - 1, parseInt(x) + 1))
        array.push(new coordinate(parseInt(x) + 1), parseInt(y) - 1);

    if ((isValid(parseInt(x) - 1)) && (isValid(parseInt(y) - 1)) && highlight_cuter(parseInt(y) - 1, parseInt(x) - 1))
        array.push(new coordinate(parseInt(x) - 1), parseInt(y) - 1);

    if ((isValid(parseInt(x) + 1)) && (isValid(parseInt(y) + 1)) && highlight_cuter(parseInt(y) + 1, parseInt(x) + 1))
        array.push(new coordinate(parseInt(x) + 1), parseInt(y) + 1);

    if ((isValid(parseInt(x) - 1)) && (isValid(parseInt(y) - 1)) && highlight_cuter(parseInt(x) - 2, parseInt(y) - 1))
        array.push(new coordinate(parseInt(y) - 1), parseInt(x) - 2);

}

function assign_forward(name, arr, _x, _y) {
    if (name == "pawn")
        pawn_forward(_x, _y, arr);
    if (name == "knight")
        knight_forward(_x, _y, arr);
    if (name == "rook")
        rook_forward(_x, _y, arr);
    if (name == "bishop")
        bishop_forward(_x, _y, arr);
    if (name == "queen")
        queen_forward(_x, _y, arr);
    if (name == "king")
        king_forward(_x, _y, arr);
}

//---PIECES MOVEMENT_END--------------------------------------------

function array_search(arr, row, col) {
    for (var i = 0; i < arr.length; i++) {
        if ((arr[i].x == col) && (arr[i].y == row))
            return arr[i];
    }
    return null;
}

function update_player_table(player_array, last_row, last_col, new_row, new_col) {
    var temp = array_search(player_array, last_row, last_col);
    temp.x = new_col;
    temp.y = new_row;
}

function update_table(player1, player2) {
    $("td").empty();
    $("td").removeAttr("style");
    initial_page(player1, "black");
    initial_page(player2, "white");
}

//---CLICK EVENT_END--------------------------------------------------------
//f THROUGH TABLE
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
        if (player[i].isAlive == "true") {
            var row = player[i].y;
            var col = player[i].x;
            $(search(row, col, table)).css("color", color);
            search(row, col, table).innerHTML = player[i].chess_piece_unicode;
        }
    }
}

function display_chess() {
    $("#main-container").remove();
    var home_icon = $("#home-icon");
    home_icon.css("display", "inline");
    home_icon.on("click", function () {
        $("body").empty();
        re_build_home_page();
    });
    $("document").ready(function () {
        initial();
    });
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
/*unicode
 var pawn_unicode = "&#9823;";
 var rook_unicode = "&#9820;";
 var knight_unicode = "&#9822;";
 var bishop_unicode = "&#9821;";
 var queen_unicode = "&#9819;";
 var king_unicode = "&#9818;";
 * */

