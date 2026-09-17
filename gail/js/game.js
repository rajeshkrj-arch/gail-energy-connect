// GAIL Energy Connect - Core Game Engine
// "Jodo Pipeline. Jagao Shehar." - A #WahKyaEnergyHai Game

class GailEnergyGame {
  constructor() {
    this.score = 0;
    this.comboStreak = 0;
    this.connectedSegments = new Set();
    this.energizedCities = new Set();
    this.selectedPiece = null;
    this.citizenMode = 'general';
    this.startTime = Date.now();
    this.wrongConnections = 0;
    this.totalConnections = 0;
    this.playerName = 'Citizen Connector';

    this.initDOMElements();
    this.initEventListeners();
    this.renderPieceRack();
    this.renderLeaderboard();
  }

  initDOMElements() {
    this.scoreDisplay = document.getElementById('scoreDisplay');
    this.meterBarFill = document.getElementById('meterBarFill');
    this.meterPct = document.getElementById('meterPct');
    this.meterStageLabel = document.getElementById('meterStageLabel');
    this.citizenModeSelect = document.getElementById('citizenModeSelect');
    this.citizenBuffText = document.getElementById('citizenBuffText');
    this.piecesRack = document.getElementById('piecesRack');
    this.dockHint = document.getElementById('dockHint');
    this.comboBanner = document.getElementById('comboBanner');
    this.toastNudge = document.getElementById('toastNudge');

    // Modals
    this.modalSplash = document.getElementById('modalSplash');
    this.modalCityAwaken = document.getElementById('modalCityAwaken');
    this.modalVictory = document.getElementById('modalVictory');
    this.modalLeaderboard = document.getElementById('modalLeaderboard');
    this.modalMapLegend = document.getElementById('modalMapLegend');

    // City Awaken Elements
    this.cityAwakenName = document.getElementById('cityAwakenName');
    this.cityAwakenTagline = document.getElementById('cityAwakenTagline');
    this.cityElementsGrid = document.getElementById('cityElementsGrid');
    this.cityHeritageSpotlight = document.getElementById('cityHeritageSpotlight');
    this.cityFunFact = document.getElementById('cityFunFact');
    this.cityAwakenBonusTag = document.getElementById('cityAwakenBonusTag');

    // Victory Elements
    this.victoryBadgeTitle = document.getElementById('victoryBadgeTitle');
    this.victoryCardImg = document.getElementById('victoryCardImg');
    this.playerNameInput = document.getElementById('playerNameInput');
    this.leaderboardList = document.getElementById('leaderboardList');
  }

  initEventListeners() {
    // Sound Toggle
    const btnSound = document.getElementById('btnSound');
    btnSound.addEventListener('click', () => {
      const muted = window.soundEngine.toggleMute();
      btnSound.textContent = muted ? '🔇' : '🔊';
    });

    // Map Legend Toggle
    const btnMapLegend = document.getElementById('btnMapLegend');
    if (btnMapLegend) {
      btnMapLegend.addEventListener('click', () => {
        this.modalMapLegend.classList.add('active');
        window.soundEngine.playSnap();
      });
    }

    const btnCloseMapLegend = document.getElementById('btnCloseMapLegend');
    if (btnCloseMapLegend) {
      btnCloseMapLegend.addEventListener('click', () => {
        this.modalMapLegend.classList.remove('active');
        window.soundEngine.playSnap();
      });
    }

    // Top Right Official GAIL Logo quick info click
    const topRightLogo = document.getElementById('topRightLogo');
    if (topRightLogo) {
      topRightLogo.addEventListener('click', () => {
        this.modalMapLegend.classList.add('active');
        window.soundEngine.playSnap();
      });
    }

    // Leaderboard Toggle
    document.getElementById('btnLeaderboard').addEventListener('click', () => {
      this.modalLeaderboard.classList.add('active');
    });
    document.getElementById('btnCloseLeaderboard').addEventListener('click', () => {
      this.modalLeaderboard.classList.remove('active');
    });

    // Restart
    document.getElementById('btnRestart').addEventListener('click', () => {
      if (confirm('Restart pipeline network?')) {
        this.resetGame();
      }
    });

    // Start Game
    document.getElementById('btnStartGame').addEventListener('click', () => {
      this.modalSplash.classList.remove('active');
      window.soundEngine.init();
      window.soundEngine.playSnap();
      this.startTime = Date.now();
    });

    // Continue from City Awakening
    document.getElementById('btnContinueGame').addEventListener('click', () => {
      this.modalCityAwaken.classList.remove('active');
      window.soundEngine.playSnap();
      
      // Check if all 6 cities are completed
      if (this.energizedCities.size >= 6) {
        setTimeout(() => this.triggerVictory(), 300);
      }
    });

    // Play Again
    document.getElementById('btnPlayAgain').addEventListener('click', () => {
      this.modalVictory.classList.remove('active');
      this.resetGame();
    });

    // Citizen Role Selector
    this.citizenModeSelect.addEventListener('change', (e) => {
      this.citizenMode = e.target.value;
      const modeData = GAME_DATA.citizenModes[this.citizenMode];
      this.citizenBuffText.textContent = `${modeData.icon} ${modeData.name}`;
      this.showToast(`Active: ${modeData.buffDescription}`);
      window.soundEngine.playSnap();
    });

    // Instagram Story Sharing (9:16)
    const btnShareInsta = document.getElementById('btnShareInsta');
    if (btnShareInsta) {
      btnShareInsta.addEventListener('click', () => {
        window.socialCardGenerator.shareInstagramStory({
          score: this.score,
          citiesCount: this.energizedCities.size,
          badgeTitle: this.getBadgeTitle(),
          playerName: this.playerName
        });
      });
    }

    // Heritage Landmark Symbols click / info toast
    document.querySelectorAll('.heritage-symbol').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const cityId = el.getAttribute('data-city');
        const city = GAME_DATA.cities[cityId];
        if (!city) return;
        const isEnergized = this.energizedCities.has(cityId);
        if (isEnergized) {
          this.showToast(`${city.heritageIcon || '🏛️'} ${city.heritage} (${city.name}): Energized with clean GAIL natural gas! ⚡`);
        } else {
          this.showToast(`${city.heritageIcon || '🏛️'} ${city.heritage} (${city.name}): Connect pipeline to energize this landmark!`);
        }
        window.soundEngine.playSnap();
      });
    });

    // Social Sharing buttons
    document.getElementById('btnShareWhatsApp').addEventListener('click', () => {
      window.socialCardGenerator.share({
        score: this.score,
        citiesCount: this.energizedCities.size,
        badgeTitle: this.getBadgeTitle(),
        playerName: this.playerName
      });
    });

    document.getElementById('btnDownloadCard').addEventListener('click', () => {
      window.socialCardGenerator.downloadImage('GAIL-Energy-Connect-WahKyaEnergyHai.png');
    });

    document.getElementById('btnShareNative').addEventListener('click', () => {
      window.socialCardGenerator.share({
        score: this.score,
        citiesCount: this.energizedCities.size,
        badgeTitle: this.getBadgeTitle(),
        playerName: this.playerName
      });
    });

    document.getElementById('btnSubmitScore').addEventListener('click', () => {
      const name = this.playerNameInput.value.trim();
      if (name) {
        this.playerName = name;
        this.saveScoreToLeaderboard(name, this.score);
        this.showToast('Score saved to Leaderboard! ⚡');
        this.renderSocialCard();
      }
    });

    // Setup interactive Route Slots in SVG
    document.querySelectorAll('.route-slot').forEach(slot => {
      // Tap / Click to place selected piece
      slot.addEventListener('click', (e) => {
        e.stopPropagation();
        const segmentId = slot.getAttribute('data-segment-id');
        this.handleSlotPlacement(segmentId);
      });

      // HTML5 Drag & Drop Target
      slot.addEventListener('dragover', (e) => {
        e.preventDefault();
        slot.classList.add('slot-highlight');
      });

      slot.addEventListener('dragleave', () => {
        slot.classList.remove('slot-highlight');
      });

      slot.addEventListener('drop', (e) => {
        e.preventDefault();
        slot.classList.remove('slot-highlight');
        const draggedType = e.dataTransfer.getData('text/plain');
        if (draggedType) {
          this.selectedPiece = draggedType;
          const segmentId = slot.getAttribute('data-segment-id');
          this.handleSlotPlacement(segmentId);
        }
      });
    });

    // Click map background to deselect piece
    document.getElementById('mapStage').addEventListener('click', () => {
      this.clearSelection();
    });

    // Initialize 3D Camera Projection & Dynamic Parallax
    this.init3DMapProjection();
  }

  init3DMapProjection() {
    const mapStage = document.getElementById('mapStage');
    const pipelineSvg = document.getElementById('pipelineSvg');
    if (!mapStage || !pipelineSvg) return;

    // Corridor focal point & bounding requirements on crop2-corridor.jpg (520x520)
    const centerX = 290;
    const centerY = 250;
    const minCorridorW = 430;
    const minCorridorH = 300;

    // Responsive camera zoom to fit whole screen without any letterboxing
    const updateViewBox = () => {
      const w = mapStage.clientWidth || window.innerWidth;
      const h = mapStage.clientHeight || (window.innerHeight - 190);
      if (w <= 0 || h <= 0) return;
      const aspect = w / h;

      let viewW, viewH;
      if (aspect >= 1.15) {
        // Landscape (Desktop, Laptop, Tablet landscape) - fit height and expand width seamlessly
        viewH = Math.max(minCorridorH / 0.76, 420);
        viewW = viewH * aspect;
      } else {
        // Portrait (Mobile phones, tall tablets) - fit width and expand height
        viewW = Math.max(minCorridorW / 0.88, 480);
        viewH = viewW / aspect;
      }

      const viewX = Math.round(centerX - viewW / 2);
      const viewY = Math.round(centerY - viewH / 2);

      pipelineSvg.setAttribute('viewBox', `${viewX} ${viewY} ${Math.round(viewW)} ${Math.round(viewH)}`);
    };

    window.addEventListener('resize', updateViewBox);
    window.addEventListener('orientationchange', () => {
      setTimeout(updateViewBox, 100);
    });
    updateViewBox();

    // 3D Parallax Tilt with holographic depth and smooth 60fps spring physics
    let currentTiltX = 14;
    let currentTiltY = 0;
    let targetTiltX = 14;
    let targetTiltY = 0;

    const handlePointerMove = (e) => {
      const rect = mapStage.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const normX = ((clientX - rect.left) / rect.width) - 0.5;
      const normY = ((clientY - rect.top) / rect.height) - 0.5;

      targetTiltX = 14 - (normY * 18);
      targetTiltY = normX * 22;
    };

    const handlePointerLeave = () => {
      targetTiltX = 14;
      targetTiltY = 0;
    };

    mapStage.addEventListener('mousemove', handlePointerMove);
    mapStage.addEventListener('touchmove', handlePointerMove, { passive: true });
    mapStage.addEventListener('mouseleave', handlePointerLeave);
    mapStage.addEventListener('touchend', handlePointerLeave);

    // Physical spring loop for smooth weighted 3D perspective
    const animateTilt = () => {
      currentTiltX += (targetTiltX - currentTiltX) * 0.08;
      currentTiltY += (targetTiltY - currentTiltY) * 0.08;

      pipelineSvg.style.transform = `rotateX(${currentTiltX.toFixed(2)}deg) rotateY(${currentTiltY.toFixed(2)}deg) scale(1.05)`;

      requestAnimationFrame(animateTilt);
    };

    animateTilt();

    // Gyroscope tilt on mobile devices
    if (window.DeviceOrientationEvent && typeof window.DeviceOrientationEvent.requestPermission !== 'function') {
      window.addEventListener('deviceorientation', (e) => {
        if (e.beta !== null && e.gamma !== null) {
          targetTiltX = Math.max(4, Math.min(24, 14 + (e.beta - 45) * 0.2));
          targetTiltY = Math.max(-16, Math.min(16, e.gamma * 0.25));
        }
      });
    }
  }

  renderPieceRack() {
    this.piecesRack.innerHTML = '';
    GAME_DATA.pipePieces.forEach(piece => {
      const tile = document.createElement('div');
      tile.className = 'pipe-tile';
      tile.setAttribute('data-piece-type', piece.type);
      tile.setAttribute('draggable', 'true');
      tile.title = `${piece.name}: ${piece.desc}`;

      tile.innerHTML = `
        <div class="pipe-icon">${piece.svg || piece.icon}</div>
        <div class="pipe-label">${piece.name}</div>
      `;

      // Tap to select
      tile.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectPiece(piece.type);
      });

      // Drag start
      tile.addEventListener('dragstart', (e) => {
        this.selectPiece(piece.type);
        e.dataTransfer.setData('text/plain', piece.type);
      });

      this.piecesRack.appendChild(tile);
    });
  }

  selectPiece(pieceType) {
    this.selectedPiece = pieceType;
    document.querySelectorAll('.pipe-tile').forEach(t => {
      if (t.getAttribute('data-piece-type') === pieceType) {
        t.classList.add('selected');
      } else {
        t.classList.remove('selected');
      }
    });

    const piece = GAME_DATA.pipePieces.find(p => p.type === pieceType);
    if (piece) {
      this.dockHint.textContent = `Selected: ${piece.name} - Tap route to place`;
    }
    window.soundEngine.playSnap();
  }

  clearSelection() {
    this.selectedPiece = null;
    document.querySelectorAll('.pipe-tile').forEach(t => t.classList.remove('selected'));
    this.dockHint.textContent = 'Drag or tap piece & route';
  }

  handleSlotPlacement(segmentId) {
    if (!this.selectedPiece) {
      this.showToast('Select a pipeline piece first! 👇');
      return;
    }

    const segment = GAME_DATA.segments.find(s => s.id === segmentId);
    if (!segment) return;

    if (this.connectedSegments.has(segmentId)) {
      this.showToast('This pipeline section is already energized! ⚡');
      return;
    }

    this.totalConnections++;

    // Check if player placed the correct piece
    if (this.selectedPiece === segment.requiredPipe) {
      this.onCorrectConnection(segment);
    } else {
      this.onIncorrectConnection(segment);
    }
  }

  onCorrectConnection(segment) {
    this.connectedSegments.add(segment.id);
    this.comboStreak++;

    // Sounds & Tactile
    window.soundEngine.playSnap();

    // Mark SVG Route as connected
    const slotEl = document.getElementById(`slot-${segment.id}`);
    if (slotEl) {
      slotEl.classList.add('connected');
      slotEl.classList.add('energized');
      const activeEl = slotEl.querySelector('.slot-active');
      if (activeEl) {
        activeEl.style.display = 'block';
      }
    }

    // Play traveling electric pulse sound
    window.soundEngine.playEnergyPulse();

    // Calculate score
    const modeMultiplier = GAME_DATA.citizenModes[this.citizenMode].multiplier || 1.0;
    let earned = Math.round(GAME_DATA.scoring.connectionCorrect * modeMultiplier);

    // Combo escalation
    if (this.comboStreak >= 5) {
      earned += GAME_DATA.scoring.comboStreak5;
      this.showCombo(`🔥 SUPER ENERGIZER! +${earned}`);
      window.soundEngine.playCombo(3);
    } else if (this.comboStreak >= 3) {
      earned += GAME_DATA.scoring.comboStreak3;
      this.showCombo(`⚡ ENERGY COMBO ×${this.comboStreak}! +${earned}`);
      window.soundEngine.playCombo(2);
    } else {
      this.showCombo(`⚡ PIPELINE CONNECTED! +${earned}`);
      window.soundEngine.playCombo(1);
    }

    this.addScore(earned);

    // Trigger City Awakening sequence after pulse arrives (450ms)
    setTimeout(() => {
      this.awakenCity(segment.cityId);
    }, 450);

    this.clearSelection();
  }

  onIncorrectConnection(segment) {
    this.wrongConnections++;
    this.comboStreak = 0;
    window.soundEngine.playError();
    this.showToast(`❌ Route mismatch: ${segment.hint}`);

    const slotEl = document.getElementById(`slot-${segment.id}`);
    if (slotEl) {
      slotEl.animate([
        { transform: 'translateX(-4px)' },
        { transform: 'translateX(4px)' },
        { transform: 'translateX(0)' }
      ], { duration: 300 });
    }
  }

  awakenCity(cityId) {
    const city = GAME_DATA.cities[cityId];
    if (!city) return;

    this.energizedCities.add(cityId);

    // Visual Awakening on SVG Map Node
    const nodeEl = document.getElementById(`node-${cityId}`);
    if (nodeEl) {
      nodeEl.classList.add('energized');
    }

    // Visual Awakening on Heritage Landmark Symbol
    const heritageEl = document.getElementById(`heritage-${cityId}`);
    if (heritageEl) {
      heritageEl.classList.add('energized');
    }

    // Play uplifting city awakening chimes
    window.soundEngine.playCityAwaken();

    // Bonus points for City + CGD activation
    const modeMultiplier = GAME_DATA.citizenModes[this.citizenMode].multiplier || 1.0;
    const cityBonus = Math.round((city.points + GAME_DATA.scoring.cgdActivated) * modeMultiplier);
    this.addScore(cityBonus);

    // Update Energy Impact Meter
    this.updateEnergyMeter();

    // Populate City Awakening Modal (Dopamine Moment!)
    this.cityAwakenName.textContent = city.name.toUpperCase();
    this.cityAwakenTagline.textContent = city.tagline;
    this.cityFunFact.textContent = `💡 ${city.funFact}`;
    this.cityAwakenBonusTag.textContent = `${this.citizenMode.toUpperCase()} BONUS ACTIVE`;

    this.cityElementsGrid.innerHTML = city.elements.map(el => `
      <div class="city-element-item">
        <span class="element-icon">${el.icon}</span>
        <span class="element-text">${el.text}</span>
      </div>
    `).join('');

    // Inject Heritage Spotlight Pill
    if (this.cityHeritageSpotlight && city.heritage) {
      this.cityHeritageSpotlight.innerHTML = `
        <span class="heritage-pill-icon">${city.heritageIcon || '🏛️'}</span>
        <div class="heritage-pill-body">
          <span class="heritage-pill-title">HERITAGE EMBRACED: ${city.heritage.toUpperCase()}</span>
          <span class="heritage-pill-desc">${city.heritageHighlight}</span>
        </div>
      `;
    }

    // Open Dopamine modal
    this.modalCityAwaken.classList.add('active');
  }

  updateEnergyMeter() {
    const pct = Math.min(100, Math.round((this.energizedCities.size / 6) * 100));
    this.meterBarFill.style.width = `${pct}%`;
    this.meterPct.textContent = `${pct}%`;

    if (pct >= 100) {
      this.meterStageLabel.textContent = 'INDIA IS ENERGIZED! ⚡';
    } else if (pct >= 75) {
      this.meterStageLabel.textContent = 'LIFE IS ENERGIZED';
    } else if (pct >= 50) {
      this.meterStageLabel.textContent = 'CITIES ARE WAKING UP';
    } else if (pct >= 25) {
      this.meterStageLabel.textContent = 'ENERGY IS MOVING';
    } else {
      this.meterStageLabel.textContent = 'ENERGY IMPACT';
    }
  }

  addScore(points) {
    const target = this.score + points;
    const increment = Math.ceil(points / 15);
    const counter = setInterval(() => {
      if (this.score + increment >= target) {
        this.score = target;
        this.scoreDisplay.textContent = this.score.toLocaleString();
        clearInterval(counter);
      } else {
        this.score += increment;
        this.scoreDisplay.textContent = this.score.toLocaleString();
      }
    }, 20);
  }

  showCombo(text) {
    this.comboBanner.textContent = text;
    this.comboBanner.classList.add('show');
    clearTimeout(this.comboTimeout);
    this.comboTimeout = setTimeout(() => {
      this.comboBanner.classList.remove('show');
    }, 1800);
  }

  showToast(text) {
    this.toastNudge.textContent = text;
    this.toastNudge.classList.add('show');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.toastNudge.classList.remove('show');
    }, 2400);
  }

  getBadgeTitle() {
    const count = this.energizedCities.size;
    if (count >= 5) return 'Wah Kya Energy Hai! Master Energy Connector';
    if (count >= 4) return 'City Energizer';
    if (count >= 3) return 'Pipeline Connector';
    return 'Energy Starter';
  }

  triggerVictory() {
    window.soundEngine.playVictory();

    // Check Flawless Bonus
    if (this.wrongConnections === 0) {
      this.addScore(GAME_DATA.scoring.flawlessBonus);
      this.showToast('🏆 FLAWLESS RUN! +1,000 Clean Network Bonus!');
    }

    const badgeTitle = this.getBadgeTitle();
    this.victoryBadgeTitle.textContent = badgeTitle.toUpperCase();

    // Generate Canva-grade social card
    this.renderSocialCard();

    this.modalVictory.classList.add('active');
  }

  renderSocialCard() {
    const cardDataUrl = window.socialCardGenerator.generate({
      score: this.score,
      citiesCount: this.energizedCities.size,
      badgeTitle: this.getBadgeTitle(),
      playerName: this.playerName
    });
    this.victoryCardImg.src = cardDataUrl;
  }

  renderLeaderboard() {
    this.leaderboardList.innerHTML = GAME_DATA.leaderboard.map(entry => `
      <div class="leader-row ${entry.name.includes(this.playerName) ? 'highlight' : ''}">
        <div>
          <span style="font-weight:800; color: #00f0ff; margin-right: 8px;">#${entry.rank}</span>
          <span class="leader-name">${entry.name}</span>
        </div>
        <span class="leader-score">${entry.score.toLocaleString()}</span>
      </div>
    `).join('');
  }

  saveScoreToLeaderboard(name, score) {
    GAME_DATA.leaderboard.push({
      rank: GAME_DATA.leaderboard.length + 1,
      name: `${name} (You)`,
      score: score,
      badge: this.getBadgeTitle()
    });

    // Sort descending
    GAME_DATA.leaderboard.sort((a, b) => b.score - a.score);
    // Re-rank
    GAME_DATA.leaderboard.forEach((item, idx) => item.rank = idx + 1);
    this.renderLeaderboard();
  }

  resetGame() {
    this.score = 0;
    this.comboStreak = 0;
    this.connectedSegments.clear();
    this.energizedCities.clear();
    this.selectedPiece = null;
    this.wrongConnections = 0;
    this.totalConnections = 0;
    this.startTime = Date.now();

    this.scoreDisplay.textContent = '0';
    this.updateEnergyMeter();

    // Reset SVG Route Slots
    document.querySelectorAll('.route-slot').forEach(slot => {
      slot.classList.remove('connected');
      slot.classList.remove('energized');
      const activeEl = slot.querySelector('.slot-active');
      if (activeEl) {
        activeEl.style.display = 'none';
      }
    });

    // Reset City Nodes (Keep Jagdishpur source energized)
    document.querySelectorAll('.map-node').forEach(node => {
      if (node.id !== 'node-jagdishpur') {
        node.classList.remove('energized');
      }
    });

    // Reset Heritage Landmark Symbols
    document.querySelectorAll('.heritage-symbol').forEach(sym => {
      sym.classList.remove('energized');
    });

    this.renderPieceRack();
    this.clearSelection();
  }
}

// Launch Game on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.game = new GailEnergyGame();
});
