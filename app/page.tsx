"use client";

import { useEffect, useRef, useState } from "react";

function Mark({ light = false }: { light?: boolean }) {
  return (
    <a className={`brand ${light ? "brand-light" : ""}`} href="#top" aria-label="CFN — Trang chủ">
      <span className="brand-symbol"><i /><i /><i /></span>
      <span>CFN</span>
    </a>
  );
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true" className="arrow">{diagonal ? "↗" : "→"}</span>;
}

function CountUp({ target, decimals = 0, locale }: { target: number; decimals?: number; locale: string }) {
  const valueRef = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const element = valueRef.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    let frame = 0;
    let started = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      const start = performance.now();
      const duration = 760;
      const animate = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(target * eased);
        if (progress < 1) frame = requestAnimationFrame(animate);
      };
      frame = requestAnimationFrame(animate);
      observer.disconnect();
    }, { threshold: 0.35 });

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [target]);

  return <span ref={valueRef}>{new Intl.NumberFormat(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value)}</span>;
}

function FlowIllustration() {
  return (
    <div className="hero-art" role="img" aria-label="Minh họa cảng biển, vận đơn và luồng tài trợ khoản phải thu">
      <div className="art-topline"><span className="live-dot" /> TRADE FINANCE, CONNECTED</div>
      <div className="art-grid" />
      <svg className="port-illustration" viewBox="0 0 640 470" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="sky" x1="320" y1="0" x2="320" y2="470" gradientUnits="userSpaceOnUse"><stop stopColor="#F8FBFF"/><stop offset="1" stopColor="#D9E8FC"/></linearGradient>
          <linearGradient id="water" x1="320" y1="300" x2="320" y2="470" gradientUnits="userSpaceOnUse"><stop stopColor="#BBD5F6"/><stop offset="1" stopColor="#E7F1FF"/></linearGradient>
          <filter id="card-shadow" x="0" y="0" width="1" height="1" colorInterpolationFilters="sRGB" filterUnits="objectBoundingBox"><feGaussianBlur stdDeviation="9"/></filter>
        </defs>
        <rect width="640" height="470" rx="18" fill="url(#sky)"/>
        <circle cx="510" cy="90" r="43" fill="#fff" fillOpacity=".75"/>
        <path d="M0 293C103 271 195 301 306 285C418 269 502 275 640 250V470H0V293Z" fill="url(#water)"/>
        <path d="M0 326C124 304 204 338 334 317C446 299 547 311 640 291" stroke="#fff" strokeOpacity=".75" strokeWidth="2"/>
        <path d="M26 350H614M61 374H575M25 401H613M110 426H530" stroke="#fff" strokeOpacity=".65" strokeWidth="2"/>
        <path d="M73 276V105H174V276M84 122H164M87 143H163M90 164H161M94 185H159M98 206H156M102 227H153M106 248H150" stroke="#547AAE" strokeWidth="4" strokeLinecap="round"/>
        <path d="M53 105H192L174 85H71L53 105Z" fill="#fff" stroke="#547AAE" strokeWidth="3" strokeLinejoin="round"/>
        <path d="M124 85V57M124 58L149 68H124" stroke="#547AAE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="205" y="239" width="76" height="45" rx="3" fill="#6A91C3"/><rect x="284" y="239" width="72" height="45" rx="3" fill="#3F6FAE"/>
        <rect x="231" y="188" width="69" height="47" rx="3" fill="#8FB0D9"/><rect x="303" y="188" width="76" height="47" rx="3" fill="#547EBA"/>
        <path d="M210 252H276M210 264H276M289 252H351M289 264H351M236 202H295M236 214H295M308 202H374M308 214H374" stroke="#D9E8FC" strokeOpacity=".7" strokeWidth="2"/>
        <path d="M373 267H568L535 307H409L373 267Z" fill="#164C8C"/><path d="M434 244H503V267H434V244Z" fill="#fff"/><path d="M447 230H491V244H447V230Z" fill="#DCEAFF"/>
        <path d="M382 275H554M401 287H544" stroke="#7FA5D4" strokeWidth="2"/>
        <path d="M395 307V315M532 307V315" stroke="#164C8C" strokeWidth="3" strokeLinecap="round"/>
        <path d="M95 317C174 285 225 325 294 310C378 291 425 254 516 222" stroke="#1457D2" strokeWidth="2.5" strokeDasharray="6 8"/>
        <circle cx="95" cy="317" r="6" fill="#1457D2" stroke="#fff" strokeWidth="3"/><circle cx="516" cy="222" r="6" fill="#1457D2" stroke="#fff" strokeWidth="3"/>
        <rect x="377" y="61" width="174" height="119" rx="9" fill="#5A78A0" fillOpacity=".16"/>
        <rect x="371" y="54" width="174" height="119" rx="9" fill="#fff" stroke="#D6E3F3"/>
        <rect x="386" y="69" width="25" height="25" rx="6" fill="#164C8C"/><path d="M392 82H405M392 87H401" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/>
        <text x="418" y="79" fill="#6A7E99" fontSize="7" fontFamily="Arial, sans-serif" fontWeight="700" letterSpacing="1">TRADE RECEIVABLE</text>
        <text x="418" y="91" fill="#19375F" fontSize="9" fontFamily="Arial, sans-serif" fontWeight="700">VN → UAE</text>
        <rect x="500" y="72" width="32" height="14" rx="3" fill="#E8F1FF"/><text x="505" y="81.5" fill="#245C9E" fontSize="5.5" fontFamily="Arial, sans-serif" fontWeight="700">VERIFIED</text>
        <path d="M387 106H529M387 117H514M387 128H488" stroke="#DCE5F0" strokeWidth="4" strokeLinecap="round"/>
        <path d="M387 148H529" stroke="#E5EBF3"/><text x="387" y="160" fill="#71829A" fontSize="6" fontFamily="Arial, sans-serif" letterSpacing=".7">INVOICE VALUE</text><text x="470" y="160" fill="#19375F" fontSize="9" fontFamily="Arial, sans-serif" fontWeight="700">USD 248,600</text>
      </svg>
      <div className="art-caption"><span>EXPORTER</span><span>VERIFIED TRADE</span><span>FUNDING NETWORK</span></div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"VI" | "EN">("VI");
  const [missionVisible, setMissionVisible] = useState(false);
  const missionRef = useRef<HTMLElement>(null);
  const english = language === "EN";
  useEffect(() => {
    const section = missionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMissionVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setMissionVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.18 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    let fadeTimer = 0;
    const showScrollBlur = () => {
      document.documentElement.style.setProperty("--scroll-blur-opacity", "1");
      window.clearTimeout(fadeTimer);
      fadeTimer = window.setTimeout(() => {
        document.documentElement.style.setProperty("--scroll-blur-opacity", "0");
      }, 450);
    };
    window.addEventListener("scroll", showScrollBlur, { passive: true });
    return () => {
      window.clearTimeout(fadeTimer);
      window.removeEventListener("scroll", showScrollBlur);
      document.documentElement.style.removeProperty("--scroll-blur-opacity");
    };
  }, []);
  useEffect(() => {
    const textNodes = document.querySelectorAll<HTMLElement>(
      '#top .hero-copy h1, #top .hero-copy .hero-description, #top .hero-copy .hero-actions, #top .hero-copy .hero-footnote, #top section:not(.mission-section) .section-kicker, #top section:not(.mission-section) .eyebrow, #top section:not(.mission-section) .section-title, #top section:not(.mission-section) h2, #top section:not(.mission-section) h3, #top section:not(.mission-section) p, #top .metric-index, #top .metric-strip strong, #top .metric-note, #top .process-no, #top .process-tag, #top .stage > *, #top .record-step > *, #top .form-card label, #top .form-heading, #top .footer-brand p, #top .footer-links > div > *, #top .footer-bottom > *'
    );
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-text-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -4% 0px' });
    textNodes.forEach((node) => {
      node.classList.add('scroll-text-reveal');
      observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);
  function changeLanguage(next: "VI" | "EN") {
    setLanguage(next);
    document.documentElement.lang = next === "EN" ? "en" : "vi";
  }
  return (
    <main id="top">
      <div className="hero-scene">
      <header className="site-header">
        <div className="nav-wrap">
          <Mark />
          <button className="menu-toggle" aria-label="Mở điều hướng" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Đóng" : "Menu"} <span>{menuOpen ? "×" : "☰"}</span></button>
          <nav className={menuOpen ? "nav-links nav-open" : "nav-links"} aria-label="Điều hướng chính" onClick={() => setMenuOpen(false)}>
            <a href="#hanh-lang">{english ? "Projects" : "Dự án"}</a><a href="#mo-hinh">{english ? "Model" : "Mô hình"}</a><a href="#kien-truc-ha-tang">{english ? "Infrastructure" : "Hạ tầng"}</a><a href="#hanh-lang">{english ? "Trade corridor" : "Hành lang"}</a><a href="#doi-ngu">{english ? "Our team" : "Đội ngũ"}</a>
            <span className="language-toggle" aria-label="Language"><button type="button" onClick={() => changeLanguage("VI")} aria-pressed={!english}>VI</button><i>|</i><button type="button" onClick={() => changeLanguage("EN")} aria-pressed={english}>EN</button></span>
            <a className="nav-cta" href="#lien-he">{english ? "Contact CFN" : "Kết nối với CFN"} <Arrow diagonal /></a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1>{english ? <>Unlocking capital for <span>Vietnamese exports</span>.</> : <>Mở đường vốn cho <span>hàng Việt</span> ra thế giới.</>}</h1>
            <p className="hero-description">{english ? "CFN digitizes and verifies export receivables, connecting Vietnamese businesses with international trade finance." : "CFN số hóa và kiểm chứng khoản phải thu xuất khẩu, giúp doanh nghiệp Việt kết nối với nguồn vốn thương mại quốc tế."}</p>
            <div className="hero-actions"><a className="button button-dark" href="#hanh-lang">{english ? "Explore the project" : "Tìm hiểu dự án"} <Arrow /></a><a className="button button-light" href="#lien-he">{english ? "Partnership inquiries" : "Liên hệ hợp tác"} <Arrow diagonal /></a></div>
          </div>
        </div>
      </section>
      </div>

      <section className="intro section-pad" id="mo-hinh">
        <div className="intro-content">
          <h1 className="section-title">{english ? <>Goods delivered, capital still waiting.<br /><span>CFN changes that.</span></> : <>Hàng đã giao, vốn vẫn chờ.<br /><span>CFN thay đổi điều đó.</span></>}</h1>
          <div className="intro-aside"><p>{english ? "Every export shipment sold on deferred terms creates a documented receivable, but exporters wait 30–90 days to get paid. International capital is ready to fund, yet a shared standard to verify Vietnamese assets is missing." : "Mỗi lô hàng xuất khẩu trả chậm tạo ra một khoản phải thu có đầy đủ chứng từ, nhưng nhà xuất khẩu phải chờ 30–90 ngày mới nhận tiền. Nguồn vốn quốc tế sẵn sàng tài trợ, nhưng thiếu một chuẩn chung để kiểm chứng tài sản từ Việt Nam."}</p><p>{english ? "CFN builds that standard: digital infrastructure to verify and record export receivables, helping banks and funders finance faster and with greater confidence." : "CFN xây dựng chuẩn đó: một hạ tầng số kiểm chứng và ghi nhận khoản phải thu xuất khẩu, để ngân hàng và Funder được cấp phép tài trợ nhanh hơn, an toàn hơn."}</p></div>
        </div>
        <div className="metric-strip">
          <div><span className="metric-index">{english ? "INITIAL CORRIDOR: VIETNAM–UAE" : "HÀNH LANG ĐẦU TIÊN: VIỆT NAM–UAE"}</span><strong>{english && "USD "}<CountUp target={0.5} decimals={1} locale={english ? "en-US" : "vi-VN"} />–<CountUp target={1.4} decimals={1} locale={english ? "en-US" : "vi-VN"} />{english ? "B" : " tỷ USD"}</strong><p>{english ? "Working capital tied up in receivables, against USD 6.55B+ in bilateral trade in 2025." : "Vốn lưu động nằm trong khoản phải thu, trên 6,55 tỷ USD kim ngạch song phương năm 2025."}</p></div>
          <div><span className="metric-index">{english ? "VIETNAM’S TOTAL EXPORTS" : "TOÀN BỘ XUẤT KHẨU VIỆT NAM"}</span><strong>{english && "USD "}<CountUp target={39} locale={english ? "en-US" : "vi-VN"} />–<CountUp target={116} locale={english ? "en-US" : "vi-VN"} />{english ? "B" : " tỷ USD"}</strong><p>{english ? "Working capital tied up in receivables, against USD 470.6B in exports in 2025, up 15.9%." : "Vốn lưu động nằm trong khoản phải thu, trên 470,6 tỷ USD xuất khẩu năm 2025, tăng 15,9%."}</p></div>
          <div><span className="metric-index">{english ? "GLOBAL" : "TOÀN CẦU"}</span><strong>{english ? <>USD <CountUp target={2.5} decimals={1} locale="en-US" />T</> : <><CountUp target={2500} locale="vi-VN" /> tỷ USD</>}</strong><p>{english ? "Trade finance gap, with small and medium-sized businesses hit hardest." : "Khoảng trống tài trợ thương mại; doanh nghiệp vừa và nhỏ chịu ảnh hưởng nặng nhất."}</p></div>
        </div>
        <p className="metric-note">{english ? "Estimated funding need for 30–90 day terms; not a revenue forecast. Trade figures: Vietnam Customs." : "Ước tính quy mô nhu cầu với kỳ hạn 30–90 ngày, không phải dự báo doanh thu. Kim ngạch theo Hải quan Việt Nam."}</p>
      </section>

      <section ref={missionRef} className={`mission-section${missionVisible ? " is-visible" : ""}`} aria-labelledby="mission-title">
        <div className="mission-inner">
          <div className="mission-kicker">{english ? "OUR MISSION" : "SỨ MỆNH"}</div>
          <h1 className="section-title" id="mission-title">{english ? "Turn Vietnamese businesses’ receivables into trusted, fundable assets for the world." : "Đưa khoản phải thu của doanh nghiệp Việt Nam trở thành nguồn vốn mà thế giới có thể tin cậy và tài trợ."}</h1>
          <div className="mission-grid">
            <article><svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.8"/><circle cx="16" cy="16" r="4.5" fill="currentColor"/></svg><h3>{english ? "Transparency" : "Minh bạch"}</h3><p>{english ? "One unique record for each receivable, visible to every authorized party." : "Mỗi khoản phải thu có một bản ghi duy nhất, các bên cùng nhìn thấy."}</p></article>
            <article><svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M16 2.8 28 7v8.5c0 7.3-4.9 11.6-12 14.3C8.9 27.1 4 22.8 4 15.5V7l12-4.2Z" stroke="currentColor" strokeWidth="1.8"/><path d="m10.5 15.8 3.6 3.6 7.7-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg><h3>{english ? "Trust" : "Tin cậy"}</h3><p>{english ? "Funding comes from licensed institutions, with money flowing through Vietnamese banks." : "Vốn từ tổ chức được cấp phép, tiền đi qua ngân hàng Việt Nam."}</p></article>
            <article><svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M4 27.5h25M7 25V17m7 8V12m7 13V8m7 17V4" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/></svg><h3>{english ? "Access" : "Tiếp cận"}</h3><p>{english ? "Small and medium-sized businesses can access funding based on transaction quality." : "Doanh nghiệp vừa và nhỏ được tài trợ dựa trên chất lượng giao dịch."}</p></article>
            <article><svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><circle cx="7" cy="16" r="4" stroke="currentColor" strokeWidth="1.8"/><circle cx="25" cy="7" r="4" stroke="currentColor" strokeWidth="1.8"/><circle cx="25" cy="25" r="4" stroke="currentColor" strokeWidth="1.8"/><path d="m10.5 14 10.8-5.5M10.5 18l10.8 5.5" stroke="currentColor" strokeWidth="1.8"/></svg><h3>{english ? "Connection" : "Kết nối"}</h3><p>{english ? "One standard for case files, built to support multiple trade corridors." : "Một chuẩn hồ sơ, nhiều hành lang thương mại."}</p></article>
          </div>
        </div>
      </section>

      <section className="national-goal-section section-pad" aria-labelledby="national-goal-title">
        <div className="national-goal-heading">
          <div><div className="section-kicker">{english ? "A NATIONAL AMBITION" : "MỤC TIÊU CHO QUỐC GIA"}</div>
            <h1 className="section-title" id="national-goal-title">{english ? <>Connect Vietnam’s International Financial Centre to the real economy.</> : <>Góp phần đưa Trung tâm Tài chính Quốc tế Việt Nam gắn với nền kinh tế thực</>}</h1>
          </div>
          <div className="goal-graphic"><img className="goal-orbit-image" src="/cfn-vietnam-atom.png" alt={english ? "Vietnam flag at the center of orbital trade connections" : "Lá cờ Việt Nam ở trung tâm các quỹ đạo kết nối thương mại"} /></div>
        </div>
        <div className="national-goal-grid">
          <article><span className="goal-card-index">01</span><div><h3>{english ? "International capital for exports" : "Vốn quốc tế vào xuất khẩu"}</h3><p>{english ? "Open channels for international trade finance to Vietnamese businesses and complement domestic credit." : "Mở kênh vốn thương mại quốc tế cho doanh nghiệp Việt Nam, bổ sung cho tín dụng trong nước."}</p></div><span className="goal-card-arrow">↗</span></article>
          <article><span className="goal-card-index">02</span><div><h3>{english ? "Small and medium businesses" : "Doanh nghiệp vừa và nhỏ"}</h3><p>{english ? "Financing without real-estate collateral, informed by buyer quality and credit insurance." : "Tài trợ không cần thế chấp bất động sản, dựa trên chất lượng Buyer và bảo hiểm tín dụng."}</p></div><span className="goal-card-arrow">↗</span></article>
          <article><span className="goal-card-index">03</span><div><h3>{english ? "Activate FTA corridors" : "Kích hoạt các hành lang FTA"}</h3><p>{english ? "Turn signed free-trade agreements into capital and trade flows across each corridor." : "Biến các hiệp định thương mại tự do Việt Nam đã ký thành dòng vốn và dòng hàng thật trên từng hành lang."}</p></div><span className="goal-card-arrow">↗</span></article>
          <article><span className="goal-card-index">04</span><div><h3>{english ? "New financial products" : "Sản phẩm tài chính mới"}</h3><p>{english ? "A standardized trade-finance asset for the Da Nang International Financial Centre." : "Một loại tài sản tài trợ thương mại chuẩn hóa cho Trung tâm Tài chính Quốc tế Đà Nẵng."}</p></div><span className="goal-card-arrow">↗</span></article>
        </div>
      </section>

      <section className="digital-asset-section section-pad" aria-labelledby="digital-asset-title">
        <header className="section-heading">
          <div className="section-kicker">{english ? "DIGITAL ASSET PRINCIPLES" : "YẾU TỐ TÀI SẢN SỐ"}</div>
          <h1 className="section-title" id="digital-asset-title">{english ? "A digitized receivable: one asset, one record, shared visibility." : "Khoản phải thu số hóa: một tài sản, một bản ghi, mọi bên cùng tin."}</h1>
        </header>
        <div className="digital-asset-copy">
          <p>{english ? "Each receivable is digitized into a record linked to its contract, documents and cash flow. The record follows the receivable from goods dispatch through settlement." : "Mỗi khoản phải thu được số hóa thành một bản ghi gắn với hợp đồng, chứng từ và dòng tiền. Bản ghi đi cùng khoản phải thu suốt vòng đời, từ khi hàng xuất đến khi tất toán."}</p>
          <div className="digital-asset-note">{english ? "Recognition of digitized receivables as digital assets is proposed for pilot consideration at the Da Nang International Financial Centre." : "Việc công nhận khoản phải thu số hóa là tài sản số đang được đề nghị thí điểm tại Trung tâm Tài chính Quốc tế Đà Nẵng."}</div>
        </div>
        <div className="digital-asset-points">
          <article><i className="teal"/><div><h3>{english ? "Unique identification" : "Định danh duy nhất"}</h3><p>{english ? "No receivable can be financed twice." : "Không khoản phải thu nào được tài trợ hai lần."}</p></div></article>
          <article><i className="navy"/><div><h3>{english ? "Transparent status" : "Trạng thái minh bạch"}</h3><p>{english ? "Authorized parties can track creation, confirmation and settlement." : "Khởi tạo, xác nhận, tất toán: các bên được cấp quyền cùng theo dõi."}</p></div></article>
          <article><i className="gold"/><div><h3>{english ? "Ready for global capital" : "Sẵn sàng cho vốn toàn cầu"}</h3><p>{english ? "Standardized data helps international funders assess Vietnamese assets." : "Dữ liệu chuẩn hóa giúp Funder quốc tế thẩm định tài sản từ Việt Nam."}</p></div></article>
        </div>
      </section>

      <section className="infrastructure-section section-pad" id="kien-truc-ha-tang" aria-labelledby="infrastructure-title">
        <div className="infra-heading">
          <div className="infra-heading-copy">
            <div className="section-kicker">{english ? "INFRASTRUCTURE ARCHITECTURE" : "KIẾN TRÚC HẠ TẦNG"}</div>
            <h1 className="section-title" id="infrastructure-title">{english ? "One trusted core, built for every corridor." : "Một lõi hạ tầng, kết nối thêm từng hành lang."}</h1>
            <p>{english ? "Exporter, warehouse, carrier, funder and bank data come together in one controlled workflow. CFN verifies, records and coordinates each connection according to local rules." : "Dữ liệu từ nhà xuất khẩu, kho, hãng tàu, Funder và ngân hàng đi vào một cổng duy nhất. Lõi CFN kiểm chứng, ghi nhận và điều phối; mỗi hành lang là một bộ kết nối được cấu hình theo pháp lý sở tại."}</p>
          </div>
          <div className="infra-status"><span className="infra-status-dot" />{english ? "VIETNAM CORE · UAE CORRIDOR" : "LÕI VIỆT NAM · HÀNH LANG UAE"}</div>
        </div>

        <div className="infra-diagram" aria-label={english ? "CFN infrastructure architecture diagram" : "Sơ đồ kiến trúc hạ tầng CFN"}>
          <div className="infra-column infra-sources">
            <div className="infra-column-label">{english ? "DATA SOURCES" : "NGUỒN DỮ LIỆU"}</div>
            <div className="infra-source-list">
              <article><i>01</i><span>{english ? "Exporter ERP" : "Hệ thống ERP của nhà xuất khẩu"}</span></article>
              <article><i>02</i><span>{english ? "Warehouse & inspection" : "Kho, giám định"}</span></article>
              <article><i>03</i><span>{english ? "Carrier & transport documents" : "Hãng tàu · vận đơn"}</span></article>
              <article><i>04</i><span>{english ? "Funders & investors" : "Funder, nhà đầu tư"}</span></article>
              <article><i>05</i><span>{english ? "Banks" : "Ngân hàng"}</span></article>
            </div>
          </div>

          <div className="infra-flow-arrow" aria-hidden="true"><span>→</span></div>

          <div className="infra-core-panel">
            <div className="infra-core-label"><span>{english ? "CFN CORE · DA NANG IFC" : "LÕI CFN · VIFC ĐÀ NẴNG"}</span><span className="infra-live"><i /> LIVE</span></div>
            <div className="infra-gateway"><div><span className="infra-gateway-icon">⌘</span><strong>API GATEWAY</strong></div><small>REST <b>·</b> WEBHOOKS <b>·</b> SFTP</small></div>
            <div className="infra-services">
              <article><span className="infra-service-icon">✓</span><div><h3>{english ? "Verification" : "Kiểm chứng"}</h3><p>{english ? "Match warehouse, carrier and bank data" : "Đối chiếu dữ liệu kho, hãng tàu và ngân hàng"}</p></div><b>01</b></article>
              <article><span className="infra-service-icon">◈</span><div><h3>{english ? "Receivable registry" : "Sổ đăng ký khoản phải thu"}</h3><p>{english ? "One record for each receivable, with status tracking" : "Một bản ghi cho mỗi khoản phải thu, theo dõi trạng thái"}</p></div><b>02</b></article>
              <article><span className="infra-service-icon">◎</span><div><h3>{english ? "Compliance" : "Tuân thủ"}</h3><p>KYB · KYC · AML · Travel Rule</p></div><b>03</b></article>
              <article><span className="infra-service-icon">⇄</span><div><h3>{english ? "Coordination" : "Điều phối"}</h3><p>{english ? "Match funders and infrastructure to each corridor" : "Chọn Funder và hạ tầng phù hợp cho từng hành lang"}</p></div><b>04</b></article>
            </div>
            <div className="infra-core-foot"><span><i />{english ? "ENCRYPTED DATA EXCHANGE" : "TRAO ĐỔI DỮ LIỆU MÃ HÓA"}</span><span>CFN / CORE</span></div>
          </div>

          <div className="infra-flow-arrow infra-flow-arrow-end" aria-hidden="true"><span>→</span></div>

          <div className="infra-column infra-corridors">
            <div className="infra-column-label">{english ? "CORRIDOR CONNECTIONS" : "KẾT NỐI HÀNH LANG"}</div>
            <article className="infra-corridor-card is-active"><div><strong>UAE</strong><span>{english ? "INITIAL" : "ĐẦU TIÊN"}</span></div><p>{english ? "ADGM regulatory framework" : "Pháp lý: ADGM"}<br />{english ? "Licensed funders" : "Funder: quỹ được cấp phép"}<br />{english ? "Local banking partner" : "Sổ cái: đối tác hành lang"}</p><i className="infra-corridor-signal" /></article>
            <article className="infra-corridor-card"><div><strong>{english ? "Singapore" : "Singapore"}</strong><span>{english ? "IN DESIGN" : "ĐANG THIẾT KẾ"}</span></div><p>{english ? "Local rules · funding · settlement" : "Pháp lý · nguồn vốn · thanh toán"}</p></article>
            <article className="infra-corridor-card"><div><strong>{english ? "Hong Kong" : "Hồng Kông"}</strong><span>{english ? "IN DESIGN" : "ĐANG THIẾT KẾ"}</span></div><p>{english ? "Local rules · funding · settlement" : "Pháp lý · nguồn vốn · thanh toán"}</p></article>
            <article className="infra-corridor-card"><div><strong>{english ? "Japan" : "Nhật Bản"}</strong><span>{english ? "IN DESIGN" : "ĐANG THIẾT KẾ"}</span></div><p>{english ? "Local rules · funding · settlement" : "Pháp lý · nguồn vốn · thanh toán"}</p></article>
          </div>
        </div>

        <div className="infra-layers">
          <div><span className="infra-layer-icon">▤</span><span><small>{english ? "RECORD LAYER" : "LỚP SỔ CÁI"}</small><strong>{english ? "Corridor-specific ledger partner" : "Đối tác blockchain trên từng hành lang"}</strong></span><b>01</b></div>
          <div><span className="infra-layer-icon gold">↗</span><span><small>{english ? "PAYMENT LAYER" : "LỚP THANH TOÁN"}</small><strong>{english ? "Phase 1: USD settlement through banks" : "Giai đoạn 1: USD qua ngân hàng"}</strong></span><b>02</b></div>
        </div>
        <p className="infra-footnote">{english ? "Phase 1: records may be mirrored on a ledger; USD moves through the banking system." : "Giai đoạn 1 ghi nhận trên blockchain song song; tiền đi bằng USD qua hệ thống ngân hàng."}</p>
      </section>

      <section className="corridor-overview-section section-pad" id="hanh-lang" aria-labelledby="corridor-overview-title">
        <header className="section-heading">
          <div className="section-kicker">{english ? "TRADE CORRIDORS" : "HÀNH LANG"}</div>
          <h1 className="section-title" id="corridor-overview-title">{english ? "Start with the UAE. Expand across Asia." : "Bắt đầu từ UAE, mở rộng khắp châu Á."}</h1>
        </header>
        <div className="corridor-overview-copy">
          <p>{english ? "Every corridor shares one verification standard. CFN can expand into new markets as local partners and operating requirements come together." : "Mỗi hành lang mới dùng chung chuẩn kiểm chứng. Doanh nghiệp đã vào CFN có thể mở rộng thị trường mới mà không làm lại từ đầu."}</p>
        </div>
        <div className="corridor-overview-list" aria-label={english ? "CFN trade corridor roadmap" : "Lộ trình hành lang CFN"}>
          <div className="corridor-overview-row is-active"><strong>{english ? "Vietnam – UAE" : "Việt Nam – UAE"}</strong><span>{english ? "FIRST CORRIDOR" : "HÀNH LANG ĐẦU TIÊN"}</span></div>
          <div className="corridor-overview-row"><strong>{english ? "Vietnam – Singapore" : "Việt Nam – Singapore"}</strong><span>{english ? "IN DESIGN" : "ĐANG THIẾT KẾ"}</span></div>
          <div className="corridor-overview-row"><strong>{english ? "Vietnam – Hong Kong" : "Việt Nam – Hồng Kông"}</strong><span>{english ? "IN DESIGN" : "ĐANG THIẾT KẾ"}</span></div>
          <div className="corridor-overview-row"><strong>{english ? "Vietnam – Japan" : "Việt Nam – Nhật Bản"}</strong><span>{english ? "IN DESIGN" : "ĐANG THIẾT KẾ"}</span></div>
        </div>
      </section>

      <section className="team-section" id="doi-ngu" aria-labelledby="team-title">
        <div className="team-inner">
          <div className="team-heading">
            <div><div className="section-kicker">{english ? "OUR TEAM" : "ĐỘI NGŨ"}</div><h1 className="section-title" id="team-title">{english ? "Built by a specialist alliance." : "Xây dựng bởi một liên minh chuyên môn."}</h1></div>
          </div>
          <div className="team-grid">
            <article className="team-card team-goe">
              <div className="team-image"><img className="team-logo-image team-logo-goe" src="/logo-goe-alliance.png" alt="GOE Alliance — Global On-Chain Economy" /></div>
              <div className="team-card-content"><h3>GOE ALLIANCE</h3><small>{english ? "FOUNDING ORGANIZATION" : "TỔ CHỨC SÁNG LẬP"}</small><p>{english ? "Founding organization and CFN initiative lead." : "Tổ chức sáng lập và khởi xướng CFN."}</p><a href="#lien-he">{english ? "Learn more" : "Tìm hiểu thêm"} <Arrow /></a></div>
            </article>
            <article className="team-card team-tdt">
              <div className="team-image"><img className="team-logo-image team-logo-tdt" src="/logo-tdt-asia.png" alt="TDT Asia logo" /></div>
              <div className="team-card-content"><h3>TDT ASIA</h3><small>{english ? "INFRASTRUCTURE TECHNOLOGY" : "CÔNG NGHỆ HẠ TẦNG"}</small><p>{english ? "Technology infrastructure partner." : "Đối tác công nghệ hạ tầng."}</p><a href="#lien-he">{english ? "Learn more" : "Tìm hiểu thêm"} <Arrow /></a></div>
            </article>
            <article className="team-card team-tbi">
              <div className="team-image"><img className="team-logo-image team-logo-tbi" src="/logo-tony-blair-institute.png" alt="Tony Blair Institute for Global Change logo" /></div>
              <div className="team-card-content"><h3>TONY BLAIR INSTITUTE</h3><small>{english ? "POLICY PARTNER" : "ĐỐI TÁC CHÍNH SÁCH"}</small><p>{english ? "Policy and ecosystem partner." : "Đối tác chính sách và hệ sinh thái."}</p><a href="#lien-he">{english ? "Learn more" : "Tìm hiểu thêm"} <Arrow /></a></div>
            </article>
          </div>
        </div>
      </section>

      <footer className="site-footer footer-connect" id="lien-he" aria-labelledby="footer-title">
        <svg className="footer-pattern" viewBox="0 0 720 700" fill="none" aria-hidden="true">
          <path d="M160-200C50 30 250 155 510 124S832-35 733-117C625-206 297-54 228 154S263 491 433 424 665 133 758 210 624 587 487 754" stroke="currentColor" strokeWidth="27" />
        </svg>
        <div className="footer-connect-inner">
          <div className="footer-connect-intro">
            <h2 id="footer-title">{english ? "Stay connected" : "Cùng kết nối"}</h2>
            <p>{english ? "Read our blogs for updates & project highlights" : "Theo dõi những cập nhật và dấu ấn mới của dự án."}</p>
          </div>
          <div className="footer-contact-details">
            <div className="footer-contact-block">
              <h3>{english ? "Get in touch" : "Liên hệ"}</h3>
              <a className="footer-phone" href="tel:+84964931661">(+84) 964 93 1661</a>
              <a className="footer-email" href="mailto:partner@goealliance.org">partner@goealliance.org</a>
            </div>
            <div className="footer-address-block">
              <h3>{english ? "Address" : "Địa chỉ"}</h3>
              <address>
                <strong>{english ? "GOE Alliance Office" : "Văn phòng GOE Alliance"}</strong>
                <span>{english ? "IFC Building, 8 Nguyen Hue Street, Saigon Ward, Ho Chi Minh City" : "Tòa nhà IFC, 8 Nguyễn Huệ, Phường Sài Gòn, Thành phố Hồ Chí Minh"}</span>
              </address>
            </div>
          </div>
        </div>
      </footer>
      <div className="scroll-end-blur" aria-hidden="true" />
    </main>
  );
}
