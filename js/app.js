//maps
var map;
var markers = [];
function mapsLoaded(){
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10
    });
    $(document).ready(function(){
    //logo-inicial-fade
        setTimeout(function(){
            $('.page-logo').addClass('fade');
            setTimeout(function(){
                $('.page-logo').addClass('gone');
            }, 200);
        }, 3000);
    //filter
        var filter = function() {
            var filtered;
            var value = $(this).val().toLowerCase();
            if(value == ""){
                filtered = $(restaurantes);
            } else {
                filtered = $(restaurantes).filter(function() {
                    return this.type === value;
                });
            }
    //remove marker from map
            for (var i = 0 ; i < markers.length ; i++) {
                markers[i].setMap(null);
            }
            markers = [];
            var bounds = new google.maps.LatLngBounds();
    //add images
            var imagesHtml = "";
            filtered.each(function(){
                imagesHtml = imagesHtml + "<img src=\"" + this.image + "\" name=\"" + this.name + "\" alt=\"" + this.description + "\">";
    //add markers
                var marker = new google.maps.Marker({
                    position: {lat: this.latitude, lng: this.longitude},
                    map: map,
                    title: "",
                });
                markers.push(marker);
                bounds.extend(marker.position);
            });
            
            $('.images').html(imagesHtml);
            $(".images img").on("click", function(){
                $(".modal-title").text(this.name);
                $(".description").text(this.alt);
            });
            if (markers.length > 0){
                map.fitBounds(bounds);
            }
        }
    //chamando o filtro toda vez q soltar o botao
        $("#myInput").on("keyup", filter);
        filter.bind($("#myInput"))();
    });
        
}