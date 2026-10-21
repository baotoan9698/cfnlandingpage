"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import s from "./exporter.module.css";

const photos = {
  port: "/exporter/container-ship-at-the-hai-phong-international.jpg",
  cargo: "/exporter/rio-saigon-ciudad-ho-chi-minh-vietnam.jpg",
  containers: "/exporter/thi-nai-port-containers.jpg",
};
const journey = [
  ["Ký hợp đồng", "Bạn và Buyer ký hợp đồng mua bán, thống nhất thanh toán trả chậm (O/A).", "CFN ghi nhận hợp đồng"],
  ["Giao hàng", "Lưu kho, thông quan và xếp hàng lên tàu theo quy trình xuất khẩu hiện tại.", "Phiếu kho · Vận đơn"],
  ["Hoàn thiện chứng từ", "Hóa đơn, vận đơn và bộ chứng từ đầy đủ để khoản phải thu được kiểm chứng.", "Khởi tạo khoản phải thu"],
  ["Bán khoản phải thu", "Funder mua khoản phải thu và giải ngân phần ứng trước về tài khoản ngân hàng của bạn.", "Xác nhận giao dịch"],
  ["Buyer thanh toán", "Khi đến hạn, Buyer trả toàn bộ giá trị hóa đơn vào tài khoản thu chỉ định của Funder.", "Ghi nhận thanh toán"],
  ["Tất toán", "Funder giữ phần đã ứng cộng chi phí, chuyển phần còn lại cho bạn.", "Hoàn tất hồ sơ"],
];
const eligibility = [
  { name: "Nhà xuất khẩu", description: "Nền tảng của hồ sơ là hoạt động xuất khẩu và năng lực tài chính của doanh nghiệp.", items: ["Pháp nhân Việt Nam, có hoạt động xuất khẩu từ 2 năm", "Báo cáo tài chính 2 năm gần nhất", "Không có nợ xấu trên CIC", "Tài khoản ngoại tệ tại ngân hàng đối tác"] },
  { name: "Buyer", description: "Chất lượng người mua và bảo hiểm tín dụng là cơ sở để Funder xem xét khoản phải thu.", items: ["Doanh nghiệp uy tín tại UAE trong Giai đoạn 1", "Có hạn mức bảo hiểm tín dụng", "Xác nhận hóa đơn và thông báo chuyển giao", "Ưu tiên Buyer đã có lịch sử mua hàng của bạn"] },
  { name: "Khoản phải thu", description: "Một giao dịch thật, đã giao hàng và có bộ chứng từ có thể đối chiếu.", items: ["Trả chậm O/A, kỳ hạn tới 120 ngày", "Hàng đã xếp tàu, chứng từ đầy đủ", "Chưa cầm cố, chưa bán cho bên khác", "Giai đoạn 1 ưu tiên nông sản và thực phẩm"] },
];
const onboarding = [
  ["Đăng ký quan tâm", "Thông tin doanh nghiệp và danh sách Buyer."],
  ["Thẩm định sơ bộ", "KYC, tài chính và lịch sử xuất khẩu."],
  ["Duyệt hạn mức", "Funder xét hạn mức theo từng Buyer."],
  ["Ký hợp đồng khung", "Bán khoản phải thu, tài khoản thu và bảo hiểm."],
  ["Giao dịch đầu tiên", "Lô hàng sau chỉ cần nộp bộ chứng từ."],
];
const faq = [
  ["Buyer có được thông báo?", "Có. Việc chuyển giao quyền đòi nợ được thông báo bằng văn bản cho Buyer theo pháp luật Việt Nam. Buyer xác nhận hóa đơn và thanh toán vào tài khoản thu chỉ định."],
  ["Nếu Buyer không trả?", "Theo mô hình dự kiến, Funder chịu rủi ro Buyer không thanh toán trong phạm vi bảo hiểm tín dụng. Bạn chịu trách nhiệm khi hàng bị tranh chấp, hóa đơn bị giảm giá trị hoặc có gian lận. Phạm vi cụ thể theo hợp đồng tài trợ và bảo hiểm."],
  ["Có dùng hạn mức ngân hàng?", "Ở Giai đoạn 1, quỹ quốc tế mua khoản phải thu của bạn, không dùng hạn mức tín dụng tại ngân hàng của bạn."],
  ["CFN có giữ tiền?", "Không. CFN kiểm chứng chứng từ và ghi nhận khoản phải thu. Tiền đi từ Funder và Buyer qua ngân hàng, về tài khoản của bạn."],
  ["Ai được xem dữ liệu?", "Theo mô hình dự kiến, dữ liệu chỉ được chia sẻ với Funder và ngân hàng tham gia giao dịch của bạn. Liên hệ CFN để nhận thông tin về phạm vi chia sẻ và chính sách bảo mật trước khi cung cấp hồ sơ."],
];
function Arrow() { return <span aria-hidden="true">↗</span>; }
function money(value: number) { return new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(value); }

export default function ExporterPage() {
  const root = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [invoice, setInvoice] = useState("100000");
  const [advance, setAdvance] = useState(90);
  const [days, setDays] = useState(90);
  const [group, setGroup] = useState(0);
  const [draft, setDraft] = useState("");
  const invoiceNumber = Number(invoice);
  const validInvoice = invoice !== "" && Number.isFinite(invoiceNumber) && invoiceNumber >= 1000 && invoiceNumber <= 10000000;
  const amount = validInvoice ? invoiceNumber : 0;
  const funded = Math.round(amount * advance / 100);
  useEffect(() => {
    document.documentElement.lang = "vi";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        element.classList.add(s.revealed);
        observer.unobserve(element);
      });
    }, { threshold: 0.1 });
    root.current?.querySelectorAll("[data-reveal]").forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  function prepareRegistration(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fields = [["company", "Tên doanh nghiệp"], ["tax", "Mã số thuế"], ["industry", "Ngành hàng"], ["turnover", "Kim ngạch sang UAE, 12 tháng"], ["buyers", "Số Buyer hiện hữu tại UAE"], ["contact", "Người liên hệ"], ["email", "Email"]];
    const body = "Kính gửi CFN,\n\nTôi muốn đăng ký quan tâm đợt thí điểm Việt Nam–UAE Q4/2026.\n\n" + fields.map(([key, label]) => `${label}: ${String(data.get(key) || "").trim()}`).join("\n") + "\n\nVui lòng liên hệ để trao đổi điều kiện tham gia. Xin cảm ơn.";
    setDraft(`mailto:member@goealliance.org?subject=${encodeURIComponent("Đăng ký quan tâm CFN — Nhà xuất khẩu")}&body=${encodeURIComponent(body)}`);
  }
  return <div ref={root} className={s.page} id="top">
    <a href="#noi-dung" className={s.skip}>Đến nội dung chính</a>
    <header className={s.header}>
      <Link href="/" className={s.brand} aria-label="CFN — Trang chủ"><span className={s.brandIcon} aria-hidden="true"><i /><i /><i /></span>CFN<span className={s.brandBy}>by GOE</span></Link>
      <button className={s.menuButton} onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="exporter-navigation">{menuOpen ? "Đóng ×" : "Menu +"}</button>
      <nav id="exporter-navigation" className={`${s.nav} ${menuOpen ? s.navOpen : ""}`} aria-label="Điều hướng Nhà xuất khẩu" onClick={() => setMenuOpen(false)}>
        <Link href="/">Trang chủ</Link><a href="#quy-trinh">Quy trình</a><a href="#dong-tien">Dòng tiền</a><a href="#dieu-kien">Điều kiện</a><a href="#hoi-dap">Hỏi đáp</a>
        <a href="#dang-ky" className={s.primary}>Đăng ký thí điểm <Arrow /></a>
      </nav>
    </header>
    <main id="noi-dung">
      <section className={s.hero} aria-labelledby="exporter-title">
        <div className={s.masthead}>
          <div className={s.heroPhoto}><img src={photos.port} alt="Tàu container và cần cẩu tại cảng quốc tế Hải Phòng" width="1920" height="2880" fetchPriority="high" /><span>Cảng Hải Phòng, Việt Nam</span></div>
          <div className={s.pilot}><div className={s.route}>Việt Nam<br />UAE <span aria-hidden="true">↗</span></div><div className={s.pilotDetails}><strong>Thí điểm Q4/2026</strong><p>Ưu tiên nông sản và thực phẩm, thanh toán theo phương thức trả chậm O/A.</p></div></div>
        </div>
        <div className={s.heroCopy}>
          <div className={s.heroLead}><p>CFN kết nối nhà xuất khẩu với Funder được cấp phép, để nhận trước giá trị khoản phải thu.</p><a href="#dang-ky" className={s.primary}>Đăng ký thí điểm <Arrow /></a></div>
          <h1 id="exporter-title">Vốn về sớm.<br />Hàng đi xa.</h1>
        </div>
        <div className={s.heroBottom}><span>Tiền về tài khoản ngân hàng Việt Nam.</span><a href="#quy-trinh">Khám phá cách CFN hoạt động <span aria-hidden="true">↓</span></a></div>
      </section>
      <section className={`${s.section} ${s.intro}`} aria-labelledby="intro-title">
        <div className={s.introVisual} data-reveal><div className={s.waiting}>30–90<span>ngày chờ Buyer thanh toán</span></div><img src={photos.cargo} alt="Hoạt động xếp dỡ container bên sông Sài Gòn" width="1920" height="1114" loading="lazy" /></div>
        <div><h2 id="intro-title" data-reveal>Vốn không cần chờ.</h2><p className={s.lead} data-reveal>Hàng đã giao, tiền vẫn nằm ở Buyer. CFN mở thêm một cách tiếp cận vốn từ chính khoản phải thu xuất khẩu.</p>
          <div className={s.arguments}>
            <div data-reveal><h3>Ứng trước giá trị hóa đơn</h3><p>Nhận phần lớn giá trị hóa đơn khi chứng từ đầy đủ và Funder chấp thuận, thay vì chờ hết kỳ hạn.</p></div>
            <div data-reveal><h3>Dựa trên giao dịch thật</h3><p>Chất lượng Buyer và bảo hiểm tín dụng là cơ sở tài trợ, không dựa trên thế chấp bất động sản. Hạn chế thêm áp lực lên hạn mức vay và thủ tục L/C.</p></div>
            <div data-reveal><h3>Một hồ sơ, nhiều Funder</h3><p>Cùng một chuẩn kiểm chứng, thêm lựa chọn nguồn vốn mà không phải bắt đầu lại thủ tục.</p></div>
          </div>
        </div>
      </section>
      <section id="quy-trinh" className={`${s.section} ${s.process}`} aria-labelledby="process-title">
        <div className={s.sectionTop}><p data-reveal>Quy trình xuất khẩu của bạn được giữ nguyên. CFN ghi nhận song song để Funder kiểm chứng và xem xét giải ngân.</p><h2 id="process-title" data-reveal>Từ giao hàng<br />đến nhận tiền.</h2></div>
        <ol className={s.journey}>{journey.map(([title, detail, record]) => <li key={title} data-reveal><h3>{title}</h3><p>{detail}</p><span>{record}</span></li>)}</ol>
        <p className={s.note}>CFN không giữ hàng, không giữ tiền. Nguồn tiền được chuyển qua hệ thống ngân hàng.</p>
      </section>
      <section id="dong-tien" className={`${s.section} ${s.cashSection}`} aria-labelledby="cash-title">
        <div className={s.sectionTop}><p data-reveal>Một lô hàng 100.000 USD, ứng trước 90%: bạn nhận 90.000 USD khi được giải ngân và phần còn lại sau tất toán, trừ chi phí.</p><h2 id="cash-title" data-reveal>Dòng tiền,<br />nhìn rõ.</h2></div>
        <div className={s.cashGrid}>
          <div className={s.cashOutput} data-reveal aria-live="polite" aria-atomic="true">
            <div className={s.cashAmount}>{validInvoice ? money(funded) : "—"}<span>USD</span></div><p>Khoản ứng trước của bạn</p>
            <div className={s.cashBar} aria-hidden="true"><span style={{ transform: `scaleX(${advance / 100})` }} /></div>
            <div className={s.cashSummary}><p>Ngày giải ngân<strong>{advance}% giá trị hóa đơn</strong></p><p>Sau {days} ngày<strong>{validInvoice ? money(amount - funded) : "—"} USD − phí</strong></p></div>
            <p className={s.cashDetail}>Đến hạn, Buyer thanh toán {validInvoice ? money(amount) : "—"} USD vào tài khoản thu chỉ định. Funder khấu trừ phần đã ứng và chi phí, rồi trả phần còn lại.</p>
          </div>
          <div className={s.cashControls} data-reveal>
            <label htmlFor="invoice-value">Giá trị hóa đơn (USD)<input id="invoice-value" type="number" min="1000" max="10000000" step="1000" value={invoice} onChange={e => setInvoice(e.target.value)} aria-describedby="invoice-help" /></label>
            <p id="invoice-help" className={s.note}>{validInvoice ? "Thay đổi giá trị để xem dòng tiền minh họa." : "Nhập giá trị từ 1.000 đến 10.000.000 USD."}</p>
            <label htmlFor="advance-percent" className={s.rangeLabel}><span>Tỷ lệ ứng trước <strong>{advance}%</strong></span><input id="advance-percent" type="range" min="50" max="90" step="5" value={advance} onChange={e => setAdvance(Number(e.target.value))} /><span className={s.rangeEnds}><span>50%</span><span>90%</span></span></label>
            <label htmlFor="payment-term" className={s.rangeLabel}><span>Kỳ hạn thanh toán <strong>{days} ngày</strong></span><input id="payment-term" type="range" min="30" max="120" step="15" value={days} onChange={e => setDays(Number(e.target.value))} /><span className={s.rangeEnds}><span>30 ngày</span><span>120 ngày</span></span></label>
          </div>
        </div>
        <p className={s.cashDisclaimer}>Chỉ là mô phỏng, chưa phải báo giá hay cam kết tài trợ. Tỷ lệ ứng trước, chi phí và thời điểm giải ngân do Funder thẩm định và thỏa thuận cho từng hồ sơ.</p>
      </section>
      <section id="funder" className={`${s.section} ${s.funders}`} aria-labelledby="funder-title">
        <div className={s.sectionTop}><div data-reveal><p>Funder là bên bỏ vốn mua khoản phải thu và giải ngân trước cho bạn. Nguồn tài trợ dự kiến mở rộng qua từng giai đoạn.</p><a href="#dang-ky" className={s.textLink}>Trao đổi về nhu cầu tài trợ <Arrow /></a></div><h2 id="funder-title" data-reveal>Ai tài trợ<br />cho bạn?</h2></div>
        <div className={s.funderRows}>
          <article data-reveal><span>Thí điểm · Q4/2026</span><h3>Quỹ quốc tế</h3><p>Quỹ tài trợ thương mại được cấp phép mua khoản phải thu O/A có bảo hiểm tín dụng. Không dùng hạn mức tín dụng ngân hàng của bạn.</p><strong>Việt Nam–UAE</strong></article>
          <article data-reveal><span>Sau thí điểm</span><h3>Ngân hàng Việt Nam</h3><p>Tham gia tài trợ riêng hoặc cùng quỹ quốc tế trên một khoản phải thu. Doanh nghiệp có thêm lựa chọn nhận VND.</p><strong>Giai đoạn 2</strong></article>
          <article data-reveal><span>Khi được chấp thuận</span><h3>Nhà đầu tư quốc tế</h3><p>Nhà đầu tư cá nhân quốc tế đủ điều kiện mua khoản phải thu qua kênh được cấp phép, mở rộng nguồn vốn cho doanh nghiệp.</p><strong>Giai đoạn 3</strong></article>
        </div>
        <p className={s.note}>Thời điểm mở Giai đoạn 2 và 3 tùy kết quả thí điểm và sự chấp thuận của cơ quan quản lý. Một bộ hồ sơ trên CFN dùng cho mọi Funder, ở mọi giai đoạn.</p>
      </section>
      <section className={`${s.section} ${s.framework}`} aria-labelledby="framework-title">
        <div className={s.frameworkVisual} data-reveal><h2 id="framework-title">Một chuẩn chung.</h2><p>Những nguyên tắc dự kiến xuyên suốt các giai đoạn, theo khung pháp lý Việt Nam.</p><img src={photos.containers} alt="Các container tại cảng Thị Nại, Quy Nhơn" width="1920" height="1440" loading="lazy" /></div>
        <dl className={s.definitionList}>{[["Tài sản", "Khoản phải thu xuất khẩu trả chậm (O/A)."], ["Nhận tiền", "Vào tài khoản của bạn tại ngân hàng Việt Nam."], ["Tài khoản thu", "Tại ngân hàng Việt Nam, thỏa thuận ba bên, chỉ thị không hủy ngang."], ["Chuyển giao", "Thông báo bằng văn bản cho Buyer theo pháp luật Việt Nam."], ["Đối tượng phục vụ", "Nhà xuất khẩu tại Việt Nam."], ["Vai trò CFN", "Kiểm chứng và ghi nhận. Không cấp vốn, không giữ tiền."]].map(([title, detail]) => <div key={title} data-reveal><dt>{title}</dt><dd>{detail}</dd></div>)}</dl>
      </section>
      <section id="dieu-kien" className={`${s.section} ${s.eligibility}`} aria-labelledby="eligibility-title">
        <div className={s.sectionTop}><p data-reveal>Ba thành phần của một hồ sơ đủ chuẩn: doanh nghiệp xuất khẩu, Buyer và khoản phải thu.</p><h2 id="eligibility-title" data-reveal>Điều kiện<br />tham gia.</h2></div>
        <div className={s.eligibilityGrid} data-reveal>
          <div className={s.groupButtons} role="group" aria-label="Chọn nhóm điều kiện">{eligibility.map((item, index) => <button type="button" key={item.name} aria-pressed={group === index} onClick={() => setGroup(index)}>{item.name}<span aria-hidden="true">↗</span></button>)}</div>
          <div className={s.groupContent} aria-live="polite"><h3>{eligibility[group].name}</h3><p>{eligibility[group].description}</p><ul>{eligibility[group].items.map(item => <li key={item}>{item}</li>)}</ul></div>
        </div>
        <noscript><div className={s.noScript}>{eligibility.slice(1).map(item => <div key={item.name}><h3>{item.name}</h3><ul>{item.items.map(text => <li key={text}>{text}</li>)}</ul></div>)}</div></noscript>
        <p className={s.note}>Các ngưỡng là dự kiến; mỗi Funder có thể đặt thêm tiêu chí riêng.</p>
      </section>
      <section id="ho-so" className={`${s.section} ${s.documents}`} aria-labelledby="documents-title">
        <div className={s.documentIntro}><img src="/cfn-hero-dawn.png" alt="Minh họa cảng biển và hành trình xuất khẩu của CFN" width="1536" height="1024" loading="lazy" data-reveal /><div><h2 id="documents-title" data-reveal>Chuẩn bị một lần.</h2><p className={s.lead} data-reveal>Năm bước từ đăng ký đến giao dịch đầu tiên. Những lô hàng tiếp theo bắt đầu từ hồ sơ đã có.</p></div></div>
        <ol className={s.onboarding}>{onboarding.map(([title, detail]) => <li key={title} data-reveal><h3>{title}</h3><p>{detail}</p></li>)}</ol>
        <div className={s.documentLists}>
          <div data-reveal><h3>Hồ sơ doanh nghiệp</h3><p>Nộp một lần khi tham gia</p><ul>{["Đăng ký kinh doanh, điều lệ", "Người đại diện, văn bản ủy quyền", "Báo cáo tài chính 2 năm gần nhất", "Kim ngạch xuất khẩu 12 tháng", "Danh sách Buyer và lịch sử thanh toán"].map(item => <li key={item}>{item}</li>)}</ul></div>
          <div data-reveal><h3>Hồ sơ mỗi lô hàng</h3><p>Bổ sung theo từng giao dịch</p><ul>{["Hợp đồng mua bán, hóa đơn thương mại", "Vận đơn, tờ khai hải quan", "Phiếu đóng gói, C/O, chứng thư giám định", "Giấy chứng nhận bảo hiểm tín dụng", "Xác nhận của Buyer về hóa đơn"].map(item => <li key={item}>{item}</li>)}</ul></div>
        </div><p className={s.note}>Chuẩn bị một lần, dùng cho mọi Funder. Danh mục dự kiến; Funder có thể yêu cầu bổ sung.</p>
      </section>
      <section id="hoi-dap" className={`${s.section} ${s.faq}`} aria-labelledby="faq-title"><h2 id="faq-title" data-reveal>Bạn hỏi, CFN giải đáp.</h2><div>{faq.map(([question, answer]) => <article key={question} data-reveal><h3>{question}</h3><p>{answer}</p></article>)}</div></section>
      <section id="dang-ky" className={`${s.section} ${s.registration}`} aria-labelledby="registration-title">
        <div className={s.registrationIntro} data-reveal><h2 id="registration-title">Cùng mở đường vốn.</h2><p className={s.lead}>Đăng ký quan tâm đợt thí điểm Việt Nam–UAE, Q4/2026.</p><p>Số lượng nhà xuất khẩu giới hạn, ưu tiên nông sản và thực phẩm. Hồ sơ có Buyer hiện hữu tại UAE, lô khoảng 230.000 USD, kỳ hạn khoảng 6 tuần được ưu tiên.</p><a className={s.textLink} href="mailto:member@goealliance.org">member@goealliance.org <Arrow /></a><p className={s.note}>Thông tin này giúp CFN trao đổi mức độ phù hợp. Việc đăng ký không đồng nghĩa được phê duyệt tài trợ.</p></div>
        <form className={s.form} onSubmit={prepareRegistration} onChange={() => setDraft("")} data-reveal>
          <h3>Thông tin doanh nghiệp</h3><p>Các trường có dấu * là bắt buộc.</p>
          <div className={s.formGrid}>
            <label>Tên doanh nghiệp *<input name="company" required maxLength={180} autoComplete="organization" /></label>
            <label>Mã số thuế *<input name="tax" required maxLength={30} inputMode="numeric" /></label>
            <label>Ngành hàng *<select name="industry" required defaultValue=""><option value="" disabled>Chọn ngành hàng</option><option>Nông sản</option><option>Thực phẩm chế biến</option><option>Thủy sản</option><option>Khác</option></select></label>
            <label>Kim ngạch UAE / 12 tháng *<select name="turnover" required defaultValue=""><option value="" disabled>Chọn khoảng giá trị</option><option>Dưới 500.000 USD</option><option>500.000 – 2 triệu USD</option><option>Trên 2 triệu USD</option><option>Chưa xuất sang UAE</option></select></label>
            <label className={s.wide}>Số Buyer hiện hữu tại UAE *<input name="buyers" type="number" min="0" max="100000" step="1" required placeholder="Ví dụ: 3" /></label>
            <label>Người liên hệ *<input name="contact" required maxLength={120} autoComplete="name" /></label>
            <label>Email *<input name="email" type="email" required maxLength={180} autoComplete="email" /></label>
          </div>
          <button type="submit" className={s.primary}>Tạo email đăng ký <Arrow /></button>
          <p className={s.note}>Thông tin được ghép vào email để bạn kiểm tra và gửi đến CFN. Website không tự gửi hay lưu hồ sơ.</p>
          {draft && <div className={s.draft} role="status"><strong>Email đăng ký đã sẵn sàng.</strong><p>Chọn bên dưới để mở ứng dụng email, kiểm tra nội dung rồi gửi. Hồ sơ chưa được gửi tại bước này.</p><a href={draft} className={s.textLink}>Mở email đăng ký <Arrow /></a><p>Nếu máy chưa cài ứng dụng email, bạn có thể gửi trực tiếp đến member@goealliance.org.</p></div>}
        </form>
      </section>
    </main>
    <footer className={s.footer}>
      <div className={s.footerTop}><div><Link href="/" className={s.footerBrand}>CFN <span>by GOE Alliance</span></Link><p>Hạ tầng tài trợ thương mại số<br />cho doanh nghiệp Việt Nam.</p></div><div><h2>Cùng kết nối.</h2><a href="tel:+84964931661">(+84) 964 93 1661</a><p>Văn phòng GOE Alliance<br />Tòa nhà IFC, 8 Nguyễn Huệ, Phường Sài Gòn,<br />Thành phố Hồ Chí Minh.</p></div><a href="#top">Về đầu trang ↑</a></div>
      <a href="mailto:member@goealliance.org" className={s.footerEmail}>member<span>@goealliance.org</span></a>
      <p className={s.footerDisclaimer}>Thông tin trên trang là giả định để thảo luận, chưa phải báo giá hay cam kết tài trợ. CFN không nhận tiền gửi, không cho vay và không chào bán tài sản cho công chúng.</p>
      <details className={s.credits}><summary>Nguồn hình ảnh</summary><p>Ảnh cảng biển minh họa bối cảnh thương mại, không thể hiện quan hệ đối tác với CFN.</p><ul>
        <li><a href="https://commons.wikimedia.org/wiki/File:Container_Ship_at_the_Hai_Phong_International_Container_Terminal_03.jpg">Container Ship at the Hai Phong International Container Terminal 03</a> — Nathan.cima, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.</li>
        <li><a href="https://commons.wikimedia.org/wiki/File:R%C3%ADo_Saig%C3%B3n,_Ciudad_Ho_Chi_Minh,_Vietnam,_2013-08-14,_DD_28.JPG">Río Saigón, Ciudad Ho Chi Minh, Vietnam, 2013-08-14, DD 28</a> — Diego Delso, <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>.</li>
        <li><a href="https://commons.wikimedia.org/wiki/File:Thi_Nai_Port_Containers.JPG">Thi Nai Port Containers</a> — Dragfyre, <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>.</li>
        <li>Minh họa cảng bình minh: tài nguyên hiện có của website CFN. Ảnh được cắt khung khi hiển thị; ảnh Wikimedia giữ giấy phép gốc.</li>
      </ul></details>
    </footer>
  </div>;
}


