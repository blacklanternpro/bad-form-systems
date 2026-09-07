"use client";

import { CopySimple } from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { docketPresets, labCopy } from "@/content/lab";

const presetKeys = Object.keys(docketPresets);

export function DocketLab() {
  const [preset, setPreset] = useState(presetKeys[0] ?? "trades");
  const [input, setInput] = useState(docketPresets[preset]?.text ?? "");
  const [output, setOutput] = useState(labCopy.placeholder);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const canSubmit = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  async function runIngest() {
    const promptText = input.trim();
    if (!promptText) {
      setError(labCopy.emptyError);
      return;
    }
    setLoading(true);
    setError(null);
    setCopied(false);
    try {
      const res = await fetch("/api/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: promptText }),
      });
      const data: unknown = await res.json();
      setOutput(JSON.stringify(data, null, 2));
    } catch {
      setError(labCopy.failError);
    } finally {
      setLoading(false);
    }
  }

  async function copyOutput() {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
    } catch {
      setError(labCopy.copyError);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {presetKeys.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                setPreset(key);
                setInput(docketPresets[key].text);
                setError(null);
              }}
              className={
                preset === key
                  ? "rounded-sm bg-brand-stamp px-3 py-1.5 text-sm font-semibold text-brand-cobalt"
                  : "rounded-sm border border-brand-border bg-brand-surface px-3 py-1.5 text-sm text-brand-steel hover:text-brand-ink"
              }
            >
              {docketPresets[key].label}
            </button>
          ))}
        </div>
        <div>
          <label htmlFor="docketInput" className="type-label mb-2 block">
            {labCopy.inputLabel}
          </label>
          <textarea
            id="docketInput"
            rows={12}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="field-control type-data min-h-[16rem] resize-y text-sm"
          />
          <div className="mt-4 flex items-center justify-between gap-4">
            <span className="type-meta">Demo engine</span>
            <button type="button" onClick={runIngest} disabled={!canSubmit} className="btn-primary">
              {labCopy.processLabel}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col border-t border-brand-border pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="type-title text-lg text-brand-ink">{labCopy.outputHeading}</h2>
          <button
            type="button"
            onClick={copyOutput}
            className="inline-flex items-center gap-1 text-sm text-brand-steel hover:text-brand-ink"
          >
            <CopySimple size={14} aria-hidden />
            <span>{copied ? "Copied" : labCopy.copyLabel}</span>
          </button>
        </div>
        {error ? (
          <p className="mb-3 text-sm text-red-300" role="alert">
            {error}
          </p>
        ) : null}
        {loading ? (
          <p className="type-meta py-16 text-center">{labCopy.loading}</p>
        ) : (
          <pre className="type-data max-h-[24rem] overflow-auto bg-brand-surface p-4 text-[0.8125rem] leading-relaxed text-brand-ink">
            {output}
          </pre>
        )}
        <div className="mt-4 flex items-center justify-between gap-3 type-meta">
          <span>{labCopy.footerLeft}</span>
          <span>{labCopy.footerRight}</span>
        </div>
      </div>
    </div>
  );
}
