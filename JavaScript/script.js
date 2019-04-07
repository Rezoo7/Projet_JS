/*function JavaScriptFetch() {
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
*/




$(document).ready(function(){

    var cherche = $("#search");
    cherche.autocomplete({
        minLength :3,
        ville_startsWith : cherche.val(),
        source : function(request,response){
            $.ajax({
                url : 'http://localhost/tests/ProjetJS/commune.php',
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
    
    var recherche =null;
    var nombre_max = 0;

   $("#submit").on("click", function(){
         recherche = $("#search").val();
       var nombre_max = $("#nombre").val();
    console.log("Nombre max => " + nombre_max);
    console.log("Ville =>" + recherche); 
    $.getJSON(flickerAPI, {
        tags: recherche,
        tagmode: "any",
        format: "json"
    }).done(function (result, status, xhr) {
        $.each(result.items, function (i, item) {
            $(document.createElement("li")).appendTo("#outputPhotos").append($(document.createElement("img")).attr("src", item.media.m)).css("list-style","none");
            $("li").on("click",function(){
                $("#dialog").append(item.title+"</br>"+item.date_taken+"</br>"+item.description+"</br>"+item.tags)
                $("#dialog").dialog();
            })

            if (i === nombre_max-1) {
                return false;
            }
        });
    }).fail(function (xhr, status, error) {
        $("#dialog").append("Il n'y a pas d'image pour cette ville");
        $("#dialog").dialog();
    });

})


$("li").on("click",function(){

})
});

var anc_onglet = 'tableau';
change_onglet(anc_onglet)  

function change_onglet(name){
    document.getElementById('onglet_'+anc_onglet).className ="onglet_0 onglet";
    document.getElementById('onglet_' + name).className ="onglet_1 onglet";
    document.getElementById('contenu_onglet_' +anc_onglet).style.display ="none";
    document.getElementById('contenu_onglet_'+name).style.display="block";
    anc_onglet =name;
    }
