// ─── Spec Components ──────────────────────────────────────────────────────────

// 1. HeroLossNumber ────────────────────────────────────────────────────────────
function HeroLossNumber({ amount, label, sublabel, style }) {
  const [counted, setCounted] = React.useState(0);
  const target = amount || 0;

  React.useEffect(() => {
    let start = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCounted(target); clearInterval(timer); }
      else setCounted(Math.floor(start));
    }, 18);
    return () => clearInterval(timer);
  }, [target]);

  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD',
    minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(counted);

  return (
    <div style={{ textAlign: 'center', ...style }}>
      {label && (
        <div style={{ fontSize: FONTS.sm, fontWeight: FONTS.w5, color: 'rgba(255,255,255,0.7)', marginBottom: 4, letterSpacing: 0.5, textTransform: 'uppercase' }}>
          {label}
        </div>
      )}
      <div style={{
        fontSize: FONTS.giant,
        fontWeight: FONTS.w9,
        color: COLORS.white,
        letterSpacing: -3,
        lineHeight: 1,
        textShadow: '0 2px 20px rgba(229,62,62,0.4)',
        fontVariantNumeric: 'tabular-nums',
      }}>
        {formatted}
      </div>
      {sublabel && (
        <div style={{ fontSize: FONTS.sm, color: 'rgba(255,255,255,0.6)', marginTop: 6 }}>
          {sublabel}
        </div>
      )}
    </div>
  );
}

// 2. CartCard ──────────────────────────────────────────────────────────────────
function CartCard({ cart, onPress, style }) {
  const statusConfig = {
    not_contacted: { label: 'Not Contacted', bg: COLORS.bgAlt, color: COLORS.textLight, dot: '#9CA3AF' },
    recovery_sent:  { label: 'Recovery Sent', bg: COLORS.blueMid, color: COLORS.blueDark, dot: COLORS.blue },
    recovered:      { label: 'Recovered ✓', bg: COLORS.greenMid, color: COLORS.greenDark, dot: COLORS.green },
    expired:        { label: 'Expired', bg: COLORS.redMid, color: COLORS.red, dot: COLORS.red },
  };
  const st = statusConfig[cart.status] || statusConfig.not_contacted;
  const mainItem = cart.items[0];
  const extraCount = cart.items.length - 1;

  return (
    <Card onPress={onPress} padding={0} style={{ marginBottom: SPACING.md, overflow: 'hidden', ...style }}>
      <Row style={{ padding: SPACING.lg, gap: SPACING.md }}>
        {/* Product emoji */}
        <div style={{
          width: 52, height: 52, borderRadius: 12,
          background: COLORS.bgAlt,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28, flexShrink: 0,
        }}>
          {mainItem?.image || '🛒'}
        </div>
        {/* Info */}
        <Col style={{ flex: 1, gap: 3 }}>
          <Row style={{ justifyContent: 'space-between', alignItems: 'flex-start', gap: SPACING.sm }}>
            <span style={{ fontSize: FONTS.base, fontWeight: FONTS.w7, color: COLORS.text, flex: 1, lineHeight: 1.3 }}>
              {cart.customerName}
            </span>
            <span style={{ fontSize: FONTS.lg, fontWeight: FONTS.w8, color: cart.status === 'recovered' ? COLORS.green : COLORS.red, flexShrink: 0 }}>
              {formatCurrencyFull(cart.value)}
            </span>
          </Row>
          <span style={{ fontSize: FONTS.sm, color: COLORS.textLight, lineHeight: 1.3 }}>
            {mainItem?.name}{extraCount > 0 ? ` +${extraCount} more` : ''}
          </span>
          <Row style={{ marginTop: 4, gap: SPACING.sm }}>
            <Badge
              label={st.label}
              bg={st.bg}
              color={st.color}
              dot={true}
            />
            <span style={{ fontSize: FONTS.xs, color: COLORS.textMuted }}>
              {formatRelativeTime(cart.abandonedAt)}
            </span>
          </Row>
        </Col>
      </Row>
      {/* Recovery message preview */}
      {cart.recoveryMessage && cart.status === 'recovery_sent' && (
        <div style={{
          borderTop: `1px solid ${COLORS.borderLight}`,
          padding: `${SPACING.sm}px ${SPACING.lg}px`,
          background: COLORS.blueLight,
        }}>
          <Row style={{ gap: SPACING.xs }}>
            <span style={{ fontSize: 12 }}>💬</span>
            <span style={{
              fontSize: FONTS.xs, color: COLORS.blue, lineHeight: 1.4,
              overflow: 'hidden', display: '-webkit-box',
              WebkitLineClamp: 1, WebkitBoxOrient: 'vertical',
            }}>
              {cart.recoveryMessage}
            </span>
          </Row>
        </div>
      )}
    </Card>
  );
}

// 3. ActionFeedItem ────────────────────────────────────────────────────────────
function ActionFeedItem({ item, onPress, style }) {
  const isPositive = item.result && item.result.startsWith('+');
  return (
    <Pressable onPress={onPress} style={{ marginBottom: 2, ...style }}>
      <Row style={{
        padding: `${SPACING.md}px ${SPACING.screen}px`,
        gap: SPACING.md, alignItems: 'flex-start',
        borderBottom: `1px solid ${COLORS.borderLight}`,
      }}>
        {/* Icon bubble */}
        <div style={{
          width: 40, height: 40, borderRadius: 12,
          background: item.color ? item.color + '18' : COLORS.blueLight,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, flexShrink: 0, marginTop: 1,
        }}>
          {item.icon}
        </div>
        {/* Content */}
        <Col style={{ flex: 1, gap: 2 }}>
          <Row style={{ justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
            <span style={{ fontSize: FONTS.sm, fontWeight: FONTS.w6, color: COLORS.text, flex: 1, lineHeight: 1.3 }}>
              {item.automationName}
            </span>
            {item.result && (
              <span style={{
                fontSize: FONTS.sm, fontWeight: FONTS.w7,
                color: isPositive ? COLORS.green : COLORS.textLight,
                flexShrink: 0,
              }}>
                {item.result}
              </span>
            )}
          </Row>
          <span style={{ fontSize: FONTS.xs, color: COLORS.textLight, lineHeight: 1.5 }}>
            {item.description}
          </span>
          <span style={{ fontSize: FONTS.xs, color: COLORS.textMuted, marginTop: 2 }}>
            {formatRelativeTime(item.timestamp)}
          </span>
        </Col>
      </Row>
    </Pressable>
  );
}

// 4. AIMessagePreview ──────────────────────────────────────────────────────────
function AIMessagePreview({ message, style }) {
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';

  if (isUser) {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: SPACING.md, paddingLeft: 48, ...style }}>
        <div style={{
          background: COLORS.blue,
          borderRadius: '18px 18px 4px 18px',
          padding: `${SPACING.sm}px ${SPACING.md}px`,
          maxWidth: '100%',
        }}>
          <span style={{ fontSize: FONTS.base, color: COLORS.white, lineHeight: 1.5 }}>
            {message.content}
          </span>
        </div>
      </div>
    );
  }

  // Parse simple markdown: **bold**, \n\n paragraphs, bullet points
  function renderContent(text) {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      if (line.trim() === '') return <div key={i} style={{ height: 6 }} />;
      // Bold
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      const rendered = parts.map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={j} style={{ fontWeight: FONTS.w7 }}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('_') && part.endsWith('_')) {
          return <em key={j} style={{ fontStyle: 'italic', color: COLORS.textSub }}>{part.slice(1, -1)}</em>;
        }
        return <span key={j}>{part}</span>;
      });
      return <div key={i} style={{ lineHeight: 1.6, marginBottom: 2 }}>{rendered}</div>;
    });
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: SPACING.md, paddingRight: 48, ...style }}>
      <Col style={{ gap: 6 }}>
        {/* AI avatar */}
        <Row style={{ gap: SPACING.sm, alignItems: 'flex-end' }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, flexShrink: 0,
          }}>
            🍬
          </div>
          <div style={{
            background: COLORS.white,
            border: `1px solid ${COLORS.border}`,
            borderRadius: '4px 18px 18px 18px',
            padding: `${SPACING.sm + 2}px ${SPACING.md}px`,
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          }}>
            <div style={{ fontSize: FONTS.base, color: COLORS.text, lineHeight: 1.5 }}>
              {renderContent(message.content)}
            </div>
            {message.actions && (
              <div style={{ marginTop: SPACING.md, display: 'flex', flexDirection: 'column', gap: SPACING.sm }}>
                {message.actions.map((action, i) => (
                  <div key={i} style={{
                    padding: `${SPACING.sm}px ${SPACING.md}px`,
                    background: i === 0 ? COLORS.blue : COLORS.bgAlt,
                    borderRadius: 10,
                    cursor: 'pointer',
                    color: i === 0 ? COLORS.white : COLORS.text,
                    fontSize: FONTS.sm,
                    fontWeight: FONTS.w6,
                    textAlign: 'center',
                  }}>
                    {action.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Row>
        <span style={{ fontSize: FONTS.xs, color: COLORS.textMuted, paddingLeft: 36 }}>
          {formatRelativeTime(message.timestamp)}
        </span>
      </Col>
    </div>
  );
}

// 5. ProactiveAdvisorMessage ───────────────────────────────────────────────────
function ProactiveAdvisorMessage({ message, onDismiss, onAction, style }) {
  const [visible, setVisible] = React.useState(true);
  if (!visible) return null;

  const urgencyConfig = {
    proactive_briefing: { border: COLORS.blue, bg: COLORS.blueLight, accent: COLORS.blue },
    recommendation: { border: COLORS.orange, bg: COLORS.orangeLight, accent: COLORS.orange },
    alert: { border: COLORS.red, bg: COLORS.redLight, accent: COLORS.red },
    confirmation: { border: COLORS.green, bg: COLORS.greenLight, accent: COLORS.green },
  };
  const cfg = urgencyConfig[message.type] || urgencyConfig.proactive_briefing;

  function renderContent(text) {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      if (line.trim() === '') return null;
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      const rendered = parts.map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={j}>{part.slice(2, -2)}</strong>;
        }
        return <span key={j}>{part}</span>;
      });
      return <div key={i} style={{ marginBottom: 4, lineHeight: 1.5 }}>{rendered}</div>;
    }).filter(Boolean);
  }

  return (
    <div style={{
      background: cfg.bg,
      borderLeft: `3px solid ${cfg.border}`,
      borderRadius: 16,
      padding: SPACING.lg,
      margin: `0 ${SPACING.screen}px ${SPACING.lg}px`,
      ...style
    }}>
      <Row style={{ justifyContent: 'space-between', marginBottom: SPACING.sm }}>
        <Row style={{ gap: SPACING.sm }}>
          <div style={{
            width: 26, height: 26, borderRadius: 8,
            background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14,
          }}>
            🍬
          </div>
          <span style={{ fontSize: FONTS.sm, fontWeight: FONTS.w7, color: cfg.accent }}>
            Retail Candy AI
          </span>
        </Row>
        {onDismiss && (
          <Pressable onPress={() => { setVisible(false); onDismiss && onDismiss(); }}>
            <span style={{ fontSize: 18, color: COLORS.textMuted, lineHeight: 1 }}>×</span>
          </Pressable>
        )}
      </Row>
      <div style={{ fontSize: FONTS.sm, color: COLORS.text, lineHeight: 1.6 }}>
        {renderContent(message.content)}
      </div>
    </div>
  );
}

Object.assign(window, {
  HeroLossNumber, CartCard, ActionFeedItem, AIMessagePreview, ProactiveAdvisorMessage,
});
