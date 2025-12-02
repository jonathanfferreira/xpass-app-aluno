import React, { useState, useEffect } from 'react';
import { 
  MapPin, Search, User, Home, QrCode, Zap, Activity, ChevronRight, 
  Wallet, CheckCircle, X, Navigation, LogOut, Mail, Lock, ArrowRight, 
  CreditCard, Copy, Clock, AlertTriangle, Gift, Share2, Calendar, 
  Bookmark, Terminal
} from 'lucide-react';

// --- DADOS MOCKADOS ---
const CREDIT_PACKAGES = [
  { id: 'starter', name: 'STARTER', credits: 50, price: 89.90, popular: false },
  { id: 'move', name: 'X-MOVE', credits: 100, price: 169.90, popular: true },
  { id: 'pro', name: 'PRO ATHLETE', credits: 200, price: 299.90, popular: false }
];

const MOCK_CLASSES = [
  { id: 101, partnerName: "XPACE STUDIO", className: "HIP HOP URBANO", time: "19:00", spots: 5, category: "DANÇA" },
  { id: 102, partnerName: "ZEN LIFE", className: "HATHA YOGA", time: "19:30", spots: 2, category: "ZEN" },
  { id: 103, partnerName: "IRON BOX", className: "WOD INTENSO", time: "20:00", spots: 0, category: "FORÇA" },
];

const PARTNERS = [
  { id: 1, name: "XPACE STUDIO", category: "DANÇA", credits: 12, image: "https://images.unsplash.com/photo-1535525153412-5a42439a210d?q=80&w=1000" },
  { id: 2, name: "JORDAN DANCE", category: "DANÇA", credits: 10, image: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?q=80&w=1000" },
  { id: 3, name: "IRON BOX", category: "FORÇA", credits: 15, image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000" },
  { id: 4, name: "ZEN LIFE", category: "ZEN", credits: 8, image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=1000" }
];

const MOCK_USER = {
  name: "ALUNO BETA",
  email: "beta@xpass.com",
  referralCode: "BETA2025",
  balance: 15,
};

// Componente para injetar estilos globais e fontes manualmente
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:wght@300;400;600&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
    
    body {
      background-color: #000000;
      color: #E6E6E6;
      font-family: 'Poppins', sans-serif;
      margin: 0;
      padding: 0;
    }
    
    /* Utilitários de Fonte manuais para garantir carregamento */
    .font-condensed { font-family: 'Bebas Neue', sans-serif !important; letter-spacing: 0.05em; }
    .font-mono { font-family: 'Space Mono', monospace !important; }
    .font-body { font-family: 'Poppins', sans-serif !important; }
    
    /* Cores manuais de fallback */
    .acid-bg { background-color: #000000; }
    .acid-text-orange { color: #FF5200; }
    .acid-bg-orange { background-color: #FF5200; }
    
    .glass-panel { 
      background: rgba(20, 20, 20, 0.6); 
      backdrop-filter: blur(12px); 
      border: 1px solid rgba(255, 255, 255, 0.1); 
    }
    
    .noise-overlay { 
      position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
      background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJnoiPjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjY1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2cpIiBvcGFjaXR5PSIwLjAzIi8+PC9zdmc+'); 
      opacity: 0.05; pointer-events: none; z-index: 0; 
    }
    
    .no-scrollbar::-webkit-scrollbar { display: none; }
  `}</style>
);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  
  // Estados de Modais
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [showShop, setShowShop] = useState(false);
  const [showReferral, setShowReferral] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [myBookings, setMyBookings] = useState([]);
  const [lastTx, setLastTx] = useState(null);

  // --- INJEÇÃO DE TAILWIND CDN (A CORREÇÃO MÁGICA) ---
  useEffect(() => {
    // Verifica se o Tailwind já está carregado, se não, injeta
    if (!document.getElementById('tailwind-cdn')) {
      const script = document.createElement('script');
      script.id = 'tailwind-cdn';
      script.src = "https://cdn.tailwindcss.com";
      script.onload = () => {
        // Configura as cores Acid Tech assim que o script carrega
        window.tailwind.config = {
          theme: {
            extend: {
              colors: {
                acid: {
                  orange: '#FF5200',
                  blue: '#2300D0',
                  purple: '#6324B2',
                  black: '#000000',
                  dark: '#0A0A0A',
                  light: '#E6E6E6'
                }
              },
              fontFamily: {
                condensed: ['Bebas Neue', 'sans-serif'],
                mono: ['Space Mono', 'monospace'],
                body: ['Poppins', 'sans-serif'],
              }
            }
          }
        };
      };
      document.head.appendChild(script);
    }
  }, []);

  // Login Simulado
  const handleLogin = () => { 
    setTimeout(() => { 
      setUser(MOCK_USER); 
      setIsAuthenticated(true); 
    }, 800); 
  };

  // Lógica de Check-in
  const handleCheckIn = (partner) => {
    if (user.balance >= partner.credits) {
      const newTx = { id: Date.now(), partnerName: partner.name, cost: partner.credits, date: 'HOJE', time: 'NOW' };
      setUser({ ...user, balance: user.balance - partner.credits });
      setLastTx(newTx);
      setShowSuccess(true);
      setSelectedPartner(null);
    } else {
      // Se não tem saldo, abre a loja
      setSelectedPartner(null);
      setShowShop(true);
    }
  };

  // Lógica de Agendamento
  const handleBook = (cls) => {
    if (cls.spots === 0) return alert("AULA LOTADA!");
    setMyBookings([...myBookings, cls]);
    alert("VAGA RESERVADA COM SUCESSO!");
  };

  // Lógica de Compra
  const addCredits = (pkg) => {
    setUser({ ...user, balance: user.balance + pkg.credits });
    setShowShop(false);
    alert(`PAGAMENTO APROVADO: +${pkg.credits} CRÉDITOS`);
  };

  // --- TELA DE LOGIN ---
  if (!isAuthenticated) return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <GlobalStyles />
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-acid-blue rounded-full blur-[100px] opacity-40 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-acid-orange rounded-full blur-[100px] opacity-30"></div>
      
      <div className="relative z-10 text-center w-full max-w-sm glass-panel p-8 rounded-3xl border border-white/10">
        <h1 className="font-condensed text-7xl mb-2 tracking-tighter text-white">XP<span className="text-acid-orange">ASS</span></h1>
        <p className="font-mono text-xs text-gray-400 mb-8 tracking-[0.3em] uppercase">Acesso Beta v1.0</p>
        
        <div className="space-y-3">
            <input type="email" placeholder="E-MAIL" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white font-mono text-xs outline-none focus:border-acid-orange transition-colors" />
            <input type="password" placeholder="SENHA" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white font-mono text-xs outline-none focus:border-acid-orange transition-colors" />
            <button onClick={handleLogin} className="w-full bg-white hover:bg-acid-orange hover:text-white text-black font-condensed text-2xl py-3 rounded-xl transition-all tracking-wide mt-4">
              ENTRAR
            </button>
        </div>
        <p className="mt-6 text-[10px] text-gray-600 font-mono">ESQUECEU A SENHA? // CRIAR CONTA</p>
      </div>
    </div>
  );

  // --- APP PRINCIPAL ---
  return (
    <div className="flex flex-col h-screen acid-bg text-[#E6E6E6] font-body relative overflow-hidden">
      <GlobalStyles />
      <div className="noise-overlay" />
      
      {/* ÁREA DE CONTEÚDO COM SCROLL */}
      <div className="flex-1 overflow-y-auto pb-28 no-scrollbar p-6 pt-10 relative z-10">
        
        {/* TELA HOME */}
        {activeTab === 'home' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-end border-b border-white/10 pb-4">
              <div>
                <p className="font-mono text-[10px] text-gray-500 mb-1">ID: {user.referralCode}</p>
                <h1 className="font-condensed text-4xl leading-none">OLÁ, <span className="text-white">{user.name.split(' ')[0]}</span></h1>
              </div>
              <div onClick={() => setShowShop(true)} className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-right cursor-pointer hover:border-acid-orange transition-colors">
                <span className="font-mono text-[10px] text-gray-400 uppercase">Seu Saldo</span>
                <div className="font-condensed text-3xl text-acid-orange leading-none">{user.balance} CR</div>
              </div>
            </div>

            {/* Banner Recarga */}
            <div onClick={() => setShowShop(true)} className="h-36 rounded-2xl border border-white/10 relative overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-acid-orange to-acid-purple opacity-80 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute inset-0 p-6 flex flex-col justify-center z-10">
                    <div className="flex items-center gap-2 mb-1">
                        <Zap size={14} className="text-white fill-white animate-pulse"/>
                        <span className="font-mono text-[10px] tracking-widest text-white/80">RECARGA RÁPIDA</span>
                    </div>
                    <h3 className="font-condensed text-4xl text-white leading-none">NUNCA PARE<br/>DE SE MOVER.</h3>
                </div>
                <CreditCard className="absolute -bottom-6 -right-6 text-white opacity-20 w-40 h-40 rotate-12"/>
            </div>

            {/* Lista de Parceiros */}
            <div>
                <div className="flex justify-between items-end mb-4">
                    <h3 className="font-condensed text-xl text-gray-400">PARCEIROS <span className="text-white">TOP TIER</span></h3>
                    <span className="font-mono text-[10px] text-acid-orange">VER TODOS {'>'}</span>
                </div>
                <div className="space-y-3">
                    {PARTNERS.map(p => (
                        <div key={p.id} onClick={() => setSelectedPartner(p)} className="glass-panel p-3 rounded-xl flex gap-4 items-center cursor-pointer hover:border-acid-orange/50 transition-colors group">
                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-800 relative">
                                <img src={p.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all grayscale group-hover:grayscale-0"/>
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-condensed text-xl text-white leading-none">{p.name}</h4>
                                    <span className="font-mono text-[10px] text-acid-orange border border-acid-orange px-1 rounded">{p.credits} CR</span>
                                </div>
                                <p className="font-mono text-[10px] text-gray-500 mt-1">{p.category} • 0.8KM</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        )}

        {/* TELA AGENDA */}
        {activeTab === 'classes' && (
            <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <h2 className="font-condensed text-5xl">AGENDA <span className="text-acid-orange">LIVE</span></h2>
                <p className="font-mono text-xs text-gray-500 mb-8 border-l-2 border-acid-orange pl-2">JOINVILLE // SC</p>

                {myBookings.length > 0 && (
                    <div className="p-4 bg-acid-orange/10 rounded-xl border border-acid-orange/30 mb-8">
                        <h3 className="font-mono text-xs text-acid-orange mb-3 flex items-center gap-2"><Bookmark size={12}/> RESERVAS CONFIRMADAS</h3>
                        {myBookings.map((b, i) => (
                            <div key={i} className="flex justify-between items-center py-2 border-b border-acid-orange/10 last:border-0">
                                <div>
                                    <p className="font-condensed text-xl text-white leading-none">{b.className}</p>
                                    <p className="font-mono text-[10px] text-gray-500">{b.partnerName} • {b.time}</p>
                                </div>
                                <CheckCircle size={16} className="text-acid-orange"/>
                            </div>
                        ))}
                    </div>
                )}

                <div className="space-y-3">
                    {MOCK_CLASSES.map(c => (
                        <div key={c.id} className="glass-panel p-4 rounded-xl flex justify-between items-center group">
                            <div className="flex gap-4 items-center">
                                <div className="w-12 h-12 bg-white/5 rounded flex flex-col items-center justify-center border border-white/10">
                                    <span className="font-mono text-[8px] text-gray-500">HOJE</span>
                                    <span className="font-condensed text-2xl text-white">{c.time}</span>
                                </div>
                                <div>
                                    <h4 className="font-condensed text-2xl text-white leading-none">{c.className}</h4>
                                    <p className="font-mono text-[10px] text-gray-500">{c.partnerName}</p>
                                </div>
                            </div>
                            <button onClick={() => handleBook(c)} className={`h-10 w-10 rounded-full flex items-center justify-center transition-all ${c.spots > 0 ? 'bg-white text-black hover:bg-acid-orange hover:text-white' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}>
                                <ChevronRight size={20}/>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* TELA PERFIL */}
        {activeTab === 'profile' && (
             <div className="text-center pt-6 animate-in slide-in-from-bottom duration-300">
                 <div className="glass-panel p-8 rounded-3xl border border-white/10 relative overflow-hidden mb-6">
                     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-acid-orange to-acid-blue"></div>
                     <div className="w-28 h-28 bg-black border-2 border-acid-orange rounded-full mx-auto mb-4 flex items-center justify-center shadow-[0_0_30px_rgba(255,82,0,0.2)]">
                        <User size={48} className="text-white"/>
                     </div>
                     <h2 className="font-condensed text-4xl text-white mb-1">{user.name}</h2>
                     <p className="font-mono text-xs text-gray-500">{user.email}</p>
                 </div>

                 <div className="glass-panel p-4 rounded-xl mb-4 text-left flex justify-between items-center cursor-pointer hover:border-acid-orange/50 transition-colors" onClick={() => setShowReferral(true)}>
                     <div className="flex items-center gap-4">
                         <div className="bg-acid-orange/20 p-3 rounded-full"><Gift className="text-acid-orange" size={20}/></div>
                         <div>
                             <h4 className="font-condensed text-xl text-white leading-none">INDIQUE E GANHE</h4>
                             <p className="font-mono text-[10px] text-gray-500">CÓDIGO: {user.referralCode}</p>
                         </div>
                     </div>
                     <ChevronRight className="text-gray-600" size={16}/>
                 </div>

                 <button onClick={() => setIsAuthenticated(false)} className="w-full p-4 mt-8 border border-red-900/30 text-red-500 font-mono text-xs hover:bg-red-900/10 rounded-xl flex items-center justify-center gap-2">
                    <LogOut size={14}/> ENCERRAR SESSÃO
                 </button>
             </div>
        )}

        {activeTab === 'explore' && (
            <div className="flex flex-col items-center justify-center h-full text-gray-600">
                <MapPin size={48} className="mb-4 opacity-20"/>
                <h2 className="font-condensed text-3xl">MAPA EM BREVE</h2>
                <p className="font-mono text-xs">Estamos mapeando a cidade...</p>
            </div>
        )}
      </div>

      {/* HUD NAVIGATION (MENU INFERIOR) */}
      <div className="fixed bottom-0 w-full glass-panel border-t border-white/10 px-6 py-4 flex justify-between items-end z-50 bg-black/90 backdrop-blur-xl pb-8">
        <NavIcon icon={<Home />} label="BASE" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
        <NavIcon icon={<Search />} label="SCAN" active={activeTab === 'explore'} onClick={() => setActiveTab('explore')} />
        
        {/* Botão Central (QR Code) */}
        <div className="relative -top-10">
          <button 
            onClick={() => setActiveTab('explore')}
            className="bg-acid-orange text-black p-5 rounded-full shadow-[0_0_30px_rgba(255,82,0,0.5)] border-[6px] border-black hover:scale-110 transition-transform"
          >
            <QrCode size={28} strokeWidth={2.5} />
          </button>
        </div>

        <NavIcon icon={<Calendar />} label="AGENDA" active={activeTab === 'classes'} onClick={() => setActiveTab('classes')} />
        <NavIcon icon={<User />} label="DADOS" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
      </div>

      {/* --- MODAIS --- */}

      {/* Modal de Detalhes do Parceiro */}
      {selectedPartner && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in">
            <div className="bg-[#0A0A0A] w-full max-w-md rounded-t-3xl border-t border-white/10 overflow-hidden relative">
                <div className="h-56 bg-gray-800 relative">
                    <img src={selectedPartner.image} className="w-full h-full object-cover opacity-80"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent"></div>
                    <button onClick={() => setSelectedPartner(null)} className="absolute top-4 right-4 bg-black/50 p-2 rounded-full backdrop-blur-md text-white"><X size={20}/></button>
                </div>
                <div className="p-8 relative -mt-12">
                    <h2 className="font-condensed text-5xl leading-none mb-2 text-white">{selectedPartner.name}</h2>
                    <p className="font-mono text-xs text-gray-400 mb-6">{selectedPartner.category} • 0.8KM</p>
                    
                    <div className="flex justify-between items-center mb-8 bg-white/5 p-4 rounded-xl border border-white/10">
                        <span className="font-mono text-xs text-gray-500">CUSTO DO ACESSO</span>
                        <span className="font-condensed text-4xl text-acid-orange">{selectedPartner.credits} CR</span>
                    </div>

                    <button onClick={() => handleCheckIn(selectedPartner)} className="w-full bg-acid-orange hover:bg-white text-black font-condensed text-2xl py-4 rounded-xl transition-colors tracking-wide flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,82,0,0.3)]">
                        <QrCode size={20} /> CONFIRMAR CHECK-IN
                    </button>
                </div>
            </div>
          </div>
      )}
      
      {/* Modal de Loja */}
      {showShop && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-end justify-center p-0 md:p-4 backdrop-blur-sm animate-in slide-in-from-bottom">
              <div className="bg-[#111] w-full max-w-md rounded-t-3xl md:rounded-2xl border-t md:border border-white/10 p-6 pb-10">
                  <div className="flex justify-between items-center mb-8">
                      <div>
                          <h2 className="font-condensed text-3xl text-white">LOJA <span className="text-acid-orange">XPASS</span></h2>
                          <p className="font-mono text-[10px] text-gray-500">RECARREGUE SUA ENERGIA</p>
                      </div>
                      <button onClick={() => setShowShop(false)}><X className="text-gray-500 hover:text-white"/></button>
                  </div>
                  <div className="space-y-4">
                      {CREDIT_PACKAGES.map(pkg => (
                          <div key={pkg.id} className={`p-5 border rounded-2xl flex justify-between items-center cursor-pointer transition-all ${pkg.popular ? 'bg-acid-orange/10 border-acid-orange' : 'bg-white/5 border-white/10 hover:border-white/30'}`} onClick={() => addCredits(pkg)}>
                              <div>
                                  <div className="flex items-center gap-2">
                                      <h3 className="font-condensed text-2xl text-white">{pkg.name}</h3>
                                      {pkg.popular && <span className="bg-acid-orange text-black text-[8px] font-bold px-2 py-0.5 rounded font-mono">POPULAR</span>}
                                  </div>
                                  <p className="font-mono text-xs text-gray-400">{pkg.credits} CRÉDITOS</p>
                              </div>
                              <span className="font-condensed text-2xl text-white">R$ {pkg.price.toFixed(2)}</span>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      )}

      {/* Modal Sucesso */}
      {showSuccess && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-acid-orange p-6 text-black animate-in zoom-in duration-300">
            <div className="text-center w-full max-w-sm">
            <CheckCircle size={80} className="mx-auto mb-6 text-black" strokeWidth={1.5} />
            <h2 className="font-condensed text-7xl leading-none mb-2">ACESSO<br/>LIBERADO</h2>
            <p className="font-mono text-xs mb-8 uppercase tracking-widest border-t border-black/20 pt-4 mt-4">BOM TREINO NA {lastTx?.partnerName}</p>
            <div className="bg-black/10 p-6 rounded-2xl border-2 border-black/10 mb-8 inline-block rotate-3 shadow-xl">
                <QrCode size={140} />
            </div>
            <button onClick={() => setShowSuccess(false)} className="w-full bg-black text-white font-condensed text-2xl py-4 rounded-xl hover:scale-105 transition-transform">FECHAR</button>
            </div>
        </div>
      )}

      {/* Modal Indique e Ganhe */}
      {showReferral && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-6 animate-in fade-in">
            <div className="w-full max-w-sm border border-white/10 bg-[#0A0A0A] p-8 rounded-3xl text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-acid-orange to-acid-blue"></div>
            <Gift size={56} className="mx-auto text-acid-orange mb-6" />
            <h2 className="font-condensed text-5xl mb-2 text-white">INDIQUE<br/>E GANHE</h2>
            <p className="font-mono text-xs text-gray-400 mb-8 leading-relaxed">COMPARTILHE SEU CÓDIGO COM AMIGOS E GANHE <span className="text-white font-bold">+10 CRÉDITOS</span> CADA VEZ QUE ELES USAREM.</p>
            
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl mb-8 relative group cursor-pointer active:scale-95 transition-transform" onClick={() => alert('Copiado!')}>
                <p className="font-mono text-[10px] text-gray-500 mb-2 uppercase">Seu Código</p>
                <span className="font-condensed text-5xl tracking-widest text-white">{user.referralCode}</span>
                <Copy size={16} className="absolute top-4 right-4 text-gray-600 group-hover:text-white"/>
            </div>
            
            <button onClick={() => setShowReferral(false)} className="text-gray-500 font-mono text-xs hover:text-white tracking-widest uppercase">Fechar</button>
            </div>
        </div>
      )}

    </div>
  );
}

// --- Subcomponentes ---
const NavIcon = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-acid-orange' : 'text-gray-600 hover:text-gray-400'}`}>
    {React.cloneElement(icon, { size: 24, strokeWidth: active ? 2.5 : 1.5 })}
    <span className="font-mono text-[10px] tracking-widest">{label}</span>
  </button>
);