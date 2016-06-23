var pressed_key_glob = '';

function change(sel, back_color, color) {
    $("td[contenteditable=false]").css("background-color", "rgba(0, 192, 0, 0.10)").css("color", "black");
    $("td[contenteditable=true]").css("background-color", "transparent").css("color", "black");
    $("td").each(function () {
        if ($(this).text() == sel)
            $(this).css("background-color", back_color)
                .css("color", color);
    });
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

function check_repeating_number(array) {
    var temp = new Array(10);
    for (var i = 1; i < temp.length; i++)
        temp[i] = false;
    for (var i = 0; i < array.length; i++) {
        if (temp[parseInt(array[i])] == false)
            temp[parseInt(array[i])] = true;
        else
            return true;
    }
    return false;

}
function validate(_row, _col, j_row, i_col) {
    var td = $('td');
    if (_row >= 0 && _row < 9) {
        for (var i = _row * 9; i < _row * 9 + 9; i++)
            $(td[i]).css('background-color', 'pink');
    }
    if (_col >= 0 && _col < 9) {
        for (var i = _col; i < td.length; i++)
            if ((i % 9) == _col)
                $(td[i]).css('background-color', 'pink');
    }
    if (i_col >= 0 && j_row >= 0) {
        var start = (j_row * 3 * 9) + (i_col * 3);
        for (var k = start; k < start + 3; k++) {
            $(td[k]).css('background-color', 'pink');
            $(td[k + 9]).css('background-color', 'pink');
            $(td[k + 18]).css('background-color', 'pink');
        }
    }
}
function check_it_out() {
    var td = $('td');
    var _i = 0, _j = 0;
    for (var k = 0; k < 9; k++) {
        var arr = new Array();
        var arr1 = new Array();
        var arr2 = new Array();
        if (k > 0 && k < 3)
            _i++;
        if (k == 3) {
            _i = 0;
            _j++
        }
        if (k > 3 && k < 6)
            _i++;
        if (k == 6) {
            _i = 0;
            _j++
        }
        if (k > 6)
            _i++;
        for (var i = k * 9; i < k * 9 + 9; i++)
            if ($(td[i]).text() != '')
                arr.push(parseInt($(td[i]).text()));
        if (check_repeating_number(arr))
            validate(k, -1, -1, -1);
        for (var i = k; i < td.length; i++)
            if ((i % 9) == k && $(td[i]).text() != '')
                arr1.push(parseInt($(td[i]).text()));
        if (check_repeating_number(arr1))
            validate(-1, k, -1, -1);
        var start = (_j * 3 * 9) + (_i * 3);
        for (var f = start; f < start + 3; f++) {
            if ($(td[f]).text() != '')
                arr2.push(parseInt($(td[f]).text()));
            if ($(td[f + 9]).text() != '')
                arr2.push(parseInt($(td[f + 9]).text()));
            if ($(td[f + 18]).text() != '')
                arr2.push(parseInt($(td[f + 18]).text()));
        }
        if (check_repeating_number(arr2))
            validate(-1, -1,_j,_i);

    }
}
function table_is_full() {
    var td = $("td");
    for (var i = 0; i < td.length; i++)
        if ($(td[i]).text() == "")
            return false;
    return true;
}
function displaySudoku() {
    $("#main-container").remove();
    var home_icon = $("#home-icon");
    home_icon.css("display", "inline");
    home_icon.on("click", function () {
        $("body").empty();
        re_build_home_page();
    });

    var url = "http://ie.ce-it.ir/hw3/xml/sudoku.xml";
    var xslt_url = "http://ceit.aut.ac.ir/~9231018/build_sudoku.xslt.xml";
    var xmlDoc = loadXMLDoc(url);
    var games_Attr = xmlDoc.getElementsByTagName("sudoku");

    var selected_number_color = games_Attr[0].getAttribute("selectedNumberColor");
    var selected_number_back_color = games_Attr[0].getAttribute("selectedNumberBackColor");
    var hover_back = games_Attr[0].getAttribute("hover");

    var xsl = loadXMLDoc(xslt_url);

    if (document.implementation && document.implementation.createDocument) {
        var xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xsl);
        var resultDocument = xsltProcessor.transformToFragment(xmlDoc, document);
        document.body.appendChild(resultDocument);
    }
    $("document").ready(function () {
            var tr = $("tr");
            var td = tr[0];
            $("#submit-sudoku").on("click", function () {
                if (table_is_full()) {
                    var td = $("td");
                    var _cells = new Array();
                    for (var i = 0; i < td.length; i++) {
                        _cells.push($(td[i]).text());
                    }
                    var xml = (new DOMParser()).parseFromString('<?xml version="1.0" encoding="utf-8"?><solution></solution>', "text/xml");
                    var cells = xml.createElement("cells");
                    for (var i = 0; i
                    < _cells.length; i++) {
                        var cell = xml.createElement("cell");
                        cell.setAttribute("posval", Math.floor(i / 9) * 100 + (i % 9) * 10 + parseInt(_cells[i]));
                        cell.appendChild(xml.createTextNode(_cells[i]));
                        cells.appendChild(cell);
                    }
                    var student = xml.createElement("student");
                    student.setAttribute("id", "9231053");
                    student.appendChild(xml.createTextNode("Seyed Mohammad Mehdi Mousavi"));
                    xml.getElementsByTagName("solution")[0].appendChild(cells);
                    xml.getElementsByTagName("solution")[0].appendChild(student);
                    var formData = "solution_xml=" + (new XMLSerializer()).serializeToString(xml);
                    $.ajax({
                        url: 'http://ie.ce-it.ir/hw3/sudoku_validator.php',
                        type: 'POST',
                        data: formData,
                        success: function (returndata) {
                            alert(returndata);
                        },
                        error: function () {
                            alert("error in ajax form submission");
                        }
                    });
                }
                else alert("please fill the table and try again ... !");
            });
            $("#check-sudoku").on("click", function () {
                $("td[contenteditable=false]").css("background-color", "rgba(0, 192, 0, 0.10)").css("color", "black");
                $("td[contenteditable=true]").css("background-color", "transparent").css("color", "black");

                check_it_out();
                // validate_row();
                // validate_col();
                // validate(-1, -1, 2, 2);

            });
            // td_hover();
            $("td").on("click", function () {
                var selected = $(this).text();
                if (selected > 0 && selected < 10)
                    change(selected, selected_number_back_color, selected_number_color);
            });
            $('td').on('mouseover', function () {
                $(this).css('background-color', hover_back);
            })

            $("td").on("mouseout", function () {
                var selected = $(this).text();
                $("td[contenteditable=false]").css("background-color", "rgba(0, 192, 0, 0.10)").css("color", "black");
                $("td[contenteditable=true]").css("background-color", "transparent").css("color", "black");
            });
            $('td').on('keyup', function (evt) {
                    if (!((pressed_key_glob > 0 && pressed_key_glob < 10))) {
                        $(this).text(null);
                    }
                }
            );
            $("td").on("keypress", function (evt) {
                var pressed_Key = String.fromCharCode(evt.charCode);
                pressed_key_glob = pressed_Key;
                if (!((pressed_Key > 0 && pressed_Key < 10) || evt.which == 8)) {
                    $(this).text(null);
                }
            });
        }
    )
    ;
}