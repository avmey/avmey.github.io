console.clear();

document.addEventListener("DOMContentLoaded", function(event) {iOS(); check()});
console.clear();
var dl = document.getElementById("Chameleon").children
var footer = document.getElementById("target")
var d2=  document.getElementById("Chameleon").children.length

function check (){
  for (i = 0; i < d2; i++)
{

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
      if (navigator.platform === iDevices.pop())
      
      { 
        
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

$("#mondrian-link").on("click", function(){
  $('#research-header').text('Mondrian');
  $('.mondrian').show();
  $(".lakeeffect").hide();
  $(".northwoods").hide();
});

$("#lakeeffect-link").on("click", function(){
  $('#research-header').text('NOAA/GLERL Lake-Effect Snow Modeling');
  $('.mondrian').hide();
  $(".lakeeffect").show();
  $(".northwoods").hide();
});

$("#northwoods-link").on("click", function(){
  $('#research-header').text('Northwoods Survey');
  $('.mondrian').hide();
  $(".lakeeffect").hide();
  $(".northwoods").show();
});

$("#rancocas-link").on("click", function(){
  $('#volunteering-header').text('Rancocas Creek Farm');
  $('.rancocas').show();
  $(".utk").hide();
  $(".ala").hide();
});

$("#utk-link").on("click", function(){
  $('#volunteering-header').text('United Technologies for Kids');
  $('.rancocas').hide();
  $(".utk").show();
  $(".ala").hide();
});

$("#ala-link").on("click", function(){
  $('#volunteering-header').text('African Leadership Academy Summer Engineering Academy');
  $('.rancocas').hide();
  $(".utk").hide();
  $(".ala").show();
});
