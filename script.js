console.clear();

document.addEventListener("DOMContentLoaded", function(event) {iOS(); check()});
console.clear();
var dl = document.getElementById("Chameleon").children
var footer = document.getElementById("target")
var d2=  document.getElementById("Chameleon").children.length

function check (){
  for (i = 0; i < d2; i++) {
    if (dl[i].getBoundingClientRect().top <= footer.getBoundingClientRect().top ){
      footer.style.backgroundColor =window.getComputedStyle(dl[i], null).getPropertyValue("background-color");   
    }
  }
}

window.addEventListener('scroll', function(ev) {
  check();
});

if(window.innerWidth < 500){
  $('.item').text('Abigail Meyer');
  $('.wrapper').css('top','10%');
  $('.wrapper').css('width','250px');
  $('.wrapper').css('font-size','25px');
  $('.embed').css('width','60%');
  $('.wallenberg').css('float','center');
  $('.cover').css('margin-top','-10%');
  $('.toc').hide();
  $('.maps').hide();
  $('.section').css('padding-left','0%');
  $('#target').css('padding-left','0%');
  $('.wrapper').css('left','50%');
  $('body').css('font-size','12px');
  $('.bottom').hide();
}


/*
ios bug
*/
function iOS() {

  var iDevices = [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ];

  if (!!navigator.platform) {
    while (iDevices.length) {
      if (navigator.platform === iDevices.pop()){ 
        
        bug.style.visibility = 'visible';

        return true;
      
      }
    }
  }
  return false;
}

(function () {
  const btn = document.querySelectorAll('.a');
  const cursor = document.querySelector('.cursor');

  const update = function (e) {
    const span = this.querySelector('span');

    if (e.type === 'mouseleave') {
      span.style.cssText = '';
    } else {
      const { offsetX: x, offsetY: y } = e,
      { offsetWidth: width, offsetHeight: height } = this,
      walk = 20,
      xWalk = x / width * (walk * 2) - walk,
      yWalk = y / height * (walk * 2) - walk;

      span.style.cssText = `transform: translate(${xWalk}px, ${yWalk}px);`;
    }
  };

  const handleCurosr = e => {
    const { clientX: x, clientY: y } = e;
    cursor.style.cssText = `left: ${x}px; top: ${y}px;`;
  };

  btn.forEach(b => b.addEventListener('mousemove', update));
  btn.forEach(b => b.addEventListener('mouseleave', update));
  window.addEventListener('mousemove', handleCurosr);
})();

let wrapper;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function writingAll(stringTarget, container) {
  wrapper = document.querySelector('[' + container + ']');
  const stringsContainer = document.getElementsByClassName(stringTarget);

  for (i = 0; i < stringsContainer.length; i++) {
    const string = stringsContainer[i].textContent;
    await write(string);
  }
};

async function write(text) {
  let index = 0;
  while (index < text.length) {
    const timeout = 100;
    await sleep(timeout);
    index++;
    wrapper.innerHTML = text.substring(0, index);
  }
};


writingAll('item', 'data-text');

// Click function for show the Modal
$(".show").on("click", function(){
  $(this).next(".mask").addClass("active");
});

// Function for close the Modal
function closeModal(){
  $(".mask").removeClass("active");
}

// Call the closeModal function on click
$(".close, .mask").on("click", function(){
  closeModal();
});

$("#showtrigger").click(function(){
   $(".collapse").show();
   $("#showtrigger").hide();
   $("#hidetrigger").show();
 });

$("#hidetrigger").click(function(){
   $(".collapse").hide();
   $("#showtrigger").show();
   $("#hidetrigger").hide();
 });



var toc = document.querySelector( '.toc' );
var tocPath = document.querySelector( '.toc-marker path' );
var tocItems;

// Factor of screen size that the element must cross
// before it's considered visible
var TOP_MARGIN = 0.1,
    BOTTOM_MARGIN = 0.2;

var pathLength;

var lastPathStart,
    lastPathEnd;

window.addEventListener( 'resize', drawPath, false );
window.addEventListener( 'scroll', sync, false );

drawPath();

function drawPath() {
  
  tocItems = [].slice.call( toc.querySelectorAll( 'li' ) );

  // Cache element references and measurements
  tocItems = tocItems.map( function( item ) {
    var anchor = item.querySelector( 'a' );
    var target = document.getElementById( anchor.getAttribute( 'href' ).slice( 1 ) );

    return {
      listItem: item,
      anchor: anchor,
      target: target
    };
  } );

  // Remove missing targets
  tocItems = tocItems.filter( function( item ) {
    return !!item.target;
  } );

  var path = [];
  var pathIndent;

  tocItems.forEach( function( item, i ) {

    var x = item.anchor.offsetLeft - 5,
        y = item.anchor.offsetTop,
        height = item.anchor.offsetHeight;

    if( i === 0 ) {
      path.push( 'M', x, y, 'L', x, y + height );
      item.pathStart = 0;
    }
    else {
      // Draw an additional line when there's a change in
      // indent levels
      if( pathIndent !== x ) path.push( 'L', pathIndent, y );

      path.push( 'L', x, y );
      
      // Set the current path so that we can measure it
      tocPath.setAttribute( 'd', path.join( ' ' ) );
      item.pathStart = tocPath.getTotalLength() || 0;
      
      path.push( 'L', x, y + height );
    }
    
    pathIndent = x;
    
    tocPath.setAttribute( 'd', path.join( ' ' ) );
    item.pathEnd = tocPath.getTotalLength();

  } );
  
  pathLength = tocPath.getTotalLength();
  
  sync();
  
}

function sync() {
  
  var windowHeight = window.innerHeight;
  
  var pathStart = pathLength,
      pathEnd = 0;
  
  var visibleItems = 0;
  
  tocItems.forEach( function( item ) {

    var targetBounds = item.target.getBoundingClientRect();
    
    if( targetBounds.bottom > windowHeight * TOP_MARGIN && targetBounds.top < windowHeight * ( 1 - BOTTOM_MARGIN ) ) {
      pathStart = Math.min( item.pathStart, pathStart );
      pathEnd = Math.max( item.pathEnd, pathEnd );
      
      visibleItems += 1;
      
      item.listItem.classList.add( 'visible' );
    }
    else {
      item.listItem.classList.remove( 'visible' );
    }
    
  } );
  
  // Specify the visible path or hide the path altogether
  // if there are no visible items
  if( visibleItems > 0 && pathStart < pathEnd ) {
    if( pathStart !== lastPathStart || pathEnd !== lastPathEnd ) {
      tocPath.setAttribute( 'stroke-dashoffset', '1' );
      tocPath.setAttribute( 'stroke-dasharray', '1, '+ pathStart +', '+ ( pathEnd - pathStart ) +', ' + pathLength );
      tocPath.setAttribute( 'opacity', 1 );
    }
  }
  else {
    tocPath.setAttribute( 'opacity', 0 );
  }
  
  lastPathStart = pathStart;
  lastPathEnd = pathEnd;

}
