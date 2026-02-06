// Анимация сакуры (Canvas)
const canvas = document.getElementById('sakuraCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let particlesArray = [];
const numberOfParticles = 100; // Количество лепестков

// Класс лепестка
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 2; // Размер лепестка от 2 до 7
        this.speedX = Math.random() * 1 - 0.5; // Горизонтальная скорость
        this.speedY = Math.random() * 1 + 0.5; // Вертикальная скорость
        this.angle = Math.random() * 360; // Начальный угол
        this.spin = Math.random() < 0.5 ? -1 : 1; // Направление вращения
        // Цвет лепестка
        this.color = `rgba(255, 183, 178, ${Math.random() * 0.6 + 0.3})`;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.01); // Синусоидальное движение
        this.angle += this.spin * 0.5; // Вращение лепестка

        // Если лепесток улетел вниз, возвращаем наверх
        if (this.y > canvas.height) {
            this.y = 0 - this.size;
            this.x = Math.random() * canvas.width;
            this.size = Math.random() * 5 + 2;
            this.speedY = Math.random() * 1 + 0.5;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.fillStyle = this.color;

        // Рисуем форму лепестка ( овал )
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

    function init() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Создаем градиентный фон каждый кадр ( опиональноб сейчас задано в CSS)
        // Но мы очищаем канвас, чтобы видеть прозрачность
    

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
}

// Ресайз окна
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

// 2. Scroll Reveal ( появление элементов при скролле)
const revealElements = document.querySelectorAll('.scroll-reveal');

const revealOnScroll = () => {
    const triggerBottom = window.innerHeight / 5 * 4;

    revealElements.forEach(box => {
        const boxTop = box.getBoundingClientRect().top;

        if (boxTop < triggerBottom) {
            box.classList.add('visible');
        } else {
           // box.classList.remove('visible'); // раскоментировать если нужно убирать класс при скролле вверх
        }
    })
};

window.addEventListener('scroll', revealOnScroll);

// Запуск
init();
animate();
revealOnScroll(); // Проверка при загрузке.
