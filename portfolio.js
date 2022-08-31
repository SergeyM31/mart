
document.addEventListener('DOMContentLoaded', function(){

    /* Mob menu */
    const menu = document.getElementById('menu_mobile_list')


    // document.getElementById('menu_mobile_link').addEventListener('click', function (e) {
    //     menu.style.display = "block"
    //   })

    // document.getElementById('menu_mobile_close').addEventListener('click', function (e) {
    //     menu.style.display = "none"
    // })

    const close_area = document.getElementById('close_menu_other')
  
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





// GALERY LITTLE
    var photoIndex = 1;

    let photos = document.querySelectorAll(".interactive_gallery img")

    photos[0].classList.add("on_img")
    photos[0].classList.add("select_img")

    for (let i = 0; i < photos.length; i++) {
        let span = document.createElement('span')
        let div = document.createElement('div');
        div.append(span)
        document.getElementById("galery_selector").append(div);
    }

    let circle = document.querySelectorAll(".galery_selector div")

    for (let i = 0; i < circle.length; i++) {
        circle[i].addEventListener("click", function() {
            photoIndex = i + 1
            refresh_photo()
            refresh_dots()
        })
    }

    refresh_photo()
    refresh_dots()

    let timerId

    function tick() {
        change_photo(true)
        timerId = setTimeout(tick, 5000); 
    }

    timerId = setTimeout(tick, 5000);


    function refresh_dots() {
        for (let i = 0; i < photos.length; i++) {
            if ((i + 1) == photoIndex) {
                circle[i].classList.add("select")
            } else {
                circle[i].classList.remove("select")
            }
        }
    }

    function refresh_photo() {
        for (let i = 0; i < photos.length; i++) {
            if ((i + 1) == photoIndex) {
                photos[i].classList.add("on_img")
                photos[i].getBoundingClientRect()
                photos[i].classList.add("select_img")
            } else {
                photos[i].classList.remove("on_img")
                photos[i].getBoundingClientRect()
                photos[i].classList.remove("select_img")
            }
        }
    }

    document.getElementById('button_left').addEventListener('click', function (e) {
        change_photo(true)

        clearTimeout(timerId)
        timerId = setTimeout(tick, 5000);
    })
    
    document.getElementById('button_right').addEventListener('click', function (e) {
        change_photo(false)

        clearTimeout(timerId)
        timerId = setTimeout(tick, 5000);
    })

// GALERY BIG
    let divs = document.getElementsByClassName("inner_line")

    for (let div of divs) {
        div.addEventListener("click", open_gallery)
    }

    // document.getElementById("gallery_big").addEventListener('click', close_gallery)
    document.getElementById("gllery_big_close").addEventListener('click', close_gallery)

    function refresh_photo_big() {
        let img = document.querySelectorAll(".inner_gallery_big img")[0]

        for (let i = 0; i <= 5; i++) {
            // console.log("refresh_photo_big " + counter_big_gallery + " " + i)
            if (i == counter_big_gallery) {
                img.classList.add("deselect_img")
                img.getBoundingClientRect()
                let src = document.querySelectorAll(".static_gallery img")[i]

                setTimeout((img, src) => {
                    img.src = src.src
                    img.classList.remove("deselect_img")
                    img.getBoundingClientRect()
                }, 100, img, src)


            }
        }
    }

    function change_photo_big(increment) {
        if (increment) {
            if (counter_big_gallery >= 5) {
                counter_big_gallery = 0
            } else {
                counter_big_gallery += 1
            }
        } else {
            if (counter_big_gallery <= 0) {
                counter_big_gallery = 5
            } else {
                counter_big_gallery -= 1
            }
        }
        refresh_photo_big()
    }

    function KeyboardNav (event) {
        if (event.defaultPrevented) {
          return; // Do nothing if the event was already processed
        }
    
        switch (event.key) {
          case "Left": // IE/Edge specific value
          case "ArrowLeft":
            change_photo_big(false)
            break;
          case "Right": // IE/Edge specific value
          case "ArrowRight":
            change_photo_big(true)
            break;
          default:
            return; // Quit when this doesn't handle the key event.
        }
      
        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
    }


    function close_gallery() {
        // console.log(this)

        document.getElementById("gallery_big").style.display = "none"

        let imgs = document.getElementById("gallery_big").getElementsByTagName("img")

        for (let img of imgs) {
            img.remove()
        }

        window.removeEventListener("keydown", KeyboardNav)
    }

    let counter_big_gallery = 0;

    let index_photo_big = 0;

    function open_gallery() {
        let block = document.getElementById("gallery_big")

        block.style.display = "flex"


        let img = document.createElement('img')
        img.src = this.getElementsByTagName("img")[0].src

        block.getElementsByClassName("inner_gallery_big")[0].append(img)

        // console.log(this)

        let elements = document.querySelectorAll(".static_gallery img")
        
        index_photo_big = 0;

        for (let el of elements) {
            if (el.src == this.getElementsByTagName("img")[0].src) {
                counter_big_gallery = index_photo_big
                console.log(index_photo_big)
            }
            
            index_photo_big++
        }

        window.addEventListener("keydown", KeyboardNav);

        // console.log(elements)
    }

    document.getElementById('button_left_big').addEventListener('click', function (e) {change_photo_big(false)})
    document.getElementById('button_right_big').addEventListener('click', function (e) {change_photo_big(true)})


// NAVIGATION
    const links = document.querySelectorAll('.portfolio_menu a.scroll')

    // const menu = document.getElementById('menu_mobile_list')

    for (let link of links) {
        link.addEventListener('click', function (e) {
            e.preventDefault()

            const blockID = link.getAttribute('href')

            document.querySelector(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        })
    }

    // console.log(video)

    let but = document.getElementById("muted")
    let video = document.querySelectorAll(".portfolio_logo_inner video")[0]


    but.addEventListener('click', function (e) {
        if (video.muted) {
            but.classList.remove("sound_off")
            but.classList.add("sound_on")
            video.muted = false
        } else {
            but.classList.remove("sound_on")
            but.classList.add("sound_off")
            video.muted = true
        }
    })

    function change_photo(increment) {
        if (increment) {
            if (photoIndex <= 1) {
                photoIndex = photos.length
            } else {
                photoIndex -= 1
            }
        } else {
            if (photoIndex >= photos.length) {
                photoIndex = 1
            } else {
                photoIndex += 1
            }
        }

        refresh_photo()
        refresh_dots()
    }

});