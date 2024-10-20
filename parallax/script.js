let text = document.getElementById('text');
let cloud = document.getElementById('cloud');
let sea = document.getElementById('sea');
let stpierre = document.getElementById('stpierre');
let leafLeft = document.getElementById('leaf-left');
let leafRight = document.getElementById('leaf-right');
let boat = document.getElementById('boat');

window.addEventListener('scroll', () => {
    let value = window.scrollY;

    text.style.marginTop = value * 0.5 + 'px';
    let scaleValue = Math.max(1 - value / 1000, 0.05);
    text.style.transform = `scale(${scaleValue})`;

    cloud.style.marginTop = value * 0.3 + 'px';

    let zoomValue = Math.max(1 + value / 150, 0.05);
    leafLeft.style.transform = `scale(${zoomValue})`;
    leafRight.style.transform = `scale(${zoomValue})`;
    leafRight.style.marginLeft = value * 1.5 + 'px';
    leafLeft.style.marginLeft = value * -1.5 + 'px';

    boat.style.marginLeft = value * -0.1 + 'px';

});

function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
}

function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
}

function scrollToTop(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

const faqs = document.querySelectorAll(".faq");

faqs.forEach(faq => {
    faq.addEventListener("click", () => {
        faq.classList.toggle("active");
    });
});

const track = document.getElementById("image-track");

if (track) {
    window.onmousedown = e => {
        track.dataset.mouseDownAt = e.clientX;
    }

    window.onmousemove = e => {
        if (track.dataset.mouseDownAt === "0") return;

        const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
              maxDelta = window.innerWidth / 2;

        const percentage = (mouseDelta / maxDelta) * -100,
              prevPercentage = parseFloat(track.dataset.prevPercentage) || 0, // Handle undefined case
              nextPercentage = Math.min(Math.max(prevPercentage + percentage, -100), 0);

        track.dataset.percentage = nextPercentage;

        track.animate({
            transform: `translate(${nextPercentage}%, -50%)`
        }, { duration: 1200, fill: "forwards" });

        // Move the image animation inside the mousemove event
        for (const image of track.getElementsByClassName("image")) {
            image.animate({
                objectPosition: `${100 + nextPercentage}% center`
            }, { duration: 1200, fill: "forwards" });
        }
    }

    window.onmouseup = () => {
        // Store the final percentage after dragging ends
        track.dataset.prevPercentage = track.dataset.percentage;
        track.dataset.mouseDownAt = "0";
    }
}

const videos = document.querySelectorAll('.hover-video');

videos.forEach(video => {
    video.addEventListener('mouseenter', () => {
        video.play();
    });

    video.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0; // Optional: reset the video to the beginning
    });
});