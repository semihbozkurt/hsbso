document.addEventListener('DOMContentLoaded', () => {
    // 1. Elementleri seç
    const mapElement = document.getElementById('map-container');

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
        canvas: true // SVG ve Resim katmanları için daha kararlı çalışır
    });

    // 4. Mouse Wheel Zoom
    mapElement.addEventListener('wheel', (event) => {
        if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
        }
        pz.zoomWithWheel(event);
    }, { passive: false });

    // 5. Tıklama Olayları
    const regions = document.querySelectorAll('#svg1 path');
    const panel = document.getElementById('info-panel');
    var inf= document.getElementById('infbox')

    regions.forEach(region => {
        region.addEventListener('click', (e) => {
            console.log("Tıklandı:", region.id);
            panel.classList.add('open');
            if (region.id==='kaplumada'){
                inf.innerHTML= "<h1>Kaplumbağa Adası</h1> <p>Kaplumbağa adası aslında dünya üzerinde sürekli yüzen dev bir kaplumbağadır.</p>"};
            if (region.id==='Kraken'){
                inf.innerHTML= "<h1>Kraken</h1> <p>Bu bölgelerde gezen dev bir ahtapot. kimisi orada kraken ve leviathan adında iki farklı ahtapot olduğunu söylüyor. ama dokunaçları sayacak kadar uzun duran kimse hayatta kalamadı.</p>"};

            });
    });
    const closebtn = document.getElementById('close-panel');
    closebtn.addEventListener('click', (e) => {
        panel.classList.remove('open');
        inf.innerHTML = "";
    });
});
