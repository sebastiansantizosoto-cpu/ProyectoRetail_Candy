// ─── Inventory Tab ────────────────────────────────────────────────────────────

function InventoryScreen({ router }) {
  const [products, setProducts] = React.useState(MOCK_PRODUCTS);
  const [filter, setFilter] = React.useState('all');
  const [search, setSearch] = React.useState('');

  const lowStockProducts = products.filter(p => p.stock <= p.minStock);
  const criticalProducts = products.filter(p => p.stock <= Math.floor(p.minStock / 2));
  const totalValue = products.reduce((s, p) => s + p.price * p.stock, 0);

  const filters = [
    { key: 'all', label: 'All', count: products.length },
    { key: 'low', label: '⚠️ Low Stock', count: lowStockProducts.length },
    { key: 'ok', label: '✅ OK', count: products.filter(p => p.stock > p.minStock).length },
  ];

  const filtered = products
    .filter(p => {
      if (filter === 'low') return p.stock <= p.minStock;
      if (filter === 'ok') return p.stock > p.minStock;
      return true;
    })
    .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (a.stock <= a.minStock && b.stock > b.minStock) return -1;
      if (b.stock <= b.minStock && a.stock > a.minStock) return 1;
      return a.stock - b.stock;
    });

  function getStockStatus(product) {
    const ratio = product.stock / product.minStock;
    if (product.stock === 0) return { label: 'Out of Stock', color: COLORS.red, bg: COLORS.redLight, dot: COLORS.red };
    if (product.stock <= Math.floor(product.minStock / 2)) return { label: 'Critical', color: COLORS.red, bg: COLORS.redLight, dot: COLORS.red };
    if (product.stock <= product.minStock) return { label: 'Low Stock', color: COLORS.orange, bg: COLORS.orangeLight, dot: COLORS.orange };
    return { label: 'In Stock', color: COLORS.green, bg: COLORS.greenLight, dot: COLORS.green };
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ padding: `${SPACING.lg}px ${SPACING.screen}px ${SPACING.md}px`, background: COLORS.bg }}>
        <Row style={{ justifyContent: 'space-between', marginBottom: SPACING.lg }}>
          <Col>
            <span style={{ fontSize: FONTS.xl, fontWeight: FONTS.w8, color: COLORS.text, letterSpacing: -0.5 }}>
              Inventory 📦
            </span>
            <span style={{ fontSize: FONTS.sm, color: COLORS.textLight, marginTop: 2 }}>
              {products.length} products · {formatCurrencyFull(totalValue)} value
            </span>
          </Col>
        </Row>

        {/* Alert bar */}
        {criticalProducts.length > 0 && (
          <Pressable onPress={() => setFilter('low')}>
            <div style={{
              background: COLORS.redLight,
              borderRadius: 12,
              padding: `${SPACING.md}px ${SPACING.md}px`,
              marginBottom: SPACING.md,
              border: `1px solid ${COLORS.redMid}`,
            }}>
              <Row style={{ gap: SPACING.sm }}>
                <span style={{ fontSize: 18 }}>🚨</span>
                <Col style={{ flex: 1 }}>
                  <span style={{ fontSize: FONTS.sm, fontWeight: FONTS.w7, color: COLORS.red }}>
                    {criticalProducts.length} product{criticalProducts.length > 1 ? 's' : ''} critically low
                  </span>
                  <span style={{ fontSize: FONTS.xs, color: COLORS.red, marginTop: 2 }}>
                    {criticalProducts.map(p => p.name.split(' ').slice(0, 3).join(' ')).join(', ')}
                  </span>
                </Col>
                <span style={{ fontSize: FONTS.sm, color: COLORS.red }}>→</span>
              </Row>
            </div>
          </Pressable>
        )}

        {/* Search */}
        <div style={{
          background: COLORS.bgAlt,
          borderRadius: 12, border: `1px solid ${COLORS.border}`,
          padding: `${SPACING.sm}px ${SPACING.md}px`,
          marginBottom: SPACING.md,
          display: 'flex', alignItems: 'center', gap: SPACING.sm,
        }}>
          <span style={{ fontSize: 16, color: COLORS.textMuted }}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products or brands..."
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

        {/* Filter chips */}
        <Row style={{ gap: SPACING.sm }}>
          {filters.map(f => (
            <Pressable key={f.key} onPress={() => setFilter(f.key)}>
              <div style={{
                paddingLeft: SPACING.md, paddingRight: SPACING.md,
                paddingTop: 6, paddingBottom: 6,
                borderRadius: 20,
                background: filter === f.key ? COLORS.text : COLORS.bgAlt,
                border: `1.5px solid ${filter === f.key ? COLORS.text : COLORS.border}`,
                display: 'flex', alignItems: 'center', gap: 5,
              }}>
                <span style={{ fontSize: FONTS.sm, fontWeight: FONTS.w6, color: filter === f.key ? COLORS.white : COLORS.textSub }}>
                  {f.label}
                </span>
                {f.count > 0 && (
                  <span style={{ fontSize: FONTS.xs, color: filter === f.key ? 'rgba(255,255,255,0.7)' : COLORS.textMuted }}>
                    {f.count}
                  </span>
                )}
              </div>
            </Pressable>
          ))}
        </Row>
      </div>

      {/* Product List */}
      <Screen>
        <div style={{ paddingBottom: SPACING.xxxl + 16 }}>
          {filtered.length === 0 ? (
            <EmptyState emoji="📭" title="No products found" subtitle="Try adjusting your search or filter." />
          ) : (
            filtered.map(product => {
              const status = getStockStatus(product);
              const stockPercent = Math.min(100, (product.stock / (product.minStock * 2)) * 100);
              return (
                <div
                  key={product.id}
                  style={{
                    background: COLORS.white,
                    borderBottom: `1px solid ${COLORS.borderLight}`,
                    padding: `${SPACING.md}px ${SPACING.screen}px`,
                  }}
                >
                  <Row style={{ gap: SPACING.md, alignItems: 'flex-start' }}>
                    {/* Emoji */}
                    <div style={{
                      width: 44, height: 44, borderRadius: 10,
                      background: COLORS.bgAlt,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 24, flexShrink: 0,
                    }}>
                      {product.emoji}
                    </div>
                    {/* Info */}
                    <Col style={{ flex: 1 }}>
                      <Row style={{ justifyContent: 'space-between', gap: SPACING.sm, alignItems: 'flex-start' }}>
                        <Col style={{ flex: 1 }}>
                          <span style={{ fontSize: FONTS.sm, fontWeight: FONTS.w7, color: COLORS.text, lineHeight: 1.3 }}>
                            {product.name}
                          </span>
                          <Row style={{ gap: SPACING.xs, marginTop: 2 }}>
                            <span style={{ fontSize: FONTS.xs, color: COLORS.textMuted }}>{product.brand}</span>
                            <span style={{ fontSize: FONTS.xs, color: COLORS.textMuted }}>·</span>
                            <span style={{ fontSize: FONTS.xs, color: COLORS.textMuted }}>{product.sku}</span>
                          </Row>
                        </Col>
                        <Col align="flex-end" style={{ flexShrink: 0 }}>
                          <span style={{ fontSize: FONTS.base, fontWeight: FONTS.w7, color: COLORS.text }}>
                            {formatCurrencyFull(product.price)}
                          </span>
                          <span style={{ fontSize: FONTS.xs, color: COLORS.textMuted, marginTop: 1 }}>per unit</span>
                        </Col>
                      </Row>

                      {/* Stock bar */}
                      <div style={{ marginTop: SPACING.sm }}>
                        <Row style={{ justifyContent: 'space-between', marginBottom: 4 }}>
                          <Badge label={status.label} bg={status.bg} color={status.color} dot />
                          <span style={{ fontSize: FONTS.xs, fontWeight: FONTS.w6, color: status.color }}>
                            {product.stock} / min {product.minStock} units
                          </span>
                        </Row>
                        <div style={{
                          height: 4, borderRadius: 2,
                          background: COLORS.bgAlt, overflow: 'hidden',
                        }}>
                          <div style={{
                            height: '100%',
                            width: `${stockPercent}%`,
                            borderRadius: 2,
                            background: product.stock === 0 ? COLORS.red
                              : product.stock <= Math.floor(product.minStock / 2) ? COLORS.red
                              : product.stock <= product.minStock ? COLORS.orange
                              : COLORS.green,
                            transition: 'width 0.3s ease',
                          }} />
                        </div>
                      </div>

                      {/* Reorder button */}
                      {product.stock <= product.minStock && (
                        <div style={{ marginTop: SPACING.sm }}>
                          <ReorderButton product={product} />
                        </div>
                      )}
                    </Col>
                  </Row>
                </div>
              );
            })
          )}
        </div>
      </Screen>
    </div>
  );
}

function ReorderButton({ product }) {
  const [status, setStatus] = React.useState('idle'); // idle | loading | done

  function handleReorder() {
    setStatus('loading');
    setTimeout(() => setStatus('done'), 1500);
  }

  if (status === 'done') {
    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: COLORS.green }}>
        <span style={{ fontSize: 14 }}>✅</span>
        <span style={{ fontSize: FONTS.xs, fontWeight: FONTS.w6, color: COLORS.green }}>Reorder placed</span>
      </div>
    );
  }

  return (
    <Pressable onPress={status === 'idle' ? handleReorder : undefined}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        padding: `4px ${SPACING.md}px`,
        borderRadius: 8,
        border: `1.5px solid ${COLORS.blue}`,
        background: COLORS.blueLight,
      }}>
        <span style={{ fontSize: 13 }}>{status === 'loading' ? '⏳' : '📦'}</span>
        <span style={{ fontSize: FONTS.xs, fontWeight: FONTS.w6, color: COLORS.blue }}>
          {status === 'loading' ? 'Placing order...' : 'Request Reorder'}
        </span>
      </div>
    </Pressable>
  );
}

Object.assign(window, { InventoryScreen });
