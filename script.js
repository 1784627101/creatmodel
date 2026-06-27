// API 地址 - 改成你的 Railway 公网 HTTPS 地址
const API_URL = 'https://energetic-presence-production.up.railway.app/api';
const BASE_URL = 'https://energetic-presence-production.up.railway.app';

function showMessage(text, type = 'success') {
    const msg = document.createElement('div');
    msg.className = `message ${type}`;
    msg.textContent = text;
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 3000);
}

function getToken() {
    return localStorage.getItem('token');
}

function getCurrentUser() {
    return {
        token: localStorage.getItem('token'),
        username: localStorage.getItem('username')
    };
}

function isLoggedIn() {
    return !!localStorage.getItem('token');
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    showMessage('已退出登录', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

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

function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

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
                <span class="nav-link" style="color:#3b82f6">${escapeHtml(username)}</span>
                <button class="btn btn-outline" onclick="logout()">退出</button>
            `;
        } else {
            navLinks.innerHTML = `
                <a href="index.html" class="nav-link">首页</a>
                <a href="publish.html" class="nav-link">发布蓝图</a>
                <a href="profile.html" class="nav-link">我的发布</a>
                <a href="login.html" class="btn btn-outline">登录</a>
                <a href="register.html" class="btn btn-primary">注册</a>
            `;
        }
    }
}