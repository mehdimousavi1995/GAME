function change(sel) {
    $("td[contenteditable=false]").css("background-color", "rgba(0, 192, 0, 0.10)").css("color", "black");
    $("td[contenteditable=true]").css("background-color", "transparent").css("color", "black");
    $("td").each(function () {
        if ($(this).text() == sel)
            $(this).css("background-color", "red")
                .css("color", "white");
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
function validate_row() {
    var arr = new Array(9);
    var tr = $("tr");
    for (var i = 0; i < tr.length; i++) {
        var td = $(tr[i]).find("td");
        for (var j = 0; j < td.length; j++) {
            arr[j] = $(td[j]).text();
        }
        validate(arr, i, "row");
    }
}
function validate_col() {
    var arr = new Array(9);
    var tr = $("tr");
    for (var i = 0; i < tr.length; i++) {
        // var td = $(tr[i]).find("td");+td.length
        for (var j = 0; j < 9; j++) {
            arr[j] = $($(tr[j]).find("td")[i]).text();
        }
        validate(arr, i, "col");
    }
}
function validate(array1, check_index, checker) {
    var validate = new Array();
    var tr = $("tr");
    for (var j = 1; j < 10; j++)
        validate[j] = false;
    for (var i = 0; i < array1.length; i++) {
        if (validate[array1[i]] == false)
            validate[array1[i]] = true;
        else {
            if (checker == "row")
                $($(tr[check_index]).find("td")[i]).css("background", "red");
            else
                $($(tr[i]).find("td")[check_index]).css("background", "red");
            return;
        }
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
    var home_icon=$("#home-icon");
    home_icon.css("display","inline");
    home_icon.on("click",function () {
        $("body").empty();
        re_build_home_page();
    });
    
    var url = "http://ie.ce-it.ir/hw3/xml/sudoku.xml";
    var xslt_url = "http://ceit.aut.ac.ir/~9231018/build_sudoku.xslt.xml";
    var xmlDoc = loadXMLDoc(url);
    var games_Attr = xmlDoc.getElementsByTagName("sudoku");
    var selected_number_color = games_Attr[0].getAttribute("selectedNumberColor");
    var selected_number_back_color = games_Attr[0].getAttribute("selectedNumberBackColor");
    var hover = games_Attr[0].getAttribute("hover");
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
            if(table_is_full()){
                var td = $("td");
                var _cells = new Array();
                for (var i = 0; i < td.length; i++) {
                    _cells.push($(td[i]).text());
                }
                var xml = (new DOMParser()).parseFromString('<?xml version="1.0" encoding="utf-8"?><solution></solution>', "text/xml");
                var cells = xml.createElement("cells");
                for (var i = 0; i < _cells.length; i++) {
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
                var formData="solution_xml=" + (new XMLSerializer()).serializeToString(xml);
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
            if (table_is_full()) {
                $("td[contenteditable=false]").css("background-color", "rgba(0, 192, 0, 0.10)").css("color", "black");
                $("td[contenteditable=true]").css("background-color", "transparent").css("color", "black");
                validate_row();
                validate_col();
            }
            else
                alert("please fill the table and try again ... !");
        });
        $("td").on("mouseover", function () {
            var selected = $(this).text();
            if (selected > 0 && selected < 10)
                change(selected);
        });
        $("td").on("mouseout", function () {
            var selected = $(this).text();
            if (selected > 0 && selected < 10)
            {
                $("td[contenteditable=false]").css("background-color", "rgba(0, 192, 0, 0.10)").css("color", "black");
                $("td[contenteditable=true]").css("background-color", "transparent").css("color", "black");
            }
        });
        $("td").on("keypress", function (evt) {
            var pressed_Key = String.fromCharCode(evt.charCode);
            var last_content = $(this).text();
            var present_content = last_content.concat(pressed_Key);
            if (!((present_content > 0 && present_content < 10) || evt.which == 8)) {
                alert("Please enter a number between 1 to 9 ... ! ");
                $(this).text("");
            }
        });
    });
}