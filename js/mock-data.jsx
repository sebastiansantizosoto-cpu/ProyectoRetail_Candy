// ─── Mock Store ───────────────────────────────────────────────────────────────
const MOCK_STORE = {
  id: 'store_1',
  name: 'Sole & Soul',
  fullName: 'Sole & Soul Sneakers',
  owner: 'Andres Vargas',
  email: 'andres@soleandsoul.com',
  location: 'Miami, FL',
  platform: 'Shopify',
  currency: 'USD',
  monthlyRevenue: 45200,
  connectedAt: '2024-09-15',
  logo: null,
};

// ─── Abandoned Carts ──────────────────────────────────────────────────────────
const now = new Date();
function hoursAgo(h) { return new Date(now - h * 3600000).toISOString(); }
function minsAgo(m)  { return new Date(now - m * 60000).toISOString(); }

const MOCK_CARTS = [
  {
    id: 'cart_1',
    customerId: 'cust_6',
    customerName: 'Carlos Rivera',
    customerEmail: 'carlos.r@gmail.com',
    value: 420,
    items: [
      { name: 'Air Jordan 4 Retro "Military Blue"', variant: 'Size 10', qty: 1, price: 420, image: '👟' }
    ],
    status: 'recovery_sent',
    recoveryMessage: '🔥 Carlos! Your Air Jordan 4s are selling fast — 3 left in your size. Your 10% off code: COME BACK10 expires tonight.',
    abandonedAt: hoursAgo(0.5),
    lastActivityAt: minsAgo(30),
    channel: 'whatsapp',
    recoveryRate: null,
  },
  {
    id: 'cart_2',
    customerId: 'cust_2',
    customerName: 'James Williams',
    customerEmail: 'james.w@icloud.com',
    value: 325,
    items: [
      { name: 'Jordan 1 Retro High OG "Chicago"', variant: 'Size 11', qty: 1, price: 325, image: '🥿' }
    ],
    status: 'not_contacted',
    recoveryMessage: null,
    abandonedAt: hoursAgo(4),
    lastActivityAt: hoursAgo(4),
    channel: null,
    recoveryRate: null,
  },
  {
    id: 'cart_3',
    customerId: 'cust_1',
    customerName: 'Maria Rodriguez',
    customerEmail: 'maria.r@gmail.com',
    value: 280,
    items: [
      { name: 'Nike Air Max 270', variant: 'Size 8 / White', qty: 1, price: 145, image: '👟' },
      { name: 'Nike Everyday Cushioned Socks (3-Pack)', variant: 'M/L', qty: 1, price: 18, image: '🧦' },
      { name: 'Nike Dri-FIT Running Cap', variant: 'One Size', qty: 1, price: 38, image: '🧢' },
      { name: 'Nike Insoles Pro', variant: 'Size 8', qty: 1, price: 79, image: '🦶' },
    ],
    status: 'recovery_sent',
    recoveryMessage: 'Hey Maria! 👋 You left some great picks behind. Your Nike Air Max 270s are almost sold out in your size! Complete your order and save 10% — code: MARIA10',
    abandonedAt: hoursAgo(2),
    lastActivityAt: hoursAgo(1.5),
    channel: 'whatsapp',
    recoveryRate: null,
  },
  {
    id: 'cart_4',
    customerId: 'cust_4',
    customerName: 'Daniel Lee',
    customerEmail: 'daniel.lee@outlook.com',
    value: 220,
    items: [
      { name: 'Nike Dunk Low "Panda"', variant: 'Size 9.5', qty: 2, price: 110, image: '👟' }
    ],
    status: 'recovery_sent',
    recoveryMessage: 'Daniel, those Panda Dunks are 🔥 right now! Only 2 pairs left in your size. Grab both and save $20 with code DUNK20.',
    abandonedAt: hoursAgo(1),
    lastActivityAt: minsAgo(45),
    channel: 'sms',
    recoveryRate: null,
  },
  {
    id: 'cart_5',
    customerId: 'cust_7',
    customerName: 'Ashley Thompson',
    customerEmail: 'ashley.t@yahoo.com',
    value: 225,
    items: [
      { name: 'Converse Chuck Taylor All Star OX', variant: 'Size 7 / Black', qty: 3, price: 75, image: '👟' }
    ],
    status: 'not_contacted',
    recoveryMessage: null,
    abandonedAt: hoursAgo(3),
    lastActivityAt: hoursAgo(3),
    channel: null,
    recoveryRate: null,
  },
  {
    id: 'cart_6',
    customerId: 'cust_5',
    customerName: 'Priya Patel',
    customerEmail: 'priya.p@gmail.com',
    value: 185,
    items: [
      { name: 'New Balance 550', variant: 'Size 7.5 / White-Green', qty: 1, price: 90, image: '🥿' },
      { name: 'NB Team Bucket Hat', variant: 'One Size', qty: 1, price: 35, image: '🧢' },
      { name: 'NB Premium Crew Socks', variant: 'S/M', qty: 2, price: 15, image: '🧦' },
      { name: 'NB Shoe Cleaner Kit', variant: 'Universal', qty: 1, price: 30, image: '🧴' },
    ],
    status: 'not_contacted',
    recoveryMessage: null,
    abandonedAt: hoursAgo(6),
    lastActivityAt: hoursAgo(6),
    channel: null,
    recoveryRate: null,
  },
  {
    id: 'cart_7',
    customerId: 'cust_3',
    customerName: 'Sofia Martinez',
    customerEmail: 'sofia.m@gmail.com',
    value: 201,
    items: [
      { name: 'Adidas Ultraboost 22', variant: 'Size 8.5 / Core Black', qty: 1, price: 189, image: '👟' },
      { name: 'Adidas Running Socks', variant: 'M', qty: 1, price: 12, image: '🧦' },
    ],
    status: 'recovered',
    recoveryMessage: 'Sofia! Your cart is still waiting 🌟 Complete your Ultraboost 22 order — free shipping today only.',
    abandonedAt: hoursAgo(28),
    lastActivityAt: hoursAgo(26),
    channel: 'whatsapp',
    recoveredAt: hoursAgo(26),
    recoveryRate: 201,
  },
  {
    id: 'cart_8',
    customerId: 'cust_8',
    customerName: 'Michael Brown',
    customerEmail: 'michael.b@gmail.com',
    value: 484,
    items: [
      { name: 'Nike Air Force 1 "07"', variant: 'Size 11 / White', qty: 1, price: 90, image: '👟' },
      { name: 'Adidas Stan Smith', variant: 'Size 11 / White-Green', qty: 1, price: 95, image: '🥿' },
      { name: 'Nike Tech Fleece Hoodie', variant: 'L / Black', qty: 1, price: 130, image: '👕' },
      { name: 'Nike Sport Bag', variant: 'Black', qty: 1, price: 75, image: '👜' },
      { name: 'Adidas Cap', variant: 'One Size', qty: 1, price: 35, image: '🧢' },
      { name: 'Mixed Socks Pack 6-Pack', variant: 'L/XL', qty: 1, price: 59, image: '🧦' },
    ],
    status: 'recovered',
    recoveryMessage: 'Michael! Great taste — your cart has $484 worth of heat 🔥 Complete it now and get free shipping + $20 off over $400.',
    abandonedAt: hoursAgo(22),
    lastActivityAt: hoursAgo(20),
    channel: 'whatsapp',
    recoveredAt: hoursAgo(20),
    recoveryRate: 484,
  },
];

// ─── Customers ────────────────────────────────────────────────────────────────
const MOCK_CUSTOMERS = [
  {
    id: 'cust_1', name: 'Maria Rodriguez', email: 'maria.r@gmail.com', phone: '+1-305-555-0101',
    segment: 'Champion', totalSpent: 3840, orderCount: 14, avgOrderValue: 274,
    lastOrderDate: hoursAgo(72), firstOrderDate: '2023-03-12',
    tags: ['VIP', 'Sneakerhead'], location: 'Miami, FL',
    notes: 'Loves Nike and Jordan. Usually shops during drop releases.',
  },
  {
    id: 'cust_2', name: 'James Williams', email: 'james.w@icloud.com', phone: '+1-305-555-0202',
    segment: 'Loyal', totalSpent: 2150, orderCount: 8, avgOrderValue: 269,
    lastOrderDate: hoursAgo(240), firstOrderDate: '2023-07-18',
    tags: ['Jordan Fan'], location: 'Fort Lauderdale, FL',
    notes: 'Mostly buys Jordans and limited releases.',
  },
  {
    id: 'cust_3', name: 'Sofia Martinez', email: 'sofia.m@gmail.com', phone: '+1-786-555-0303',
    segment: 'Loyal', totalSpent: 1890, orderCount: 9, avgOrderValue: 210,
    lastOrderDate: hoursAgo(26), firstOrderDate: '2023-08-05',
    tags: ['Running', 'Adidas Fan'], location: 'Miami, FL',
    notes: 'Prefers running shoes and performance gear.',
  },
  {
    id: 'cust_4', name: 'Daniel Lee', email: 'daniel.lee@outlook.com', phone: '+1-305-555-0404',
    segment: 'Promising', totalSpent: 660, orderCount: 3, avgOrderValue: 220,
    lastOrderDate: hoursAgo(168), firstOrderDate: '2024-01-20',
    tags: ['Nike Fan', 'New-ish'], location: 'Coral Gables, FL',
    notes: null,
  },
  {
    id: 'cust_5', name: 'Priya Patel', email: 'priya.p@gmail.com', phone: '+1-954-555-0505',
    segment: 'New', totalSpent: 185, orderCount: 1, avgOrderValue: 185,
    lastOrderDate: hoursAgo(6), firstOrderDate: hoursAgo(6),
    tags: ['First Order Potential'], location: 'Brickell, FL',
    notes: null,
  },
  {
    id: 'cust_6', name: 'Carlos Rivera', email: 'carlos.r@gmail.com', phone: '+1-305-555-0606',
    segment: 'At Risk', totalSpent: 2760, orderCount: 11, avgOrderValue: 251,
    lastOrderDate: hoursAgo(720), firstOrderDate: '2022-11-30',
    tags: ['VIP', 'Lapsed'], location: 'Hialeah, FL',
    notes: 'Was a top buyer, gone quiet for ~30 days. High re-engagement potential.',
  },
  {
    id: 'cust_7', name: 'Ashley Thompson', email: 'ashley.t@yahoo.com', phone: '+1-305-555-0707',
    segment: 'Dormant', totalSpent: 890, orderCount: 4, avgOrderValue: 222,
    lastOrderDate: hoursAgo(2160), firstOrderDate: '2023-04-10',
    tags: ['Converse Fan'], location: 'Doral, FL',
    notes: null,
  },
  {
    id: 'cust_8', name: 'Michael Brown', email: 'michael.b@gmail.com', phone: '+1-786-555-0808',
    segment: 'Champion', totalSpent: 4120, orderCount: 16, avgOrderValue: 258,
    lastOrderDate: hoursAgo(20), firstOrderDate: '2022-09-14',
    tags: ['VIP', 'Sneakerhead', 'Big Cart'], location: 'Miami Beach, FL',
    notes: 'Buys full outfits not just shoes. Big average cart.',
  },
  {
    id: 'cust_9', name: 'Yolanda Cruz', email: 'yolanda.c@hotmail.com', phone: '+1-305-555-0909',
    segment: 'Lost', totalSpent: 450, orderCount: 2, avgOrderValue: 225,
    lastOrderDate: hoursAgo(4320), firstOrderDate: '2023-01-22',
    tags: [], location: 'Kendall, FL',
    notes: null,
  },
  {
    id: 'cust_10', name: 'Jordan Kim', email: 'jordan.k@gmail.com', phone: '+1-786-555-1010',
    segment: 'New', totalSpent: 95, orderCount: 1, avgOrderValue: 95,
    lastOrderDate: hoursAgo(48), firstOrderDate: hoursAgo(48),
    tags: ['New Customer'], location: 'Wynwood, FL',
    notes: null,
  },
];

// ─── Products ─────────────────────────────────────────────────────────────────
const MOCK_PRODUCTS = [
  { id: 'prod_1',  name: 'Nike Air Max 270',              category: 'Running',    brand: 'Nike',    price: 145, stock: 3,  minStock: 5,  reorderPoint: 5,  emoji: '👟', sku: 'NK-AM270-WHT' },
  { id: 'prod_2',  name: 'Jordan 1 Retro High OG "Chicago"', category: 'Lifestyle', brand: 'Jordan',  price: 325, stock: 1,  minStock: 3,  reorderPoint: 3,  emoji: '🥿', sku: 'JD-1RH-CHI' },
  { id: 'prod_3',  name: 'Adidas Ultraboost 22',           category: 'Running',    brand: 'Adidas',  price: 189, stock: 8,  minStock: 6,  reorderPoint: 6,  emoji: '👟', sku: 'AD-UB22-BLK' },
  { id: 'prod_4',  name: 'Nike Dunk Low "Panda"',           category: 'Lifestyle',  brand: 'Nike',    price: 110, stock: 2,  minStock: 5,  reorderPoint: 5,  emoji: '👟', sku: 'NK-DL-PDA' },
  { id: 'prod_5',  name: 'New Balance 550',                 category: 'Lifestyle',  brand: 'NB',      price: 90,  stock: 12, minStock: 6,  reorderPoint: 6,  emoji: '🥿', sku: 'NB-550-WHG' },
  { id: 'prod_6',  name: 'Converse Chuck Taylor All Star',  category: 'Lifestyle',  brand: 'Converse', price: 75, stock: 20, minStock: 8,  reorderPoint: 8,  emoji: '👟', sku: 'CV-CT-BLK' },
  { id: 'prod_7',  name: 'Air Jordan 4 Retro "Mil. Blue"',  category: 'Lifestyle',  brand: 'Jordan',  price: 420, stock: 2,  minStock: 4,  reorderPoint: 4,  emoji: '🥿', sku: 'JD-4R-MLB' },
  { id: 'prod_8',  name: 'Nike Air Force 1 "07"',           category: 'Lifestyle',  brand: 'Nike',    price: 90,  stock: 14, minStock: 8,  reorderPoint: 8,  emoji: '👟', sku: 'NK-AF1-WHT' },
  { id: 'prod_9',  name: 'Adidas Stan Smith',               category: 'Lifestyle',  brand: 'Adidas',  price: 95,  stock: 9,  minStock: 6,  reorderPoint: 6,  emoji: '🥿', sku: 'AD-SS-WHG' },
  { id: 'prod_10', name: 'Nike Tech Fleece Hoodie',         category: 'Apparel',    brand: 'Nike',    price: 130, stock: 4,  minStock: 5,  reorderPoint: 5,  emoji: '👕', sku: 'NK-TFH-BLK' },
  { id: 'prod_11', name: 'Nike Everyday Cushioned Socks',   category: 'Accessories', brand: 'Nike',   price: 18,  stock: 45, minStock: 20, reorderPoint: 20, emoji: '🧦', sku: 'NK-ECS-MLG' },
  { id: 'prod_12', name: 'New Balance Sport Cap',           category: 'Accessories', brand: 'NB',     price: 35,  stock: 6,  minStock: 5,  reorderPoint: 5,  emoji: '🧢', sku: 'NB-SC-BLK' },
];

// ─── Autopilot Feed Items ─────────────────────────────────────────────────────
const MOCK_FEED_ITEMS = [
  {
    id: 'feed_1', type: 'recovery_sent', automationName: 'Abandoned Cart Recovery',
    description: 'WhatsApp recovery message sent to Carlos Rivera for Air Jordan 4 cart ($420)',
    result: null, timestamp: minsAgo(30), icon: '💬', color: COLORS.blue,
    cartId: 'cart_1',
  },
  {
    id: 'feed_2', type: 'cart_recovered', automationName: 'Abandoned Cart Recovery',
    description: 'Michael Brown recovered — completed $484 cart after WhatsApp message',
    result: '+$484', timestamp: hoursAgo(4), icon: '💰', color: COLORS.green,
    cartId: 'cart_8',
  },
  {
    id: 'feed_3', type: 'recovery_sent', automationName: 'Abandoned Cart Recovery',
    description: 'SMS recovery sent to Daniel Lee for Nike Dunk Low cart ($220)',
    result: null, timestamp: minsAgo(45), icon: '📱', color: COLORS.blue,
    cartId: 'cart_4',
  },
  {
    id: 'feed_4', type: 'cart_recovered', automationName: 'Abandoned Cart Recovery',
    description: 'Sofia Martinez recovered — completed $201 cart 2h after message',
    result: '+$201', timestamp: hoursAgo(2), icon: '💰', color: COLORS.green,
    cartId: 'cart_7',
  },
  {
    id: 'feed_5', type: 'low_stock_alert', automationName: 'Low Stock Monitor',
    description: 'Nike Dunk Low "Panda" is critically low — only 2 units in size 9.5',
    result: null, timestamp: hoursAgo(1), icon: '⚠️', color: COLORS.orange,
    productId: 'prod_4',
  },
  {
    id: 'feed_6', type: 'review_requested', automationName: 'Post-Purchase Review Request',
    description: 'Review request sent to Jordan Kim via WhatsApp (purchase: Adidas Stan Smith)',
    result: null, timestamp: hoursAgo(8), icon: '⭐', color: COLORS.orange,
    customerId: 'cust_10',
  },
  {
    id: 'feed_7', type: 'reorder_suggested', automationName: 'Inventory Reorder Advisor',
    description: 'Reorder suggested: Jordan 1 Retro High OG — only 1 unit left, avg 3 sales/week',
    result: null, timestamp: hoursAgo(6), icon: '📦', color: COLORS.purple,
    productId: 'prod_2',
  },
  {
    id: 'feed_8', type: 'win_back', automationName: 'Win-Back Campaign',
    description: 'Win-back WhatsApp sent to Yolanda Cruz — 90 days inactive, $30 comeback offer',
    result: null, timestamp: hoursAgo(12), icon: '💌', color: COLORS.blue,
    customerId: 'cust_9',
  },
  {
    id: 'feed_9', type: 'vip_alert', automationName: 'VIP Customer Monitor',
    description: 'Carlos Rivera flagged At Risk — champion buyer now 30 days without purchase',
    result: null, timestamp: hoursAgo(24), icon: '🚨', color: COLORS.red,
    customerId: 'cust_6',
  },
  {
    id: 'feed_10', type: 'recovery_sent', automationName: 'Abandoned Cart Recovery',
    description: 'WhatsApp recovery sent to Maria Rodriguez — $280 cart with Nike Air Max 270',
    result: null, timestamp: hoursAgo(1.5), icon: '💬', color: COLORS.blue,
    cartId: 'cart_3',
  },
];

// ─── Automations ──────────────────────────────────────────────────────────────
const MOCK_AUTOMATIONS = [
  {
    id: 'auto_1', name: 'Abandoned Cart Recovery',
    description: 'Send WhatsApp + SMS messages to recover abandoned carts. 3 touchpoints: 1h, 4h, 24h after abandonment.',
    icon: '🛒', active: true,
    stats: { recovered: 685, sentToday: 5, recoveryRate: 34 },
    triggers: ['Cart abandoned > 45 min'], actions: ['Send WhatsApp', 'Send SMS (fallback)'],
  },
  {
    id: 'auto_2', name: 'Post-Purchase Review Request',
    description: 'Request Google reviews from customers 3 days after delivery confirmation.',
    icon: '⭐', active: true,
    stats: { sentThisWeek: 12, reviewsReceived: 4, avgRating: 4.8 },
    triggers: ['Order delivered'], actions: ['Wait 3 days', 'Send WhatsApp review request'],
  },
  {
    id: 'auto_3', name: 'VIP Win-Back Campaign',
    description: 'Re-engage champion and loyal customers who haven\'t purchased in 30+ days.',
    icon: '💎', active: true,
    stats: { customersTargeted: 3, reengaged: 1, offerAmount: 30 },
    triggers: ['Champion/Loyal customer > 30 days since last purchase'],
    actions: ['Send personalized WhatsApp offer'],
  },
  {
    id: 'auto_4', name: 'Low Stock Alerts',
    description: 'Monitor inventory and alert when products fall below reorder thresholds.',
    icon: '📦', active: true,
    stats: { alertsThisWeek: 3, autoReordersPlaced: 0 },
    triggers: ['Product stock ≤ reorder point'],
    actions: ['Create dashboard alert', 'Notify owner'],
  },
  {
    id: 'auto_5', name: 'Return Processing',
    description: 'Automate return approval for orders < $150 and guide customers through the process.',
    icon: '↩️', active: false,
    stats: { returnsProcessed: 0, avgProcessingTime: '—' },
    triggers: ['Return request submitted'],
    actions: ['Auto-approve if < $150', 'Send return label', 'Notify customer'],
  },
  {
    id: 'auto_6', name: 'Lost Customer Recovery',
    description: 'Send a last-chance offer to customers who haven\'t purchased in 90+ days.',
    icon: '💌', active: true,
    stats: { customersTargeted: 2, reengaged: 0, offerAmount: 30 },
    triggers: ['Any customer > 90 days inactive'],
    actions: ['Send $30 recovery offer via WhatsApp'],
  },
];

// ─── Advisor Messages ─────────────────────────────────────────────────────────
const MOCK_ADVISOR_MESSAGES = [
  {
    id: 'msg_1', role: 'assistant',
    content: 'Good morning, Andres! ☀️ Here\'s your Sole & Soul snapshot:\n\n💸 **$1,455 at risk** in 6 open carts — 3 already have recovery messages out.\n\n📦 **3 products low stock**: Jordan 1 Retro, Air Jordan 4, Nike Dunk Low.\n\n👑 **Carlos Rivera** (At Risk, $2,760 lifetime) hasn\'t bought in 30 days — I\'d recommend a personal outreach.',
    timestamp: hoursAgo(8),
    type: 'proactive_briefing',
  },
  {
    id: 'msg_2', role: 'user',
    content: 'What should I do about Carlos?',
    timestamp: hoursAgo(7.5),
  },
  {
    id: 'msg_3', role: 'assistant',
    content: 'Carlos is one of your best customers — 11 orders, $2,760 spent. He\'s been quiet for 30 days after previously buying every 2-3 weeks. That\'s a real signal.\n\n**I recommend a personal WhatsApp** (not the automated win-back) since he\'s premium. Here\'s a draft:\n\n_"Hey Carlos! 👋 It\'s Andres from Sole & Soul. Been a minute! We just got the Air Jordan 4 Military Blue in your size — thought of you first. Want me to hold a pair before they go? 🔵"_\n\nWant me to send this, or adjust the message?',
    timestamp: hoursAgo(7.4),
    type: 'recommendation',
    actions: [
      { label: 'Send this message', action: 'send_whatsapp', customerId: 'cust_6' },
      { label: 'Edit message', action: 'edit_message' },
    ],
  },
  {
    id: 'msg_4', role: 'user',
    content: 'Yes, send it!',
    timestamp: hoursAgo(7.2),
  },
  {
    id: 'msg_5', role: 'assistant',
    content: '✅ Done! Message sent to Carlos Rivera (+1-305-555-0606) via WhatsApp.\n\nI\'ll let you know when he reads it or responds. Given his history, I\'d expect a reply within 2-4 hours if he\'s interested.',
    timestamp: hoursAgo(7.18),
    type: 'confirmation',
  },
];

// ─── Metrics ──────────────────────────────────────────────────────────────────
const MOCK_METRICS = {
  weekly: {
    totalAbandoned: 2340,
    totalRecovered: 685,
    recoveryRate: 29.3,
    recoveryRateTrend: +4.2,
    cartCount: 8,
    recoveredCount: 2,
    pendingCount: 6,
    avgCartValue: 292.5,
    revenueAtRisk: 1655,
  },
  today: {
    messagesSent: 5,
    cartsRecovered: 0,
    revenueRecovered: 0,
    automationActions: 10,
  },
};

Object.assign(window, {
  MOCK_STORE, MOCK_CARTS, MOCK_CUSTOMERS, MOCK_PRODUCTS,
  MOCK_FEED_ITEMS, MOCK_AUTOMATIONS, MOCK_ADVISOR_MESSAGES, MOCK_METRICS,
});
