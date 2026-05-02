// ─── Router ───────────────────────────────────────────────────────────────────

const RouterContext = React.createContext(null);

function RouterProvider({ children }) {
  const TABS = ['Recovery', 'Autopilot', 'Advisor', 'Inventory', 'Customers'];
  const [stack, setStack] = React.useState([{ route: 'Recovery', params: {} }]);
  const [activeTab, setActiveTab] = React.useState(0);

  const current = stack[stack.length - 1];
  const isTopLevel = stack.length === 1 && TABS.includes(current.route);

  function push(route, params = {}) {
    setStack(s => [...s, { route, params }]);
  }

  function pop() {
    setStack(s => s.length > 1 ? s.slice(0, -1) : s);
  }

  function switchTab(index) {
    setActiveTab(index);
    setStack([{ route: TABS[index], params: {} }]);
  }

  return (
    <RouterContext.Provider value={{ current, stack, push, pop, switchTab, activeTab, isTopLevel, TABS }}>
      {children}
    </RouterContext.Provider>
  );
}

function useRouter() {
  return React.useContext(RouterContext);
}

// ─── Tab Bar ──────────────────────────────────────────────────────────────────
const TAB_ITEMS = [
  { key: 'Recovery',   label: 'Recovery',  icon: '💸', iconActive: '💸' },
  { key: 'Autopilot',  label: 'Autopilot', icon: '🤖', iconActive: '🤖' },
  { key: 'Advisor',    label: 'Advisor',   icon: '💬', iconActive: '💬' },
  { key: 'Inventory',  label: 'Inventory', icon: '📦', iconActive: '📦' },
  { key: 'Customers',  label: 'Customers', icon: '👥', iconActive: '👥' },
];

function TabBar({ activeTab, onSwitch }) {
  return (
    <div style={{
      height: 72,
      background: COLORS.white,
      borderTop: `1px solid ${COLORS.border}`,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      flexShrink: 0,
      boxShadow: '0 -2px 12px rgba(0,0,0,0.06)',
    }}>
      {TAB_ITEMS.map((tab, i) => {
        const isActive = activeTab === i;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onSwitch(i)}
            style={{ flex: 1 }}
          >
            <div style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              paddingBottom: 4,
              position: 'relative',
            }}>
              {/* Active indicator */}
              {isActive && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 32,
                  height: 3,
                  borderRadius: '0 0 4px 4px',
                  background: COLORS.blue,
                }} />
              )}
              <span style={{
                fontSize: isActive ? 22 : 20,
                lineHeight: 1,
                transition: 'all 0.15s ease',
                filter: isActive ? 'none' : 'grayscale(0.3) opacity(0.6)',
              }}>
                {tab.icon}
              </span>
              <span style={{
                fontSize: 10,
                fontWeight: isActive ? FONTS.w7 : FONTS.w5,
                color: isActive ? COLORS.blue : COLORS.textMuted,
                letterSpacing: 0.2,
                transition: 'all 0.15s ease',
              }}>
                {tab.label}
              </span>
            </div>
          </Pressable>
        );
      })}
    </div>
  );
}

// ─── Status Bar ───────────────────────────────────────────────────────────────
function StatusBar({ route }) {
  const darkRoutes = ['Recovery'];
  const isDark = darkRoutes.includes(route);
  const time = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false });

  return (
    <div style={{
      height: 44,
      background: isDark ? '#1A1A2E' : COLORS.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      flexShrink: 0,
      transition: 'background 0.2s ease',
    }}>
      <span style={{ fontSize: 13, fontWeight: FONTS.w7, color: isDark ? COLORS.white : COLORS.text }}>
        {time}
      </span>
      <Row style={{ gap: 6 }}>
        <span style={{ fontSize: 12, color: isDark ? 'rgba(255,255,255,0.8)' : COLORS.textLight }}>
          ▲▲▲
        </span>
        <span style={{ fontSize: 12, color: isDark ? 'rgba(255,255,255,0.8)' : COLORS.textLight }}>
          WiFi
        </span>
        <span style={{ fontSize: 12, color: isDark ? 'rgba(255,255,255,0.8)' : COLORS.textLight }}>
          🔋
        </span>
      </Row>
    </div>
  );
}

// ─── Screen Renderer ──────────────────────────────────────────────────────────
function ScreenRenderer({ router }) {
  const route = router.current.route;

  const screenMap = {
    Recovery:          <HeroScreen router={router} />,
    Autopilot:         <AutopilotScreen router={router} />,
    Advisor:           <AdvisorScreen router={router} />,
    Inventory:         <InventoryScreen router={router} />,
    Customers:         <CustomersScreen router={router} />,
    CartDetail:        <CartDetailScreen router={router} />,
    CustomerDetail:    <CustomerDetailScreen router={router} />,
    AutomationDetail:  <AutomationDetailScreen router={router} />,
    Settings:          <SettingsScreen router={router} />,
    Onboarding:        <OnboardingScreen router={router} />,
  };

  return screenMap[route] || (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ color: COLORS.textLight }}>Screen not found: {route}</span>
    </div>
  );
}

// ─── App Shell ────────────────────────────────────────────────────────────────
function AppShell() {
  const router = useRouter();

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: COLORS.bg,
      overflow: 'hidden',
    }}>
      {/* Status bar */}
      <StatusBar route={router.current.route} />

      {/* Screen content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <ScreenRenderer router={router} />
      </div>

      {/* Tab bar — only visible at top level */}
      {router.isTopLevel && (
        <TabBar activeTab={router.activeTab} onSwitch={router.switchTab} />
      )}
    </div>
  );
}

// ─── App Entry ────────────────────────────────────────────────────────────────
function App() {
  return (
    <RouterProvider>
      <AppShell />
    </RouterProvider>
  );
}

// Mount
const rootEl = document.getElementById('root');
const appRoot = ReactDOM.createRoot(rootEl);
appRoot.render(<App />);
