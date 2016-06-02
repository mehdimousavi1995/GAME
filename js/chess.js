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

function set_chess_pieces(chess_pieces, chess_pieces_unicode, table, color) {
    var row, col;
    var tr = $(table).find("tr");
    for (var k = 0; k < chess_pieces.length; k++) {
        row = $(chess_pieces[k]).attr("row");
        col = $(chess_pieces[k]).attr("col");
        $($(tr[row]).find("td")[col]).css("color", color);
        $(tr[row]).find("td")[col].innerHTML = chess_pieces_unicode;
    }
}

function display_chess() {
    var url = "http://ie.ce-it.ir/hw3/xml/chess.xml";
    var xslt_url = "http://ceit.aut.ac.ir/~9231018/build_chess.xslt.xml";
    var xmlDoc = loadXMLDoc(url);
    var xsl = loadXMLDoc(xslt_url);

    if (document.implementation && document.implementation.createDocument) {
        var xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xsl);
        var resultDocument = xsltProcessor.transformToFragment(xmlDoc, document);
        document.getElementById("main-container").appendChild(resultDocument);
        var white_cells, black_cells, white_player_field, black_player_field;
    }
    $("document").ready(function () {
            var board = $(xmlDoc).find("board")[0];


            var black_player = $(board).find("black")[0];
            black_cells = board.getAttribute("black-cells");
            black_player_field = black_player.getAttribute("field");
            var black_player_pawn = $(black_player).find("pawn");
            var black_player_rook = $(black_player).find("rook");
            var black_player_knight = $(black_player).find("knight");
            var black_player_bishop = $(black_player).find("bishop");
            var black_player_queen = $(black_player).find("queen");
            var black_player_king = $(black_player).find("king");


            var white_player = $(board).find("white")[0];
            white_cells = board.getAttribute("white-cells");
            white_player_field = white_player.getAttribute("field");
            var white_player_pawn = $(white_player).find("pawn");
            var white_player_rook = $(white_player).find("rook");
            var white_player_knight = $(white_player).find("knight");
            var white_player_bishop = $(white_player).find("bishop");
            var white_player_queen = $(white_player).find("queen");
            var white_player_king = $(white_player).find("king");

            var chessman = $(xmlDoc).find("chessmans")[0];
            var pawn_unicod = $(chessman).find("pawn")[0].getAttribute("unicode");
            var table = document.getElementById("game_chess");
            for (var i = 0; i < 8; i++) {
                var tr = document.createElement("tr");
                table.appendChild(tr);
                for (var j = 0; j < 8; j++) {
                    var td = document.createElement("td");
                    tr.appendChild(td);
                }
            }


            //black_chess_pieces
            set_chess_pieces(white_player_pawn, "&#9823", table, "black");
            set_chess_pieces(white_player_rook, "&#9820;", table, "black");
            set_chess_pieces(white_player_knight, "&#9822;", table, "black");
            set_chess_pieces(white_player_bishop, "&#9821;", table, "black");
            set_chess_pieces(white_player_queen, "&#9819;", table, "black");
            set_chess_pieces(white_player_king, "&#9818;", table, "black");

            //white_chess_pieces
            set_chess_pieces(black_player_pawn, "&#9823", table, "white");
            set_chess_pieces(black_player_rook, "&#9820;", table, "white");
            set_chess_pieces(black_player_knight, "&#9822;", table, "white");
            set_chess_pieces(black_player_bishop, "&#9821;", table, "white");
            set_chess_pieces(black_player_queen, "&#9819;", table, "white");
            set_chess_pieces(black_player_king, "&#9818;", table, "white");


        }
    );


}

