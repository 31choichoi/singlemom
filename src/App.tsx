/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Search, 
  ChevronRight, 
  ChevronLeft, 
  Heart, 
  Users, 
  BookOpen, 
  Info,
  Calendar,
  ExternalLink,
  ArrowRight,
  ArrowUp
} from 'lucide-react';

// --- Components ---

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState<string | null>(null);

  const [hoveredItem, setHoveredItem] = useState<typeof menuItems[0] | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: '단체소개', id: 'about', links: ['인사말', '협회소개', '설립목적 및 기능', '연혁', '조직도', '재정보고', '위치 및 연락처'] },
    { name: '사업', id: 'activity', links: ['사업 내용', '협회활동', '협회일정', '자유게시판'] },
    { name: '후원나눔', id: 'donate', links: ['후원하기', '후원자명단', '나눔게시판', '자원봉사자모집'] },
    { name: '소식', id: 'news', links: ['공지사항', '보도자료', '뉴스레터', '홍보물', '법률정보'] },
    { name: '온라인상담', id: 'footer', links: ['온라인상담', '희망을 찾는터', 'FAQ', '미스맘마미아'] },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMegaMenuOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = (name: string) => {
    setActiveMobileMenu(activeMobileMenu === name ? null : name);
  };

  const handleLinkClick = (id: string) => {
    scrollToSection(id);
    setIsMegaMenuOpen(false); // Force close
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || hoveredItem ? 'bg-white shadow-md' : 'bg-transparent text-white'
      }`}
      onMouseLeave={() => {
        setIsMegaMenuOpen(false);
        setHoveredItem(null);
      }}
    >
      <div className={`transition-all duration-300 ${isScrolled || hoveredItem ? 'py-1' : 'py-3'}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center">
          {/* Logo Section */}
          <div 
            onClick={scrollToTop}
            className="flex items-center gap-2 font-bold text-xl cursor-pointer shrink-0 py-2"
          >
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors shrink-0 ${isScrolled || hoveredItem ? 'bg-pink-600 text-white' : 'bg-white text-pink-600'}`}>
              K
            </div>
            <div className={`flex flex-col leading-tight transition-colors ${isScrolled || hoveredItem ? 'text-gray-900' : 'text-white'}`}>
                <span className="text-[8px] sm:text-[10px] font-medium opacity-70">사단법인</span>
                <span className="text-sm sm:text-lg whitespace-nowrap">한국미혼모가족협회</span>
            </div>
          </div>
          
          {/* Right-aligned Navigation Container */}
          <div className="hidden lg:flex items-center justify-end flex-1 ml-4 sm:ml-10">
            {/* Navigation - Items closer together */}
            <nav className="flex items-center h-full mr-8">
              {menuItems.map((item) => (
                <div 
                  key={item.name} 
                  className="relative py-4 w-[110px] group flex justify-center text-center"
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <button 
                    onClick={() => scrollToSection(item.id)}
                    className={`hover:text-pink-600 font-bold text-[18px] tracking-tight transition-colors whitespace-nowrap cursor-pointer ${isScrolled || hoveredItem ? 'text-gray-800' : 'text-white'}`}
                  >
                    {item.name}
                  </button>

                  {/* Dropdown Menu - Specific to this item */}
                  <AnimatePresence>
                    {hoveredItem?.name === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 w-full min-w-[160px] bg-white shadow-xl rounded-b-xl border-t-2 border-pink-500 overflow-hidden"
                      >
                        <ul className="py-2">
                          {item.links.map((link) => (
                            <li key={link}>
                              <button
                                onClick={() => handleLinkClick(item.id)}
                                className="w-full text-left px-5 py-2.5 text-[14px] text-gray-600 hover:bg-pink-50 hover:text-pink-600 font-medium transition-colors whitespace-nowrap cursor-pointer"
                              >
                                {link}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right Buttons Section */}
            <div className="flex items-center gap-4 sm:gap-6 shrink-0">
              <div className="hidden xl:flex items-center gap-4 text-xs font-bold uppercase tracking-wider">
                <button className={`${isScrolled || hoveredItem ? 'text-gray-500' : 'text-white/80'} hover:text-pink-600 transition-colors`}>HOME</button>
                <button className={`${isScrolled || hoveredItem ? 'text-gray-500' : 'text-white/80'} hover:text-pink-600 transition-colors`}>로그인</button>
                <button className={`${isScrolled || hoveredItem ? 'text-gray-500' : 'text-white/80'} hover:text-pink-600 transition-colors`}>회원가입</button>
              </div>
              <button className="bg-pink-600 text-white px-5 sm:px-6 py-2 rounded-full font-black hover:bg-pink-700 transition-all shadow-lg shadow-pink-600/30 text-[11px] sm:text-sm whitespace-nowrap">
                후원참여
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 ml-auto"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className={isScrolled || hoveredItem ? 'text-gray-900' : 'text-white'} />
          </button>
        </div>
      </div>

      {/* Mobile Menu (Accordion style) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 z-[55] lg:hidden"
            />
            {/* Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[50%] bg-white z-[60] flex flex-col shadow-2xl"
            >
              <div className="p-4 flex justify-between items-center border-b">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center text-white text-xs font-bold">K</div>
                <span className="font-bold text-gray-900 text-sm">한국미혼모가족협회</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                <X />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 space-y-1">
                {menuItems.map((item) => (
                  <div key={item.name} className="border-b last:border-0 border-gray-100">
                    <button 
                      onClick={() => toggleMobileMenu(item.name)}
                      className="flex justify-between items-center py-4 w-full text-left font-bold text-gray-800"
                    >
                      {item.name}
                      <motion.div animate={{ rotate: activeMobileMenu === item.name ? 180 : 0 }}>
                        <ChevronRight className="w-5 h-5 text-gray-300 transform rotate-90" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {activeMobileMenu === item.name && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-gray-50/50"
                        >
                          <div className="grid grid-cols-1 gap-1 p-2 pb-4">
                            {item.links.map(link => (
                              <button 
                                key={link} 
                                onClick={() => scrollToSection(item.id)}
                                className="text-left px-4 py-2.5 text-sm text-gray-600 hover:text-pink-600 transition-colors"
                              >
                                {link}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 bg-gray-50 border-t flex items-center justify-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <span>LOGIN</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span>JOIN</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span>ENGLISH</span>
            </div>
          </motion.div>
        </>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => {
  const backgrounds = [
    "https://mydrim.net/img/singlemom_main.png",
    "https://images.unsplash.com/photo-1516733968668-dbdce39c46ef?q=80&w=2670&auto=format&fit=crop"
  ];
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 4000); // 4초 간격
    return () => clearInterval(timer);
  }, []);

  const titleLines = [
    ["미혼모", "가족의"],
    ["꿈과", "희망을"],
    ["함께", "키워갑니다"]
  ];

  const [titleKey, setTitleKey] = useState(0);

  useEffect(() => {
    // Total cycle: entrance (~2s) + stay (3s) + exit (1s) + wait (1s) = 7s
    const timer = setInterval(() => {
      setTitleKey(prev => prev + 1);
    }, 7000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[80vh] lg:h-[90vh] overflow-hidden bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div 
          key={bgIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.6, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img 
            src={backgrounds[bgIndex]} 
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center pt-32 lg:pt-0 text-white">
        <div className="overflow-visible">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block bg-pink-600 text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase"
          >
            LOVE & SUPPORT
          </motion.span>
          
          <div className="mb-4 sm:mb-6 pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div key={titleKey} className="flex flex-col gap-0 select-none">
                {titleLines.map((lineArr, lineIdx) => (
                  <div key={lineIdx} className="flex flex-wrap items-center gap-x-3 sm:gap-x-4"> 
                    {lineArr.map((word, wordIdx) => (
                      <motion.span
                        key={`${lineIdx}-${wordIdx}`}
                        initial={{ 
                          opacity: 0, 
                          scale: 3, 
                          x: -300, 
                          y: -150,
                          rotate: -15
                        }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1, 
                          x: 0, 
                          y: 0,
                          rotate: 0,
                        }}
                        exit={{ 
                          opacity: 0, 
                          x: 50, 
                          filter: 'blur(8px)',
                          transition: { duration: 0.4 }
                        }}
                        transition={{ 
                          duration: 0.6,
                          type: "spring",
                          damping: 25,
                          stiffness: 45,
                          delay: (lineIdx * 0.4) + (wordIdx * 0.1) 
                        }}
                        className="inline-block origin-center text-xl sm:text-3xl lg:text-4xl font-extrabold leading-[1.2]"
                      >
                        <motion.span
                          animate={{ y: [0, -5, 0] }}
                          transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1.5 + (lineIdx * 0.4)
                          }}
                          className="inline-block"
                        >
                          {word}
                        </motion.span>
                      </motion.span>
                    ))}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-sm sm:text-lg lg:text-xl text-gray-200 mb-8 sm:mb-12 max-w-2xl font-light"
          >
            사단법인 한국미혼모가족협회는 미혼모와 자녀의 권리 보호,<br className="hidden sm:block" />
            그리고 사회적 배려 없는 법과 제도의 개선을 위해 목소리를 냅니다.
          </motion.p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3.5 sm:py-4 rounded-full font-bold flex items-center gap-2 transition-all group shadow-xl shadow-pink-600/20 text-sm sm:text-base cursor-pointer">
              후원 참여하기 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-white/50 hover:bg-white/10 text-white px-8 py-3.5 sm:py-4 rounded-full font-bold backdrop-blur-sm transition-all text-sm sm:text-base cursor-pointer">
              단체 소개 보기
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4">
        {backgrounds.map((_, i) => (
          <div 
            key={i} 
            className={`w-3 h-3 rounded-full transition-all duration-300 ${i === bgIndex ? 'bg-pink-600 w-8' : 'bg-white/30'}`} 
          />
        ))}
      </div>
    </section>
  );
};

const QuickActions = () => {
  const actions = [
    { icon: <Heart className="w-7 h-7" />, label: '단체소개', color: 'bg-pink-50', iconColor: 'text-pink-600' },
    { icon: <Users className="w-7 h-7" />, label: '회원가입', color: 'bg-blue-50', iconColor: 'text-blue-600' },
    { icon: <BookOpen className="w-7 h-7" />, label: '후원하기', color: 'bg-pink-50', iconColor: 'text-pink-600' },
    { icon: <Info className="w-7 h-7" />, label: '자원봉사', color: 'bg-green-50', iconColor: 'text-green-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
      <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-10 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 border border-gray-100">
        {actions.map((active, idx) => (
          <motion.button 
            key={idx} 
            whileHover="hover"
            className="flex items-center gap-4 group h-24 text-left outline-none"
          >
            <div className={`w-14 h-14 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shrink-0 ${active.color} ${active.iconColor}`}>
              {active.icon}
            </div>
            <div className="flex-1">
              <p className="text-[11px] text-gray-400 font-bold mb-1 uppercase tracking-tighter">service</p>
              <motion.h3 
                variants={{
                  hover: { scale: 1.15, color: '#db2777', x: 10 }
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="font-bold text-gray-800 origin-left text-lg lg:text-2xl"
              >
                {active.label}
              </motion.h3>
            </div>
            <ChevronRight className="ml-auto w-5 h-5 text-gray-300 group-hover:text-pink-600 transition-colors shrink-0" />
          </motion.button>
        ))}
      </div>
    </div>
  );
};

const SectionHeader = ({ title, sub, more = true }: { title: string, sub: string, more?: boolean }) => (
  <div className="flex items-end justify-between mb-10">
    <div>
      <p className="text-pink-600 font-bold mb-2 tracking-widest text-sm">{sub}</p>
      <h2 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">{title}</h2>
    </div>
    {more && (
      <button className="flex items-center gap-2 text-gray-400 hover:text-pink-600 font-bold transition-colors text-sm">
        전체보기 <ArrowRight className="w-4 h-4" />
      </button>
    )}
  </div>
);

const StoryCard = ({ img, category, title, date }: { img: string, category: string, title: string, date: string }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="group cursor-pointer"
  >
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-4 bg-gray-100">
      <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-xs font-bold text-pink-600">
        {category}
      </div>
    </div>
    <h4 className="font-bold text-lg mb-2 line-clamp-2 min-h-[3.5rem] group-hover:text-pink-600 transition-colors">
      {title}
    </h4>
    <p className="text-gray-400 text-sm flex items-center gap-2">
      <Calendar className="w-4 h-4" /> {date}
    </p>
  </motion.div>
);

const Banner = () => (
    <section id="donate" className="py-20 bg-pink-600 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-pink-500 rounded-l-[100px] translate-x-20 -rotate-12 opacity-50" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="max-w-2xl">
                <h2 className="text-3xl lg:text-5xl font-black mb-6 leading-tight">
                    모두가 행복한 세상,<br />
                    작은 나눔으로 시작됩니다.
                </h2>
                <p className="text-pink-100 text-lg lg:text-xl font-medium mb-8">
                    미혼모 가족이 당당하게 이웃으로 살아갈 수 있도록<br />
                    따뜻한 마음을 나누어주세요.
                </p>
                <div className="flex gap-4">
                    <button className="bg-white text-pink-600 px-10 py-5 rounded-full font-black hover:bg-pink-50 transition-all shadow-xl">
                        후원 참여하기
                    </button>
                    <button className="border-2 border-white/30 hover:bg-white/10 px-10 py-5 rounded-full font-bold transition-all">
                        협회 활동 보기
                    </button>
                </div>
            </div>
            <div className="lg:w-1/3 p-10 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20">
                <div className="text-xs uppercase font-black mb-4 tracking-widest text-pink-200">monthly support</div>
                <div className="text-4xl font-black mb-2">5,630 +</div>
                <div className="text-sm font-medium text-pink-100 mb-6">함께해주시는 소중한 후원자님들</div>
                <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '85%' }} className="h-full bg-white transition-all duration-1000" />
                </div>
            </div>
        </div>
    </section>
);

const Footer = () => (
  <footer className="bg-gray-900 text-gray-400 py-20">
    <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-4 gap-12 mb-12">
      <div className="col-span-2">
        <div className="flex items-center gap-2 font-bold text-2xl text-white mb-6">
          <div className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center">K</div>
          <span>한국노인복지사협회</span>
        </div>
        <p className="max-w-md mb-8 leading-relaxed">
          어르신들의 존엄한 삶과 건강한 노후를 위해 전문가들의 역량을 결집하고 
          복지 현장의 혁신을 이끄는 대한민국 노인복지 대표 기관입니다.
        </p>
        <div className="flex gap-4">
          {['Instagram', 'Facebook', 'Blog', 'Youtube'].map(s => (
            <button key={s} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all">
              <ExternalLink className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>
      <div>
        <h5 className="text-white font-bold mb-6">기관 정보</h5>
        <ul className="space-y-4 text-sm">
          <li>협회 소개</li>
          <li>지부 안내</li>
          <li>교육 과정</li>
          <li>공지사항</li>
          <li>채용 공고</li>
        </ul>
      </div>
      <div>
        <h5 className="text-white font-bold mb-6">관련 사이트</h5>
        <ul className="space-y-4 text-sm">
          <li>보건복지부</li>
          <li>한국사회복지사협회</li>
          <li>서울복지포털</li>
          <li>중앙노인보호전문기관</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 pt-12 border-t border-white/10 flex flex-col lg:flex-row justify-between gap-6 text-xs uppercase tracking-widest font-bold">
      <div className="flex flex-col lg:flex-row gap-6">
        <span>개인정보처리방침</span>
        <span>이메일무단수집거부</span>
        <span>이용약관</span>
      </div>
      <span>&copy; 2026 KASSW. ALL RIGHTS RESERVED.</span>
    </div>
  </footer>
);

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[100] w-14 h-14 bg-pink-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-pink-700 transition-colors group"
        >
          <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
          <span className="sr-only">Top</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-pink-100 selection:text-pink-600 overflow-x-hidden">
      <Header />
      <BackToTop />
      
      <main className="overflow-x-hidden">
        <Hero />
        <QuickActions />
        
        {/* Stories Section */}
        <section id="stories" className="py-24 max-w-7xl mx-auto px-4">
          <SectionHeader title="나눌수록 행복합니다" sub="KUMFA STORIES" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StoryCard 
              img="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2670&auto=format&fit=crop"
              category="나눔이야기"
              title="아이유애나 후원자님들의 소중한 나눔이 전달되었습니다"
              date="2026.05.16"
            />
            <StoryCard 
              img="https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?q=80&w=2748&auto=format&fit=crop"
              category="협회소식"
              title="2026 'Webcash' 개인자립교육비 지원 대상자 선정 안내"
              date="2026.05.13"
            />
            <StoryCard 
              img="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2670&auto=format&fit=crop"
              category="사업소식"
              title="임신 13~27주 미혼 예비맘을 위한 건강기능식품 파티"
              date="2026.05.10"
            />
            <StoryCard 
              img="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2664&auto=format&fit=crop"
              category="미스맘마미아"
              title="5월 정기 자조모임: 우리가 함께 만드는 행복"
              date="2026.05.08"
            />
          </div>
        </section>

        {/* Campaign Section */}
        <section id="about" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-pink-100 rounded-3xl rotate-3 translate-x-4 translate-y-4" />
              <img 
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2670&auto=format&fit=crop" 
                alt="Campaign" 
                className="relative z-10 w-full rounded-3xl shadow-2xl aspect-[4/3] object-cover"
              />
            </div>
            <div>
              <SectionHeader title="미혼모 가족의 자립을 응원합니다" sub="KUMFA MISSION" more={false} />
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                사회적 편견 속에서 홀로 아이를 키우는 미혼모들에게 필요한 것은 
                단순한 원조가 아닌 자립을 위한 든든한 지지 기반입니다.
                협회는 미혼모들이 자아를 실현하고 당당한 사회 구성원으로 살아갈 수 있도록 함께합니다.
              </p>
              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 font-bold">01</div>
                  <p className="text-gray-800 font-bold italic border-b border-pink-100 pb-1">긴급 생계비 및 의료비 지원</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 font-bold">02</div>
                  <p className="text-gray-800 font-bold italic border-b border-pink-100 pb-1">미혼모 당사자 자조모임 '미스맘마미아'</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 font-bold">03</div>
                  <p className="text-gray-800 font-bold italic border-b border-pink-100 pb-1">양육 지원 및 주거 지원 사업</p>
                </div>
              </div>
              <button className="w-full lg:w-auto bg-gray-900 hover:bg-black text-white px-10 py-5 rounded-full font-black transition-all flex items-center justify-center gap-2">
                자세히 알아보기 <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        <Banner />

        {/* Board Section */}
        <section id="news" className="py-24 max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12">
            <div>
                <SectionHeader title="공지사항" sub="NOTICE" />
                <ul className="space-y-4">
                    {[
                        { t: "2026 'Webcash' 개인자립교육비 | 긴급지원(생계, 주거, 의료) 신...", d: "05.13" },
                        { t: "[셀트리] 미혼 예비맘(임신13주~27주 대상) 건강기능식품 신청안내", d: "05.13" },
                        { t: "제15회 모두하나대축제", d: "04.17" },
                        { t: "2026 'With Mom Project' 간호조무사 모집", d: "04.13" },
                        { t: "미혼모_당신의 이야기를 찾습니다 / 진실.화해를 위한 과거사정리...", d: "04.10" }
                    ].map((item, i) => (
                        <li key={i} className="flex justify-between items-center group cursor-pointer border-b border-gray-100 pb-4">
                            <span className="text-gray-700 font-medium group-hover:text-pink-600 transition-colors truncate">{item.t}</span>
                            <span className="text-sm text-gray-400 font-mono">{item.d}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <SectionHeader title="보도자료" sub="PRESS" />
                <ul className="space-y-4">
                    {[
                        { t: "[아이유애나후원] 2026.05.16 '오늘 생일' 아이유, 또 3억 원 ...", d: "17:30" },
                        { t: "2026.04.10 출산 장려 외치지만...쌍둥이미혼모는 여전히 보험 사...", d: "05.15" },
                        { t: "2026.04.13 콘스탄트 리필드, 출산율 증가 속 산모 두피케어 솔루...", d: "05.15" },
                        { t: "2026.04.28 익성 '오르띠에', 한국미혼모가족협회에 화장품 후원 (...", d: "05.13" },
                        { t: "2026/05/2 '미혼모 인식 개선하고 에코백 받아가세요'... 한국미...", d: "05.12" }
                    ].map((item, i) => (
                        <li key={i} className="flex justify-between items-center group cursor-pointer border-b border-gray-100 pb-4">
                            <span className="text-gray-700 font-medium group-hover:text-pink-600 transition-colors truncate">{item.t}</span>
                            <span className="text-sm text-gray-400 font-mono">{item.d}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>

        {/* Activity Section */}
        <section id="activity" className="py-24 max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 border-t border-gray-100">
            <div>
                <SectionHeader title="협회활동" sub="ACTIVITIES" />
                <div className="grid grid-cols-2 gap-4">
                    <div className="group cursor-pointer">
                        <div className="aspect-[16/10] overflow-hidden rounded-xl mb-3">
                            <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <p className="text-sm font-bold truncate">[태고종] 2026 부처님오신날 태고...</p>
                        <p className="text-xs text-gray-400 mt-1">16:24</p>
                    </div>
                    <div className="group cursor-pointer">
                        <div className="aspect-[16/10] overflow-hidden rounded-xl mb-3">
                            <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <p className="text-sm font-bold truncate">라이트하우스인과 업무제휴협약(MOU)...</p>
                        <p className="text-xs text-gray-400 mt-1">05.14</p>
                    </div>
                </div>
            </div>
            <div>
                <SectionHeader title="미스맘마미아" sub="MIS MOMMAMIA" />
                <div className="grid grid-cols-3 gap-4">
                    {[
                        "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop"
                    ].map((img, i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="aspect-square overflow-hidden rounded-xl mb-2">
                                <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            </div>
                            <p className="text-[11px] font-medium leading-tight">화장품 후원 소식...</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
      </main>

      <footer id="footer" className="bg-gray-50 text-gray-600 py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-10 items-start lg:items-center mb-10 pb-10 border-b border-gray-200">
                <div className="flex items-center gap-2 font-black text-2xl text-gray-900">
                    <div className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center text-white text-lg">K</div>
                    <div className="flex flex-col leading-none">
                        <span className="text-[10px] uppercase tracking-tighter opacity-50">사단법인</span>
                        <span>한국미혼모가족협회</span>
                    </div>
                </div>
                <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm font-bold text-gray-500 uppercase tracking-widest">
                    <a href="#" className="hover:text-pink-600">이용약관</a>
                    <a href="#" className="text-pink-600">개인정보처리방침</a>
                    <a href="#" className="hover:text-pink-600">단체소개</a>
                    <a href="#" className="hover:text-pink-600">후원안내</a>
                </div>
                <div className="flex gap-4 lg:ml-auto">
                    <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 hover:bg-pink-600 hover:text-white transition-all cursor-pointer"><ExternalLink className="w-4 h-4" /></div>
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all cursor-pointer"><ExternalLink className="w-4 h-4" /></div>
                </div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-10 text-[13px] leading-relaxed text-gray-400">
                <div>
                    <p>대표 : 김민정 | 고유번호 : 778-82-00093</p>
                    <p>전화 : 02-2682-3376 | 팩스 : 02-3142-3376 | 이메일 : missmommamia@naver.com</p>
                    <p>주소 : (03708) 서울특별시 서대문구 연희맛로 46 (연희동 134-24), 4층</p>
                </div>
                <div className="lg:text-right flex flex-col justify-end">
                    <p>Copyright © 2024 한국미혼모가족협회. All rights reserved. Supported by 푸른아이티.</p>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}
