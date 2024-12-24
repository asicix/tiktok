// ==UserScript==
// @name         TikTok Live Auto Clicker and Messenger
// @namespace    http://tampermonkey.net/
// @version      1.9
// @description  TikTok canlı yayın sayfasındaki belirli bir elemente otomatik tıklatır, rastgele mesajlar gönderir ve dinamik menü ile etkileşime geçer
// @author       Siz
// @match        https://www.tiktok.com/@sivereklimm/live
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

  function fetchMessages() {
    fetch(txtFileUrl)
        .then(response => response.text())
        .then(data => {
            messages = data.split('\n').filter(msg => msg.trim() !== ''); // Satırları ayır ve boş satırları temizle
            console.log('Mesajlar yüklendi:', messages);
        })
        .catch(error => console.error('Mesaj dosyası yüklenemedi:', error));
}


    // Rastgele bir mesaj seç
    function getRandomMessage() {
        if (messages.length === 0) return 'Mesajlar yükleniyor...'; // Mesajlar yüklenene kadar bir uyarı
        return messages[Math.floor(Math.random() * messages.length)];
    }

    // Rastgele bir sayı üret
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // XPath ile element bulma
    function getElementByXPath(xpath) {
        return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    // Elementi bul ve 7 ile 10 kere arasında rastgele tıklat
    function clickElement() {
        const clickXPath = "//div[contains(@class, 'DivLikeBtnWrapper')]";
        const element = getElementByXPath(clickXPath);
        if (element) {
            const clicks = getRandomNumber(7, 10); // 7 ile 10 arasında rastgele sayı
            for (let i = 0; i < clicks; i++) {
                setTimeout(() => {
                    element.click();
                    console.log(`Elemente ${i + 1}. kez tıklatıldı.`);
                }, i * 1000); // 1 saniye aralıklarla tıklama
            }
        } else {
            console.log('Element bulunamadı.');
        }

        // Bir sonraki tıklama işlemini 2 ile 4 dakika arasında rastgele bir sürede tekrar başlat
        const randomInterval = getRandomNumber(120000, 240000); // 120.000 ms ile 240.000 ms (2 ile 4 dakika)
        setTimeout(clickElement, randomInterval);
    }

    // Mesaj gönder
    function sendMessage() {
        const messageSelector = 'div[contenteditable="plaintext-only"]';
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
        const randomInterval = getRandomNumber(180000, 300000); // 180.000 ms ile 300.000 ms (3 ile 5 dakika)
        setTimeout(sendMessage, randomInterval);
    }

    // Menü açma ve tıklama
    function openMenuAndClick() {
        const menuButtonSelector = 'i.css-123225j-IActionButton';
        const menuItemSelector = 'a:nth-of-type(4) > span';
        document.querySelector(menuButtonSelector).dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

        setTimeout(function() {
            const menuItem = document.querySelector(menuItemSelector);
            if (menuItem) {
                menuItem.click();
                console.log("Menü öğesine tıklandı.");
            } else {
                console.error("Menü öğesi bulunamadı.");
            }
        }, 1000); // 1 saniye gecikme

        // Bir sonraki menü işlemini 5 ile 10 dakika arasında rastgele bir sürede tekrar başlat
        const randomInterval = getRandomNumber(300000, 600000); // 300.000 ms ile 600.000 ms (5 ile 10 dakika)
        setTimeout(openMenuAndClick, randomInterval);
    }

    // Sayfa tamamen yüklendikten sonra 5 ile 10 saniye arasında bekle ve işlemleri başlat
    setTimeout(() => {
        fetchMessages(); // Mesajları .txt dosyasından al
        clickElement();
        sendMessage();
    }, getRandomNumber(5000, 10000)); // 5 ile 10 saniye arasında rastgele bir gecikme

    // Menü işlemini başlatmayı 5 dakika sonra yap
    setTimeout(() => {
        openMenuAndClick();
    }, 300000); // 300.000 ms (5 dakika)
})();
