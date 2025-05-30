// ==UserScript==
// @name         UGPhone Auto Fast Bot with UI
// @namespace    https://github.com/yourusername/ugphone-bot
// @version      1.1
// @description  Tự động thao tác UGPhone kèm giao diện điều khiển đơn giản (bắt đầu, thu gọn, tắt)
// @match        https://www.ugphone.com/toc-portal/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ugphone.com
// @author       yourusername
// @license      MIT
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const sleep = (ms) => new Promise(res => setTimeout(res, ms));

    async function handleDashboard() {
        log('[BOT] Đang xử lý Dashboard...');

        const noticeImg = document.querySelector('img.notice-img');
        if (noticeImg) {
            const closeBtn = document.querySelector('i.van-badge__wrapper.van-icon.van-icon-close');
            if (closeBtn) {
                closeBtn.click();
                log('[BOT] Đã đóng popup thông báo');
            }
        }

        const getBtn = document.querySelector('div.get-btn span');
        if (getBtn) {
            getBtn.click();
            log('[BOT] Đã nhấn nút GET');
        }

        await sleep(2500);
        window.location.href = "https://www.ugphone.com/toc-portal/#/purchaseDevice";
    }

    async function handlePurchasePage() {
        log('[BOT] Đang xử lý trang mua thiết bị...');

        const clickBuy = () => {
            const buyBtn = document.querySelector('button#buy-btn');
            if (buyBtn) {
                buyBtn.click();
                log('[BOT] Đã click nút BUY');
            }
        };

        clickBuy(); await sleep(300);
        clickBuy(); await sleep(300);
        clickBuy(); await sleep(500);

        const payBtn = document.querySelector('button#buy-btn.van-button--default');
        if (payBtn) {
            payBtn.click();
            log('[BOT] Đã click nút PAY');
        }
    }

    // ================= UI CREATION =================
    const box = document.createElement("div");
    box.style = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #111;
        color: #fff;
        border-radius: 12px;
        box-shadow: 0 0 10px #00000088;
        padding: 12px;
        font-family: monospace;
        z-index: 999999;
        width: 260px;
        transition: all 0.3s ease;
    `;
    box.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <strong>🤖 UG Bot</strong>
            <div>
                <button id="ug-min" style="background:#333; color:#fff; border:none; margin-right:5px;">🔽</button>
                <button id="ug-close" style="background:#f33; color:#fff; border:none;">❌</button>
            </div>
        </div>
        <button id="ug-start" style="width:100%; background:#28a745; border:none; color:#fff; padding:8px; border-radius:6px;">▶️ Bắt đầu</button>
        <div id="ug-log" style="margin-top:10px; font-size: 12px; max-height: 100px; overflow-y: auto;"></div>
    `;
    document.body.appendChild(box);

    const logBox = box.querySelector("#ug-log");
    function log(msg) {
        const time = new Date().toLocaleTimeString();
        logBox.innerHTML += `<div>[${time}] ${msg}</div>`;
        logBox.scrollTop = logBox.scrollHeight;
    }

    // ================= UI EVENTS =================
    document.querySelector("#ug-min").onclick = () => {
        logBox.style.display = logBox.style.display === "none" ? "block" : "none";
    };

    document.querySelector("#ug-close").onclick = () => {
        box.remove();
        log("[BOT] Giao diện đã bị đóng.");
    };

    document.querySelector("#ug-start").onclick = async () => {
        const path = window.location.href;
        log("[BOT] Bắt đầu quy trình...");

        if (path.includes("/dashboard/index")) {
            await handleDashboard();
        } else if (path.includes("/purchaseDevice")) {
            await handlePurchasePage();
        } else {
            log("[BOT] Không ở trang phù hợp.");
        }
    };
})();
