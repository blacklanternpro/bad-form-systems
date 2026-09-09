import {
  Camera,
  Clock,
  ListChecks,
} from "@phosphor-icons/react/ssr";
import { imsCopy, type ImsPaintId } from "@/content/ims";

interface PhoneImsProps {
  paint: ImsPaintId;
}

const primaryIcons = {
  capture: Camera,
  hours: Clock,
  prestart: ListChecks,
} as const;

export function PhoneIms({ paint }: PhoneImsProps) {
  return (
    <section
      data-ims-capture=""
      data-ims-paint={paint}
      data-ims-device="phone"
      className="ims-shell ims-phone"
      aria-label={imsCopy.demoNote}
    >
      <div className="ims-status" aria-hidden="true">
        <span>9:41</span>
        <span className="ims-status-glyphs">
          <span className="ims-glyph-bar" />
        </span>
      </div>

      <header className="ims-phone-head">
        <div className="ims-phone-head-row">
          <h1 className="ims-phone-job">{imsCopy.jobTitle}</h1>
          <span className="ims-demo">{imsCopy.demo}</span>
        </div>
        <p className="ims-kicker">Open job</p>
      </header>

      <div className="ims-tiles">
        {imsCopy.tiles.map((tile) => (
          <div key={tile.label} className="ims-tile">
            <span className="ims-tile-label">{tile.label}</span>
            <span className="ims-tile-value">{tile.value}</span>
          </div>
        ))}
      </div>

      <div className="ims-actions">
        {imsCopy.primary.map((action, index) => {
          const Icon = primaryIcons[action.id as keyof typeof primaryIcons];
          return (
            <button
              key={action.id}
              type="button"
              className={index === 0 ? "ims-action ims-action-primary" : "ims-action"}
            >
              <Icon size={28} weight="regular" aria-hidden />
              <span className="ims-action-copy">
                <span className="ims-action-label">{action.label}</span>
                <span className="ims-action-hint">{action.hint}</span>
              </span>
            </button>
          );
        })}
      </div>

      <nav className="ims-secondary" aria-label="More on this job">
        {imsCopy.secondary.map((item) => (
          <span key={item.id} className="ims-secondary-item">
            {item.label}
          </span>
        ))}
      </nav>
      <div className="ims-home-pill" aria-hidden="true" />
    </section>
  );
}
