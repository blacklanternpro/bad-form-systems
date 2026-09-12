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
  Stack,
  Truck,
  Users,
} from "@phosphor-icons/react/ssr";
import {
  imsCopy,
  imsFieldBuilds,
  type ImsBuildId,
  type ImsCaptureRow,
  type ImsFieldActionId,
  type ImsFieldTabId,
  type ImsPaintId,
} from "@/content/ims";

interface PhoneImsProps {
  paint: ImsPaintId;
  /** Which yard's build to render. There is no default: picking is the point. */
  build: ImsBuildId;
  /** Override the build's selected tab. Capture is a dense document camera. */
  tab?: ImsFieldTabId;
}

const tabIcons = {
  job: ClipboardText,
  capture: Camera,
  hours: Clock,
  more: DotsThree,
} as const;

const actionIcons: Record<ImsFieldActionId, typeof Clock> = {
  hours: Clock,
  variation: PencilSimpleLine,
  load: Stack,
};

const glyphIcons = {
  prestart: ListChecks,
  signature: Signature,
  hours: Users,
  load: Truck,
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
export function PhoneIms({ paint, build, tab }: PhoneImsProps) {
  const field = imsFieldBuilds[build];
  const selectedTab = tab ?? field.selectedTab;
  const isCapture = selectedTab === "capture";

  return (
    <section
      data-ims-capture=""
      data-ims-paint={paint}
      data-ims-device="phone"
      data-ims-build={build}
      data-ims-tab={selectedTab}
      className="ims-shell ims-phone"
      aria-label={`${field.trade} field app. ${imsCopy.demoNote}`}
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
        {isCapture ? (
          <>
            <div className="ims-capture-chip">
              <span className="ims-capture-chip-copy">
                <span className="ims-capture-chip-title">{field.jobTitle}</span>
                <span className="ims-job-meta">
                  {field.jobMeta}
                  <span className="ims-dot" aria-hidden="true" />
                  {field.jobScope}
                </span>
              </span>
              <span className="ims-state">{field.stateLabel}</span>
            </div>
            <div className="ims-finder">
              <div className="ims-finder-glass">
                <div className="ims-finder-live" aria-hidden="true" />
                <div className="ims-finder-paper" aria-hidden="true" />
                <div className="ims-finder-frame" aria-hidden="true" />
                <span className="ims-finder-mode">Document</span>
                <span className="ims-finder-hint">Hold over the paper</span>
              </div>
              <div className="ims-finder-modes" aria-hidden="true">
                <span className="ims-finder-mode-chip ims-finder-mode-chip-active">Document</span>
                <span className="ims-finder-mode-chip">Site</span>
                <span className="ims-finder-mode-chip">Meter</span>
              </div>
              <div className="ims-finder-shutter" aria-hidden="true">
                <span className="ims-finder-shutter-ring">
                  <span className="ims-finder-shutter-dot" />
                </span>
              </div>
            </div>
            <div className="ims-feed ims-feed-capture">
              <div className="ims-feed-head">
                <p className="ims-feed-heading">Last captured</p>
                <span className="ims-feed-note">{field.sync.offlineNote}</span>
              </div>
              <ul className="ims-capture-list">
                {field.feed
                  .filter((row) => !row.thumb)
                  .slice(0, 2)
                  .map((row) => (
                    <CaptureRow key={row.id} row={row} />
                  ))}
              </ul>
            </div>
          </>
        ) : (
          <>
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
              {field.secondaryActions.map((action) => {
                const Icon = actionIcons[action.id];
                return (
                  <span key={action.id} className="ims-action-secondary">
                    <Icon size={18} weight="bold" aria-hidden />
                    {action.label}
                  </span>
                );
              })}
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
          </>
        )}
      </div>

      <div className="ims-phone-foot">
        <nav className="ims-tabs" aria-label="Field app">
          {field.tabs.map((tabItem) => {
            const Icon = tabIcons[tabItem.id];
            const active = tabItem.id === selectedTab;
            return (
              <span
                key={tabItem.id}
                className={active ? "ims-tab ims-tab-active" : "ims-tab"}
                aria-current={active ? "page" : undefined}
              >
                <Icon size={21} weight={active ? "fill" : "regular"} aria-hidden />
                {tabItem.label}
              </span>
            );
          })}
        </nav>
        <div className="ims-home-pill" aria-hidden="true" />
      </div>
    </section>
  );
}
