// Social Card Generator for GAIL Energy Connect (#WahKyaEnergyHai)
// Renders a high-resolution Canva-grade shareable graphic via HTML5 Canvas

class SocialCardGenerator {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    // High-definition 1080 x 1080 square card (ideal for Instagram, WhatsApp status, LinkedIn & X)
    this.canvas.width = 1080;
    this.canvas.height = 1080;

    this.logoImg = new Image();
    this.logoImg.src = 'assets/WhatsApp Image 2026-09-15 at 08.48.18.jpeg';

    this.pipeBannerImg = new Image();
    this.pipeBannerImg.src = 'assets/WhatsApp Image 2026-09-15 at 16.45.22.jpeg';
  }

  generate(stats) {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // 1. Deep midnight gradient background
    const bgGradient = ctx.createLinearGradient(0, 0, w, h);
    bgGradient.addColorStop(0, '#060d1f');
    bgGradient.addColorStop(0.5, '#0b193d');
    bgGradient.addColorStop(1, '#030814');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, w, h);

    // 2. Futuristic grid lines & energy wave glows
    ctx.save();
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
    ctx.lineWidth = 1.5;
    for (let x = 40; x < w; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 40; y < h; y += 60) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    ctx.restore();

    // 3. Header: GAIL & Campaign Brand
    ctx.fillStyle = '#00f0ff';
    ctx.font = 'bold 28px "Outfit", sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('GAIL (INDIA) LIMITED PRESENTS', 80, 110);

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 64px "Outfit", sans-serif';
    ctx.fillText('GAIL ENERGY CONNECT', 80, 180);

    // Tagline in gold
    ctx.fillStyle = '#ffb703';
    ctx.font = '600 32px "Inter", sans-serif';
    ctx.fillText('JODO PIPELINE. JAGAO SHEHAR. ⚡', 80, 230);

    // Draw official GAIL Logo on top-right of canvas with perfect oval clipping
    if (this.logoImg && this.logoImg.complete && this.logoImg.naturalWidth > 0) {
      ctx.save();
      const logoW = 145;
      const logoH = 98;
      const logoX = w - 80 - logoW; // Right aligned at 80px margin
      const logoY = 85;
      const cx = logoX + logoW / 2;
      const cy = logoY + logoH / 2;
      const rx = (logoW / 2) - 2;
      const ry = (logoH / 2) - 2;

      // Subtle warm outer glow
      ctx.shadowColor = 'rgba(255, 183, 3, 0.7)';
      ctx.shadowBlur = 16;

      // Clean oval clip (cuts out the square black corners of the JPEG completely)
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.clip();

      ctx.drawImage(this.logoImg, logoX, logoY, logoW, logoH);
      ctx.restore();

      // Outer gold accent rim around the clipped oval
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = '#ffb703';
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.restore();
    }

    // 4. Central Hero Card / Certificate frame
    ctx.save();
    ctx.fillStyle = 'rgba(12, 28, 66, 0.75)';
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 3;
    ctx.shadowColor = 'rgba(0, 240, 255, 0.4)';
    ctx.shadowBlur = 30;
    this.roundRect(ctx, 80, 280, w - 160, 510, 28, true, true);
    ctx.restore();

    // Hero Badge Trophy
    ctx.fillStyle = '#ffffff';
    ctx.font = '72px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🏆', w / 2, 375);

    // Official Campaign Callout
    ctx.fillStyle = '#00e676';
    ctx.font = '800 44px "Outfit", sans-serif';
    ctx.fillText('#WahKyaEnergyHai!', w / 2, 438);

    // Player Badge Title
    ctx.fillStyle = '#ffb703';
    ctx.font = '700 34px "Outfit", sans-serif';
    ctx.fillText(stats.badgeTitle.toUpperCase(), w / 2, 488);

    // Player Name
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '500 28px "Inter", sans-serif';
    ctx.fillText(`ENERGY CONNECTOR: ${stats.playerName.toUpperCase()}`, w / 2, 538);

    // Metric Stats Boxes
    const boxY = 572;
    const boxH = 110;
    const colW = (w - 240) / 3;

    // Col 1: Energy Score
    this.drawStatBox(ctx, 110, boxY, colW, boxH, 'ENERGY SCORE', `${stats.score.toLocaleString()}`);
    // Col 2: Cities Energized
    this.drawStatBox(ctx, 120 + colW, boxY, colW, boxH, 'CITIES AWAKENED', `${stats.citiesCount || 6} / 6`);
    // Col 3: Energy Impact
    this.drawStatBox(ctx, 130 + colW * 2, boxY, colW, boxH, 'ENERGY IMPACT', '100% ⚡');

    // 5. Unlocked Heritage & City Nodes Bar
    const citiesY = 735;
    ctx.fillStyle = '#00f0ff';
    ctx.font = '600 18px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('HERITAGE CORRIDOR: 🛕 KASHI • 🏛️ GOLGHAR • 🏹 BIRSA • ⛵ BARABATI • 🛕 LINGARAJ • 🌉 HOWRAH', w / 2, citiesY);

    // 6. 3D Physical Yellow Steel Pipe Divider (Between Hero Card and Footer)
    ctx.save();
    const pipeY = 816;
    
    // Drop shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 4;
    
    // Outer bevel
    ctx.strokeStyle = '#8c4e00';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(80, pipeY);
    ctx.lineTo(w - 80, pipeY);
    ctx.stroke();
    
    // Core yellow cylindrical steel
    const pipeGrad = ctx.createLinearGradient(0, pipeY - 4, 0, pipeY + 4);
    pipeGrad.addColorStop(0, '#fff59d');
    pipeGrad.addColorStop(0.3, '#ffd600');
    pipeGrad.addColorStop(0.75, '#ff9e00');
    pipeGrad.addColorStop(1, '#b36200');
    ctx.strokeStyle = pipeGrad;
    ctx.lineWidth = 7;
    ctx.stroke();
    
    // Specular highlight
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(80, pipeY - 2);
    ctx.lineTo(w - 80, pipeY - 2);
    ctx.stroke();
    
    // Bolted Flanges along divider
    [180, 360, 540, 720, 900].forEach(fx => {
      ctx.fillStyle = '#ffde03';
      ctx.strokeStyle = '#7a4100';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      this.roundRect(ctx, fx - 6, pipeY - 10, 12, 20, 3, true, true);
    });
    ctx.restore();

    // 7. Bottom Banner / Footer (Cleanly Spaced Below 3D Pipe Divider)
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 24px "Outfit", sans-serif';
    ctx.fillText('PRADHAN MANTRI URJA GANGA (JHBDPL NETWORK)', 80, 856);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '400 20px "Inter", sans-serif';
    ctx.fillText('Connecting homes, clean CNG mobility & green industries across Eastern India.', 80, 892);

    // Hashtags
    ctx.fillStyle = '#00f0ff';
    ctx.font = '700 20px "Inter", sans-serif';
    ctx.fillText('#WahKyaEnergyHai   #EnergizingPossibilities   #PradhanMantriUrjaGanga', 80, 930);

    // Call to Action Box
    ctx.save();
    const btnY = 964;
    const btnH = 62;
    const btnGrad = ctx.createLinearGradient(80, btnY, w - 80, btnY);
    btnGrad.addColorStop(0, '#ffb703');
    btnGrad.addColorStop(1, '#ff9100');
    ctx.fillStyle = btnGrad;
    ctx.shadowColor = 'rgba(255, 183, 3, 0.5)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetY = 4;
    this.roundRect(ctx, 80, btnY, w - 160, btnH, 14, true, false);
    
    ctx.fillStyle = '#070d1e';
    ctx.font = '900 23px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CAN YOU BEAT MY SCORE? PLAY NOW: gailonline.com/energyconnect', w / 2, btnY + 39);
    ctx.restore();

    return this.canvas.toDataURL('image/png');
  }

  drawStatBox(ctx, x, y, width, height, label, value) {
    ctx.save();
    ctx.fillStyle = 'rgba(0, 240, 255, 0.08)';
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
    ctx.lineWidth = 1.5;
    this.roundRect(ctx, x, y, width, height, 16, true, true);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 18px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(label, x + width / 2, y + 36);

    ctx.fillStyle = '#00f0ff';
    ctx.font = '800 36px "Outfit", sans-serif';
    ctx.fillText(value, x + width / 2, y + 84);
    ctx.restore();
  }

  roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
  }

  downloadImage(filename = 'GAIL-Energy-Connect-Badge.png') {
    const link = document.createElement('a');
    link.download = filename;
    link.href = this.canvas.toDataURL('image/png');
    link.click();
  }

  generateInstagramStory(stats) {
    const storyCanvas = document.createElement('canvas');
    storyCanvas.width = 1080;
    storyCanvas.height = 1920; // 9:16 Instagram Story standard
    const ctx = storyCanvas.getContext('2d');
    const w = 1080;
    const h = 1920;

    // 1. Deep midnight gradient background
    const bgGradient = ctx.createLinearGradient(0, 0, 0, h);
    bgGradient.addColorStop(0, '#040916');
    bgGradient.addColorStop(0.3, '#091535');
    bgGradient.addColorStop(0.7, '#071026');
    bgGradient.addColorStop(1, '#020610');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, w, h);

    // 2. Futuristic grid lines
    ctx.save();
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.06)';
    ctx.lineWidth = 1.5;
    for (let x = 60; x < w; x += 80) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 60; y < h; y += 80) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    ctx.restore();

    // 3. Top Header: GAIL & Brand
    ctx.fillStyle = '#00f0ff';
    ctx.font = 'bold 30px "Outfit", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('GAIL (INDIA) LIMITED PRESENTS', 80, 160);

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 68px "Outfit", sans-serif';
    ctx.fillText('GAIL ENERGY CONNECT', 80, 235);

    ctx.fillStyle = '#ffb703';
    ctx.font = '700 34px "Inter", sans-serif';
    ctx.fillText('JODO PIPELINE. JAGAO SHEHAR. ⚡', 80, 285);

    // Top Right GAIL Official Logo
    if (this.logoImg && this.logoImg.complete && this.logoImg.naturalWidth > 0) {
      ctx.save();
      const logoW = 160;
      const logoH = 108;
      const logoX = w - 80 - logoW;
      const logoY = 135;
      const cx = logoX + logoW / 2;
      const cy = logoY + logoH / 2;
      ctx.shadowColor = 'rgba(255, 183, 3, 0.8)';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.ellipse(cx, cy, (logoW/2)-2, (logoH/2)-2, 0, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(this.logoImg, logoX, logoY, logoW, logoH);
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      ctx.ellipse(cx, cy, (logoW/2)-2, (logoH/2)-2, 0, 0, Math.PI * 2);
      ctx.strokeStyle = '#ffb703';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.restore();
    }

    // 4. Hero Certificate Card (Center)
    ctx.save();
    ctx.fillStyle = 'rgba(12, 28, 66, 0.85)';
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 3.5;
    ctx.shadowColor = 'rgba(0, 240, 255, 0.5)';
    ctx.shadowBlur = 35;
    this.roundRect(ctx, 70, 360, w - 140, 680, 32, true, true);
    ctx.restore();

    ctx.fillStyle = '#ffffff';
    ctx.font = '84px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🏆', w / 2, 470);

    ctx.fillStyle = '#00e676';
    ctx.font = '900 52px "Outfit", sans-serif';
    ctx.fillText('#WahKyaEnergyHai!', w / 2, 545);

    ctx.fillStyle = '#ffb703';
    ctx.font = '800 36px "Outfit", sans-serif';
    ctx.fillText(stats.badgeTitle || 'MASTER ENERGY CONNECTOR', w / 2, 600);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '500 24px "Inter", sans-serif';
    ctx.fillText('This certificate honors', w / 2, 655);

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 48px "Outfit", sans-serif';
    ctx.fillText(stats.playerName || 'Citizen Connector', w / 2, 715);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 22px "Inter", sans-serif';
    ctx.fillText('for completing the Pradhan Mantri Urja Ganga JHBDPL network', w / 2, 765);

    // Stat Boxes
    const cardY = 820;
    const boxW = 270;
    const boxH = 140;
    const gap = 25;
    const startX = (w - (boxW * 3 + gap * 2)) / 2;

    this.drawStatBox(ctx, startX, cardY, boxW, boxH, 'FINAL SCORE', stats.score ? stats.score.toLocaleString() : '3,000');
    this.drawStatBox(ctx, startX + boxW + gap, cardY, boxW, boxH, 'CITIES CONNECTED', `${stats.citiesCount || 6} / 6`);
    this.drawStatBox(ctx, startX + (boxW + gap) * 2, cardY, boxW, boxH, 'ENERGY IMPACT', '100%');

    // 5. Connected Cities Badges (6 Cities with Heritage Landmarks)
    const citiesY = 1100;
    ctx.fillStyle = '#00f0ff';
    ctx.font = '800 26px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('HERITAGE CORRIDOR POWERED BY GAIL', w / 2, citiesY);

    const cityList = [
      '🛕 Kashi Vishwanath',
      '🏛️ Patna Golghar',
      '🏹 Ranchi (Birsa)',
      '⛵ Cuttack Barabati',
      '🛕 Lingaraj Mandir',
      '🌉 Howrah Bridge'
    ];
    const pillW = 270;
    const pillH = 54;
    const pillGapX = 20;
    const pillGapY = 16;
    const gridStartX = (w - (pillW * 3 + pillGapX * 2)) / 2;

    cityList.forEach((c, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const px = gridStartX + col * (pillW + pillGapX);
      const py = citiesY + 30 + row * (pillH + pillGapY);

      ctx.save();
      ctx.fillStyle = 'rgba(0, 230, 118, 0.15)';
      ctx.strokeStyle = 'rgba(0, 230, 118, 0.5)';
      ctx.lineWidth = 1.5;
      this.roundRect(ctx, px, py, pillW, pillH, 14, true, true);

      ctx.fillStyle = '#ffffff';
      ctx.font = '700 22px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(c, px + pillW / 2, py + 35);
      ctx.restore();
    });

    // 6. 3D Pipeline Visual Divider
    const divY = 1300;
    ctx.save();
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetY = 8;
    ctx.fillStyle = '#ffb703';
    this.roundRect(ctx, 70, divY, w - 140, 16, 8, true, false);
    ctx.fillStyle = '#ffffff';
    this.roundRect(ctx, 70, divY + 2, w - 140, 4, 2, true, false);
    ctx.restore();

    // 7. Urja Ganga Mission Statement
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '500 26px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Pradhan Mantri Urja Ganga • Expanding Natural Gas Grid to Eastern India', w / 2, 1370);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '400 22px "Inter", sans-serif';
    ctx.fillText('Connecting homes (PNG), clean mobility (CNG) & industries across UP, Bihar, Jharkhand, Odisha & Bengal.', w / 2, 1415);

    // Hashtags
    ctx.fillStyle = '#00f0ff';
    ctx.font = '700 26px "Outfit", sans-serif';
    ctx.fillText('#WahKyaEnergyHai   #GAIL   #EnergizingPossibilities   #PMUrjaGanga', w / 2, 1480);

    // 8. Call to Action Button at Bottom
    const btnY = 1560;
    const btnH = 88;
    ctx.save();
    const btnGrad = ctx.createLinearGradient(80, btnY, w - 80, btnY);
    btnGrad.addColorStop(0, '#ffb703');
    btnGrad.addColorStop(1, '#ff7b00');
    ctx.fillStyle = btnGrad;
    ctx.shadowColor = 'rgba(255, 183, 3, 0.6)';
    ctx.shadowBlur = 25;
    ctx.shadowOffsetY = 6;
    this.roundRect(ctx, 80, btnY, w - 160, btnH, 22, true, false);

    ctx.fillStyle = '#050a17';
    ctx.font = '900 32px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CAN YOU BEAT MY SCORE? TAP LINK TO PLAY ⚡', w / 2, btnY + 54);
    ctx.restore();

    ctx.fillStyle = '#64748b';
    ctx.font = '500 20px "Inter", sans-serif';
    ctx.fillText('Play now: gailonline.com/energyconnect', w / 2, 1690);

    return storyCanvas.toDataURL('image/png');
  }

  async shareInstagramStory(stats) {
    const storyDataUrl = this.generateInstagramStory(stats);
    const storyFilename = 'GAIL-Energy-Connect-Story-9x16.png';

    // Try Web Share API with File
    if (navigator.canShare && navigator.share) {
      try {
        const res = await fetch(storyDataUrl);
        const blob = await res.blob();
        const file = new File([blob], storyFilename, { type: 'image/png' });

        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: 'GAIL Energy Connect - #WahKyaEnergyHai',
            text: 'I completed the JHBDPL network in GAIL Energy Connect! ⚡ #WahKyaEnergyHai',
            files: [file]
          });
          return true;
        }
      } catch (err) {
        console.log('Native story share cancelled or unsupported:', err);
      }
    }

    // Fallback: Download the high-res 9:16 PNG directly for Instagram Stories
    const link = document.createElement('a');
    link.download = storyFilename;
    link.href = storyDataUrl;
    link.click();
    return false;
  }

  async share(stats) {
    const text = `🏆 I scored ${stats.score.toLocaleString()} points and energized 6 cities on the JHBDPL network in GAIL Energy Connect! Can you beat my score? ⚡ #WahKyaEnergyHai #GAIL #PradhanMantriUrjaGanga`;
    
    // Check Web Share API with File
    if (navigator.canShare && navigator.share) {
      try {
        const blob = await new Promise(resolve => this.canvas.toBlob(resolve, 'image/png'));
        const file = new File([blob], 'gail-energy-connect-badge.png', { type: 'image/png' });
        
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: 'GAIL Energy Connect - #WahKyaEnergyHai',
            text: text,
            files: [file]
          });
          return true;
        }
      } catch (err) {
        console.log('Native share cancelled or unsupported:', err);
      }
    }

    // Fallback: WhatsApp share link
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + '\nPlay now: https://gailonline.com/energyconnect')}`;
    window.open(waUrl, '_blank');
    return false;
  }
}

window.socialCardGenerator = new SocialCardGenerator();

