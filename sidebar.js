// ===== 侧边栏组件（完整版）=====

// 1. 自动加载侧边栏专用 CSS
(function loadSidebarCss() {
    if (!document.getElementById('sidebarCss')) {
        const link = document.createElement('link');
        link.id = 'sidebarCss';
        link.rel = 'stylesheet';
        link.href = 'sidebar.css';
        document.head.appendChild(link);
    }
})();

// 2. 注入侧边栏 HTML
(function initSidebar() {
    const sidebarHTML = `
        <nav class="floating-sidebar" id="floatingSidebar">
            <a href="index.html" class="nav-item" data-page="index">
                <span class="icon">
                    <svg viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z"/></svg>
                </span>
                <span class="label">主页</span>
            </a>
            <a href="publish.html" class="nav-item" data-page="publish">
                <span class="icon">
                    <svg viewBox="0 0 24 24"><path d="M12 5v14m-7-7h14"/></svg>
                </span>
                <span class="label">发布蓝图</span>
            </a>
            <a href="profile.html" class="nav-item" data-page="profile">
                <span class="icon">
                    <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </span>
                <span class="label">我的蓝图</span>
            </a>
            <a href="apps.html" class="nav-item" data-page="apps">
                <span class="icon">
                    <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
                </span>
                <span class="label">小应用</span>
            </a>
            <!-- 反馈按钮（蓝色突出） -->
            <a href="https://www.ifdian.net/group/e832489c6d2211f1a55652540025c377?utm_source=copylink&utm_medium=link" target="_blank" class="nav-item" id="feedbackNavItem" data-page="feedback" style="background: rgba(59, 130, 246, 0.12); color: #3b82f6; border: 1px solid rgba(59, 130, 246, 0.25); margin: 0 6px; border-radius: 10px;">
                <span class="icon">
                    <svg viewBox="0 0 24 24" style="fill: none; stroke: #3b82f6;"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                </span>
                <span class="label" style="color: #3b82f6;">反馈</span>
            </a>
            <div class="divider"></div>
            <!-- 赞助按钮（紫色突出） -->
            <a href="https://www.ifdian.net/a/creatmodel" target="_blank" class="nav-item" id="sponsorNavItem" data-page="sponsor" style="background: rgba(168, 85, 247, 0.15); color: #a855f7; border: 1px solid rgba(168, 85, 247, 0.3); margin: 0 6px; border-radius: 10px;">
                <span class="icon">
                    <svg viewBox="0 0 24 24" style="fill: #a855f7; stroke: #a855f7;"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </span>
                <span class="label" style="color: #a855f7;">赞助我</span>
            </a>
            <div class="divider"></div>
            <a href="login.html" class="nav-item" id="loginNavItem" data-page="login">
                <span class="icon">
                    <svg viewBox="0 0 24 24"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                </span>
                <span class="label" id="loginLabel">登录</span>
            </a>
        </nav>
    `;

    // 只在侧边栏不存在时注入
    if (!document.getElementById('floatingSidebar')) {
        document.body.insertAdjacentHTML('afterbegin', sidebarHTML);
    }

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

// 3. 自定义背景上传
(function initBg() {
    // 加载保存的背景
    function loadBg() {
        const savedBg = localStorage.getItem('customBg');
        if (savedBg) {
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
                    background-image: url(${savedBg});
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    opacity: 0.25;
                }
                body {
                    background: #0f0f0f;
                }
            `;
        }
    }
    loadBg();

    // 背景上传按钮
    if (!document.querySelector('.bg-upload-btn')) {
        const uploadBtn = document.createElement('div');
        uploadBtn.className = 'bg-upload-btn';
        uploadBtn.setAttribute('title', '上传自定义背景（双击清除）');
        uploadBtn.innerHTML = `
            <input type="file" id="bgUpload" accept="image/*">
            <span>
                <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            </span>
        `;
        document.body.appendChild(uploadBtn);

        // 上传事件
        document.getElementById('bgUpload')?.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;
            if (!file.type.startsWith('image/')) {
                alert('请选择图片文件');
                return;
            }
            const reader = new FileReader();
            reader.onload = function(ev) {
                const dataUrl = ev.target.result;
                localStorage.setItem('customBg', dataUrl);
                loadBg();
                showToast('背景已更新', '#22c55e');
            };
            reader.readAsDataURL(file);
        });

        // 双击清除背景
        uploadBtn.addEventListener('dblclick', function() {
            if (confirm('确定要清除自定义背景吗？')) {
                localStorage.removeItem('customBg');
                const style = document.getElementById('customBgStyle');
                if (style) style.remove();
                showToast('背景已清除', '#ef4444');
            }
        });
    }

    function showToast(text, color) {
        const existing = document.querySelector('.bg-toast');
        if (existing) existing.remove();
        const toast = document.createElement('div');
        toast.className = 'bg-toast';
        toast.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 28px;
            background: ${color};
            color: white;
            padding: 10px 18px;
            border-radius: 10px;
            font-size: 0.85rem;
            z-index: 10000;
            animation: fadeInUp 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            font-weight: 500;
        `;
        toast.textContent = text;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.5s';
            setTimeout(() => toast.remove(), 500);
        }, 2000);
    }

    const animStyle = document.createElement('style');
    animStyle.textContent = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(animStyle);
})();