// ===== 侧边栏组件 =====
(function initSidebar() {
    // 侧边栏 HTML
    const sidebarHTML = `
        <nav class="floating-sidebar" id="floatingSidebar">
            <a href="index.html" class="nav-item" data-page="index">
                <span class="icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z"/></svg>
                </span>
                <span class="label">主页</span>
            </a>
            <a href="publish.html" class="nav-item" data-page="publish">
                <span class="icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14m-7-7h14"/></svg>
                </span>
                <span class="label">发布蓝图</span>
            </a>
            <a href="profile.html" class="nav-item" data-page="profile">
                <span class="icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </span>
                <span class="label">我的蓝图</span>
            </a>
            <a href="login.html" class="nav-item" id="loginNavItem" data-page="login">
                <span class="icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                </span>
                <span class="label" id="loginLabel">登录</span>
            </a>
        </nav>
    `;

    // 注入侧边栏到页面
    document.body.insertAdjacentHTML('afterbegin', sidebarHTML);

    // 高亮当前页面
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-item').forEach(el => {
        const href = el.getAttribute('href');
        if (href && currentPath.includes(href.replace('.html', ''))) {
            el.classList.add('active');
        }
    });

    // 登录状态更新
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const loginItem = document.getElementById('loginNavItem');
    const loginLabel = document.getElementById('loginLabel');
    if (token && username) {
        loginLabel.textContent = username;
        loginItem.href = 'profile.html';
    } else {
        loginLabel.textContent = '登录';
        loginItem.href = 'login.html';
    }
})();

// ===== 自定义背景 =====
(function initBg() {
    const savedBg = localStorage.getItem('customBg');
    if (savedBg) {
        const style = document.createElement('style');
        style.id = 'customBgStyle';
        style.textContent = `
            body::before {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: -1;
                background-image: url(${savedBg});
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                opacity: 0.3;
            }
            body {
                background: #0f0f0f;
            }
        `;
        document.head.appendChild(style);
    }

    // 背景上传按钮
    const uploadBtn = document.createElement('div');
    uploadBtn.className = 'bg-upload-btn';
    uploadBtn.innerHTML = `
        <input type="file" id="bgUpload" accept="image/*">
        <span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        </span>
    `;
    document.body.appendChild(uploadBtn);

    document.getElementById('bgUpload')?.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(ev) {
            const dataUrl = ev.target.result;
            localStorage.setItem('customBg', dataUrl);
            // 更新背景样式
            let style = document.getElementById('customBgStyle');
            if (!style) {
                style = document.createElement('style');
                style.id = 'customBgStyle';
                document.head.appendChild(style);
            }
            style.textContent = `
                body::before {
                    content: '';
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: -1;
                    background-image: url(${dataUrl});
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    opacity: 0.3;
                }
                body {
                    background: #0f0f0f;
                }
            `;
        };
        reader.readAsDataURL(file);
    });
})();