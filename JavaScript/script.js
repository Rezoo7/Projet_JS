function JavaScriptFetch() {
    var script = document.createElement('script');
    script.src = "https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=" + document.getElementById("search").value;;
    document.querySelector('head').appendChild(script);
}
function jsonFlickrFeed(data) {
    var image = "";
    data.items.forEach(function (element) {
        image += "<img src=\"" + element.media.m + "\"/>";
    });
    document.getElementById("outputDiv").innerHTML = image;
}


$(document).ready(function(){

    var cherche = $("#search");
    cherche.autocomplete({
        minLength :3,
        ville_startsWith : cherche.val(),
        source : function(request,response){
            $.ajax({
                url : 'http://localhost/projet_js/commune.php',
                Type:"GET",
                data: 'commune='+ cherche.val(),
                dataType:'json',
                success: function(data){
                    response($.map(data,function(item){
                        return item.Ville
                    }))
                },
                select : function(event,ui){
                    var paragraphe = $("div");
                    alert(ui.item.Ville);
                    return false;

                }})
        },
    })

    var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    var nombre_max = $("#nombre").val();
    console.log("Nombre max => " + nombre_max);

    $.getJSON(flickerAPI, {
        tags: $("#search").val(),
        tagmode: "any",
        format: "json"
    }).done(function (result, status, xhr) {
        $.each(result.items, function (i, item) {
            $("<img>").attr("src", item.media.m).appendTo("#outputDiv");
            if (i === nombre_max) {
                return false;
            }
        });
    }).fail(function (xhr, status, error) {
        alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
    });

});
