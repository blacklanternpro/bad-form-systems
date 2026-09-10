import {
  ArrowsClockwise,
  Briefcase,
  Camera,
  Certificate,
  Clock,
  HardHat,
  Path,
  Plus,
  Signature,
  Table,
  Users,
} from "@phosphor-icons/react/ssr";
import { imsCopy, type ImsCaptureRow, type ImsJobRow, type ImsPaintId } from "@/content/ims";

interface DeskImsProps {
  paint: ImsPaintId;
}

const navIcons = {
  jobs: Briefcase,
  capture: Camera,
  hours: Clock,
  plant: HardHat,
  variations: Path,
  certificates: Certificate,
  costing: Table,
} as const;

const glyphIcons = {
  prestart: Certificate,
  signature: Signature,
  hours: Users,
} as const;

function burnTone(burn: number): "accent" | "warn" | "hold" {
  if (burn >= 0.95) return "hold";
  if (burn >= 0.85) return "warn";
  return "accent";
}

function JobRow({ row }: { row: ImsJobRow }) {
  return (
    <tr>
      <td>
        <span className="ims-cell-job">
          <span className="ims-cell-job-name">{row.job}</span>
          <span className="ims-cell-job-no ims-num">
            {row.site}
            <span className="ims-dot" aria-hidden="true" />
            {row.jobNo}
          </span>
        </span>
      </td>
      <td className="ims-cell-plant">{row.plant}</td>
      <td className="ims-cell-hours ims-num">{row.hours}</td>
      <td>
        <span className="ims-burn">
          <span className="ims-burn-figures ims-num">
            {row.committed}
            <span className="ims-burn-of">of {row.quoted}</span>
          </span>
          <span
            className="ims-burn-bar"
            data-tone={burnTone(row.burn)}
            style={{ width: `${Math.round(row.burn * 100)}%` }}
          />
        </span>
      </td>
      <td>
        <span className="ims-chip" data-state={row.state}>
          {row.status}
        </span>
      </td>
    </tr>
  );
}

function CaptureTile({ row }: { row: ImsCaptureRow }) {
  const Glyph = row.glyph ? glyphIcons[row.glyph] : null;

  return (
    <li className="ims-strip-item">
      <span className="ims-strip-thumb">
        {row.thumb ? (
          /* eslint-disable-next-line @next/next/no-img-element -- fixed-size demo asset inside a capture frame */
          <img src={row.thumb.src} alt={row.thumb.alt} width={240} height={240} />
        ) : Glyph ? (
          <Glyph size={19} weight="regular" aria-hidden />
        ) : null}
      </span>
      <span className="ims-strip-copy">
        <span className="ims-strip-label">{row.label}</span>
        <span className="ims-strip-meta">
          <span className="ims-num">{row.time}</span>
          {row.sync === "queued" ? <span className="ims-queued">Queued</span> : row.meta}
        </span>
      </span>
    </li>
  );
}

export function DeskIms({ paint }: DeskImsProps) {
  const desk = imsCopy.desk;

  return (
    <section
      data-ims-capture=""
      data-ims-paint={paint}
      data-ims-device="desk"
      className="ims-shell ims-desk"
      aria-label={imsCopy.demoNote}
    >
      <header className="ims-desk-top">
        <p className="ims-desk-brand">
          <span className="ims-desk-brand-mark">{imsCopy.brandMark}</span>
          <span className="ims-desk-brand-arm">{imsCopy.brandArm}</span>
          <span className="ims-demo">{imsCopy.demo}</span>
        </p>
        <p className="ims-desk-crumb">
          {desk.breadcrumb}
          <span className="ims-dot" aria-hidden="true" />
          {desk.week}
        </p>
        <span className="ims-xero ims-num">
          <ArrowsClockwise size={14} weight="bold" aria-hidden />
          {desk.topSync}
        </span>
      </header>

      <nav className="ims-desk-nav" aria-label="IMS">
        {desk.nav.map((item) => {
          const Icon = navIcons[item.id as keyof typeof navIcons];
          const active = item.id === desk.selectedNav;
          return (
            <span
              key={item.id}
              className={active ? "ims-nav-item ims-nav-item-active" : "ims-nav-item"}
              aria-current={active ? "page" : undefined}
            >
              <Icon size={18} weight={active ? "fill" : "regular"} aria-hidden />
              {item.label}
            </span>
          );
        })}
        <p className="ims-nav-foot">{imsCopy.demoNote}</p>
      </nav>

      <main className="ims-desk-main">
        <div className="ims-desk-heading-row">
          <h1 className="ims-desk-heading">{desk.heading}</h1>
          <div className="ims-desk-tools">
            <div className="ims-filters" aria-label="Job status">
              {desk.filters.map((filter) => (
                <span
                  key={filter}
                  className={
                    filter === desk.selectedFilter ? "ims-filter ims-filter-active" : "ims-filter"
                  }
                >
                  {filter}
                </span>
              ))}
            </div>
            <span className="ims-btn-new">
              <Plus size={14} weight="bold" aria-hidden />
              {desk.newJob}
            </span>
          </div>
        </div>

        <dl className="ims-summary">
          {desk.summary.map((metric) => (
            <div key={metric.label} className="ims-summary-cell">
              <dt className="ims-summary-label">{metric.label}</dt>
              <dd className="ims-summary-value ims-num">{metric.value}</dd>
            </div>
          ))}
        </dl>

        <div className="ims-table-wrap">
          <table className="ims-table">
            <thead>
              <tr>
                {desk.tableColumns.map((column) => (
                  <th key={column} scope="col">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {desk.jobs.map((row) => (
                <JobRow key={row.jobNo} row={row} />
              ))}
            </tbody>
          </table>
        </div>

        <section className="ims-strip">
          <h2 className="ims-strip-heading">{desk.capturesHeading}</h2>
          <ul className="ims-strip-list">
            {desk.captures.map((row) => (
              <CaptureTile key={row.id} row={row} />
            ))}
          </ul>
        </section>
      </main>

      <aside className="ims-rail">
        <section className="ims-attention">
          <h2 className="ims-rail-heading">{desk.attentionHeading}</h2>
          <ul className="ims-attention-list">
            {desk.attention.map((row) => (
              <li key={row.title} className="ims-attention-row" data-severity={row.severity}>
                <span className="ims-attention-mark" aria-hidden="true" />
                <span className="ims-attention-copy">
                  <span className="ims-attention-title">{row.title}</span>
                  <span className="ims-attention-meta">{row.meta}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="ims-books">
          <h2 className="ims-rail-heading">{desk.books.heading}</h2>
          <p className="ims-books-lead">{desk.books.lead}</p>
          <p className="ims-books-sync ims-num">{desk.books.sync}</p>
          <dl className="ims-books-stats">
            {desk.books.stats.map((stat) => (
              <div key={stat.label} className="ims-books-stat">
                <dt>{stat.label}</dt>
                <dd className="ims-num">{stat.value}</dd>
              </div>
            ))}
          </dl>
          <p className="ims-books-foot">{desk.books.foot}</p>
        </section>
      </aside>
    </section>
  );
}
