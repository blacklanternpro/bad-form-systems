import {
  Briefcase,
  Camera,
  Certificate,
  Clock,
  HardHat,
  ListChecks,
  Path,
} from "@phosphor-icons/react/ssr";
import { imsCopy, type ImsPaintId } from "@/content/ims";

interface DeskImsProps {
  paint: ImsPaintId;
}

const navIcons = {
  jobs: Briefcase,
  capture: Camera,
  hours: Clock,
  prestart: ListChecks,
  variations: Path,
  certificates: Certificate,
  plant: HardHat,
} as const;

export function DeskIms({ paint }: DeskImsProps) {
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
        </p>
        <p className="ims-desk-job">{imsCopy.jobTitle}</p>
        <span className="ims-demo">{imsCopy.demo}</span>
      </header>

      <nav className="ims-desk-nav" aria-label="IMS">
        {imsCopy.nav.map((item) => {
          const Icon = navIcons[item.id as keyof typeof navIcons];
          const active = item.id === imsCopy.selectedNav;
          return (
            <span
              key={item.id}
              className={active ? "ims-nav-item ims-nav-item-active" : "ims-nav-item"}
              aria-current={active ? "page" : undefined}
            >
              <Icon size={20} weight={active ? "bold" : "regular"} aria-hidden />
              {item.label}
            </span>
          );
        })}
      </nav>

      <div className="ims-desk-main">
        <div className="ims-desk-heading-row">
          <h1 className="ims-desk-heading">{imsCopy.jobsHeading}</h1>
          <div className="ims-filters" aria-label="Job status">
            {imsCopy.filters.map((filter) => (
              <span
                key={filter}
                className={
                  filter === imsCopy.selectedFilter ? "ims-filter ims-filter-active" : "ims-filter"
                }
              >
                {filter}
              </span>
            ))}
          </div>
        </div>
        <table className="ims-table">
          <thead>
            <tr>
              {imsCopy.tableColumns.map((column) => (
                <th key={column} scope="col">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {imsCopy.jobs.map((row) => (
              <tr key={row.job} className={row.status === "live" ? "ims-row-live" : undefined}>
                <td className="ims-table-job">{row.job}</td>
                <td>{row.hours}</td>
                <td>{row.plant}</td>
                <td>
                  <span className={row.status === "live" ? "ims-chip ims-chip-live" : "ims-chip"}>
                    {row.statusLabel}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <aside className="ims-books">
        <p className="ims-books-heading">{imsCopy.books.heading}</p>
        <p className="ims-books-lead">{imsCopy.books.lead}</p>
        {imsCopy.books.stats.map((stat) => (
          <p key={stat.label} className="ims-books-stat">
            <span>{stat.label}</span>
            <span>{stat.value}</span>
          </p>
        ))}
        <p className="ims-activity-heading">{imsCopy.activityHeading}</p>
        {imsCopy.activity.map((item) => (
          <p key={item.label} className="ims-activity-row">
            <span>{item.label}</span>
            <span>{item.value}</span>
          </p>
        ))}
        <p className="ims-books-foot">{imsCopy.books.foot}</p>
      </aside>
    </section>
  );
}
