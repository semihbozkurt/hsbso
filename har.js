document.addEventListener('DOMContentLoaded', () => {
    // 1. Elementleri seç
    const mapElement = document.getElementById('map-container');
    const viewport = document.getElementById('map-viewport');

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
        minScale: 0.1,
        step: 0.3,
        contain: 'outside',
        canvas: true // SVG ve Resim katmanları için daha kararlı çalışır
    });

    // 4. Mouse Wheel Zoom
    viewport.addEventListener('wheel', (event) => {
        if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
        }
        pz.zoomWithWheel(event);
    }, { passive: false });

    // 5. Tıklama Olayları
    const regions = document.querySelectorAll('#svg1 path');
    const panel = document.getElementById('info-panel');

    regions.forEach(region => {
        region.addEventListener('click', (e) => {
            console.log("Tıklandı:", region.id);
            panel.classList.add('open');
            // Tıklanan bölgeye odaklan
            pz.zoom(2, { animate: true, focal: e });
        });
    });
});
