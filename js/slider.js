  var skils_button = document.querySelector('li.nav-skils');
      skils_box = document.querySelector('section.main-about');

  skils_button.addEventListener('click', showBox);
  function showBox(){
    skils_box.classList.add('show-box')
  }

   $(document).ready(function(){
     $('.portfolio-cards').slick({
 dots: true,
 infinite: false,
 speed: 300,
 slidesToShow: 3,
 slidesToScroll: 1,
 responsive: [
   {
     breakpoint: 900,
     settings: {
       slidesToShow: 2,
       slidesToScroll: 1,
       infinite: true,
       dots: true
     }
   },
   {
     breakpoint: 600,
     settings: {
       slidesToShow: 1,
       slidesToScroll: 1
     }
   }

   // You can unslick at a given breakpoint now by adding:
   // settings: "unslick"
   // instead of a settings object
 ]
     });
   });
