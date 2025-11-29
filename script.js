document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tm-header-tab');
    const indicator = document.getElementById('tab-indicator');

    function updateIndicator(activeTab) {
        if (!activeTab) return;
        const width = activeTab.offsetWidth;
        const left = activeTab.offsetLeft;
        const scaleFactor = 0.8;
        indicator.style.left = (left + (width - width*scaleFactor)/2) + 'px';
        indicator.style.width = (width*scaleFactor) + 'px';
    }

    function switchTab(tabName) {
        document.querySelectorAll('.tab-content').forEach(content => content.style.display = 'none');
        const table = document.getElementById(tabName + '-table');
        const content = document.getElementById(tabName + '-content');
        if (table) table.style.display = 'block';
        if (content) content.style.display = 'block';

        tabs.forEach(tab => tab.classList.remove('tab-active'));
        const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
        if (activeTab) {
            activeTab.classList.add('tab-active');
            setTimeout(() => updateIndicator(activeTab), 10);
        }
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', e => {
            e.preventDefault();
            switchTab(tab.getAttribute('data-tab'));
        });
    });

    const telegramBtn = document.getElementById('connect-telegram');
    if (telegramBtn) {
        telegramBtn.addEventListener('click', () => {
            window.location.href = 'connect-telegram.html';
        });
    }

    // Initialize first tab
    const initialTab = document.querySelector('.tm-header-tab.tab-active');
    if (initialTab) switchTab(initialTab.getAttribute('data-tab'));
});
