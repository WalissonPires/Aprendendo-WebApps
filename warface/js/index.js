
function caroselStart() {
    
    var carosel = document.getElementById('carosel');
    var caroselIndex = document.getElementById('caroselIndex');
    var maxIndex = carosel.children.length - 1;
    var index = 0;

    var id = setInterval(() => {
        
        console.log('carosel change');

        var crActive = carosel.querySelector('.active');
        crActive.className = crActive.className.replace('active', '');

        var ciActive = caroselIndex.querySelector('.active');
        ciActive.className = ciActive.className.replace('active', '');
        
        var crItem = carosel.children[index];
        crItem.className = crItem.className + ' active';

        var ciItem = caroselIndex.children[index];
        ciItem.className = ciItem.className + ' active';

        index++;
        if (index > maxIndex)
            index = 0;			

    }, 5000);
}




window.addEventListener('load', function() {

    caroselStart();
});