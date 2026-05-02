// ─── Recovery Tab (Hero Screen) ───────────────────────────────────────────────

function HeroScreen({ router }) {
  const metrics = MOCK_METRICS.weekly;
  const carts = MOCK_CARTS;

  const [filter, setFilter] = React.useState('all');

  const filters = [
    { key: 'all', label: 'All Carts', count: carts.length },
    { key: 'not_contacted', label: 'Not Reached', count: carts.filter(c => c.status === 'not_contacted').length },
    { key: 'recovery_sent', label: 'In Recovery', count: carts.filter(c => c.status === 'recovery_sent').length },
    { key: 'recovered', label: 'Recovered', count: carts.filter(c => c.status === 'recovered').length },
  ];

  const filtered = filter === 'all' ? carts : carts.filter(c => c.status === filter);

  function handleCartPress(cart) {
    router.push('CartDetail', { cartId: cart.id });
  }

  const pendingValue = carts.filter(c => c.status !== 'recovered').reduce((s, c) => s + c.value, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Hero Header */}
      <div style={{
        background: 'linear-gradient(160deg, #1A1A2E 0%, #2D1B4E 100%)',
        padding: `${SPACING.lg + 4}px ${SPACING.screen}px ${SPACING.xxl}px`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute', top: -40, right: -40,
          width: 180, height: 180, borderRadius: 90,
          background: 'rgba(229,62,62,0.08)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: -20, left: -20,
          width: 120, height: 120, borderRadius: 60,
          background: 'rgba(37,99,235,0.08)',
          pointerEvents: 'none',
        }} />

        {/* Store name + greeting */}
        <Row style={{ justifyContent: 'space-between', marginBottom: SPACING.xl }}>
          <Col>
            <span style={{ fontSize: FONTS.xs, color: 'rgba(255,255,255,0.5)', fontWeight: FONTS.w5, textTransform: 'uppercase', letterSpacing: 1 }}>
              {MOCK_STORE.name}
            </span>
            <span style={{ fontSize: FONTS.lg, fontWeight: FONTS.w7, color: COLORS.white, marginTop: 2 }}>
              Revenue at Risk 💸
            </span>
          </Col>
          <Pressable onPress={() => router.push('Settings')}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: 'rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18,
            }}>
              ⚙️
            </div>
          </Pressable>
        </Row>

        {/* Big hero number */}
        <HeroLossNumber
          amount={pendingValue}
          sublabel={`across ${carts.filter(c => c.status !== 'recovered').length} abandoned carts this week`}
        />

        {/* Stats row */}
        <Row style={{
          marginTop: SPACING.xl,
          background: 'rgba(255,255,255,0.07)',
          borderRadius: 16,
          padding: SPACING.md,
          gap: 0,
        }}>
          {[
            { label: 'Recovered', value: formatCurrencyFull(metrics.totalRecovered), color: COLORS.green },
            { label: 'Recovery Rate', value: metrics.recoveryRate + '%', color: COLORS.blue, trend: `+${metrics.recoveryRateTrend}%` },
            { label: 'Avg Cart', value: formatCurrencyFull(metrics.avgCartValue), color: COLORS.white },
          ].map((stat, i) => (
            <React.Fragment key={stat.label}>
              {i > 0 && <div style={{ width: 1, background: 'rgba(255,255,255,0.12)', margin: `0 ${SPACING.md}px` }} />}
              <Col align="center" style={{ flex: 1 }}>
                <span style={{ fontSize: FONTS.lg, fontWeight: FONTS.w8, color: stat.color }}>
                  {stat.value}
                </span>
                {stat.trend && (
                  <span style={{ fontSize: FONTS.xs, color: COLORS.green, fontWeight: FONTS.w6 }}>{stat.trend}</span>
                )}
                <span style={{ fontSize: FONTS.xs, color: 'rgba(255,255,255,0.5)', marginTop: 2, textAlign: 'center' }}>
                  {stat.label}
                </span>
              </Col>
            </React.Fragment>
          ))}
        </Row>
      </div>

      {/* Filter Chips */}
      <div style={{
        padding: `${SPACING.md}px ${SPACING.screen}px`,
        overflowX: 'auto',
        background: COLORS.bg,
        borderBottom: `1px solid ${COLORS.borderLight}`,
      }}>
        <Row style={{ gap: SPACING.sm, paddingBottom: 2 }}>
          {filters.map(f => (
            <Pressable key={f.key} onPress={() => setFilter(f.key)}>
              <div style={{
                paddingLeft: SPACING.md,
                paddingRight: SPACING.md,
                paddingTop: 6,
                paddingBottom: 6,
                borderRadius: 20,
                background: filter === f.key ? COLORS.text : COLORS.bgAlt,
                border: `1.5px solid ${filter === f.key ? COLORS.text : COLORS.border}`,
                whiteSpace: 'nowrap',
                display: 'flex', alignItems: 'center', gap: 5,
              }}>
                <span style={{
                  fontSize: FONTS.sm, fontWeight: FONTS.w6,
                  color: filter === f.key ? COLORS.white : COLORS.textSub,
                }}>
                  {f.label}
                </span>
                <span style={{
                  fontSize: FONTS.xs,
                  color: filter === f.key ? 'rgba(255,255,255,0.7)' : COLORS.textMuted,
                  fontWeight: FONTS.w5,
                }}>
                  {f.count}
                </span>
              </div>
            </Pressable>
          ))}
        </Row>
      </div>

      {/* Cart List */}
      <Screen>
        <div style={{ padding: `${SPACING.lg}px ${SPACING.screen}px ${SPACING.xxxl + 16}px` }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', paddingTop: 48, color: COLORS.textLight }}>
              <div style={{ fontSize: 40, marginBottom: SPACING.md }}>🎉</div>
              <div style={{ fontSize: FONTS.lg, fontWeight: FONTS.w7, color: COLORS.text }}>All carts recovered!</div>
              <div style={{ fontSize: FONTS.sm, marginTop: SPACING.sm }}>Great work, Andres.</div>
            </div>
          ) : (
            filtered.map(cart => (
              <CartCard
                key={cart.id}
                cart={cart}
                onPress={() => handleCartPress(cart)}
              />
            ))
          )}
        </div>
      </Screen>
    </div>
  );
}

Object.assign(window, { HeroScreen });
