import {
  Briefcase,
  Camera,
  CaretRight,
  Certificate,
  Clock,
  FolderOpen,
  ListChecks,
  Path,
} from "@phosphor-icons/react/ssr";
import { imsCopy, type ImsPaintId } from "@/content/ims";

interface PhoneImsProps {
  paint: ImsPaintId;
}

const listIcons = {
  capture: Camera,
  hours: Clock,
  prestart: ListChecks,
  jobs: Briefcase,
  variations: Path,
  certificates: Certificate,
} as const;

const tabIcons = {
  jobs: FolderOpen,
  capture: Camera,
  hours: Clock,
} as const;

export function PhoneIms({ paint }: PhoneImsProps) {
  const list = [...imsCopy.primary, ...imsCopy.secondary];

  return (
    <section
      data-ims-capture=""
      data-ims-paint={paint}
      data-ims-device="phone"
      className="ims-shell ims-phone"
      aria-label={imsCopy.demoNote}
    >
      <div className="ims-phone-chrome">
        <div className="ims-status" aria-hidden="true">
          <span>9:41</span>
          <span className="ims-status-glyphs">
            <span className="ims-glyph-signal" />
            <span className="ims-glyph-bar" />
          </span>
        </div>

        <header className="ims-phone-banner">
          <div className="ims-phone-head-row">
            <h1 className="ims-phone-job">{imsCopy.jobTitle}</h1>
            <span className="ims-demo ims-demo-on-accent">{imsCopy.demo}</span>
          </div>
          <p className="ims-kicker">{imsCopy.openJob}</p>
        </header>
      </div>

      <div className="ims-phone-body">
        <div className="ims-tiles">
          {imsCopy.tiles.map((tile) => (
            <div key={tile.label} className="ims-tile">
              <span className="ims-tile-label">{tile.label}</span>
              <span className="ims-tile-value">{tile.value}</span>
            </div>
          ))}
        </div>

        <div className="ims-list">
          {list.map((item, index) => {
            const Icon = listIcons[item.id as keyof typeof listIcons];
            const hint = "hint" in item ? item.hint : undefined;
            return (
              <div
                key={item.id}
                className={index === 0 ? "ims-list-row ims-list-row-primary" : "ims-list-row"}
              >
                <span className="ims-list-icon" aria-hidden="true">
                  <Icon size={22} weight="regular" />
                </span>
                <span className="ims-list-copy">
                  <span className="ims-list-label">{item.label}</span>
                  {hint ? <span className="ims-list-hint">{hint}</span> : null}
                </span>
                <CaretRight size={16} weight="bold" className="ims-list-caret" aria-hidden />
              </div>
            );
          })}
        </div>
      </div>

      <div className="ims-phone-foot">
        <nav className="ims-tabs" aria-label="Field app">
          {imsCopy.tabs.map((tab) => {
            const Icon = tabIcons[tab.id as keyof typeof tabIcons];
            const active = tab.id === imsCopy.selectedTab;
            return (
              <span
                key={tab.id}
                className={active ? "ims-tab ims-tab-active" : "ims-tab"}
                aria-current={active ? "page" : undefined}
              >
                <Icon size={22} weight={active ? "bold" : "regular"} aria-hidden />
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
