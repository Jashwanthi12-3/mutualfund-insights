import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Info, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { DEFAULT_ANNUAL_RETURN } from "../constants";

// ─── Math helpers ────────────────────────────────────────────────────────────

function calcSIP(monthly: number, years: number, ratePercent: number) {
  const n = years * 12;
  const r = ratePercent / 100 / 12;
  if (r === 0) return { invested: monthly * n, future: monthly * n };
  const future = monthly * (((1 + r) ** n - 1) / r) * (1 + r);
  return { invested: monthly * n, future };
}

function calcLumpSum(principal: number, years: number, ratePercent: number) {
  const future = principal * (1 + ratePercent / 100) ** years;
  return { invested: principal, future };
}

function formatINR(val: number) {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)}Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(2)}L`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(2)}K`;
  return `₹${val.toFixed(2)}`;
}

// ─── Components ──────────────────────────────────────────────────────────────

function ResultCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-lg p-4 text-center ${
        highlight ? "bg-primary/10 border border-primary/20" : "bg-muted/40"
      }`}
    >
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p
        className={`text-xl font-bold font-display ${highlight ? "text-primary" : "text-foreground"}`}
      >
        {value}
      </p>
    </div>
  );
}

const PIE_COLORS = ["oklch(0.42 0.14 240)", "oklch(0.6 0.15 170)"];

function ResultsPieChart({
  invested,
  returns,
}: {
  invested: number;
  returns: number;
}) {
  const data = [
    { name: "Amount Invested", value: invested },
    { name: "Returns Earned", value: returns },
  ];
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={85}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((entry) => (
            <Cell
              key={entry.name}
              fill={PIE_COLORS[data.indexOf(entry)]}
              stroke="none"
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(v: number) => [formatINR(v)]}
          contentStyle={{
            backgroundColor: "oklch(1.0 0.004 230)",
            border: "1px solid oklch(0.9 0.008 230)",
            borderRadius: "6px",
            fontSize: "12px",
          }}
        />
        <Legend wrapperStyle={{ fontSize: "12px" }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

// ─── SIP Calculator ──────────────────────────────────────────────────────────

function SIPCalculator() {
  const [monthly, setMonthly] = useState("5000");
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(String(DEFAULT_ANNUAL_RETURN));
  const [computed, setComputed] = useState<{
    invested: number;
    future: number;
  } | null>(null);

  const calculate = () => {
    const m = Number.parseFloat(monthly);
    const r = Number.parseFloat(rate);
    if (!m || m <= 0 || !r || r <= 0 || years <= 0) return;
    setComputed(calcSIP(m, years, r));
  };

  const returns = computed ? computed.future - computed.invested : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="sip-monthly" className="text-sm">
            Monthly Investment (₹)
          </Label>
          <Input
            id="sip-monthly"
            type="number"
            min={100}
            value={monthly}
            onChange={(e) => setMonthly(e.target.value)}
            placeholder="5000"
            className="bg-background"
            data-ocid="input-sip-monthly"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sip-rate" className="text-sm">
            Annual Return Rate (%)
          </Label>
          <Input
            id="sip-rate"
            type="number"
            min={0.1}
            max={100}
            step={0.1}
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="bg-background"
            data-ocid="input-sip-rate"
          />
        </div>

        <div className="space-y-3 sm:col-span-2">
          <div className="flex justify-between items-center">
            <Label className="text-sm">Investment Period</Label>
            <span className="text-sm font-semibold text-primary">
              {years} {years === 1 ? "Year" : "Years"}
            </span>
          </div>
          <Slider
            min={1}
            max={30}
            step={1}
            value={[years]}
            onValueChange={([v]) => setYears(v)}
            className="w-full"
            data-ocid="slider-sip-years"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 Year</span>
            <span>30 Years</span>
          </div>
        </div>
      </div>

      <Button
        onClick={calculate}
        className="w-full sm:w-auto"
        size="lg"
        data-ocid="btn-calculate-sip"
      >
        <Calculator className="h-4 w-4 mr-2" />
        Calculate SIP Returns
      </Button>

      {computed && (
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <ResultCard
              label="Total Invested"
              value={formatINR(computed.invested)}
            />
            <ResultCard label="Returns Earned" value={formatINR(returns)} />
            <ResultCard
              label="Future Value"
              value={formatINR(computed.future)}
              highlight
            />
          </div>
          <Card className="bg-card border-border">
            <CardContent className="pt-4">
              <ResultsPieChart invested={computed.invested} returns={returns} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

// ─── Lump Sum Calculator ─────────────────────────────────────────────────────

function LumpSumCalculator() {
  const [principal, setPrincipal] = useState("100000");
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(String(DEFAULT_ANNUAL_RETURN));
  const [computed, setComputed] = useState<{
    invested: number;
    future: number;
  } | null>(null);

  const calculate = () => {
    const p = Number.parseFloat(principal);
    const r = Number.parseFloat(rate);
    if (!p || p <= 0 || !r || r <= 0 || years <= 0) return;
    setComputed(calcLumpSum(p, years, r));
  };

  const returns = computed ? computed.future - computed.invested : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="lump-principal" className="text-sm">
            Investment Amount (₹)
          </Label>
          <Input
            id="lump-principal"
            type="number"
            min={1000}
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="100000"
            className="bg-background"
            data-ocid="input-lump-principal"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lump-rate" className="text-sm">
            Annual Return Rate (%)
          </Label>
          <Input
            id="lump-rate"
            type="number"
            min={0.1}
            max={100}
            step={0.1}
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="bg-background"
            data-ocid="input-lump-rate"
          />
        </div>

        <div className="space-y-3 sm:col-span-2">
          <div className="flex justify-between items-center">
            <Label className="text-sm">Investment Period</Label>
            <span className="text-sm font-semibold text-primary">
              {years} {years === 1 ? "Year" : "Years"}
            </span>
          </div>
          <Slider
            min={1}
            max={30}
            step={1}
            value={[years]}
            onValueChange={([v]) => setYears(v)}
            className="w-full"
            data-ocid="slider-lump-years"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 Year</span>
            <span>30 Years</span>
          </div>
        </div>
      </div>

      <Button
        onClick={calculate}
        className="w-full sm:w-auto"
        size="lg"
        data-ocid="btn-calculate-lump"
      >
        <Calculator className="h-4 w-4 mr-2" />
        Calculate Returns
      </Button>

      {computed && (
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <ResultCard
              label="Amount Invested"
              value={formatINR(computed.invested)}
            />
            <ResultCard label="Returns Earned" value={formatINR(returns)} />
            <ResultCard
              label="Future Value"
              value={formatINR(computed.future)}
              highlight
            />
          </div>
          <Card className="bg-card border-border">
            <CardContent className="pt-4">
              <ResultsPieChart invested={computed.invested} returns={returns} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function CalculatorPage() {
  return (
    <div className="flex-1 bg-background" data-ocid="calculator-page">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-5">
        <div className="flex items-center gap-3 mb-1">
          <Calculator className="h-5 w-5 text-primary" />
          <h1 className="font-display text-xl font-bold text-foreground">
            Investment Calculator
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Project your SIP or lump sum investment returns over time
        </p>
      </div>

      <div className="p-6 max-w-3xl">
        <Tabs defaultValue="sip" data-ocid="calculator-tabs">
          <TabsList className="mb-6" data-ocid="tabs-list">
            <TabsTrigger value="sip" data-ocid="tab-sip">
              SIP Calculator
            </TabsTrigger>
            <TabsTrigger value="lumpsum" data-ocid="tab-lumpsum">
              Lump Sum Calculator
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sip">
            <Card className="bg-card border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Systematic Investment Plan (SIP)
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-1">
                  Invest a fixed amount every month and watch your wealth grow
                </p>
              </CardHeader>
              <CardContent>
                <SIPCalculator />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lumpsum">
            <Card className="bg-card border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Lump Sum Investment
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-1">
                  Invest a one-time amount and calculate the future value
                </p>
              </CardHeader>
              <CardContent>
                <LumpSumCalculator />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Disclaimer */}
        <div className="mt-6 flex items-start gap-3 p-4 rounded-lg bg-muted/40 border border-border">
          <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong>Disclaimer:</strong> All calculations are for illustration
            purposes only. Mutual fund investments are subject to market risks.
            Past performance is not indicative of future returns. Please read
            all scheme related documents carefully before investing. The default
            annual return of {DEFAULT_ANNUAL_RETURN}% is for reference only and
            does not guarantee actual returns.
          </p>
        </div>
      </div>
    </div>
  );
}
