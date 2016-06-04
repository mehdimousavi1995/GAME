// /**
//  * Created by mohammadmehdi on 6/3/16.
//  */
// var pawn_unicode, rook_unicode, knight_unicode, bishop_unicode, queen_unicode, king_unicode, board, score,
//     score_white, score_black, white_cells, black_cells, white_player_field, black_player_field, black_player, black_player_pawn, black_player_rook, black_player_knight,
//     black_player_bishop, black_player_queen, black_player_king, white_player, white_player_pawn, white_player_rook,
//     white_player_knight, white_player_bishop, white_player_queen, white_player_king, white_number_of_pawn,
//     white_number_of_rook, white_number_of_knight, white_number_of_bishop, white_number_of_queen, black_number_of_pawn,
//     black_number_of_rook, black_number_of_knight, black_number_of_bishop, black_number_of_queen;
// var clicked_item;
//
// function loadXMLDoc(filename) {
//     var xhttp;
//     if (window.ActiveXObject) {
//         xhttp = new ActiveXObject("Msxml2.XMLHTTP");
//     }
//     else {
//         xhttp = new XMLHttpRequest();
//     }
//     xhttp.open("GET", filename, false);
//     try {
//         xhttp.responseType = "msxml-document"
//     } catch (err) {
//     } // Helping IE11
//     xhttp.send("");
//     return xhttp.responseXML;
// }
// function set_chess_pieces(chess_pieces, chess_pieces_unicode, table, color) {
//     var row, col;
//     var tr = $(table).find("tr");
//     for (var k = 0; k < chess_pieces.length; k++) {
//         row = $(chess_pieces[k]).attr("row");
//         col = $(chess_pieces[k]).attr("col");
//         $($(tr[row]).find("td")[col]).css("color", color).attr("id", color);
//         $(tr[row]).find("td")[col].innerHTML = chess_pieces_unicode;
//     }
// }
//
// function initial() {
//     var url = "http://ie.ce-it.ir/hw3/xml/chess.xml";
//     var xslt_url = "http://ceit.aut.ac.ir/~9231018/build_chess.xslt.xml";
//
//     var xmlDoc = loadXMLDoc(url);
//     var xsl = loadXMLDoc(xslt_url);
//
//     if (document.implementation && document.implementation.createDocument) {
//         var xsltProcessor = new XSLTProcessor();
//         xsltProcessor.importStylesheet(xsl);
//         var resultDocument = xsltProcessor.transformToFragment(xmlDoc, document);
//         document.getElementById("main-container").appendChild(resultDocument);
//     }
//     pawn_unicode = "&#9823;";
//     rook_unicode = "&#9820;";
//     knight_unicode = "&#9822;";
//     bishop_unicode = "&#9821;";
//     queen_unicode = "&#9819;";
//     king_unicode = "&#9818;";
//
//
//     board = $(xmlDoc).find("board")[0];
//     score = $(xmlDoc).find("score")[0];
//     score_white = $(score).find("white")[0].innerHTML;
//     score_black = $(score).find("black")[0].innerHTML;
//
//
//     black_player = $(board).find("black")[0];
//     black_cells = board.getAttribute("black-cells")
//     black_player_field = black_player.getAttribute("field");
//     white_player = $(board).find("white")[0];
//     white_cells = board.getAttribute("white-cells");
//     white_player_field = white_player.getAttribute("field");
//
//
//     black_player_pawn = $(black_player).find("pawn");
//     black_player_rook = $(black_player).find("rook");
//     black_player_knight = $(black_player).find("knight");
//     black_player_bishop = $(black_player).find("bishop");
//     black_player_queen = $(black_player).find("queen");
//     black_player_king = $(black_player).find("king");
//
//
//
//     white_player_pawn = $(white_player).find("pawn");
//     white_player_rook = $(white_player).find("rook");
//     white_player_knight = $(white_player).find("knight");
//     white_player_bishop = $(white_player).find("bishop");
//     white_player_queen = $(white_player).find("queen");
//     white_player_king = $(white_player).find("king");
//
//     white_number_of_pawn = 8 - white_player_pawn.length;
//     white_number_of_rook = 2 - white_player_rook.length;
//     white_number_of_knight = 2 - white_player_knight.length;
//     white_number_of_bishop = 2 - white_player_bishop.length;
//     white_number_of_queen = 1 - white_player_queen.length;
//
//
//     black_number_of_pawn = 8 - black_player_pawn.length;
//     black_number_of_rook = 2 - black_player_rook.length;
//     black_number_of_knight = 2 - black_player_knight.length;
//     black_number_of_bishop = 2 - black_player_bishop.length;
//     black_number_of_queen = 1 - black_player_queen.length;
//
//
//     var table = document.getElementById("game_chess");
//     for (var i = 0; i < 8; i++) {
//         var tr = document.createElement("tr");
//         table.appendChild(tr);
//         for (var j = 0; j < 8; j++) {
//             var td = document.createElement("td");
//             tr.appendChild(td);
//         }
//     }
//
//     //white_chess_pieces
//     set_chess_pieces(white_player_pawn, pawn_unicode, table, "white");
//     set_chess_pieces(white_player_rook, rook_unicode, table, "white");
//     set_chess_pieces(white_player_knight, knight_unicode, table, "white");
//     set_chess_pieces(white_player_bishop, bishop_unicode, table, "white");
//     set_chess_pieces(white_player_queen, queen_unicode, table, "white");
//     set_chess_pieces(white_player_king, king_unicode, table, "white");
//
//     //black_chess_pieces
//     set_chess_pieces(black_player_pawn, pawn_unicode, table, "black");
//     set_chess_pieces(black_player_rook, rook_unicode, table, "black");
//     set_chess_pieces(black_player_knight, knight_unicode, table, "black");
//     set_chess_pieces(black_player_bishop, bishop_unicode, table, "black");
//     set_chess_pieces(black_player_queen, queen_unicode, table, "black");
//     set_chess_pieces(black_player_king, king_unicode, table, "black");
//
//     update_table_panel_and_score(white_number_of_pawn, pawn_unicode, "white", "#white-chessman-panel", score_white);
//     update_table_panel_and_score(white_number_of_rook, rook_unicode, "white", "#white-chessman-panel", score_white);
//     update_table_panel_and_score(white_number_of_bishop, bishop_unicode, "white", "#white-chessman-panel", score_white);
//     update_table_panel_and_score(white_number_of_knight, knight_unicode, "white", "#white-chessman-panel", score_white);
//     update_table_panel_and_score(white_number_of_queen, queen_unicode, "white", "#white-chessman-panel", score_white);
//
//     update_table_panel_and_score(black_number_of_pawn, pawn_unicode, "black", "#black-chessman-panel", score_black);
//     update_table_panel_and_score(black_number_of_rook, rook_unicode, "black", "#black-chessman-panel", score_black);
//     update_table_panel_and_score(black_number_of_bishop, bishop_unicode, "black", "#black-chessman-panel", score_black);
//     update_table_panel_and_score(black_number_of_knight, knight_unicode, "black", "#black-chessman-panel", score_black);
//     update_table_panel_and_score(black_number_of_queen, queen_unicode, "black", "#black-chessman-panel", score_black);
//
//
// }
// function update_table_panel_and_score(chess_pieces, chess_pieces_unicode, player, panel_id, player_score) {
//     var panel = $(panel_id).css("color", player).find("tr");
//     for (var i = 0; i < panel.length; i++) {
//         if (($(panel[i]).find("td")[0].getAttribute("fill") != "true") && chess_pieces > 0) {
//             $(panel[i]).find("td")[0].setAttribute("fill", "true");
//             $(panel[i]).find("td")[0].innerHTML = chess_pieces_unicode;
//             chess_pieces--;
//         }
//         if (($(panel[i]).find("td")[1].getAttribute("fill") != "true") && chess_pieces > 0) {
//             $(panel[i]).find("td")[1].setAttribute("fill", "true");
//             $(panel[i]).find("td")[1].innerHTML = chess_pieces_unicode;
//             chess_pieces--;
//         }
//         if (player == "white")
//             document.getElementById("white-score").innerHTML = player_score;
//         else
//             document.getElementById("black-score").innerHTML = player_score;
//
//
//     }
//
// }
// function AnimateRotate() {
//     var angle=180;
//     var $elem = $('#game_chess');
//     $({deg: 0}).animate({deg: angle}, {
//         duration: 2000,
//         step: function(now) {
//             // in the step-callback (that is fired each step of the animation),
//             // you can use the `now` paramter which contains the current
//             // animation-position (`0` up to `angle`)
//             $elem.css({
//                 transform: 'rotate(' + now + 'deg)'
//             });
//         }
//     });
//
//
// }
// // function rotate() {
// //     $('#game_chess').animate({  borderSpacing: 180 }, {
// //         step: function(now,fx) {
// //             $(this).css('-webkit-transform','rotate('+now+'deg)');
// //             $(this).css('-moz-transform','rotate('+now+'deg)');
// //             $(this).css('transform','rotate('+now+'deg)');
// //         },
// //         duration:1500
// //     },'swing');
// //
// //     $("td").animate({  borderSpacing: 180 }, {
// //         step: function(now,fx) {
// //             $(this).css('-webkit-transform','rotate('+now+'deg)');
// //             $(this).css('-moz-transform','rotate('+now+'deg)');
// //             $(this).css('transform','rotate('+now+'deg)');
// //         },
// //         duration:1
// //     },'swing');
// // }
// function change_back_color() {
//     var table = document.getElementById("game_chess");
//     $(table).find("td#white").css("color", "white");
//     $(table).find("td#black").css("color", "black");
//     $(this).css("color", "red");
//
//
// }
//
// function display_chess() {
//     $("document").ready(function () {
//         initial();
//         // var table = document.getElementById("game_chess");
//         // $(table).find("td").on("click", change_back_color);
//         $("#game_chess").on("click",function () {
//             AnimateRotate();
//         })
//     });
// }
//
//
// /*function () {
//  rotation += 180;
//  $(this).css({
//  '-webkit-transform': 'rotate(' + rotation + 'deg)',
//  '-moz-transform': 'rotate(' + rotation + 'deg)',
//  '-ms-transform': 'rotate(' + rotation + 'deg)',
//  'transform': 'rotate(' + rotation + 'deg)'
//  });
//  $("td").css({
//  '-webkit-transform': 'rotate(' + rotation + 'deg)',
//  '-moz-transform': 'rotate(' + rotation + 'deg)',
//  '-ms-transform': 'rotate(' + rotation + 'deg)',
//  'transform': 'rotate(' + rotation + 'deg)'
//  });
//  }*/