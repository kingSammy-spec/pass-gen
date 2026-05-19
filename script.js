const display = document.getElementById('password-display');
const slider = document.getElementById('length-slider');
const lengthVal = document.getElementById('length-val');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');

const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+[]{}|;:,.<>?'
};

if (slider && lengthVal) {
    slider.addEventListener('input', () => {
        lengthVal.innerText = slider.value;
        const currentPass = generatePassword();
        display.innerText = currentPass;
        updateEntropyStrength(currentPass);
    });
}

function generatePassword() {
    let charset = '';
    if (document.getElementById('uppercase').checked) charset += charSets.uppercase;
    if (document.getElementById('lowercase').checked) charset += charSets.lowercase;
    if (document.getElementById('numbers').checked) charset += charSets.numbers;
    if (document.getElementById('symbols').checked) charset += charSets.symbols;

    if (!charset) return 'Select Options';

    let password = '';
    const length = parseInt(slider.value) || 16;
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
}

function updateEntropyStrength(pass) {
    const label = document.getElementById('strength-label');
    if (!label) return;

    if (pass === 'Select Options') {
        label.innerText = 'NONE';
        label.style.color = '#ef4444';
        return;
    }

    const entropy = Math.floor(Math.log2(Math.pow(72, pass.length)));
    if (entropy < 50) {
        label.innerText = 'WEAK';
        label.style.color = '#ef4444'; // Red
    } else if (entropy < 80) {
        label.innerText = 'MEDIUM';
        label.style.color = '#ff9f43'; // Orange
    } else {
        label.innerText = 'STRONG';
        label.style.color = '#00ff88'; // Neon Green
    }
}

if (generateBtn) {
    generateBtn.addEventListener('click', () => {
        const pass = generatePassword();
        display.innerText = pass;
        updateEntropyStrength(pass);
        updateExpandBtn();
    });
}

function updateExpandBtn() {
    if (!document.getElementById('expand-btn')) {
        const btn = document.createElement('button');
        btn.id = 'expand-btn';
        btn.innerText = 'Run Security Audit →';
        btn.style.marginTop = '1rem';
        btn.style.width = '100%';
        btn.style.padding = '1rem';
        btn.style.borderRadius = '10px';
        btn.style.border = '1px solid var(--border)';
        btn.style.background = 'var(--card)';
        btn.style.color = 'var(--accent)';
        btn.style.cursor = 'pointer';
        btn.style.fontWeight = '700';
        btn.style.fontFamily = 'inherit';
        btn.style.letterSpacing = '1px';
        btn.onclick = () => {
            showSessionInterstitialAd(() => {
                openDetail();
            });
        };
        document.querySelector('.settings').appendChild(btn);
    }
}

const SECURITY_CAMPAIGNS = [
    {
        title: 'NordVPN: Secure Connection',
        desc: 'Protect your data on any network. Get 63% off + 3 months extra with our exclusive link.',
        promo: 'CODE "SHIELDVPN" FOR 63% DISCOUNT',
        img: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=200&h=200&q=80'
    },
    {
        title: 'Yubico YubiKey 5C NFC',
        desc: 'Stop phishing with hardware security keys. The gold standard for multi-factor security.',
        promo: 'CODE "YUBIKEY2FA" FOR FREE DELIVERY',
        img: 'https://images.unsplash.com/photo-1601597111158-2fceff270190?auto=format&fit=crop&w=200&h=200&q=80'
    },
    {
        title: 'Bitwarden Vault Premium',
        desc: 'Open-source encrypted password vaults to sync unlimited key credentials across all devices.',
        promo: 'CODE "BITWARDEN50" TO SAVE 50%',
        img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=200&h=200&q=80'
    },
    {
        title: 'ProtonMail Swiss Encrypted',
        desc: 'End-to-end encrypted mail servers located securely in Swiss bunkers. 100% anonymous.',
        promo: 'Swiss Code: PROTONSECURE',
        img: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=200&h=200&q=80'
    },
    {
        title: 'Canary Tokens: Honey Decoys',
        desc: 'Deploy fake decoy passwords in your vault and get instant alerts when hackers touch them.',
        promo: 'HONEY ACCESS CODE: CANARYALERT',
        img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=200&h=200&q=80'
    },
    {
        title: 'OWASP Penetration Testing Seminar',
        desc: 'Learn SQL injections, buffer overflows, and cross-site scripting vulnerabilities. 95% off.',
        promo: 'WHITEHAT DISCOUNT: HACKEROWASP',
        img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=200&h=200&q=80'
    }
];

let adsDisabled = false;
let interactionCount = 0;

// Inspect generated key details popup
function openDetail() {
    const modal = document.getElementById('detailModal');
    const body = document.getElementById('modalBody');
    if (!modal || !body) return;

    const pass = display.innerText;
    if (pass === 'Select Options') {
        alert('❌ Please select option tags and compile a valid password key first.');
        return;
    }

    const entropy = Math.floor(Math.log2(Math.pow(72, pass.length)));
    
    body.innerHTML = `
        <div class="modal-hero" style="background:url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&h=600&q=80') center/cover; height:260px; border-radius:16px; margin-bottom:2rem; box-shadow:0 10px 25px rgba(0,0,0,0.05); border:1px solid var(--border);"></div>
        <h2 style="font-size:2.2rem; font-weight:800; margin:1rem 0; color:#09090d; font-family:'Outfit',sans-serif; letter-spacing:-0.5px;">Security Audit</h2>
        
        <div style="background:#09090d; color:var(--accent); padding:1.2rem; border-radius:12px; font-family:'JetBrains Mono',monospace; margin-bottom:2rem; word-break:break-all; font-weight:700; border:1px solid var(--border);">
            ${pass}
        </div>
        
        <div class="extensive-info" style="display:grid; grid-template-columns:1fr 1fr; gap:2rem; margin-bottom:2rem; font-family:'Outfit',sans-serif;">
            <div style="background:#fafafa; border:1px solid rgba(0,0,0,0.06); padding:1.8rem; border-radius:16px;">
                <h3 style="margin-bottom:0.8rem; font-size:1.1rem; color:#09090d;">Entropy Strength</h3>
                <p style="font-size:2.4rem; font-weight:800; color:#00cc6c; line-height:1;">${entropy} Bits</p>
                <p style="font-size:0.8rem; color:#666; margin-top:0.5rem;">Values above 80 bits represent high resistance to modern quantum computing arrays.</p>
            </div>
            <div style="background:#fafafa; border:1px solid rgba(0,0,0,0.06); padding:1.8rem; border-radius:16px;">
                <h3 style="margin-bottom:0.8rem; font-size:1.1rem; color:#09090d;">Time to Crack</h3>
                <p style="font-size:1.4rem; color:#e67e22; font-weight:800; line-height:1.2; margin: 0.5rem 0;">~1.2 Billion Years</p>
                <p style="font-size:0.8rem; color:#666;">Estimated time duration using standard heavy GPU brute force nodes.</p>
            </div>
        </div>

        <div style="background:#fff5f5; padding:1.8rem; border-radius:16px; border-left:5px solid #ff4757; margin-bottom:2rem; font-family:'Outfit',sans-serif;">
            <h3 style="color:#ff4757; font-size:1.1rem; margin-bottom:0.5rem;">Cybersecurity Recommendations</h3>
            <ul style="padding-left:1.2rem; color:#444; font-size:0.9rem; line-height:1.5; display:flex; flex-direction:column; gap:0.4rem;">
                <li>Avoid storing this raw string inside plain text files.</li>
                <li>Audit password structures regularly against compromised lists.</li>
                <li>Sync this to offline physical keychains where possible.</li>
            </ul>
        </div>
    `;
    
    // Choose sponsored asset inside details popup
    const detailCampaign = SECURITY_CAMPAIGNS[pass.length % SECURITY_CAMPAIGNS.length];
    const detailImg = document.getElementById('detail-ad-img');
    const detailTitle = document.getElementById('detail-ad-title');
    const detailDesc = document.getElementById('detail-ad-desc');
    
    if (detailImg) detailImg.src = detailCampaign.img;
    if (detailTitle) detailTitle.innerText = detailCampaign.title;
    if (detailDesc) detailDesc.innerText = detailCampaign.desc;

    modal.style.display = 'flex';
}

document.querySelector('.close-modal')?.addEventListener('click', () => {
    document.getElementById('detailModal').style.display = 'none';
});

window.onclick = (event) => {
    const modal = document.getElementById('detailModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}


// --- 2. Custom Delimiter Passphrase System ---
const passphraseModal = document.getElementById('passphraseModal');
const btnOpenPassphraseCreator = document.getElementById('btn-open-passphrase-creator');
const btnClosePassphraseModal = document.getElementById('btn-close-passphrase-modal');

if (btnOpenPassphraseCreator) {
    btnOpenPassphraseCreator.addEventListener('click', () => {
        if (passphraseModal) passphraseModal.style.display = 'flex';
    });
}

if (btnClosePassphraseModal) {
    btnClosePassphraseModal.addEventListener('click', () => {
        if (passphraseModal) passphraseModal.style.display = 'none';
    });
}

function submitCustomPassphrase() {
    const word1 = document.getElementById('passphrase-word-1').value.trim();
    const word2 = document.getElementById('passphrase-word-2').value.trim();
    const delim = document.getElementById('passphrase-delimiter').value;

    if (!word1 || !word2) {
        alert('❌ Please supply Keyword parameters to shShard.');
        return;
    }

    // Append cryptographic numbers
    const noise = Math.floor(Math.random() * 8999) + 1000;
    const finalPass = `${word1}${delim}${word2}${delim}${noise}`;

    if (passphraseModal) passphraseModal.style.display = 'none';
    document.getElementById('custom-passphrase-form').reset();

    // Trigger interstitial countdown ad before updating
    showSessionInterstitialAd(() => {
        display.innerText = finalPass;
        updateEntropyStrength(finalPass);
        updateExpandBtn();
    });
}


// --- 3. Programmatic Rotating Sponsor Banner ---
let bannerIndex = 0;
function startRotatingBanner() {
    const banner = document.getElementById('floating-ad-banner');
    if (!banner || adsDisabled) return;

    const campaign = SECURITY_CAMPAIGNS[bannerIndex];
    bannerIndex = (bannerIndex + 1) % SECURITY_CAMPAIGNS.length;

    banner.innerHTML = `
        <div class="ad-sponsor-container">
            <img src="${campaign.img}" alt="${campaign.title}">
            <div class="banner-content">
                <p>Curated Shield Sponsor</p>
                <strong>${campaign.title}</strong>
            </div>
        </div>
        <div class="banner-actions">
            <button class="btn-banner-action" id="btn-banner-claim">Claim Shield</button>
            <button class="btn-banner-close" id="btn-banner-close">×</button>
        </div>
    `;

    banner.style.display = 'flex';

    // Hook listeners
    document.getElementById('btn-banner-claim')?.addEventListener('click', () => {
        alert(`🎉 Copied promo code: "${campaign.promo.split('"')[1] || 'SHIELDVPN'}" to clipboard!`);
        window.open('#', '_blank');
    });

    document.getElementById('btn-banner-close')?.addEventListener('click', () => {
        banner.style.display = 'none';
    });
}

// Initial banner launch and rotate every 10 seconds
setTimeout(() => {
    startRotatingBanner();
    setInterval(startRotatingBanner, 10000);
}, 2000);


// --- 4. Decoupled Timed Interstitial Countdown System ---
let interstitialCallback = null;
let interstitialTimer = null;
const interstitialModal = document.getElementById('interstitialModal');
const btnSkipAd = document.getElementById('btn-skip-ad');
const btnClaimAd = document.getElementById('btn-claim-ad');

function showSessionInterstitialAd(onClosed) {
    if (adsDisabled || !interstitialModal) {
        onClosed();
        return;
    }
    
    interstitialCallback = onClosed;
    
    // Choose a random campaign
    const campaign = SECURITY_CAMPAIGNS[Math.floor(Math.random() * SECURITY_CAMPAIGNS.length)];
    const imgEl = document.getElementById('interstitial-ad-img');
    const titleEl = document.getElementById('interstitial-ad-title');
    const descEl = document.getElementById('interstitial-ad-desc');
    const promoEl = document.getElementById('interstitial-ad-promo');
    
    if (imgEl) imgEl.src = campaign.img;
    if (titleEl) titleEl.innerText = campaign.title;
    if (descEl) descEl.innerText = campaign.desc;
    if (promoEl) promoEl.innerText = campaign.promo;

    interstitialModal.style.display = 'flex';
    
    btnSkipAd.disabled = true;
    btnSkipAd.style.opacity = '0.4';
    btnSkipAd.style.cursor = 'not-allowed';
    btnSkipAd.innerText = 'Skip Ad in 5s';
    
    let count = 5;
    if (interstitialTimer) clearInterval(interstitialTimer);
    
    interstitialTimer = setInterval(() => {
        count--;
        if (count > 0) {
            btnSkipAd.innerText = `Skip Ad in ${count}s`;
        } else {
            clearInterval(interstitialTimer);
            btnSkipAd.innerText = 'Skip Ad';
            btnSkipAd.disabled = false;
            btnSkipAd.style.opacity = '1';
            btnSkipAd.style.cursor = 'pointer';
        }
    }, 1000);
}

if (btnSkipAd) {
    btnSkipAd.addEventListener('click', () => {
        interstitialModal.style.display = 'none';
        
        // Trigger success synchronization celebration modal!
        const celebrationModal = document.getElementById('celebrationModal');
        if (celebrationModal) {
            celebrationModal.style.display = 'flex';
        } else if (interstitialCallback) {
            interstitialCallback();
        }
    });
}

if (btnClaimAd) {
    btnClaimAd.addEventListener('click', () => {
        alert('🎉 Security discount whitelisted to clipboard!');
        interstitialModal.style.display = 'none';
        
        const celebrationModal = document.getElementById('celebrationModal');
        if (celebrationModal) {
            celebrationModal.style.display = 'flex';
        } else if (interstitialCallback) {
            interstitialCallback();
        }
    });
}

// Celebration close handler
const btnCloseCelebrationModal = document.getElementById('btn-close-celebration');
if (btnCloseCelebrationModal) {
    btnCloseCelebrationModal.addEventListener('click', () => {
        document.getElementById('celebrationModal').style.display = 'none';
        if (interstitialCallback) {
            interstitialCallback();
            interstitialCallback = null;
        }
    });
}


// --- 5. Scarcity Upgrade Tier & Timer Engine ---
let upgradeTimer = null;
const premiumUpgradeModal = document.getElementById('premiumUpgradeModal');

function triggerUpgradeModal() {
    if (adsDisabled || !premiumUpgradeModal) return;
    
    premiumUpgradeModal.style.display = 'flex';
    let duration = 600; // 10 minutes
    const countdownEl = document.getElementById('scarcity-countdown');

    if (upgradeTimer) clearInterval(upgradeTimer);

    upgradeTimer = setInterval(() => {
        duration--;
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        if (countdownEl) {
            countdownEl.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        if (duration <= 0) {
            clearInterval(upgradeTimer);
            premiumUpgradeModal.style.display = 'none';
        }
    }, 1000);
}

// Trigger upgrade modal after 40 seconds of active key generation
setTimeout(triggerUpgradeModal, 40000);

document.getElementById('btn-skip-upgrade')?.addEventListener('click', () => {
    premiumUpgradeModal.style.display = 'none';
    clearInterval(upgradeTimer);
});

// Acknowledge upgrade purchase (disable ads)
document.getElementById('btn-upgrade-now')?.addEventListener('click', () => {
    alert('🏆 Welcome to SecurePass Shield! Security channels secured, sponsor blocks deactivated.');
    adsDisabled = true;
    premiumUpgradeModal.style.display = 'none';
    const banner = document.getElementById('floating-ad-banner');
    if (banner) banner.style.display = 'none';
    clearInterval(upgradeTimer);
});


// --- 6. Exit Intent & Mock Ad-Blocker Overlays ---
let exitIntentShown = false;
document.addEventListener("mouseout", (e) => {
    if (e.clientY < 0 && !exitIntentShown && !adsDisabled) {
        exitIntentShown = true;
        const exitModal = document.getElementById("exitIntentModal");
        if (exitModal) exitModal.style.display = "flex";
    }
});

document.getElementById("closeExitIntent")?.addEventListener("click", () => {
    document.getElementById("exitIntentModal").style.display = "none";
});
document.getElementById("declineExitIntent")?.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("exitIntentModal").style.display = "none";
});

// Trigger Mock ad blocker Whitelist popups after 5 seconds
setTimeout(() => {
    if (adsDisabled) return;
    const isAdBlockerActive = Math.random() < 0.15; // 15% simulation chance
    if (isAdBlockerActive) {
        const adBlockModal = document.getElementById("adBlockModal");
        if (adBlockModal) adBlockModal.style.display = "flex";
    }
}, 5000);

document.getElementById('btn-adblock-premium')?.addEventListener('click', () => {
    alert('🏆 Shield Pro Activated! Ad banners disabled.');
    adsDisabled = true;
    document.getElementById("adBlockModal").style.display = "none";
    const banner = document.getElementById('floating-ad-banner');
    if (banner) banner.style.display = 'none';
});

if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(display.innerText);
        copyBtn.innerText = 'DONE';
        setTimeout(() => copyBtn.innerText = 'COPY', 1200);
    });
}

// Initial compile
window.onload = () => {
    const initialPass = generatePassword();
    display.innerText = initialPass;
    updateEntropyStrength(initialPass);
    updateExpandBtn();
};
