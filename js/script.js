// 页面加载动画
document.addEventListener('DOMContentLoaded', () => {
    // 收藏按钮功能
    const bookmarkBtn = document.getElementById('bookmarkBtn');
    if (bookmarkBtn) {
        bookmarkBtn.addEventListener('click', function() {
            addToBookmarks();
        });
    }

    // Logo 点击彩蛋效果
    const mainLogo = document.querySelector('.main-logo');
    if (mainLogo) {
        let clickCount = 0;
        let clickTimer = null;

        mainLogo.addEventListener('click', function() {
            clickCount++;

            // 添加点击动画
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'logoFloat 3s ease-in-out infinite, logoRotate 20s linear infinite';
            }, 10);

            // 3次快速点击触发彩蛋
            if (clickCount >= 3) {
                triggerLogoEasterEgg();
                clickCount = 0;
            }

            // 重置计数器
            clearTimeout(clickTimer);
            clickTimer = setTimeout(() => {
                clickCount = 0;
            }, 1000);
        });
    }

    // 添加鼠标移动视差效果（仅在桌面端）
    const container = document.querySelector('.container');
    const cards = document.querySelectorAll('.service-card');
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 1024;

    if (!isMobileDevice) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            cards.forEach((card, index) => {
                const speed = (index + 1) * 2;
                const x = (mouseX - 0.5) * speed;
                const y = (mouseY - 0.5) * speed;

                card.style.transform = `translate(${x}px, ${y}px)`;
            });
        });

        // 卡片悬停时的3D效果
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }

    // 按钮点击波纹效果
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // 动态粒子效果（可选）
    createParticles();

    // Logo旋转动画
    const logos = document.querySelectorAll('.logo');
    logos.forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            this.style.transform = 'scale(1.2) rotate(360deg)';
        });

        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // 特性标签动画
    const featureTags = document.querySelectorAll('.feature-tag');
    featureTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
        tag.classList.add('fade-in-tag');
    });

    // 联系信息项悬停效果
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('svg');
            icon.style.transition = 'transform 0.3s';
            icon.style.transform = 'scale(1.2) rotate(5deg)';
        });

        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('svg');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // 滚动视差效果已禁用，避免元素重叠问题
    // if (!isMobileDevice) {
    //     window.addEventListener('scroll', () => {
    //         const scrolled = window.pageYOffset;
    //         const header = document.querySelector('.header');
    //         const mainContent = document.querySelector('.main-content');

    //         if (header) {
    //             header.style.transform = `translateY(${scrolled * 0.5}px)`;
    //             header.style.opacity = 1 - scrolled / 500;
    //         }

    //         if (mainContent) {
    //             mainContent.style.transform = `translateY(${scrolled * 0.2}px)`;
    //         }
    //     });
    // }
});

// 创建动态粒子背景
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
    `;

    document.body.insertBefore(particlesContainer, document.body.firstChild);

    // 创建粒子
    for (let i = 0; i < 30; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 1;
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;

    // 随机选择颜色 (GPT绿色或Claude棕色)
    const colors = ['rgba(16, 163, 127, 0.3)', 'rgba(204, 120, 92, 0.3)'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        left: ${startX}px;
        top: ${startY}px;
        animation: float ${duration}s ease-in-out ${delay}s infinite;
        box-shadow: 0 0 10px ${color};
    `;

    container.appendChild(particle);

    // 动画关键帧
    const keyframes = `
        @keyframes float {
            0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: 0;
            }
            10% {
                opacity: 0.5;
            }
            50% {
                transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(1.5);
                opacity: 0.8;
            }
            90% {
                opacity: 0.5;
            }
        }
    `;

    // 添加动画样式
    if (!document.getElementById('particle-animations')) {
        const style = document.createElement('style');
        style.id = 'particle-animations';
        style.textContent = keyframes;
        document.head.appendChild(style);
    }
}

// 页面可见性变化时的处理
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // 页面隐藏时暂停动画
        document.body.style.animationPlayState = 'paused';
    } else {
        // 页面可见时恢复动画
        document.body.style.animationPlayState = 'running';
    }
});

// 添加淡入标签动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInTag {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .fade-in-tag {
        animation: fadeInTag 0.5s ease-out forwards;
        opacity: 0;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes rippleEffect {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 性能优化：使用 Intersection Observer 监听元素可见性
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// 监听所有需要动画的元素
document.querySelectorAll('.service-card, .contact-card').forEach(el => {
    observer.observe(el);
});

// 键盘快捷键
document.addEventListener('keydown', (e) => {
    // 按 G 键跳转到 ChatGPT
    if (e.key === 'g' || e.key === 'G') {
        window.open('https://chatgpt.com', '_blank');
    }
    // 按 C 键跳转到 Claude
    if (e.key === 'c' || e.key === 'C') {
        window.open('https://claude.ai', '_blank');
    }
});

// 添加加载完成提示
window.addEventListener('load', () => {
    console.log('%c🚀 AI代充导航已加载完成！', 'color: #10a37f; font-size: 20px; font-weight: bold;');
    console.log('%c💡 快捷键提示：按 G 键快速访问 ChatGPT，按 C 键快速访问 Claude', 'color: #cc785c; font-size: 14px;');
});

// Logo 彩蛋效果
function triggerLogoEasterEgg() {
    const logo = document.querySelector('.main-logo');
    if (!logo) return;

    // 创建彩色粒子爆炸效果
    const colors = ['#10a37f', '#cc785c', '#1a7f64', '#a8563d', '#d1f4e8', '#f5e6e0'];
    const logoRect = logo.getBoundingClientRect();
    const centerX = logoRect.left + logoRect.width / 2;
    const centerY = logoRect.top + logoRect.height / 2;

    for (let i = 0; i < 30; i++) {
        createBurstParticle(centerX, centerY, colors[Math.floor(Math.random() * colors.length)]);
    }

    // Logo 特殊动画
    logo.style.animation = 'logoSpinBurst 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    setTimeout(() => {
        logo.style.animation = 'logoFloat 3s ease-in-out infinite, logoRotate 20s linear infinite';
    }, 800);

    // 显示彩蛋提示
    showToast('🎉 发现隐藏彩蛋！可截图保存联系客服获取优惠券，感谢使用 AI 代充平台！', 'success');
}

// 创建爆炸粒子
function createBurstParticle(x, y, color) {
    const particle = document.createElement('div');
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 200 + 100;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    const size = Math.random() * 8 + 4;

    particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        box-shadow: 0 0 10px ${color};
    `;

    document.body.appendChild(particle);

    // 动画
    let posX = x;
    let posY = y;
    let velocityX = vx;
    let velocityY = vy;
    let opacity = 1;
    const gravity = 500;
    const startTime = Date.now();

    function animate() {
        const elapsed = (Date.now() - startTime) / 1000;

        velocityY += gravity * elapsed * 0.016;
        posX += velocityX * elapsed * 0.016;
        posY += velocityY * elapsed * 0.016;
        opacity -= 0.02;

        particle.style.left = posX + 'px';
        particle.style.top = posY + 'px';
        particle.style.opacity = opacity;

        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    }

    animate();
}

// 添加彩蛋动画样式
const easterEggStyle = document.createElement('style');
easterEggStyle.textContent = `
    @keyframes logoSpinBurst {
        0% {
            transform: scale(1) rotate(0deg);
        }
        50% {
            transform: scale(1.5) rotate(360deg);
        }
        100% {
            transform: scale(1) rotate(720deg);
        }
    }
`;
document.head.appendChild(easterEggStyle);

// 收藏页面功能
function addToBookmarks() {
    const pageTitle = 'AI 自助代充升级导航 | ChatGPT & Claude';
    const pageUrl = window.location.href;
    const bookmarkBtn = document.getElementById('bookmarkBtn');

    // 检测操作系统
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const isWindows = navigator.platform.toUpperCase().indexOf('WIN') >= 0;

    let shortcut = 'Ctrl+D';
    if (isMac) {
        shortcut = '⌘+D';
    }

    // 显示快捷键提示
    showBookmarkToast(shortcut);

    // 添加已收藏动画
    bookmarkBtn.classList.add('bookmarked');
    setTimeout(() => {
        bookmarkBtn.classList.remove('bookmarked');
    }, 2000);
}

// 显示收藏快捷键提示（简化版）
function showBookmarkToast(shortcut) {
    // 移除已存在的提示
    const existingToast = document.querySelector('.bookmark-toast');
    if (existingToast) {
        existingToast.remove();
    }

    // 创建提示
    const toast = document.createElement('div');
    toast.className = 'bookmark-toast';
    toast.innerHTML = `
        <div class="bookmark-toast-content">
            <svg class="bookmark-toast-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" fill="url(#toastGradient)" stroke="url(#toastGradient)" stroke-width="2"/>
            </svg>
            <div class="bookmark-toast-text">
                <p class="bookmark-toast-title">按 <kbd>${shortcut}</kbd> 收藏此页面</p>
                <p class="bookmark-toast-subtitle">快速访问，不错过优惠</p>
            </div>
            <button class="bookmark-toast-close" onclick="closeBookmarkToast()">×</button>
        </div>
        <svg width="0" height="0">
            <defs>
                <linearGradient id="toastGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#10a37f" />
                    <stop offset="100%" style="stop-color:#cc785c" />
                </linearGradient>
            </defs>
        </svg>
    `;

    document.body.appendChild(toast);

    // 添加进入动画
    setTimeout(() => toast.classList.add('show'), 10);

    // 4秒后自动关闭
    setTimeout(() => {
        closeBookmarkToast();
    }, 4000);
}

// 关闭收藏提示
function closeBookmarkToast() {
    const toast = document.querySelector('.bookmark-toast');
    if (toast) {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }
}

// 打开价格表弹窗
function openPriceModal() {
    const modal = document.getElementById('priceModal');
    if (modal) {
        modal.classList.add('show');
        // 禁止页面滚动
        document.body.style.overflow = 'hidden';
    }
}

// 关闭价格表弹窗
function closePriceModal() {
    const modal = document.getElementById('priceModal');
    if (modal) {
        modal.classList.remove('show');
        // 恢复页面滚动
        document.body.style.overflow = '';
    }
}

// ESC键关闭弹窗
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePriceModal();
        closeClaudeModal();
    }
});

// 微信号一键复制功能
function copyWechatId() {
    const wechatId = document.getElementById('wechatId').textContent;
    const copyBtn = document.getElementById('copyBtn');
    const copyText = copyBtn.querySelector('.copy-text');

    // 使用现代 Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(wechatId).then(() => {
            // 复制成功
            showCopySuccess(copyBtn, copyText);
        }).catch(err => {
            // 失败时使用备用方法
            fallbackCopyTextToClipboard(wechatId, copyBtn, copyText);
        });
    } else {
        // 浏览器不支持 Clipboard API，使用备用方法
        fallbackCopyTextToClipboard(wechatId, copyBtn, copyText);
    }
}

// 显示复制成功状态
function showCopySuccess(btn, textElement) {
    btn.classList.add('copied');
    const originalText = textElement.textContent;
    textElement.textContent = '已复制';

    // 创建成功提示
    showToast('微信号已复制到剪贴板', 'success');

    // 2秒后恢复按钮状态
    setTimeout(() => {
        btn.classList.remove('copied');
        textElement.textContent = originalText;
    }, 2000);
}

// 备用复制方法（兼容旧浏览器）
function fallbackCopyTextToClipboard(text, btn, textElement) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.cssText = 'position: fixed; top: -9999px; left: -9999px;';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess(btn, textElement);
        } else {
            showToast('复制失败，请手动复制', 'error');
        }
    } catch (err) {
        showToast('复制失败，请手动复制', 'error');
    }

    document.body.removeChild(textArea);
}

// 显示提示信息
function showToast(message, type = 'success') {
    // 移除已存在的提示
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    // 创建新提示
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `
        <svg class="toast-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            ${type === 'success'
                ? '<path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
                : '<path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
            }
        </svg>
        <span>${message}</span>
    `;

    document.body.appendChild(toast);

    // 添加进入动画
    setTimeout(() => toast.classList.add('show'), 10);

    // 3秒后自动移除
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// 添加提示框样式
const toastStyle = document.createElement('style');
toastStyle.textContent = `
    .toast-notification {
        position: fixed;
        top: 24px;
        right: 24px;
        background: rgba(26, 26, 26, 0.95);
        backdrop-filter: blur(10px);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        z-index: 10000;
        transform: translateX(400px);
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .toast-notification.show {
        transform: translateX(0);
        opacity: 1;
    }

    .toast-icon {
        width: 24px;
        height: 24px;
        flex-shrink: 0;
    }

    .toast-success {
        border-left: 4px solid #52c41a;
    }

    .toast-success .toast-icon {
        color: #52c41a;
    }

    .toast-error {
        border-left: 4px solid #ff4d4f;
    }

    .toast-error .toast-icon {
        color: #ff4d4f;
    }

    @media (max-width: 768px) {
        .toast-notification {
            top: 16px;
            right: 16px;
            left: 16px;
            max-width: calc(100% - 32px);
        }
    }
`;
document.head.appendChild(toastStyle);

// 打开Claude充值方式选择弹窗
function openClaudeModal() {
    const modal = document.getElementById('claudeModal');
    if (modal) {
        modal.classList.add('show');
        // 禁止页面滚动
        document.body.style.overflow = 'hidden';
    }
}

// 关闭Claude充值方式选择弹窗
function closeClaudeModal() {
    const modal = document.getElementById('claudeModal');
    if (modal) {
        modal.classList.remove('show');
        // 恢复页面滚动
        document.body.style.overflow = '';
    }
}
