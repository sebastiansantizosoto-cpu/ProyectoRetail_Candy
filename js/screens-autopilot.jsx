// ─── Autopilot Tab ────────────────────────────────────────────────────────────

function AutopilotScreen({ router }) {
  const [automations, setAutomations] = React.useState(MOCK_AUTOMATIONS);
  const [view, setView] = React.useState('feed'); // 'feed' | 'automations'

  const feed = MOCK_FEED_ITEMS;

  const activeCount = automations.filter(a => a.active).length;
  const totalRecovered = automations
    .filter(a => a.stats.recovered)
    .reduce((s, a) => s + (a.stats.recovered || 0), 0);

  function toggleAutomation(id) {
    setAutomations(prev =>
      prev.map(a => a.id === id ? { ...a, active: !a.active } : a)
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ padding: `${SPACING.lg}px ${SPACING.screen}px ${SPACING.md}px`, background: COLORS.bg }}>
        <Row style={{ justifyContent: 'space-between', marginBottom: SPACING.lg }}>
          <Col>
            <span style={{ fontSize: FONTS.xl, fontWeight: FONTS.w8, color: COLORS.text, letterSpacing: -0.5 }}>
              Autopilot 🤖
            </span>
            <span style={{ fontSize: FONTS.sm, color: COLORS.textLight, marginTop: 2 }}>
              {activeCount} automations running
            </span>
          </Col>
          <div style={{
            background: COLORS.greenLight,
            borderRadius: 10,
            padding: `${SPACING.sm}px ${SPACING.md}px`,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: FONTS.lg, fontWeight: FONTS.w8, color: COLORS.greenDark }}>${totalRecovered.toLocaleString()}</div>
            <div style={{ fontSize: FONTS.xs, color: COLORS.greenDark, fontWeight: FONTS.w5 }}>recovered</div>
          </div>
        </Row>

        {/* Today's quick stats */}
        <Row style={{ gap: SPACING.sm }}>
          {[
            { icon: '💬', label: 'Messages Sent', value: '5', color: COLORS.blue, bg: COLORS.blueLight },
            { icon: '💰', label: 'Orders Recovered', value: '2', color: COLORS.green, bg: COLORS.greenLight },
            { icon: '⚡', label: 'Actions Today', value: `${feed.length}`, color: COLORS.orange, bg: COLORS.orangeLight },
          ].map(stat => (
            <div key={stat.label} style={{
              flex: 1, background: stat.bg, borderRadius: 12,
              padding: `${SPACING.md}px ${SPACING.sm}px`,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 18, marginBottom: 2 }}>{stat.icon}</div>
              <div style={{ fontSize: FONTS.lg, fontWeight: FONTS.w8, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: FONTS.xs, color: stat.color, fontWeight: FONTS.w5, lineHeight: 1.3 }}>{stat.label}</div>
            </div>
          ))}
        </Row>
      </div>

      {/* View Switcher */}
      <div style={{
        padding: `0 ${SPACING.screen}px ${SPACING.md}px`,
        background: COLORS.bg,
        borderBottom: `1px solid ${COLORS.borderLight}`,
      }}>
        <Row style={{
          background: COLORS.bgAlt,
          borderRadius: 10,
          padding: 3,
          gap: 3,
        }}>
          {['feed', 'automations'].map(v => (
            <Pressable key={v} onPress={() => setView(v)} style={{ flex: 1 }}>
              <div style={{
                height: 34, borderRadius: 8,
                background: view === v ? COLORS.white : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: view === v ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.15s ease',
              }}>
                <span style={{
                  fontSize: FONTS.sm, fontWeight: FONTS.w6,
                  color: view === v ? COLORS.text : COLORS.textLight,
                }}>
                  {v === 'feed' ? '📋 Activity Feed' : '⚡ Automations'}
                </span>
              </div>
            </Pressable>
          ))}
        </Row>
      </div>

      {/* Content */}
      <Screen>
        {view === 'feed' ? (
          <div style={{ paddingBottom: SPACING.xxxl + 16 }}>
            <div style={{ padding: `${SPACING.md}px ${SPACING.screen}px ${SPACING.sm}px` }}>
              <span style={{ fontSize: FONTS.sm, fontWeight: FONTS.w6, color: COLORS.textLight, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Today
              </span>
            </div>
            {feed.map(item => (
              <ActionFeedItem
                key={item.id}
                item={item}
                onPress={() => {
                  if (item.cartId) router.push('CartDetail', { cartId: item.cartId });
                  else if (item.customerId) router.push('CustomerDetail', { customerId: item.customerId });
                  else if (item.productId) router.push('Inventory');
                }}
              />
            ))}
          </div>
        ) : (
          <div style={{ padding: `${SPACING.md}px ${SPACING.screen}px ${SPACING.xxxl + 16}px` }}>
            <div style={{ marginBottom: SPACING.md, padding: `${SPACING.md}px ${SPACING.md}px`, background: COLORS.blueLight, borderRadius: 12 }}>
              <span style={{ fontSize: FONTS.sm, color: COLORS.blue, lineHeight: 1.5 }}>
                🍬 Retail Candy runs these automations 24/7 so you can focus on what matters.
              </span>
            </div>
            {automations.map(auto => (
              <AutomationCard
                key={auto.id}
                automation={auto}
                onToggle={() => toggleAutomation(auto.id)}
                onPress={() => router.push('AutomationDetail', { automationId: auto.id })}
              />
            ))}
          </div>
        )}
      </Screen>
    </div>
  );
}

function AutomationCard({ automation, onToggle, onPress }) {
  return (
    <div style={{
      background: COLORS.card,
      borderRadius: 16,
      marginBottom: SPACING.md,
      overflow: 'hidden',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      opacity: automation.active ? 1 : 0.6,
    }}>
      <Pressable onPress={onPress}>
        <div style={{ padding: SPACING.lg }}>
          <Row style={{ gap: SPACING.md, alignItems: 'flex-start' }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: automation.active ? COLORS.blueLight : COLORS.bgAlt,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, flexShrink: 0,
            }}>
              {automation.icon}
            </div>
            <Col style={{ flex: 1 }}>
              <Row style={{ justifyContent: 'space-between' }}>
                <span style={{ fontSize: FONTS.base, fontWeight: FONTS.w7, color: COLORS.text, flex: 1, lineHeight: 1.3 }}>
                  {automation.name}
                </span>
                <div onClick={e => { e.stopPropagation(); onToggle(); }} style={{ marginLeft: SPACING.md }}>
                  <Switch value={automation.active} onChange={onToggle} />
                </div>
              </Row>
              <span style={{ fontSize: FONTS.sm, color: COLORS.textLight, marginTop: 4, lineHeight: 1.5 }}>
                {automation.description}
              </span>
              {/* Stats */}
              <Row style={{ marginTop: SPACING.md, gap: SPACING.md, flexWrap: 'wrap' }}>
                {automation.stats.recovered && (
                  <div style={{ background: COLORS.greenLight, borderRadius: 8, padding: `3px ${SPACING.sm}px` }}>
                    <span style={{ fontSize: FONTS.xs, fontWeight: FONTS.w6, color: COLORS.greenDark }}>
                      ${automation.stats.recovered} recovered
                    </span>
                  </div>
                )}
                {automation.stats.recoveryRate && (
                  <div style={{ background: COLORS.blueLight, borderRadius: 8, padding: `3px ${SPACING.sm}px` }}>
                    <span style={{ fontSize: FONTS.xs, fontWeight: FONTS.w6, color: COLORS.blue }}>
                      {automation.stats.recoveryRate}% rate
                    </span>
                  </div>
                )}
                {automation.stats.sentToday !== undefined && (
                  <div style={{ background: COLORS.bgAlt, borderRadius: 8, padding: `3px ${SPACING.sm}px` }}>
                    <span style={{ fontSize: FONTS.xs, fontWeight: FONTS.w5, color: COLORS.textLight }}>
                      {automation.stats.sentToday} sent today
                    </span>
                  </div>
                )}
                {automation.stats.sentThisWeek !== undefined && (
                  <div style={{ background: COLORS.bgAlt, borderRadius: 8, padding: `3px ${SPACING.sm}px` }}>
                    <span style={{ fontSize: FONTS.xs, fontWeight: FONTS.w5, color: COLORS.textLight }}>
                      {automation.stats.sentThisWeek} sent this week
                    </span>
                  </div>
                )}
                {automation.stats.customersTargeted !== undefined && (
                  <div style={{ background: COLORS.bgAlt, borderRadius: 8, padding: `3px ${SPACING.sm}px` }}>
                    <span style={{ fontSize: FONTS.xs, fontWeight: FONTS.w5, color: COLORS.textLight }}>
                      {automation.stats.customersTargeted} customers targeted
                    </span>
                  </div>
                )}
              </Row>
            </Col>
          </Row>
        </div>
      </Pressable>
    </div>
  );
}

Object.assign(window, { AutopilotScreen, AutomationCard });
