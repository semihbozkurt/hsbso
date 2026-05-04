document.addEventListener('DOMContentLoaded', () => {
    // 1. Elementleri seç
    const mapElement = document.getElementById('map-container');
    const mapK = document.getElementById('map-containerk')

    // 2. Kontrol Et: Element gerçekten var mı?
    if (!mapElement) {
        console.error("HATA: 'map-container' ID'li element bulunamadı!");
        return;
    }

    // 3. Panzoom'u Başlat (Kütüphane ismi Window.Panzoom olarak gelebilir)
    const PanzoomLib = window.Panzoom; 
    
    if (typeof PanzoomLib !== 'function') {
        console.error("HATA: Panzoom kütüphanesi yüklenemedi!");
        return;
    }

    const pz = PanzoomLib(mapElement, {
        maxScale: 5,
        minScale: 0.01,
        step: 0.3,
        contain: 'outside',
        canvas: true, // SVG ve Resim katmanları için daha kararlı çalışır
        startX: 0, // Haritanın başlangıç X pozisyonu
        startY: 0, // Haritanın başlangıç Y pozisyonu
        startScale: 1, // Başlangıç büyüklüğü
    });
    const pzk = PanzoomLib(mapK, {
        maxScale: 5,
        minScale: 0.01,
        step: 0.3,
        contain: 'outside',
        canvas: true, // SVG ve Resim katmanları için daha kararlı çalışır
        startX: 0, // Haritanın başlangıç X pozisyonu
        startY: 0, // Haritanın başlangıç Y pozisyonu
        startScale: 1, // Başlangıç büyüklüğü
    });

    setTimeout(() => {// Haritayı merkeze yerleştir
    pz.pan(0, 0); 
    }, 10);


    // 4. Mouse Wheel Zoom
    mapElement.parentElement.addEventListener('wheel', (event) => {
        if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
        }
        pz.zoomWithWheel(event);
    }, { passive: false });
    mapK.parentElement.addEventListener('wheel', (event) => {
        if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
        }
        pzk.zoomWithWheel(event);
    }, { passive: false });

    // 5. Tıklama Olayları
    const regions = document.querySelectorAll('#svg1 path');
    const panel = document.getElementById('info-panel');
    var inf= document.getElementById('infbox')

    const viewK = document.getElementById('map-viewportk');
    const regionsK = document.querySelectorAll('#svg2 path');
    const panelK = document.getElementById('info-panelk');
    var infK= document.getElementById('infboxk')
   
    panel.addEventListener("mousedown", (e) => {e.stopPropagation()})
    panel.addEventListener("pointerdown", (e) => {e.stopPropagation()})
    regions.forEach(region => {
        region.addEventListener('click', (e) => {
            console.log("Tıklandı:", region.id);

            panel.classList.add('open');

            if (region.id==='Karbojya'){
                mapElement.parentElement.style.display= 'none';
                mapK.style.display= 'block';
                viewK.style.display= 'block';

                setTimeout(()=> {pzk.pan(0,0); pzk.zoom(0.5)},10);
            }

            if (region.id==='kaplumada'){
                inf.innerHTML= "<h3>Kaplumbağa Adası</h3> <p>Kaplumbağa adası aslında dünya üzerinde sürekli yüzen dev bir kaplumbağadır.</p>"};
            if (region.id==='Kraken'){
                inf.innerHTML= "<h1>Kraken</h1> <p>Bu bölgelerde gezen dev bir ahtapot. kimisi orada kraken ve leviathan adında iki farklı ahtapot olduğunu söylüyor. ama dokunaçları sayacak kadar uzun duran kimse hayatta kalamadı.</p>"};

            });
    });
    const closebtn = document.getElementById('close-panel');
    closebtn.addEventListener('click', (e) => {
        panel.classList.remove('open');
        inf.innerHTML = "";
    });

    //#region tıklama olayları K

    panelK.addEventListener("mousedown", (e) => {e.stopPropagation()})
    panelK.addEventListener("pointerdown", (e) => {e.stopPropagation()})
    
            document.getElementById('backtoD').onclick=function(){
                mapElement.parentElement.style.display= 'block';
                mapK.style.display= 'none';
                viewK.style.display= 'none';
                panel.classList.remove('open')
            }

            document.getElementById('baskent').addEventListener("click",()=>{infK.innerHTML= "<h3>Başkent Nakra</h3> <p>Karbojyanın başkenti</p>"; panelK.classList.add('open');});
                
            document.getElementById('batak').addEventListener("click",()=>{infK.innerHTML= "<h1>Bataklık</h1> <p>Yakın bölgede yaşayanlar sevmesede altında değerli hazineler yatıyor.</p>"; panelK.classList.add('open');});
                
            document.getElementById('muk').addEventListener("click",()=>{infK.innerHTML= "<h1>DİKKAT!!!</h1> <p><b>Köpek balığı sörfü yapan mürekkep balıklarıyla</b> karşılaşmak istemiyorsanız uzak durun.<br> <small><small><small>Çizimi biz ekledik, biraz kötüyse kusura bakmayın. Ama yakından çok daha korkunç göründüğünü garenti edebiliriz.</small></small></small></p>"; panelK.classList.add('open');});
            
            
    
    const closebtnK = document.getElementById('close-panelk');
    closebtnK.addEventListener('click', (e) => {
        panelK.classList.remove('open');
        infK.innerHTML = "";
    });

    //#endregion

    //#region ölçek (FINAL ÇALIŞAN)
    const ölçek = document.getElementById('NM')
    ölçek.addEventListener('click',function(){
        const kopya = document.createElement('div');
        kopya.classList.add('hareketli');
        kopya.style.position='absolute';
        kopya.style.top=30+'px';
        kopya.style.right=70+'px';
        kopya.innerHTML="<div class='Ö-tuşlar'><button class='Ö-silicu'>x</button><button class='döndüren'>o</button></div>";
        mapK.appendChild(kopya);
        

        window.addEventListener('mousemove', (e) => {
        kopya.style.position = 'absolute';
        kopya.style.left = e.clientX + 'px';
        kopya.style.top = e.clientY + 'px';
    
    })
    })




    //#endregion
});
