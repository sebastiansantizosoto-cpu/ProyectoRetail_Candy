// ─── Customers Tab ────────────────────────────────────────────────────────────

function CustomersScreen({ router }) {
  const [segment, setSegment] = React.useState('all');
  const [search, setSearch] = React.useState('');

  const segments = [
    { key: 'all', label: 'All' },
    { key: 'Champion', label: '👑 Champions' },
    { key: 'Loyal', label: '💙 Loyal' },
    { key: 'At Risk', label: '⚠️ At Risk' },
    { key: 'Dormant', label: '😴 Dormant' },
    { key: 'Lost', label: '💔 Lost' },
    { key: 'New', label: '🌱 New' },
    { key: 'Promising', label: '⭐ Promising' },
  ];

  const filtered = MOCK_CUSTOMERS
    .filter(c => segment === 'all' || c.segment === segment)
    .filter(c => !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase())
    );

  const segmentCounts = {};
  MOCK_CUSTOMERS.forEach(c => {
    segmentCounts[c.segment] = (segmentCounts[c.segment] || 0) + 1;
  });

  const totalRevenue = MOCK_CUSTOMERS.reduce((s, c) => s + c.totalSpent, 0);
  const atRiskCount = MOCK_CUSTOMERS.filter(c => c.segment === 'At Risk' || c.segment === 'Dormant' || c.segment === 'Lost').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ padding: `${SPACING.lg}px ${SPACING.screen}px ${SPACING.md}px`, background: COLORS.bg }}>
        <Row style={{ justifyContent: 'space-between', marginBottom: SPACING.lg }}>
          <Col>
            <span style={{ fontSize: FONTS.xl, fontWeight: FONTS.w8, color: COLORS.text, letterSpacing: -0.5 }}>
              Customers 👥
            </span>
            <span style={{ fontSize: FONTS.sm, color: COLORS.textLight, marginTop: 2 }}>
              {MOCK_CUSTOMERS.length} total · {formatCurrencyFull(totalRevenue)} LTV
            </span>
          </Col>
        </Row>

        {/* RFM summary row */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: SPACING.sm, marginBottom: SPACING.md,
        }}>
          {[
            { label: 'Champions', count: segmentCounts['Champion'] || 0, ...RFM_COLORS['Champion'] },
            { label: 'At Risk', count: segmentCounts['At Risk'] || 0, ...RFM_COLORS['At Risk'] },
            { label: 'New', count: (segmentCounts['New'] || 0) + (segmentCounts['Promising'] || 0), ...RFM_COLORS['New'] },
          ].map(stat => (
            <Pressable key={stat.label} onPress={() => setSegment(
              stat.label === 'Champions' ? 'Champion' :
              stat.label === 'At Risk' ? 'At Risk' : 'New'
            )}>
              <div style={{
                background: stat.bg, borderRadius: 12,
                padding: `${SPACING.sm}px ${SPACING.md}px`,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: FONTS.xl, fontWeight: FONTS.w8, color: stat.color }}>{stat.count}</div>
                <div style={{ fontSize: FONTS.xs, color: stat.color, fontWeight: FONTS.w5 }}>{stat.label}</div>
              </div>
            </Pressable>
          ))}
        </div>

        {/* Alert for at-risk customers */}
        {atRiskCount > 0 && (
          <div style={{
            background: COLORS.orangeLight,
            borderRadius: 12,
            padding: `${SPACING.md}px`,
            marginBottom: SPACING.md,
            border: `1px solid #FDE68A`,
          }}>
            <Row style={{ gap: SPACING.sm }}>
              <span style={{ fontSize: 16 }}>⚠️</span>
              <span style={{ fontSize: FONTS.sm, color: '#92400E', flex: 1, lineHeight: 1.4 }}>
                <strong>{atRiskCount} customers</strong> at risk of churning — consider a personal outreach
              </span>
            </Row>
          </div>
        )}

        {/* Search */}
        <div style={{
          background: COLORS.bgAlt, borderRadius: 12,
          border: `1px solid ${COLORS.border}`,
          padding: `${SPACING.sm}px ${SPACING.md}px`,
          display: 'flex', alignItems: 'center', gap: SPACING.sm,
        }}>
          <span style={{ fontSize: 16, color: COLORS.textMuted }}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search customers..."
            style={{
              flex: 1, fontSize: FONTS.sm, color: COLORS.text, background: 'none',
              userSelect: 'text', WebkitUserSelect: 'text',
            }}
          />
          {search && (
            <Pressable onPress={() => setSearch('')}>
              <span style={{ fontSize: 16, color: COLORS.textMuted }}>×</span>
            </Pressable>
          )}
        </div>
      </div>

      {/* Segment filter chips */}
      <div style={{
        overflowX: 'auto',
        background: COLORS.bg,
        borderBottom: `1px solid ${COLORS.borderLight}`,
        padding: `${SPACING.sm}px 0`,
      }}>
        <Row style={{ gap: SPACING.sm, padding: `0 ${SPACING.screen}px`, paddingBottom: 4 }}>
          {segments.map(s => {
            const count = s.key === 'all' ? MOCK_CUSTOMERS.length : (segmentCounts[s.key] || 0);
            const rfmColor = s.key !== 'all' ? RFM_COLORS[s.key] : null;
            return (
              <Pressable key={s.key} onPress={() => setSegment(s.key)}>
                <div style={{
                  paddingLeft: SPACING.md, paddingRight: SPACING.md,
                  paddingTop: 6, paddingBottom: 6,
                  borderRadius: 20,
                  background: segment === s.key
                    ? (rfmColor ? rfmColor.bg : COLORS.text)
                    : COLORS.bgAlt,
                  border: `1.5px solid ${segment === s.key
                    ? (rfmColor ? rfmColor.color : COLORS.text)
                    : COLORS.border}`,
                  whiteSpace: 'nowrap',
                  display: 'flex', alignItems: 'center', gap: 5,
                }}>
                  <span style={{
                    fontSize: FONTS.sm, fontWeight: FONTS.w6,
                    color: segment === s.key
                      ? (rfmColor ? rfmColor.color : COLORS.white)
                      : COLORS.textSub,
                  }}>
                    {s.label}
                  </span>
                  {count > 0 && (
                    <span style={{
                      fontSize: FONTS.xs,
                      color: segment === s.key ? (rfmColor ? rfmColor.color : 'rgba(255,255,255,0.7)') : COLORS.textMuted,
                    }}>
                      {count}
                    </span>
                  )}
                </div>
              </Pressable>
            );
          })}
        </Row>
      </div>

      {/* Customer List */}
      <Screen>
        <div style={{ paddingBottom: SPACING.xxxl + 16 }}>
          {filtered.length === 0 ? (
            <EmptyState emoji="👤" title="No customers found" subtitle="Try a different search or segment." />
          ) : (
            filtered.map(customer => (
              <CustomerRow
                key={customer.id}
                customer={customer}
                onPress={() => router.push('CustomerDetail', { customerId: customer.id })}
              />
            ))
          )}
        </div>
      </Screen>
    </div>
  );
}

function CustomerRow({ customer, onPress }) {
  const rfm = RFM_COLORS[customer.segment] || RFM_COLORS['New'];

  return (
    <Pressable onPress={onPress}>
      <div style={{
        padding: `${SPACING.md}px ${SPACING.screen}px`,
        borderBottom: `1px solid ${COLORS.borderLight}`,
        background: COLORS.white,
      }}>
        <Row style={{ gap: SPACING.md }}>
          <Avatar name={customer.name} size={46} />
          <Col style={{ flex: 1, gap: 3 }}>
            <Row style={{ justifyContent: 'space-between', gap: SPACING.sm }}>
              <span style={{ fontSize: FONTS.base, fontWeight: FONTS.w7, color: COLORS.text }}>
                {customer.name}
              </span>
              <span style={{ fontSize: FONTS.base, fontWeight: FONTS.w7, color: COLORS.text, flexShrink: 0 }}>
                {formatCurrencyFull(customer.totalSpent)}
              </span>
            </Row>
            <Row style={{ gap: SPACING.sm }}>
              <Badge
                label={`${rfm.emoji} ${customer.segment}`}
                bg={rfm.bg}
                color={rfm.color}
              />
              <span style={{ fontSize: FONTS.xs, color: COLORS.textMuted }}>
                {customer.orderCount} orders
              </span>
            </Row>
            <Row style={{ gap: SPACING.sm, marginTop: 2 }}>
              <span style={{ fontSize: FONTS.xs, color: COLORS.textMuted }}>
                📍 {customer.location}
              </span>
              <span style={{ fontSize: FONTS.xs, color: COLORS.textMuted }}>·</span>
              <span style={{ fontSize: FONTS.xs, color: COLORS.textMuted }}>
                Last order {formatRelativeTime(customer.lastOrderDate)}
              </span>
            </Row>
          </Col>
          <span style={{ fontSize: 16, color: COLORS.textMuted, flexShrink: 0 }}>›</span>
        </Row>
      </div>
    </Pressable>
  );
}

Object.assign(window, { CustomersScreen });
