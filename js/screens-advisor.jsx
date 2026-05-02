// ─── Advisor Tab (AI Chat) ────────────────────────────────────────────────────

const QUICK_CHIPS = [
  "What's my recovery rate?",
  "Which customers are at risk?",
  "What products are low stock?",
  "Draft a win-back message for Carlos",
  "How are my automations performing?",
  "Best time to send recovery messages?",
  "Analyze my top customers",
  "What's driving cart abandonment?",
];

const AI_RESPONSES = {
  "What's my recovery rate?": "Your current recovery rate is **29.3%** — up +4.2% from last week! 📈\n\nThis week's breakdown:\n- 8 carts abandoned ($2,340 total)\n- 2 carts recovered ($685)\n- 6 still in recovery pipeline ($1,655 at risk)\n\nIndustry average is ~15%, so you're doing well. To push above 35%, I'd recommend sending the first recovery message within 30 minutes of abandonment.",
  "Which customers are at risk?": "**2 customers need your attention right now:**\n\n⚠️ **Carlos Rivera** — Champion customer, $2,760 lifetime value. Last purchase was 30 days ago. This is unusual — he normally buys every 2-3 weeks. I already sent a win-back, but a personal message could help.\n\n💤 **Ashley Thompson** — Dormant 90 days, $890 lifetime. Was a regular Converse buyer.\n\nWant me to draft personalized outreach for either of them?",
  "What products are low stock?": "**3 products are critically low:**\n\n🔴 **Jordan 1 Retro High OG 'Chicago'** — only 1 unit left. Avg 3 sales/week. At this rate, you'll stock out in 2 days.\n\n🟡 **Air Jordan 4 Retro 'Military Blue'** — 2 units left. Carlos Rivera has one in his cart right now.\n\n🟡 **Nike Dunk Low 'Panda'** — 2 units left. Daniel Lee has 2 in his cart.\n\nI'd recommend reordering the Jordan 1 immediately. Want me to create a reorder for you?",
  "Draft a win-back message for Carlos": "Here's a personalized win-back for Carlos Rivera:\n\n_\"Hey Carlos! 👋 It's Andres from Sole & Soul. Been a minute since your last pick-up! We just got the Air Jordan 4 Military Blue in stock — your size 10. These are going fast and I thought of you first. Want me to hold a pair? Also, here's $30 off your next order: CARLOS30 🔵\"_\n\nThis references his purchase history (size 10 Jordans) and includes a personal touch. Want me to send this?",
  "How are my automations performing?": "All 5 active automations are running smoothly 🟢\n\n**Top performers this week:**\n- 🛒 Abandoned Cart Recovery: 34% rate, $685 recovered\n- ⭐ Review Requests: 4 reviews collected, 4.8⭐ avg\n- 💎 VIP Win-Back: 1/3 customers re-engaged so far\n\n**Needs attention:**\n- ↩️ Return Processing is currently **paused**. You have 0 pending returns, but I'd recommend activating it before the weekend traffic.",
  "Best time to send recovery messages?": "Based on your customer data:\n\n📊 **Best windows for your Miami audience:**\n- 🌅 7-9 AM: High open rates (people checking phones before work)\n- 🌆 6-8 PM: Peak response time for purchases\n- 🌙 Avoid 10 PM - 7 AM\n\nCurrently your automation sends at 1h, 4h, and 24h after abandonment — which is optimal. The 1h message gets a **47% higher** open rate than the others.\n\nOne suggestion: add a Saturday 10 AM follow-up for carts abandoned on Friday evenings.",
};

function AdvisorScreen({ router }) {
  const [messages, setMessages] = React.useState(MOCK_ADVISOR_MESSAGES);
  const [input, setInput] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const [dismissedProactive, setDismissedProactive] = React.useState(false);
  const scrollRef = React.useRef(null);
  const inputRef = React.useRef(null);

  const proactiveMsg = MOCK_ADVISOR_MESSAGES[0];

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  function sendMessage(text) {
    if (!text.trim()) return;
    const userMsg = {
      id: 'msg_' + Date.now(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responseText = AI_RESPONSES[text.trim()] ||
        `Great question about "${text.trim()}"! Based on your Sole & Soul store data, I'm analyzing your recent performance trends...\n\n📊 Your store is performing well overall. Recovery rate is 29.3% (+4.2% vs last week). Would you like me to dig deeper into any specific area?`;

      const aiMsg = {
        id: 'msg_ai_' + Date.now(),
        role: 'assistant',
        content: responseText,
        timestamp: new Date().toISOString(),
        type: 'response',
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  const displayMessages = dismissedProactive ? messages.slice(1) : messages;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{
        padding: `${SPACING.lg}px ${SPACING.screen}px ${SPACING.md}px`,
        background: COLORS.bg,
        borderBottom: `1px solid ${COLORS.borderLight}`,
      }}>
        <Row style={{ gap: SPACING.md }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20,
          }}>
            🍬
          </div>
          <Col style={{ flex: 1 }}>
            <Row style={{ gap: SPACING.sm }}>
              <span style={{ fontSize: FONTS.lg, fontWeight: FONTS.w8, color: COLORS.text }}>Advisor</span>
              <Badge label="AI" bg={COLORS.purpleLight} color={COLORS.purple} />
            </Row>
            <Row style={{ gap: 5, marginTop: 2 }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: COLORS.green }} />
              <span style={{ fontSize: FONTS.xs, color: COLORS.textLight }}>Online · Sole & Soul</span>
            </Row>
          </Col>
          <Pressable onPress={() => { setMessages(MOCK_ADVISOR_MESSAGES); setDismissedProactive(false); }}>
            <div style={{
              width: 34, height: 34, borderRadius: 8,
              background: COLORS.bgAlt,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14,
            }}>
              🗑️
            </div>
          </Pressable>
        </Row>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          padding: `${SPACING.lg}px ${SPACING.screen}px`,
          background: COLORS.bgAlt,
        }}
      >
        {/* Proactive message (first message, card style) */}
        {!dismissedProactive && (
          <ProactiveAdvisorMessage
            message={proactiveMsg}
            onDismiss={() => setDismissedProactive(true)}
            style={{ margin: `0 0 ${SPACING.lg}px 0` }}
          />
        )}

        {/* Chat messages */}
        {displayMessages.map((msg, i) => (
          i === 0 && !dismissedProactive ? null : (
            <AIMessagePreview key={msg.id} message={msg} />
          )
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: SPACING.md, paddingRight: 48 }}>
            <Row style={{ gap: SPACING.sm, alignItems: 'flex-end' }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14,
              }}>
                🍬
              </div>
              <div style={{
                background: COLORS.white,
                border: `1px solid ${COLORS.border}`,
                borderRadius: '4px 18px 18px 18px',
                padding: `${SPACING.md}px ${SPACING.lg}px`,
              }}>
                <TypingDots />
              </div>
            </Row>
          </div>
        )}

        <div style={{ height: 4 }} />
      </div>

      {/* Quick Chips */}
      <div style={{
        background: COLORS.bg,
        borderTop: `1px solid ${COLORS.borderLight}`,
        padding: `${SPACING.sm}px 0 0`,
        overflowX: 'auto',
      }}>
        <Row style={{ gap: SPACING.sm, padding: `0 ${SPACING.screen}px ${SPACING.sm}px`, paddingBottom: SPACING.sm }}>
          {QUICK_CHIPS.slice(0, 4).map(chip => (
            <Pressable key={chip} onPress={() => sendMessage(chip)}>
              <div style={{
                padding: `6px ${SPACING.md}px`,
                borderRadius: 20,
                border: `1.5px solid ${COLORS.border}`,
                background: COLORS.white,
                whiteSpace: 'nowrap',
              }}>
                <span style={{ fontSize: FONTS.sm, color: COLORS.textSub, fontWeight: FONTS.w5 }}>
                  {chip}
                </span>
              </div>
            </Pressable>
          ))}
        </Row>
      </div>

      {/* Input */}
      <div style={{
        padding: `${SPACING.sm}px ${SPACING.screen}px ${SPACING.lg}px`,
        background: COLORS.bg,
        borderTop: `1px solid ${COLORS.borderLight}`,
      }}>
        <Row style={{
          background: COLORS.white,
          border: `1.5px solid ${COLORS.border}`,
          borderRadius: 24,
          padding: `${SPACING.sm}px ${SPACING.sm}px ${SPACING.sm}px ${SPACING.lg}px`,
          gap: SPACING.sm,
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your store..."
            rows={1}
            style={{
              flex: 1, resize: 'none',
              fontSize: FONTS.base, color: COLORS.text,
              background: 'transparent',
              lineHeight: 1.5,
              paddingTop: 5,
              paddingBottom: 5,
              minHeight: 32,
              maxHeight: 96,
              overflow: 'hidden',
              userSelect: 'text',
            }}
          />
          <Pressable onPress={() => sendMessage(input)}>
            <div style={{
              width: 36, height: 36, borderRadius: 18,
              background: input.trim() ? COLORS.blue : COLORS.bgAlt,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16,
              transition: 'background 0.15s ease',
              flexShrink: 0,
            }}>
              ↑
            </div>
          </Pressable>
        </Row>
      </div>
    </div>
  );
}

function TypingDots() {
  const [frame, setFrame] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setFrame(f => (f + 1) % 3), 400);
    return () => clearInterval(t);
  }, []);
  return (
    <Row style={{ gap: 4, height: 16, alignItems: 'center' }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 7, height: 7, borderRadius: 4,
          background: COLORS.textMuted,
          transform: frame === i ? 'scale(1.3) translateY(-2px)' : 'scale(1)',
          opacity: frame === i ? 1 : 0.4,
          transition: 'all 0.15s ease',
        }} />
      ))}
    </Row>
  );
}

Object.assign(window, { AdvisorScreen });
