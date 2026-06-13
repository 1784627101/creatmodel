// API 地址
const API_URL = 'https://你的railway域名/api';

// 显示消息
function showMessage(text, type = 'success') {
    const msg = document.createElement('div');
    msg.className = `message ${type}`;
    msg.textContent = text;
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 3000);
}

// 获取 token
function getToken() {
    return localStorage.getItem('token');
}

// 获取当前用户
function getCurrentUser() {
    return {
        token: localStorage.getItem('token'),
        username: localStorage.getItem('username')
    };
}

// 检查是否登录
function isLoggedIn() {
    return !!localStorage.getItem('token');
}

// 退出登录
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    showMessage('已退出登录', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// 带认证的请求
async function authFetch(url, options = {}) {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${API_URL}${url}`, {
        ...options,
        headers
    });
    
    if (response.status === 401) {
        localStorage.clear();
        window.location.href = 'login.html';
        throw new Error('请重新登录');
    }
    
    return response;
}

// 格式化时间
function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

// 更新导航栏显示
function updateNavbar() {
    const loggedIn = isLoggedIn();
    const username = localStorage.getItem('username');
    const navLinks = document.querySelector('.nav-links');
    
    if (navLinks) {
        if (loggedIn && username) {
            navLinks.innerHTML = `
                <a href="index.html" class="nav-link">首页</a>
                <a href="publish.html" class="nav-link">发布蓝图</a>
                <a href="profile.html" class="nav-link">我的发布</a>
                <span class="nav-link" style="color:#3b82f6">${username}</span>
                <button class="btn btn-outline" onclick="logout()">退出</button>
            `;
        } else {
            navLinks.innerHTML = `
                <a href="index.html" class="nav-link">首页</a>
                <a href="login.html" class="btn btn-outline">登录</a>
                <a href="register.html" class="btn btn-primary">注册</a>
            `;
        }
    }
}