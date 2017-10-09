$("#beer-icon").on({
 "mouseover" : function() {
    this.src = 'beer-icon-color.svg';
  },
  "mouseout" : function() {
    this.src='beer-icon.svg';
  }
});

$('#search-beer').on('submit', function(e) {
e.preventDefault()
$('.beer-list').html('')
$('.description').html('')
var query = $(this).find('input').val()

$.ajax({
        url: 'https://quiet-inlet-67115.herokuapp.com/api/search/all?q=' + query
    })
    .then(function(oData) {
        console.log(oData)
        oData.forEach(function(beer) {
            console.log(beer)
            $('.beer-list').append('<h3 id="' + beer.id + '">' + beer.name + '</h3>')
        })
        $('h3').on('click', function (event) {
            $('.description').html('')
            var idSelected = event.target.id
            var selected = oData.filter(function(element){
                if (idSelected == element.id) {
                    return true
                }
            })
            var beerDesc = selected[0].description || selected[0].style && selected[0].style.description || "Not avaliable"
            var label = selected[0].labels && selected[0].labels.medium || "img-not-found.svg"
            console.log(beerDesc)
            $('.description').append('<div class="new-back"></div>')
            console.log(this)
            $('.new-back').append('<div id="img-top-bar"><img id="desc-img" src="' + label + '" width= 170px height= 170px></div>')
            $('#img-top-bar').append('<h4>' + selected[0].name + '</h4>')
            $('.new-back').append('<span><p>' + beerDesc + '</p></span>')
        })
    })
})