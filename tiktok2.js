// @name         TikTok Live Auto Clicker and Messenger
// @namespace    http://tampermonkey.net/
// @version      1.7
// @description  TikTok canlı yayın sayfasındaki belirli bir elemente otomatik tıklatır, rastgele mesajlar gönderir ve dinamik menü ile etkileşime geçer
// @author       Siz
// @match        https://www.tiktok.com/@sivereklimm/live
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // XPath seçiciler
    const clickXPath = "//div[contains(@class, 'DivLikeBtnWrapper')]";
    const messageSelector = 'div[contenteditable="plaintext-only"]';
    const menuButtonSelector = 'i.css-123225j-IActionButton';  
    const menuItemSelector = 'a:nth-of-type(4) > span';

    // Rastgele mesajlar
    const messages = ["99", "99", "99", "99", "99", "99", "99", "99", "99", "İyi Yayınlar..", "99"];

    // Rastgele bir mesaj seç
    function getRandomMessage() {
        return messages[Math.floor(Math.random() * messages.length)];
    }

    // XPath ile element bulma
    function getElementByXPath(xpath) {
        return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    // Elementi bul ve 10 kere tıklat
    function clickElement() {
        const element = getElementByXPath(clickXPath);
        if (element) {
            for (let i = 0; i < 10; i++) {
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
