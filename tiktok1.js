// ==UserScript==
// @name         TikTok Live Auto Clicker and Messenger
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  TikTok canlı yayın sayfasındaki belirli bir elemente otomatik tıklatır, rastgele mesajlar gönderir ve dinamik menü ile etkileşime geçer
// @author       Siz
// @match        https://www.tiktok.com/@sivereklimm/live
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // CSS seçiciler
    const clickSelector = '#tiktok-live-main-container-id > div.css-1fxlgrb-DivBodyContainer.e1m6gol50 > div.css-l1npsx-DivLiveContentContainer.e1m6gol51 > div > div.css-1xhpkj9-DivChatRoomAnimationContainer.e205vgw2 > div.css-1nmb7mw-DivChatRoomContent.e205vgw0 > div.css-lmgy6k-DivChatRoomContainer.ex6o5342 > div.css-11w1qwc-DivChatRoomBody.ex6o5343 > div.css-hm4yna-DivLikeContainer.ebnaa9i0  > div.css-4ldqvw-DivLikeBtnWrapper.ebnaa9i2 > div';
    const messageSelector = 'div[contenteditable="plaintext-only"]';
    const menuButtonSelector = 'i.css-123225j-IActionButton';
    const menuItemSelector = 'a:nth-of-type(4) > span';

    // Rastgele mesajlar
    const messages = ["999", "99", "99", "9999", ".", "!!!", "...", "??", "ee hadi"];

    // Rastgele bir mesaj seç
    function getRandomMessage() {
        return messages[Math.floor(Math.random() * messages.length)];
    }

    // Elementi bul ve 10 kere tıklat
    function clickElement() {
        const element = document.querySelector(clickSelector);
        if (element) {
            for (let i = 0; i < 100; i++) {
                setTimeout(() => {
                    element.click();
                    console.log(`Elemente ${i + 1} kere tıklatıldı.`);
                }, i * 1000); // 1 saniye aralıklarla tıklama
            }
        } else {
            console.log('Element bulunamadı.');
        }

        // Bir sonraki tıklama işlemini 1 ile 3 dakika arasında rastgele bir sürede tekrar başlat
        const randomInterval = Math.floor(Math.random() * 120000) + 60000; // 60.000 ms ile 180.000 ms (1 ile 3 dakika)
        setTimeout(clickElement, randomInterval);
    }

    // Mesaj gönder
    function sendMessage() {
        const messageElement = document.querySelector(messageSelector);
        if (messageElement) {
            const message = getRandomMessage();
            messageElement.innerText = message;

            // Enter tuşuna basma simülasyonu
            const event = new KeyboardEvent('keydown', {
                bubbles: true,
                cancelable: true,
                key: 'Enter',
                code: 'Enter'
            });
            setTimeout(() => {
                messageElement.dispatchEvent(event);
                console.log(`Mesaj gönderildi: ${message}`);
            }, 1000); // Mesaj yazıldıktan 1 saniye sonra gönder
        } else {
            console.log('Mesaj yazma alanı bulunamadı.');
        }

        // Bir sonraki mesaj gönderme işlemini 3 ile 5 dakika arasında rastgele bir sürede tekrar başlat
        const randomInterval = Math.floor(Math.random() * 120000) + 180000; // 180.000 ms ile 300.000 ms (3 ile 5 dakika)
        setTimeout(sendMessage, randomInterval);
    }

    // Menü açma ve tıklama
    function openMenuAndClick() {
        document.querySelector(menuButtonSelector).dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

        setTimeout(function() {
            var menuItem = document.querySelector(menuItemSelector);
            console.log(menuItem);
            if (menuItem) {
                menuItem.click();
            } else {
                console.error("Menü öğesi bulunamadı.");
            }
        }, 1000); // 1 saniye gecikme

        // Bir sonraki menü işlemini 5 ile 10 dakika arasında rastgele bir sürede tekrar başlat
        const randomInterval = Math.floor(Math.random() * 300000) + 900000; // 300.000 ms ile 600.000 ms (5 ile 10 dakika)
        setTimeout(openMenuAndClick, randomInterval);
    }

    // Sayfa tamamen yüklendikten sonra 5 saniye bekle ve işlemleri başlat
    setTimeout(() => {
        clickElement();
        sendMessage();
        openMenuAndClick();
    }, 5000);
})();
