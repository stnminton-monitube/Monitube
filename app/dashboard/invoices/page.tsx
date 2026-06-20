"use client";

import { useState } from "react";
import {
  IconFileInvoice,
  IconPlus,
  IconReceipt,
  IconAlertTriangle,
  IconCurrencyDollar,
  IconDownload,
  IconEye,
  IconDeviceFloppy,
  IconTrash,
  IconChevronDown,
  IconChevronUp,
  IconFileZip,
  IconShieldCheck,
  IconCheck,
  IconPalette,
} from "@tabler/icons-react";

/* ─── Types ─────────────────────────────────────────────────── */

type InvoiceStatus = "paid" | "pending" | "overdue";

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

interface Invoice {
  id: string;
  number: string;
  date: string;
  dueDate: string;
  member: string;
  role: "editor" | "writer" | "thumbnail_designer" | "assistant_editor";
  description: string;
  amount: number;
  status: InvoiceStatus;
}

/* ─── Role config ───────────────────────────────────────────── */

const ROLE_COLORS: Record<string, string> = {
  editor: "bg-purple-100 text-purple-700",
  writer: "bg-blue-100 text-blue-700",
  thumbnail_designer: "bg-pink-100 text-pink-700",
  assistant_editor: "bg-orange-100 text-orange-700",
};

const ROLE_LABELS: Record<string, string> = {
  editor: "Editor",
  writer: "Writer",
  thumbnail_designer: "Designer",
  assistant_editor: "Asst. Editor",
};

const STATUS_STYLES: Record<InvoiceStatus, string> = {
  paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  overdue: "bg-red-50 text-red-700 border-red-200",
};

const STATUS_LABELS: Record<InvoiceStatus, string> = {
  paid: "Paid",
  pending: "Pending",
  overdue: "Overdue",
};

const ACCENT_COLORS: { label: string; value: string; hex: string }[] = [
  { label: "Purple", value: "purple", hex: "#7B6EF6" },
  { label: "Blue", value: "blue", hex: "#3B82F6" },
  { label: "Green", value: "green", hex: "#10B981" },
  { label: "Zinc", value: "zinc", hex: "#71717A" },
];

/* ─── Demo data ─────────────────────────────────────────────── */

const DEMO_INVOICES: Invoice[] = [
  { id: "i01", number: "INV-2026-001", date: "2026-06-18", dueDate: "2026-07-02", member: "Jake Morrison", role: "editor", description: "Video editing - Episode 45", amount: 475, status: "paid" },
  { id: "i02", number: "INV-2026-002", date: "2026-06-15", dueDate: "2026-06-29", member: "Sofia Chen", role: "thumbnail_designer", description: "Thumbnail batch - 5 variants", amount: 325, status: "paid" },
  { id: "i03", number: "INV-2026-003", date: "2026-06-12", dueDate: "2026-06-26", member: "Marcus Williams", role: "writer", description: "Script writing - Algorithm video", amount: 275, status: "pending" },
  { id: "i04", number: "INV-2026-004", date: "2026-06-10", dueDate: "2026-06-24", member: "Priya Sharma", role: "editor", description: "Video editing - Editing Apps review", amount: 380, status: "paid" },
  { id: "i05", number: "INV-2026-005", date: "2026-06-01", dueDate: "2026-06-15", member: "Priya Sharma", role: "editor", description: "Monthly retainer - June 2026", amount: 2800, status: "overdue" },
  { id: "i06", number: "INV-2026-006", date: "2026-05-28", dueDate: "2026-06-11", member: "Jake Morrison", role: "editor", description: "Video editing - Camera Tricks episode", amount: 500, status: "paid" },
  { id: "i07", number: "INV-2026-007", date: "2026-05-22", dueDate: "2026-06-05", member: "Marcus Williams", role: "writer", description: "Script writing - 5 Camera Tricks", amount: 250, status: "paid" },
  { id: "i08", number: "INV-2026-008", date: "2026-05-15", dueDate: "2026-05-29", member: "Tyler Brooks", role: "assistant_editor", description: "Color grading & SFX pass", amount: 350, status: "paid" },
  { id: "i09", number: "INV-2026-009", date: "2026-05-10", dueDate: "2026-05-24", member: "Sofia Chen", role: "thumbnail_designer", description: "Thumbnail batch - Studio build", amount: 200, status: "pending" },
  { id: "i10", number: "INV-2026-010", date: "2026-05-01", dueDate: "2026-05-15", member: "Rachel Kim", role: "writer", description: "Script research & draft - Views video", amount: 300, status: "paid" },
];

const TEAM_MEMBERS = [
  { name: "Jake Morrison", email: "jake@email.com", role: "editor" },
  { name: "Sofia Chen", email: "sofia@email.com", role: "thumbnail_designer" },
  { name: "Marcus Williams", email: "marcus@email.com", role: "writer" },
  { name: "Priya Sharma", email: "priya@email.com", role: "editor" },
  { name: "Tyler Brooks", email: "tyler@email.com", role: "assistant_editor" },
  { name: "Rachel Kim", email: "rachel@email.com", role: "writer" },
];

/* ─── Helpers ───────────────────────────────────────────────── */

function fmtDollars(n: number): string {
  return "$" + n.toLocaleString();
}

function fmtDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* ─── Component ─────────────────────────────────────────────── */

export default function InvoicesPage() {
  const [statusFilter, setStatusFilter] = useState<"all" | InvoiceStatus>("all");
  const [showForm, setShowForm] = useState(false);
  const [accentColor, setAccentColor] = useState("purple");
  const [showLogo, setShowLogo] = useState(true);

  // Form state
  const [fromName, setFromName] = useState("Your Channel Name");
  const [fromEmail, setFromEmail] = useState("you@yourchannel.com");
  const [fromAddress, setFromAddress] = useState("123 Creator St, Los Angeles, CA 90001");
  const [toMember, setToMember] = useState(TEAM_MEMBERS[0].name);
  const [invoiceNumber, setInvoiceNumber] = useState("INV-2026-011");
  const [dateIssued, setDateIssued] = useState("2026-06-20");
  const [dateDue, setDateDue] = useState("2026-07-04");
  const [notes, setNotes] = useState("");
  const [taxPercent, setTaxPercent] = useState(0);
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: "li1", description: "Video editing - Episode 46", quantity: 1, rate: 400 },
  ]);

  // Computed
  const filteredInvoices = statusFilter === "all"
    ? DEMO_INVOICES
    : DEMO_INVOICES.filter((inv) => inv.status === statusFilter);

  const thisMonthInvoices = DEMO_INVOICES.filter((inv) => inv.date.startsWith("2026-06"));
  const invoicesThisMonth = thisMonthInvoices.length;
  const totalInvoiced = DEMO_INVOICES.reduce((s, inv) => s + inv.amount, 0);
  const outstanding = DEMO_INVOICES.filter((inv) => inv.status === "pending" || inv.status === "overdue")
    .reduce((s, inv) => s + inv.amount, 0);

  const subtotal = lineItems.reduce((s, li) => s + li.quantity * li.rate, 0);
  const taxAmount = Math.round(subtotal * (taxPercent / 100));
  const invoiceTotal = subtotal + taxAmount;

  const selectedAccent = ACCENT_COLORS.find((c) => c.value === accentColor) ?? ACCENT_COLORS[0];
  const toMemberData = TEAM_MEMBERS.find((m) => m.name === toMember);

  function addLineItem() {
    setLineItems([
      ...lineItems,
      { id: `li${Date.now()}`, description: "", quantity: 1, rate: 0 },
    ]);
  }

  function removeLineItem(id: string) {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((li) => li.id !== id));
    }
  }

  function updateLineItem(id: string, field: keyof Omit<LineItem, "id">, value: string | number) {
    setLineItems(lineItems.map((li) => li.id === id ? { ...li, [field]: value } : li));
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading text-2xl font-medium tracking-tight text-zinc-900">
                Invoices
              </h1>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r from-[#7B6EF6] to-[#E96BF5] text-white uppercase tracking-wider">
                Pro
              </span>
            </div>
            <p className="text-[13px] text-zinc-500 mt-1">
              Generate professional invoices and keep records organized for tax time.
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7B6EF6] to-[#E96BF5] text-white text-[13px] font-medium cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all flex items-center gap-1.5"
        >
          <IconPlus size={15} />
          Create Invoice
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-zinc-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
              <IconFileInvoice size={16} className="text-[#7B6EF6]" />
            </div>
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">
              Invoices This Month
            </p>
          </div>
          <p className="font-heading text-2xl font-medium tracking-tight text-zinc-900 font-mono">
            {invoicesThisMonth}
          </p>
          <p className="text-[11px] text-zinc-400 mt-1">June 2026</p>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <IconCurrencyDollar size={16} className="text-emerald-600" />
            </div>
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">
              Total Invoiced
            </p>
          </div>
          <p className="font-heading text-2xl font-medium tracking-tight text-zinc-900 font-mono">
            {fmtDollars(totalInvoiced)}
          </p>
          <p className="text-[11px] text-zinc-400 mt-1">
            {DEMO_INVOICES.length} invoices total
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
              <IconAlertTriangle size={16} className="text-amber-600" />
            </div>
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">
              Outstanding
            </p>
          </div>
          <p className="font-heading text-2xl font-medium tracking-tight text-zinc-900 font-mono">
            {fmtDollars(outstanding)}
          </p>
          <p className="text-[11px] text-zinc-400 mt-1">
            {DEMO_INVOICES.filter((i) => i.status !== "paid").length} unpaid invoices
          </p>
        </div>
      </div>

      {/* Create Invoice Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden mb-8">
          <button
            onClick={() => setShowForm(false)}
            className="w-full px-6 py-4 border-b border-zinc-100 flex items-center justify-between cursor-pointer hover:bg-zinc-50/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <IconFileInvoice size={16} className="text-[#7B6EF6]" />
              <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">
                Create New Invoice
              </p>
            </div>
            <IconChevronUp size={16} className="text-zinc-400" />
          </button>

          <div className="p-6">
            {/* From / To */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* From */}
              <div>
                <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mb-3">
                  From
                </p>
                <div className="space-y-2.5">
                  <input
                    type="text"
                    value={fromName}
                    onChange={(e) => setFromName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-[13px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/20 focus:border-[#7B6EF6]/40"
                    placeholder="Your name / channel"
                  />
                  <input
                    type="email"
                    value={fromEmail}
                    onChange={(e) => setFromEmail(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-[13px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/20 focus:border-[#7B6EF6]/40"
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    value={fromAddress}
                    onChange={(e) => setFromAddress(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-[13px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/20 focus:border-[#7B6EF6]/40"
                    placeholder="Address"
                  />
                </div>
              </div>

              {/* To */}
              <div>
                <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mb-3">
                  To
                </p>
                <div className="space-y-2.5">
                  <select
                    value={toMember}
                    onChange={(e) => setToMember(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-[13px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/20 focus:border-[#7B6EF6]/40 bg-white"
                  >
                    {TEAM_MEMBERS.map((m) => (
                      <option key={m.name} value={m.name}>{m.name}</option>
                    ))}
                  </select>
                  <input
                    type="email"
                    value={toMemberData?.email ?? ""}
                    readOnly
                    className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-[13px] text-zinc-400 bg-zinc-50"
                  />
                </div>
              </div>
            </div>

            {/* Invoice details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="text-[12px] text-zinc-600 font-medium mb-1.5 block">
                  Invoice Number
                </label>
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-[13px] text-zinc-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/20 focus:border-[#7B6EF6]/40"
                />
              </div>
              <div>
                <label className="text-[12px] text-zinc-600 font-medium mb-1.5 block">
                  Date Issued
                </label>
                <input
                  type="date"
                  value={dateIssued}
                  onChange={(e) => setDateIssued(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-[13px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/20 focus:border-[#7B6EF6]/40"
                />
              </div>
              <div>
                <label className="text-[12px] text-zinc-600 font-medium mb-1.5 block">
                  Due Date
                </label>
                <input
                  type="date"
                  value={dateDue}
                  onChange={(e) => setDateDue(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-[13px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/20 focus:border-[#7B6EF6]/40"
                />
              </div>
            </div>

            {/* Line items table */}
            <div className="mb-6">
              <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mb-3">
                Line Items
              </p>
              <div className="border border-zinc-200 rounded-xl overflow-hidden">
                {/* Table header */}
                <div className="grid grid-cols-[1fr_80px_100px_100px_40px] gap-3 px-4 py-2.5 bg-zinc-50/50 border-b border-zinc-100">
                  <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">Description</p>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium text-right">Qty</p>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium text-right">Rate</p>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium text-right">Amount</p>
                  <p></p>
                </div>
                {/* Table rows */}
                {lineItems.map((li) => (
                  <div key={li.id} className="grid grid-cols-[1fr_80px_100px_100px_40px] gap-3 px-4 py-2 items-center border-b border-zinc-50 last:border-0">
                    <input
                      type="text"
                      value={li.description}
                      onChange={(e) => updateLineItem(li.id, "description", e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg border border-zinc-100 text-[13px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/20 focus:border-[#7B6EF6]/40"
                      placeholder="Description"
                    />
                    <input
                      type="number"
                      value={li.quantity}
                      onChange={(e) => updateLineItem(li.id, "quantity", Number(e.target.value))}
                      className="w-full px-2 py-1.5 rounded-lg border border-zinc-100 text-[13px] text-zinc-900 font-mono text-right focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/20 focus:border-[#7B6EF6]/40"
                    />
                    <div className="relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[13px] text-zinc-400 font-mono">$</span>
                      <input
                        type="number"
                        value={li.rate}
                        onChange={(e) => updateLineItem(li.id, "rate", Number(e.target.value))}
                        className="w-full pl-6 pr-2 py-1.5 rounded-lg border border-zinc-100 text-[13px] text-zinc-900 font-mono text-right focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/20 focus:border-[#7B6EF6]/40"
                      />
                    </div>
                    <p className="text-[13px] text-zinc-900 font-mono text-right font-medium">
                      {fmtDollars(li.quantity * li.rate)}
                    </p>
                    <button
                      onClick={() => removeLineItem(li.id)}
                      className="p-1 rounded-lg hover:bg-red-50 text-zinc-300 hover:text-red-500 cursor-pointer transition-colors"
                    >
                      <IconTrash size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={addLineItem}
                className="mt-2 flex items-center gap-1.5 text-[12px] text-[#7B6EF6] font-medium cursor-pointer hover:text-[#6358d4] transition-colors"
              >
                <IconPlus size={13} />
                Add line item
              </button>
            </div>

            {/* Subtotal / Tax / Total */}
            <div className="flex justify-end mb-6">
              <div className="w-full max-w-xs space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] text-zinc-500">Subtotal</p>
                  <p className="text-[13px] text-zinc-900 font-mono font-medium">{fmtDollars(subtotal)}</p>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] text-zinc-500">Tax</p>
                    <input
                      type="number"
                      value={taxPercent}
                      onChange={(e) => setTaxPercent(Number(e.target.value))}
                      className="w-14 px-2 py-1 rounded-lg border border-zinc-100 text-[12px] text-zinc-900 font-mono text-right focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/20 focus:border-[#7B6EF6]/40"
                      min={0}
                      max={100}
                    />
                    <span className="text-[12px] text-zinc-400">%</span>
                  </div>
                  <p className="text-[13px] text-zinc-900 font-mono font-medium">{fmtDollars(taxAmount)}</p>
                </div>
                <div className="border-t border-zinc-200 pt-2 flex items-center justify-between">
                  <p className="text-[14px] text-zinc-900 font-medium">Total</p>
                  <p className="text-[16px] text-emerald-700 font-mono font-semibold">{fmtDollars(invoiceTotal)}</p>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="mb-6">
              <label className="text-[12px] text-zinc-600 font-medium mb-1.5 block">
                Notes (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-[13px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/20 focus:border-[#7B6EF6]/40 resize-none"
                placeholder="Payment terms, thank you note, or any additional details..."
              />
            </div>

            {/* Style options */}
            <div className="flex flex-wrap items-center gap-6 mb-6 p-4 rounded-xl bg-zinc-50 border border-zinc-100">
              <div className="flex items-center gap-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showLogo}
                    onChange={(e) => setShowLogo(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-zinc-200 peer-focus:ring-2 peer-focus:ring-[#7B6EF6]/20 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#7B6EF6]"></div>
                </label>
                <span className="text-[12px] text-zinc-600">Show channel logo</span>
              </div>
              <div className="flex items-center gap-2">
                <IconPalette size={14} className="text-zinc-400" />
                <span className="text-[12px] text-zinc-600">Accent:</span>
                <div className="flex items-center gap-1.5">
                  {ACCENT_COLORS.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => setAccentColor(c.value)}
                      className={`w-6 h-6 rounded-full cursor-pointer transition-all flex items-center justify-center ${
                        accentColor === c.value ? "ring-2 ring-offset-1 ring-zinc-400" : "hover:scale-110"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.label}
                    >
                      {accentColor === c.value && <IconCheck size={12} className="text-white" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Invoice preview */}
            <div className="mb-6">
              <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mb-3">
                Preview
              </p>
              <div className="bg-white rounded-xl border border-zinc-200 p-8 shadow-sm max-w-2xl mx-auto">
                {/* Invoice header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    {showLogo && (
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-[14px] font-bold font-heading mb-3"
                        style={{ backgroundColor: selectedAccent.hex }}
                      >
                        M
                      </div>
                    )}
                    <p className="text-[15px] font-medium text-zinc-900">{fromName}</p>
                    <p className="text-[12px] text-zinc-500">{fromEmail}</p>
                    <p className="text-[12px] text-zinc-500">{fromAddress}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[20px] font-heading font-medium text-zinc-900 tracking-tight">INVOICE</p>
                    <p className="text-[13px] text-zinc-500 font-mono mt-1">{invoiceNumber}</p>
                  </div>
                </div>

                {/* Bill to + dates */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium mb-1">Bill To</p>
                    <p className="text-[13px] text-zinc-900 font-medium">{toMember}</p>
                    <p className="text-[12px] text-zinc-500">{toMemberData?.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[12px] text-zinc-500">
                      <span className="text-zinc-400">Issued:</span> {fmtDate(dateIssued)}
                    </p>
                    <p className="text-[12px] text-zinc-500">
                      <span className="text-zinc-400">Due:</span> {fmtDate(dateDue)}
                    </p>
                  </div>
                </div>

                {/* Line items preview */}
                <div className="border border-zinc-100 rounded-lg overflow-hidden mb-6">
                  <div
                    className="grid grid-cols-[1fr_60px_80px_80px] gap-3 px-4 py-2.5 text-white"
                    style={{ backgroundColor: selectedAccent.hex }}
                  >
                    <p className="text-[10px] uppercase tracking-wider font-medium">Description</p>
                    <p className="text-[10px] uppercase tracking-wider font-medium text-right">Qty</p>
                    <p className="text-[10px] uppercase tracking-wider font-medium text-right">Rate</p>
                    <p className="text-[10px] uppercase tracking-wider font-medium text-right">Amount</p>
                  </div>
                  {lineItems.map((li, idx) => (
                    <div
                      key={li.id}
                      className={`grid grid-cols-[1fr_60px_80px_80px] gap-3 px-4 py-3 ${
                        idx % 2 === 1 ? "bg-zinc-50/50" : ""
                      } ${idx < lineItems.length - 1 ? "border-b border-zinc-50" : ""}`}
                    >
                      <p className="text-[12px] text-zinc-700">{li.description || "—"}</p>
                      <p className="text-[12px] text-zinc-700 font-mono text-right">{li.quantity}</p>
                      <p className="text-[12px] text-zinc-700 font-mono text-right">{fmtDollars(li.rate)}</p>
                      <p className="text-[12px] text-zinc-900 font-mono text-right font-medium">{fmtDollars(li.quantity * li.rate)}</p>
                    </div>
                  ))}
                </div>

                {/* Totals in preview */}
                <div className="flex justify-end">
                  <div className="w-48 space-y-1.5">
                    <div className="flex justify-between">
                      <p className="text-[12px] text-zinc-400">Subtotal</p>
                      <p className="text-[12px] text-zinc-700 font-mono">{fmtDollars(subtotal)}</p>
                    </div>
                    {taxPercent > 0 && (
                      <div className="flex justify-between">
                        <p className="text-[12px] text-zinc-400">Tax ({taxPercent}%)</p>
                        <p className="text-[12px] text-zinc-700 font-mono">{fmtDollars(taxAmount)}</p>
                      </div>
                    )}
                    <div className="border-t border-zinc-200 pt-1.5 flex justify-between">
                      <p className="text-[13px] text-zinc-900 font-medium">Total</p>
                      <p className="text-[14px] font-mono font-semibold" style={{ color: selectedAccent.hex }}>
                        {fmtDollars(invoiceTotal)}
                      </p>
                    </div>
                  </div>
                </div>

                {notes && (
                  <div className="mt-6 pt-4 border-t border-zinc-100">
                    <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium mb-1">Notes</p>
                    <p className="text-[12px] text-zinc-500">{notes}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2.5 rounded-xl border border-zinc-200 text-[13px] text-zinc-600 font-medium cursor-pointer hover:bg-zinc-50 transition-colors flex items-center gap-1.5">
                <IconEye size={15} />
                Preview Invoice
              </button>
              <button className="px-4 py-2.5 rounded-xl border border-zinc-200 text-[13px] text-zinc-600 font-medium cursor-pointer hover:bg-zinc-50 transition-colors flex items-center gap-1.5">
                <IconDownload size={15} />
                Download PDF
              </button>
              <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7B6EF6] to-[#E96BF5] text-white text-[13px] font-medium cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all flex items-center gap-1.5">
                <IconDeviceFloppy size={15} />
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Collapsed form toggle */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full bg-white rounded-2xl border border-zinc-200 border-dashed px-6 py-4 mb-8 flex items-center justify-between cursor-pointer hover:bg-zinc-50/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <IconFileInvoice size={16} className="text-[#7B6EF6]" />
            <p className="text-[13px] text-zinc-500">
              Create a new invoice
            </p>
          </div>
          <IconChevronDown size={16} className="text-zinc-400" />
        </button>
      )}

      {/* Invoice History */}
      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between flex-wrap gap-3">
          <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">
            Invoice History
          </p>
          <div className="flex items-center gap-1">
            {(["all", "paid", "pending", "overdue"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-medium cursor-pointer transition-colors ${
                  statusFilter === f
                    ? "bg-[#7B6EF6]/10 text-[#7B6EF6]"
                    : "text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50"
                }`}
              >
                {f === "all" ? "All" : STATUS_LABELS[f]}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50/50">
                <th className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium py-3 px-5">Invoice #</th>
                <th className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium py-3 px-4">Date</th>
                <th className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium py-3 px-4">Team Member</th>
                <th className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium py-3 px-4">Role</th>
                <th className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium py-3 px-4">Description</th>
                <th className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium py-3 px-4 text-right">Amount</th>
                <th className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50 transition-colors cursor-pointer">
                  <td className="py-3.5 px-5">
                    <p className="text-[13px] text-[#7B6EF6] font-mono font-medium">{inv.number}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="text-[12px] text-zinc-500 font-mono">{fmtDate(inv.date)}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="text-[13px] text-zinc-900 font-medium">{inv.member}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${ROLE_COLORS[inv.role] ?? "bg-zinc-100 text-zinc-600"}`}>
                      {ROLE_LABELS[inv.role] ?? inv.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="text-[12px] text-zinc-500 truncate max-w-[200px]">{inv.description}</p>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <p className="text-[13px] text-emerald-700 font-mono font-medium">{fmtDollars(inv.amount)}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full border ${STATUS_STYLES[inv.status]}`}>
                      {STATUS_LABELS[inv.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredInvoices.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-[13px] text-zinc-400">No invoices match this filter.</p>
          </div>
        )}
      </div>

      {/* Tax Summary */}
      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <IconShieldCheck size={16} className="text-[#7B6EF6]" />
            <div>
              <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">
                Tax Summary
              </p>
              <p className="text-[12px] text-zinc-500 mt-0.5">
                Quick overview for your records
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="rounded-xl bg-zinc-50 border border-zinc-100 p-4">
              <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium mb-1">
                Total Paid to Contractors (YTD)
              </p>
              <p className="font-heading text-xl font-medium tracking-tight text-zinc-900 font-mono">
                $24,800
              </p>
            </div>
            <div className="rounded-xl bg-zinc-50 border border-zinc-100 p-4">
              <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium mb-1">
                Total Invoices Generated
              </p>
              <p className="font-heading text-xl font-medium tracking-tight text-zinc-900 font-mono">
                42
              </p>
            </div>
            <div className="rounded-xl bg-zinc-50 border border-zinc-100 p-4">
              <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium mb-1">
                Active Contractors
              </p>
              <p className="font-heading text-xl font-medium tracking-tight text-zinc-900 font-mono">
                6
              </p>
            </div>
          </div>

          {/* By role breakdown */}
          <div className="mb-6">
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mb-3">
              By Role Breakdown
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center justify-between p-3 rounded-xl border border-zinc-100">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                    Editors
                  </span>
                </div>
                <p className="text-[14px] text-zinc-900 font-mono font-medium">$15,200</p>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl border border-zinc-100">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                    Writers
                  </span>
                </div>
                <p className="text-[14px] text-zinc-900 font-mono font-medium">$5,400</p>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl border border-zinc-100">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-pink-100 text-pink-700">
                    Designers
                  </span>
                </div>
                <p className="text-[14px] text-zinc-900 font-mono font-medium">$4,200</p>
              </div>
            </div>
          </div>

          {/* Download all */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 border border-zinc-100">
            <div>
              <p className="text-[13px] text-zinc-700 font-medium">Download all invoices</p>
              <p className="text-[12px] text-zinc-400">Export as a ZIP for your accountant</p>
            </div>
            <button className="px-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-[13px] text-zinc-600 font-medium cursor-pointer hover:bg-zinc-50 transition-colors flex items-center gap-1.5">
              <IconFileZip size={15} />
              Download ZIP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
