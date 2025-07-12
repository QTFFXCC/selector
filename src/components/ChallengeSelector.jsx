import React, { useState } from 'react';
import './ChallengeSelector.css';
import { allChallenges, accountSizes } from '../data/challengeData';

const ChallengeSelector = () => {
  const [selectedChallenge, setSelectedChallenge] = useState('starter');
  const [selectedAccountSize, setSelectedAccountSize] = useState(100000);
  const [selectedPhaseType, setSelectedPhaseType] = useState('2step'); // '1step' or '2step'

  // Получаем текущий челлендж
  const currentChallenge = allChallenges.find(ch => ch.id === selectedChallenge) || allChallenges[0];
  const price = currentChallenge.pricing[selectedAccountSize] || 'N/A';
  
  // Получаем параметры текущего челленджа
  const phase1 = currentChallenge.phase1 || {};
  const phase2 = currentChallenge.phase2 || null;
  const liveFunded = currentChallenge.liveFundedAccount || {};
  const payoutRules = currentChallenge.payoutRules || {};

  // Разделяем челленджи по типам
  const onePhase = allChallenges.filter(ch => ch.phases === 1);
  const twoPhases = allChallenges.filter(ch => ch.phases === 2);

  // Отображаемые челленджи в зависимости от выбранного типа
  const displayedChallenges = selectedPhaseType === '1step' ? onePhase : twoPhases;

  // Определяем доступные размеры счетов
  const getAvailableAccountSizes = () => {
    if (currentChallenge.id === 'starter') {
      return accountSizes; // Для Starter показываем все размеры включая 5K
    }
    return accountSizes.filter(size => size.value >= 10000); // Для остальных начинаем с 10K
  };

  const availableAccountSizes = getAvailableAccountSizes();

  // При переключении типа фаз, выбираем первый доступный челлендж
  const handlePhaseTypeChange = (type) => {
    setSelectedPhaseType(type);
    const challenges = type === '1step' ? onePhase : twoPhases;
    if (challenges.length > 0) {
      const newChallenge = challenges[0];
      setSelectedChallenge(newChallenge.id);
      // Если текущий размер недоступен для нового челленджа, выбираем минимальный доступный
      if (newChallenge.id !== 'starter' && selectedAccountSize < 10000) {
        setSelectedAccountSize(10000);
      }
    }
  };

  // При выборе челленджа проверяем доступность текущего размера счета
  const handleChallengeSelect = (challengeId) => {
    setSelectedChallenge(challengeId);
    const challenge = allChallenges.find(ch => ch.id === challengeId);
    if (challenge && challenge.id !== 'starter' && selectedAccountSize < 10000) {
      setSelectedAccountSize(10000);
    }
  };

  return (
    <div className="challenge-selector">
      <h1 className="title">Find a challenge Fast</h1>
      <p className="subtitle">Use the filter to find the right challenge instantly</p>
      
      {/* Кнопки переключения типа челленджей */}
      <div className="phase-type-selector">
        <button
          className={`phase-type-button ${selectedPhaseType === '1step' ? 'active' : ''}`}
          onClick={() => handlePhaseTypeChange('1step')}
        >
          1-STEP
        </button>
        <button
          className={`phase-type-button ${selectedPhaseType === '2step' ? 'active' : ''}`}
          onClick={() => handlePhaseTypeChange('2step')}
        >
          2-STEP
        </button>
      </div>

      {/* Карточки челленджей */}
      <div className="challenges-container">
        <div className="challenges-grid single-group">
          {displayedChallenges.map(challenge => (
            <div 
              key={challenge.id}
              className={`challenge-card ${selectedChallenge === challenge.id ? 'active' : ''}`}
              onClick={() => handleChallengeSelect(challenge.id)}
            >
              <span className="challenge-card-icon">{challenge.icon}</span>
              <h3 className="challenge-card-title">{challenge.name}</h3>
              <div className="challenge-card-type">
                {challenge.phases === 1 ? '1 Phase' : '2 Phases'}
              </div>
              <p className="challenge-card-description">{challenge.description}</p>
              <ul className="challenge-advantages">
                {challenge.advantages.map((advantage, index) => (
                  <li key={index}>{advantage}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Кнопки выбора размера счета */}
      <div className="account-size-section">
        <h3>SELECT ACCOUNT SIZE</h3>
        <div className="account-sizes-grid">
          {availableAccountSizes.map(size => (
            <button
              key={size.value}
              className={`account-size-button ${selectedAccountSize === size.value ? 'active' : ''}`}
              onClick={() => setSelectedAccountSize(size.value)}
              disabled={currentChallenge.pricing[size.value] === null}
            >
              ${size.value.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      {/* Разделение по фазам */}
      <div className="phases-section">
        <h2 className="phases-title">Условия прохождения</h2>
        <div className="phases-grid">
          {/* Phase 1 */}
          <div className="phase-card">
            <h3 className="phase-title">Phase 1</h3>
            <div className="phase-params">
              <div className="phase-param">
                <span className="phase-param-label">Profit Target</span>
                <span className="phase-param-value">{phase1.targetProfit}%</span>
              </div>
              <div className="phase-param">
                <span className="phase-param-label">Daily Drawdown</span>
                <span className="phase-param-value">{phase1.dailyDrawdown}%</span>
              </div>
              <div className="phase-param">
                <span className="phase-param-label">Max Drawdown</span>
                <span className="phase-param-value">{phase1.maxDrawdown}%</span>
              </div>
              <div className="phase-param">
                <span className="phase-param-label">Min Trading Days</span>
                <span className="phase-param-value">{phase1.minTradingDays} days</span>
              </div>
              <div className="phase-param">
                <span className="phase-param-label">Time Limit</span>
                <span className="phase-param-value">{phase1.timeLimit || 'Unlimited'}</span>
              </div>
            </div>
          </div>

          {/* Phase 2 (if exists) */}
          {phase2 && (
            <div className="phase-card">
              <h3 className="phase-title">Phase 2</h3>
              <div className="phase-params">
                <div className="phase-param">
                  <span className="phase-param-label">Profit Target</span>
                  <span className="phase-param-value">{phase2.targetProfit}%</span>
                </div>
                <div className="phase-param">
                  <span className="phase-param-label">Daily Drawdown</span>
                  <span className="phase-param-value">{phase2.dailyDrawdown}%</span>
                </div>
                <div className="phase-param">
                  <span className="phase-param-label">Max Drawdown</span>
                  <span className="phase-param-value">{phase2.maxDrawdown}%</span>
                </div>
                <div className="phase-param">
                  <span className="phase-param-label">Min Trading Days</span>
                  <span className="phase-param-value">{phase2.minTradingDays} days</span>
                </div>
                <div className="phase-param">
                  <span className="phase-param-label">Time Limit</span>
                  <span className="phase-param-value">{phase2.timeLimit || 'Unlimited'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Live Account */}
          <div className="phase-card funded">
            <h3 className="phase-title">Funded Account</h3>
            <div className="phase-params">
              <div className="phase-param">
                <span className="phase-param-label">Profit Target</span>
                <span className="phase-param-value">{liveFunded.targetProfit || 'None'}</span>
              </div>
              <div className="phase-param">
                <span className="phase-param-label">Daily Drawdown</span>
                <span className="phase-param-value">{liveFunded.dailyDrawdown}%</span>
              </div>
              <div className="phase-param">
                <span className="phase-param-label">Max Drawdown</span>
                <span className="phase-param-value">{liveFunded.maxDrawdown}%</span>
              </div>
              <div className="phase-param">
                <span className="phase-param-label">Profit Split</span>
                <span className="phase-param-value">{payoutRules.profitSplit}%</span>
              </div>
              <div className="phase-param">
                <span className="phase-param-label">Consistency Rule</span>
                <span className="phase-param-value">{payoutRules.consistencyRule ? `${payoutRules.consistencyRule}%` : 'None'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Параметры челленджа */}
      <div className="challenge-params">
        <h2 className="params-title">Основные условия</h2>
        <div className="param-grid">
          <div className="param-item">
            <div className="param-icon">{phase1.targetProfit || 10}%</div>
            <div className="param-info">
              <div className="param-title">{phase1.targetProfit || 10}% profit target</div>
              <div className="param-description">${(selectedAccountSize * ((phase1.targetProfit || 10) / 100)).toLocaleString()} profit target to pass</div>
            </div>
          </div>

          <div className="param-item">
            <div className="param-icon">30x</div>
            <div className="param-info">
              <div className="param-title">1:30 max leverage</div>
              <div className="param-description">Variable leverage by product</div>
            </div>
          </div>

          <div className="param-item">
            <div className="param-icon">{phase1.maxDrawdown || 9}%</div>
            <div className="param-info">
              <div className="param-title">{phase1.maxDrawdown || 9}% max drawdown</div>
              <div className="param-description">${(selectedAccountSize * ((phase1.maxDrawdown || 9) / 100)).toLocaleString()} maximum drawdown</div>
            </div>
          </div>

          <div className="param-item">
            <div className="param-icon">{payoutRules.profitSplit || 80}%</div>
            <div className="param-info">
              <div className="param-title">{payoutRules.profitSplit || 80}% profit share</div>
              <div className="param-description">Up to {payoutRules.profitSplit || 80}% profit share</div>
            </div>
          </div>

          <div className="param-item">
            <div className="param-icon">{phase1.dailyDrawdown || 5}%</div>
            <div className="param-info">
              <div className="param-title">{phase1.dailyDrawdown || 5}% daily loss</div>
              <div className="param-description">Based on previous EOD balance</div>
            </div>
          </div>

          <div className="param-item">
            <div className="param-icon">{payoutRules.consistencyRule || '-'}%</div>
            <div className="param-info">
              <div className="param-title">{payoutRules.consistencyRule ? `${payoutRules.consistencyRule}% Consistency Score` : 'No Consistency Rule'}</div>
              <div className="param-description">{payoutRules.consistencyRule ? 'To pass a stage and between payouts' : 'No consistency requirements'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Цена и кнопка покупки */}
      <div className="purchase-section">
        <div className="price-info">
          <div className="price">{price === 'N/A' ? 'N/A' : `$${price}`}</div>
          <div className="price-description">
            {price === 'N/A' 
              ? 'Not available for this account size' 
              : `${currentChallenge.name} - $${selectedAccountSize.toLocaleString()} account`
            }
          </div>
        </div>
        <button className="buy-button" disabled={price === 'N/A'}>
          {price === 'N/A' ? 'NOT AVAILABLE' : 'BUY NOW'}
        </button>
      </div>
    </div>
  );
};

export default ChallengeSelector; 