"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { calculatorCopy, calculatorDefaults } from "@/content/calculator";
import { calculateGhostTax, formatAud } from "@/lib/calculator";

export function GhostTaxCalculator() {
  const [hours, setHours] = useState(calculatorDefaults.hours);
  const [rate, setRate] = useState(calculatorDefaults.rate);
  const [lag, setLag] = useState(calculatorDefaults.lag);
  const [leakage, setLeakage] = useState(calculatorDefaults.leakage);

  const result = useMemo(
    () => calculateGhostTax({ hours, rate, lag, leakage }),
    [hours, rate, lag, leakage],
  );

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
      <div className="space-y-7">
        <h2 className="type-title text-xl text-brand-ink">{calculatorCopy.controlsHeading}</h2>
        <SliderRow
          label="Hours retyping and chasing dockets, per week"
          valueLabel={`${hours} hrs`}
          min={calculatorDefaults.hoursMin}
          max={calculatorDefaults.hoursMax}
          value={hours}
          onChange={setHours}
          help={calculatorCopy.hoursHelp}
        />
        <SliderRow
          label="Loaded admin rate, per hour"
          valueLabel={`$${rate}/hr`}
          min={calculatorDefaults.rateMin}
          max={calculatorDefaults.rateMax}
          step={calculatorDefaults.rateStep}
          value={rate}
          onChange={setRate}
        />
        <SliderRow
          label="Days from job done to invoice sent"
          valueLabel={`${lag} days`}
          min={calculatorDefaults.lagMin}
          max={calculatorDefaults.lagMax}
          value={lag}
          onChange={setLag}
        />
        <SliderRow
          label="Unbilled extras and lost dockets, per month"
          valueLabel={formatAud(leakage)}
          min={calculatorDefaults.leakageMin}
          max={calculatorDefaults.leakageMax}
          step={calculatorDefaults.leakageStep}
          value={leakage}
          onChange={setLeakage}
          help={calculatorCopy.leakageHelp}
        />
      </div>

      <div className="flex flex-col justify-between border-t border-brand-border pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
        <div>
          <p className="type-meta mb-3">{calculatorCopy.resultLabel}</p>
          <p className="type-data text-4xl font-medium tracking-tight text-brand-ink sm:text-5xl">
            {formatAud(result.totalGhostTax)}
          </p>
          <p className="type-body mt-3 text-brand-steel">{calculatorCopy.totalCaption}</p>
          <dl className="mt-8 space-y-3 text-sm">
            <div className="flex justify-between gap-4 border-b border-brand-border/80 py-2">
              <dt className="text-brand-steel">{calculatorCopy.adminLabel}</dt>
              <dd className="type-data font-medium text-brand-ink">{formatAud(result.directLaborYear)}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-brand-border/80 py-2">
              <dt className="text-brand-steel">{calculatorCopy.leakageLabel}</dt>
              <dd className="type-data font-medium text-brand-ink">{formatAud(result.leakageYear)}</dd>
            </div>
            <div className="flex justify-between gap-4 py-2">
              <dt className="text-brand-steel">{calculatorCopy.cashTrapLabel}</dt>
              <dd className="type-data font-medium text-brand-ink">
                {result.cashTrapDays}
                {calculatorCopy.cashTrapSuffix}
              </dd>
            </div>
          </dl>
        </div>
        <Link href={calculatorCopy.cta.href} className="btn-primary mt-10 w-full">
          <span>{calculatorCopy.cta.label}</span>
          <ArrowRight size={16} weight="bold" />
        </Link>
      </div>
    </div>
  );
}

function SliderRow({
  label,
  valueLabel,
  min,
  max,
  step = 1,
  value,
  onChange,
  help,
}: {
  label: string;
  valueLabel: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  help?: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-end justify-between gap-4">
        <label className="text-sm text-brand-ink">{label}</label>
        <span className="type-data shrink-0 text-sm font-medium text-brand-cobalt">{valueLabel}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full"
        aria-label={label}
      />
      {help ? <p className="type-meta mt-1.5">{help}</p> : null}
    </div>
  );
}
