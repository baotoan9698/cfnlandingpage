"use client";

import { useState } from "react";
import s from "./dashboard.module.css";

const suppliers = ["Tất cả hồ sơ", "Nhà XK 01", "Nhà XK 02", "Nhà XK 03", "Nhà XK 04", "Nhà XK 05"];

const buyers = [
  ["Al Noor Trading", "$33,600,000", "35%", "UAE"],
  ["Binh Minh Imports", "$23,040,000", "24%", "Đức"],
  ["Marina Foods", "$17,280,000", "18%", "Anh"],
  ["Pacific Retail", "$11,520,000", "12%", "Malaysia"],
  ["Singapore Union", "$6,720,000", "7%", "Singapore"],
  ["Atlas Global", "$3,840,000", "4%", "Úc"],
];

function Ring({ value, label }: { value: number; label: string }) {
  const [showTip, setShowTip] = useState(false);
  const radius = 37;
  const length = 2 * Math.PI * radius;
  return <div className={s.ringWrap}><button type="button" className={s.ring} aria-label={`${label}: ${value}%`} onMouseEnter={() => setShowTip(true)} onMouseLeave={() => setShowTip(false)} onFocus={() => setShowTip(true)} onBlur={() => setShowTip(false)}><svg viewBox="0 0 100 100" aria-hidden="true"><circle className={s.ringTrack} cx="50" cy="50" r={radius} /><circle className={s.ringFill} cx="50" cy="50" r={radius} strokeDasharray={`${length * value / 100} ${length}`} /></svg><span><b>{value}%</b></span></button><small className={s.ringLabel}>{label}</small>{showTip && <div className={s.ringTooltip}><b>126 / 131 hồ sơ</b><span>Đã hoàn tất kiểm chứng</span></div>}</div>;
}

function QualityDonut() {
  const [active, setActive] = useState<number | null>(null);
  const categories = [["Hạng đầu tư", "$43.2m", "45%"], ["Không đầu tư", "$24.0m", "25%"], ["Chưa xếp hạng", "$28.8m", "30%"]];
  return <div className={s.donutWrap}><svg viewBox="0 0 120 120" aria-label="Phân bổ chất lượng" role="img"><circle className={s.donutTrack} cx="60" cy="60" r="42" />{categories.map((category, index) => <circle key={category[0]} className={[s.donutA, s.donutB, s.donutC][index]} cx="60" cy="60" r="42" tabIndex={0} onMouseEnter={() => setActive(index)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(index)} onBlur={() => setActive(null)} />)}</svg>{active !== null && <div className={s.donutTooltip}><b>{categories[active][0]}</b><span>{categories[active][1]} · {categories[active][2]}</span></div>}</div>;
}

export default function DashboardScreen() {
  const [activeSupplier, setActiveSupplier] = useState(0);
  const [activeAssetView, setActiveAssetView] = useState("Buyers");

  return <main className={s.app}>
    <header className={s.header}>
      <a href="/" className={s.logo}><i /><b>GOE</b><span>CFN</span></a>
      <nav><a className={s.active} href="#overview">Tổng quan</a><a href="#assets">Hồ sơ</a></nav>
      <div className={s.profile}><button type="button" aria-label="Thông báo">◉</button><button type="button" aria-label="Tải báo cáo">↓</button><span className={s.avatar}>BT</span><b>Bảo Toàn</b><small>⌄</small></div>
    </header>

    <section className={s.subnav}><div>{suppliers.map((supplier, index) => <button type="button" className={index === activeSupplier ? s.selected : ""} onClick={() => setActiveSupplier(index)} key={supplier}>{supplier}</button>)}</div><p>Cập nhật gần nhất: 30.10.2026 · 10:30 ICT</p></section>

    <section className={s.content} id="overview">
      <div className={s.sectionTitle}><h1>Danh mục khoản phải thu</h1><span>Việt Nam → UAE · USD</span></div>
      <div className={s.labelRow}><span>Tổng quan danh mục</span><span>Thu nhập năm nay</span><span>Tình trạng quá hạn</span></div>
      <section className={s.metricGrid}>
        <article className={s.wideMetric}><div><b>$96,000,000</b><small>USD</small><p>Tổng giá trị khoản phải thu</p><div className={s.stacks}><i style={{ width: "40%" }} /><i style={{ width: "30%" }} /><i style={{ width: "17%" }} /><i style={{ width: "13%" }} /></div><div className={s.legend}><span>● Nông sản</span><span>● Gỗ & nội thất</span><span>● Dệt may</span><span>● Khác</span></div></div><Ring value={96} label="Tỷ lệ kiểm chứng" /></article>
        <article><b>$78,400,000</b><small>USD</small><p>Giá trị đã kiểm chứng</p><div className={s.stacks}><i style={{ width: "44%" }} /><i style={{ width: "26%" }} /><i style={{ width: "18%" }} /><i style={{ width: "12%" }} /></div><div className={s.legend}><span>● Đủ chứng từ</span><span>● Đối chiếu</span></div></article>
        <article><b>$7,500,000</b><small>USD</small><p>Thu nhập tích lũy</p><div className={s.stacks}><i style={{ width: "54%" }} /><i style={{ width: "31%" }} /><i style={{ width: "15%" }} /></div><div className={s.legend}><span>● Đã thu</span><span>● Dự kiến</span></div></article>
        <article><b>7.5%</b><p>Lợi suất bình quân</p><div className={s.rateList}><span>30–45 ngày <b>3.8%</b></span><span>46–60 ngày <b>6.2%</b></span><span>61–90 ngày <b>7.5%</b></span></div></article>
        <article><b>6</b><p>Hồ sơ quá hạn</p><strong>$240,000 <small>USD</small></strong><button className={s.detailButton} type="button">Xem chi tiết →</button></article>
      </section>

      <section className={s.bodyGrid} id="assets">
        <article className={s.glance}><h2>Danh mục trong tầm nhìn</h2><div className={s.glanceTabs}><button className={s.active} type="button">$<small>Giá trị còn lại</small></button><button type="button">◎<small>Quốc gia</small></button><button type="button">☆<small>Xếp hạng buyer</small></button><button type="button">⌛<small>Thu nhập chờ</small></button></div><div className={s.grade}><h3>Chất lượng danh mục</h3><div className={s.gradeBody}><QualityDonut /><div><p><i className={s.gold} />Hạng đầu tư <b>$43.2m · 45%</b></p><p><i className={s.teal} />Không đầu tư <b>$24.0m · 25%</b></p><p><i className={s.blue} />Chưa xếp hạng <b>$28.8m · 30%</b></p><button className={s.detailButton} type="button">Mở danh sách →</button></div></div></div>
        </article>
        <article className={s.tableCard}><div className={s.tableHead}><div><h2>Khoản phải thu chưa thanh toán</h2><div>{["Buyers", "Nhà xuất khẩu"].map((item) => <button type="button" className={activeAssetView === item ? s.active : ""} onClick={() => setActiveAssetView(item)} key={item}>{item}</button>)}</div></div><span>USD · Tổng giá trị</span></div><div className={s.dataTable}><div className={s.tableLabels}><span>STT</span><span>Tên buyer</span><span>Giá trị (USD)</span><span>% danh mục</span><span>Quốc gia</span></div>{buyers.map(([name, amount, share, country], index) => <div className={s.tableRow} key={name}><span>{index + 1}</span><b>{name}</b><span>{amount}</span><span>{share}</span><span>{country}</span></div>)}<div className={s.totalRow}><span>Tổng</span><b>$96,000,000</b></div></div></article>
      </section>
    </section>
    <footer className={s.footer}>© 2026 GOE Alliance · CFN pilot dashboard <span>Privacy · Disclaimer · Terms</span></footer>
  </main>;
}
