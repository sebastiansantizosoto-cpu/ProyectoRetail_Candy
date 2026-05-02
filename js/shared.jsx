// ─── Design Tokens ────────────────────────────────────────────────────────────
const COLORS = {
  bg:          '#FAFAF8',
  bgAlt:       '#F2F2EE',
  bgDark:      '#1A1A2E',
  text:        '#1A1A2E',
  textSub:     '#4B5563',
  textLight:   '#6B7280',
  textMuted:   '#9CA3AF',
  white:       '#FFFFFF',
  border:      '#E5E7EB',
  borderLight: '#F3F4F6',
  card:        '#FFFFFF',
  // Brand
  blue:        '#2563EB',
  blueLight:   '#EFF6FF',
  blueMid:     '#DBEAFE',
  blueDark:    '#1D4ED8',
  red:         '#E53E3E',
  redLight:    '#FFF5F5',
  redMid:      '#FED7D7',
  green:       '#22C55E',
  greenLight:  '#F0FDF4',
  greenMid:    '#DCFCE7',
  greenDark:   '#15803D',
  orange:      '#F59E0B',
  orangeLight: '#FFFBEB',
  purple:      '#7C3AED',
  purpleLight: '#EDE9FE',
  // Shadows
  shadow:      'rgba(0,0,0,0.06)',
  shadowMd:    'rgba(0,0,0,0.12)',
};

const FONTS = {
  xs:  11,
  sm:  13,
  base: 15,
  md:  16,
  lg:  18,
  xl:  22,
  xxl: 28,
  xxxl: 38,
  giant: 52,
  w4: '400',
  w5: '500',
  w6: '600',
  w7: '700',
  w8: '800',
  w9: '900',
};

const SPACING = {
  xs:  4,
  sm:  8,
  md:  12,
  lg:  16,
  xl:  20,
  xxl: 24,
  xxxl: 32,
  screen: 16,
};

const RFM_COLORS = {
  Champion:  { bg: '#DCFCE7', color: '#15803D',  emoji: '👑' },
  Loyal:     { bg: '#DBEAFE', color: '#1D4ED8',  emoji: '💙' },
  'At Risk': { bg: '#FEF3C7', color: '#92400E',  emoji: '⚠️' },
  Dormant:   { bg: '#F3F4F6', color: '#374151',  emoji: '😴' },
  Lost:      { bg: '#FEE2E2', color: '#991B1B',  emoji: '💔' },
  New:       { bg: '#F0FDF4', color: '#166534',  emoji: '🌱' },
  Promising: { bg: '#EDE9FE', color: '#5B21B6',  emoji: '⭐' },
};

// ─── Utilities ────────────────────────────────────────────────────────────────
function formatCurrency(amount) {
  if (amount >= 1000) {
    return '$' + (amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1) + 'k';
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD',
    minimumFractionDigits: 0, maximumFractionDigits: 0
  }).format(amount);
}

function formatCurrencyFull(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD',
    minimumFractionDigits: 0, maximumFractionDigits: 0
  }).format(amount);
}

function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'yesterday';
  return `${diffDays}d ago`;
}

function getInitials(name) {
  if (!name) return '?';
  return name.trim().split(/\s+/).map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function getAvatarColor(name) {
  const colors = [
    '#2563EB', '#7C3AED', '#059669', '#D97706', '#DC2626',
    '#0891B2', '#4F46E5', '#BE185D', '#065F46', '#92400E',
  ];
  let hash = 0;
  for (let i = 0; i < (name || '').length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

// ─── Atom Components ──────────────────────────────────────────────────────────
function Row({ children, style, align, justify, gap }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'row',
      alignItems: align || 'center',
      justifyContent: justify || 'flex-start',
      gap: gap,
      ...style
    }}>
      {children}
    </div>
  );
}

function Col({ children, style, align, justify }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: align || 'flex-start',
      justifyContent: justify || 'flex-start',
      ...style
    }}>
      {children}
    </div>
  );
}

function Spacer({ h, w }) {
  return <div style={{ flex: (!h && !w) ? 1 : undefined, height: h, width: w, flexShrink: 0 }} />;
}

function Divider({ style }) {
  return <div style={{ height: 1, background: COLORS.border, ...style }} />;
}

function Avatar({ name, size, bgColor, textColor, style }) {
  const s = size || 40;
  const bg = bgColor || getAvatarColor(name);
  return (
    <div style={{
      width: s, height: s, borderRadius: s / 2,
      background: bg, flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      ...style
    }}>
      <span style={{
        fontSize: Math.round(s * 0.38),
        fontWeight: FONTS.w7,
        color: textColor || COLORS.white,
        lineHeight: 1,
      }}>
        {getInitials(name)}
      </span>
    </div>
  );
}

function Badge({ label, bg, color, style, dot }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      paddingLeft: 8, paddingRight: 8, paddingTop: 3, paddingBottom: 3,
      borderRadius: 20,
      fontSize: FONTS.xs, fontWeight: FONTS.w6, letterSpacing: 0.2,
      background: bg || COLORS.blueLight,
      color: color || COLORS.blue,
      whiteSpace: 'nowrap',
      ...style
    }}>
      {dot && <span style={{ width: 5, height: 5, borderRadius: 3, background: color || COLORS.blue, flexShrink: 0 }} />}
      {label}
    </span>
  );
}

function Card({ children, style, onPress, padding }) {
  const [pressed, setPressed] = React.useState(false);
  const p = padding !== undefined ? padding : SPACING.lg;
  const base = {
    background: COLORS.card,
    borderRadius: 16,
    padding: p,
    boxShadow: `0 1px 3px ${COLORS.shadow}, 0 1px 8px ${COLORS.shadow}`,
  };
  if (onPress) {
    return (
      <div
        onClick={onPress}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
        onTouchStart={() => setPressed(true)}
        onTouchEnd={() => setPressed(false)}
        style={{
          ...base,
          cursor: 'pointer',
          transform: pressed ? 'scale(0.985)' : 'scale(1)',
          transition: 'transform 0.12s ease',
          ...style,
        }}
      >
        {children}
      </div>
    );
  }
  return <div style={{ ...base, ...style }}>{children}</div>;
}

function Pressable({ children, onPress, style }) {
  const [pressed, setPressed] = React.useState(false);
  return (
    <div
      onClick={onPress}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      style={{
        cursor: 'pointer',
        opacity: pressed ? 0.65 : 1,
        transform: pressed ? 'scale(0.97)' : 'scale(1)',
        transition: 'opacity 0.12s ease, transform 0.12s ease',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Button({ label, onPress, variant, size, icon, fullWidth, disabled, style }) {
  const [pressed, setPressed] = React.useState(false);
  const isPrimary = !variant || variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isGhost = variant === 'ghost';
  const isDestructive = variant === 'danger';
  const isSuccess = variant === 'success';

  const bg = isPrimary ? COLORS.blue
    : isDestructive ? COLORS.red
    : isSuccess ? COLORS.green
    : isSecondary ? COLORS.white
    : 'transparent';
  const fg = (isPrimary || isDestructive || isSuccess) ? COLORS.white
    : isSecondary ? COLORS.text
    : COLORS.blue;

  const h = size === 'sm' ? 34 : size === 'lg' ? 52 : 44;
  const px = size === 'sm' ? 14 : size === 'lg' ? 28 : 20;
  const fs = size === 'sm' ? FONTS.sm : size === 'lg' ? FONTS.md : FONTS.base;

  return (
    <div
      onClick={disabled ? undefined : onPress}
      onMouseDown={() => !disabled && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => !disabled && setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        background: bg, color: fg,
        border: isSecondary ? `1.5px solid ${COLORS.border}` : 'none',
        borderRadius: 12, height: h,
        paddingLeft: px, paddingRight: px,
        fontSize: fs, fontWeight: FONTS.w6,
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.45 : pressed ? 0.82 : 1,
        transform: pressed && !disabled ? 'scale(0.96)' : 'scale(1)',
        transition: 'all 0.12s ease',
        width: fullWidth ? '100%' : undefined,
        userSelect: 'none',
        flexShrink: 0,
        boxShadow: isPrimary && !disabled ? '0 2px 10px rgba(37,99,235,0.28)' : 'none',
        ...style,
      }}
    >
      {icon && <span style={{ fontSize: fs + 2, lineHeight: 1 }}>{icon}</span>}
      {label}
    </div>
  );
}

function SectionHeader({ title, right, style }) {
  return (
    <Row style={{ marginBottom: SPACING.md, ...style }}>
      <span style={{ fontSize: FONTS.md, fontWeight: FONTS.w7, color: COLORS.text, flex: 1 }}>
        {title}
      </span>
      {right}
    </Row>
  );
}

function ScreenHeader({ title, subtitle, onBack, right, style }) {
  return (
    <div style={{
      padding: `12px ${SPACING.screen}px 10px`,
      background: COLORS.bg,
      borderBottom: `1px solid ${COLORS.borderLight}`,
      ...style
    }}>
      {onBack && (
        <Pressable onPress={onBack} style={{ marginBottom: 6, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: FONTS.base, color: COLORS.blue, fontWeight: FONTS.w5 }}>← Back</span>
        </Pressable>
      )}
      <Row>
        <Col style={{ flex: 1 }}>
          <span style={{ fontSize: FONTS.xl, fontWeight: FONTS.w8, color: COLORS.text, letterSpacing: -0.5 }}>
            {title}
          </span>
          {subtitle && (
            <span style={{ fontSize: FONTS.sm, color: COLORS.textLight, marginTop: 2 }}>{subtitle}</span>
          )}
        </Col>
        {right}
      </Row>
    </div>
  );
}

function Screen({ children, style }) {
  return (
    <div style={{
      flex: 1, background: COLORS.bg,
      overflowY: 'auto', WebkitOverflowScrolling: 'touch',
      ...style
    }}>
      {children}
    </div>
  );
}

function EmptyState({ emoji, title, subtitle, action, actionLabel }) {
  return (
    <Col align="center" style={{ padding: SPACING.xxxl, paddingTop: 56 }}>
      <span style={{ fontSize: 52, marginBottom: SPACING.lg }}>{emoji || '📭'}</span>
      <span style={{ fontSize: FONTS.lg, fontWeight: FONTS.w7, color: COLORS.text, textAlign: 'center', marginBottom: SPACING.sm }}>
        {title}
      </span>
      {subtitle && (
        <span style={{ fontSize: FONTS.base, color: COLORS.textLight, textAlign: 'center', lineHeight: 1.6, marginBottom: SPACING.xl }}>
          {subtitle}
        </span>
      )}
      {action && <Button label={actionLabel || 'Get Started'} onPress={action} />}
    </Col>
  );
}

function Tag({ label, style }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      paddingLeft: 8, paddingRight: 8, paddingTop: 2, paddingBottom: 2,
      borderRadius: 6,
      fontSize: FONTS.xs, fontWeight: FONTS.w5,
      background: COLORS.bgAlt, color: COLORS.textLight,
      ...style
    }}>
      {label}
    </span>
  );
}

function StatusDot({ color, size }) {
  const s = size || 8;
  return (
    <div style={{
      width: s, height: s, borderRadius: s / 2,
      background: color || COLORS.green,
      flexShrink: 0,
    }} />
  );
}

function Switch({ value, onChange }) {
  return (
    <div
      onClick={() => onChange(!value)}
      style={{
        width: 44, height: 26, borderRadius: 13,
        background: value ? COLORS.blue : COLORS.border,
        position: 'relative', cursor: 'pointer',
        transition: 'background 0.2s ease',
        flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute',
        top: 3, left: value ? 21 : 3,
        width: 20, height: 20, borderRadius: 10,
        background: COLORS.white,
        boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
        transition: 'left 0.2s ease',
      }} />
    </div>
  );
}

Object.assign(window, {
  COLORS, FONTS, SPACING, RFM_COLORS,
  formatCurrency, formatCurrencyFull, formatRelativeTime, getInitials, getAvatarColor,
  Row, Col, Spacer, Divider, Avatar, Badge, Card, Pressable, Button,
  SectionHeader, ScreenHeader, Screen, EmptyState, Tag, StatusDot, Switch,
});
