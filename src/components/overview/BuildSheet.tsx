import { overview, type SheetRow } from "@/content/overview";

interface SheetRowItemProps {
  row: SheetRow;
  index: number;
  customTag: string;
  blankLabel: string;
}

/**
 * A button we might draw, and the argument for it. Deliberately spans, not
 * buttons: nothing here is operable, and announcing six fake buttons to a
 * screen reader would be a lie the sighted reader never has to hear.
 */
function SheetRowItem({ row, index, customTag, blankLabel }: SheetRowItemProps) {
  return (
    <li className="reveal grid gap-4 p-4 md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] md:gap-8 md:p-6">
      <div className="flex items-start gap-3">
        <span className="type-data mt-4 text-[0.7rem] text-brand-steel" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={`flex min-h-14 w-full flex-col items-center justify-center gap-1.5 border-2 border-brand-ink px-4 py-3 text-center ${
            row.unnamed ? "border-dashed bg-brand-stamp" : "bg-brand-card"
          }`}
        >
          {row.unnamed ? (
            <>
              <span
                className="h-4 w-full border-b-2 border-dotted border-brand-ink/70"
                aria-hidden="true"
              />
              <span className="type-docket text-[0.7rem] leading-tight text-brand-ink/70">
                {blankLabel}
              </span>
            </>
          ) : (
            <span className="type-docket text-[0.9rem] leading-tight text-brand-ink">
              {row.label}
            </span>
          )}
        </span>
      </div>

      <div>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="type-data text-[0.7rem] text-brand-steel">{row.trade}</span>
          {row.custom ? (
            <span className="type-data border border-brand-cobalt px-1.5 py-0.5 text-[0.65rem] text-brand-cobalt">
              {customTag}
            </span>
          ) : null}
        </p>
        <p className="type-docket mt-2 max-w-[52ch] text-[0.9rem] leading-6 text-brand-ink">
          {row.why}
        </p>
      </div>
    </li>
  );
}

export function BuildSheet() {
  const { title, lead, sheetLabel, sheetMeta, customTag, blankLabel, rows, foot } =
    overview.custom.sheet;

  return (
    <div className="mt-14 md:mt-16">
      <h3 className="type-hero max-w-[24ch] text-[1.1rem] text-brand-ink md:text-[1.25rem]">
        {title}
      </h3>
      <p className="type-body mt-4 max-w-[58ch] text-brand-steel">{lead}</p>

      <div className="mt-8 max-w-4xl border-2 border-brand-ink bg-brand-surface">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b-2 border-brand-ink bg-brand-header px-4 py-3 md:px-6">
          <p className="type-data text-[0.7rem] text-brand-ink">{sheetLabel}</p>
          <p className="type-data text-[0.7rem] text-brand-ink/70">{sheetMeta}</p>
        </div>

        <ol className="divide-y-2 divide-brand-ply">
          {rows.map((row, index) => (
            <SheetRowItem
              key={row.unnamed ? "unnamed" : row.label}
              row={row}
              index={index}
              customTag={customTag}
              blankLabel={blankLabel}
            />
          ))}
        </ol>

        <p className="type-meta border-t-2 border-brand-ink px-4 py-3 text-brand-ink md:px-6">
          {foot}
        </p>
      </div>
    </div>
  );
}
