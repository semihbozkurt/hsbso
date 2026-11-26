            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('nav-menu');
        
            hamburger.addEventListener('click', () => {
            // Tıklandığında 'active' sınıfını ekle veya çıkar (toggle)
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            });

            document.getElementById('ld-mode').addEventListener('click',function(){this.classList.toggle('Lmd'); if(this.classList.contains('Lmd')){document.body.style.background='#FDF6E3'; document.body.style.color='#1E1E1E'} else{document.body.style.background=''; document.body.style.color=''} });
       
