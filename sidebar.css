/* ===== 悬浮侧边栏 ===== */
.floating-sidebar {
    position: fixed;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 999;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 12px 0;
    background: rgba(30, 41, 59, 0.88);
    backdrop-filter: blur(14px);
    border-radius: 16px;
    border: 1px solid rgba(51, 65, 85, 0.5);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
    width: 48px;
    transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
    align-items: center;
}

.floating-sidebar:hover {
    width: 156px;
}

.floating-sidebar .nav-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    padding: 10px 0;
    color: #94a3b8;
    text-decoration: none;
    transition: all 0.2s;
    white-space: nowrap;
    border-radius: 10px;
    margin: 0 4px;
    cursor: pointer;
    width: calc(100% - 8px);
}

.floating-sidebar .nav-item:hover {
    background: rgba(59, 130, 246, 0.2);
    color: #38bdf8;
}

.floating-sidebar .nav-item .icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.floating-sidebar .nav-item .icon svg {
    width: 20px;
    height: 20px;
    stroke: currentColor;
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
}

.floating-sidebar .nav-item .label {
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.25s ease 0.05s;
    margin-left: 2px;
}

.floating-sidebar:hover .nav-item .label {
    opacity: 1;
}

.floating-sidebar .nav-item.active {
    color: #38bdf8;
    background: rgba(59, 130, 246, 0.15);
}

.floating-sidebar .divider {
    height: 1px;
    background: rgba(51, 65, 85, 0.4);
    margin: 4px 12px;
    width: calc(100% - 24px);
}

/* ===== 背景上传按钮 ===== */
.bg-upload-btn {
    position: fixed;
    bottom: 28px;
    right: 28px;
    z-index: 999;
    background: rgba(30, 41, 59, 0.88);
    backdrop-filter: blur(14px);
    border: 1px solid rgba(51, 65, 85, 0.5);
    border-radius: 50%;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    color: #94a3b8;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.bg-upload-btn:hover {
    background: rgba(59, 130, 246, 0.3);
    color: #38bdf8;
    transform: scale(1.08);
}

.bg-upload-btn input[type="file"] {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
}

.bg-upload-btn svg {
    width: 20px;
    height: 20px;
    stroke: currentColor;
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
}

/* ===== 移动端适配 ===== */
@media (max-width: 768px) {
    .floating-sidebar {
        left: 0;
        right: 0;
        bottom: 16px;
        top: auto;
        transform: none;
        width: calc(100% - 32px);
        max-width: 320px;
        margin: 0 auto;
        flex-direction: row;
        justify-content: space-around;
        padding: 8px 4px;
        border-radius: 40px;
        gap: 2px;
        background: rgba(30, 41, 59, 0.95);
        backdrop-filter: blur(16px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        border: 1px solid rgba(51, 65, 85, 0.6);
        transition: none;
        align-items: center;
    }

    .floating-sidebar:hover {
        width: calc(100% - 32px);
        max-width: 320px;
    }

    .floating-sidebar .nav-item {
        flex: 1;
        justify-content: center;
        padding: 10px 4px;
        min-width: 0;
        gap: 0;
        flex-shrink: 1;
        width: auto;
        margin: 0;
    }

    .floating-sidebar .nav-item .icon {
        width: 22px;
        height: 22px;
        flex-shrink: 0;
    }

    .floating-sidebar .nav-item .icon svg {
        width: 22px;
        height: 22px;
    }

    .floating-sidebar .nav-item .label {
        display: none;
    }

    .floating-sidebar .divider {
        display: none;
    }

    .bg-upload-btn {
        bottom: 80px;
        right: 16px;
        width: 40px;
        height: 40px;
    }
}