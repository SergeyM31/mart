document.addEventListener('DOMContentLoaded', function(){
  // console.log("hello")

  // document.getElementById('menu_mobile_link').addEventListener('click', ViewMenu)

  // padLastFormRow()

const links = document.querySelectorAll('a.scroll')

const menu = document.getElementById('menu_mobile_list')
const close_area = document.getElementById('close_menu_other')


for (let link of links) {
    link.addEventListener('click', function (e) {
      e.preventDefault()

      const blockID = link.getAttribute('href')

      document.querySelector(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })

      menu.style.height = `${menu.scrollHeight}px`;
      onSchedule(function() {
        menu.classList.add('off_menu');
        menu.style.height = "";
      });
      close_area.style.display = "none"
  })
}


function onSchedule(fn) {
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      fn();
    });
  });
}

document.getElementById("close_menu_other").addEventListener('click', function (e) {
  menu.style.height = `${menu.scrollHeight}px`;
  onSchedule(function() {
    menu.classList.add('off_menu');
    menu.style.height = "";
  });

  close_area.style.display = "none"
})

document.getElementById('menu_mobile_link').addEventListener('click', function (e) {
  menu.style.height = `${menu.scrollHeight}px`;
  onSchedule(function() {
    menu.classList.remove('off_menu');
  })

  close_area.style.display = "block"
})
document.getElementById('menu_mobile_close').addEventListener('click', function (e) {
  menu.style.height = `${menu.scrollHeight}px`;
  onSchedule(function() {
    menu.classList.add('off_menu');
    menu.style.height = "";
  });

  close_area.style.display = "none"
})

document.getElementById("scroll").addEventListener('click', function (e) {

  let text = document.querySelectorAll('.header_text p')[0]

  if (text.classList.contains("scroll_hidden")) {
    text.classList.remove("scroll_hidden")
    this.textContent = "Читать дальше »»"
  } else {
    text.classList.add("scroll_hidden")
    this.textContent = "«« Скрыть"
  }
})

let more = document.getElementsByClassName("text_act")

for (let m of more) {
  let select_actors_list = 1;
  let size_actors = m.parentNode.getElementsByClassName("inner_table_actress")[0].getElementsByClassName("act_block").length
  let size_list_actors = Math.floor(size_actors / 20)

  if (size_actors % 20) {
    size_list_actors++
  }

  m.addEventListener('click', function (e) {
    act_block = m.parentNode.getElementsByClassName("inner_table_actress")[0].getElementsByClassName("act_block")

    let start
    let offset

    if (select_actors_list > size_list_actors) {
      select_actors_list = 0 
      offset = 10
    } else {
      offset = 20
    }

    if (select_actors_list <= 1) {
      start = 0
    } else {
      start = (select_actors_list - 1) * 20
    }

    console.log("sel " + select_actors_list + " off " + offset + " start " + start)

    let but = this

    for (let a of act_block) {
      let index = Array.from(act_block).indexOf(a)

      if (index >= start && index < (start + offset)) {
          a.classList.remove("off")
          a.getBoundingClientRect()
          a.classList.remove("opacity_on")
      } else {
          a.classList.add("off")
          a.getBoundingClientRect()
          a.classList.add("opacity_on")
      }
    }

    if (select_actors_list == size_list_actors) {
      but.innerHTML = "«« в начало"
    } else if (select_actors_list == 0) {
      but.innerHTML = "показать еще »»"
    } else {
      but.innerHTML = "далее »»"
    }

    if (select_actors_list != 1) {

      let main_parent

      let yOffset = 0; 

      if (this.parentNode.parentNode.getElementsByClassName("actress_start")[0].offsetHeight == 0) {
        yOffset = -50
      }
      
      main_parent = this.parentNode.parentNode.parentNode.getElementsByClassName("inner_act")[0]

      for (let a of act_block) {
        let index = Array.from(act_block).indexOf(a)

        if (index >= start && index < (start + offset)) {
          if (!isElementInViewport(a)) {
            const y = main_parent.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});

            break;
          }
        }
      }
    }

    select_actors_list++
  })
}

var lazyLoadVideos = [].slice.call(document.querySelectorAll("video.lazy"));
var CntrVideos = [].slice.call(document.querySelectorAll("video.lazy"));

if ("IntersectionObserver" in window) {
  var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(video) {
      if (video.isIntersecting) {

        for (var source in video.target.children) {
          var videoSource = video.target.children[source];
          if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
            videoSource.src = videoSource.dataset.src;
          }
        }
        video.target.load();
        video.target.classList.remove("lazy");
        lazyVideoObserver.unobserve(video.target);
      }});
  });
  
  lazyLoadVideos.forEach(function(lazyVideo) {
    lazyVideoObserver.observe(lazyVideo);
  });

  var CntrVideosObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(video) {
      // console.log("isIntersecting")

      if (video.isIntersecting) {
        video.target.play()
      } else {
        video.target.pause()
      }
    });
  });

  CntrVideos.forEach(function(lazyVideo) {
    CntrVideosObserver.observe(lazyVideo);
  });        
}
});

function isElementInViewport (el) {
let rect = el.getBoundingClientRect();

return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
);
}




