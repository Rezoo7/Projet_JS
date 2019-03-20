$(document).ready(function(){
    var cherhche = $("#commune");
    cherhche.autocomplete({
        minLength :3,
        ville_startsWith : cherhche.val(),
        source : function(request,response){
            $.ajax({
                url : 'http://localhost/tests/commune.php',
                Type:"GET",
                data: 'commune='+ cherhche.val(),
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
});
