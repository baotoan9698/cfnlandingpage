"use client";

import { useMemo, useState } from "react";
import s from "./analytics.module.css";
import x from "./analytics-charts.module.css";
import r from "./analytics-rwa.module.css";
import f from "./analytics-rwa-fix.module.css";

type Period = "30D" | "90D" | "YTD";

const source = {
  "30D": { total: 8.4, verified: 6.7, exporters: 18, records: 47, match: 72, labels: ["Sep 27", "Oct 04", "Oct 11", "Oct 18"], bars: [1.1, 1.7, 2.4, 3.2], cumulative: [1.1, 2.8, 5.2, 8.4] },
  "90D": { total: 24.6, verified: 19.2, exporters: 41, records: 126, match: 78, labels: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"], bars: [2.9, 3.7, 4.1, 4.6, 4.0, 5.3], cumulative: [2.9, 6.6, 10.7, 15.3, 19.3, 24.6] },
  YTD: { total: 68.3, verified: 53.9, exporters: 97, records: 358, match: 81, labels: ["Feb", "Apr", "Jun", "Aug", "Oct", "Dec"], bars: [6.1, 8.8, 10.4, 12.2, 14.5, 16.3], cumulative: [6.1, 14.9, 25.3, 37.5, 52.0, 68.3] },
} as const;

function formatMoney(value: number) {
  return `$${value.toFixed(1)}m`;
}

function BarChart({ values, labels }: { values: readonly number[]; labels: readonly string[] }) {
  const max = Math.max(...values);
  return <div className={s.chartWrap} role="img" aria-label="Giá trị khoản phải thu mới theo kỳ">
    <div className={s.chartGrid} />
    <div className={s.bars}>{values.map((value, index) => <div className={s.barItem} key={labels[index]}><span style={{ height: `${Math.max(10, value / max * 100)}%` }} title={`${formatMoney(value)}`} /><small>{labels[index]}</small></div>)}</div>
  </div>;
}

function LineChart({ values, labels }: { values: readonly number[]; labels: readonly string[] }) {
  const max = Math.max(...values);
  const points = values.map((value, index) => `${index / (values.length - 1) * 100},${100 - value / max * 78 - 9}`).join(" ");
  return <div className={s.chartWrap} role="img" aria-label="Tổng lũy kế khoản phải thu đã đăng ký">
    <div className={s.chartGrid} />
    <svg className={s.lineSvg} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polyline points={points} /></svg>
    <div className={s.lineLabels}>{labels.map((label) => <small key={label}>{label}</small>)}</div>
  </div>;
}

function FunnelChart({ records }: { records: number }) {
  const steps = [["Hồ sơ tạo mới", records], ["Đủ chứng từ", Math.round(records * .76)], ["Đã kiểm chứng", Math.round(records * .63)], ["Sẵn sàng Funder", Math.round(records * .58)]];
  return <div className={x.funnel} role="img" aria-label="Dòng chảy hồ sơ từ tạo mới tới sẵn sàng Funder">{steps.map(([label, value], index) => <div key={String(label)} style={{ width: `${100 - index * 14}%` }}><span>{label}</span><b>{value}</b></div>)}</div>;
}

function MaturityWall({ total }: { total: number }) {
  const ratios = [14, 22, 27, 19, 11, 7], labels = ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4", "Tuần 5", "Tuần 6+"]; const max = Math.max(...ratios);
  return <div className={x.maturityWall} role="img" aria-label="Giá trị khoản phải thu đáo hạn trong sáu tuần tới">{ratios.map((ratio, index) => <div key={labels[index]}><span style={{ height: `${ratio / max * 100}%` }} title={formatMoney(total * ratio / 100)} /><small>{labels[index]}</small></div>)}</div>;
}

const sectorSeries = [
  { label: "Nông sản & thực phẩm", color: "#2865ed", values: [.08, .11, .15, .19, .27, .37, .50, .61, .74, 1] },
  { label: "Gỗ & nội thất", color: "#4e83e9", values: [.05, .08, .11, .15, .20, .28, .35, .45, .58, .71] },
  { label: "Dệt may", color: "#82a8f3", values: [.04, .06, .09, .12, .16, .23, .30, .37, .45, .52] },
  { label: "Thủy sản", color: "#acc6f7", values: [.03, .05, .07, .09, .13, .18, .24, .30, .37, .45] },
  { label: "Điện tử & linh kiện", color: "#d0defa", values: [.02, .03, .05, .07, .11, .15, .20, .27, .33, .39] },
  { label: "Cơ khí", color: "#7a91b5", values: [.01, .02, .03, .05, .07, .10, .14, .18, .23, .28] },
];

function StackedAreaChart({ total }: { total: number }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const finalStack = sectorSeries.reduce((sum, item) => sum + item.values.at(-1)!, 0);
  const scale = total / finalStack;
  const series = sectorSeries.map((item) => ({ ...item, values: item.values.map((value) => value * scale) }));
  const stackedTotals = Array.from({ length: 10 }, (_, index) => series.reduce((sum, item) => sum + item.values[index], 0));
  const max = Math.max(...stackedTotals);
  const xAt = (index: number) => 72 + index / 9 * 892, yAt = (value: number) => 322 - value / max * 252;
  const layers = series.map((item, layer) => {
    const lower = series.slice(0, layer).reduce<number[]>((acc, row) => acc.map((value, index) => value + row.values[index]), Array<number>(10).fill(0));
    const upper = lower.map((value, index) => value + item.values[index]);
    const points = upper.map((value, index) => `${xAt(index)},${yAt(value)}`).concat(lower.map((value, index) => `${xAt(9 - index)},${yAt(lower[9 - index])}`)).join(" ");
    return <polygon key={item.label} points={points} fill={item.color} opacity={layer === 0 ? .82 : .9} />;
  });
  const labels = ["Q2 ’24", "Q3 ’24", "Q4 ’24", "Q1 ’25", "Q2 ’25", "Q3 ’25", "Q4 ’25", "Q1 ’26", "Q2 ’26", "Q3 ’26"];
  const ticks = Array.from({ length: 5 }, (_, index) => max / 4 * index);
  const activeTotal = activeIndex === null ? 0 : stackedTotals[activeIndex];

  return <><div className={r.stackWrap} role="img" aria-label="Giá trị khoản phải thu theo ngành hàng qua thời gian" onMouseMove={(event) => { const bounds = event.currentTarget.getBoundingClientRect(); const position = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width)); setActiveIndex(Math.round(position * 9)); }} onMouseLeave={() => setActiveIndex(null)}><svg className={`${r.stackSvg} ${f.stackSvg}`} viewBox="0 0 1000 400" preserveAspectRatio="none" aria-hidden="true">{ticks.map((value) => <g key={value}><line x1="72" x2="964" y1={yAt(value)} y2={yAt(value)} /><text className={f.yAxis} x="60" y={yAt(value) + 4} textAnchor="end">{formatMoney(value)}</text></g>)}{layers}{activeIndex !== null && <><line className={f.activeLine} x1={xAt(activeIndex)} x2={xAt(activeIndex)} y1="70" y2="322" /><circle className={f.activeDot} cx={xAt(activeIndex)} cy={yAt(activeTotal)} r="5" /></>}{labels.map((label, index) => (index % 2 === 0 || index === labels.length - 1) && <text className={`${r.axis} ${f.axis}`} key={label} x={xAt(index)} y="366" textAnchor="middle">{label}</text>)}</svg>{activeIndex !== null && <div className={f.tooltip} style={{ left: `${Math.max(12, Math.min(88, 7.2 + activeIndex / 9 * 89.2))}%` }}><small>{labels[activeIndex]}</small><strong>{formatMoney(activeTotal)}</strong><div>{series.map((item) => <span key={item.label}><i style={{ background: item.color }} />{item.label}<b>{formatMoney(item.values[activeIndex])}</b></span>)}</div></div>}</div><div className={r.stackLegend}>{sectorSeries.map((item) => <span key={item.label}><i style={{ background:item.color }} />{item.label}</span>)}</div></>;
}

export default function AnalyticsScreen() {
  const [period, setPeriod] = useState<Period>("90D");
  const [drawer, setDrawer] = useState(false);
  const data = source[period];
  const readiness = useMemo(() => Math.round(data.verified / data.total * 100), [data]);
  const industries = period === "30D" ? [["Nông sản & thực phẩm", 47], ["Gỗ & nội thất", 24], ["Dệt may", 17], ["Khác", 12]] : period === "YTD" ? [["Nông sản & thực phẩm", 38], ["Gỗ & nội thất", 30], ["Dệt may", 21], ["Khác", 11]] : [["Nông sản & thực phẩm", 42], ["Gỗ & nội thất", 27], ["Dệt may", 19], ["Khác", 12]];

  return <main className={s.app} data-ui>
    <aside className={`${s.sidebar} ${drawer ? s.sidebarOpen : ""}`}>
      <a className={s.wordmark} href="/"><span className={s.mark}><i /><i /><i /></span><b>CFN</b><em>Market</em></a>
      <p className={s.scope}>Public intelligence</p>
      <nav aria-label="Điều hướng analytics">
        <a className={s.active} href="#overview">Tổng quan</a>
        <a href="#assets">Khoản phải thu</a>
        <a href="#corridors">Hành lang</a>
        <a href="#method">Phương pháp</a>
      </nav>
      <div className={s.sideFoot}><span>CFN · Việt Nam</span><small>Public prototype<br />Không phải dữ liệu live</small></div>
    </aside>

    <section className={s.shell}>
      <header className={s.topbar}>
        <button className={s.menu} type="button" onClick={() => setDrawer(!drawer)} aria-expanded={drawer}>Menu</button>
        <div className={s.freshness}><i /> Cập nhật dữ liệu mẫu · 26.10.2026</div>
        <a className={s.back} href="/">goecfn.org <span>↗</span></a>
      </header>

      <div className={s.content} id="overview">
        <div className={s.titleRow}>
          <div><h1>Thị trường khoản phải thu</h1><p>Chỉ số công khai về các khoản phải thu xuất khẩu được ghi nhận trên hạ tầng CFN.</p></div>
          <button className={s.reportButton} type="button" onClick={() => document.getElementById("method")?.scrollIntoView({ behavior: "smooth" })}>Cách đọc số liệu <span>↓</span></button>
        </div>

        <div className={s.notice}><b>Bản mẫu dữ liệu</b><p>Các số dưới đây được mô phỏng để trình bày giao diện, không phải số liệu vận hành của CFN.</p></div>

        <div className={s.controls} aria-label="Lọc dữ liệu">
          <div className={s.periods}>{(["30D", "90D", "YTD"] as Period[]).map((item) => <button key={item} className={period === item ? s.selected : ""} type="button" onClick={() => setPeriod(item)}>{item === "30D" ? "30 ngày" : item === "90D" ? "90 ngày" : "Từ đầu năm"}</button>)}</div>
          <span>Việt Nam → UAE</span><span>USD</span>
        </div>

        <section className={`${s.kpis} ${r.kpiStrip}`} aria-label="Chỉ số chính">
          <article><p>Tổng giá trị khoản phải thu</p><strong>{formatMoney(data.total)}</strong><small className={r.up}>▲ +8,4% so với kỳ trước</small></article>
          <article><p>Giá trị đã kiểm chứng</p><strong>{formatMoney(data.verified)}</strong><small className={r.up}>▲ +6,2% so với kỳ trước</small></article>
          <article><p>Hồ sơ sẵn sàng Funder</p><strong>{formatMoney(data.verified * data.match / 100)}</strong><small className={r.up}>▲ +4,8% so với kỳ trước</small></article>
          <article><p>Nhà xuất khẩu đủ điều kiện</p><strong>{data.exporters}</strong><small className={r.up}>▲ +{Math.max(2, Math.round(data.exporters / 12))} doanh nghiệp</small></article>
          <article><p>Hành lang đang theo dõi</p><strong>1</strong><small>Việt Nam → UAE</small></article>
        </section>

        <section className={s.chartPair} id="assets">
          <article className={s.chartCard}><div className={s.cardHead}><div><h2>Khoản phải thu mới</h2><p>Giá trị ghi nhận theo kỳ</p></div><strong>{formatMoney(data.total)}</strong></div><BarChart values={data.bars} labels={data.labels} /></article>
          <article className={s.chartCard}><div className={s.cardHead}><div><h2>Quy mô lũy kế</h2><p>Tổng giá trị được ghi nhận</p></div><strong>{formatMoney(data.total)}</strong></div><LineChart values={data.cumulative} labels={data.labels} /></article>
        </section>

        <section className={r.mainChart} aria-label="Tổng giá trị khoản phải thu theo ngành hàng">
          <div className={r.chartHeader}><div><h2>Total CFN Receivable Value</h2><p>Giá trị khoản phải thu xuất khẩu được ghi nhận, phân bổ theo ngành hàng.</p></div><div className={r.chartMeta}>Kỳ dữ liệu mẫu<strong>{period === "30D" ? "30 ngày" : period === "90D" ? "90 ngày" : "Từ đầu năm"}</strong></div></div>
          <div className={r.chartFilters}><div className={r.filterGroup}><b>Phân bổ</b><span className={r.on}>Ngành hàng</span><span>Buyer country</span><span>Kỳ hạn</span></div><div className={r.filterGroup}><b>Chỉ số</b><span className={r.on}>Tổng giá trị</span><span>Đã kiểm chứng</span><span>Sẵn sàng Funder</span></div></div>
          <StackedAreaChart total={data.total} />
          <p className={r.chartCaption}>Dữ liệu dummy. Với dữ liệu vận hành, mỗi lớp màu sẽ phản ánh một ngành hàng xuất khẩu và tổng chiều cao là tổng giá trị khoản phải thu CFN theo thời gian.</p>
        </section>

        <section className={s.lowerGrid}>
          <article className={s.readiness}><div className={s.cardHead}><div><h2>Mức sẵn sàng tài trợ</h2><p>Khả năng đi tiếp qua từng lớp kiểm chứng</p></div><strong>{data.match}%</strong></div><div className={s.ladder}><div><span>Hồ sơ đã khởi tạo</span><b>{data.records}</b></div><div><span>Đã đối chiếu chứng từ</span><b>{Math.round(data.records * .76)}</b></div><div><span>Sẵn sàng giới thiệu Funder</span><b>{Math.round(data.records * .58)}</b></div></div><p className={s.finding}>Tín hiệu chính: phần lớn hồ sơ dừng ở bước đối chiếu chứng từ, nơi CFN có thể rút ngắn thời gian chuẩn hóa.</p></article>
          <article className={s.composition}><div className={s.cardHead}><div><h2>Cấu trúc kỳ hạn</h2><p>Phân bổ giá trị khoản phải thu</p></div></div><div className={s.termRows}><div><span>30–45 ngày</span><i style={{ width: "54%" }} /><b>54%</b></div><div><span>46–60 ngày</span><i style={{ width: "31%" }} /><b>31%</b></div><div><span>61–90 ngày</span><i style={{ width: "15%" }} /><b>15%</b></div></div><p>Hiển thị kỳ hạn giúp Funder nhìn nhanh thanh khoản và mức độ phù hợp của danh mục.</p></article>
        </section>

        <section className={x.marketCharts} aria-label="Biểu đồ thị trường bổ sung">
          <article className={x.funnelCard}><div className={s.cardHead}><div><h2>Funding pipeline</h2><p>Hồ sơ đi qua các lớp chuẩn hóa của CFN</p></div><strong>{data.match}%</strong></div><FunnelChart records={data.records} /><p className={x.chartNote}>Tỷ lệ cuối phễu phản ánh mức phù hợp sơ bộ với tiêu chí Funder, không phải cam kết tài trợ.</p></article>
          <article className={x.maturityCard}><div className={s.cardHead}><div><h2>Maturity wall</h2><p>Khoản phải thu dự kiến đáo hạn</p></div><strong>6 tuần</strong></div><MaturityWall total={data.total} /><p className={x.chartNote}>Giúp Funder quan sát nhịp hoàn vốn dự kiến của danh mục.</p></article>
          <article className={x.industryCard}><div className={s.cardHead}><div><h2>Phân bổ ngành hàng</h2><p>Tỷ trọng giá trị đã ghi nhận</p></div></div><div className={x.industryRows}>{industries.map(([industry, share]) => <div key={industry}><span>{industry}</span><i style={{ width: `${share}%` }} /><b>{share}%</b></div>)}</div><p className={x.chartNote}>Khi có dữ liệu thật, biểu đồ này nên có filter theo hành lang và Buyer country.</p></article>
        </section>

        <section className={s.corridors} id="corridors"><div className={s.sectionHead}><div><h2>Hành lang theo dõi</h2><p>Cho thấy nơi dữ liệu, chuẩn kiểm chứng và nguồn vốn đang gặp nhau.</p></div><span>1 hành lang đang thí điểm</span></div><div className={s.table} role="table" aria-label="Các hành lang CFN"><div className={s.tableHead} role="row"><span>Hành lang</span><span>Hồ sơ</span><span>Giá trị ghi nhận</span><span>Trạng thái</span></div><div role="row"><b>Việt Nam → UAE</b><span>{data.records}</span><span>{formatMoney(data.total)}</span><em>Đang thí điểm</em></div><div role="row"><b>Việt Nam → Singapore</b><span>—</span><span>—</span><em className={s.neutral}>Đang thiết kế</em></div><div role="row"><b>Việt Nam → Hồng Kông</b><span>—</span><span>—</span><em className={s.neutral}>Đang thiết kế</em></div></div></section>

        <section className={s.method} id="method"><div><h2>Những số liệu CFN nên công khai</h2><p>Đây là bộ chỉ số vừa đủ để tạo niềm tin cho Exporter, Funder và đối tác hạ tầng mà không làm lộ thông tin từng doanh nghiệp.</p></div><ol><li><b>Giá trị đã ghi nhận</b><span>Quy mô khoản phải thu được tạo hồ sơ trên hệ thống.</span></li><li><b>Tỷ lệ kiểm chứng</b><span>Tỷ trọng giá trị đã đủ chứng từ và đối chiếu nguồn dữ liệu.</span></li><li><b>Tỷ lệ sẵn sàng Funder</b><span>Khoản phải thu vượt qua điều kiện sơ bộ để giới thiệu nguồn vốn.</span></li><li><b>Thời gian xử lý trung vị</b><span>Từ tạo hồ sơ đến trạng thái sẵn sàng giới thiệu.</span></li><li><b>Phân bổ kỳ hạn & hành lang</b><span>Giúp thị trường đánh giá nhu cầu vốn, thanh khoản và độ tập trung.</span></li></ol></section>
      </div>
    </section>
  </main>;
}
