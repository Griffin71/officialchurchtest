// piracy.js
// Production-ready deterrent script for preventing copying, screenshots, dev tools access, etc.
// These methods are NOT foolproof and should be combined with server-side protections.

document.addEventListener('DOMContentLoaded', () => {
    const blockAction = (e, message = true) => {
        if (message) {
            alert('This action is restricted by our Terms and Conditions and Privacy Policy.');
        }
        if (e.cancelable) e.preventDefault();
        return false;
    };

    // Block key combinations
    document.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();
        if (
            e.key === 'PrintScreen' ||
            (e.ctrlKey && ['c', 'u', 's', 'p'].includes(key)) ||
            (e.ctrlKey && e.shiftKey && ['i', 'r'].includes(key)) ||
            (e.ctrlKey && key === 's') ||
            (e.ctrlKey && key === 'win') ||
            (e.metaKey && key === 's') ||
            (e.metaKey && e.shiftKey && key === 's')
        ) {
            blockAction(e);
        }
    });

    // Disable right-click, selection, drag, copy, cut
    ['contextmenu', 'selectstart', 'dragstart', 'copy', 'cut'].forEach(evt =>
        document.addEventListener(evt, blockAction)
    );

    // Disable text selection
    const disableSelection = () => {
        document.body.style.userSelect = 'none';
        document.body.style.webkitUserSelect = 'none';
        document.body.style.msUserSelect = 'none';
        document.body.style.mozUserSelect = 'none';
    };
    disableSelection();

    // Warn on tab switch or possible recording
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            alert('Screen recording or tab switching is discouraged as per our policies.');
        }
    });

    // Show piracy notice if not already shown this session
    if (!sessionStorage.getItem('piracyNoticeShown')) {
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes fadeSlideUp { 0% { opacity: 0; transform: translate(-50%, 40px); } 100% { opacity: 1; transform: translate(-50%, 0); } }
            @keyframes fadeOut { to { opacity: 0; transform: translate(-50%, -20px); } }
            @keyframes pulseText { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
            @keyframes iconBounce { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.4) rotate(10deg); } }
        `;
        document.head.appendChild(style);

        const notice = document.createElement('div');
        Object.assign(notice.style, {
            animation: 'fadeSlideUp 0.6s ease-out forwards',
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#fff3cd',
            color: '#856404',
            padding: '16px 24px',
            border: '1px solid #ffeeba',
            borderRadius: '8px',
            zIndex: 9999,
            fontFamily: 'sans-serif',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            maxWidth: '90%',
            width: '420px'
        });

        const icon = document.createElement('div');
        icon.textContent = '⚠️';
        icon.style.fontSize = '28px';
        icon.style.marginBottom = '8px';
        icon.style.animation = 'iconBounce 1s infinite';

        const message = document.createElement('div');
        message.innerHTML = `
            Screenshots, screen recording, and copying are restricted.<br>
            By using this site, you agree to our policies.<br>
            <strong style="display:inline-block; animation:pulseText 1.2s infinite;">Violations may result in legal action.</strong><br>
            Please read our 
            <a href="terms.html" target="_blank" style="color:#007bff; text-decoration:underline;">Terms and Conditions</a> 
            and 
            <a href="privacy.html" target="_blank" style="color:#007bff; text-decoration:underline;">Privacy Policy</a>.
        `;

        notice.appendChild(icon);
        notice.appendChild(message);
        document.body.appendChild(notice);
        sessionStorage.setItem('piracyNoticeShown', '1');

        const audio = new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_31824b00b1.mp3");
        audio.volume = 0.3;
        audio.play().catch(() => console.warn("Autoplay blocked or audio couldn't play."));

        setTimeout(() => {
            notice.style.animation = 'fadeOut 1s forwards';
            setTimeout(() => notice.remove(), 1000);
        }, 7000); // 20 seconds
    }
});

// Cookie Consent Banner
(function () {
    const CONSENT_KEY = 'cookieConsent';
    const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

    function getConsent() {
        try {
            const data = JSON.parse(localStorage.getItem(CONSENT_KEY));
            if (!data || Date.now() - data.timestamp > ONE_YEAR_MS) return null;
            return data;
        } catch {
            return null;
        }
    }

    function setConsent(consent) {
        localStorage.setItem(CONSENT_KEY, JSON.stringify({ consent, timestamp: Date.now() }));
    }

    if (!getConsent()) {
        const banner = document.createElement('div');
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-modal', 'true');
        Object.assign(banner.style, {
            position: 'fixed',
            bottom: '0',
            left: '0',
            width: '100%',
            background: '#1e1e1e',
            color: '#fff',
            padding: '24px 16px',
            zIndex: '9999',
            fontFamily: 'Segoe UI, sans-serif',
            boxShadow: '0 -2px 8px rgba(0,0,0,0.5)',
            transition: 'transform 0.5s ease-in-out',
            transform: 'translateY(100%)'
        });

        requestAnimationFrame(() => banner.style.transform = 'translateY(0)');

        const container = document.createElement('div');
        Object.assign(container.style, {
            maxWidth: '640px',
            margin: '0 auto',
            textAlign: 'left'
        });

        const title = document.createElement('h2');
        title.innerHTML = '<i class="fa fa-cookie-bite" style="margin-right:8px;color:#ffd700;"></i> Cookie Preferences';

        const message = document.createElement('p');
        message.textContent = 'We use cookies to enhance your experience. Manage your preferences below or accept/reject all cookies.';

        // Cookie options (marketing removed)
        const options = [
            { key: 'necessary', label: 'Necessary', desc: 'Required for basic site functionality.', disabled: true, checked: true },
            { key: 'preferences', label: 'Preferences', desc: 'Remember your settings and choices.', disabled: false, checked: false },
            { key: 'analytics', label: 'Analytics', desc: 'Help us improve the site by collecting usage data.', disabled: false, checked: false }
        ];

        const form = document.createElement('form');
        form.setAttribute('aria-label', 'Cookie Preferences');
        options.forEach(opt => {
            const row = document.createElement('div');
            row.style.marginBottom = '10px';
            row.style.display = 'flex';
            row.style.alignItems = 'flex-start';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = 'cookie_' + opt.key;
            checkbox.name = opt.key;
            checkbox.checked = opt.checked;
            checkbox.disabled = opt.disabled;
            checkbox.style.marginRight = '10px';

            const label = document.createElement('label');
            label.htmlFor = checkbox.id;
            label.style.fontWeight = opt.disabled ? 'bold' : 'normal';
            label.textContent = opt.label;

            const desc = document.createElement('span');
            desc.textContent = ' – ' + opt.desc;
            desc.style.fontSize = '0.95em';
            desc.style.color = '#ccc';
            desc.style.marginLeft = '4px';

            label.appendChild(desc);
            row.appendChild(checkbox);
            row.appendChild(label);
            form.appendChild(row);
        });

        // Buttons
        const btnRow = document.createElement('div');
        btnRow.style.marginTop = '18px';
        btnRow.style.display = 'flex';
        btnRow.style.gap = '12px';

        const acceptAllBtn = document.createElement('button');
        acceptAllBtn.type = 'button';
        acceptAllBtn.textContent = 'Accept All';
        Object.assign(acceptAllBtn.style, {
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '10px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
        });

        const rejectAllBtn = document.createElement('button');
        rejectAllBtn.type = 'button';
        rejectAllBtn.textContent = 'Reject All (except necessary)';
        Object.assign(rejectAllBtn.style, {
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '10px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
        });

        const saveBtn = document.createElement('button');
        saveBtn.type = 'submit';
        saveBtn.textContent = 'Save Preferences';
        Object.assign(saveBtn.style, {
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
        });

        acceptAllBtn.addEventListener('click', () => {
            setConsent({
                necessary: true,
                preferences: true,
                analytics: true
            });
            banner.remove();
        });

        rejectAllBtn.addEventListener('click', () => {
            setConsent({
                necessary: true,
                preferences: false,
                analytics: false
            });
            banner.remove();
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const consent = {};
            options.forEach(opt => {
                consent[opt.key] = form.elements[opt.key].checked;
            });
            setConsent(consent);
            banner.remove();
        });

        btnRow.appendChild(acceptAllBtn);
        btnRow.appendChild(rejectAllBtn);
        btnRow.appendChild(saveBtn);

        container.appendChild(title);
        container.appendChild(message);
        container.appendChild(form);
        container.appendChild(btnRow);
        banner.appendChild(container);
        document.body.appendChild(banner);
    }
})();
// End of piracy.js