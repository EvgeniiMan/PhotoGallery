const startButton = document.querySelector(".gallery__button");
const wrap = document.querySelector(".gallery__wrap");
const loader = document.querySelector(".loader");

function showLoader() {
    document.querySelector(".loader").style.display = "flex";
}

function hideLoader() {
  document.querySelector(".loader").style.display = "none";
}

startButton.addEventListener("click", getRandomImgs);

async function getRandomImgs() {
    try {
        showLoader();
        const res = await fetch("https://jsonplaceholder.typicode.com/photos?_start=0&_limit=40")
        if(!res.ok) {
            alert("Загрузка картинок не удалась!");
            throw new Error("Загрузка картинок не удалась!");
        }

        const data = await res.json();

        if (data) {
            const urls = data.map(img => img.url);
            displayRandomImgs(urls);
        } else {
            throw new Error("Изображения отсутствуют!");
        }

    } catch (e) {
        console.error(e.message);
    } finally {
        console.log("loading done...");
        hideLoader();
    }
}

function displayRandomImgs(imgsUrls) {
    let i = 0;
    const chunkSize = 5;

    insertImagesChunk();

    function insertImagesChunk() {
       let end = Math.min(i + chunkSize, imgsUrls.length);
       do {
           let elem = `<img src=${imgsUrls[i]}></img>`;
           wrap.innerHTML += elem;
           i++;
       } while (i < end);
     
       if (i < imgsUrls.length) {
           setTimeout(insertImagesChunk, 0);
       }    
    }
    
}
