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
function displayResult() {
    var url = "http://ie.ce-it.ir/hw3/xml/sudoku.xml";
    var xslt_url = "http://ceit.aut.ac.ir/~9231018/build_sudoku.xslt.xml";
    var xmlDoc = loadXMLDoc(url);
    var games_Attr = xmlDoc.getElementsByTagName("sudoku");
    var selected_number_color = games_Attr[0].getAttribute("selectedNumberColor");
    var selected_number_back_color = games_Attr[0].getAttribute("selectedNumberBackColor");
    var hover = games_Attr[0].getAttribute("hover");
    var xsl = loadXMLDoc(xslt_url);
// code for IE
//     if (window.ActiveXObject || xhttp.responseType == "msxml-document") {
//         var ex = xmlDoc.transformNode(xsl);
//         document.getElementById("main-container").innerHTML = ex;
//     }
// code for Chrome, Firefox, Opera, etc .
    if (document.implementation && document.implementation.createDocument) {
        var xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xsl);
        var resultDocument = xsltProcessor.transformToFragment(xmlDoc, document);
        document.getElementById("main-container").appendChild(resultDocument);
    }
    $("document").ready(function () {

        $("#check-sudoku").on("click", function () {
                var check_some = new Array(9);
                var check = new Array();
                for (var i = 0; i < check_some.length; i++)
                    check_some[i] = new Array(9);
                $("tr").each(function (i, el_tr) {
                    $(this).children().each(function (j, el_td) {
                        check_some[i][j] = $(this).text();
                    });
                });
                for (var i = 0; i < 9; i++)
                    check[i] = "false";
                var txt = "";
                for (var i = 0; i < 9; i++) {
                    for (var j = 0; j < 9; j++)
                        txt += check_some[i][j] + ", ";

                    txt += "\n";
                }
                alert(txt);
            }
        );

        $("td").on("click", function () {
            var selected = $(this).text();
            if (selected > 0 && selected < 10)
                change(selected);
        });
        $("td").on("keypress", function (evt) {
            var pressed_Key = String.fromCharCode(evt.charCode);
            var last_content = $(this).text();
            var present_content = last_content.concat(pressed_Key);
            if (!((present_content > 0 && present_content < 9) || evt.which == 8)) {
                alert("please enter number between 0 to 9 ");
                $(this).text("");
            }
        });
    });


}