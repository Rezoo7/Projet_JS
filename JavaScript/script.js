$(document).ready(function(){

    var cherche = $("#commune");
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
    $.getJSON(flickerAPI, {
        tags: $("#search").val(),
        tagmode: "any",
        format: "json"
    }).done(function (result, status, xhr) {
        $.each(result.items, function (i, item) {
            $("<img>").attr("src", item.media.m).appendTo("#outputDiv");
            if (i === 5) {
                return false;
            }
        });
    }).fail(function (xhr, status, error) {
        alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
    });

});
