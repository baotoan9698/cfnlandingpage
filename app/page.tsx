"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

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

function LeadForm({ english }: { english: boolean }) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    window.setTimeout(() => { setSending(false); setSent(true); }, 500);
  }
  return (
    <section className="lead-section" id="lien-he">
      <div className="lead-shell">
        <div className="lead-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> {english ? "START WITH YOUR NEEDS" : "BẮT ĐẦU TỪ NHU CẦU CỦA BẠN"}</div>
          <h2>{english ? "Your receivables could be the starting point." : "Khoản phải thu của bạn có thể là điểm bắt đầu."}</h2>
          <p>{english ? "Share your export and funding needs. The CFN team will get in touch to explore a suitable transaction." : "Chia sẻ nhu cầu xuất khẩu và tài trợ. Đội ngũ CFN sẽ liên hệ để tìm hiểu giao dịch phù hợp."}</p>
          <a className="email-link" href="mailto:member@goealliance.org">member@goealliance.org <Arrow diagonal /></a>
        </div>
        <div className="form-card">
          {sent ? (
            <div className="success-state"><span className="success-icon">✓</span><h3>{english ? "Thank you for reaching out." : "Cảm ơn bạn đã gửi thông tin."}</h3><p>{english ? "This is a local preview. Your information has not been sent to a server." : "Đây là bản xem trước local. Thông tin chưa được gửi tới máy chủ."}</p><button className="text-button" onClick={() => setSent(false)}>{english ? "Send another request" : "Gửi một yêu cầu khác"} <Arrow /></button></div>
          ) : (
            <form onSubmit={submit}>
              <div className="form-heading"><span>FORM 01</span><span>{english ? "EXPORTER" : "NHÀ XUẤT KHẨU"}</span></div>
              <label>{english ? "Company name" : "Tên doanh nghiệp"}<input required name="company" placeholder={english ? "Legal company name" : "Tên pháp nhân"} /></label>
              <div className="form-row">
                <label>{english ? "Business email" : "Email công việc"}<input required type="email" name="email" placeholder="name@company.com" /></label>
                <label>{english ? "Export market" : "Thị trường xuất khẩu"}<select required name="market" defaultValue=""><option value="" disabled>{english ? "Select a market" : "Chọn thị trường"}</option><option>UAE</option><option>{english ? "Asia" : "Châu Á"}</option><option>{english ? "Europe" : "Châu Âu"}</option><option>{english ? "Other" : "Khác"}</option></select></label>
              </div>
              <div className="form-row">
                <label>{english ? "Industry" : "Ngành hàng"}<input required name="industry" placeholder={english ? "e.g. agriculture" : "Ví dụ: nông sản"} /></label>
                <label>{english ? "Funding need" : "Nhu cầu tài trợ"}<select required name="need" defaultValue=""><option value="" disabled>{english ? "Select an amount" : "Chọn quy mô"}</option><option>{english ? "Under USD 100,000" : "Dưới 100.000 USD"}</option><option>USD 100,000–500,000</option><option>{english ? "Over USD 500,000" : "Trên 500.000 USD"}</option><option>{english ? "Let's discuss" : "Cần trao đổi"}</option></select></label>
              </div>
              <label className="check-row"><input type="checkbox" required /> {english ? "I agree to be contacted by CFN about this request." : "Tôi đồng ý để CFN liên hệ về nhu cầu này."}</label>
              <button className="button button-dark form-submit" type="submit" disabled={sending}>{sending ? (english ? "Sending…" : "Đang gửi…") : (english ? "Submit request" : "Gửi nhu cầu")} <Arrow /></button>
              <p className="form-note">{english ? "Local demo: information is not stored or sent." : "Bản demo local: thông tin không được lưu hoặc gửi đi."}</p>
            </form>
          )}
        </div>
      </div>
    </section>
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
      '#top .hero-copy h1, #top .hero-copy .hero-description, #top .hero-copy .hero-actions, #top .hero-copy .hero-footnote, #top section:not(.mission-section) .section-kicker, #top section:not(.mission-section) .eyebrow, #top section:not(.mission-section) h2, #top section:not(.mission-section) h3, #top section:not(.mission-section) p, #top .metric-index, #top .metric-strip strong, #top .metric-note, #top .process-no, #top .process-tag, #top .stage > *, #top .record-step > *, #top .form-card label, #top .form-heading, #top .footer-brand p, #top .footer-links > div > *, #top .footer-bottom > *'
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
            <a href="#hanh-lang">{english ? "Projects" : "Dự án"}</a><a href="#mo-hinh">{english ? "Model" : "Mô hình"}</a><a href="#ha-tang">{english ? "Infrastructure" : "Hạ tầng"}</a><a href="#lien-he">{english ? "Our team" : "Đội ngũ"}</a><a href="#doanh-nghiep">{english ? "Exporters" : "Nhà xuất khẩu"}</a>
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
          <h2>{english ? <>Goods delivered, capital still waiting.<br /><span>CFN changes that.</span></> : <>Hàng đã giao, vốn vẫn chờ.<br /><span>CFN thay đổi điều đó.</span></>}</h2>
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
          <h2 id="mission-title">{english ? "Turn Vietnamese businesses’ receivables into trusted, fundable assets for the world." : "Đưa khoản phải thu của doanh nghiệp Việt Nam trở thành nguồn vốn mà thế giới có thể tin cậy và tài trợ."}</h2>
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
            <h2 id="national-goal-title">{english ? <>Connect Vietnam’s International Financial Centre to the real economy.</> : <>Góp phần đưa Trung tâm Tài chính Quốc tế Việt Nam gắn với nền kinh tế thực</>}</h2>
          </div>
          <div className="goal-graphic" aria-hidden="true"><span className="goal-orbit goal-orbit-one"/><span className="goal-orbit goal-orbit-two"/><span className="goal-orbit-track goal-orbit-track-a"><span className="goal-node goal-node-a"/></span><span className="goal-orbit-track goal-orbit-track-b"><span className="goal-node goal-node-b"/></span><span className="goal-orbit-track goal-orbit-track-c"><span className="goal-node goal-node-c"/></span><span className="goal-core"><svg className="vn-flag" viewBox="0 0 60 40"><rect width="60" height="40" rx="3" fill="#DA251D"/><path d="m30 7 5.4 16.6-14.1-10.3h17.4L24.6 23.6 30 7Z" fill="#FFFF00"/></svg></span><span className="goal-graphic-label">TRADE · CAPITAL · TRUST</span></div>
        </div>
        <div className="national-goal-grid">
          <article><span className="goal-card-index">01</span><div><h3>{english ? "International capital for exports" : "Vốn quốc tế vào xuất khẩu"}</h3><p>{english ? "Open channels for international trade finance to Vietnamese businesses and complement domestic credit." : "Mở kênh vốn thương mại quốc tế cho doanh nghiệp Việt Nam, bổ sung cho tín dụng trong nước."}</p></div><span className="goal-card-arrow">↗</span></article>
          <article><span className="goal-card-index">02</span><div><h3>{english ? "Small and medium businesses" : "Doanh nghiệp vừa và nhỏ"}</h3><p>{english ? "Financing without real-estate collateral, informed by buyer quality and credit insurance." : "Tài trợ không cần thế chấp bất động sản, dựa trên chất lượng Buyer và bảo hiểm tín dụng."}</p></div><span className="goal-card-arrow">↗</span></article>
          <article><span className="goal-card-index">03</span><div><h3>{english ? "Activate FTA corridors" : "Kích hoạt các hành lang FTA"}</h3><p>{english ? "Turn signed free-trade agreements into capital and trade flows across each corridor." : "Biến các hiệp định thương mại tự do Việt Nam đã ký thành dòng vốn và dòng hàng thật trên từng hành lang."}</p></div><span className="goal-card-arrow">↗</span></article>
          <article><span className="goal-card-index">04</span><div><h3>{english ? "New financial products" : "Sản phẩm tài chính mới"}</h3><p>{english ? "A standardized trade-finance asset for the Da Nang International Financial Centre." : "Một loại tài sản tài trợ thương mại chuẩn hóa cho Trung tâm Tài chính Quốc tế Đà Nẵng."}</p></div><span className="goal-card-arrow">↗</span></article>
        </div>
      </section>

      <section className="digital-asset-section section-pad" aria-labelledby="digital-asset-title">
        <div className="digital-asset-copy">
          <div className="section-kicker">{english ? "DIGITAL ASSET PRINCIPLES" : "YẾU TỐ TÀI SẢN SỐ"}</div>
          <h2 id="digital-asset-title">{english ? "A digitized receivable: one asset, one record, shared visibility." : "Khoản phải thu số hóa: một tài sản, một bản ghi, mọi bên cùng tin."}</h2>
          <p>{english ? "Each receivable is digitized into a record linked to its contract, documents and cash flow. The record follows the receivable from goods dispatch through settlement." : "Mỗi khoản phải thu được số hóa thành một bản ghi gắn với hợp đồng, chứng từ và dòng tiền. Bản ghi đi cùng khoản phải thu suốt vòng đời, từ khi hàng xuất đến khi tất toán."}</p>
          <div className="digital-asset-note">{english ? "Recognition of digitized receivables as digital assets is proposed for pilot consideration at the Da Nang International Financial Centre." : "Việc công nhận khoản phải thu số hóa là tài sản số đang được đề nghị thí điểm tại Trung tâm Tài chính Quốc tế Đà Nẵng."}</div>
        </div>
        <div className="digital-asset-points">
          <article><i className="teal"/><div><h3>{english ? "Unique identification" : "Định danh duy nhất"}</h3><p>{english ? "No receivable can be financed twice." : "Không khoản phải thu nào được tài trợ hai lần."}</p></div></article>
          <article><i className="navy"/><div><h3>{english ? "Transparent status" : "Trạng thái minh bạch"}</h3><p>{english ? "Authorized parties can track creation, confirmation and settlement." : "Khởi tạo, xác nhận, tất toán: các bên được cấp quyền cùng theo dõi."}</p></div></article>
          <article><i className="gold"/><div><h3>{english ? "Ready for global capital" : "Sẵn sàng cho vốn toàn cầu"}</h3><p>{english ? "Standardized data helps international funders assess Vietnamese assets." : "Dữ liệu chuẩn hóa giúp Funder quốc tế thẩm định tài sản từ Việt Nam."}</p></div></article>
        </div>
      </section>

      <section className="audiences" id="doanh-nghiep">
        <div className="audience-panel exporter-panel">
          <div className="audience-top"><span>02 / {english ? "EXPORTERS" : "NHÀ XUẤT KHẨU"}</span><span>01 — 02</span></div>
          <div className="audience-body"><div className="audience-copy"><div className="eyebrow"><span className="eyebrow-line" /> {english ? "FOR BUSINESSES" : "DÀNH CHO DOANH NGHIỆP"}</div><h2>{english ? "Your assets deserve to be clearly understood." : "Tài sản của bạn xứng đáng được nhìn thấy rõ."}</h2><p>{english ? "Submit transaction data and documents in a structured case file. Track receivable verification and status at every step." : "Gửi dữ liệu giao dịch và chứng từ vào một bộ hồ sơ có cấu trúc. Theo dõi việc kiểm chứng và trạng thái khoản phải thu qua từng bước."}</p><a className="button button-dark" href="#lien-he">{english ? "Share your funding needs" : "Chia sẻ nhu cầu tài trợ"} <Arrow /></a></div>
            <div className="mini-workspace"><div className="mini-head"><span>{english ? "RECEIVABLE CASE" : "HỒ SƠ KHOẢN PHẢI THU"}</span><span className="status-pill"><i /> {english ? "UNDER REVIEW" : "ĐANG KIỂM CHỨNG"}</span></div><div className="mini-title">{english ? "Export case" : "Bộ hồ sơ xuất khẩu"} <b>CFN–0248</b></div><div className="mini-data"><div><span>{english ? "BUYER" : "BÊN MUA"}</span><strong>Gulf Trading LLC</strong></div><div><span>{english ? "INVOICE VALUE" : "GIÁ TRỊ HÓA ĐƠN"}</span><strong>USD 248,600</strong></div><div><span>{english ? "TENOR" : "KỲ HẠN"}</span><strong>{english ? "90 days" : "90 ngày"}</strong></div></div><div className="progress-list"><div className="progress-row"><span className="progress-check">✓</span><span>{english ? "Documents received" : "Chứng từ được tiếp nhận"}</span><b>{english ? "Complete" : "Hoàn tất"}</b></div><div className="progress-row"><span className="progress-check">✓</span><span>{english ? "Data matched" : "Đối chiếu dữ liệu"}</span><b>{english ? "Complete" : "Hoàn tất"}</b></div><div className="progress-row progress-current"><span className="progress-ring" /><span>{english ? "Bank confirmation check" : "Kiểm tra xác nhận ngân hàng"}</span><b>{english ? "In progress" : "Đang xử lý"}</b></div></div><div className="mini-foot"><span>{english ? "INTERFACE DEMO" : "DEMO GIAO DIỆN"}</span><span>{english ? "01 CASE FILE" : "01 BỘ HỒ SƠ"} <Arrow /></span></div></div>
          </div>
        </div>
        <div className="audience-panel funder-panel" id="funder">
          <div className="audience-top"><span>03 / {english ? "FUNDERS" : "TỔ CHỨC TÀI TRỢ"}</span><span>02 — 02</span></div>
          <div className="audience-body"><div className="funder-visual"><div className="funder-orbit orbit-a" /><div className="funder-orbit orbit-b" /><div className="funder-core"><span>CFN</span><small>VERIFIED<br />RECEIVABLE</small></div><div className="funder-chip chip-one">DOCUMENTS <b>✓</b></div><div className="funder-chip chip-two">BANK EVENT <b>✓</b></div><div className="funder-chip chip-three">UNIQUE RECORD <b>✓</b></div></div>
            <div className="audience-copy"><div className="eyebrow"><span className="eyebrow-line" /> {english ? "FOR FUNDERS" : "DÀNH CHO FUNDER"}</div><h2>{english ? "Underwrite with data tied to real trade." : "Thẩm định trên dữ liệu gắn với giao dịch thật."}</h2><p>{english ? "Review structured case files, document trails and receivable status to support your underwriting process." : "Nhận bộ hồ sơ đã chuẩn hóa, dấu vết chứng từ và trạng thái khoản phải thu để phục vụ quá trình thẩm định của tổ chức tài trợ."}</p><a className="button button-outline" href="#lien-he">{english ? "Discuss a partnership" : "Trao đổi hợp tác"} <Arrow diagonal /></a></div>
          </div>
        </div>
      </section>

      <section className="process-section section-pad" id="quy-trinh">
        <div className="section-kicker">04 / {english ? "TRADE FLOW" : "LUỒNG GIAO DỊCH"}</div>
        <div className="process-heading"><h2>{english ? <>From trade events<br />to accountable capital.</> : <>Từ sự kiện hàng hóa<br />đến dòng tiền có căn cứ.</>}</h2><p>{english ? "The initial corridor is designed for export receivables backed by letters of credit (L/C) between Vietnam and the UAE." : "Luồng giai đoạn đầu được thiết kế cho khoản phải thu xuất khẩu có thư tín dụng (L/C) trên hành lang Việt Nam–UAE."}</p></div>
        <div className="process-grid">
          <article className="process-card"><span className="process-no">01</span><div className="process-icon warehouse-icon"><span /><span /><span /></div><h3>{english ? "Goods enter storage" : "Hàng vào kho"}</h3><p>{english ? "An independent warehouse or inspector verifies the goods’ condition and quantity." : "Kho độc lập hoặc đơn vị giám định xác nhận tình trạng và số lượng hàng."}</p><div className="process-tag">{english ? "WAREHOUSE · INSPECTOR" : "KHO · GIÁM ĐỊNH"}</div></article>
          <article className="process-card"><span className="process-no">02</span><div className="process-icon"><div className="paper-icon"><i /><i /><i /></div></div><h3>{english ? "Documents presented" : "Chứng từ được xuất trình"}</h3><p>{english ? "The exporter submits the documents. The bank confirms receipt or acceptance under the L/C process." : "Doanh nghiệp nộp bộ chứng từ. Ngân hàng xác nhận việc tiếp nhận/chấp nhận theo quy trình L/C."}</p><div className="process-tag">EXPORTER · {english ? "BANK" : "NGÂN HÀNG"}</div></article>
          <article className="process-card process-highlight"><span className="process-no">03</span><div className="process-icon"><span className="dtr-icon">dTR</span></div><h3>{english ? "CFN verifies and records" : "CFN kiểm chứng và ghi nhận"}</h3><p>{english ? "CFN matches the data, updates status and creates a digital receivable record." : "CFN đối chiếu dữ liệu, cập nhật trạng thái và lập bản ghi điện tử cho khoản phải thu."}</p><div className="process-tag">CFN · {english ? "DATA" : "DỮ LIỆU"}</div></article>
          <article className="process-card"><span className="process-no">04</span><div className="process-icon"><div className="bank-icon"><span /><span /><span /></div></div><h3>{english ? "Funding and settlement" : "Các bên xử lý vốn và tiền"}</h3><p>{english ? "The funder underwrites and decides on financing. The bank manages the collection account and cash flow." : "Funder thẩm định và quyết định tài trợ. Ngân hàng quản lý tài khoản thu và thực hiện dòng tiền."}</p><div className="process-tag">FUNDER · {english ? "BANK" : "NGÂN HÀNG"}</div></article>
        </div>
        <div className="process-note"><span className="note-star">✳</span><p><b>{english ? "Clear roles:" : "Vai trò được phân định rõ:"}</b> {english ? "CFN provides data and verification; it does not fund, hold money or act as the secured party." : "CFN cung cấp dữ liệu và kiểm chứng; CFN không cấp vốn, không nắm giữ tiền và không đứng tên tài sản bảo đảm."}</p><a href="#ha-tang">{english ? "Operating principles" : "Xem nguyên tắc vận hành"} <Arrow /></a></div>
      </section>

      <section className="record-section" id="ha-tang">
        <div className="record-inner">
          <div className="record-copy"><div className="eyebrow"><span className="eyebrow-line" /> {english ? "DIGITAL RECEIVABLE RECORD" : "BẢN GHI ĐIỆN TỬ KHOẢN PHẢI THU"}</div><h2>{english ? <>One receivable.<br /><span>One traceable record.</span></> : <>Một khoản phải thu.<br /><span>Một bản ghi có thể truy nguyên.</span></>}</h2><p>{english ? "A dTR represents a claim arising from a trade transaction. Its status changes only when an authorized party confirms a real-world event." : "dTR phản ánh quyền đòi nợ đã phát sinh từ giao dịch thương mại. Trạng thái chỉ thay đổi khi có sự kiện thực tế được bên có thẩm quyền xác nhận."}</p><a className="button button-lime" href="#hanh-lang">{english ? "Explore the corridor" : "Khám phá hành lang"} <Arrow /></a></div>
          <div className="record-board"><div className="board-head"><span>CFN / DIGITAL RECORD</span><span>VN—UAE / L-C</span></div><div className="record-line"><div className="record-step"><span className="record-dot dot-empty" /><div><b>{english ? "CREATED" : "KHỞI TẠO"}</b><small>{english ? "Goods in storage · Confirmed" : "Hàng vào kho · Có xác nhận"}</small></div><time>01</time></div><div className="record-step"><span className="record-dot dot-active" /><div><b>{english ? "ESTABLISHED" : "XÁC LẬP"}</b><small>{english ? "L/C documents accepted" : "Chứng từ L/C được chấp nhận"}</small></div><time>02</time></div><div className="record-step"><span className="record-dot dot-empty" /><div><b>{english ? "SETTLED" : "TẤT TOÁN"}</b><small>{english ? "Payment confirmed by bank" : "Ngân hàng xác nhận thanh toán"}</small></div><time>03</time></div></div><div className="record-hash"><span>RECORD HASH</span><code>0x8f2c…a91d</code><span className="lock-icon">⌑</span></div><div className="record-disclaimer">{english ? "Illustrative data structure. Not an actual financing offer." : "Minh họa cấu trúc dữ liệu. Không phải khoản tài trợ thực tế."}</div></div>
        </div>
      </section>

      <section className="corridor-section section-pad" id="hanh-lang">
        <div className="section-kicker">05 / {english ? "TRADE CORRIDOR" : "HÀNH LANG THƯƠNG MẠI"}</div>
        <div className="corridor-content"><div><div className="eyebrow"><span className="eyebrow-line" /> {english ? "STARTING WITH VIETNAM — UAE" : "BẮT ĐẦU TỪ VIỆT NAM — UAE"}</div><h2>{english ? <>One initial corridor.<br /><span>A scalable data standard.</span></> : <>Một hành lang đầu tiên.<br /><span>Một chuẩn dữ liệu có thể mở rộng.</span></>}</h2><p>{english ? "Phase 1 focuses on L/C-backed receivables. Future phases may add documentary collections, industries and markets as operating conditions allow." : "Giai đoạn 1 tập trung vào khoản phải thu có L/C. Các giai đoạn tiếp theo dự kiến bổ sung nhờ thu chứng từ, ngành hàng và thị trường mới khi điều kiện vận hành đáp ứng."}</p></div>
          <div className="corridor-map"><div className="map-lines" /><div className="map-route" /><div className="map-point point-vn"><i /><span>{english ? "VIETNAM" : "VIỆT NAM"}</span><small>{english ? "Exporter · Warehouse · Bank" : "Exporter · Kho · Ngân hàng"}</small></div><div className="map-point point-uae"><i /><span>UAE</span><small>{english ? "Importer · L/C issuing bank" : "Importer · Ngân hàng phát hành L/C"}</small></div><div className="map-center"><span>CFN</span><small>VERIFIED<br />TRADE DATA</small></div><div className="map-label">L/C · RECEIVABLES</div><div className="map-compass">N<br />↑</div></div>
        </div>
        <div className="corridor-stages"><div className="stage active"><span>{english ? "PHASE 01" : "GIAI ĐOẠN 01"}</span><b>{english ? "L/C-backed receivables" : "Khoản phải thu có L/C"}</b><small>{english ? "Vietnam — UAE" : "Việt Nam — UAE"}</small><i>{english ? "Initial corridor" : "Hành lang khởi đầu"}</i></div><div className="stage"><span>{english ? "PHASE 02" : "GIAI ĐOẠN 02"}</span><b>{english ? "Documentary collections" : "Nhờ thu chứng từ"}</b><small>{english ? "Add industries and partners" : "Bổ sung ngành hàng và đối tác"}</small><i>{english ? "Planned expansion" : "Dự kiến mở rộng"}</i></div><div className="stage"><span>{english ? "PHASE 03" : "GIAI ĐOẠN 03"}</span><b>{english ? "Insured open account" : "Ghi sổ có bảo hiểm"}</b><small>{english ? "Expand CEPA markets" : "Mở rộng thị trường CEPA"}</small><i>{english ? "Planned expansion" : "Dự kiến mở rộng"}</i></div></div>
      </section>

      <section className="trust-section">
        <div className="trust-head"><span className="section-kicker">06 / {english ? "INFRASTRUCTURE PRINCIPLES" : "NGUYÊN TẮC HẠ TẦNG"}</span><h2>{english ? <>Built around trust.<br /><span>Operated with clear roles.</span></> : <>Thiết kế quanh niềm tin.<br /><span>Vận hành bằng phân vai.</span></>}</h2></div>
        <div className="trust-grid"><article><span>01</span><h3>{english ? "Sourced data" : "Dữ liệu có nguồn"}</h3><p>{english ? "Every status links to a verified document or event." : "Mỗi trạng thái gắn với chứng từ hoặc sự kiện được xác nhận."}</p></article><article><span>02</span><h3>{english ? "Clear access rights" : "Quyền truy cập rõ"}</h3><p>{english ? "Information is shared with the right participant for the right purpose." : "Thông tin được chia sẻ cho đúng bên tham gia và đúng mục đích."}</p></article><article><span>03</span><h3>{english ? "Bank-managed cash flow" : "Dòng tiền qua ngân hàng"}</h3><p>{english ? "Payments in Vietnam are handled through commercial banks." : "Thanh toán tại Việt Nam thực hiện qua ngân hàng thương mại."}</p></article><article><span>04</span><h3>{english ? "Separated responsibilities" : "Tách biệt trách nhiệm"}</h3><p>{english ? "CFN verifies data; the funder decides on financing; the bank manages funds and collateral." : "CFN kiểm chứng dữ liệu; Funder quyết định cấp vốn; ngân hàng quản lý tiền và tài sản bảo đảm."}</p></article></div>
      </section>

      <LeadForm english={english} />
      <footer className="site-footer"><div className="footer-main"><div className="footer-brand"><Mark light /><p>{english ? <>Data and verification infrastructure<br />for trade finance.</> : <>Hạ tầng dữ liệu và kiểm chứng<br />cho tài trợ thương mại.</>}</p></div><div className="footer-links"><div><span>{english ? "EXPLORE" : "KHÁM PHÁ"}</span><a href="#mo-hinh">{english ? "CFN model" : "Mô hình CFN"}</a><a href="#quy-trinh">{english ? "Process" : "Quy trình"}</a><a href="#hanh-lang">{english ? "Trade corridor" : "Hành lang"}</a></div><div><span>{english ? "FOR" : "DÀNH CHO"}</span><a href="#doanh-nghiep">{english ? "Exporters" : "Nhà xuất khẩu"}</a><a href="#funder">{english ? "Funders" : "Tổ chức tài trợ"}</a><a href="#lien-he">{english ? "Partners" : "Đối tác"}</a></div><div><span>{english ? "CONTACT" : "LIÊN HỆ"}</span><a href="mailto:member@goealliance.org">member@goealliance.org</a><a href="#top">{english ? "Da Nang, Vietnam" : "Đà Nẵng, Việt Nam"}</a></div></div></div><div className="footer-bottom"><span>© 2026 GOE CFN</span><span>{english ? "DIGITAL TRADE FINANCE INFRASTRUCTURE" : "HẠ TẦNG TÀI TRỢ THƯƠNG MẠI SỐ"}</span><a href="#top">{english ? "Back to top ↑" : "Về đầu trang ↑"}</a></div></footer>
      <div className="scroll-end-blur" aria-hidden="true" />
    </main>
  );
}
