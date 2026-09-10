import {
  BatteryMedium,
  Camera,
  CellSignalLow,
  CheckCircle,
  ClipboardText,
  Clock,
  CloudSlash,
  DotsThree,
  ListChecks,
  PencilSimpleLine,
  Signature,
  Users,
} from "@phosphor-icons/react/ssr";
import { imsCopy, type ImsCaptureRow, type ImsPaintId } from "@/content/ims";

interface PhoneImsProps {
  paint: ImsPaintId;
}

const tabIcons = {
  job: ClipboardText,
  capture: Camera,
  hours: Clock,
  more: DotsThree,
} as const;

const glyphIcons = {
  prestart: ListChecks,
  signature: Signature,
  hours: Users,
} as const;

function CaptureRow({ row }: { row: ImsCaptureRow }) {
  const Glyph = row.glyph ? glyphIcons[row.glyph] : null;

  return (
    <li className="ims-capture-row">
      <span className="ims-capture-thumb">
        {row.thumb ? (
          /* eslint-disable-next-line @next/next/no-img-element -- fixed-size demo asset inside a capture frame */
          <img src={row.thumb.src} alt={row.thumb.alt} width={240} height={240} />
        ) : Glyph ? (
          <Glyph size={20} weight="regular" aria-hidden />
        ) : null}
      </span>
      <span className="ims-capture-copy">
        <span className="ims-capture-label">{row.label}</span>
        <span className="ims-capture-meta">{row.meta}</span>
      </span>
      <span className="ims-capture-right">
        <span className="ims-num ims-capture-time">{row.time}</span>
        {row.sync === "synced" ? (
          <span className="ims-tick" title="Sent">
            <CheckCircle size={15} weight="fill" aria-hidden />
            Sent
          </span>
        ) : (
          <span className="ims-queued">Queued</span>
        )}
      </span>
    </li>
  );
}

/**
 * Headings inside the shell are deliberately paragraphs. This screen is a
 * product surface embedded in a marketing page, so it must not put an h1 into
 * that page's heading outline. The section's aria-label names it as a demo.
 */
export function PhoneIms({ paint }: PhoneImsProps) {
  const field = imsCopy.field;

  return (
    <section
      data-ims-capture=""
      data-ims-paint={paint}
      data-ims-device="phone"
      className="ims-shell ims-phone"
      aria-label={imsCopy.demoNote}
    >
      <div className="ims-phone-status" aria-hidden="true">
        <span className="ims-num">{field.statusTime}</span>
        <span className="ims-status-glyphs">
          <CellSignalLow size={16} weight="bold" />
          <BatteryMedium size={20} weight="regular" />
        </span>
      </div>

      <header className="ims-phone-bar">
        <span className="ims-phone-bar-job ims-num">{field.jobNo}</span>
        <span className="ims-sync">
          <CloudSlash size={15} weight="bold" aria-hidden />
          {field.sync.queuedLabel}
        </span>
      </header>

      <div className="ims-phone-body">
        <div className="ims-job-head">
          <p className="ims-job-title">{field.jobTitle}</p>
          <p className="ims-job-meta">
            {field.jobMeta}
            <span className="ims-dot" aria-hidden="true" />
            {field.jobScope}
          </p>
          <p className="ims-job-state">
            <span className="ims-state">{field.stateLabel}</span>
            <span className="ims-job-state-meta">{field.stateMeta}</span>
          </p>
        </div>

        <div className="ims-action-primary">
          <span className="ims-action-icon" aria-hidden="true">
            <Camera size={30} weight="fill" />
          </span>
          <span className="ims-action-copy">
            <span className="ims-action-label">{field.primaryAction.label}</span>
            <span className="ims-action-hint">{field.primaryAction.hint}</span>
          </span>
        </div>

        <div className="ims-action-row">
          {field.secondaryActions.map((action) => (
            <span key={action.id} className="ims-action-secondary">
              {action.id === "hours" ? (
                <Clock size={18} weight="bold" aria-hidden />
              ) : (
                <PencilSimpleLine size={18} weight="bold" aria-hidden />
              )}
              {action.label}
            </span>
          ))}
        </div>

        <dl className="ims-metrics">
          {field.metrics.map((metric) => (
            <div key={metric.label} className="ims-metric">
              <dt className="ims-metric-label">{metric.label}</dt>
              <dd className="ims-metric-value ims-num">
                {metric.value}
                {metric.unit ? <span className="ims-metric-unit">{metric.unit}</span> : null}
              </dd>
            </div>
          ))}
        </dl>

        <div className="ims-feed">
          <div className="ims-feed-head">
            <p className="ims-feed-heading">{field.feedHeading}</p>
            <span className="ims-feed-note">{field.sync.offlineNote}</span>
          </div>
          <ul className="ims-capture-list">
            {field.feed.map((row) => (
              <CaptureRow key={row.id} row={row} />
            ))}
          </ul>
        </div>
      </div>

      <div className="ims-phone-foot">
        <nav className="ims-tabs" aria-label="Field app">
          {field.tabs.map((tab) => {
            const Icon = tabIcons[tab.id as keyof typeof tabIcons];
            const active = tab.id === field.selectedTab;
            return (
              <span
                key={tab.id}
                className={active ? "ims-tab ims-tab-active" : "ims-tab"}
                aria-current={active ? "page" : undefined}
              >
                <Icon size={21} weight={active ? "fill" : "regular"} aria-hidden />
                {tab.label}
              </span>
            );
          })}
        </nav>
        <div className="ims-home-pill" aria-hidden="true" />
      </div>
    </section>
  );
}
