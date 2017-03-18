$(document).ready(function () {
    $(".list-group").addClass("animated");
    
    $("form").submit(function (event) {
        var searchString = document.getElementById("search-box").value;
        getWikiData(searchString, showNewRequestData, 0);
        event.preventDefault();
    })

    $("#get-next-page").click(function () {
        var page = $("#next-page")[0].value;
        var searchString = document.getElementById("search-box").value;
        getWikiData(searchString, showData, page);
    })
});

function getWikiData(searchString, callback, offset) {
    $.ajax({
        url: '//en.wikipedia.org/w/api.php',
        data: { action: 'query', list: 'search', srsearch: searchString, format: 'json', sroffset: offset},
        dataType: 'jsonp',
        complete: function (json) {
            console.log(json);
        },
        success: callback
    });
}

function showNewRequestData(json) {
    $("#result-end")[0].setAttribute("hidden", null);
    $(".article").empty();
    showData(json);
}

function showData(json) {
    $(".animated").removeClass("fadeInUp");
    if (json.hasOwnProperty("continue")){
        $("#next-page")[0].value = json.continue.sroffset;
    }
    else
    {
        $("#get-next-page").addClass("hidden", null);
        $("#result-end").removeAttr("hidden");
        return;
    }

    json.query.search.forEach(function (element) {
        showListElement(element.title, element.snippet);
    });

    $(".article")[0].innerHTML +="<hr>";
    $("#get-next-page").removeClass("hidden");
}


function showListElement(title, description) {

    var element =  $(".list-group:first").clone();
    element.addClass("fadeInUp");
    var titleElement = element.find(".title")[0];
    titleElement.innerHTML = title;
    titleElement.href = "https://en.wikipedia.org/wiki/" + encodeURI(title);
    element.find(".description")[0].innerHTML = description;
    element.appendTo(".article");
}






