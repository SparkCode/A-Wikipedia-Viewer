$(document).ready(function () {
    $(".list-group-item").addClass("animated fadeInUp");
    
    
    $("#searchButton").click(function () {
        var searchString = document.getElementById("search-box").value;
        getWikiData(searchString, showNewRequestData, 0)
    });

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
    $("#page-end")[0].setAttribute("hidden", null);
    $(".article").empty();
    showData(json);
}

function showData(json) {
    if (json.hasOwnProperty("continue")){
        $("#next-page")[0].value = json.continue.sroffset;
    }
    else
    {
        $("#get-next-page")[0].setAttribute("hidden", null);
        $("#page-end").removeAttr("hidden");
        return;
    }

    json.query.search.forEach(function (element) {
        showListElement(element.title, element.snippet);
    });

    $(".article")[0].innerHTML +="<hr>";
    $("#get-next-page").removeAttr("hidden");
}


function showListElement(title, description) {

    var element =  $(".list-group:first").clone();
    var titleElement = element.find(".title")[0];
    titleElement.innerHTML = title;
    titleElement.href = "https://en.wikipedia.org/wiki/" + encodeURI(title);
    element.find(".description")[0].innerHTML = description;
    element.appendTo(".article");
}





