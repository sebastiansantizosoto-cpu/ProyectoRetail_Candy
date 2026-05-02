// ─── Secondary / Detail Screens ───────────────────────────────────────────────

// ─── CartDetailScreen ─────────────────────────────────────────────────────────
function CartDetailScreen({ router }) {
  const { cartId } = router.current.params;
  const cart = MOCK_CARTS.find(c => c.id === cartId) || MOCK_CARTS[0];
  const customer = MOCK_CUSTOMERS.find(c => c.id === cart.customerId);
  const rfm = customer ? (RFM_COLORS[customer.segment] || RFM_COLORS['New']) : null;

  const [messageSent, setMessageSent] = React.useState(cart.status === 'recovery_sent' || cart.status === 'recovered');
  const [sending, setSending] = React.useState(false);
  const [customMessage, setCustomMessage] = React.useState(cart.recoveryMessage || '');
  const [editingMessage, setEditingMessage] = React.useState(false);

  const statusConfig = {
    not_contacted: { label: 'Not Contacted', bg: COLORS.bgAlt, color: COLORS.textLight },
    recovery_sent:  { label: 'Recovery Sent', bg: COLORS.blueMid, color: COLORS.blueDark },
    recovered:      { label: '✓ Recovered', bg: COLORS.greenMid, color: COLORS.greenDark },
    expired:        { label: 'Expired', bg: COLORS.redMid, color: COLORS.red },
  };
  const st = statusConfig[cart.status];

  function handleSendRecovery() {
    setSending(true);
    setTimeout(() => { setSending(false); setMessageSent(true); }, 1500);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ScreenHeader
        title={cart.customerName}
        subtitle={`Cart abandoned ${formatRelativeTime(cart.abandonedAt)}`}
        onBack={() => router.pop()}
        right={
          <Badge label={st.label} bg={st.bg} color={st.color} />
        }
      />
      <Screen>
        <div style={{ padding: `${SPACING.lg}px ${SPACING.screen}px`, paddingBottom: SPACING.xxxl + 16 }}>

          {/* Cart value hero */}
          <div style={{
            background: cart.status === 'recovered'
              ? `linear-gradient(135deg, ${COLORS.green}, #16A34A)`
              : `linear-gradient(135deg, #E53E3E, #C53030)`,
            borderRadius: 20,
            padding: SPACING.xl,
            textAlign: 'center',
            marginBottom: SPACING.xl,
          }}>
            <div style={{ fontSize: FONTS.xxxl, fontWeight: FONTS.w9, color: COLORS.white, letterSpacing: -1.5 }}>
              {formatCurrencyFull(cart.value)}
            </div>
            <div style={{ fontSize: FONTS.sm, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>
              {cart.status === 'recovered' ? 'CART RECOVERED 🎉' : 'ABANDONED CART VALUE'}
            </div>
          </div>

          {/* Customer card */}
          {customer && (
            <Pressable onPress={() => router.push('CustomerDetail', { customerId: customer.id })}>
              <div style={{
                background: COLORS.white, borderRadius: 16,
                padding: SPACING.lg, marginBottom: SPACING.lg,
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              }}>
                <Row style={{ gap: SPACING.md }}>
                  <Avatar name={customer.name} size={44} />
                  <Col style={{ flex: 1 }}>
                    <span style={{ fontSize: FONTS.base, fontWeight: FONTS.w7, color: COLORS.text }}>{customer.name}</span>
                    <span style={{ fontSize: FONTS.sm, color: COLORS.textLight }}>{customer.email}</span>
                    {rfm && (
                      <Badge label={`${rfm.emoji} ${customer.segment}`} bg={rfm.bg} color={rfm.color} style={{ marginTop: 4, alignSelf: 'flex-start' }} />
                    )}
                  </Col>
                  <Col align="flex-end">
                    <span style={{ fontSize: FONTS.sm, fontWeight: FONTS.w7, color: COLORS.text }}>{formatCurrencyFull(customer.totalSpent)}</span>
                    <span style={{ fontSize: FONTS.xs, color: COLORS.textMuted }}>{customer.orderCount} orders</span>
                  </Col>
                </Row>
                <div style={{ marginTop: SPACING.sm, padding: `0 ${SPACING.xs}px` }}>
                  <span style={{ fontSize: FONTS.xs, color: COLORS.blue }}>View full profile →</span>
                </div>
              </div>
            </Pressable>
          )}

          {/* Cart items */}
          <div style={{
            background: COLORS.white, borderRadius: 16,
            padding: SPACING.lg, marginBottom: SPACING.lg,
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          }}>
            <span style={{ fontSize: FONTS.base, fontWeight: FONTS.w7, color: COLORS.text }}>
              Cart Items ({cart.items.length})
            </span>
            <div style={{ marginTop: SPACING.md }}>
              {cart.items.map((item, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <Divider style={{ margin: `${SPACING.sm}px 0` }} />}
                  <Row style={{ gap: SPACING.md }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 10,
                      background: COLORS.bgAlt,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 24, flexShrink: 0,
                    }}>
                      {item.image}
                    </div>
                    <Col style={{ flex: 1 }}>
                      <span style={{ fontSize: FONTS.sm, fontWeight: FONTS.w6, color: COLORS.text, lineHeight: 1.3 }}>{item.name}</span>
                      <Row style={{ gap: SPACING.sm, marginTop: 2 }}>
                        <span style={{ fontSize: FONTS.xs, color: COLORS.textMuted }}>{item.variant}</span>
                        {item.qty > 1 && <span style={{ fontSize: FONTS.xs, color: COLORS.textMuted }}>Qty: {item.qty}</span>}
                      </Row>
                    </Col>
                    <span style={{ fontSize: FONTS.base, fontWeight: FONTS.w7, color: COLORS.text, flexShrink: 0 }}>
                      {formatCurrencyFull(item.price * item.qty)}
                    </span>
                  </Row>
                </React.Fragment>
              ))}
              <Divider style={{ margin: `${SPACING.md}px 0 ${SPACING.sm}px` }} />
              <Row style={{ justifyContent: 'space-between' }}>
                <span style={{ fontSize: FONTS.base, fontWeight: FONTS.w7, color: COLORS.text }}>Total</span>
                <span style={{ fontSize: FONTS.lg, fontWeight: FONTS.w8, color: cart.status === 'recovered' ? COLORS.green : COLORS.red }}>
                  {formatCurrencyFull(cart.value)}
                </span>
              </Row>
            </div>
          </div>

          {/* Recovery Message */}
          {cart.status !== 'recovered' && (
            <div style={{
              background: COLORS.white, borderRadius: 16,
              padding: SPACING.lg, marginBottom: SPACING.lg,
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}>
              <Row style={{ justifyContent: 'space-between', marginBottom: SPACING.md }}>
                <span style={{ fontSize: FONTS.base, fontWeight: FONTS.w7, color: COLORS.text }}>Recovery Message</span>
                {!editingMessage && (
                  <Pressable onPress={() => setEditingMessage(true)}>
                    <span style={{ fontSize: FONTS.sm, color: COLORS.blue }}>Edit</span>
                  </Pressable>
                )}
              </Row>
              {editingMessage ? (
                <>
                  <textarea
                    value={customMessage}
                    onChange={e => setCustomMessage(e.target.value)}
                    rows={4}
                    style={{
                      width: '100%', resize: 'none',
                      background: COLORS.bgAlt,
                      borderRadius: 10, border: `1px solid ${COLORS.border}`,
                      padding: SPACING.md, fontSize: FONTS.sm, color: COLORS.text,
                      lineHeight: 1.6, userSelect: 'text', WebkitUserSelect: 'text',
                    }}
                  />
                  <Row style={{ gap: SPACING.sm, marginTop: SPACING.md, justifyContent: 'flex-end' }}>
                    <Button label="Cancel" variant="secondary" size="sm" onPress={() => setEditingMessage(false)} />
                    <Button label="Save" size="sm" onPress={() => setEditingMessage(false)} />
                  </Row>
                </>
              ) : (
                <div style={{
                  background: COLORS.bgAlt, borderRadius: 10,
                  padding: SPACING.md,
                }}>
                  <span style={{ fontSize: FONTS.sm, color: COLORS.textSub, lineHeight: 1.6 }}>
                    {customMessage || 'AI will generate a personalized message for this customer.'}
                  </span>
                </div>
              )}
              {/* Channel selector */}
              <Row style={{ gap: SPACING.sm, marginTop: SPACING.md }}>
                {['whatsapp', 'sms', 'email'].map(ch => (
                  <div key={ch} style={{
                    paddingLeft: SPACING.md, paddingRight: SPACING.md,
                    paddingTop: 6, paddingBottom: 6,
                    borderRadius: 20,
                    background: cart.channel === ch || (!cart.channel && ch === 'whatsapp') ? COLORS.green : COLORS.bgAlt,
                    border: `1.5px solid ${cart.channel === ch || (!cart.channel && ch === 'whatsapp') ? COLORS.green : COLORS.border}`,
                    cursor: 'pointer',
                  }}>
                    <span style={{
                      fontSize: FONTS.xs, fontWeight: FONTS.w6,
                      color: cart.channel === ch || (!cart.channel && ch === 'whatsapp') ? COLORS.white : COLORS.textSub,
                    }}>
                      {ch === 'whatsapp' ? '💬 WhatsApp' : ch === 'sms' ? '📱 SMS' : '✉️ Email'}
                    </span>
                  </div>
                ))}
              </Row>
            </div>
          )}

          {/* Action button */}
          {cart.status === 'recovered' ? (
            <div style={{
              background: COLORS.greenLight, borderRadius: 16,
              padding: SPACING.lg, textAlign: 'center',
            }}>
              <div style={{ fontSize: 32, marginBottom: SPACING.sm }}>🎉</div>
              <div style={{ fontSize: FONTS.base, fontWeight: FONTS.w7, color: COLORS.greenDark }}>Cart Recovered!</div>
              <div style={{ fontSize: FONTS.sm, color: COLORS.greenDark, marginTop: 4 }}>
                Order completed {formatRelativeTime(cart.recoveredAt)}
              </div>
            </div>
          ) : messageSent ? (
            <div style={{
              background: COLORS.blueLight, borderRadius: 16,
              padding: SPACING.lg, textAlign: 'center',
            }}>
              <div style={{ fontSize: 32, marginBottom: SPACING.sm }}>💬</div>
              <div style={{ fontSize: FONTS.base, fontWeight: FONTS.w7, color: COLORS.blue }}>Recovery Message Sent</div>
              <div style={{ fontSize: FONTS.sm, color: COLORS.blue, marginTop: 4 }}>
                Waiting for {cart.customerName} to respond...
              </div>
            </div>
          ) : (
            <Button
              label={sending ? 'Sending...' : `Send Recovery Message · ${formatCurrencyFull(cart.value)}`}
              onPress={handleSendRecovery}
              fullWidth
              size="lg"
              icon="💬"
              disabled={sending}
            />
          )}
        </div>
      </Screen>
    </div>
  );
}

// ─── CustomerDetailScreen ─────────────────────────────────────────────────────
function CustomerDetailScreen({ router }) {
  const { customerId } = router.current.params;
  const customer = MOCK_CUSTOMERS.find(c => c.id === customerId) || MOCK_CUSTOMERS[0];
  const rfm = RFM_COLORS[customer.segment] || RFM_COLORS['New'];
  const customerCarts = MOCK_CARTS.filter(c => c.customerId === customer.id);
  const [messageSent, setMessageSent] = React.useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ScreenHeader
        title={customer.name}
        subtitle={customer.location}
        onBack={() => router.pop()}
      />
      <Screen>
        <div style={{ paddingBottom: SPACING.xxxl + 16 }}>
          {/* Customer hero */}
          <div style={{
            background: rfm.bg,
            padding: `${SPACING.xl}px ${SPACING.screen}px`,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}>
            <Avatar name={customer.name} size={72} style={{ marginBottom: SPACING.md }} />
            <span style={{ fontSize: FONTS.xl, fontWeight: FONTS.w8, color: COLORS.text }}>{customer.name}</span>
            <Badge label={`${rfm.emoji} ${customer.segment}`} bg={rfm.bg} color={rfm.color} style={{ marginTop: SPACING.sm, fontSize: FONTS.sm }} />
            <span style={{ fontSize: FONTS.sm, color: COLORS.textLight, marginTop: SPACING.sm }}>{customer.email}</span>
          </div>

          {/* Stats grid */}
          <div style={{ padding: `${SPACING.lg}px ${SPACING.screen}px` }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: SPACING.sm, marginBottom: SPACING.lg }}>
              {[
                { label: 'Lifetime Value', value: formatCurrencyFull(customer.totalSpent), color: COLORS.blue },
                { label: 'Orders', value: customer.orderCount, color: COLORS.text },
                { label: 'Avg Order', value: formatCurrencyFull(customer.avgOrderValue), color: COLORS.text },
              ].map(stat => (
                <div key={stat.label} style={{
                  background: COLORS.white, borderRadius: 12,
                  padding: SPACING.md, textAlign: 'center',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                }}>
                  <div style={{ fontSize: FONTS.lg, fontWeight: FONTS.w8, color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: FONTS.xs, color: COLORS.textLight, marginTop: 2 }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Last activity */}
            <div style={{
              background: COLORS.white, borderRadius: 16,
              padding: SPACING.lg, marginBottom: SPACING.lg,
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}>
              <span style={{ fontSize: FONTS.base, fontWeight: FONTS.w7, color: COLORS.text }}>Activity</span>
              <div style={{ marginTop: SPACING.md }}>
                {[
                  { label: 'First purchase', value: new Date(customer.firstOrderDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), icon: '🌱' },
                  { label: 'Last purchase', value: formatRelativeTime(customer.lastOrderDate), icon: '🛍️' },
                  { label: 'Phone', value: customer.phone, icon: '📱' },
                ].map(row => (
                  <Row key={row.label} style={{ paddingTop: SPACING.sm, paddingBottom: SPACING.sm, borderBottom: `1px solid ${COLORS.borderLight}` }}>
                    <span style={{ fontSize: 16, width: 28 }}>{row.icon}</span>
                    <span style={{ fontSize: FONTS.sm, color: COLORS.textLight, flex: 1 }}>{row.label}</span>
                    <span style={{ fontSize: FONTS.sm, fontWeight: FONTS.w6, color: COLORS.text }}>{row.value}</span>
                  </Row>
                ))}
              </div>
            </div>

            {/* Notes */}
            {customer.notes && (
              <div style={{
                background: COLORS.orangeLight, borderRadius: 14,
                padding: SPACING.md, marginBottom: SPACING.lg,
                border: `1px solid #FDE68A`,
              }}>
                <Row style={{ gap: SPACING.sm, marginBottom: 6 }}>
                  <span>📝</span>
                  <span style={{ fontSize: FONTS.sm, fontWeight: FONTS.w6, color: '#92400E' }}>AI Note</span>
                </Row>
                <span style={{ fontSize: FONTS.sm, color: '#78350F', lineHeight: 1.5 }}>{customer.notes}</span>
              </div>
            )}

            {/* Recent carts */}
            {customerCarts.length > 0 && (
              <div style={{ marginBottom: SPACING.lg }}>
                <span style={{ fontSize: FONTS.base, fontWeight: FONTS.w7, color: COLORS.text }}>Recent Carts</span>
                {customerCarts.map(cart => (
                  <Pressable key={cart.id} onPress={() => router.push('CartDetail', { cartId: cart.id })}>
                    <Row style={{
                      marginTop: SPACING.md, background: COLORS.white,
                      borderRadius: 12, padding: SPACING.md,
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                      gap: SPACING.md,
                    }}>
                      <span style={{ fontSize: 20 }}>{cart.items[0]?.image || '🛒'}</span>
                      <Col style={{ flex: 1 }}>
                        <span style={{ fontSize: FONTS.sm, fontWeight: FONTS.w6, color: COLORS.text }}>{cart.items[0]?.name}</span>
                        <span style={{ fontSize: FONTS.xs, color: COLORS.textMuted }}>{formatRelativeTime(cart.abandonedAt)}</span>
                      </Col>
                      <span style={{ fontSize: FONTS.base, fontWeight: FONTS.w7, color: cart.status === 'recovered' ? COLORS.green : COLORS.red }}>
                        {formatCurrencyFull(cart.value)}
                      </span>
                    </Row>
                  </Pressable>
                ))}
              </div>
            )}

            {/* Tags */}
            {customer.tags && customer.tags.length > 0 && (
              <Row style={{ gap: SPACING.sm, flexWrap: 'wrap', marginBottom: SPACING.lg }}>
                {customer.tags.map(tag => (
                  <div key={tag} style={{
                    padding: `4px ${SPACING.md}px`,
                    background: COLORS.bgAlt, borderRadius: 8,
                  }}>
                    <span style={{ fontSize: FONTS.xs, color: COLORS.textSub, fontWeight: FONTS.w5 }}>{tag}</span>
                  </div>
                ))}
              </Row>
            )}

            {/* Action buttons */}
            <Col style={{ gap: SPACING.md }}>
              <Button
                label={messageSent ? "✓ Message Sent" : "Send WhatsApp"}
                icon={messageSent ? undefined : '💬'}
                onPress={() => setMessageSent(true)}
                fullWidth
                disabled={messageSent}
                style={messageSent ? { background: COLORS.green } : {}}
              />
              <Button
                label="View in Autopilot"
                icon="🤖"
                variant="secondary"
                fullWidth
                onPress={() => router.push('AutomationDetail', { automationId: 'auto_3' })}
              />
            </Col>
          </div>
        </div>
      </Screen>
    </div>
  );
}

// ─── AutomationDetailScreen ───────────────────────────────────────────────────
function AutomationDetailScreen({ router }) {
  const { automationId } = router.current.params;
  const automation = MOCK_AUTOMATIONS.find(a => a.id === automationId) || MOCK_AUTOMATIONS[0];
  const [active, setActive] = React.useState(automation.active);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ScreenHeader
        title={automation.name}
        subtitle={active ? '🟢 Active' : '⚫ Paused'}
        onBack={() => router.pop()}
        right={<Switch value={active} onChange={setActive} />}
      />
      <Screen>
        <div style={{ padding: `${SPACING.lg}px ${SPACING.screen}px`, paddingBottom: SPACING.xxxl + 16 }}>
          {/* Icon + description */}
          <div style={{
            background: COLORS.white, borderRadius: 16,
            padding: SPACING.xl, marginBottom: SPACING.lg,
            textAlign: 'center',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          }}>
            <div style={{ fontSize: 52, marginBottom: SPACING.md }}>{automation.icon}</div>
            <span style={{ fontSize: FONTS.sm, color: COLORS.textSub, lineHeight: 1.6 }}>
              {automation.description}
            </span>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: SPACING.md, marginBottom: SPACING.lg }}>
            {Object.entries(automation.stats).map(([key, val]) => (
              <div key={key} style={{
                background: COLORS.white, borderRadius: 12,
                padding: SPACING.md, textAlign: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}>
                <div style={{ fontSize: FONTS.xl, fontWeight: FONTS.w8, color: COLORS.blue }}>
                  {typeof val === 'number' && key === 'recovered' ? `$${val}` :
                   typeof val === 'number' && key.includes('Rate') ? `${val}%` : val}
                </div>
                <div style={{ fontSize: FONTS.xs, color: COLORS.textLight, marginTop: 2 }}>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}
                </div>
              </div>
            ))}
          </div>

          {/* Triggers */}
          <div style={{
            background: COLORS.white, borderRadius: 16,
            padding: SPACING.lg, marginBottom: SPACING.lg,
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          }}>
            <span style={{ fontSize: FONTS.base, fontWeight: FONTS.w7, color: COLORS.text }}>Triggers</span>
            {automation.triggers.map((t, i) => (
              <Row key={i} style={{ marginTop: SPACING.md, gap: SPACING.sm }}>
                <div style={{ width: 6, height: 6, borderRadius: 3, background: COLORS.orange, marginTop: 6 }} />
                <span style={{ fontSize: FONTS.sm, color: COLORS.textSub, flex: 1, lineHeight: 1.5 }}>{t}</span>
              </Row>
            ))}
          </div>

          {/* Actions */}
          <div style={{
            background: COLORS.white, borderRadius: 16,
            padding: SPACING.lg, marginBottom: SPACING.xl,
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          }}>
            <span style={{ fontSize: FONTS.base, fontWeight: FONTS.w7, color: COLORS.text }}>Actions</span>
            {automation.actions.map((a, i) => (
              <Row key={i} style={{ marginTop: SPACING.md, gap: SPACING.sm }}>
                <span style={{ fontSize: 16, width: 24 }}>
                  {a.includes('WhatsApp') ? '💬' : a.includes('SMS') ? '📱' : a.includes('Wait') ? '⏰' : a.includes('approve') ? '✅' : '⚡'}
                </span>
                <span style={{ fontSize: FONTS.sm, color: COLORS.textSub, flex: 1, lineHeight: 1.5 }}>{a}</span>
              </Row>
            ))}
          </div>

          <Button
            label={active ? 'Pause Automation' : 'Activate Automation'}
            onPress={() => setActive(!active)}
            variant={active ? 'secondary' : 'primary'}
            fullWidth
          />
        </div>
      </Screen>
    </div>
  );
}

// ─── SettingsScreen ───────────────────────────────────────────────────────────
function SettingsScreen({ router }) {
  const integrations = [
    { name: 'Shopify', icon: '🛍️', status: 'connected', detail: MOCK_STORE.name, color: COLORS.green },
    { name: 'WhatsApp Business', icon: '💬', status: 'connected', detail: 'via Twilio', color: COLORS.green },
    { name: 'Anthropic Claude', icon: '🤖', status: 'connected', detail: 'claude-sonnet-4', color: COLORS.green },
    { name: 'Meta Ads', icon: '📘', status: 'not_connected', detail: 'Connect to track ad spend', color: COLORS.textMuted },
    { name: 'Google Ads', icon: '🔍', status: 'not_connected', detail: 'Connect to track campaigns', color: COLORS.textMuted },
    { name: 'Google Business', icon: '⭐', status: 'not_connected', detail: 'Connect for review management', color: COLORS.textMuted },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ScreenHeader title="Settings" onBack={() => router.pop()} />
      <Screen>
        <div style={{ padding: `${SPACING.lg}px ${SPACING.screen}px`, paddingBottom: SPACING.xxxl + 16 }}>

          {/* Store info */}
          <div style={{ marginBottom: SPACING.lg }}>
            <span style={{ fontSize: FONTS.sm, fontWeight: FONTS.w6, color: COLORS.textLight, textTransform: 'uppercase', letterSpacing: 0.5 }}>Store</span>
            <div style={{
              background: COLORS.white, borderRadius: 16,
              padding: SPACING.lg, marginTop: SPACING.sm,
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}>
              <Row style={{ gap: SPACING.md }}>
                <div style={{
                  width: 50, height: 50, borderRadius: 12,
                  background: COLORS.text,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24,
                }}>
                  👟
                </div>
                <Col>
                  <span style={{ fontSize: FONTS.base, fontWeight: FONTS.w7, color: COLORS.text }}>{MOCK_STORE.fullName}</span>
                  <span style={{ fontSize: FONTS.sm, color: COLORS.textLight }}>{MOCK_STORE.owner} · {MOCK_STORE.location}</span>
                  <Badge label={`✓ ${MOCK_STORE.platform}`} bg={COLORS.greenLight} color={COLORS.greenDark} style={{ marginTop: 4, alignSelf: 'flex-start' }} />
                </Col>
              </Row>
            </div>
          </div>

          {/* Integrations */}
          <div style={{ marginBottom: SPACING.lg }}>
            <span style={{ fontSize: FONTS.sm, fontWeight: FONTS.w6, color: COLORS.textLight, textTransform: 'uppercase', letterSpacing: 0.5 }}>Integrations</span>
            <div style={{
              background: COLORS.white, borderRadius: 16,
              marginTop: SPACING.sm,
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              overflow: 'hidden',
            }}>
              {integrations.map((intg, i) => (
                <React.Fragment key={intg.name}>
                  {i > 0 && <Divider />}
                  <Row style={{ padding: SPACING.lg, gap: SPACING.md }}>
                    <span style={{ fontSize: 22, width: 32, textAlign: 'center' }}>{intg.icon}</span>
                    <Col style={{ flex: 1 }}>
                      <span style={{ fontSize: FONTS.base, fontWeight: FONTS.w6, color: COLORS.text }}>{intg.name}</span>
                      <span style={{ fontSize: FONTS.xs, color: intg.status === 'connected' ? COLORS.green : COLORS.textMuted }}>{intg.detail}</span>
                    </Col>
                    {intg.status === 'connected' ? (
                      <div style={{ width: 8, height: 8, borderRadius: 4, background: COLORS.green }} />
                    ) : (
                      <Button label="Connect" variant="secondary" size="sm" onPress={() => {}} />
                    )}
                  </Row>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Version */}
          <div style={{ textAlign: 'center', padding: SPACING.lg }}>
            <div style={{ fontSize: 28, marginBottom: SPACING.sm }}>🍬</div>
            <span style={{ fontSize: FONTS.sm, color: COLORS.textMuted }}>Retail Candy v1.0 · Sole & Soul</span>
          </div>
        </div>
      </Screen>
    </div>
  );
}

// ─── OnboardingScreen ─────────────────────────────────────────────────────────
function OnboardingScreen({ router }) {
  const [step, setStep] = React.useState(0);

  const steps = [
    {
      emoji: '🍬', title: 'Welcome to Retail Candy',
      description: 'Your AI-powered operations agent for Shopify stores. Recover lost revenue, automate workflows, and grow your business.',
      color: COLORS.blue,
    },
    {
      emoji: '💸', title: 'Recover Abandoned Carts',
      description: 'Automatically send personalized WhatsApp messages to customers who left without buying. Average recovery rate: 29%.',
      color: COLORS.red,
    },
    {
      emoji: '🤖', title: '24/7 Autopilot',
      description: 'Set up automations once. Retail Candy runs them around the clock — low stock alerts, review requests, win-back campaigns.',
      color: COLORS.purple,
    },
    {
      emoji: '🧠', title: 'AI Advisor',
      description: 'Chat with your personal business advisor. Ask anything about your store performance, customers, or inventory.',
      color: COLORS.blue,
    },
  ];

  const current = steps[step];

  if (step >= steps.length) {
    return (
      <div style={{
        height: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: SPACING.screen, background: COLORS.bg,
      }}>
        <div style={{ fontSize: 64, marginBottom: SPACING.xl }}>🎉</div>
        <span style={{ fontSize: FONTS.xxl, fontWeight: FONTS.w8, color: COLORS.text, textAlign: 'center', marginBottom: SPACING.md }}>
          Let's connect your store!
        </span>
        <span style={{ fontSize: FONTS.base, color: COLORS.textLight, textAlign: 'center', lineHeight: 1.6, marginBottom: SPACING.xxxl }}>
          Connect your Shopify store to get started. It only takes 60 seconds.
        </span>
        <Button label="Connect Shopify Store" icon="🛍️" fullWidth size="lg" onPress={() => router.push('Settings')} />
        <div style={{ marginTop: SPACING.xl }}>
          <Pressable onPress={() => router.switchTab(0)}>
            <span style={{ fontSize: FONTS.sm, color: COLORS.textLight }}>Skip for now →</span>
          </Pressable>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      background: COLORS.bg,
    }}>
      {/* Progress dots */}
      <Row style={{ padding: `${SPACING.xl}px ${SPACING.screen}px ${SPACING.md}px`, justifyContent: 'center', gap: SPACING.sm }}>
        {steps.map((_, i) => (
          <div key={i} style={{
            width: i === step ? 20 : 6,
            height: 6, borderRadius: 3,
            background: i <= step ? current.color : COLORS.border,
            transition: 'all 0.2s ease',
          }} />
        ))}
      </Row>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: SPACING.screen }}>
        <div style={{ fontSize: 80, marginBottom: SPACING.xxl }}>{current.emoji}</div>
        <span style={{ fontSize: FONTS.xxl, fontWeight: FONTS.w8, color: COLORS.text, textAlign: 'center', marginBottom: SPACING.md, lineHeight: 1.2 }}>
          {current.title}
        </span>
        <span style={{ fontSize: FONTS.base, color: COLORS.textLight, textAlign: 'center', lineHeight: 1.6 }}>
          {current.description}
        </span>
      </div>

      {/* Navigation */}
      <div style={{ padding: `${SPACING.md}px ${SPACING.screen}px ${SPACING.xl}px` }}>
        <Button
          label={step === steps.length - 1 ? "Get Started →" : "Next →"}
          onPress={() => setStep(s => s + 1)}
          fullWidth size="lg"
          style={{ background: current.color, boxShadow: `0 4px 16px ${current.color}44` }}
        />
        {step > 0 && (
          <div style={{ textAlign: 'center', marginTop: SPACING.md }}>
            <Pressable onPress={() => setStep(s => s - 1)}>
              <span style={{ fontSize: FONTS.sm, color: COLORS.textLight }}>← Back</span>
            </Pressable>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, {
  CartDetailScreen, CustomerDetailScreen,
  AutomationDetailScreen, SettingsScreen, OnboardingScreen,
});
