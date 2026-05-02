import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export class BookHouseServiceDetailComponent {
    constructor(bookHouseServiceParent) {
        this.bookHouseServiceParent = bookHouseServiceParent;
    }

    bookHouseServiceGetHTML(bookHouseServiceData) {
        return `
            <div class="card">
                <div class="d-flex flex-column flex-md-row">
                    <img src="${bookHouseServiceData.bookHouseServiceSrc}" class="book-house-service-detail__media" alt="${bookHouseServiceData.bookHouseServiceTitle}">
                    <div id="book-house-service-3d-container" class="book-house-service-detail__media bg-light" style="position: relative;">
                        </div>
                </div>
                <div class="card-body">
                    <h2 class="card-title">${bookHouseServiceData.bookHouseServiceTitle}</h2>
                    <p class="card-text"><strong>Цена:</strong> ${bookHouseServiceData.bookHouseServicePrice}</p>
                    <p class="card-text">${bookHouseServiceData.bookHouseServiceFullDescription || bookHouseServiceData.bookHouseServiceDescription}</p>
                </div>
            </div>
        `;
    }

    bookHouseServiceRender(bookHouseServiceData) {
        const bookHouseServiceHtml = this.bookHouseServiceGetHTML(bookHouseServiceData);
        this.bookHouseServiceParent.insertAdjacentHTML('beforeend', bookHouseServiceHtml);

        // Инициализируем 3D-модель, если путь к ней передан
        if (bookHouseServiceData.bookHouseServiceModelSrc) {
            this.bookHouseServiceInit3D(bookHouseServiceData.bookHouseServiceModelSrc);
        } else {
            const container = document.getElementById('book-house-service-3d-container');
            if (container) container.innerHTML = '<div class="d-flex h-100 justify-content-center align-items-center text-muted">3D модель отсутствует</div>';
        }
    }

    bookHouseServiceInit3D(modelSrc) {
        const container = document.getElementById('book-house-service-3d-container');
        if (!container) return;

        // 1. Создаем сцену
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf8f9fa); // Цвет фона bg-light из Bootstrap

        // 2. Настраиваем камеру
        const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(0, 1.5, 5);

        // 3. Настраиваем рендерер
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // 4. Добавляем свет
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight.position.set(5, 10, 7.5);
        scene.add(directionalLight);

        // 5. Добавляем управление мышью (крутить, отдалять)
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // Плавное торможение
        controls.dampingFactor = 0.05;

        // 6. Загружаем GLB модель
        const loader = new GLTFLoader();
        loader.load(
            modelSrc,
            (gltf) => {
                const model = gltf.scene;

                // Центрируем и масштабируем модель, чтобы она хорошо помещалась в кадре
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());

                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 3 / maxDim; // Подгоняем размер (3 - условный радиус обзора)
                model.scale.set(scale, scale, scale);

                box.setFromObject(model);
                box.getCenter(center);
                model.position.sub(center); // Сдвигаем в центр (0, 0, 0)

                scene.add(model);
            },
            undefined, // Callback для прогресса загрузки (можно оставить пустым)
            (error) => {
                console.error('Ошибка при загрузке 3D модели:', error);
            }
        );

        // 7. Обработка изменения размера окна
        const onWindowResize = () => {
            if (!container) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };
        window.addEventListener('resize', onWindowResize);

        // 8. Цикл анимации (и "сборщик мусора" при уходе со страницы)
        let animationFrameId;
        const animate = () => {
            // Если мы ушли со страницы (контейнер удален из DOM), останавливаем рендер
            if (!document.body.contains(container)) {
                window.removeEventListener('resize', onWindowResize);
                renderer.dispose();
                cancelAnimationFrame(animationFrameId);
                return;
            }

            animationFrameId = requestAnimationFrame(animate);
            controls.update(); // Нужно для enableDamping
            renderer.render(scene, camera);
        };

        animate();
    }
}
